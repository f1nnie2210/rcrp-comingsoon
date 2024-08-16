import axios from 'axios'
import { getToken } from './tokenStorage'
import { refreshAccessToken } from './auth'

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
})

axiosInstance.interceptors.request.use(
  async (config) => {
    const token = getToken()
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error),
)

axiosInstance.interceptors.response.use(
  (response) => {
    return response
  },
  async (error) => {
    const originalRequest = error.config
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true
      try {
        const resp = await refreshAccessToken()
        const newToken = resp.accessToken
        axios.defaults.headers.common['Authorization'] = `Bearer ${newToken}`
        return axiosInstance(originalRequest)
      } catch (refreshError) {
        console.error('Token refresh failed:', refreshError)
      }
    }
    return Promise.reject(error)
  },
)

export default axiosInstance
