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
  [types.TEAMS_LIST_INIT] (state) {
    state.loading = true
  },

  [types.TEAMS_LIST_LOADED] (state, { items }) {
    state.items = items
    state.loading = false
  }
}

// actions
export const actions = {
  async fetchItems ({ commit }, { date } = {}) {
    commit(types.TEAMS_LIST_INIT)

    const querySnapshot = await db.collection('users')
      .orderBy('name')
      .get()

    const documents = querySnapshot.docs.map(doc => doc.data())

    commit(types.TEAMS_LIST_LOADED, { items: documents })
  }
}
