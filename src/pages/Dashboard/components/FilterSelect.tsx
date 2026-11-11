import type { LucideIcon } from 'lucide-react'
import { ChevronDown } from 'lucide-react'

interface FilterSelectProps {
  label: string
  options: string[]
  icon?: LucideIcon
}

export function FilterSelect({ label, options, icon: Icon }: FilterSelectProps) {
  return (
    <label className="relative flex h-[34px] items-center rounded-[10px] border border-border bg-surface-subtle pr-2 pl-2.5 text-[11px] text-body focus-within:outline-2 focus-within:outline-offset-1 focus-within:outline-secondary">
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
        className="cursor-pointer appearance-none bg-transparent text-[11px] text-body outline-none"
      >
        {options.map((option) => (
          <option key={option}>{option}</option>
        ))}
      </select>
      <ChevronDown
        aria-hidden="true"
        className="pointer-events-none -ml-4 size-[15px] shrink-0 text-[#898B9D]"
        strokeWidth={1.4}
      />
    </label>
  )
}
