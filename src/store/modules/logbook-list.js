import pMinDelay from 'p-min-delay'
import { GroupwareAPI } from '../../lib/axios'

export const actions = {
  getLogbookList ({ state, commit }, params = {}) {
    const get = GroupwareAPI.get('/logbook/', {
      params: {
        sort: 'dateTask',
        ...params
      }
    }).then(r => r.data)
    return pMinDelay(get, 1000)
  },
  async getLogbookById (_, { id }) {
    if (typeof id !== 'string' || !id.length) {
      return Promise.reject(new Error('id is either empty or not a string'))
    }
    return GroupwareAPI.get(`logbook/${id}`)
      .then(r => r.data)
  },
  insertLogbook (_, payload) {
    return GroupwareAPI.post('/logbook/', payload)
  },
  updateLogbook (_, { id, payload } = {}) {
    if (!id) {
      return Promise.reject(new Error('id must be provided'))
    }
    return GroupwareAPI.put(`/logbook/${id}`, payload)
  }
}
