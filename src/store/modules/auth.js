import * as types from '../mutation-types'
import * as firebase from 'firebase'

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
    commit(types.SET_USER, { user: { name: user.displayName, photo: user.photoURL, id: user.uid } })
  },

  async logout ({ commit }) {
    commit(types.AUTH_LOADING)

    try {
      await firebase.auth().signOut()
    } catch (e) { }

    commit(types.UNAUTHENTICATED)
  }
}
