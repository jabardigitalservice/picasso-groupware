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
  [types.EVENTS_INIT] (state) {
    state.loading = true
  },

  [types.EVENTS_LOADED] (state, { items }) {
    state.items = items
    state.loading = false
  }
}

// actions
export const actions = {
  async fetchItems ({ commit }) {
    const querySnapshot = await db.collection('events')
      .orderBy('start_datetime', 'desc')
      .limit(20)
      .get()

    const documents = querySnapshot.docs.map(doc => doc.data())

    commit(types.EVENTS_LOADED, { items: documents })
  }
}
