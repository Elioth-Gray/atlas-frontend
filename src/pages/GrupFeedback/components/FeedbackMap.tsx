import { Maximize2, Minimize2, Minus, Plus, RotateCcw, Volume2, VolumeX } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

import { cn } from '@/utils/cn'

import { FEEDBACK_TOPICS, TOTAL_FEEDBACK } from '../grupFeedbackData'
import { FeedbackGalaxy } from './FeedbackGalaxy'
import { isGalaxySoundOn, playGalaxySound, setGalaxySoundOn } from './galaxySound'

const ZOOM_STEP = 0.15
const MIN_ZOOM = 0.7
const MAX_ZOOM = 1.6

const CONTROL_CLASS =
  'flex size-[29px] items-center justify-center rounded-lg border border-border bg-surface text-heading transition-colors hover:bg-surface-subtle focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-secondary disabled:cursor-not-allowed disabled:opacity-40'

export function FeedbackMap() {
  const mapRef = useRef<HTMLElement>(null)
  const [zoom, setZoom] = useState(1)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [isSoundOn, setIsSoundOn] = useState(isGalaxySoundOn)

  useEffect(() => {
    const handleChange = () => setIsFullscreen(document.fullscreenElement === mapRef.current)
    document.addEventListener('fullscreenchange', handleChange)
    return () => document.removeEventListener('fullscreenchange', handleChange)
  }, [])

  function handleZoom(direction: 1 | -1) {
    setZoom((current) =>
      Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, Number((current + direction * ZOOM_STEP).toFixed(2))))
    )
  }

  function toggleSound() {
    setGalaxySoundOn(!isSoundOn)
    setIsSoundOn(!isSoundOn)
    playGalaxySound('toggle')
  }

  function toggleFullscreen() {
    const request = isFullscreen ? document.exitFullscreen() : mapRef.current?.requestFullscreen()
    void request?.catch((error: unknown) => {
      console.error('Mode layar penuh tidak tersedia:', error)
    })
  }

  const mapLabel = `Peta feedback dengan ${FEEDBACK_TOPICS.length} topik: ${FEEDBACK_TOPICS.map(
    (topic) => `${topic.label} ${topic.count} sebutan`
  ).join(', ')}`

  return (
    <section
      ref={mapRef}
      aria-label="Peta feedback"
      className={cn(
        'flex flex-col overflow-hidden border border-border bg-surface',
        isFullscreen ? 'h-full w-full rounded-none' : 'rounded-[14px] shadow-card'
      )}
    >
      <div className="flex items-center justify-between gap-4 border-b border-border px-5 py-[17px]">
        <div>
          <h2 className="text-[15px] leading-[18px] font-bold text-heading">Peta feedback kamu</h2>
          <p className="pt-1 text-[10px] leading-3 text-body">
            {TOTAL_FEEDBACK} feedback dikelompokkan ke {FEEDBACK_TOPICS.length} topik. Klik planet
            untuk melihat solusi AI.
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
          <button
            type="button"
            aria-label={isSoundOn ? 'Matikan efek suara' : 'Nyalakan efek suara'}
            aria-pressed={isSoundOn}
            onClick={toggleSound}
            className={CONTROL_CLASS}
          >
            {isSoundOn ? (
              <Volume2 aria-hidden="true" className="size-[15px]" strokeWidth={1.6} />
            ) : (
              <VolumeX aria-hidden="true" className="size-[15px]" strokeWidth={1.6} />
            )}
          </button>
          <button
            type="button"
            aria-label={isFullscreen ? 'Keluar dari layar penuh' : 'Tampilkan layar penuh'}
            aria-pressed={isFullscreen}
            onClick={toggleFullscreen}
            className={CONTROL_CLASS}
          >
            {isFullscreen ? (
              <Minimize2 aria-hidden="true" className="size-[15px]" strokeWidth={1.6} />
            ) : (
              <Maximize2 aria-hidden="true" className="size-[15px]" strokeWidth={1.6} />
            )}
          </button>
        </div>
      </div>

      <FeedbackGalaxy zoom={zoom} label={mapLabel} isFullscreen={isFullscreen} />

      <span className="sr-only" aria-live="polite">
        Ukuran peta {Math.round(zoom * 100)} persen
      </span>
    </section>
  )
}
