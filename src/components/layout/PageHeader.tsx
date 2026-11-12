import { Search } from 'lucide-react'

import { CURRENT_USER } from '@/constants'

import { ThemeToggle } from './ThemeToggle'

interface PageHeaderProps {
  title: string
  subtitle: string
}

export function PageHeader({ title, subtitle }: PageHeaderProps) {
  return (
    <header className="sticky top-0 z-30 flex min-h-[84px] flex-col justify-center gap-3 border-b border-border bg-surface px-4 py-4 sm:px-7 lg:flex-row lg:items-center lg:justify-between">
      <div>
        <h1 className="min-w-0 font-display text-[28px] leading-[1.02] font-normal break-words text-heading uppercase sm:text-[32px]">
          {title}
        </h1>
        <p className="pt-1.5 text-[13px] leading-5 text-body">{subtitle}</p>
      </div>

      <div className="flex items-center gap-[9px]">
        <label className="relative flex h-[37px] flex-1 items-center sm:w-[245px] sm:flex-none">
          <span className="sr-only">Cari feedback</span>
          <Search
            aria-hidden="true"
            className="pointer-events-none absolute left-2.5 size-[17px] text-muted-foreground"
            strokeWidth={1.6}
          />
          <input
            type="search"
            placeholder="Cari feedback, masalah..."
            className="h-full w-full border border-field bg-surface-subtle pr-3 pl-9 text-[11px] text-body placeholder:text-muted-foreground focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-secondary"
          />
        </label>

        <ThemeToggle />

        <button
          type="button"
          aria-label={`Buka profil ${CURRENT_USER.name}`}
          className="relative flex size-[37px] shrink-0 items-center justify-center border border-border bg-surface-subtle"
        >
          <span className="flex size-[31px] items-center justify-center bg-primary text-[11px] text-white">
            {CURRENT_USER.initials}
          </span>
        </button>
      </div>
    </header>
  )
}
