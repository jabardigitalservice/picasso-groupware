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
  [types.MESSAGES_LIST_INIT] (state) {
    state.loading = true
  },

  [types.MESSAGES_LIST_LOADED] (state, { items }) {
    state.items = items
    state.loading = false
  }
}

// actions
export const actions = {
  async fetchItems ({ commit }) {
    const querySnapshot = await db.collection('broadcasts')
      .orderBy('published_at', 'desc')
      .limit(20)
      .get()

    const documents = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }))

    commit(types.MESSAGES_LIST_LOADED, { items: documents })
  }
}
