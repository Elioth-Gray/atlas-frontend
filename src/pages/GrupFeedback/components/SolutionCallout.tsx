import { Bookmark, Check, Download, Sparkles, X } from 'lucide-react'
import type { Ref } from 'react'
import { useState } from 'react'

import { cn } from '@/utils/cn'

import type { FeedbackTopic } from '../grupFeedbackData'
import type { TopicSolution } from '../solutionData'
import { createSolutionSummary } from '../solutionData'
import { SolutionDetails } from './SolutionDetails'

interface SolutionCalloutProps {
  topic: FeedbackTopic
  solution: TopicSolution
  onClose: () => void
  ref?: Ref<HTMLDivElement>
  className?: string
}

const BUTTON_CLASS =
  'flex h-[34px] flex-1 items-center justify-center gap-1.5 px-3 text-[11px] font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-galaxy-accent'

function downloadSummary(topic: FeedbackTopic, solution: TopicSolution) {
  const blob = new Blob([createSolutionSummary(topic, solution)], {
    type: 'text/plain;charset=utf-8',
  })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = `atlas-solusi-${topic.id}.txt`
  document.body.append(link)
  link.click()
  link.remove()
  window.setTimeout(() => URL.revokeObjectURL(url), 1000)
}

export function SolutionCallout({
  topic,
  solution,
  onClose,
  ref,
  className,
}: SolutionCalloutProps) {
  const [isSaved, setIsSaved] = useState(false)

  return (
    <section
      ref={ref}
      aria-labelledby={`solution-${topic.id}`}
      className={cn(
        'flex flex-col overflow-hidden bg-galaxy-panel/90 text-galaxy-text shadow-panel ring-1 ring-galaxy-line',
        className
      )}
    >
      <div className="flex items-start gap-3 border-b border-galaxy-line px-4 pt-4 pb-3">
        <span
          className="mt-0.5 size-9 shrink-0 rounded-full"
          style={{
            background: `radial-gradient(circle at 35% 30%, ${topic.colors[0]}, ${topic.colors[1]} 55%, ${topic.colors[2]})`,
          }}
        />
        <div className="min-w-0 flex-1">
          <h2
            id={`solution-${topic.id}`}
            className="flex items-center gap-1 text-[12px] leading-4 font-semibold text-galaxy-accent"
          >
            <Sparkles aria-hidden="true" className="size-3" strokeWidth={2} />
            Solusi Feedback AI
          </h2>
          <p className="pt-1 text-[14px] leading-5 font-semibold">{topic.label}</p>
          <p className="text-[11px] leading-3 text-galaxy-subtle">
            {topic.count} sebutan, prioritas {topic.priority.toLowerCase()}
          </p>
        </div>
        <button
          type="button"
          aria-label="Tutup solusi"
          onClick={onClose}
          className="flex size-7 shrink-0 items-center justify-center text-galaxy-subtle transition-colors hover:bg-galaxy-soft hover:text-galaxy-text focus-visible:outline-2 focus-visible:outline-galaxy-accent"
        >
          <X aria-hidden="true" className="size-4" strokeWidth={1.8} />
        </button>
      </div>

      <div className="flex-1 [scrollbar-width:thin] [scrollbar-color:var(--color-galaxy-line)_transparent] overflow-y-auto px-4 py-3.5">
        <SolutionDetails solution={solution} />
      </div>

      <div className="flex gap-2 border-t border-galaxy-line px-4 py-3">
        <button
          type="button"
          onClick={() => downloadSummary(topic, solution)}
          className={cn(
            BUTTON_CLASS,
            'bg-galaxy-soft text-galaxy-text ring-1 ring-galaxy-line hover:bg-galaxy-accent-soft'
          )}
        >
          <Download aria-hidden="true" className="size-3.5" strokeWidth={1.8} />
          Ekspor ringkasan
        </button>
        <button
          type="button"
          aria-pressed={isSaved}
          onClick={() => setIsSaved((saved) => !saved)}
          className={cn(
            BUTTON_CLASS,
            'bg-primary text-white hover:bg-primary-hover hover:opacity-90'
          )}
        >
          {isSaved ? (
            <Check aria-hidden="true" className="size-3.5" strokeWidth={2} />
          ) : (
            <Bookmark aria-hidden="true" className="size-3.5" strokeWidth={1.8} />
          )}
          {isSaved ? 'Tersimpan' : 'Simpan solusi'}
        </button>
      </div>
    </section>
  )
}
