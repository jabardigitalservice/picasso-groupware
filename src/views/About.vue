<template>
  <div class="about">
    <div class="container mx-auto">
      <div class="flex flex-wrap">
        <div class="w-full bg-white p-4">
          <template v-if="!authLoading">
            <h1>This is an about page</h1>
            <button v-if="!user" @click="signIn">Sign In</button>
            <button v-if="user" @click="signOut">Sign Out</button>
          </template>
          <template v-else>
            <content-loader
              :height="475"
              :width="400"
              :speed="2"
              primaryColor="#f3f3f3"
              secondaryColor="#ecebeb"
            >
              <circle cx="30" cy="30" r="30" />
              <rect x="75" y="13" rx="4" ry="4" width="100" height="13" />
              <rect x="75" y="37" rx="4" ry="4" width="50" height="8" />
              <rect x="0" y="70" rx="5" ry="5" width="400" height="100" />
            </content-loader>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import firebase from 'firebase'
import { ContentLoader } from 'vue-content-loader'

export default {
  components: {
    ContentLoader
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
