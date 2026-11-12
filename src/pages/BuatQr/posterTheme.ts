import type { Theme } from '@/utils/theme'

// Shared by the on-screen preview and the downloaded file, so both always match
export interface PosterTheme {
  background: string
  glow: string
  orbit: string
  brandText: string
  /** The ATLAS mark drawn for this poster's ground */
  logoSrc: string
  /** Orbit and planet colours for the drawn fallback when the mark file cannot load */
  markInk: string
  markPlanet: string
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
    brandText: '#15110D',
    logoSrc: '/logo/atlas-mark.svg',
    markInk: '#15110D',
    markPlanet: '#7048E5',
    heading: '#172033',
    body: '#475569',
    qrBox: '#6442DD',
    qrModules: '#FFFFFF',
  },
  dark: {
    background: '#10111D',
    glow: 'rgba(112, 72, 229, 0.55)',
    orbit: 'rgba(167, 133, 255, 0.3)',
    brandText: '#F3EFE6',
    logoSrc: '/logo/atlas-mark-on-dark.svg',
    markInk: '#F3EFE6',
    markPlanet: '#7048E5',
    heading: '#F5F4FB',
    body: '#898A9D',
    qrBox: '#7048E5',
    qrModules: '#FFFFFF',
  },
}
