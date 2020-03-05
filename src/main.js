import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import './lib/firebase'

import '@fortawesome/fontawesome-free/js/all'

// plugins
import VeeValidate from './plugins/vee-validate'

Vue.use(VeeValidate)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  router,
  store,
  ...App
})
