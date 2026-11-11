import type { Theme } from '@/utils/theme'

// Shared by the on-screen preview and the downloaded file, so both always match
export interface PosterTheme {
  background: string
  glow: string
  orbit: string
  brandText: string
  heading: string
  body: string
  qrBox: string
  qrModules: string
}

export const POSTER_THEMES: Record<Theme, PosterTheme> = {
  light: {
    background: '#FFFFFF',
    glow: 'rgba(130, 97, 255, 0.4)',
    orbit: 'rgba(130, 97, 255, 0.25)',
    brandText: '#475569',
    heading: '#172033',
    body: '#475569',
    qrBox: '#6442DD',
    qrModules: '#FFFFFF',
  },
  dark: {
    background: '#10111D',
    glow: 'rgba(112, 72, 229, 0.55)',
    orbit: 'rgba(167, 133, 255, 0.3)',
    brandText: '#898A9D',
    heading: '#F5F4FB',
    body: '#898A9D',
    qrBox: '#7048E5',
    qrModules: '#FFFFFF',
  },
}
