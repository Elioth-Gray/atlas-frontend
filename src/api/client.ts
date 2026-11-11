import axios, { isAxiosError } from 'axios'

import { ApiError } from './ApiError'

// Every request to the backend goes through this instance
export const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  // Ask for JSON, so error responses come back as JSON too
  headers: { Accept: 'application/json' },
})

// Callers only ever see ApiError, never a raw axios error
api.interceptors.response.use(
  (response) => response,
  (error: unknown) => {
    throw isAxiosError(error) ? new ApiError(error) : error
  }
)
