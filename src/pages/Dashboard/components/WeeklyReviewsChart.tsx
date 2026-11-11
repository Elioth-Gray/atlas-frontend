import { Card } from '@/components/ui/Card'

import { WEEKLY_REVIEWS } from '../dashboardData'

const MAX_BAR_HEIGHT = 396

export function WeeklyReviewsChart() {
  return (
    <Card className="flex h-full flex-col p-[17px]">
      <div>
        <h2 className="text-[15px] leading-[18px] font-bold text-heading">Jumlah ulasan</h2>
        <p className="pt-1 text-[10px] leading-3 text-body">186 minggu ini</p>
      </div>

      <div
        role="img"
        aria-label="Grafik jumlah ulasan per hari, tertinggi pada hari Sabtu"
        className="mt-6 flex min-h-[396px] flex-1 items-end gap-[9px]"
      >
        {WEEKLY_REVIEWS.map((day) => (
          <div
            key={day.label}
            className="flex h-full flex-1 flex-col items-center justify-end gap-[7px]"
          >
            <div
              className="w-full max-w-[33px] rounded-t-[5px] rounded-b-[2px]"
              style={{
                height: `${(day.height / 100) * MAX_BAR_HEIGHT}px`,
                backgroundImage: day.highlighted
                  ? 'linear-gradient(180deg, #9C7CFF 0%, #6045BF 100%)'
                  : 'linear-gradient(180deg, #6953AA 0%, #2B2847 100%)',
                boxShadow: day.highlighted ? '0 4px 12px rgba(30.6, 35.7, 56.1, 0.06)' : undefined,
              }}
            />
            <span className="text-[10px] leading-none text-body">{day.label}</span>
          </div>
        ))}
      </div>

      <div className="mt-3 flex items-center justify-between border-t border-border pt-3">
        <span className="flex items-center gap-[5px] text-[10px] text-body">
          <span className="size-[5px] rounded-full bg-[#9773FF]" />
          Feedback QR
          <span className="font-bold">118</span>
        </span>
        <span className="flex items-center gap-[5px] text-[10px] text-body">
          <span className="size-[5px] rounded-full bg-[#588AF4]" />
          Google
          <span className="font-bold">68</span>
        </span>
      </div>
    </Card>
  )
}
