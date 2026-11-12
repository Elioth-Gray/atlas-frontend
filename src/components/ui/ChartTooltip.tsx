import type { TooltipContentProps } from 'recharts'

export interface ChartTooltipRow {
  label: string
  value: string | number
  color: string
}

interface ChartTooltipProps<T> extends Partial<
  Pick<TooltipContentProps<number, string>, 'active' | 'payload' | 'label'>
> {
  title?: (datum: T) => string
  rows?: (datum: T) => ChartTooltipRow[]
  valueSuffix?: string
}

// Recharts clones this element and injects active/payload/label on hover
export function ChartTooltip<T>({
  active,
  payload,
  label,
  title,
  rows,
  valueSuffix = '',
}: ChartTooltipProps<T>) {
  if (!active || !payload?.length) return null

  const datum = payload[0].payload as T
  const items: ChartTooltipRow[] = rows
    ? rows(datum)
    : payload.map((entry) => ({
        label: String(entry.name ?? ''),
        value: `${String(entry.value ?? '')}${valueSuffix}`,
        color: entry.color ?? 'currentColor',
      }))

  return (
    <div className="min-w-[132px] border border-border bg-surface px-3 py-2 shadow-card">
      <p className="text-[11px] leading-3 font-semibold text-heading">
        {title ? title(datum) : label}
      </p>
      <ul className="mt-1.5 space-y-1">
        {items.map((item) => (
          <li key={item.label} className="flex items-center gap-1.5 text-[11px] text-body">
            <span
              className="size-1.5 shrink-0 rounded-full"
              style={{ backgroundColor: item.color }}
            />
            {item.label}
            <span className="ml-auto pl-3 font-semibold text-heading">{item.value}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
