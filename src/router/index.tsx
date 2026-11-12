import { createBrowserRouter, Navigate, type RouteObject } from 'react-router'

import { RootLayout } from '@/components/layout/RootLayout'
import LoginPage from '@/pages/Auth/LoginPage'
import SignUpPage from '@/pages/Auth/SignUpPage'
import LandingPage from '@/pages/Landing/LandingPage'
// Halaman customer tanpa layout Admin
import ScanQRPage from '@/pages/ScanQr/ScanQRPage'
import ScanQRSuccess from '@/pages/ScanQr/ScanQRSuccess'

import { AkunBisnisPage, BuatQrPage, DashboardPage, GrupFeedbackPage } from './lazyPages'

export const routes: RouteObject[] = [
  // PUBLIC LANDING & AUTH
  {
    path: '/',
    element: <LandingPage />,
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/signup',
    element: <SignUpPage />,
  },

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
      { path: 'dashboard', element: <DashboardPage /> },
      { path: 'buat-qr', element: <BuatQrPage /> },
      { path: 'grup-feedback', element: <GrupFeedbackPage /> },
      { path: 'akun-bisnis', element: <AkunBisnisPage /> },
    ],
  },

  // Unknown paths redirect to the landing page
  { path: '*', element: <Navigate to="/" replace /> },
]

export const router = createBrowserRouter(routes)
