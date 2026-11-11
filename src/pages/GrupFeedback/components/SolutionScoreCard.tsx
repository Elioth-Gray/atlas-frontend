import { Card } from '@/components/ui/Card'

import { FEATURED_SOLUTION } from '../grupFeedbackData'

export function SolutionScoreCard() {
  const scorePercent = Number(FEATURED_SOLUTION.score.replace(',', '.')) * 10

  return (
    <Card label="Skor solusi" className="flex h-full flex-col p-[17px]">
      <p className="text-center text-[10px] leading-3 font-semibold tracking-[1.4px] text-muted-foreground">
        SKOR SOLUSI
      </p>

      <div className="flex justify-center pt-[18px]">
        <div
          className="flex size-[110px] items-center justify-center rounded-full"
          style={{
            background: `conic-gradient(#8563F4 0% ${scorePercent}%, #DDE1EC ${scorePercent}% 100%)`,
          }}
        >
          <div className="flex size-[97px] flex-col items-center justify-center rounded-full bg-surface">
            <span className="text-[30px] leading-[34px] font-bold text-[#5B21B6]">
              {FEATURED_SOLUTION.score}
            </span>
            <span className="text-[10px] leading-3 text-muted-foreground">/ 10</span>
          </div>
        </div>
      </div>

      <p className="pt-[18px] text-center text-[10px] leading-3 text-muted-foreground">
        {FEATURED_SOLUTION.scoreLabel}
      </p>
      <p className="pt-1 text-center text-[10px] leading-[15px] text-muted-foreground">
        {FEATURED_SOLUTION.scoreDescription}
      </p>

      <div className="mt-auto space-y-3 pt-6">
        {FEATURED_SOLUTION.scoreMetrics.map((metric) => (
          <div key={metric.label}>
            <div className="flex items-center justify-between gap-3 text-[10px] leading-[13px] text-muted-foreground">
              <span>{metric.label}</span>
              <span className="font-bold">{metric.value}</span>
            </div>
            <div className="mt-1.5 h-[3px] w-full rounded-full bg-[#E3D8FF]">
              <div
                className="h-full rounded-full bg-[#7C3AED]"
                style={{ width: `${metric.width}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}
