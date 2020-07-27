import store from '@/store'
import { getTokenFromCookie } from '../lib/js-cookie'
import { setToken } from '../lib/axios'

const publicPaths = ['/', '/login']
const isPublicPath = (path) => {
  if (path === '/') {
    return true
  }
  return publicPaths.some(x => path.startsWith(x))
}

export default async (to, from, next) => {
  try {
    if (!store.state.auth.user && !store.state.auth.isInitialized) {
      const t = getTokenFromCookie()
      if (t) {
        setToken(t)
        await store
          .dispatch('auth/getUserProfile')
          .catch(e => {})
      }
    }

    store.commit('auth/AUTH_INITIALIZED')
    if (store.state.auth.user) {
      next()
    } else {
      if (isPublicPath(to.path)) {
        next()
      } else {
        next('/')
      }
    }
  } catch (e) {
    store.commit('auth/AUTH_INITIALIZED')
    next('/')
  }
}
