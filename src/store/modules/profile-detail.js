import * as types from '../mutation-types'
import { getUserById } from '../../api'

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
  fetchItem ({ state, commit }, { id, fresh = true } = {}) {
    if (!id) {
      return Promise.reject(new ReferenceError('Vuex:profile-detail:fetchItem : id must be supplied'))
    }
    if (!state.item || fresh) {
      commit(types.PROFILE_DETAIL_INIT)
      return getUserById(id)
        .then(data => {
          commit(types.PROFILE_DETAIL_LOADED, { item: data })
          return state.item
        })
        .catch(e => {
          commit(types.PROFILE_DETAIL_FAILED)
          throw e
        })
    } else {
      return Promise.resolve(state.item)
    }
  }
}
