import Vue from 'vue'
import { GroupwareAPI } from '../../lib/axios'

function getHeatmapDataKey (month, year) {
  return `${parseInt(year)}/${parseInt(month)}`
}

export const state = () => ({
  allLogbookData: [],
  dataByMonthYear: {},
  isLoading: false
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
  toggleLoading (state, isLoading) {
    state.isLoading = typeof isLoading === 'boolean'
      ? isLoading
      : !state.isLoading
  },
  setLogbookData (state, data) {
    state.allLogbookData = Array.isArray(data) ? data : []

    const groupedByMonth = state.allLogbookData.reduce((groups, logbook) => {
      const dateTask = new Date(logbook.dateTask)
      const [dateNum, month, year] = [
        dateTask.getDate(),
        dateTask.getMonth(),
        dateTask.getFullYear()
      ]
      const groupName = `${year}/${month}`
      if (groupName in groups === false) {
        groups[groupName] = {}
      }
      if (dateNum in groups[groupName] === false) {
        groups[groupName][dateNum] = 1
      } else {
        groups[groupName][dateNum] += 1
      }

      return groups
    }, {})

    state.dataByMonthYear = groupedByMonth
  },
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
  async fetchAllLogbookData ({ state, commit, dispatch }) {
    if (state.isLoading) {
      return
    }
    commit('toggleLoading', true)
    try {
      const response = await GroupwareAPI.get('/logbook/batch')
      commit('setLogbookData', response.data)
    } catch (e) {
      // TODO: handle error
    } finally {
      commit('toggleLoading', false)
    }
  }
}
