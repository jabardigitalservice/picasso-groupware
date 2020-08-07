import jsCookie from 'js-cookie'

const tokenKey = 'groupware_token'
const refreshKey = 'groupware_refresh_token'

export function setTokenInCookie (token, opts) {
  if (typeof token !== 'string' || !token.length) {
    jsCookie.remove(tokenKey)
  } else {
    jsCookie.set(tokenKey, token, opts)
  }
}

export function setRefreshTokenInCookie (token, opts) {
  if (typeof token !== 'string' || !token.length) {
    jsCookie.remove(refreshKey)
  } else {
    jsCookie.set(refreshKey, token, opts)
  }
}

export function getTokenFromCookie () {
  return jsCookie.get(tokenKey)
}

export function getRefreshTokenFromCookie () {
  return jsCookie.get(refreshKey)
}
