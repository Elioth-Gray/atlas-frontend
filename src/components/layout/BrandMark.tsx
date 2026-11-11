import { useId } from 'react'

interface BrandMarkProps {
  className?: string
}

export function BrandMark({ className }: BrandMarkProps) {
  const gradientId = `atlas-brand-mark-${useId().replaceAll(':', '')}`

  return (
    <svg
      aria-hidden="true"
      className={className ?? 'size-[38px] shrink-0 overflow-visible'}
      viewBox="0 0 38 38"
      fill="none"
    >
      <defs>
        <linearGradient
          id={gradientId}
          x1="4"
          y1="2"
          x2="27"
          y2="29"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#A986FF" />
          <stop offset="1" stopColor="#6442DD" />
        </linearGradient>
      </defs>

      <rect width="29" height="29" rx="14.5" fill={`url(#${gradientId})`} />
      <rect x="10.1" y="8.3" width="8.7" height="8.7" rx="0.8" stroke="#DDE1EC" strokeWidth="1.1" />
      <rect x="17" y="17" width="3.75" height="3.75" rx="0.5" stroke="#DDE1EC" strokeWidth="1.1" />
      <ellipse
        cx="14.5"
        cy="23"
        rx="15.5"
        ry="5.5"
        transform="rotate(-26 14.5 23)"
        stroke="#9679FF"
        strokeWidth="1"
      />
      <circle cx="34" cy="10.5" r="2.5" fill="#67B5FF" />
    </svg>
  )
}
