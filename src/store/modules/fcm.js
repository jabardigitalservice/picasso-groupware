import { GroupwareAPI } from '../../lib/axios'

export const actions = {
  getDeviceTokenByUserId (_, { userId }) {
    return GroupwareAPI.get(`device-token/detail/${userId}`)
      .then((r) => r.data || {})
      .then(({ deviceToken }) => deviceToken || null)
      .catch((e) => null)
  },
  createRegistrationToken ({ rootState }, { token } = {}) {
    return GroupwareAPI.post('device-token/create', {
      userID: rootState.auth.user.id,
      appID: process.env.VUE_APP_FIREBASE_APP_ID,
      deviceToken: token
    })
  },
  updateRegistrationToken ({ rootState }, { token } = {}) {
    const userId = rootState.auth.user.id
    return GroupwareAPI.put(`device-token/update/${userId}`, {
      userID: rootState.auth.user.id,
      appID: process.env.VUE_APP_FIREBASE_APP_ID,
      deviceToken: token
    })
  },
  deleteRegistrationToken ({ rootState }) {
    const userId = rootState.auth.user.id
    return GroupwareAPI.delete(`device-token/delete/${userId}`)
  }
}
