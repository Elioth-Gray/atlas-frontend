import type { AxiosError } from 'axios'

const FALLBACK_MESSAGE = 'Something went wrong. Please try again.'

// A failed backend request. `message` is safe to show to the user
export class ApiError extends Error {
  readonly status: number | undefined
  readonly endpoint: string | undefined

  constructor(error: AxiosError) {
    super(getResponseMessage(error.response?.data) ?? FALLBACK_MESSAGE)
    this.name = 'ApiError'
    this.status = error.response?.status
    this.endpoint = error.config?.url
  }
}

// Reads the `message` field of an error body; align with the backend once its format is fixed
function getResponseMessage(data: unknown) {
  if (typeof data !== 'object' || data === null || !('message' in data)) return undefined
  return typeof data.message === 'string' ? data.message : undefined
}
