import * as types from '../mutation-types'
import * as firebase from 'firebase'
import { db, Timestamp } from '@/lib/firebase'

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
    state.loading = false
    state.user = null
  }
}

// actions
export const actions = {
  async login ({ dispatch, commit }, { user }) {
    commit(types.AUTH_LOADING)

    const querySnapshot = db.collection('users').doc(user.uid)
    const doc = await querySnapshot.get()

    if (doc.exists) {
      await db.collection('users').doc(user.uid).update({
        'name': user.displayName,
        'email': user.email,
        'photo': user.photoURL,
        'last_seen_at': Timestamp.now()
      })
    } else {
      await db.collection('users').doc(user.uid).set({
        'id': user.uid,
        'name': user.displayName,
        'email': user.email,
        'photo': user.photoURL,
        'created_at': Timestamp.now(),
        'last_seen_at': Timestamp.now()
      })
    }

    commit(types.SET_USER, { user: { name: user.displayName, photo: user.photoURL, id: user.uid } })
    commit(types.AUTH_INITIALIZED)
  },

  async logout ({ commit }) {
    commit(types.AUTH_LOADING)

    try {
      await firebase.auth().signOut()
    } catch (e) { }

    commit(types.UNAUTHENTICATED)
  }
}
