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
    ],
    optimization: {
      runtimeChunk: "single",
      splitChunks: {
        chunks: "all",
        maxInitialRequests: Infinity,
        minSize: 0,
        maxSize: 200000,
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name(module) {
              const packageName = module.context.match(
                /[\\/]node_modules[\\/](.*?)([\\/]|$)/
              )[1];
              return `npm.${packageName.replace("@", "")}`;
            }
          }
        }
      }
    }
  },
  chainWebpack: (config) => {
    config.plugins.delete('prefetch')
    config.plugin('preload').tap((options) => {
      options[0].include = 'allChunks'
      return options
    }),
    config.module
      .rule('vue')
      .type("javascript/auto")
      .use('vue-loader')
      .loader('vue-loader')
      .end()
    config.performance.maxEntrypointSize(400000).maxAssetSize(400000)
    config.when(process.env.NODE_ENV === 'production', config => {
    config.plugins.delete('optimize-css')
      // config.optimization.splitChunks({
      //   chunks: 'all',
      //   maxInitialRequests: Infinity,
      //   minSize: 100000,
      //   maxSize: 200000,
      //   cacheGroups: {
      //     default: false,
      //     common: false,
      //     styles: {
      //         name: 'app',
      //         test: /[\\/]node_modules[\\/]/,
      //         // test: /\.(s?css|vue)$/, // chunks plugin has to be aware of all kind of files able to output css in order to put them together
      //         name(module) {
      //           const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];
      //           return `npm.${packageName.replace('@', '')}`;
      //         },
      //     }
      //   }
      // })
      config.optimization.minimizer("terser").tap(args => {
        const { terserOptions } = args[0]
        terserOptions.compress = true
        return args
      })
    })
  },
}
