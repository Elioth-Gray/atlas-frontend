import { Minus, Plus, RotateCcw } from 'lucide-react'
import { useState } from 'react'

import { Card } from '@/components/ui/Card'

import { FEEDBACK_TOPICS, TOTAL_FEEDBACK } from '../grupFeedbackData'

const ZOOM_STEP = 0.15
const MIN_ZOOM = 0.8
const MAX_ZOOM = 1.5

const CONTROL_CLASS =
  'flex size-[29px] items-center justify-center rounded-lg border border-border bg-surface text-heading transition-colors hover:bg-surface-subtle focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-secondary disabled:cursor-not-allowed disabled:opacity-40'

export function FeedbackMap() {
  const [zoom, setZoom] = useState(1)

  function handleZoom(direction: 1 | -1) {
    setZoom((current) =>
      Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, Number((current + direction * ZOOM_STEP).toFixed(2))))
    )
  }

  const mapLabel = `Peta feedback dengan ${FEEDBACK_TOPICS.length} topik: ${FEEDBACK_TOPICS.map(
    (topic) => `${topic.label} ${topic.count} sebutan`
  ).join(', ')}`

  return (
    <Card label="Peta feedback" className="overflow-hidden">
      <div className="flex items-center justify-between gap-4 border-b border-border px-5 py-[17px]">
        <div>
          <h2 className="text-[15px] leading-[18px] font-bold text-heading">Peta feedback kamu</h2>
          <p className="pt-1 text-[10px] leading-3 text-body">
            {TOTAL_FEEDBACK} feedback dikelompokkan ke {FEEDBACK_TOPICS.length} topik yang saling
            terhubung
          </p>
        </div>

        <div className="flex shrink-0 items-center gap-[5px]">
          <button
            type="button"
            aria-label="Perkecil peta"
            onClick={() => handleZoom(-1)}
            disabled={zoom <= MIN_ZOOM}
            className={CONTROL_CLASS}
          >
            <Minus aria-hidden="true" className="size-4" strokeWidth={1.6} />
          </button>
          <button
            type="button"
            aria-label="Perbesar peta"
            onClick={() => handleZoom(1)}
            disabled={zoom >= MAX_ZOOM}
            className={CONTROL_CLASS}
          >
            <Plus aria-hidden="true" className="size-4" strokeWidth={1.6} />
          </button>
          <button
            type="button"
            aria-label="Atur ulang ukuran peta"
            onClick={() => setZoom(1)}
            disabled={zoom === 1}
            className={CONTROL_CLASS}
          >
            <RotateCcw aria-hidden="true" className="size-[15px]" strokeWidth={1.6} />
          </button>
        </div>
      </div>

      <div className="[scrollbar-width:thin] overflow-x-auto bg-[#F8F6FD]">
        <svg
          role="img"
          aria-label={mapLabel}
          viewBox="0 0 978 565"
          className="block h-auto w-full min-w-[760px]"
        >
          <defs>
            {FEEDBACK_TOPICS.map((topic) => (
              <radialGradient
                key={topic.id}
                id={`bubble-${topic.id}`}
                cx="41.72%"
                cy="54.72%"
                r="54.47%"
              >
                <stop offset="0%" stopColor={topic.colors[0]} />
                <stop offset="52%" stopColor={topic.colors[1]} />
                <stop offset="100%" stopColor={topic.colors[2]} />
              </radialGradient>
            ))}
            <filter id="map-glow" x="-60%" y="-60%" width="220%" height="220%">
              <feGaussianBlur stdDeviation="42.5" />
            </filter>
            <filter id="bubble-shadow" x="-30%" y="-30%" width="160%" height="160%">
              <feDropShadow
                dx="0"
                dy="5"
                stdDeviation="7"
                floodColor="#64748B"
                floodOpacity="0.16"
              />
            </filter>
            <pattern id="map-grid" width="32" height="32" patternUnits="userSpaceOnUse">
              <path d="M32 0H0V32" fill="none" stroke="#DDE1EC" strokeWidth="1" />
            </pattern>
          </defs>

          <rect width="978" height="565" fill="url(#map-grid)" opacity="0.18" />
          <ellipse
            cx="443"
            cy="266"
            rx="150"
            ry="125"
            fill="#6A3BE0"
            opacity="0.13"
            filter="url(#map-glow)"
          />
          <ellipse
            cx="657"
            cy="156"
            rx="115"
            ry="100"
            fill="#E34E9A"
            opacity="0.13"
            filter="url(#map-glow)"
          />

          <g
            style={{
              transform: `scale(${zoom})`,
              transformOrigin: '489px 282px',
              transition: 'transform 200ms ease-out',
            }}
          >
            <g transform="rotate(-12 489 282)">
              <ellipse
                cx="489"
                cy="282"
                rx="525"
                ry="270"
                fill="none"
                stroke="#B7A0DE"
                strokeWidth="1.5"
              />
              <ellipse
                cx="489"
                cy="282"
                rx="370"
                ry="190"
                fill="none"
                stroke="#B7A0DE"
                strokeWidth="1.5"
              />
              <ellipse
                cx="489"
                cy="282"
                rx="230"
                ry="115"
                fill="none"
                stroke="#B7A0DE"
                strokeWidth="1.5"
              />
            </g>

            <circle cx="490" cy="244" r="88" fill="none" stroke="#B8A0E2" strokeWidth="1.5" />
            <circle cx="490" cy="244" r="96" fill="none" stroke="#B8A0E2" strokeWidth="1.5" />

            {FEEDBACK_TOPICS.map((topic) => (
              <g key={topic.id}>
                <circle
                  cx={topic.cx}
                  cy={topic.cy}
                  r={topic.radius}
                  fill={`url(#bubble-${topic.id})`}
                  filter="url(#bubble-shadow)"
                />
                <text
                  x={topic.cx}
                  y={topic.cy - (topic.isPrimary ? 16 : 12)}
                  textAnchor="middle"
                  fill="#1E293B"
                  fontSize="10"
                >
                  {topic.priority}
                </text>
                <text
                  x={topic.cx}
                  y={topic.cy + (topic.isPrimary ? 4 : 3)}
                  textAnchor="middle"
                  fill="#1E293B"
                  fontSize={topic.isPrimary ? '15' : '10'}
                  fontWeight="700"
                >
                  {topic.label}
                </text>
                <text
                  x={topic.cx}
                  y={topic.cy + (topic.isPrimary ? 22 : 18)}
                  textAnchor="middle"
                  fill="#1E293B"
                  fontSize="10"
                >
                  {topic.count} sebutan
                </text>
              </g>
            ))}
          </g>
        </svg>
      </div>

      <span className="sr-only" aria-live="polite">
        Ukuran peta {Math.round(zoom * 100)} persen
      </span>
    </Card>
  )
}
