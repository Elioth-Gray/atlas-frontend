import { X } from 'lucide-react'
import type { ReactNode } from 'react'
import { Link } from 'react-router'

import { BrandLogo } from '@/components/brand/BrandLogo'

interface AuthShellProps {
  children: ReactNode
}

export function AuthShell({ children }: AuthShellProps) {
  const year = new Date().getFullYear()

  return (
    <div className="relative flex min-h-svh flex-col overflow-hidden bg-background font-sans">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -top-56 left-1/2 h-[720px] w-[1100px] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(143,106,255,0.24),transparent_66%)] blur-2xl" />
        <div className="absolute -right-36 bottom-[-180px] size-[440px] rounded-full bg-[#5A88F6]/10 blur-3xl" />
        <div className="absolute bottom-[-60px] -left-44 size-[400px] rounded-full bg-[#EE6DAA]/10 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 h-[620px] w-[1240px] -translate-x-1/2 -translate-y-1/2 rotate-[-14deg] rounded-[50%] border border-primary/10 dark:border-white/5" />
        <div className="absolute top-1/2 left-1/2 h-[420px] w-[840px] -translate-x-1/2 -translate-y-1/2 rotate-[-14deg] rounded-[50%] border border-dashed border-primary/10 dark:border-white/5" />
        <span className="absolute top-[16%] left-[10%] size-1.5 animate-twinkle rounded-full bg-secondary/70" />
        <span className="absolute top-[24%] right-[12%] size-1 animate-twinkle rounded-full bg-[#5A88F6]/70 [animation-delay:1.2s]" />
        <span className="absolute bottom-[22%] left-[16%] size-1 animate-twinkle rounded-full bg-[#EE6DAA]/60 [animation-delay:0.7s]" />
        <span className="absolute right-[20%] bottom-[16%] size-1.5 animate-twinkle rounded-full bg-secondary/60 [animation-delay:1.9s]" />
        <span className="absolute top-[14%] right-[24%] text-sm text-secondary/40">✦</span>
        <span className="absolute bottom-[20%] left-[24%] text-xs text-[#5A88F6]/50">✦</span>
      </div>

      <header className="relative z-10 mx-auto flex w-full max-w-6xl items-center justify-between px-5 py-5 sm:px-8">
        <BrandLogo to="/" />
        <Link
          to="/"
          aria-label="Tutup dan kembali ke beranda"
          className="flex size-10 items-center justify-center rounded-xl border border-border bg-surface/80 text-body shadow-sm backdrop-blur transition-colors hover:bg-surface-subtle hover:text-heading focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary"
        >
          <X aria-hidden="true" className="size-5" strokeWidth={1.8} />
        </Link>
      </header>

      <main className="relative z-10 flex flex-1 items-start justify-center px-4 pt-2 pb-12 sm:items-center sm:px-6 sm:pt-0 sm:pb-16">
        {children}
      </main>

      <p className="relative z-10 pb-6 text-center text-[10px] text-muted-foreground">
        © {year} ATLAS. Semua hak dilindungi.
      </p>
    </div>
  )
}
