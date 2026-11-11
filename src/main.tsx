import './index.css'

import { QueryClientProvider } from '@tanstack/react-query'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ErrorBoundary } from 'react-error-boundary'
import { RouterProvider } from 'react-router/dom'

import { queryClient } from '@/api/queryClient'
import { ErrorFallback } from '@/components/ErrorFallback'
import { router } from '@/router'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* App-level boundary, every page also has its own boundary in RootLayout */}
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </ErrorBoundary>
  </StrictMode>
)
