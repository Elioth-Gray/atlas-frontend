import axios, { type InternalAxiosRequestConfig, isAxiosError } from 'axios'

import type { AuthResponse, DataResponse } from '@/typings/api'

import { ApiError } from './ApiError'
import { clearAuthSession, getAuthSession, setAuthFromResponse } from './authSession'

interface RetriableRequestConfig extends InternalAxiosRequestConfig {
  _retried?: boolean
}

const baseURL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3333'

// Every request to the backend goes through this instance
export const api = axios.create({
  baseURL,
  // Ask for JSON, so error responses come back as JSON too
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
})

let refreshPromise: Promise<string | null> | null = null

async function refreshAccessToken(): Promise<string | null> {
  if (refreshPromise) return refreshPromise

  const session = getAuthSession()
  if (!session?.refreshToken) return null

  refreshPromise = axios
    .post<DataResponse<AuthResponse>>(
      `${baseURL}/api/v1/auth/refresh`,
      { refresh_token: session.refreshToken },
      { headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' } }
    )
    .then((response) => {
      const auth = response.data.data
      setAuthFromResponse(auth)
      return auth.access_token
    })
    .catch(() => {
      clearAuthSession()
      return null
    })
    .finally(() => {
      refreshPromise = null
    })

  return refreshPromise
}

api.interceptors.request.use((config) => {
  const session = getAuthSession()
  if (session?.accessToken && !config.headers.Authorization) {
    config.headers.Authorization = `Bearer ${session.accessToken}`
  }
  return config
})

// Callers only ever see ApiError, never a raw axios error
api.interceptors.response.use(
  (response) => response,
  async (error: unknown) => {
    if (!isAxiosError(error)) throw error

    const originalRequest = error.config as RetriableRequestConfig | undefined
    const status = error.response?.status
    const url = originalRequest?.url ?? ''
    const isAuthEndpoint =
      url.includes('/api/v1/auth/signin') ||
      url.includes('/api/v1/auth/signup') ||
      url.includes('/api/v1/auth/refresh')

    if (status === 401 && originalRequest && !originalRequest._retried && !isAuthEndpoint) {
      originalRequest._retried = true
      const nextToken = await refreshAccessToken()
      if (nextToken) {
        originalRequest.headers.Authorization = `Bearer ${nextToken}`
        return api.request(originalRequest)
      }
    }

    throw new ApiError(error)
  }
)
