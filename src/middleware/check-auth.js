import store from '@/store'
import firebase from 'firebase'

export default async (to, from, next) => {
  // if not already logged in
  if (!store.getters['auth/check']) {
    firebase.auth().onAuthStateChanged(async (user) => {
      if (user) {
        await store.dispatch('auth/login', { user: user })
        next()
      } else {
        store.commit('auth/AUTH_INITIALIZED')
        next()
      }
    })
  }

  // if already logged in
  next()
}
