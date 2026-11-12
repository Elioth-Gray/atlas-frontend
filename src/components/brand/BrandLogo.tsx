import { Link } from 'react-router'

import { cn } from '@/utils/cn'

import { BrandMark } from './BrandMark'

type BrandLogoSize = 'sm' | 'md' | 'lg'

interface BrandLogoProps {
  className?: string
  size?: BrandLogoSize
  tone?: 'default' | 'light'
  /** Renders a link when set, a plain brand lockup otherwise. */
  to?: string
}

// The wordmark is set in the theme's display face, Anton capitals, sized so its cap height
// matches the planet in the mark beside it
const SIZES: Record<BrandLogoSize, { mark: string; text: string; gap: string }> = {
  sm: { mark: 'h-6', text: 'text-[22px]', gap: 'gap-2' },
  md: { mark: 'h-8', text: 'text-[28px]', gap: 'gap-2.5' },
  lg: { mark: 'h-11', text: 'text-[40px]', gap: 'gap-3' },
}

const LINK_CLASS =
  'focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-secondary'

export function BrandLogo({ className, size = 'md', tone = 'default', to }: BrandLogoProps) {
  const content = (
    <>
      <BrandMark tone={tone} className={SIZES[size].mark} />
      <span
        className={cn(
          'wordmark font-display leading-none font-normal tracking-[0.04em] uppercase',
          SIZES[size].text,
          tone === 'light' ? 'text-night-text' : 'text-heading'
        )}
      >
        ATLAS
      </span>
    </>
  )

  const classes = cn('inline-flex items-center', SIZES[size].gap, className)

  if (!to) {
    return <span className={classes}>{content}</span>
  }

  return (
    <Link to={to} aria-label="ATLAS, kembali ke beranda" className={cn(classes, LINK_CLASS)}>
      {content}
    </Link>
  )
}
