import { QrCode } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router'

import { useTheme } from '@/hooks/useTheme'
import { cn } from '@/utils/cn'
import type { Theme } from '@/utils/theme'

import type { FeedbackTopic } from '../feedbackGroupData'
import { FEEDBACK_TOPICS } from '../feedbackGroupData'
import { GalaxyConnector } from './GalaxyConnector'
import { GalaxyFallback } from './GalaxyFallback'
import { GalaxyLabel } from './GalaxyLabel'
import type { GalaxyScene } from './galaxyScene'
import { createGalaxyScene } from './galaxyScene'
import { playGalaxySound } from './galaxySound'
import { IssueConsultationCallout } from './IssueConsultationCallout'

interface FeedbackGalaxyProps {
  zoom: number
  label: string
  isFullscreen: boolean
  topics?: FeedbackTopic[]
  /** Forces the scene's palette, for pages that keep one theme whatever the app setting */
  theme?: Theme
  /** Replaces the default size and space background */
  className?: string
  /** False shows the galaxy as a picture: no hover, no selection, nothing to focus */
  isInteractive?: boolean
}

function supportsWebGL() {
  return typeof window !== 'undefined' && 'WebGL2RenderingContext' in window
}

export function FeedbackGalaxy({
  zoom,
  label,
  isFullscreen,
  topics = FEEDBACK_TOPICS,
  theme: forcedTheme,
  className,
  isInteractive = true,
}: FeedbackGalaxyProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const labelRefs = useRef<(HTMLButtonElement | null)[]>([])
  const panelRef = useRef<HTMLDivElement>(null)
  const connectorRef = useRef<SVGPathElement>(null)
  const anchorRef = useRef<SVGCircleElement>(null)
  const ringRef = useRef<SVGCircleElement>(null)
  const sceneRef = useRef<GalaxyScene | null>(null)
  const [hoveredId, setHoveredId] = useState<string | null>(null)
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [isSupported, setIsSupported] = useState(supportsWebGL)
  const { theme: appTheme } = useTheme()
  const theme = forcedTheme ?? appTheme

  const selectedTopic = topics.find((topic) => topic.id === selectedId)
  const totalMentions = topics.reduce((sum, topic) => sum + topic.count, 0)

  useEffect(() => {
    const container = containerRef.current
    if (!container || !isSupported) return

    let scene: GalaxyScene
    try {
      scene = createGalaxyScene(container, {
        topics,
        getLabels: () => labelRefs.current,
        getOverlay: () => ({
          panel: panelRef.current,
          connector: connectorRef.current,
          anchor: anchorRef.current,
          ring: ringRef.current,
        }),
        onHover: (topicId) => {
          if (!isInteractive) return
          setHoveredId(topicId)
          if (topicId) playGalaxySound('hover')
        },
        onSelect: (topicId) => {
          if (isInteractive) setSelectedId(topicId)
        },
        animate: !window.matchMedia('(prefers-reduced-motion: reduce)').matches,
        theme,
      })
    } catch (error) {
      console.error('Gagal memuat peta 3D:', error)
      queueMicrotask(() => setIsSupported(false))
      return
    }

    sceneRef.current = scene
    return () => {
      scene.dispose()
      sceneRef.current = null
    }
  }, [isSupported, theme, isInteractive, topics])

  useEffect(() => {
    sceneRef.current?.setZoom(zoom)
  }, [zoom])

  // Focusing a planet drives the camera and the zoom sound, whichever control picked it
  const previousSelectedId = useRef<string | null>(null)
  useEffect(() => {
    sceneRef.current?.focus(selectedId)
    if (selectedId && selectedId !== previousSelectedId.current) playGalaxySound('select')
    if (!selectedId && previousSelectedId.current) playGalaxySound('close')
    previousSelectedId.current = selectedId
  }, [selectedId])

  useEffect(() => {
    if (!selectedId) return
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setSelectedId(null)
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [selectedId])

  if (!isSupported && topics.length > 0) {
    return <GalaxyFallback label={label} topics={topics} />
  }

  return (
    <div
      ref={containerRef}
      role={isInteractive ? 'group' : 'img'}
      aria-label={label}
      inert={!isInteractive}
      className={cn(
        'relative overflow-hidden',
        className ?? cn('galaxy-space', isFullscreen ? 'min-h-0 flex-1' : 'h-[420px] sm:h-[560px]')
      )}
    >
      {topics.length === 0 ? (
        <div className="pointer-events-none relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
          <div className="pointer-events-auto max-w-[440px] border border-galaxy-line/80 bg-galaxy-panel/80 px-6 py-5 backdrop-blur-xs">
            <h3 className="text-[15px] font-bold text-galaxy-text">
              Orbit planet masalah belum ada
            </h3>
            <p className="mt-1.5 text-[12px] leading-[18px] text-galaxy-muted">
              Belum ada klaster opini negatif yang mengorbit saat ini. Bagikan kode QR tokomu agar
              ulasan pelanggan masuk dan planet masalah mulai terbentuk.
            </p>
            <Link
              to="/create-qr"
              className="mt-4 inline-flex h-9 items-center gap-2 bg-primary px-4 text-[12px] font-semibold text-white transition-colors hover:bg-primary-hover"
            >
              <QrCode aria-hidden="true" className="size-4" />
              Buat & Unduh QR Feedback
            </Link>
          </div>
        </div>
      ) : (
        <>
          <div className="pointer-events-none absolute inset-0 z-10">
            {topics.map((topic, index) => (
              <GalaxyLabel
                key={topic.id}
                ref={(element) => {
                  labelRefs.current[index] = element
                }}
                topic={topic}
                totalMentions={totalMentions}
                isHovered={topic.id === hoveredId && !selectedId}
                isSelected={topic.id === selectedId}
                onSelect={() => setSelectedId(topic.id)}
              />
            ))}
          </div>

          {selectedTopic && (
            <>
              <GalaxyConnector
                connectorRef={connectorRef}
                anchorRef={anchorRef}
                ringRef={ringRef}
              />
              <IssueConsultationCallout
                key={selectedTopic.id}
                ref={panelRef}
                topic={selectedTopic}
                onClose={() => setSelectedId(null)}
                className="absolute inset-x-3 bottom-3 z-30 max-h-[65%] animate-callout-in sm:inset-x-auto sm:top-4 sm:right-4 sm:bottom-4 sm:max-h-none sm:w-[390px]"
              />
            </>
          )}

          {isInteractive && !selectedId && (
            <p className="pointer-events-none absolute bottom-3 left-1/2 z-10 -translate-x-1/2 bg-galaxy-panel/70 px-3 py-1 text-[11px] whitespace-nowrap text-galaxy-muted ring-1 ring-galaxy-line">
              Klik planet untuk melihat detail isu & konsultasi AI
            </p>
          )}
        </>
      )}
    </div>
  )
}
