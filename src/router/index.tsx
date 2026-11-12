import { createBrowserRouter, Navigate, type RouteObject } from 'react-router'

import { RootLayout } from '@/components/layout/RootLayout'
// Halaman customer tanpa layout Admin
import ScanQRPage from '@/pages/ScanQr/ScanQRPage'
import ScanQRSuccess from '@/pages/ScanQr/ScanQRSuccess'

import {
  AkunBisnisPage,
  BuatQrPage,
  DashboardPage,
  GoogleMapsPage,
  GrupFeedbackPage,
} from './lazyPages'

export const routes: RouteObject[] = [
  // PUBLIC CUSTOMER ROUTES
  {
    path: '/feedback/outlet',
    element: <ScanQRPage />,
  },
  {
    path: '/feedback/outlet/success',
    element: <ScanQRSuccess />,
  },

  // ADMIN ROUTES
  {
    element: <RootLayout />,
    children: [
      { index: true, element: <DashboardPage /> },
      { path: 'buat-qr', element: <BuatQrPage /> },
      { path: 'google-maps', element: <GoogleMapsPage /> },
      { path: 'grup-feedback', element: <GrupFeedbackPage /> },
      { path: 'akun-bisnis', element: <AkunBisnisPage /> },

      // Unknown paths redirect to Dashboard
      { path: '*', element: <Navigate to="/" replace /> },
    ],
  },
]

export const router = createBrowserRouter(routes)
