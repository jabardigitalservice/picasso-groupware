<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
      <button @click="signIn">Sign In</button>
      <button @click="signOut">Sign Out</button>
    </div>
    <router-view/>
  </div>
</template>

<script>
import firebase from 'firebase'

export default {
  created () {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        console.log(user)
      } else {
        console.log('not signed in')
        this.initOneTap()
      }
    })
  },

  methods: {
    initOneTap () {
      window.googleyolo.hint({
        supportedAuthMethods: [
          'https://accounts.google.com'
        ],
        supportedIdTokenProviders: [{
          uri: 'https://accounts.google.com',
          clientId: '867220352075-p0n1hr7adokqcc181vn48im473iuvml0.apps.googleusercontent.com'
        }]
      }).then((credential) => {
        console.log(credential)

        // Build Firebase credential with the Google ID token.
        const googleCredential = firebase.auth.GoogleAuthProvider.credential(credential.idToken)

        // Sign in with credential from the Google user.
        firebase.auth().signInWithCredential(googleCredential)
      }, (error) => {
        console.log(error.type)
      })
    },

    signIn () {
      const provider = new firebase.auth.GoogleAuthProvider()

      firebase.auth().signInWithPopup(provider).then(function (result) {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const token = result.credential.accessToken
        console.log(token)
        // The signed-in user info.
        const user = result.user
        console.log(user)
        // ...
      })
    },

    signOut () {
      firebase.auth().signOut()
    }
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
