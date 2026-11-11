import { Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { Outlet, useLocation } from 'react-router'

import { ErrorFallback } from '@/components/ErrorFallback'

// Every page renders inside this boundary, so a crashing page shows the fallback, not a blank screen
export function RootLayout() {
  const { pathname } = useLocation()

  return (
    // Opening another page clears the error of the previous one
    <ErrorBoundary FallbackComponent={ErrorFallback} resetKeys={[pathname]}>
      <Suspense fallback={null}>
        <Outlet />
      </Suspense>
    </ErrorBoundary>
  )
}
