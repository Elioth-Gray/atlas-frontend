import { ChevronRight } from 'lucide-react'

import { Card } from '@/components/ui/Card'

import { TOP_COMPLAINTS } from '../dashboardData'

const MAX_COUNT = TOP_COMPLAINTS[0].count

export function TopComplaints() {
  return (
    <Card className="p-[17px]">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-[15px] leading-[18px] font-bold text-heading">Keluhan terbanyak</h2>
          <p className="pt-1 text-[10px] leading-3 text-body">Dari 312 komentar negatif</p>
        </div>
        <button
          type="button"
          aria-disabled="true"
          title="Segera hadir"
          className="flex shrink-0 items-center gap-1 text-[10px] leading-3 text-body"
        >
          Lihat grup
          <ChevronRight aria-hidden="true" className="size-3.5 text-muted-foreground" />
        </button>
      </div>

      <ol className="mt-4 space-y-[13px]">
        {TOP_COMPLAINTS.map((item, index) => (
          <li key={item.label}>
            <div className="flex items-baseline justify-between gap-3 text-[10.5px] text-body">
              <span>
                <span className="mr-1.5 text-muted-foreground">{index + 1}</span>
                {item.label}
              </span>
              <span className="font-bold">{item.count}</span>
            </div>
            <div className="mt-1.5 h-[3px] overflow-hidden rounded-full bg-surface-subtle">
              <div
                className="h-full rounded-full"
                style={{
                  width: `${(item.count / MAX_COUNT) * 100}%`,
                  backgroundColor: item.color,
                }}
              />
            </div>
          </li>
        ))}
      </ol>
    </Card>
  )
}
