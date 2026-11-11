import { MoreHorizontal } from 'lucide-react'
import { useId } from 'react'

import { Card } from '@/components/ui/Card'
import { cn } from '@/utils/cn'

import { SENTIMENT_SUMMARY, SENTIMENT_TREND } from '../dashboardData'

const WIDTH = 600
const HEIGHT = 150
const Y_LABELS = ['100', '75', '50', '25', '0']

function buildLinePath(values: number[]) {
  const step = WIDTH / (values.length - 1)
  const points = values.map((value, index) => ({
    x: index * step,
    y: HEIGHT - (value / 100) * HEIGHT,
  }))

  return points.reduce((path, point, index) => {
    if (index === 0) return `M ${point.x} ${point.y}`

    const previous = points[index - 1]
    const control = step / 3
    return `${path} C ${previous.x + control} ${previous.y}, ${point.x - control} ${point.y}, ${point.x} ${point.y}`
  }, '')
}

export function SentimentTrendChart() {
  const gradientId = `sentiment-${useId().replaceAll(':', '')}`

  const positivePath = buildLinePath(SENTIMENT_TREND.map((point) => point.positive))
  const neutralPath = buildLinePath(SENTIMENT_TREND.map((point) => point.neutral))
  const negativePath = buildLinePath(SENTIMENT_TREND.map((point) => point.negative))
  const areaPath = `${positivePath} L ${WIDTH} ${HEIGHT} L 0 ${HEIGHT} Z`
  const summary = SENTIMENT_SUMMARY.map((item) => `${item.label} ${item.value}`).join(', ')

  return (
    <Card className="p-[17px]">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-[15px] leading-[18px] font-bold text-heading">Tren sentimen</h2>
          <p className="pt-1 text-[10px] leading-3 text-body">Perubahan sentimen pelanggan</p>
        </div>
        <button
          type="button"
          aria-label="Opsi tren sentimen"
          className="flex size-6 shrink-0 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-surface-subtle"
        >
          <MoreHorizontal aria-hidden="true" className="size-[18px]" />
        </button>
      </div>

      <ul className="mt-4 flex flex-wrap items-center gap-x-[17px] gap-y-2">
        {SENTIMENT_SUMMARY.map((item) => (
          <li key={item.label} className="flex items-center gap-1.5 text-[10px] text-body">
            <span className={cn('size-1.5 shrink-0 rounded-full', item.colorClass)} />
            <span>
              {item.label} <span className="font-medium">{item.value}</span>
            </span>
          </li>
        ))}
      </ul>

      <div className="mt-1.5 flex gap-2.5">
        <div
          aria-hidden="true"
          className="flex h-[150px] flex-col justify-between text-right text-[10px] leading-none text-body"
        >
          {Y_LABELS.map((label) => (
            <span key={label}>{label}</span>
          ))}
        </div>

        <div className="min-w-0 flex-1">
          <div role="img" aria-label={`Grafik tren sentimen: ${summary}`}>
            <svg
              aria-hidden="true"
              className="h-[150px] w-full"
              viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
              preserveAspectRatio="none"
            >
              <defs>
                <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="0%"
                    stopColor="var(--color-sentiment-positive)"
                    stopOpacity="0.35"
                  />
                  <stop offset="100%" stopColor="var(--color-sentiment-positive)" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path d={areaPath} fill={`url(#${gradientId})`} />
              <path
                d={positivePath}
                fill="none"
                stroke="var(--color-sentiment-positive)"
                strokeWidth="2"
                vectorEffect="non-scaling-stroke"
              />
              <path
                d={neutralPath}
                fill="none"
                stroke="var(--color-sentiment-neutral)"
                strokeWidth="2"
                vectorEffect="non-scaling-stroke"
              />
              <path
                d={negativePath}
                fill="none"
                stroke="var(--color-sentiment-negative)"
                strokeWidth="2"
                vectorEffect="non-scaling-stroke"
              />
            </svg>
          </div>

          <div
            aria-hidden="true"
            className="mt-1 flex justify-between text-[10px] leading-none text-body"
          >
            {SENTIMENT_TREND.map((point) => (
              <span key={point.label}>{point.label}</span>
            ))}
          </div>
        </div>
      </div>
    </Card>
  )
}
