import { ChevronRight } from 'lucide-react'
import {
  Bar,
  BarChart,
  Cell,
  LabelList,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

import { Card } from '@/components/ui/Card'
import { ChartTooltip } from '@/components/ui/ChartTooltip'
import { CountUp } from '@/components/ui/CountUp'
import { MOTION_MS } from '@/utils/motion'

import type { ComplaintItem } from '../dashboardData'
import { TOP_COMPLAINTS } from '../dashboardData'

const ROW_HEIGHT = 34
const TOTAL_NEGATIVE = 312

const CHART_DATA = TOP_COMPLAINTS.map((item, index) => ({
  ...item,
  rankLabel: `${index + 1}. ${item.label}`,
}))

function tooltipRows(item: ComplaintItem) {
  const share = Math.round((item.count / TOTAL_NEGATIVE) * 100)
  return [
    { label: 'Sebutan', value: item.count, color: item.color },
    { label: 'Dari komentar negatif', value: `${share}%`, color: item.color },
  ]
}

export function TopComplaints() {
  const summary = TOP_COMPLAINTS.map((item) => `${item.label} ${item.count}`).join(', ')

  return (
    <Card className="p-[17px]">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-[15px] leading-[18px] font-bold text-heading">Keluhan terbanyak</h2>
          <p className="pt-1 text-[10px] leading-3 text-body">
            Dari <CountUp value={String(TOTAL_NEGATIVE)} /> komentar negatif
          </p>
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

      <div
        role="img"
        aria-label={`Grafik keluhan terbanyak: ${summary}`}
        className="mt-3"
        style={{ height: ROW_HEIGHT * TOP_COMPLAINTS.length }}
      >
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={CHART_DATA}
            layout="vertical"
            barCategoryGap={10}
            margin={{ top: 0, right: 28, bottom: 0, left: 0 }}
          >
            <XAxis type="number" hide domain={[0, 'dataMax']} />
            <YAxis
              type="category"
              dataKey="rankLabel"
              width={118}
              tick={{ fontSize: 10.5, fill: 'var(--color-body)' }}
              tickLine={false}
              axisLine={false}
            />
            <Tooltip
              content={
                <ChartTooltip<ComplaintItem> title={(item) => item.label} rows={tooltipRows} />
              }
              cursor={{ fill: 'var(--color-surface-subtle)', radius: 6 }}
            />
            <Bar
              dataKey="count"
              radius={6}
              background={{ fill: 'var(--color-surface-subtle)', radius: 6 }}
              animationDuration={MOTION_MS}
              animationEasing="ease-out"
            >
              {CHART_DATA.map((item) => (
                <Cell key={item.label} fill={item.color} />
              ))}
              <LabelList
                dataKey="count"
                position="right"
                offset={8}
                style={{ fontSize: 10.5, fontWeight: 700, fill: 'var(--color-body)' }}
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  )
}
