import type { LucideIcon } from 'lucide-react'
import { CalendarDays, ChevronDown, SlidersHorizontal } from 'lucide-react'

import { Card } from '@/components/ui/Card'
import { StarRating } from '@/components/ui/StarRating'

import { IMPORTED_REVIEWS } from '../googleMapsData'

interface ReviewFilterProps {
  label: string
  options: readonly string[]
  icon?: LucideIcon
}

function ReviewFilter({ label, options, icon: Icon }: ReviewFilterProps) {
  return (
    <label className="relative flex h-[34px] items-center rounded-[10px] border border-border bg-surface-subtle pr-8 pl-2.5 text-[10.5px] text-body focus-within:outline-2 focus-within:outline-offset-1 focus-within:outline-secondary">
      {Icon && (
        <Icon
          aria-hidden="true"
          className="mr-1.5 size-[15px] shrink-0 text-[#898B9D]"
          strokeWidth={1.4}
        />
      )}
      <span className="sr-only">{label}</span>
      <select
        aria-label={label}
        defaultValue={options[0]}
        className="cursor-pointer appearance-none bg-transparent text-[10.5px] text-body outline-none"
      >
        {options.map((option) => (
          <option key={option}>{option}</option>
        ))}
      </select>
      <ChevronDown
        aria-hidden="true"
        className="pointer-events-none absolute right-2.5 size-[15px] text-[#898B9D]"
        strokeWidth={1.4}
      />
    </label>
  )
}

export function ImportedReviews() {
  return (
    <Card className="p-[17px]" label="Ulasan impor terbaru">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h2 className="text-[15px] leading-[18px] font-bold text-heading">
            Ulasan impor terbaru
          </h2>
          <p className="pt-1 text-[10px] leading-3 text-body">
            Ulasan terbaru dari profil Google Business yang terhubung
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-[7px]">
          <ReviewFilter
            label="Rentang waktu"
            icon={CalendarDays}
            options={['30 hari terakhir', '7 hari terakhir', '90 hari terakhir']}
          />
          <ReviewFilter
            label="Prioritas"
            options={['Semua prioritas', 'Tinggi', 'Sedang', 'Rendah']}
          />
          <button
            type="button"
            aria-label="Filter ulasan"
            className="flex size-[34px] items-center justify-center rounded-[10px] border border-border bg-surface-subtle text-[#8A8B9C] transition-colors hover:bg-surface"
          >
            <SlidersHorizontal aria-hidden="true" className="size-4" strokeWidth={1.4} />
          </button>
        </div>
      </div>

      <ul className="mt-4">
        {IMPORTED_REVIEWS.map((review) => (
          <li
            key={review.id}
            className="grid gap-1.5 border-t border-border py-[13px] first:border-t-0 first:pt-0 last:pb-0 sm:grid-cols-[150px_100px_minmax(0,1fr)_auto] sm:items-start sm:gap-3"
          >
            <div>
              <p className="text-[10.5px] leading-[15px] font-bold text-body">{review.author}</p>
              <p className="pt-[3px] text-[10px] leading-3 text-muted-foreground">
                {review.source}
              </p>
            </div>

            <StarRating rating={review.rating} />

            <p className="text-[10.5px] leading-[15px] text-body">{review.text}</p>

            <p className="text-[10px] whitespace-nowrap text-muted-foreground sm:text-right">
              {review.received}
            </p>
          </li>
        ))}
      </ul>
    </Card>
  )
}
