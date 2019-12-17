<template>
  <div id="app">
<!--    <loading ref="loading" />-->

    <transition name="page" mode="out-in">
      <component :is="layout" v-if="layout" />
    </transition>
  </div>
</template>

<script>
// import firebase from 'firebase'
// import Loading from './components/Loading'
// import { messaging } from '@/lib/firebase'

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
      defaultLayout: 'default'
    }
  },

  mounted () {
    // this.$loading = this.$refs.loading

    this.initFcm()

    // firebase.auth().onAuthStateChanged((user) => {
    //   if (user) {
    //     // console.log(user)
    //     this.$store.dispatch('auth/login', { user: user })
    //   } else {
    //     // console.log('not signed in')
    //   }
    //
    //   this.$store.commit('auth/AUTH_INITIALIZED')
    // })
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

    initFcm () {
      // Request Permission of Notifications
      // messaging.requestPermission().then(() => {
      //   // console.log('Notification permission granted.')
      // }).catch(() => {
      //   // console.log('Unable to get permission to notify.', err)
      // })
      //
      // messaging.onMessage((payload) => {
      //   // console.log('Message received. ', payload)
      // })
    }
  }
}
</script>

<style lang="scss">
@import './styles/app.scss';
</style>
