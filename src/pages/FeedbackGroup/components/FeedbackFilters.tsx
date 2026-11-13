import { CalendarDays, RotateCcw } from 'lucide-react'

import { ThemedSelect } from '@/components/ui/ThemedSelect'

export interface FeedbackFilterState {
  period: string
  status: string
}

// eslint-disable-next-line react-refresh/only-export-components
export const DEFAULT_FEEDBACK_FILTERS: FeedbackFilterState = {
  period: '30 hari terakhir',
  status: 'Semua status',
}

interface FeedbackFiltersProps {
  filters?: FeedbackFilterState
  onChange?: (next: FeedbackFilterState) => void
}

export function FeedbackFilters({
  filters = DEFAULT_FEEDBACK_FILTERS,
  onChange,
}: FeedbackFiltersProps) {
  function updateField<K extends keyof FeedbackFilterState>(key: K, value: FeedbackFilterState[K]) {
    onChange?.({ ...filters, [key]: value })
  }

  return (
    <div className="flex flex-wrap items-center gap-[7px]">
      <ThemedSelect
        label="Rentang waktu"
        icon={CalendarDays}
        options={['30 hari terakhir', '7 hari terakhir', '90 hari terakhir', 'Semua waktu']}
        value={filters.period}
        onChange={(value) => updateField('period', value)}
        size="sm"
        variant="filter"
      />
      <ThemedSelect
        label="Status konsultasi"
        value={filters.status}
        onChange={(value) => updateField('status', value)}
        options={[
          'Semua status',
          'Belum dikonsultasikan',
          'Sudah dikonsultasikan',
          'Ada ulasan baru',
        ]}
        size="sm"
        variant="filter"
      />
      <button
        type="button"
        aria-label="Reset filter"
        onClick={() => onChange?.(DEFAULT_FEEDBACK_FILTERS)}
        className="flex h-[35px] cursor-pointer items-center gap-1.5 border border-border bg-surface px-3 text-[11px] font-medium text-body transition-colors hover:border-secondary/60 hover:bg-surface-subtle hover:text-heading active:translate-y-px"
      >
        <RotateCcw aria-hidden="true" className="size-3.5 text-icon" strokeWidth={1.6} />
        <span>Reset</span>
      </button>
    </div>
  )
}
