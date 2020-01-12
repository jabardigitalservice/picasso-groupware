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
  [types.CHECKINS_INIT] (state) {
    state.loading = true
  },

  [types.CHECKINS_LOADED] (state, { items }) {
    state.items = items
    state.loading = false
  }
}

// actions
export const actions = {
  async fetchItems ({ commit }) {
    const querySnapshot = await db.collection('checkins')
      .doc('20200113')
      .collection('records')
      .orderBy('checkin_at')
      .get()

    const documents = querySnapshot.docs.map(doc => doc.data())

    commit(types.CHECKINS_LOADED, { items: documents })
  }
}
