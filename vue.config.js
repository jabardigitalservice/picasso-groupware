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
        filename: '[name].css'
      })
    ],
    optimization: {
      runtimeChunk: 'single',
      splitChunks: {
        chunks: 'all',
        maxInitialRequests: Infinity,
        minSize: 0,
        maxSize: 200000,
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name (module) {
              const packageName = module.context.match(
                /[\\/]node_modules[\\/](.*?)([\\/]|$)/
              )[1]
              return `npm.${packageName.replace('@', '')}`
            }
          }
        }
      }
    }
  },
  chainWebpack: (config) => {
    config.performance.maxEntrypointSize(400000).maxAssetSize(400000)
    config.when(process.env.NODE_ENV === 'production', config => {
      config.optimization.minimizer('terser').tap(args => {
        const { terserOptions } = args[0]
        terserOptions.compress = true
        return args
      })
    })
  }
}
