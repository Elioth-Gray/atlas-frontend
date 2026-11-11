import { useState } from 'react'

import { cn } from '@/utils/cn'

import { FEEDBACK_TOPICS } from '../grupFeedbackData'
import { TOPIC_SOLUTIONS } from '../solutionData'
import { SolutionCallout } from './SolutionCallout'

// Shown when the browser has no WebGL: the same topics and solutions without the 3D view
export function GalaxyFallback({ label }: { label: string }) {
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const selectedTopic = FEEDBACK_TOPICS.find((topic) => topic.id === selectedId)
  const selectedSolution = selectedId ? TOPIC_SOLUTIONS[selectedId] : undefined

  return (
    <div className="galaxy-space p-4">
      <ul aria-label={label} className="grid gap-2 sm:grid-cols-2">
        {FEEDBACK_TOPICS.map((topic) => (
          <li key={topic.id}>
            <button
              type="button"
              aria-label={`Lihat solusi untuk ${topic.label}`}
              aria-pressed={topic.id === selectedId}
              onClick={() => setSelectedId(topic.id)}
              className={cn(
                'flex w-full items-center gap-2.5 rounded-[10px] bg-galaxy-panel/80 px-3 py-2.5 text-left text-[10.5px] text-galaxy-muted ring-1 ring-galaxy-line transition-colors hover:bg-galaxy-soft',
                topic.id === selectedId && 'bg-galaxy-accent-soft ring-galaxy-accent/50'
              )}
            >
              <span
                className="size-3 shrink-0 rounded-full"
                style={{ backgroundColor: topic.colors[1] }}
              />
              <span className="font-semibold text-galaxy-text">{topic.label}</span>
              <span className="ml-auto">{topic.count} sebutan</span>
            </button>
          </li>
        ))}
      </ul>

      {selectedTopic && selectedSolution && (
        <SolutionCallout
          key={selectedTopic.id}
          topic={selectedTopic}
          solution={selectedSolution}
          onClose={() => setSelectedId(null)}
          className="mt-3"
        />
      )}
    </div>
  )
}
