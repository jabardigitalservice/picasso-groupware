const VueEnv = require('vue-enverywhere')
const webpack = require('webpack')

module.exports = {
  configureWebpack: {
    plugins: [
      new VueEnv({
        filename: 'vue-env.js'
      }),
      new webpack.IgnorePlugin(
        /^\.\/locale$/, /moment$/
      ),
    ]
  },
  chainWebpack: (config) => {
    config.plugins.delete('prefetch')
    config.plugin('preload').tap((options) => {
      options[0].include = 'allChunks'
      return options
    })
  },
}
