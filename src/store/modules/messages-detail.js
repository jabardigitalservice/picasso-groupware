import * as types from '../mutation-types'
import { db } from '@/lib/firebase'

// state
export const state = {
  loading: true,
  item: null
}

// getters
export const getters = {
  loading: state => state.loading,
  item: state => state.item
}

// mutations
export const mutations = {
  [types.MESSAGES_DETAIL_INIT] (state) {
    state.loading = true
  },

  [types.MESSAGES_DETAIL_LOADED] (state, { item }) {
    state.item = item
    state.loading = false
  }
}

// actions
export const actions = {
  async fetchItem ({ commit }, { id }) {
    commit(types.MESSAGES_DETAIL_INIT)

    const querySnapshot = await db.collection('broadcasts').doc(id)
    const doc = await querySnapshot.get()

    commit(types.MESSAGES_DETAIL_LOADED, { item: doc.data() })
  }
}
