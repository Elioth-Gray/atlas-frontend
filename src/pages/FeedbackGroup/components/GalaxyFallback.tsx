import { useState } from 'react'

import { cn } from '@/utils/cn'
import { formatPlanetStatus } from '@/utils/format'

import type { FeedbackTopic } from '../feedbackGroupData'
import { FEEDBACK_TOPICS } from '../feedbackGroupData'
import { IssueConsultationCallout } from './IssueConsultationCallout'

interface GalaxyFallbackProps {
  label: string
  topics?: FeedbackTopic[]
}

// Shown when the browser has no WebGL: the same topics and solutions without the 3D view
export function GalaxyFallback({ label, topics = FEEDBACK_TOPICS }: GalaxyFallbackProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const selectedTopic = topics.find((topic) => topic.id === selectedId)

  return (
    <div className="galaxy-space p-4">
      <ul aria-label={label} className="grid gap-2 sm:grid-cols-2">
        {topics.map((topic) => (
          <li key={topic.id}>
            <button
              type="button"
              aria-label={`Lihat solusi untuk ${topic.label}`}
              aria-pressed={topic.id === selectedId}
              onClick={() => setSelectedId(topic.id)}
              className={cn(
                'flex w-full items-center gap-2.5 bg-galaxy-panel/80 px-3 py-2.5 text-left text-[11px] text-galaxy-muted ring-1 ring-galaxy-line transition-colors hover:bg-galaxy-soft',
                topic.id === selectedId && 'bg-galaxy-accent-soft ring-galaxy-accent/50'
              )}
            >
              <span
                className="size-3 shrink-0 rounded-full"
                style={{ backgroundColor: topic.colors[1] }}
              />
              <span className="font-semibold text-galaxy-text">{topic.label}</span>
              <span className="text-[10px] text-galaxy-subtle">
                · {formatPlanetStatus(topic.planetStatus)}
              </span>
              <span className="ml-auto">{topic.count} opini</span>
            </button>
          </li>
        ))}
      </ul>

      {selectedTopic && (
        <IssueConsultationCallout
          key={selectedTopic.id}
          topic={selectedTopic}
          onClose={() => setSelectedId(null)}
          className="mt-3"
        />
      )}
    </div>
  )
}
