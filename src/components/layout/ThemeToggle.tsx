import { Moon, Sun } from 'lucide-react'

import { useTheme } from '@/hooks/useTheme'

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <button
      type="button"
      aria-label={isDark ? 'Gunakan tema terang' : 'Gunakan tema gelap'}
      aria-pressed={isDark}
      title={isDark ? 'Tema terang' : 'Tema gelap'}
      onClick={toggleTheme}
      className="flex size-[37px] shrink-0 items-center justify-center rounded-[10px] border border-border bg-surface-subtle text-body transition-colors hover:text-heading focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-secondary"
    >
      {isDark ? (
        <Sun aria-hidden="true" className="size-[17px]" strokeWidth={1.6} />
      ) : (
        <Moon aria-hidden="true" className="size-[17px]" strokeWidth={1.6} />
      )}
    </button>
  )
}
