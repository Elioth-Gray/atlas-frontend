import { createBrowserRouter, Navigate, type RouteObject } from 'react-router'

import { RootLayout } from '@/components/layout/RootLayout'

import { HomePage } from './lazyPages'

export const routes: RouteObject[] = [
  {
    element: <RootLayout />,
    children: [
      { index: true, element: <HomePage /> },
      // No 404 page yet, unknown paths go back to the home page
      { path: '*', element: <Navigate to="/" replace /> },
    ],
  },
]

export const router = createBrowserRouter(routes)
