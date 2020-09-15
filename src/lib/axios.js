import axios from 'axios'

import {
  getRefreshTokenFromCookie,
  setRefreshTokenInCookie,
  setTokenInCookie
} from './js-cookie'

export const GroupwareAPI = axios.create({
  baseURL: process.env.VUE_APP_BASE_API_API
})

export function setToken (token) {
  if (token) {
    GroupwareAPI.defaults.headers.common['Authorization'] = `Bearer ${token}`
  } else {
    delete GroupwareAPI.defaults.headers.common['Authorization']
  }
}

export async function getNewToken () {
  const refreshToken = getRefreshTokenFromCookie()
  if (!refreshToken) {
    return Promise.reject(new Error('no refresh token'))
  }
  return GroupwareAPI
    .post('auth/refresh/', {
      refreshtoken: refreshToken
    }).then((res) => res.data)
    .then(({ refresh_token: newRefreshToken, auth_token: newAuthToken }) => {
      if (newRefreshToken && newAuthToken) {
        setRefreshTokenInCookie(newRefreshToken)
        setTokenInCookie(newAuthToken)
        setToken(newAuthToken)
      } else {
        setRefreshTokenInCookie(null)
        setTokenInCookie(null)
        setToken(null)
      }
      return {
        refreshToken: newRefreshToken,
        authToken: newAuthToken
      }
    })
}

export function useRefreshTokenHook ({
  onRefreshSuccess,
  onRefreshFailed
}) {
  GroupwareAPI.interceptors.response.use(
    function onSuccess (res) {
      return Promise.resolve(res)
    },
    async function onError (error) {
      if (error && error.response.status === 401) {
        setToken(null)
        try {
          await getNewToken()
          if (typeof onRefreshSuccess === 'function') {
            await onRefreshSuccess()
          }
        } catch (e) {
          if (typeof onRefreshFailed === 'function') {
            await onRefreshFailed()
          }
          throw error
        }
      } else {
        return Promise.reject(error)
      }
    }
  )
}
