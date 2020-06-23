import GAuth from 'vue-google-oauth2'

const opts = {
  clientId: process.env.VUE_APP_SECRET_CLIENT_GOOGLE,
  scope: 'profile email',
  prompt: 'select_account'
}

export default {
  install (Vue) {
    Vue.use(GAuth, opts)
    if (window) {
      window.GAuth = Object.create(Vue.prototype.$gAuth)
    }
  }
}
