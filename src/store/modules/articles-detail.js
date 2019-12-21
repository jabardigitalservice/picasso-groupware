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
  [types.ARTICLES_DETAIL_INIT] (state) {
    state.item = null
    state.loading = true
  },

  [types.ARTICLES_DETAIL_LOADED] (state, { item }) {
    state.item = item
    state.loading = false
  }
}

// actions
export const actions = {
  async fetchItem ({ commit }, { id }) {
    commit(types.ARTICLES_DETAIL_INIT)

    const querySnapshot = await db.collection('articles').doc(id)
    const doc = await querySnapshot.get()

    commit(types.ARTICLES_DETAIL_LOADED, { item: doc.data() })
  }
}
