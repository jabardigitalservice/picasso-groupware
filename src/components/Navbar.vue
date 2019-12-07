<template>
  <div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>

    <button v-if="!user" @click="signIn">Sign In</button>
    <button v-if="user" @click="signOut">Sign Out</button>
  </div>
</template>

<script>
import firebase from 'firebase'
import { mapGetters } from 'vuex'

export default {
  computed: mapGetters({
    user: 'auth/user'
  }),

  methods: {
    signIn () {
      const provider = new firebase.auth.GoogleAuthProvider()

      firebase.auth().signInWithRedirect(provider).then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        // const token = result.credential.accessToken
        // console.log(token)
        // The signed-in user info.
        // const user = result.user
        // console.log(user)

        // Redirect home.
        // this.$router.push({ name: 'home' })
      })
    },

    signOut () {
      this.$store.dispatch('auth/logout')
    }
  }
}
</script>
