import type { ReactNode } from 'react'

import { BrandMark } from '@/components/layout/BrandMark'
import { Card } from '@/components/ui/Card'

import { FEATURED_SOLUTION } from '../grupFeedbackData'

function Metric({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="bg-[#F0E7FF] p-2.5">
      <dt className="text-[10px] leading-3 text-muted-foreground">{label}</dt>
      <dd className="pt-1 text-[10px] leading-[13px] font-bold text-muted-foreground">
        {children}
      </dd>
    </div>
  )
}

export function StrategicRecommendation() {
  return (
    <Card
      label="Rekomendasi strategis ATLAS"
      className="border-[#B794F6] bg-[#F0E7FF] p-[18px] shadow-card"
    >
      <div className="flex items-center gap-3">
        <div className="relative flex size-12 shrink-0 items-center justify-center overflow-hidden rounded-full bg-[radial-gradient(ellipse_at_35%_25%,#B89DFF_0%,#6242C8_65%,#251D55_100%)] shadow-card">
          <BrandMark className="size-6" />
        </div>
        <div className="min-w-0">
          <p className="text-[10px] leading-3 font-semibold tracking-[1.4px] text-muted-foreground">
            REKOMENDASI STRATEGIS ATLAS
          </p>
          <h3 className="pt-[5px] text-[15px] leading-[20px] font-normal text-heading">
            {FEATURED_SOLUTION.title}
          </h3>
          <p className="pt-0.5 text-[10px] leading-3 text-muted-foreground">
            Dari {FEATURED_SOLUTION.feedbackCount} komentar pelanggan terkait
          </p>
        </div>
      </div>

      <dl className="mt-[17px] grid grid-cols-2 gap-px overflow-hidden rounded-[10px] border border-border bg-border sm:grid-cols-4">
        <Metric label="DAMPAK BISNIS">
          <span className="flex items-center gap-1.5">
            <span className="size-[5px] shrink-0 rounded-full bg-[#EF6EAC]" />
            {FEATURED_SOLUTION.impact}
          </span>
        </Metric>
        <Metric label="URGENSI">{FEATURED_SOLUTION.urgency}</Metric>
        <Metric label="EST. UPAYA">{FEATURED_SOLUTION.effort}</Metric>
        <Metric label="KEYAKINAN">{FEATURED_SOLUTION.confidence}%</Metric>
      </dl>
    </Card>
  )
}
