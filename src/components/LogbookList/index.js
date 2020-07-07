const VIEWPORT_TYPE = {
  DESKTOP: 'DESKTOP',
  MOBILE: 'MOBILE'
}

export default {
  data () {
    return {
      viewportType: null,
      listComponent: null
    }
  },
  watch: {
    viewportType: {
      immediate: false,
      async handler (type) {
        this.listComponent = await this.loadListComponent()
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
      if (window.innerWidth < 640) {
        this.viewportType = VIEWPORT_TYPE.MOBILE
      } else {
        this.viewportType = VIEWPORT_TYPE.DESKTOP
      }
    },
    loadListComponent () {
      switch (this.viewportType) {
        case VIEWPORT_TYPE.DESKTOP: return import('./table')
        case VIEWPORT_TYPE.MOBILE:
          return import('./card-list')
        default:
          return Promise.resolve(null)
      }
    }
  },
  render (h) {
    if (this.listComponent) {
      return h(this.listComponent)
    }
    return null
  }
}
