import FormInputHeader from './InputHeader.vue'

export const props = {
  name: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
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
  }
}

export const components = {
  FormInputHeader
}

export default {
  components,
  props
}
