import { Datetime } from 'vue-datetime'
import { Settings } from 'luxon'

Settings.defaultLocale = 'id'

export default {
  install (Vue) {
    Vue.use(Datetime)
  }
}
