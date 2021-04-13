/* eslint-disable import/first */
require('dotenv').config()

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { useRefreshTokenHook } from './lib/axios'

Vue.config.productionTip = false

/**
 * prevent lib chunk to be included on entry point
 */
function importLib () {
  return Promise.all([
    import(/* webpackChunkName: "css-vue-datetime" */'vue-datetime/dist/vue-datetime.css'),
    import(/* webpackChunkName: "js-fort-awesome" */'@fortawesome/fontawesome-free/js/all'),
    import(/* webpackChunkName: "css-sweetalert" */'sweetalert2/src/sweetalert2.scss')
  ])
}

/**
 * prevent plugins chunk to be included on entry point
 */
function importPlugins () {
  const ctx = require.context('./plugins/', false, /\.js$/, 'lazy')
  const plugins = ctx.keys().map(key => {
    return ctx(key)
  })
  return Promise.all(plugins)
}

/**
 * asynchronously load all extraneous chunks before Vue initialization
 */
async function init () {
  await importLib()
  await importPlugins()
    .then(plugins => {
      for (let { default: p } of plugins) {
        if (!p || typeof p.install !== 'function') {
          continue
        }
        Vue.use(p)
      }
    })
  useRefreshTokenHook({
    onRefreshSuccess: async () => {
      await store.dispatch('auth/getUserProfile')
    },
    onRefreshFailed: async () => {
      await store.dispatch('auth/onLoginFailed')
      router.replace('/')
    }
  })
  /* eslint-disable no-new */
  new Vue({
    router,
    store,
    ...App
  })
}

init()
