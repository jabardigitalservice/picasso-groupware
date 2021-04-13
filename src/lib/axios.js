import axios from 'axios'
import { getAxiosConfig } from '../config'

import {
  getRefreshTokenFromCookie,
  setRefreshTokenInCookie,
  setTokenInCookie
} from './js-cookie'

export const GroupwareAPI = (function () {
  const config = getAxiosConfig()
  return axios.create(config)
})()

export function setToken (token) {
  if (token) {
    GroupwareAPI.defaults.headers.common['Authorization'] = `Bearer ${token}`
  } else {
    delete GroupwareAPI.defaults.headers.common['Authorization']
  }
}

export async function getNewToken () {
  try {
    const oldRefreshToken = getRefreshTokenFromCookie()
    if (!oldRefreshToken) {
      throw new Error('no refresh token in cookie')
    }
    const [newRefreshToken, newAuthToken] = await GroupwareAPI
      .post('auth/refresh/', {
        refreshtoken: oldRefreshToken
      })
      .then((res) => res.data)
      .then(({ refresh_token: newRefreshToken, auth_token: newAuthToken }) => {
        if (!newRefreshToken || !newAuthToken) {
          throw new Error('no refresh token from API')
        }
        setRefreshTokenInCookie(newRefreshToken)
        setTokenInCookie(newAuthToken)
        setToken(newAuthToken)
        return [newRefreshToken, newAuthToken]
      })
    return {
      refreshToken: newRefreshToken,
      authToken: newAuthToken
    }
  } catch (e) {
    setRefreshTokenInCookie(null)
    setTokenInCookie(null)
    setToken(null)
    throw e
  }
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
        }
      } else {
        return Promise.reject(error)
      }
    }
  )
}
