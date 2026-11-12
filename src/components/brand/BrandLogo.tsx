import { Link } from 'react-router'

import { cn } from '@/utils/cn'

type BrandLogoSize = 'sm' | 'md' | 'lg'

interface BrandLogoProps {
  className?: string
  size?: BrandLogoSize
  tone?: 'default' | 'light'
  /** Renders a link when set, a plain brand lockup otherwise. */
  to?: string
}

const LOGO_SRC = '/images/ATLAS_Logo.png'

const SIZES: Record<BrandLogoSize, { icon: string; text: string }> = {
  sm: {
    icon: 'size-12',
    text: 'text-[17px] leading-none tracking-[2.5px]',
  },
  md: {
    icon: 'size-14',
    text: 'text-[24px] leading-none tracking-[0.22em]',
  },
  lg: {
    icon: 'size-20',
    text: 'text-[34px] leading-none tracking-[0.24em]',
  },
}

const LINK_CLASS =
  'rounded-xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-secondary'

export function BrandLogo({ className, size = 'md', tone = 'default', to }: BrandLogoProps) {
  const content = (
    <>
      <img
        src={LOGO_SRC}
        alt=""
        width={512}
        height={512}
        decoding="async"
        className={cn('shrink-0 object-contain', SIZES[size].icon)}
      />
      <span
        className={cn(
          'font-bold',
          SIZES[size].text,
          tone === 'light' ? 'text-white' : 'text-heading'
        )}
      >
        ATLAS
      </span>
    </>
  )

  const classes = cn('inline-flex items-center gap-2.5', className)

  if (!to) {
    return <span className={classes}>{content}</span>
  }

  return (
    <Link to={to} aria-label="ATLAS — kembali ke beranda" className={cn(classes, LINK_CLASS)}>
      {content}
    </Link>
  )
}
