import { useState } from 'react'

import { useTheme } from '@/hooks/useTheme'
import type { Theme } from '@/utils/theme'
import { hasStoredTheme, saveTheme } from '@/utils/theme'

// The landing opens on the dark sheet until the visitor picks a theme; after that it follows
// the same saved choice as the dashboard, so the toggle here and there stay in step
export function useLandingTheme() {
  const { theme: appTheme } = useTheme()
  const [isDefaultDark, setIsDefaultDark] = useState(() => !hasStoredTheme())
  const theme: Theme = isDefaultDark ? 'dark' : appTheme

  function toggleTheme() {
    setIsDefaultDark(false)
    saveTheme(theme === 'dark' ? 'light' : 'dark')
  }

  return { theme, toggleTheme }
}
