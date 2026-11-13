import * as THREE from 'three'

export type GalaxyThemeName = 'light' | 'dark'

export interface GalaxyTheme {
  hemisphere: { sky: string; ground: string; intensity: number }
  keyLight: { color: string; intensity: number }
  rimLight: { color: string; intensity: number }
  // Dark space shows gas-giant bands; the light theme keeps smooth pastel planets
  bandedPlanets: boolean
  atmosphere: { color: string | null; strength: number; blending: THREE.Blending }
  orbit: { color: string; opacity: number; dashed: boolean }
  stars: { tints: string[]; opacity: number; blending: THREE.Blending }
  glow: { color: string; opacity: number; blending: THREE.Blending }
  streak: { color: string; blending: THREE.Blending }
}

export const GALAXY_THEMES: Record<GalaxyThemeName, GalaxyTheme> = {
  light: {
    hemisphere: { sky: '#FFFFFF', ground: '#D9CCF5', intensity: 2.3 },
    keyLight: { color: '#FFFFFF', intensity: 1.3 },
    rimLight: { color: '#F3C6E0', intensity: 0.5 },
    bandedPlanets: false,
    atmosphere: { color: '#FFFFFF', strength: 0.6, blending: THREE.NormalBlending },
    orbit: { color: '#B7A0DE', opacity: 0.9, dashed: false },
    stars: {
      tints: ['#9B7BFF', '#A785FF', '#7FA7F5', '#D58BC0'],
      opacity: 0.9,
      blending: THREE.NormalBlending,
    },
    glow: { color: '#9B7BFF', opacity: 0.32, blending: THREE.NormalBlending },
    streak: { color: '#8F6AFF', blending: THREE.NormalBlending },
  },
  dark: {
    hemisphere: { sky: '#A785FF', ground: '#070812', intensity: 0.7 },
    keyLight: { color: '#FFF3E6', intensity: 2.8 },
    rimLight: { color: '#67B5FF', intensity: 1.1 },
    bandedPlanets: true,
    atmosphere: { color: null, strength: 0.95, blending: THREE.AdditiveBlending },
    orbit: { color: '#A785FF', opacity: 0.28, dashed: true },
    stars: {
      tints: ['#F5F4FB', '#A785FF', '#67B5FF', '#FFFFFF'],
      opacity: 1,
      blending: THREE.AdditiveBlending,
    },
    glow: { color: '#7048E5', opacity: 0.5, blending: THREE.AdditiveBlending },
    streak: { color: '#FFFFFF', blending: THREE.AdditiveBlending },
  },
}
