import '@fontsource/anton/latin-400.css'
import '@fontsource/public-sans/latin-400.css'
import '@fontsource/public-sans/latin-500.css'
import '@fontsource/public-sans/latin-600.css'
import '@fontsource/public-sans/latin-700.css'
import './index.css'

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ErrorBoundary } from 'react-error-boundary'
import { RouterProvider } from 'react-router/dom'

import { ErrorFallback } from '@/components/ErrorFallback'
import { router } from '@/router'
import { applyTheme, getStoredTheme } from '@/utils/theme'

// Set before the first render so the saved theme shows without a light flash
applyTheme(getStoredTheme())

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* App-level boundary, every page also has its own boundary in RootLayout */}
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <RouterProvider router={router} />
    </ErrorBoundary>
  </StrictMode>
)
