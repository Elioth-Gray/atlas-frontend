import { useId } from 'react'
import { Bar, BarChart, Cell, ResponsiveContainer, Tooltip, XAxis } from 'recharts'

import { Card } from '@/components/ui/Card'
import { ChartTooltip } from '@/components/ui/ChartTooltip'
import { CountUp } from '@/components/ui/CountUp'
import { MOTION_MS } from '@/utils/motion'

import type { ReviewDay } from '../dashboardData'
import { WEEKLY_REVIEWS } from '../dashboardData'

const QR_COLOR = '#9773FF'

function tooltipRows(day: ReviewDay) {
  return [{ label: 'Feedback QR', value: day.qr, color: QR_COLOR }]
}

interface WeeklyReviewsChartProps {
  days?: ReviewDay[]
}

export function WeeklyReviewsChart({ days = WEEKLY_REVIEWS }: WeeklyReviewsChartProps) {
  const id = useId().replaceAll(':', '')
  const baseGradient = `weekly-base-${id}`
  const highlightGradient = `weekly-highlight-${id}`

  const chartData = days.map((day) => ({ ...day, total: day.qr }))
  const qrTotal = days.reduce((sum, day) => sum + day.qr, 0)

  return (
    <Card className="flex h-full flex-col p-[17px]">
      <div>
        <h2 className="text-[15px] leading-[18px] font-bold text-heading">Jumlah ulasan</h2>
        <p className="pt-1 text-[11px] leading-3 text-body">
          <CountUp value={String(qrTotal)} /> minggu ini
        </p>
      </div>

      <div
        role="img"
        aria-label="Grafik jumlah ulasan per hari"
        className="relative mt-6 min-h-[396px] flex-1"
      >
        <div className="absolute inset-0">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
              <defs>
                <linearGradient id={baseGradient} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#6953AA" />
                  <stop offset="100%" stopColor="#2B2847" />
                </linearGradient>
                <linearGradient id={highlightGradient} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#9C7CFF" />
                  <stop offset="100%" stopColor="#6045BF" />
                </linearGradient>
              </defs>
              <XAxis
                dataKey="label"
                tick={{ fontSize: 10, fill: 'var(--color-body)' }}
                tickLine={false}
                axisLine={false}
                tickMargin={7}
              />
              <Tooltip
                content={
                  <ChartTooltip<ReviewDay>
                    title={(day) => `${day.label} · ${day.qr} ulasan`}
                    rows={tooltipRows}
                  />
                }
                cursor={{ fill: 'var(--color-surface-subtle)', radius: 0 }}
              />
              <Bar
                dataKey="total"
                name="Ulasan"
                maxBarSize={33}
                radius={0}
                animationDuration={MOTION_MS}
                animationEasing="ease-out"
              >
                {chartData.map((day) => (
                  <Cell
                    key={day.label}
                    fill={`url(#${day.highlighted ? highlightGradient : baseGradient})`}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="mt-3 flex items-center justify-between border-t border-border pt-3">
        <span className="flex items-center gap-[5px] text-[11px] text-body">
          <span className="size-[5px] rounded-full" style={{ backgroundColor: QR_COLOR }} />
          Feedback QR
        </span>
        <CountUp value={String(qrTotal)} className="text-[11px] font-bold text-body" />
      </div>
    </Card>
  )
}
