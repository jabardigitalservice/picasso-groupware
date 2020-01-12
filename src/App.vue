<template>
  <div id="app">
<!--    <loading ref="loading" />-->
    <div v-if="alertUpdate" class="bg-brand-yellow-darkest">
      <div class="container mx-auto">
        <div class="flex px-6 py-4">
          <div class="text-sm w-full">
            Ada Update Versi Terbaru
            <button @click="refreshApp" class="ml-2 bg-brand-blue text-white font-bold py-1 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
              Refresh
            </button>
          </div>
        </div>
      </div>
    </div>

    <transition name="page" mode="out-in">
      <component :is="layout" v-if="layout" />
    </transition>
  </div>
</template>

<script>
// import Loading from './components/Loading'
import firebase from 'firebase'

// Load layout components dynamically.
const requireContext = require.context('@/layouts', false, /.*\.vue$/)

const layouts = requireContext.keys()
  .map(file =>
    [file.replace(/(^.\/)|(\.vue$)/g, ''), requireContext(file)]
  )
  .reduce((components, [name, component]) => {
    components[name] = component.default || component
    return components
  }, {})

export default {
  el: '#app',

  components: {
    // Loading
  },

  data () {
    return {
      layout: null,
      defaultLayout: 'default',
      alertUpdate: false,
      refreshing: false,
      registration: null
    }
  },

  created () {
    // Listen for swUpdated event and display refresh snackbar as required.
    document.addEventListener('swUpdated', this.showRefreshUI, { once: true })

    // Refresh all open app tabs when a new service worker is installed.
    navigator.serviceWorker.addEventListener('controllerchange', () => {
      if (this.refreshing) return
      this.refreshing = true
      window.location.reload()
    })
  },

  mounted () {
    // this.$loading = this.$refs.loading

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // console.log(user)
        this.$store.dispatch('auth/login', { user: user })
      } else {
        // console.log('not signed in')
      }

      // this.$store.commit('auth/AUTH_INITIALIZED')
    })
  },

  methods: {
    /**
     * Set the application layout.
     *
     * @param {String} layout
     */
    setLayout (layout) {
      if (!layout || !layouts[layout]) {
        layout = this.defaultLayout
      }

      this.layout = layouts[layout]
    },

    showRefreshUI (e) {
      // Display a snackbar inviting the user to refresh/reload the app due
      // to an app update being available.
      // The new service worker is installed, but not yet active.
      // Store the ServiceWorkerRegistration instance for later use.
      this.registration = e.detail

      this.alertUpdate = true
    },

    refreshApp () {
      this.alertUpdate = false
      // Protect against missing registration.waiting.
      if (!this.registration || !this.registration.waiting) { return }
      this.registration.waiting.postMessage('skipWaiting')
    }
  }
}
</script>

<style lang="scss">
@import './styles/app.scss';
</style>
