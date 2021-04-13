import Vue from 'vue'
import startOfMonth from 'date-fns/startOfMonth'
import endOfMonth from 'date-fns/endOfMonth'
import formatDate from 'date-fns/format'
import { GroupwareAPI } from '../../lib/axios'

const MINIMUM_FETCH_MILLIS = 30000

function getHeatmapDataKey (month, year) {
  return `${parseInt(year)}/${parseInt(month)}`
}

export const state = () => ({
  dataByMonthYear: {}
})

export const getters = {
  getTaskCountByDate: (state) => (date) => {
    if (date instanceof Date) {
      const [month, year] = [date.getMonth(), date.getFullYear()]
      const key = getHeatmapDataKey(month, year)
      if (key in state.dataByMonthYear === false) {
        return 0
      }
      const dateString = date.getDate().toString()
      return state.dataByMonthYear[key][dateString] || 0
    } else {
      throw new TypeError('date must be instanceof Date')
    }
  }
}

export const mutations = {
  setHeatMapData (state, { month, year, data }) {
    const key = getHeatmapDataKey(month, year)
    const groupedByDate = data.reduce((groups, item) => {
      const date = new Date(item.dateTask).getDate().toString()
      if (date in groups) {
        groups[date] += 1
      } else {
        groups[date] = 1
      }
      return groups
    }, {})

    Vue.set(state.dataByMonthYear, key, Object.freeze(groupedByDate))
  }
}

export const actions = {
  async checkIfDataStale ({ state }, { month, year }) {
    const key = getHeatmapDataKey(month, year)
    if (key in state.dataByMonthYear === false) {
      return true
    }
    const { lastFetched } = state.dataByMonthYear[key]
    if (typeof lastFetched !== 'number') {
      return true
    }
    return Date.now() - lastFetched > MINIMUM_FETCH_MILLIS
  },
  async getHeatmapData ({ state, rootState, commit, dispatch }, { month, year } = {}) {
    if (typeof month !== 'number' || month < 0) {
      throw new Error('month must be a number greater than 0')
    }
    if (typeof year !== 'number' || year < 2020) {
      throw new Error('year must be a number greater than 2020')
    }

    const startDate = startOfMonth(new Date(year, month))
    const endDate = endOfMonth(new Date(year, month))
    const isDataStale = await dispatch('checkIfDataStale', { month, year })

    if (isDataStale) {
      try {
        const response = await GroupwareAPI
          .get('/logbook/', {
            params: {
              sort: 'dateTask',
              start_date: formatDate(startDate, 'yyyy-MM-dd'),
              end_date: formatDate(endDate, 'yyyy-MM-dd'),
              pageSize: 9999
            }
          })
        commit('setHeatMapData', {
          month,
          year,
          data: response.data.results || []
        })
      } catch (e) {

      }
    }
    const key = getHeatmapDataKey(month, year)
    return state.dataByMonthYear[key] || null
  }
}
