import { extend, ValidationProvider, ValidationObserver } from 'vee-validate'
// eslint-disable-next-line
import { required, email, min, max, length, numeric, image, mimes, min_value, max_value, size } from 'vee-validate/dist/rules'

const rules = {
  required,
  email,
  min,
  max,
  length,
  numeric,
  image,
  mimes,
  min_value,
  max_value,
  size,
  ktp: function (value) {
    return /^((1[1-9])|(21)|([37][1-6])|(5[1-4])|(6[1-5])|([8-9][1-2]))[0-9]{2}[0-9]{2}(([0-6][0-9])|(7[0-1]))((0[1-9])|(1[0-2]))([0-9]{2})[0-9]{4}$/.test(value) || 'Invalid KTP number'
  }
}
Object.entries(rules).forEach(([key, value]) => {
  extend(key, value)
})

export default {
  install (Vue) {
    Vue.component('ValidationProvider', ValidationProvider)
    Vue.component('ValidationObserver', ValidationObserver)
  }
}
