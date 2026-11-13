import { ChevronRight } from 'lucide-react'
import { Link } from 'react-router'
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
const DEFAULT_TOTAL_NEGATIVE = 312

interface TopComplaintsProps {
  complaints?: ComplaintItem[]
  totalNegative?: number
}

export function TopComplaints({
  complaints = TOP_COMPLAINTS,
  totalNegative = DEFAULT_TOTAL_NEGATIVE,
}: TopComplaintsProps) {
  const effectiveTotal = Math.max(
    totalNegative,
    complaints.reduce((sum, item) => sum + item.count, 0),
    1
  )

  const chartData = complaints.map((item, index) => ({
    ...item,
    rankLabel: `${index + 1}. ${item.label}`,
  }))

  function tooltipRows(item: ComplaintItem) {
    const share = Math.round((item.count / effectiveTotal) * 100)
    return [
      { label: 'Sebutan', value: item.count, color: item.color },
      { label: 'Dari komentar negatif', value: `${share}%`, color: item.color },
    ]
  }

  const summary = complaints.map((item) => `${item.label} ${item.count}`).join(', ')

  return (
    <Card className="p-[17px]">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-[15px] leading-[18px] font-bold text-heading">Keluhan terbanyak</h2>
          <p className="pt-1 text-[11px] leading-3 text-body">
            Dari <CountUp value={String(totalNegative)} /> komentar negatif
          </p>
        </div>
        <Link
          to="/feedback-group"
          className="flex shrink-0 items-center gap-1 text-[11px] leading-3 text-body transition-colors hover:text-primary"
        >
          Lihat grup
          <ChevronRight aria-hidden="true" className="size-3.5 text-muted-foreground" />
        </Link>
      </div>

      {chartData.length === 0 ? (
        <p className="mt-4 py-6 text-center text-[11px] text-muted-foreground">
          Belum ada keluhan tercatat pada periode ini.
        </p>
      ) : (
        <div
          role="img"
          aria-label={`Grafik keluhan terbanyak: ${summary}`}
          className="mt-3"
          style={{ height: ROW_HEIGHT * chartData.length }}
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
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
                cursor={{ fill: 'var(--color-surface-subtle)', radius: 0 }}
              />
              <Bar
                dataKey="count"
                radius={0}
                background={{ fill: 'var(--color-surface-subtle)', radius: 0 }}
                animationDuration={MOTION_MS}
                animationEasing="ease-out"
              >
                {chartData.map((item) => (
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
      )}
    </Card>
  )
}
