import * as types from '../mutation-types'
import { db } from '@/lib/firebase'

// state
export const state = {
  loading: true,
  items: []
}

// getters
export const getters = {
  loading: state => state.loading,
  items: state => state.items
}

// mutations
export const mutations = {
  [types.HOME_BANNERS_INIT] (state) {
    state.loading = true
  },

  [types.HOME_BANNERS_LOADED] (state, { items }) {
    state.items = items
    state.loading = false
  }
}

// actions
export const actions = {
  async fetchItems ({ commit }) {
    const querySnapshot = await db.collection('banners')
      .orderBy('sequence')
      .limit(5)
      .get()

    const documents = querySnapshot.docs.map(doc => doc.data())

    commit(types.HOME_BANNERS_LOADED, { items: documents })
  }
}
