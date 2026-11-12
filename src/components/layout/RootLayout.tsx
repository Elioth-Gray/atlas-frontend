import { Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { Outlet, useLocation } from 'react-router'

import { ErrorFallback } from '@/components/ErrorFallback'

import { AppSidebar } from './AppSidebar'
import { PageSkeleton } from './PageSkeleton'

// Every page renders inside this boundary, so a crashing page shows the fallback, not a blank screen
export function RootLayout() {
  const { pathname } = useLocation()

  return (
    <div className="flex min-h-svh flex-col bg-background font-sans lg:h-svh lg:flex-row lg:overflow-hidden">
      <AppSidebar />
      <div className="flex min-w-0 flex-1 flex-col lg:overflow-y-auto">
        <ErrorBoundary FallbackComponent={ErrorFallback} resetKeys={[pathname]}>
          <Suspense fallback={<PageSkeleton />}>
            <Outlet />
          </Suspense>
        </ErrorBoundary>
      </div>
    </div>
  )
}
