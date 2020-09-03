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
  messaging.getToken().then((currentToken) => {
    if (currentToken) {
      onTokenRetrieved(currentToken)
    }
  })
}

export function updateToken () {
  messaging.getToken().then((currentToken) => {
    if (currentToken) {
      onTokenRefreshed(currentToken)
    }
  })
}

export function listenToRefreshTokenEvent () {
  messaging.onTokenRefresh(() => {
    messaging.getToken().then((refreshedToken) => {
      onTokenRefreshed(refreshedToken)
    })
  })
}
