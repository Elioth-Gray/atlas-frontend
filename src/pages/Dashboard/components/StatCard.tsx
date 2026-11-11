import { Card } from '@/components/ui/Card'
import { CountUp } from '@/components/ui/CountUp'

import type { StatItem } from '../dashboardData'

interface StatCardProps extends StatItem {
  delay?: number
}

export function StatCard({ label, value, change, suffix, delay = 0 }: StatCardProps) {
  return (
    <Card className="min-h-[115px] p-4">
      <p className="text-[10.5px] leading-3 text-body">{label}</p>
      <p className="pt-1 text-[25px] leading-[33px] font-bold text-heading">
        <CountUp value={value} delay={delay} />
      </p>
      <p className="text-[10.5px] leading-[10.5px] text-body">
        <CountUp value={change} delay={delay} className="font-bold text-primary" /> {suffix}
      </p>
    </Card>
  )
}
