import { QueryClientProvider } from '@tanstack/react-query'
import { Outlet } from 'react-router'

import { queryClient } from '@/api/queryClient'
import { TopProgressBar } from '@/components/layout/TopProgressBar'
import { AppToaster } from '@/components/ui/AppToaster'
import { AuthProvider } from '@/contexts/AuthContext'

export function RouterRoot() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TopProgressBar />
        <Outlet />
        <AppToaster />
      </AuthProvider>
    </QueryClientProvider>
  )
}
