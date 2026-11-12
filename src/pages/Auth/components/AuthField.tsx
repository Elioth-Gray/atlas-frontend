import type { LucideIcon } from 'lucide-react'
import { ChevronDown, Eye, EyeOff } from 'lucide-react'
import type { ComponentPropsWithRef, ReactNode } from 'react'
import { useState } from 'react'

import { cn } from '@/utils/cn'

const CONTROL_CLASS =
  'h-10 w-full border border-field bg-surface-subtle text-sm text-heading placeholder:text-muted-foreground/70 transition focus:border-secondary focus:bg-surface focus:ring-4 focus:ring-secondary/15 focus:outline-none disabled:cursor-not-allowed disabled:opacity-60'

function FieldLabel({ htmlFor, children }: { htmlFor: string; children: ReactNode }) {
  return (
    <label htmlFor={htmlFor} className="mb-1.5 block text-xs font-medium text-body">
      {children}
    </label>
  )
}

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null

  return (
    <p id={id} role="alert" className="mt-1.5 text-[11px] leading-4 text-danger">
      {message}
    </p>
  )
}

interface AuthInputProps extends ComponentPropsWithRef<'input'> {
  id: string
  label: string
  icon: LucideIcon
  error?: string
  trailing?: ReactNode
}

export function AuthInput({
  id,
  label,
  icon: Icon,
  error,
  trailing,
  className,
  ...props
}: AuthInputProps) {
  return (
    <div>
      <FieldLabel htmlFor={id}>{label}</FieldLabel>
      <div className="relative">
        <Icon
          aria-hidden="true"
          className="pointer-events-none absolute top-1/2 left-3.5 size-[17px] -translate-y-1/2 text-muted-foreground"
          strokeWidth={1.7}
        />
        <input
          id={id}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `${id}-error` : undefined}
          className={cn(
            CONTROL_CLASS,
            'pr-3.5 pl-10',
            error && 'border-danger focus:border-danger focus:ring-danger/15',
            trailing && 'pr-11',
            className
          )}
          {...props}
        />
        {trailing && (
          <span className="absolute inset-y-0 right-1.5 flex items-center">{trailing}</span>
        )}
      </div>
      <FieldError id={`${id}-error`} message={error} />
    </div>
  )
}

type AuthPasswordFieldProps = Omit<AuthInputProps, 'type' | 'trailing'>

export function AuthPasswordField({ id, ...props }: AuthPasswordFieldProps) {
  const [isVisible, setIsVisible] = useState(false)

  return (
    <AuthInput
      id={id}
      {...props}
      type={isVisible ? 'text' : 'password'}
      trailing={
        <button
          type="button"
          aria-label={isVisible ? 'Sembunyikan kata sandi' : 'Tampilkan kata sandi'}
          aria-pressed={isVisible}
          onClick={() => setIsVisible((visible) => !visible)}
          className="flex size-8 items-center justify-center text-muted-foreground transition-colors hover:bg-surface-subtle hover:text-heading focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-secondary"
        >
          {isVisible ? (
            <EyeOff aria-hidden="true" className="size-4" strokeWidth={1.8} />
          ) : (
            <Eye aria-hidden="true" className="size-4" strokeWidth={1.8} />
          )}
        </button>
      }
    />
  )
}

interface AuthSelectProps extends ComponentPropsWithRef<'select'> {
  id: string
  label: string
  icon: LucideIcon
  options: readonly string[]
  placeholder: string
  error?: string
}

export function AuthSelect({
  id,
  label,
  icon: Icon,
  options,
  placeholder,
  error,
  className,
  ...props
}: AuthSelectProps) {
  return (
    <div>
      <FieldLabel htmlFor={id}>{label}</FieldLabel>
      <div className="relative">
        <Icon
          aria-hidden="true"
          className="pointer-events-none absolute top-1/2 left-3.5 size-[17px] -translate-y-1/2 text-muted-foreground"
          strokeWidth={1.7}
        />
        <select
          id={id}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `${id}-error` : undefined}
          className={cn(
            CONTROL_CLASS,
            'cursor-pointer appearance-none pr-10 pl-10',
            error && 'border-danger focus:border-danger focus:ring-danger/15',
            className
          )}
          {...props}
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <ChevronDown
          aria-hidden="true"
          className="pointer-events-none absolute top-1/2 right-3.5 size-4 -translate-y-1/2 text-muted-foreground"
          strokeWidth={1.8}
        />
      </div>
      <FieldError id={`${id}-error`} message={error} />
    </div>
  )
}
