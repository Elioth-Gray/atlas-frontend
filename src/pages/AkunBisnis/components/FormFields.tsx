import type { LucideIcon } from 'lucide-react'
import { ChevronDown } from 'lucide-react'
import type { ReactNode } from 'react'

import { cn } from '@/utils/cn'

const CONTROL_CLASS =
  'h-10 w-full rounded-[9px] border border-border bg-surface-subtle px-[11px] text-[11px] text-body placeholder:text-muted-foreground focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-secondary'

interface FieldShellProps {
  id: string
  label: string
  children: ReactNode
}

function FieldShell({ id, label, children }: FieldShellProps) {
  return (
    <div>
      <label htmlFor={id} className="block text-[10px] leading-3 text-body">
        {label}
      </label>
      <div className="mt-1.5">{children}</div>
    </div>
  )
}

interface TextFieldProps {
  id: string
  label: string
  value: string
  onChange: (value: string) => void
  type?: 'text' | 'email' | 'tel' | 'url'
  icon?: LucideIcon
  autoComplete?: string
}

export function TextField({
  id,
  label,
  value,
  onChange,
  type = 'text',
  icon: Icon,
  autoComplete,
}: TextFieldProps) {
  return (
    <FieldShell id={id} label={label}>
      <div className="relative">
        {Icon && (
          <Icon
            aria-hidden="true"
            className="pointer-events-none absolute top-1/2 left-[11px] size-[15px] -translate-y-1/2 text-[#6D6F83]"
            strokeWidth={1.6}
          />
        )}
        <input
          id={id}
          type={type}
          value={value}
          autoComplete={autoComplete}
          onChange={(event) => onChange(event.target.value)}
          className={cn(CONTROL_CLASS, Icon && 'pl-9')}
        />
      </div>
    </FieldShell>
  )
}

interface SelectFieldProps {
  id: string
  label: string
  value: string
  options: readonly string[]
  onChange: (value: string) => void
}

export function SelectField({ id, label, value, options, onChange }: SelectFieldProps) {
  return (
    <FieldShell id={id} label={label}>
      <div className="relative">
        <select
          id={id}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className={cn(CONTROL_CLASS, 'cursor-pointer appearance-none pr-9')}
        >
          {options.map((option) => (
            <option key={option}>{option}</option>
          ))}
        </select>
        <ChevronDown
          aria-hidden="true"
          className="pointer-events-none absolute top-1/2 right-3 size-[15px] -translate-y-1/2 text-[#6D6F83]"
          strokeWidth={1.6}
        />
      </div>
    </FieldShell>
  )
}

interface TextareaFieldProps {
  id: string
  label: string
  value: string
  onChange: (value: string) => void
  rows?: number
}

export function TextareaField({ id, label, value, onChange, rows = 3 }: TextareaFieldProps) {
  return (
    <FieldShell id={id} label={label}>
      <textarea
        id={id}
        rows={rows}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className={cn(CONTROL_CLASS, 'h-auto resize-y py-2.5 leading-[15px]')}
      />
    </FieldShell>
  )
}
