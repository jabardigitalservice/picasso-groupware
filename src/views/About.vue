<template>
  <div class="about">
    <div class="container mx-auto">
      <div class="flex flex-wrap">
        <div class="w-full bg-white p-4">
          <template v-if="!authLoading">
            <h1 v-if="user">Hallo, {{ user.name }}</h1>
            <h1 v-if="!user">Please login</h1>

            <button v-if="!user" @click="signIn">Sign In</button>
            <button v-if="user" @click="signOut">Sign Out</button>
          </template>
          <template v-else>
            <content-loader-common/>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import firebase from 'firebase'
import ContentLoaderCommon from '../components/ContentLoaderCommon'

export default {
  components: {
    ContentLoaderCommon
  },

  computed: mapGetters({
    user: 'auth/user',
    authLoading: 'auth/loading'
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
      })
    },

    signOut () {
      this.$store.dispatch('auth/logout')
    }
  }
}
</script>
