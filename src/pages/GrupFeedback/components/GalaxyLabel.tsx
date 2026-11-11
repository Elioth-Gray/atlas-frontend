import type { Ref } from 'react'

import { cn } from '@/utils/cn'

import type { FeedbackTopic } from '../grupFeedbackData'
import { FEEDBACK_TOPICS } from '../grupFeedbackData'

const TOTAL_MENTIONS = FEEDBACK_TOPICS.reduce((sum, topic) => sum + topic.count, 0)

interface GalaxyLabelProps {
  topic: FeedbackTopic
  isHovered: boolean
  isSelected: boolean
  onSelect: () => void
  ref?: Ref<HTMLButtonElement>
}

// The scene moves this label every frame by writing its transform directly
export function GalaxyLabel({ topic, isHovered, isSelected, onSelect, ref }: GalaxyLabelProps) {
  return (
    <button
      ref={ref}
      type="button"
      aria-label={`Lihat solusi untuk ${topic.label}`}
      aria-pressed={isSelected}
      onClick={onSelect}
      className={cn(
        'absolute top-0 left-0 flex flex-col items-center rounded-[10px] px-2 py-1 text-center whitespace-nowrap text-galaxy-text opacity-0 transition-[opacity,background-color,padding] duration-200 [text-shadow:0_1px_6px_var(--color-galaxy-label-shadow)] hover:bg-galaxy-soft focus-visible:outline-2 focus-visible:outline-galaxy-accent',
        isHovered &&
          'bg-galaxy-panel/90 px-3 py-2 shadow-card ring-1 ring-galaxy-line backdrop-blur-sm',
        isSelected && 'bg-galaxy-accent-soft ring-1 ring-galaxy-accent/50'
      )}
    >
      <span
        className={cn(
          'font-semibold',
          topic.isPrimary ? 'text-[14px] leading-5' : 'text-[10.5px] leading-4'
        )}
      >
        {topic.label}
      </span>
      <span className="text-[10px] leading-3 text-galaxy-subtle">
        {topic.count} sebutan · {topic.priority}
      </span>
      {isHovered && (
        <span className="mt-1 text-[10px] leading-3 text-galaxy-accent">
          {Math.round((topic.count / TOTAL_MENTIONS) * 100)}% dari semua sebutan · klik untuk solusi
        </span>
      )}
    </button>
  )
}
