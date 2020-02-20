import * as types from '../mutation-types'
import { db } from '@/lib/firebase'

// state
export const state = {
  loading: true,
  item: null,
  error: false
}

// getters
export const getters = {
  loading: state => state.loading,
  item: state => state.item,
  error: state => state.error
}

// mutations
export const mutations = {
  [types.PROFILE_DETAIL_INIT] (state) {
    state.item = null
    state.loading = true
    state.error = false
  },

  [types.PROFILE_DETAIL_LOADED] (state, { item }) {
    state.item = item
    state.loading = false
    state.error = false
  },

  [types.PROFILE_DETAIL_FAILED] (state) {
    state.item = null
    state.loading = false
    state.error = true
  }
}

// actions
export const actions = {
  async fetchItem ({ commit, rootGetters }) {
    commit(types.PROFILE_DETAIL_INIT)

    const { id } = rootGetters['auth/user']

    const querySnapshot = await db.collection('users').doc(id)
    const doc = await querySnapshot.get()

    if (doc.exists) {
      return commit(types.PROFILE_DETAIL_LOADED, { item: doc.data() })
    }

    return commit(types.PROFILE_DETAIL_FAILED)
  }
}
