const VueEnv = require('vue-enverywhere')
const webpack = require('webpack')
var MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
  configureWebpack: {
    plugins: [
      new VueEnv({
        filename: 'vue-env.js'
      }),
      new webpack.IgnorePlugin(
        /^\.\/locale$/, /moment$/
      ),
      new MiniCssExtractPlugin({
        filename: '[name].css',
      })
    ]
  },
  chainWebpack: (config) => {
    config.plugins.delete('prefetch')
    config.plugin('preload').tap((options) => {
      options[0].include = 'allChunks'
      return options
    }),
    config.when(process.env.NODE_ENV === 'production', config => {
      config.plugins.delete('optimize-css')
      config.performance
        .maxEntrypointSize(400000)
        .maxAssetSize(400000)
      config.optimization.splitChunks({
        minSize: 10000,
        maxSize: 200000,
        cacheGroups: {
          default: false,
          common: false,
          styles: {
              name: 'app',
              test: /[\\/]node_modules[\\/]/,
              // test: /\.(s?css|vue)$/, // chunks plugin has to be aware of all kind of files able to output css in order to put them together
              chunks: 'initial',
              minChunks: 1,
              enforce: true
          }
        }
      })
    })
  },
}
