import * as types from '../mutation-types'
import { db, FieldValue } from '@/lib/firebase'

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
  [types.FEEDBACK_LIST_INIT] (state) {
    state.loading = true
  },

  [types.FEEDBACK_LIST_LOADED] (state, { items }) {
    state.items = items
    state.loading = false
  }
}

// actions
export const actions = {
  async fetchItems ({ commit }) {
    const querySnapshot = await db.collection('features_requests')
      .orderBy('votes_count', 'desc')
      .limit(50)
      .get()

    const documents = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }))

    commit(types.FEEDBACK_LIST_LOADED, { items: documents })
  },

  async vote ({ commit, dispatch }, { id }) {
    const querySnapshot = await db.collection('features_requests').doc(id)

    await querySnapshot.update({ votes_count: FieldValue.increment(1) })

    dispatch('fetchItems')
  }
}
