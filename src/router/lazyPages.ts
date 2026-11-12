import { lazy } from 'react'

// Every page is its own chunk, loaded when its route is opened.
// Kept apart from the route list, because fast refresh needs component-only files
export const DashboardPage = lazy(() => import('@/pages/Dashboard/DashboardPage'))
export const BuatQrPage = lazy(() => import('@/pages/BuatQr/BuatQrPage'))
export const GrupFeedbackPage = lazy(() => import('@/pages/GrupFeedback/GrupFeedbackPage'))
export const AkunBisnisPage = lazy(() => import('@/pages/AkunBisnis/AkunBisnisPage'))
