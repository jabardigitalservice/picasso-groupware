const VIEWPORT_TYPE = {
  DESKTOP: 'DESKTOP',
  MOBILE: 'MOBILE'
}

export default {
  props: {
    breakpointWidth: {
      type: [String, Number],
      default: 640
    },
    forDesktop: {
      type: String
    },
    forMobile: {
      type: String
    }
  },
  data () {
    return {
      viewportType: null,
      component: null
    }
  },
  watch: {
    viewportType: {
      immediate: false,
      async handler (type) {
        this.component = await this.loadComponent()
          .then(m => m ? m.default || m : null)
      }
    }
  },
  mounted () {
    this.onWindowResize()
    window.addEventListener('resize', this.onWindowResize)
  },
  beforeUpdate () {
    window.removeEventListener('resize', this.onWindowResize)
    setTimeout(() => {
      window.addEventListener('resize', this.onWindowResize)
    }, 50)
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.onWindowResize)
  },
  methods: {
    onWindowResize () {
      if (window.innerWidth < this.breakpointWidth) {
        this.viewportType = VIEWPORT_TYPE.MOBILE
      } else {
        this.viewportType = VIEWPORT_TYPE.DESKTOP
      }
    },
    async loadComponent () {
      switch (this.viewportType) {
        case VIEWPORT_TYPE.DESKTOP:
          return this.forDesktop ? import(`@/components/${this.forDesktop}`) : null
        case VIEWPORT_TYPE.MOBILE:
          return this.forMobile ? import(`@/components/${this.forMobile}`) : null
        default:
          return null
      }
    }
  },
  render (h) {
    if (this.component) {
      return h(this.component, {
        props: this.$attrs || {}
      })
    }
    return null
  }
}
