import { Moon, Sun } from 'lucide-react'

import { useTheme } from '@/hooks/useTheme'
import type { Theme } from '@/utils/theme'

const DEFAULT_CLASS =
  'flex size-[37px] shrink-0 items-center justify-center border border-border bg-surface-subtle text-body transition-colors hover:text-heading focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-secondary'

interface ThemeToggleProps {
  /** A page with its own default theme (the landing) passes its theme and toggle */
  theme?: Theme
  onToggle?: () => void
  /** Replaces the default look, for pages drawn in another palette */
  className?: string
}

export function ThemeToggle({ theme: themeOverride, onToggle, className }: ThemeToggleProps) {
  const { theme: appTheme, toggleTheme } = useTheme()
  const theme = themeOverride ?? appTheme
  const isDark = theme === 'dark'

  return (
    <button
      type="button"
      aria-label={isDark ? 'Gunakan tema terang' : 'Gunakan tema gelap'}
      aria-pressed={isDark}
      title={isDark ? 'Tema terang' : 'Tema gelap'}
      onClick={onToggle ?? toggleTheme}
      className={className ?? DEFAULT_CLASS}
    >
      {isDark ? (
        <Sun aria-hidden="true" className="size-[17px]" strokeWidth={1.6} />
      ) : (
        <Moon aria-hidden="true" className="size-[17px]" strokeWidth={1.6} />
      )}
    </button>
  )
}
