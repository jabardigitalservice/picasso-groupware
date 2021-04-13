import { GroupwareAPI } from '../../lib/axios'

// state
export const state = {
  isLoading: true,
  itemsReportUser: {},
  itemsAttendanceUser: {}
}

export const mutations = {
  setLoading (state, isLoading) {
    state.isLoading = isLoading
  },
  setReportUser (state, items) {
    state.itemsReportUser = items
  },
  setAttendanceUser (state, items) {
    state.itemsAttendanceUser = items
  }
}

// actions
export const actions = {
  async getDashboardReportUser ({ commit }, { month = null } = {}) {
    commit('setLoading', true)

    const items = await GroupwareAPI.get('dashboard/report-user', {
      params: {
        month: month
      }
    }).then(r => r.data)

    commit('setReportUser', items.data)
    commit('setLoading', false)
  },
  async getDashboardAttendanceUser ({ commit }, { month = null, year = null } = {}) {
    commit('setLoading', true)

    const items = await GroupwareAPI.get('dashboard/attendance-user', {
      params: {
        month: month,
        year: year
      }
    }).then(r => r.data)

    commit('setAttendanceUser', items.data)
    commit('setLoading', false)
  }
}
