import { Card } from '@/components/ui/Card'

import { FEATURED_SOLUTION } from '../grupFeedbackData'

export function ActionPlanCard() {
  return (
    <Card label="Saran tindakan" className="border-[#B794F6] p-[18px] shadow-card">
      <p className="text-[10px] leading-3 font-semibold tracking-[1.4px] text-muted-foreground">
        SARAN TINDAKAN
      </p>
      <h3 className="pt-1 text-[15px] leading-[20px] font-normal text-heading">
        {FEATURED_SOLUTION.actionTitle}
      </h3>
      <p className="pt-2 text-[10px] leading-[15px] text-muted-foreground">
        {FEATURED_SOLUTION.actionDescription}
      </p>

      <div className="mt-2.5 rounded-[9px] border border-[rgba(85,214,170,0.09)] bg-[#CCF2E5] px-3 py-2.5">
        <p className="text-[10px] leading-3 font-bold text-muted-foreground">Target hasil</p>
        <p className="pt-1 text-[10px] leading-[15px] text-muted-foreground">
          {FEATURED_SOLUTION.target}
        </p>
      </div>
    </Card>
  )
}
