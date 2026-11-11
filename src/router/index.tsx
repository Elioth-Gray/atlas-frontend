import { createBrowserRouter, Navigate, type RouteObject } from 'react-router'

import { RootLayout } from '@/components/layout/RootLayout'

import {
  AkunBisnisPage,
  BuatQrPage,
  DashboardPage,
  GoogleMapsPage,
  GrupFeedbackPage,
} from './lazyPages'

export const routes: RouteObject[] = [
  {
    element: <RootLayout />,
    children: [
      { index: true, element: <DashboardPage /> },
      { path: 'buat-qr', element: <BuatQrPage /> },
      { path: 'google-maps', element: <GoogleMapsPage /> },
      { path: 'grup-feedback', element: <GrupFeedbackPage /> },
      { path: 'akun-bisnis', element: <AkunBisnisPage /> },
      // No 404 page yet, unknown paths go back to the home page
      { path: '*', element: <Navigate to="/" replace /> },
    ],
  },
]

export const router = createBrowserRouter(routes)
