import type { LucideIcon } from 'lucide-react'

import { ThemedSelect } from '@/components/ui/ThemedSelect'

interface FilterSelectProps {
  label: string
  options: readonly string[]
  icon?: LucideIcon
  value?: string
  onChange?: (value: string) => void
  className?: string
}

export function FilterSelect({
  label,
  options,
  icon,
  value,
  onChange,
  className,
}: FilterSelectProps) {
  return (
    <ThemedSelect
      icon={icon}
      label={label}
      value={value ?? options[0] ?? ''}
      options={options}
      onChange={onChange ?? (() => {})}
      size="sm"
      variant="field"
      className={className}
    />
  )
}
