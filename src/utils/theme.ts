export type Theme = 'light' | 'dark'

const STORAGE_KEY = 'atlas-theme'

// Storage can throw in private windows or with blocked site data, so it is optional
export function getStoredTheme(): Theme {
  try {
    return localStorage.getItem(STORAGE_KEY) === 'dark' ? 'dark' : 'light'
  } catch {
    return 'light'
  }
}

export function applyTheme(theme: Theme) {
  document.documentElement.classList.toggle('dark', theme === 'dark')
}

export function saveTheme(theme: Theme) {
  applyTheme(theme)
  try {
    localStorage.setItem(STORAGE_KEY, theme)
  } catch {
    // The choice still applies for this visit
  }
}
