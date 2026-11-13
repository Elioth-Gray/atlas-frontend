import { createBrowserRouter, Navigate, type RouteObject } from 'react-router'

import { RootLayout } from '@/components/layout/RootLayout'
import { RouterRoot } from '@/components/layout/RouterRoot'
import SignInPage from '@/pages/Auth/SignInPage'
import SignUpPage from '@/pages/Auth/SignUpPage'
import LandingPage from '@/pages/Landing/LandingPage'
// Public customer QR pages without Admin layout
import ScanQRPage from '@/pages/ScanQr/ScanQRPage'
import ScanQRSuccess from '@/pages/ScanQr/ScanQRSuccess'

import { BusinessAccountPage, CreateQrPage, DashboardPage, FeedbackGroupPage } from './lazyPages'

export const routes: RouteObject[] = [
  {
    element: <RouterRoot />,
    children: [
      // PUBLIC LANDING & AUTH
      {
        path: '/',
        element: <LandingPage />,
      },
      {
        path: '/signin',
        element: <SignInPage />,
      },
      {
        path: '/signup',
        element: <SignUpPage />,
      },

      // PUBLIC CUSTOMER ROUTES
      {
        path: '/feedback/:shopId',
        element: <ScanQRPage />,
      },
      {
        path: '/feedback/:shopId/success',
        element: <ScanQRSuccess />,
      },
      {
        path: '/f/:shopId',
        element: <ScanQRPage />,
      },
      {
        path: '/f/:shopId/success',
        element: <ScanQRSuccess />,
      },

      // ADMIN / OWNER ROUTES (English routes)
      {
        element: <RootLayout />,
        children: [
          { path: 'dashboard', element: <DashboardPage /> },
          { path: 'create-qr', element: <CreateQrPage /> },
          { path: 'qr-generator', element: <CreateQrPage /> },
          { path: 'feedback-group', element: <FeedbackGroupPage /> },
          { path: 'issues', element: <FeedbackGroupPage /> },
          { path: 'galaxy', element: <FeedbackGroupPage /> },
          { path: 'business-account', element: <BusinessAccountPage /> },
          { path: 'settings/business', element: <BusinessAccountPage /> },
        ],
      },

      // Unknown paths redirect to the landing page
      { path: '*', element: <Navigate to="/" replace /> },
    ],
  },
]

export const router = createBrowserRouter(routes)
