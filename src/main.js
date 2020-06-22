import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'

Vue.config.productionTip = false

/**
 * prevent chunk to be included on entry point
 */
function importLib () {
  const fortAwesome = import(
    /* webpackChunkName: "fort-awesome" */
    /* webpackMode: "lazy" */
    '@fortawesome/fontawesome-free/js/all'
  )
  return Promise.all([fortAwesome])
}

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
      for (let p of plugins) {
        if (!p || typeof p !== 'function') {
          continue
        }
        Vue.use(p)
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
