import { lazy } from 'react'

// Every page is its own chunk, loaded when its route is opened.
// Kept apart from the route list, because fast refresh needs component-only files
export const HomePage = lazy(() => import('@/pages/Home/HomePage'))
