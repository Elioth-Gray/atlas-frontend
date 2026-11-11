import { Card } from '@/components/ui/Card'

import type { StatItem } from '../dashboardData'

export function StatCard({ label, value, change, suffix }: StatItem) {
  return (
    <Card className="min-h-[115px] p-4">
      <p className="text-[10.5px] leading-3 text-body">{label}</p>
      <p className="pt-1 text-[25px] leading-[33px] font-bold text-heading">{value}</p>
      <p className="text-[10.5px] leading-[10.5px] text-body">
        <span className="font-bold text-primary">{change}</span> {suffix}
      </p>
    </Card>
  )
}
