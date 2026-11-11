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
        <h1 className="text-xl leading-6 font-normal text-heading">{title}</h1>
        <p className="pt-[5px] text-[11px] leading-[13.5px] text-body">{subtitle}</p>
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
            className="h-full w-full rounded-[10px] border border-border bg-surface-subtle pr-3 pl-9 text-[11px] text-body placeholder:text-muted-foreground focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-secondary"
          />
        </label>

        <ThemeToggle />

        <button
          type="button"
          aria-label={`Buka profil ${CURRENT_USER.name}`}
          className="relative flex size-[37px] shrink-0 items-center justify-center rounded-[10px] border border-border bg-surface-subtle"
        >
          <span className="flex size-[31px] items-center justify-center rounded-[9px] bg-gradient-to-br from-[#6D5CB0] to-[#312D58] text-[10px] text-white">
            {CURRENT_USER.initials}
          </span>
          <span className="absolute right-[3px] bottom-[3px] size-[7px] rounded-full border-2 border-border bg-[#4ED3A5]" />
        </button>
      </div>
    </header>
  )
}
