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

// True once the visitor has picked a theme; pages with their own default (the landing) read it
export function hasStoredTheme() {
  try {
    return localStorage.getItem(STORAGE_KEY) !== null
  } catch {
    return false
  }
}

export function applyTheme(theme: Theme) {
  document.documentElement.classList.toggle('dark', theme === 'dark')
  // The dark token block in index.css keys on this attribute
  document.documentElement.dataset.theme = theme
}

export function saveTheme(theme: Theme) {
  applyTheme(theme)
  try {
    localStorage.setItem(STORAGE_KEY, theme)
  } catch {
    // The choice still applies for this visit
  }
}
