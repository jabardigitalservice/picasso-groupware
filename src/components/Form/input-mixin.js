import FormInputHeader from './InputHeader.vue'

export const props = {
  name: {
    type: String,
    required: false
  },
  title: {
    type: String,
    required: false
  },
  subtitle: {
    type: String,
    default: ''
  },
  rules: {
    type: [String, Object],
    default: () => ({})
  },
  customMessages: {
    type: Object,
    default: () => ({})
  },
  required: {
    type: Boolean,
    default: true
  },
  disabled: {
    type: Boolean,
    default: false
  }
}

export const components = {
  FormInputHeader
}

export default {
  components,
  props
}
