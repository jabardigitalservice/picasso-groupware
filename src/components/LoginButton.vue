<template>
  <div>
    <button @click="signIn" class="w-full text-center shadow block bg-brand-blue text-white font-bold py-2 px-4 rounded">Login</button>
  </div>
</template>

<script>
import firebase from 'firebase'
import { analytics } from '@/lib/firebase'

export default {
  methods: {
    async signIn () {
      analytics.logEvent('login')

      const provider = new firebase.auth.GoogleAuthProvider()

      window.location.hash = ''

      await firebase.auth().signInWithRedirect(provider)
    }
  }
}
</script>
