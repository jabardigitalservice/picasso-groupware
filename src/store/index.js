// https://github.com/cretueusebiu/laravel-vue-spa

import Vue from 'vue'
import Vuex from 'vuex'
import { initFCM } from '../lib/init-fcm'

Vue.use(Vuex)

// Load store modules dynamically.
const requireContext = require.context('./modules', false, /.*\.js$/)

const modules = requireContext.keys()
  .map(file =>
    [file.replace(/(^.\/)|(\.js$)/g, ''), requireContext(file)]
  )
  .reduce((modules, [name, module]) => {
    if (module.namespaced === undefined) {
      module.namespaced = true
    }

    return { ...modules, [name]: module }
  }, {})

const store = new Vuex.Store({
  modules
})

store.watch(
  function (state) {
    return !!state.auth.user
  },
  function (user) {
    if (user) {
      initFCM({
        onRetrievalSuccess: (token) => store.dispatch('fcm/createRegistrationToken', { token }),
        onRetrievalError: () => store.dispatch('fcm/deleteRegistrationToken'),
        onRefreshed: (token) => store.dispatch('fcm/updateRegistrationToken', { token }),
        onEmpty: () => store.dispatch('fcm/deleteRegistrationToken')
      })
    }
  }
)

export default store
