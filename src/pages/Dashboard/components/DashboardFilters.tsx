import { CalendarDays, SlidersHorizontal } from 'lucide-react'

import { FilterSelect } from './FilterSelect'

export function DashboardFilters() {
  return (
    <div className="flex flex-wrap items-center justify-between gap-2">
      <div className="flex flex-wrap items-center gap-[7px]">
        <FilterSelect
          label="Rentang waktu"
          icon={CalendarDays}
          options={['30 hari terakhir', '7 hari terakhir', '90 hari terakhir']}
        />
        <FilterSelect
          label="Sentimen"
          options={['Semua sentimen', 'Positif', 'Netral', 'Negatif']}
        />
        <FilterSelect
          label="Prioritas"
          options={['Semua prioritas', 'Tinggi', 'Sedang', 'Rendah']}
        />
        <FilterSelect label="Sumber" options={['Semua sumber', 'Feedback QR', 'Google Maps']} />
        <button
          type="button"
          aria-label="Filter lanjutan"
          className="flex size-[34px] items-center justify-center rounded-[10px] border border-border bg-surface-subtle text-[#8A8B9C] transition-colors hover:bg-surface"
        >
          <SlidersHorizontal aria-hidden="true" className="size-4" strokeWidth={1.4} />
        </button>
      </div>
    </div>
  )
}
