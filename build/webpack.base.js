const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { VueLoaderPlugin } = require("vue-loader");
const ProgressBarPlugin = require("progress-bar-webpack-plugin");
const chalk = require("chalk");

module.exports = {
  // 开发模式 分为开发者与生产环境
  mode: "development",
  // entry 入口文件，整个项目所依赖的文件
  entry: {
    main: "./src/main.js",
  },
  // 输出
  output: {
    // 输出到dist文件夹下
    path: path.resolve(__dirname, "./dist"),
    filename: "js/chunk-[contenthash].js",
    // 每次打包清除之前旧的文件
    clean: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      // 选择模板 public/index.html
      template: "./public/index.html",
      // 打包后的名字
      filename: "index.html",
      // js文件插入 body里
      inject: "body",
    }),
    new MiniCssExtractPlugin({
      // 将css 输出到对应的dist/styles文件下
      filename: "styles/chunk-[contenthash].css",
      ignoreOrder: true,
    }),
    new VueLoaderPlugin(),
    new ProgressBarPlugin({
      format: `build [:bar] ${chalk.green.bold(
        ":percent"
      )}  (:elapsed seconds)`,
    }),
  ],
  module: {
    rules: [
      {
        // 匹配的用例 匹配样式文件
        test: /\.(css|s[cs]ss)$/,
        use: [
          // loader执行顺序是从右到左
          MiniCssExtractPlugin.loader,
          "css-loader",
          "sass-loader",
          // {
          //   loader: 'sass-resources-loader',
          //   options: {
          //     resources: [
          //       // 放置全局引入的公共scss文件
          //     ],
          //   },
          // },
        ],
      },
      {
        // 匹配图片 url-loader已经废弃，改用asset-module
        test: "/.(png|jpe?g|gif|svg|webp)$/",
        type: "asset",
        parser: {
          // 转换（转换为base64的条件）
          dataUrlCondition: {
            maxSize: 25 * 1024, // 25kb
          },
        },
        generator: {
          // 打包到 dist/image文件下
          filename: "images/[contenthash][ext][query]",
        },
      },
      // 这里是配置babel作用文件
      {
        test: /\.js$/,
        // 避免选中node_modules文件下的
        exclude: "/node_modules/",
        use: ["babel-loader"],
      },
      {
        test: /\.vue$/,
        use: "vue-loader",
      },
    ],
  },
  resolve: {
    // 路径别名
    alias: {
      "@": path.resolve("./src"),
      asserts: "~/assets",
      tools: "~/tools",
    },
    // 引入文件可省略后缀的
    extensions: [".js", ".ts", ".less", ".vue"],
  },
};
