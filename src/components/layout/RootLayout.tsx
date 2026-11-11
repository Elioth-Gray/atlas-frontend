import { Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { Outlet, useLocation } from 'react-router'

import { ErrorFallback } from '@/components/ErrorFallback'

import { AppSidebar } from './AppSidebar'

// Every page renders inside this boundary, so a crashing page shows the fallback, not a blank screen
export function RootLayout() {
  const { pathname } = useLocation()

  return (
    <div className="flex min-h-svh flex-col bg-background font-sans lg:flex-row">
      <AppSidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <ErrorBoundary FallbackComponent={ErrorFallback} resetKeys={[pathname]}>
          <Suspense
            fallback={<p className="p-6 text-sm text-muted-foreground">Memuat halaman...</p>}
          >
            <Outlet />
          </Suspense>
        </ErrorBoundary>
      </div>
    </div>
  )
}
