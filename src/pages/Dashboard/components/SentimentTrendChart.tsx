import { MoreHorizontal } from 'lucide-react'
import { useId } from 'react'
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

import { Card } from '@/components/ui/Card'
import { ChartTooltip } from '@/components/ui/ChartTooltip'
import { CountUp } from '@/components/ui/CountUp'
import { cn } from '@/utils/cn'
import { MOTION_MS } from '@/utils/motion'

import { SENTIMENT_SUMMARY, SENTIMENT_TREND } from '../dashboardData'

const AXIS_TICK = { fontSize: 10, fill: 'var(--color-body)' }

const SERIES = [
  { key: 'positive', name: 'Positif', color: 'var(--color-sentiment-positive)' },
  { key: 'neutral', name: 'Netral', color: 'var(--color-sentiment-neutral)' },
  { key: 'negative', name: 'Negatif', color: 'var(--color-sentiment-negative)' },
] as const

export function SentimentTrendChart() {
  const gradientId = `sentiment-${useId().replaceAll(':', '')}`
  const summary = SENTIMENT_SUMMARY.map((item) => `${item.label} ${item.value}`).join(', ')

  return (
    <Card className="p-[17px]">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-[15px] leading-[18px] font-bold text-heading">Tren sentimen</h2>
          <p className="pt-1 text-[11px] leading-3 text-body">Perubahan sentimen pelanggan</p>
        </div>
        <button
          type="button"
          aria-label="Opsi tren sentimen"
          className="flex size-6 shrink-0 items-center justify-center text-muted-foreground transition-colors hover:bg-surface-subtle"
        >
          <MoreHorizontal aria-hidden="true" className="size-[18px]" />
        </button>
      </div>

      <ul className="mt-4 flex flex-wrap items-center gap-x-[17px] gap-y-2">
        {SENTIMENT_SUMMARY.map((item) => (
          <li key={item.label} className="flex items-center gap-1.5 text-[11px] text-body">
            <span className={cn('size-1.5 shrink-0 rounded-full', item.colorClass)} />
            <span>
              {item.label} <CountUp value={item.value} className="font-medium" />
            </span>
          </li>
        ))}
      </ul>

      <div role="img" aria-label={`Grafik tren sentimen: ${summary}`} className="mt-3 h-[180px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={SENTIMENT_TREND} margin={{ top: 6, right: 6, bottom: 0, left: -26 }}>
            <defs>
              <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--color-sentiment-positive)" stopOpacity={0.35} />
                <stop offset="100%" stopColor="var(--color-sentiment-positive)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} stroke="var(--color-border)" strokeDasharray="3 4" />
            <XAxis
              dataKey="label"
              tick={AXIS_TICK}
              tickLine={false}
              axisLine={false}
              tickMargin={6}
            />
            <YAxis
              domain={[0, 100]}
              ticks={[0, 25, 50, 75, 100]}
              tick={AXIS_TICK}
              tickLine={false}
              axisLine={false}
            />
            <Tooltip
              content={<ChartTooltip valueSuffix="%" />}
              cursor={{ stroke: 'var(--color-secondary)', strokeDasharray: '3 3' }}
            />
            {SERIES.map((series) => (
              <Area
                key={series.key}
                type="monotone"
                dataKey={series.key}
                name={series.name}
                stroke={series.color}
                strokeWidth={2}
                fill={series.key === 'positive' ? `url(#${gradientId})` : 'transparent'}
                activeDot={{ r: 4, strokeWidth: 2, stroke: 'var(--color-surface)' }}
                animationDuration={MOTION_MS}
                animationEasing="ease-out"
              />
            ))}
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Card>
  )
}
