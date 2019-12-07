<template>
  <div id="app">
      <navbar/>
      <router-view/>
  </div>
</template>

<script>
import firebase from 'firebase'
import Navbar from './components/Navbar'

export default {
  components: {
    Navbar
  },

  created () {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // console.log(user)
        this.$store.dispatch('auth/login', { user: user })
      } else {
        // console.log('not signed in')
      }

      this.$store.commit('auth/AUTH_INITIALIZED')
    })
  },

  methods: {
    //
  }
}
</script>
