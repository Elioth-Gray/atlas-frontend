import { Link } from 'react-router'

import { BrandLogo } from '@/components/brand/BrandLogo'
import type { Theme } from '@/utils/theme'

import { FOOTER_HELP_LINKS, FOOTER_PRODUCT_LINKS } from '../landingData'
import { CONTAINER_CLASS, TEXT_LINK_CLASS } from '../landingStyles'

const GROUP_CLASS = 'flex flex-col gap-2'
const GROUP_LABEL_CLASS = 'text-sm font-medium text-sheet-muted'

export function LandingFooter({ theme }: { theme: Theme }) {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-sheet-rule">
      <div className={`${CONTAINER_CLASS} grid gap-12 pt-16 pb-10 lg:grid-cols-12 lg:gap-x-8`}>
        <div className="lg:col-span-5">
          <BrandLogo to="/" tone={theme === 'dark' ? 'light' : 'default'} />
          <p className="mt-5 max-w-[40ch] text-base leading-relaxed text-sheet-ink-2">
            Feedback pelanggan dan perbaikan bisnis berbasis AI untuk UMKM Indonesia.
          </p>
        </div>

        <nav
          aria-label="Tautan footer"
          className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-6 lg:col-start-7"
        >
          <div className={GROUP_CLASS}>
            <p className={GROUP_LABEL_CLASS}>Produk</p>
            {FOOTER_PRODUCT_LINKS.map((link) => (
              <a key={link.label} href={link.href} className={`w-fit ${TEXT_LINK_CLASS}`}>
                {link.label}
              </a>
            ))}
          </div>
          <div className={GROUP_CLASS}>
            <p className={GROUP_LABEL_CLASS}>Akun</p>
            <Link to="/login" className={`w-fit ${TEXT_LINK_CLASS}`}>
              Masuk
            </Link>
            <Link to="/signup" className={`w-fit ${TEXT_LINK_CLASS}`}>
              Daftar
            </Link>
          </div>
          <div className={GROUP_CLASS}>
            <p className={GROUP_LABEL_CLASS}>Bantuan</p>
            {FOOTER_HELP_LINKS.map((link) => (
              <a key={link.label} href={link.href} className={`w-fit ${TEXT_LINK_CLASS}`}>
                {link.label}
              </a>
            ))}
          </div>
        </nav>

        <div className="flex flex-col gap-1 border-t border-sheet-rule pt-6 text-sm text-sheet-muted sm:flex-row sm:justify-between lg:col-span-12">
          <p>&copy; {year} ATLAS. Semua hak dilindungi.</p>
          <p>Dibuat untuk UMKM Indonesia.</p>
        </div>
      </div>
    </footer>
  )
}
