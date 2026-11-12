import { Menu, X } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router'

import { BrandLogo } from '@/components/brand/BrandLogo'
import { ThemeToggle } from '@/components/layout/ThemeToggle'
import { cn } from '@/utils/cn'
import type { Theme } from '@/utils/theme'

import { useActiveSection } from '../hooks/useActiveSection'
import { NAV_LINKS } from '../landingData'
import { CONTAINER_CLASS, PRIMARY_BUTTON_CLASS } from '../landingStyles'

// The underline draws in from the left on hover and stays under the section in view
const NAV_LINK_CLASS =
  'relative px-2 py-2 text-sm font-medium text-sheet-ink-2 transition-colors duration-200 after:pointer-events-none after:absolute after:inset-x-2 after:bottom-1 after:h-px after:origin-left after:scale-x-0 after:bg-sheet-signal-text after:transition-transform after:duration-300 hover:text-sheet-ink hover:after:scale-x-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sheet-signal-text motion-reduce:after:transition-none'

const ACTIVE_LINK_CLASS = 'text-sheet-ink after:scale-x-100'

const SECTION_IDS = NAV_LINKS.map((link) => link.href.slice(1))

const TOGGLE_CLASS =
  'flex size-10 shrink-0 items-center justify-center border border-sheet-rule text-sheet-ink transition-colors hover:border-sheet-signal hover:text-sheet-signal-text focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sheet-signal-text active:translate-y-px'

interface LandingHeaderProps {
  theme: Theme
  onToggleTheme: () => void
}

export function LandingHeader({ theme, onToggleTheme }: LandingHeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const activeId = useActiveSection(SECTION_IDS)

  return (
    <header className="sticky top-0 z-50 border-b border-sheet-rule bg-sheet/90 backdrop-blur-md">
      <div className={`${CONTAINER_CLASS} flex h-16 items-center justify-between gap-4`}>
        <BrandLogo to="/" size="sm" tone={theme === 'dark' ? 'light' : 'default'} />

        <nav aria-label="Navigasi utama" className="hidden items-center gap-3 lg:flex">
          {NAV_LINKS.map((link) => {
            const isActive = link.href === `#${activeId}`
            return (
              <a
                key={link.label}
                href={link.href}
                aria-current={isActive ? 'location' : undefined}
                className={cn(NAV_LINK_CLASS, isActive && ACTIVE_LINK_CLASS)}
              >
                {link.label}
              </a>
            )
          })}
        </nav>

        <div className="flex items-center gap-3">
          <ThemeToggle theme={theme} onToggle={onToggleTheme} className={TOGGLE_CLASS} />
          <Link to="/login" className={cn(NAV_LINK_CLASS, 'hidden sm:inline-flex')}>
            Masuk
          </Link>
          <Link to="/signup" className={cn(PRIMARY_BUTTON_CLASS, 'hidden sm:inline-flex')}>
            Daftar
          </Link>

          <button
            type="button"
            aria-label={isMenuOpen ? 'Tutup menu' : 'Buka menu'}
            aria-expanded={isMenuOpen}
            aria-controls="menu-mobile"
            onClick={() => setIsMenuOpen((open) => !open)}
            className="flex size-10 items-center justify-center border border-sheet-ink-2 text-sheet-ink transition-colors hover:border-sheet-signal hover:bg-sheet-signal hover:text-sheet-signal-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sheet-signal-text active:translate-y-px lg:hidden"
          >
            {isMenuOpen ? (
              <X aria-hidden="true" className="size-5" />
            ) : (
              <Menu aria-hidden="true" className="size-5" />
            )}
          </button>
        </div>
      </div>

      <div
        id="menu-mobile"
        inert={!isMenuOpen}
        className={cn(
          'grid border-t border-sheet-rule transition-[grid-template-rows] duration-300 motion-reduce:transition-none lg:hidden',
          isMenuOpen ? 'grid-rows-[1fr]' : 'pointer-events-none grid-rows-[0fr] border-transparent'
        )}
      >
        <div className="overflow-hidden">
          <nav
            aria-label="Navigasi mobile"
            className={`${CONTAINER_CLASS} flex flex-col gap-1 py-4`}
          >
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className={NAV_LINK_CLASS}
              >
                {link.label}
              </a>
            ))}

            <div className="mt-3 grid grid-cols-2 gap-3 sm:hidden">
              <Link
                to="/login"
                onClick={() => setIsMenuOpen(false)}
                className="flex h-10 items-center justify-center border border-sheet-ink-2 text-sm font-semibold text-sheet-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sheet-signal-text"
              >
                Masuk
              </Link>
              <Link
                to="/signup"
                onClick={() => setIsMenuOpen(false)}
                className={PRIMARY_BUTTON_CLASS}
              >
                Daftar
              </Link>
            </div>
          </nav>
        </div>
      </div>
    </header>
  )
}
