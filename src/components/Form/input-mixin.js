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
  }
}

export const components = {
  FormInputHeader: () => import('./InputHeader.vue')
}

export default {
  props
}
