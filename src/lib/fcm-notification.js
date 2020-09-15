import { messaging } from './firebase'
import store from '../store'

export function getDeviceTokenByUserId (userId) {
  return store.dispatch('fcm/getDeviceTokenByUserId', { userId })
}

function onTokenRetrieved (token) {
  return store.dispatch('fcm/createRegistrationToken', { token })
}

function onTokenRefreshed (token) {
  return store.dispatch('fcm/updateRegistrationToken', { token })
}

export function retrieveToken () {
  if (!messaging) return
  messaging.getToken().then((currentToken) => {
    if (currentToken) {
      onTokenRetrieved(currentToken)
    }
  })
}

export function updateToken () {
  if (!messaging) return
  messaging.getToken().then((currentToken) => {
    if (currentToken) {
      onTokenRefreshed(currentToken)
    }
  })
}

export function listenToRefreshTokenEvent () {
  if (!messaging) return
  messaging.onTokenRefresh(() => {
    messaging.getToken().then((refreshedToken) => {
      onTokenRefreshed(refreshedToken)
    })
  })
}
