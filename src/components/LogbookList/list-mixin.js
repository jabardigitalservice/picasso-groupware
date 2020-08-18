export default {
  props: {
    clickableRow: {
      type: Boolean,
      default: false
    },
    editable: {
      type: Boolean,
      default: true
    },
    removable: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {}
  },
  methods: {
    getAbsoluteIndex (rowIndex) {
      if (typeof this.startIndex === 'number') {
        return this.startIndex + rowIndex + 1
      }
    },
    onCreateNewLogbook () {
      this.$router.push({
        path: '/report/create'
      })
    }
  }
}
