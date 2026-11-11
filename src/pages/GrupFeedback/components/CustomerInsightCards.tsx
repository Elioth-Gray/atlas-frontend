import { Card } from '@/components/ui/Card'

import { FEATURED_SOLUTION } from '../grupFeedbackData'

export function CustomerInsightCards() {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      <Card label="Kata pelanggan" className="flex flex-col p-4">
        <h3 className="text-[10px] leading-[13px] font-bold text-muted-foreground">
          Kata pelanggan
        </h3>
        <p className="pt-2 text-[10px] leading-[15px] text-muted-foreground">
          {FEATURED_SOLUTION.customerSummary}
        </p>
        <blockquote className="mt-2.5 border-l-2 border-[#8E68F6] bg-[rgba(142,104,246,0.05)] p-2 text-[10px] leading-[15px] text-muted-foreground italic">
          {FEATURED_SOLUTION.quote}
        </blockquote>
      </Card>

      <Card label="Dugaan penyebab utama" className="flex flex-col p-4">
        <h3 className="text-[10px] leading-[13px] font-bold text-muted-foreground">
          Dugaan penyebab utama
        </h3>
        <p className="pt-2 text-[10px] leading-[15px] text-muted-foreground">
          {FEATURED_SOLUTION.cause}
        </p>

        <div className="mt-auto pt-4">
          <p className="text-[10px] leading-3 text-muted-foreground">
            Keyakinan AI {FEATURED_SOLUTION.confidence}%
          </p>
          <div className="mt-1.5 h-[3px] w-full rounded-full bg-white">
            <div
              className="h-full rounded-full bg-[#EF70AE]"
              style={{ width: `${FEATURED_SOLUTION.confidence}%` }}
            />
          </div>
        </div>
      </Card>
    </div>
  )
}
