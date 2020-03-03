export default {
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      mData: {}
    }
  },
  watch: {
    data: {
      immediate: true,
      handler: function (v) {
        this.mData = JSON.parse(JSON.stringify(v || {}))
      }
    }
  }
}
