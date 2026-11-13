import gsap from 'gsap'
import type { LucideIcon } from 'lucide-react'
import { Check, ChevronDown } from 'lucide-react'
import { useEffect, useId, useMemo, useRef, useState } from 'react'

import { cn } from '@/utils/cn'

export interface SelectOptionItem {
  value: string
  label: string
}

export interface ThemedSelectProps {
  id?: string
  label: string
  value: string
  options: readonly (string | SelectOptionItem)[]
  onChange: (value: string) => void
  icon?: LucideIcon
  placeholder?: string
  size?: 'sm' | 'md'
  variant?: 'filter' | 'field'
  className?: string
  triggerClassName?: string
  menuAlign?: 'left' | 'right'
}

export function ThemedSelect({
  id,
  label,
  value,
  options,
  onChange,
  icon: Icon,
  placeholder,
  size = 'sm',
  variant = 'filter',
  className,
  triggerClassName,
  menuAlign = 'left',
}: ThemedSelectProps) {
  const generatedId = useId()
  const triggerId = id ?? `select-${generatedId}`
  const listboxId = `listbox-${generatedId}`
  const containerRef = useRef<HTMLDivElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)
  const [open, setOpen] = useState(false)

  const normalizedOptions = useMemo<SelectOptionItem[]>(
    () => options.map((opt) => (typeof opt === 'string' ? { value: opt, label: opt } : opt)),
    [options]
  )

  const selectedIndex = useMemo(
    () => normalizedOptions.findIndex((opt) => opt.value === value),
    [normalizedOptions, value]
  )

  const selectedLabel =
    selectedIndex >= 0 ? normalizedOptions[selectedIndex].label : (placeholder ?? value)

  useEffect(() => {
    if (!open) return

    const el = menuRef.current
    if (el) {
      gsap.fromTo(
        el,
        { opacity: 0, y: -6, scale: 0.98 },
        { opacity: 1, y: 0, scale: 1, duration: 0.18, ease: 'power2.out' }
      )
    }

    function handlePointerDown(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpen(false)
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setOpen(false)
      }
    }

    document.addEventListener('mousedown', handlePointerDown)
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('mousedown', handlePointerDown)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [open])

  function handleTriggerKeyDown(event: React.KeyboardEvent<HTMLButtonElement>) {
    if (normalizedOptions.length === 0) return

    if (event.key === 'ArrowDown') {
      event.preventDefault()
      if (!open) {
        setOpen(true)
        return
      }
      const nextIndex = selectedIndex < normalizedOptions.length - 1 ? selectedIndex + 1 : 0
      onChange(normalizedOptions[nextIndex].value)
    } else if (event.key === 'ArrowUp') {
      event.preventDefault()
      if (!open) {
        setOpen(true)
        return
      }
      const prevIndex = selectedIndex > 0 ? selectedIndex - 1 : normalizedOptions.length - 1
      onChange(normalizedOptions[prevIndex].value)
    }
  }

  return (
    <div ref={containerRef} className={cn('relative', className)}>
      <button
        id={triggerId}
        type="button"
        aria-label={label}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listboxId}
        onClick={() => setOpen((prev) => !prev)}
        onKeyDown={handleTriggerKeyDown}
        className={cn(
          'group flex w-full cursor-pointer items-center justify-between gap-2 border text-left transition-colors outline-none focus-visible:border-secondary',
          size === 'sm' ? 'h-[35px] px-[13px]' : 'h-10 px-[11px]',
          variant === 'filter'
            ? 'border-border bg-surface hover:border-secondary/60'
            : 'border-field bg-surface-subtle hover:border-secondary/60',
          open && 'border-secondary',
          triggerClassName
        )}
      >
        <span className="flex min-w-0 flex-1 items-center gap-2">
          {Icon ? (
            <Icon
              aria-hidden="true"
              className="size-[15px] shrink-0 text-icon transition-colors group-hover:text-secondary"
              strokeWidth={1.6}
            />
          ) : null}
          <span
            className={cn(
              'truncate text-[11px] leading-4 font-normal',
              selectedIndex >= 0 ? 'text-body' : 'text-placeholder'
            )}
          >
            {selectedLabel}
          </span>
        </span>
        <ChevronDown
          aria-hidden="true"
          className={cn(
            'size-[14px] shrink-0 text-muted-foreground transition-transform duration-200 group-hover:text-heading',
            open && 'rotate-180 text-secondary'
          )}
          strokeWidth={1.6}
        />
      </button>

      {open ? (
        <div
          id={listboxId}
          ref={menuRef}
          role="listbox"
          aria-label={label}
          className={cn(
            'absolute top-[calc(100%+4px)] z-50 max-h-60 min-w-full overflow-y-auto border border-border bg-surface py-1 shadow-card',
            menuAlign === 'right' ? 'right-0' : 'left-0'
          )}
        >
          {normalizedOptions.map((option) => {
            const isSelected = option.value === value
            return (
              <button
                key={option.value}
                type="button"
                role="option"
                aria-selected={isSelected}
                onClick={() => {
                  onChange(option.value)
                  setOpen(false)
                }}
                className={cn(
                  'relative flex w-full cursor-pointer items-center justify-between gap-3 px-3 py-2 text-left text-[11px] leading-4 transition-colors',
                  isSelected
                    ? 'bg-accent-soft font-semibold text-heading'
                    : 'text-body hover:bg-surface-subtle hover:text-heading'
                )}
              >
                {isSelected ? (
                  <span
                    aria-hidden="true"
                    className="absolute inset-y-0 left-0 w-[2px] bg-secondary"
                  />
                ) : null}
                <span className="truncate">{option.label}</span>
                {isSelected ? (
                  <Check
                    aria-hidden="true"
                    className="size-3.5 shrink-0 text-secondary"
                    strokeWidth={2}
                  />
                ) : null}
              </button>
            )
          })}
        </div>
      ) : null}
    </div>
  )
}
