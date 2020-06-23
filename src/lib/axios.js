import axios from 'axios'

export const GroupwareAPI = axios.create({
  baseURL: process.env.VUE_APP_BASE_API_API
})

export function setToken (token) {
  GroupwareAPI.defaults.headers.common['Authorization'] = token ? `Bearer ${token}` : null
}
