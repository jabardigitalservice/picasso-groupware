import { extend, ValidationProvider, ValidationObserver } from 'vee-validate'
// eslint-disable-next-line
import { required, email, min, max, length, numeric, image, mimes, min_value, max_value, size, regex } from 'vee-validate/dist/rules'
import isValid from 'date-fns/isValid'
import compareAsc from 'date-fns/compareAsc'

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
  regex,
  ktp: function (value) {
    return /^((1[1-9])|(21)|([37][1-6])|(5[1-4])|(6[1-5])|([8-9][1-2]))[0-9]{2}[0-9]{2}(([0-6][0-9])|(7[0-1]))((0[1-9])|(1[0-2]))([0-9]{2})[0-9]{4}$/.test(value) || 'Invalid KTP number'
  },
  date_compare: {
    params: ['operator', 'target'],
    validate (value, { operator, target }) {
      if (!operator) {
        return false
      }
      const dateOfValue = new Date(value)
      const dateOfTarget = new Date(target)
      if (!isValid(dateOfValue) || !isValid(dateOfTarget)) {
        return false
      }
      const compared = compareAsc(dateOfValue, dateOfTarget)
      switch (operator) {
        case 'lt':
          return compared === -1
        case 'lte':
          return [-1, 0].includes(compared)
        case 'gt':
          return compared === 1
        case 'gte':
          return [1, 0].includes(compared)
        case 'equal':
          return compared === 0
      }
    }
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
