<template>
  <div class="about">
    <div class="container mx-auto">
      <div class="flex flex-wrap">
        <div class="w-full bg-white p-4">
          <template v-if="!authLoading">
            <template v-if="user">
              <img class="w-24 h-24 rounded-full mr-4" :src="user.photo" />
              <h1>Hallo, {{ user.name }}</h1>
              <button v-if="user" @click="signOut">Sign Out</button>
            </template>
            <template v-else>
              <h1>Please login</h1>
              <button v-if="!user" @click="signIn">Sign In</button>
            </template>
          </template>
          <template v-else>
            <content-loader-common />
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import firebase from 'firebase'
import ContentLoaderCommon from '@/components/ContentLoaderCommon'
import { messaging } from '@/lib/firebase'

export default {
  components: {
    ContentLoaderCommon
  },

  computed: mapGetters({
    user: 'auth/user',
    authLoading: 'auth/loading'
  }),

  mounted () {
    //
  },

  methods: {
    async signIn () {
      const provider = new firebase.auth.GoogleAuthProvider()

      window.location.hash = ''

      await firebase.auth().signInWithRedirect(provider)

      // delete existing token
      const fcmToken = await messaging.getToken()
      await messaging.deleteToken(fcmToken)
    },

    signOut () {
      this.$store.dispatch('auth/logout')
    }
  }
}
</script>
