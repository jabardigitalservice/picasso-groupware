import _values from 'lodash/values'

import * as types from '../mutation-types'
import { getUserById } from '../../api'
import { PROFILE_DETAIL_TYPE, populateProfileDataFields } from '../../components/Profile/Edit/utils'

// state
export const state = {
  loading: true,
  item: null,
  error: false,
  hasUnsavedChanges: false
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
  },

  [types.PROFILE_DETAIL_IS_DIRTY] (state, isDirty) {
    state.hasUnsavedChanges = isDirty
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
          _values(PROFILE_DETAIL_TYPE).forEach(field => {
            data[field] = data[field] || {}
            Object.assign(data[field], populateProfileDataFields(field, data[field]))
          })
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
