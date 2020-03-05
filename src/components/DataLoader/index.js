export default {
  props: {
    promise: {
      type: [Promise, Function]
    },
    discardValue: {
      type: Boolean
    },
    defaultValue: {
      type: [String, Number, Boolean, Function, Object, Array]
    }
  },
  data () {
    return {
      value: null,
      error: null,
      pending: true
    }
  },
  methods: {
    handlePromise (promise) {
      this.pending = true

      let prms = promise
      if (typeof p === 'function') {
        prms = promise()
      }
      if (prms instanceof Promise) {
        return prms
          .then(v => {
            if (!this.discardValue) {
              this.value = JSON.parse(JSON.stringify(v))
            }
          }).catch(e => {
            this.error = e
          }).finally(() => {
            this.pending = false
          })
      } else {
        return Promise.reject(
          new TypeError(`
            DataLoader: promise props must be an instanceof Promise 
            or a function that returns Promise object
          `)
        )
      }
    }
  },
  watch: {
    promise: {
      immediate: true,
      handler: function (p) {
        if (p === undefined || p === null) return
        this.handlePromise(p)
      }
    }
  },
  render (h) {
    const renderScopedSlots = (name, slotProps) => {
      if (typeof this.$scopedSlots[name] === 'function') {
        return this.$scopedSlots[name](slotProps)
      }
      return null
    }
    if ('combined' in this.$scopedSlots) {
      return renderScopedSlots('combined', {
        pending: this.pending,
        error: this.error,
        value: this.value
      })
    }
    if (this.pending) {
      return renderScopedSlots('pending')
    } else if (this.error) {
      return renderScopedSlots('error', {
        error: this.error
      })
    } else {
      return renderScopedSlots('default', {
        value: this.value || this.defaultValue
      })
    }
  }
}
