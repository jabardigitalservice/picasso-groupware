import store from '@/store'
import { getTokenFromCookie } from '../lib/js-cookie'
import { setToken, getNewToken } from '../lib/axios'

const publicPaths = ['/', '/login']
const isPublicPath = (path) => {
  if (path === '/') {
    return true
  }
  return publicPaths.some(x => path.startsWith(x))
}

export default async (to, from, next) => {
  try {
    if (!store.state.auth.isInitialized) {
      let t = getTokenFromCookie()
      if (!t) {
        const result = await getNewToken()
        if (result && result.authToken) {
          t = result.authToken
        }
      }
      if (t) {
        setToken(t)
        await store.dispatch('auth/getUserProfile')
      }
    }
  } catch (e) {
    //
  } finally {
    store.commit('auth/AUTH_INITIALIZED')
    if (store.state.auth.user || isPublicPath(to.path)) {
      next()
    } else {
      next('/')
    }
  }
}
