import * as types from '../mutation-types'
import * as firebase from 'firebase'
import { db, messaging, FieldValue } from '@/lib/firebase'

// state
export const state = {
  loading: true,
  user: null
}

// getters
export const getters = {
  loading: state => state.loading,
  user: state => state.user,
  check: state => state.user !== null
}

// mutations
export const mutations = {
  [types.AUTH_LOADING] (state) {
    state.loading = true
  },

  [types.AUTH_INITIALIZED] (state) {
    state.loading = false
  },

  [types.SET_USER] (state, { user }) {
    state.user = user
  },

  [types.UNAUTHENTICATED] (state) {
    state.user = null
  }
}

// actions
export const actions = {
  async login ({ dispatch, commit }, { user }) {
    await db.collection('users').doc(user.uid).set({
      'name': user.displayName,
      'email': user.email
    })

    const fcmToken = await messaging.getToken()

    await dispatch('saveFcmToken', { user: user, token: fcmToken })

    commit(types.SET_USER, { user: { name: user.displayName, photo: user.photoURL } })
  },

  async logout ({ commit }) {
    commit(types.AUTH_LOADING)

    try {
      const fcmToken = await messaging.getToken()
      await messaging.deleteToken(fcmToken)

      await firebase.auth().signOut()
    } catch (e) { }

    commit(types.UNAUTHENTICATED)
  },

  async saveFcmToken ({ dispatch, getters }, { user, token }) {
    await db.collection('users')
      .doc(user.uid)
      .collection('tokens')
      .doc(token)
      .set({
        'token': token,
        'createdAt': FieldValue.serverTimestamp()
      })
  }
}
