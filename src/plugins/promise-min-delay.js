import minDelay from 'p-min-delay'

export default {
  install (Vue) {
    Vue.prototype.$promiseMinDelay = minDelay
    window.PromiseMinDelay = minDelay
  }
}
