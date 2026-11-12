import { useId } from 'react'

import { cn } from '@/utils/cn'

interface BrandMarkProps {
  className?: string
  /** "light" draws the orbit in light ink, for marks placed on a dark sheet outside a dark theme */
  tone?: 'default' | 'light'
}

// The ATLAS mark: a planet (one group of feedback) with an orbit crossing in front and a satellite
// riding it (the feedback coming in). Same geometry as public/logo/atlas-mark.svg, drawn inline so
// its colours follow the theme tokens
export function BrandMark({ className, tone = 'default' }: BrandMarkProps) {
  const maskId = `atlas-mark-groove-${useId().replaceAll(':', '')}`
  const isLight = tone === 'light'

  return (
    <svg
      aria-hidden="true"
      // Cropped to the drawing itself, so the mark sits tight beside the wordmark
      viewBox="3 14 58 36"
      className={cn('w-auto shrink-0', isLight ? 'text-night-text' : 'text-heading', className)}
    >
      <defs>
        <mask id={maskId} maskUnits="userSpaceOnUse" x="0" y="0" width="64" height="64">
          <rect width="64" height="64" fill="white" />
          <path
            d="M59 32 A27 6.5 0 0 1 5 32"
            transform="rotate(-24 32 32)"
            fill="none"
            stroke="black"
            strokeWidth="7.5"
            strokeLinecap="round"
          />
        </mask>
      </defs>
      <g transform="rotate(-24 32 32)" fill="none" stroke="currentColor" strokeWidth="3.5">
        <path d="M5 32 A27 6.5 0 0 1 59 32" strokeLinecap="round" />
      </g>
      <circle cx="32" cy="32" r="14" className="fill-sheet-signal" mask={`url(#${maskId})`} />
      <g transform="rotate(-24 32 32)">
        <path
          d="M59 32 A27 6.5 0 0 1 5 32"
          fill="none"
          stroke="currentColor"
          strokeWidth="3.5"
          strokeLinecap="round"
        />
        <circle
          cx="52.7"
          cy="36.2"
          r="3.8"
          className={isLight ? 'fill-night-violet' : 'fill-sheet-signal-text'}
        />
      </g>
    </svg>
  )
}
