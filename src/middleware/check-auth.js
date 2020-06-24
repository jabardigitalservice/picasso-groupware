import store from '@/store'
import { getTokenFromCookie } from '../lib/js-cookie'
import { setToken } from '../lib/axios'

export default async (to, from, next) => {
  try {
    const t = getTokenFromCookie()
    if (t) {
      setToken(t)
      await store.dispatch('auth/getUserProfile')
    }

    store.commit('auth/AUTH_INITIALIZED')
    if (!store.state.auth.user && to.path !== '/') {
      next('/')
      return
    }
    next()
  } catch (e) {
    next('/')
  }
}
