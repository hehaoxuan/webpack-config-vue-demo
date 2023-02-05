const path = require("path");
const { merge } = require("webpack-merge");
const webpack = require("webpack");
const ESLintPlugin = require("eslint-webpack-plugin");
const StylelintWebpackPlugin = require("stylelint-webpack-plugin");
const base = require("./webpack.base");

module.exports = merge(base, {
  mode: "development",
  devtool: "eval-cheap-module-source-map",
  devServer: {
    // 自定义端口号
    // port:7000,
    // 自动打开浏览器
    open: true,
  },
  plugins: [
    // 定义全局变量
    new webpack.DefinePlugin({
      process: {
        env: {
          NODE_DEV: JSON.stringify("development"),
          //   定义你的环境变量
          // VUE_APP_URL: JSON.stringify('https://xxx.com')
        },
      },
    }),
    new ESLintPlugin({
      // 运行时修复错误
      fix: true,
    }),
    new StylelintWebpackPlugin({
      context: "src",
      // Stylelint的配置文件读取
      configFile: path.resolve(__dirname, "../stylelint.config.js"),
      // 检查的文件范围
      files: ["**/*.scss"],
    }),
  ],
});
