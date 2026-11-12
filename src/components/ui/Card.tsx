import type { ReactNode } from 'react'

import { cn } from '@/utils/cn'

interface CardProps {
  children: ReactNode
  className?: string
  label?: string
}

export function Card({ children, className, label }: CardProps) {
  return (
    <section
      aria-label={label}
      className={cn('border border-border bg-surface shadow-card', className)}
    >
      {children}
    </section>
  )
}
