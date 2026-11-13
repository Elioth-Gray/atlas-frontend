import { lazy } from 'react'

// Every page is its own chunk, loaded when its route is opened.
// Kept apart from the route list, because fast refresh needs component-only files
export const DashboardPage = lazy(() => import('@/pages/Dashboard/DashboardPage'))
export const CreateQrPage = lazy(() => import('@/pages/CreateQr/CreateQrPage'))
export const FeedbackGroupPage = lazy(() => import('@/pages/FeedbackGroup/FeedbackGroupPage'))
export const BusinessAccountPage = lazy(() => import('@/pages/BusinessAccount/BusinessAccountPage'))
