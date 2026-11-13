import type { AxiosError } from 'axios'

import type { ApiErrorBody, ErrorCode, FieldError } from '@/typings/api'

const FALLBACK_MESSAGE = 'Terjadi kesalahan. Silakan coba lagi.'

function parseErrorBody(data: unknown): Partial<ApiErrorBody> {
  if (typeof data !== 'object' || data === null) return {}

  if ('error' in data && typeof data.error === 'object' && data.error !== null) {
    const errObj = data.error as Record<string, unknown>
    const code = typeof errObj.code === 'string' ? (errObj.code as ErrorCode) : undefined
    const message = typeof errObj.message === 'string' ? errObj.message : undefined
    const details = Array.isArray(errObj.details)
      ? errObj.details.filter(
          (item): item is FieldError =>
            typeof item === 'object' &&
            item !== null &&
            'field' in item &&
            typeof (item as Record<string, unknown>).field === 'string' &&
            'message' in item &&
            typeof (item as Record<string, unknown>).message === 'string'
        )
      : undefined
    return { code, message, details }
  }

  if ('message' in data && typeof data.message === 'string') {
    return { message: data.message }
  }

  return {}
}

// A failed backend request. `message` is safe to show to the user
export class ApiError extends Error {
  readonly status: number | undefined
  readonly code: ErrorCode | undefined
  readonly details: FieldError[]
  readonly endpoint: string | undefined

  constructor(error: AxiosError) {
    const parsed = parseErrorBody(error.response?.data)
    const detailSuffix =
      parsed.details && parsed.details.length > 0
        ? ` (${parsed.details.map((d) => `${d.field}: ${d.message}`).join(', ')})`
        : ''
    super(parsed.message ? `${parsed.message}${detailSuffix}` : FALLBACK_MESSAGE)
    this.name = 'ApiError'
    this.status = error.response?.status
    this.code = parsed.code
    this.details = parsed.details ?? []
    this.endpoint = error.config?.url
  }
}
