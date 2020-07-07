import * as types from '../mutation-types'
import { GroupwareAPI } from '../../lib/axios'

// state
export const state = {
  loading: true,
  items: [],
  isCheckin: null
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
  },

  [types.CHECKIN_STATE] (state, isCheckin) {
    state.isCheckin = !!isCheckin
  }
}

// actions
export const actions = {
  async fetchItems ({ commit }) {
    commit(types.CHECKINS_INIT)

    await GroupwareAPI.get('attendance/')
      .then(r => r.data.results)
      .then(list => {
        commit(types.CHECKINS_LOADED, { items: list })
      })
  },
  async getCheckinState ({ state, commit }, { refresh = false } = {}) {
    if (state.isCheckin === null || refresh) {
      await GroupwareAPI.get('attendance/is/checkin')
        .then(r => r.data.isCheckin)
        .then(truthy => {
          commit(types.CHECKIN_STATE, truthy)
        })
    }
    return state.isCheckin
  },
  checkout (_, payload) {
    return GroupwareAPI.post('attendance/checkout', payload)
  }
}
