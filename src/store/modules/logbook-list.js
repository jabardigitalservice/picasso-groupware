import _orderBy from 'lodash/orderBy'
import { GroupwareAPI } from '../../lib/axios'

const SET_RESULT = 'SET_RESULT'
const SET_META = 'SET_META'

export const state = {
  result: null,
  meta: null
}

export const getters = {
  isLoadingLogbookList (state) {
    return state.result === null
  },
  logbookListError (state) {
    return state.result instanceof Error
  },
  logbookListData (state) {
    return Array.isArray(state.result) ? state.result : []
  },
  totalCount (state) {
    return state.meta ? state.meta.totalCount : null
  },
  currentPage (state) {
    return state.meta ? state.meta.currentPage : null
  },
  perPage (state) {
    return state.meta ? state.meta.perPage : null
  },
  startIndex (state, getters) {
    const { currentPage, perPage } = getters
    if (typeof currentPage === 'number' && typeof perPage === 'number') {
      return (currentPage - 1) * perPage
    }
    return null
  },
  endIndex (state, getters) {
    const { startIndex, logbookListData } = getters
    if (typeof startIndex === 'number') {
      return startIndex + logbookListData.length - 1
    }
    return null
  }
}

export const mutations = {
  [SET_RESULT] (state, list) {
    state.result = list
  },
  [SET_META] (state, meta) {
    state.meta = meta
  }
}

export const actions = {
  async getLogbookList ({ commit }) {
    await GroupwareAPI.get('/logbook/')
      .then(r => r.data)
      .then(data => {
        commit(SET_RESULT, _orderBy(data.results, ['startTimeTask'], ['desc']))
        commit(SET_META, data._meta)
      }).catch(e => {
        commit(SET_RESULT, e)
      })
  }
}
