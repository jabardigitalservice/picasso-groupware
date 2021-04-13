import GAuth from 'vue-google-oauth2'

const googleSecret = process.env.VUE_APP_MODE === 'production'
  ? process.env.VUE_APP_SECRET_CLIENT_GOOGLE
  : process.env.VUE_APP_SECRET_CLIENT_GOOGLE_STAGING

const opts = {
  clientId: googleSecret,
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
