import { QueryClient } from '@tanstack/react-query'

import { ApiError } from './ApiError'

const MAX_RETRY_COUNT = 3

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      // A 4xx answer (403, 404, ...) will not change by asking again, only network and server errors are retried
      retry: (failureCount, error) => {
        const isClientError =
          error instanceof ApiError &&
          error.status !== undefined &&
          error.status >= 400 &&
          error.status < 500

        return !isClientError && failureCount < MAX_RETRY_COUNT
      },
      // Refetch when the tab gets focus again only in production, so development stays quiet
      refetchOnWindowFocus: import.meta.env.PROD,
    },
  },
})
