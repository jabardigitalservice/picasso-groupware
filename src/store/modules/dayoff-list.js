import Vue from 'vue'
// import pMinDelay from 'p-min-delay'
import { GroupwareAPI } from '../../lib/axios'

// state
export const state = {
  itemsMap: {}
}

export const mutations = {
  keepItemInCache (state, { id, item }) {
    if (item && id) {
      Vue.set(state.itemsMap, id, item)
    }
  },
  removeItemInCache (state, { id }) {
    if (id && id in state.itemsMap) {
      Vue.delete(state.itemsMap, id)
    }
  }
}

// actions
export const actions = {
  async getDayoffList (_, { page = 1, perPage = 10 } = {}) {
    const get = await GroupwareAPI.get('day-off/', {
      params: {
        page,
        limit: perPage
      }
    }).then(r => r.data)

    return get
  },
  getDayoffById ({ state }, id) {
    if (id in state.itemsMap) {
      const item = state.itemsMap[id]
      return item || null
    }
    return null
  }
}
