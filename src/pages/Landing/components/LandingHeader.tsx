import { Menu, X } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router'

import { BrandLogo } from '@/components/brand/BrandLogo'
import { cn } from '@/utils/cn'

import { NAV_LINKS } from '../landingData'

const NAV_LINK_CLASS =
  'rounded-lg px-3 py-2 text-[13px] font-medium text-body transition-colors hover:bg-surface-subtle hover:text-heading'

export function LandingHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/85 backdrop-blur-xl">
      <div className="mx-auto flex h-[76px] w-full max-w-7xl items-center justify-between gap-4 px-5 sm:px-8">
        <BrandLogo to="/" />

        <nav aria-label="Navigasi utama" className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((link) => (
            <a key={link.label} href={link.href} className={NAV_LINK_CLASS}>
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            to="/login"
            className="hidden h-10 items-center rounded-xl px-4 text-[13px] font-semibold text-body transition-colors hover:bg-surface-subtle hover:text-heading sm:inline-flex"
          >
            Masuk
          </Link>
          <Link
            to="/signup"
            className="hidden h-10 items-center rounded-xl bg-linear-to-r from-[#8B5CF6] to-[#6D28D9] px-4 text-[13px] font-semibold text-white shadow-[0_10px_24px_-12px_rgba(109,40,217,0.75)] transition-opacity hover:opacity-90 sm:inline-flex"
          >
            Daftar
          </Link>

          <button
            type="button"
            aria-label={isMenuOpen ? 'Tutup menu' : 'Buka menu'}
            aria-expanded={isMenuOpen}
            aria-controls="menu-mobile"
            onClick={() => setIsMenuOpen((open) => !open)}
            className="flex size-10 items-center justify-center rounded-xl border border-border bg-surface text-heading transition-colors hover:bg-surface-subtle lg:hidden"
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
          'grid border-t border-border/70 transition-[grid-template-rows] duration-300 lg:hidden',
          isMenuOpen ? 'grid-rows-[1fr]' : 'pointer-events-none grid-rows-[0fr]'
        )}
      >
        <div className="overflow-hidden">
          <nav aria-label="Navigasi mobile" className="flex flex-col gap-1 px-5 py-4 sm:px-8">
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

            <div className="mt-2 grid grid-cols-2 gap-2 sm:hidden">
              <Link
                to="/login"
                onClick={() => setIsMenuOpen(false)}
                className="flex h-10 items-center justify-center rounded-xl border border-border bg-surface text-[13px] font-semibold text-body"
              >
                Masuk
              </Link>
              <Link
                to="/signup"
                onClick={() => setIsMenuOpen(false)}
                className="flex h-10 items-center justify-center rounded-xl bg-linear-to-r from-[#8B5CF6] to-[#6D28D9] text-[13px] font-semibold text-white"
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
