const VueEnv = require('vue-enverywhere')
// const webpack = require('webpack')
// const path = require('path')
// const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const PreloadWebpackPlugin = require('@vue/preload-webpack-plugin')

// let plugins = [
//   new VueEnv({
//     filename: 'vue-env.js'
//   }),
//   // new MiniCssExtractPlugin({
//   //   filename: "[name].css",
//   // }),
//   new webpack.IgnorePlugin(
//     /^\.\/locale$/, /moment$/
//   ),
//   new PreloadWebpackPlugin({
//     rel: 'preload',
//     as: 'script'
//   }),
// ]

// function resolve(dir) {
//   return path.join(__dirname, dir)
// }

module.exports = {
  configureWebpack: {
    plugins: [
      new VueEnv({
        filename: 'vue-env.js'
      }),
      // new webpack.IgnorePlugin(
      //   /^\.\/locale$/, /moment$/
      // ),
      new PreloadWebpackPlugin({
        rel: 'preload',
        as: 'script'
      }),
    ]
  },
}
