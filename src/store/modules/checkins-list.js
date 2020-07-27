import * as types from '../mutation-types'
import { GroupwareAPI } from '../../lib/axios'

// state
export const state = {
  loading: true,
  items: [],
  isCheckin: null,
  isCheckout: null
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
  },
  [types.CHECKOUT_STATE] (state, isCheckout) {
    state.isCheckout = !!isCheckout
  }
}

// actions
export const actions = {
  async fetchItems ({ commit }) {
    commit(types.CHECKINS_INIT)

    await GroupwareAPI.get('attendance/', {
      params: {
        limit: 200,
        pageSize: 200
      }
    })
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
  async getCheckoutState ({ state, commit }, { refresh = false } = {}) {
    if (state.isCheckout === null || refresh) {
      await GroupwareAPI.get('attendance/is/checkout')
        .then(r => r.data.isCheckout)
        .then(truthy => {
          commit(types.CHECKOUT_STATE, truthy)
        })
    }
    return state.isCheckout
  },
  checkout (_, payload) {
    return GroupwareAPI.post('attendance/checkout', payload)
  }
}
