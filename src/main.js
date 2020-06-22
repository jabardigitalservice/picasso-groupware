import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import './lib/firebase'

import '@fortawesome/fontawesome-free/js/all'
import 'sweetalert2/src/sweetalert2.scss'

// plugins
import VeeValidate from './plugins/vee-validate'
import SweetAlert2 from './plugins/sweet-alert2'

;[
  VeeValidate,
  SweetAlert2
].forEach(plugin => Vue.use(plugin))

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  router,
  store,
  ...App
})
