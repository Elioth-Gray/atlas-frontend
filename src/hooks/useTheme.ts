import { useSyncExternalStore } from 'react'

import type { Theme } from '@/utils/theme'
import { saveTheme } from '@/utils/theme'

// The `dark` class on <html> is the single source of truth, so every reader stays in sync
function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange)
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
  return () => observer.disconnect()
}

function getSnapshot(): Theme {
  return document.documentElement.classList.contains('dark') ? 'dark' : 'light'
}

export function useTheme() {
  const theme = useSyncExternalStore(subscribe, getSnapshot, (): Theme => 'light')

  function toggleTheme() {
    saveTheme(theme === 'dark' ? 'light' : 'dark')
  }

  return { theme, toggleTheme }
}
