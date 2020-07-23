import * as types from '../mutation-types'
import { GroupwareAPI, setToken } from '../../lib/axios'
import { setTokenInCookie } from '../../lib/js-cookie'

// state
export const state = {
  loading: true,
  user: null
}

// getters
export const getters = {
  loading: state => state.loading,
  user: state => state.user,
  check: state => state.user !== null,
  isInitialized: state => state.loading
}

// mutations
export const mutations = {
  [types.AUTH_LOADING] (state) {
    state.loading = true
  },

  [types.AUTH_INITIALIZED] (state) {
    state.loading = false
  },

  [types.SET_USER] (state, { user }) {
    state.user = user
  },

  [types.UNAUTHENTICATED] (state) {
    state.loading = false
    state.user = null
  }
}

export const actions = {
  async onLoginSuccess ({ commit, dispatch }, { token, expiredAt }) {
    if (token) {
      setToken(token)
      setTokenInCookie(token, {
        expires: new Date(expiredAt)
      })
      await dispatch('getUserProfile')
    } else {
      setToken(null)
      setTokenInCookie(null)
      commit(types.UNAUTHENTICATED)
    }
  },
  onLoginFailed ({ commit }) {
    commit(types.UNAUTHENTICATED)
  },
  async loginUsingUsernameAndPassword ({ commit, dispatch }, { username, password }) {
    await GroupwareAPI.post('/auth/login/', {
      username,
      password
    }).then(r => r.data)
      .then(({ auth_token: token, exp: expiredAt }) => {
        return dispatch('onLoginSuccess', {
          token,
          expiredAt
        })
      })
      .catch((err) => {
        dispatch('onLoginFailed')
        throw err
      })
    commit(types.AUTH_INITIALIZED)
  },
  async login ({ commit, dispatch }) {
    if (!window.GAuth) {
      return
    }
    commit(types.AUTH_LOADING)
    const authCode = await window.GAuth.getAuthCode()
    await GroupwareAPI.post(`social/google-oauth2/`, {
      access_token: authCode
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(r => r.data)
      .then(({ auth_token: token, exp: expiredAt }) => {
        return dispatch('onLoginSuccess', {
          token,
          expiredAt
        })
      })
      .catch((err) => {
        dispatch('onLoginFailed')
        throw err
      })
      .finally(() => {
        commit(types.AUTH_INITIALIZED)
      })
  },
  async getUserProfile ({ state, commit }) {
    if (!state.user) {
      await GroupwareAPI.get('/user/info')
        .then(r => r.data.data)
        .then(profile => {
          commit(types.SET_USER, {
            user: {
              name: profile.nama_lengkap,
              email: profile.email,
              photo: profile.foto
            }
          })
        })
    }
    return state.user
  },
  async logout () {
    if (!window.GAuth) {
      return
    }
    await window.GAuth.signOut()
    setToken(null)
    setTokenInCookie(null)
    window.location.reload()
  }
}
