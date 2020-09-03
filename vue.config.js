const VueEnv = require('vue-enverywhere')

module.exports = {
  configureWebpack: {
    plugins: [
      new VueEnv({
        filename: 'vue-env.js'
      })
    ]
  }
}
