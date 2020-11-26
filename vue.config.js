const VueEnv = require('vue-enverywhere')
const webpack = require('webpack')
const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const PreloadWebpackPlugin = require('@vue/preload-webpack-plugin')

let plugins = [
  new VueEnv({
    filename: 'vue-env.js'
  }),
  new MiniCssExtractPlugin({
    filename: "[name].css",
  }),
  new webpack.IgnorePlugin(
    /^\.\/locale$/, /moment$/
  ),
  new PreloadWebpackPlugin({
    rel: 'preload',
    as: 'script'
  }),
]

function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  configureWebpack: {
    plugins
  },
  chainWebpack(config) {
    config.plugins.delete('preload') // TODO: need test
    config.plugins.delete('prefetch') // TODO: need test

    // set preserveWhitespace
    config.module
      .rule('vue')
      .use('vue-loader')
      .loader('vue-loader')
      .tap(options => {
        options.compilerOptions.preserveWhitespace = true
        return options
      })
      .end()

    config.when(process.env.NODE_ENV === 'development', config =>
      config.devtool('cheap-source-map')
    )
    config.when(process.env.NODE_ENV === 'production', config => {
      config.performance
        .maxEntrypointSize(400000)
        .maxAssetSize(400000)
      config.optimization.splitChunks({
        chunks: 'all',
        maxSize: 400000,
        cacheGroups: {
          libs: {
            name: 'chunk-libs',
            test: /[\\/]node_modules[\\/]/,
            priority: 10,
            chunks: 'initial' // only package third parties that are initially dependent
          },
          tailwind: {
            name: 'chunk-tailwind', // split vuetify into a single package
            priority: 20, // the weight needs to be larger than libs and app or it will be packaged into libs or app
            test: /[\\/]node_modules[\\/]tailwind[\\/]/
          },
          commons: {
            name: 'chunk-commons',
            test: resolve('src/components'), // can customize your rules
            minChunks: 3, //  minimum common number
            priority: 5,
            reuseExistingChunk: true
          }
        }
      })
      config.optimization.minimizer("terser").tap(args => {
        const { terserOptions } = args[0]
        terserOptions.compress = true
        return args
      })
      config.optimization.runtimeChunk('single')
    })
  },
  transpileDependencies: ['tailwind']
}
