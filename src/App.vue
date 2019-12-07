<template>
  <div id="app">
    <template v-if="!loading">
      <navbar/>
      <router-view/>
    </template>
  </div>
</template>

<script>
import firebase from 'firebase'
import { mapGetters } from 'vuex'
import Navbar from './components/Navbar'

export default {
  components: {
    Navbar
  },

  computed: mapGetters({
    loading: 'auth/loading'
  }),

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
<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
