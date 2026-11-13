import { CalendarDays, RotateCcw } from 'lucide-react'

import { FilterSelect } from './FilterSelect'

export interface DashboardFilterState {
  period: string
}

// eslint-disable-next-line react-refresh/only-export-components
export const DEFAULT_DASHBOARD_FILTERS: DashboardFilterState = {
  period: '30 hari terakhir',
}

interface DashboardFiltersProps {
  filters?: DashboardFilterState
  onChange?: (next: DashboardFilterState) => void
}

export function DashboardFilters({
  filters = DEFAULT_DASHBOARD_FILTERS,
  onChange,
}: DashboardFiltersProps) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-2">
      <div className="flex flex-wrap items-center gap-[7px]">
        <FilterSelect
          label="Rentang waktu"
          icon={CalendarDays}
          options={['30 hari terakhir', '7 hari terakhir', '90 hari terakhir', 'Semua waktu']}
          value={filters.period}
          onChange={(period) => onChange?.({ period })}
        />
        <button
          type="button"
          aria-label="Reset filter"
          onClick={() => onChange?.(DEFAULT_DASHBOARD_FILTERS)}
          className="flex h-[35px] cursor-pointer items-center gap-1.5 border border-border bg-surface px-3 text-[11px] font-medium text-body transition-colors hover:border-secondary/60 hover:bg-surface-subtle hover:text-heading active:translate-y-px"
        >
          <RotateCcw aria-hidden="true" className="size-3.5 text-icon" strokeWidth={1.6} />
          <span>Reset</span>
        </button>
      </div>
    </div>
  )
}
