import _defaultsDeep from 'lodash/defaultsDeep'

import * as types from '../mutation-types'
import { getUserById } from '../../api'
import { PROFILE_DATA_DEFAULT } from '../../components/Profile/Edit/utils'

// state
export const state = {
  loading: true,
  item: null,
  error: false,
  isPristine: true
}

// getters
export const getters = {
  loading: state => state.loading,
  item: state => state.item,
  error: state => state.error,
  isDirty: state => !state.isPristine
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
  },

  [types.PROFILE_DETAIL_IS_PRISTINE] (state, isDirty) {
    state.isPristine = isDirty
  }
}

// actions
export const actions = {
  fetchItem ({ state, commit }, { id, fresh = true, silent = false } = {}) {
    if (!id) {
      return Promise.reject(new ReferenceError('Vuex:profile-detail:fetchItem : id must be supplied'))
    }
    if (!state.item || fresh) {
      if (!silent) {
        commit(types.PROFILE_DETAIL_INIT)
      }
      return getUserById(id)
        .then(data => {
          _defaultsDeep(data, PROFILE_DATA_DEFAULT)
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
