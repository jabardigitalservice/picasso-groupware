import Vue from 'vue'
import { GroupwareAPI } from '../../lib/axios'

export const state = () => ({
  documents: {}
})

export const mutations = {
  keepDocumentInCache (state, { id, file }) {
    if (typeof id === 'string' && id.length && file instanceof File) {
      Vue.set(state.documents, id, file)
    }
  }
}

export const actions = {
  async getDocument ({ state, commit }, { path, cacheFirst = true } = {}) {
    if (typeof path !== 'string' || !path.length) {
      return Promise.reject(new Error('path is either empty or not a string'))
    }
    if (path in state.documents === false || cacheFirst === false) {
      const blob = await GroupwareAPI.get(`file/${path}`, {
        responseType: 'blob'
      }).then(r => r.data)
      const filename = path.replace('document/', '')
      const file = new File([blob], filename)
      commit('keepDocumentInCache', {
        id: path,
        file: file
      })
    }
    return state.documents[path]
  }
}
