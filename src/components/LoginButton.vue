<template>
  <div>
    <button @click="signIn" class="w-full text-center shadow block bg-brand-blue text-white font-bold py-2 px-4 rounded">Login</button>
  </div>
</template>

<script>
import firebase from 'firebase'
export default {
  methods: {
    async signIn () {
      const provider = new firebase.auth.GoogleAuthProvider()

      window.location.hash = ''

      await firebase.auth().signInWithRedirect(provider)
    }
  }
}
</script>
