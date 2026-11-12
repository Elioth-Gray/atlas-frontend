import { ArrowLeft } from 'lucide-react'
import type { ReactNode } from 'react'
import { Link } from 'react-router'

import { BrandLogo } from '@/components/brand/BrandLogo'
import { StarrySky } from '@/components/decor/StarrySky'

interface AuthShellProps {
  title: string
  description: string
  children: ReactNode
}

// Sign-in and sign-up sit on the same dark Manifesto sheet and starry sky as the landing,
// whatever the app theme. Two panes side by side on wide screens, so the page stays in one viewport
export function AuthShell({ title, description, children }: AuthShellProps) {
  const year = new Date().getFullYear()

  return (
    <div
      data-theme="dark"
      className="dark relative isolate flex min-h-svh items-center justify-center bg-background px-4 py-4 font-sans text-body sm:px-8 sm:py-6"
    >
      <StarrySky />

      <div className="w-full max-w-[960px]">
        <Link
          to="/"
          className="group mb-2 inline-flex items-center gap-2 py-1 text-[13px] font-medium text-body transition-colors hover:text-heading focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary sm:mb-4"
        >
          <ArrowLeft
            aria-hidden="true"
            className="size-4 transition-transform duration-200 group-hover:-translate-x-1 motion-reduce:transition-none"
            strokeWidth={1.8}
          />
          Kembali ke beranda
        </Link>

        <div className="grid animate-auth-in border border-border bg-surface/95 md:grid-cols-[minmax(0,5fr)_minmax(0,6fr)]">
          <div className="flex flex-col justify-between gap-4 border-b border-border p-5 md:gap-6 md:border-r md:border-b-0 md:p-8">
            <BrandLogo to="/" size="sm" tone="light" />
            <div>
              <h1 className="min-w-0 font-display text-[26px] leading-[1.02] font-normal text-balance break-words text-heading uppercase md:text-[36px]">
                {title}
              </h1>
              <p className="mt-3 max-w-[34ch] text-[13px] leading-5 text-body">{description}</p>
            </div>
            <p className="hidden text-xs text-muted-foreground md:block">
              &copy; {year} ATLAS. Semua hak dilindungi.
            </p>
          </div>

          <div className="p-5 md:p-8">{children}</div>
        </div>
      </div>
    </div>
  )
}
