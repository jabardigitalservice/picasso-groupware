import { GroupwareAPI } from '../../lib/axios'

export const actions = {
  getDeviceTokenByUserId (_, { userId }) {
    return GroupwareAPI.get(`notification/device-token/${userId}`)
      .then((r) => r.data || {})
      .then(({ deviceToken }) => deviceToken || null)
      .catch((e) => null)
  },
  createRegistrationToken ({ rootState }, { token } = {}) {
    return GroupwareAPI.post('notification/device-token/', {
      userID: rootState.auth.user.id,
      appID: process.env.VUE_APP_FIREBASE_APP_ID,
      deviceToken: token
    })
  },
  updateRegistrationToken ({ rootState }, { token } = {}) {
    const userId = rootState.auth.user.id
    return GroupwareAPI.put(`notification/device-token/${userId}`, {
      userID: rootState.auth.user.id,
      appID: process.env.VUE_APP_FIREBASE_APP_ID,
      deviceToken: token
    })
  },
  deleteRegistrationToken ({ rootState }) {
    const userId = rootState.auth.user.id
    return GroupwareAPI.delete(`notification/device-token/${userId}`)
  }
}
