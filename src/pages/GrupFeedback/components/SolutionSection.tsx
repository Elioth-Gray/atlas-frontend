import { Bookmark, Check, Download } from 'lucide-react'
import { useState } from 'react'

import { createSolutionSummary } from '../grupFeedbackData'
import { ActionPlanCard } from './ActionPlanCard'
import { CustomerInsightCards } from './CustomerInsightCards'
import { SolutionScoreCard } from './SolutionScoreCard'
import { StrategicRecommendation } from './StrategicRecommendation'

function downloadSummary() {
  const blob = new Blob([createSolutionSummary()], { type: 'text/plain;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = 'atlas-ringkasan-solusi.txt'
  document.body.append(link)
  link.click()
  link.remove()
  window.setTimeout(() => URL.revokeObjectURL(url), 1000)
}

export function SolutionSection() {
  const [isSaved, setIsSaved] = useState(false)

  return (
    <section aria-labelledby="solution-heading" className="mt-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 id="solution-heading" className="text-xl leading-6 font-bold text-heading">
            Solusi Feedback AI
          </h2>
          <p className="pt-[5px] text-[10px] leading-[13.5px] text-body">
            Ubah feedback kritis jadi rencana nyata untuk bisnis.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-[7px]">
          <button
            type="button"
            onClick={downloadSummary}
            className="flex h-[37px] items-center justify-center gap-[7px] rounded-[9px] border border-border bg-surface px-3.5 text-[10px] font-semibold text-body transition-colors hover:bg-surface-subtle focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary"
          >
            <Download aria-hidden="true" className="size-4" strokeWidth={1.6} />
            Ekspor ringkasan
          </button>
          <button
            type="button"
            aria-pressed={isSaved}
            onClick={() => setIsSaved((saved) => !saved)}
            className="flex h-[37px] items-center justify-center gap-[7px] rounded-[9px] bg-primary px-3.5 text-[10px] font-semibold text-primary-foreground shadow-card transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary"
          >
            {isSaved ? (
              <Check aria-hidden="true" className="size-4" strokeWidth={2} />
            ) : (
              <Bookmark aria-hidden="true" className="size-4" strokeWidth={1.6} />
            )}
            {isSaved ? 'Solusi tersimpan' : 'Simpan solusi'}
          </button>
        </div>
      </div>

      <div className="mt-[18px] grid gap-3 lg:grid-cols-[minmax(0,1fr)_304px]">
        <div className="flex min-w-0 flex-col gap-3">
          <StrategicRecommendation />
          <CustomerInsightCards />
          <ActionPlanCard />
        </div>
        <SolutionScoreCard />
      </div>
    </section>
  )
}
