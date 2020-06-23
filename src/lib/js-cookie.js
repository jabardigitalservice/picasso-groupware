import jsCookie from 'js-cookie'

const key = 'groupware_token'

export function setTokenInCookie (token) {
  if (typeof token !== 'string' || !token.length) {
    jsCookie.remove(key)
  } else {
    jsCookie.set(key, token)
  }
}

export function getTokenFromCookie () {
  return jsCookie.get(key)
}
