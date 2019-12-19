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
  [types.THANKYOU_INIT] (state) {
    state.loading = true
  },

  [types.THANKYOU_LOADED] (state, { items }) {
    state.items = items
    state.loading = false
  }
}

// actions
export const actions = {
  async fetchItems ({ commit }) {
    const querySnapshot = await db.collection('kudos')
      .orderBy('feedback_at', 'desc')
      .limit(50)
      .get()

    const documents = querySnapshot.docs.map(doc => doc.data())

    commit(types.THANKYOU_LOADED, { items: documents })
  }
}
