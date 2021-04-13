import _cloneDeep from 'lodash/cloneDeep'
// import pMinDelay from 'p-min-delay'
import { GroupwareAPI } from '../../lib/axios'

export const state = () => ({
  logbookInView: null
})

export const mutations = {
  setLogbookInView (state, logbook) {
    state.logbookInView = _cloneDeep(logbook)
  }
}

export const actions = {
  async getLogbookList ({ state, commit }, params = {}) {
    const get = await GroupwareAPI.get('/logbook/', {
      params: {
        sort: 'dateTask',
        ...params
      }
    }).then(r => r.data)
    return get
  },
  async getLogbookById (_, { id }) {
    if (typeof id !== 'string' || !id.length) {
      return Promise.reject(new Error('id is either empty or not a string'))
    }
    return GroupwareAPI.get(`logbook/${id}`)
      .then(r => r.data)
      .then((logbook) => {
        const {
          documentTask = {},
          evidenceTask = {},
          blobTask,
          createdBy,
          updatedBy,
          __v,
          ...rest
        } = logbook

        return Object.assign(
          {},
          rest,
          {
            documentTaskPath: documentTask.filePath,
            documentTaskURL: documentTask.fileURL,
            evidenceTaskPath: evidenceTask.filePath,
            evidenceTaskURL: evidenceTask.fileURL
          }
        )
      })
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
