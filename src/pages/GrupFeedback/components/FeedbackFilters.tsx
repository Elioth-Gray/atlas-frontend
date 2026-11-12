import type { LucideIcon } from 'lucide-react'
import { CalendarDays, ChevronDown, SlidersHorizontal } from 'lucide-react'

interface FeedbackFilterProps {
  label: string
  options: readonly string[]
  icon?: LucideIcon
}

function FeedbackFilter({ label, options, icon: Icon }: FeedbackFilterProps) {
  return (
    <label className="relative flex h-[34px] items-center rounded-[10px] border border-border bg-surface pr-2 pl-2.5 text-[10.5px] text-body focus-within:outline-2 focus-within:outline-offset-1 focus-within:outline-secondary">
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
        className="pointer-events-none ml-1 size-[15px] shrink-0 text-[#898B9D]"
        strokeWidth={1.4}
      />
    </label>
  )
}

export function FeedbackFilters() {
  return (
    <div className="flex flex-wrap items-center gap-[7px]">
      <FeedbackFilter
        label="Rentang waktu"
        icon={CalendarDays}
        options={['30 hari terakhir', '7 hari terakhir', '90 hari terakhir']}
      />
      <FeedbackFilter
        label="Sentimen"
        options={['Semua sentimen', 'Positif', 'Netral', 'Negatif']}
      />
      <FeedbackFilter
        label="Prioritas"
        options={['Semua prioritas', 'Tinggi', 'Sedang', 'Rendah']}
      />
      <FeedbackFilter label="Sumber" options={['Semua sumber', 'Feedback QR']} />
      <button
        type="button"
        aria-label="Filter lanjutan"
        className="flex size-[34px] items-center justify-center rounded-[10px] border border-border bg-surface text-[#8A8B9C] transition-colors hover:bg-surface-subtle"
      >
        <SlidersHorizontal aria-hidden="true" className="size-4" strokeWidth={1.4} />
      </button>
    </div>
  )
}
