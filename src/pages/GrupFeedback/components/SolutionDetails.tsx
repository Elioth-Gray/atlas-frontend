import type { ReactNode } from 'react'

import type { TopicSolution } from '../solutionData'

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="border-t border-galaxy-line pt-3">
      <h3 className="text-[11px] leading-4 font-semibold text-galaxy-subtle">{title}</h3>
      <div className="pt-1.5 text-[11px] leading-[16px] text-galaxy-muted">{children}</div>
    </div>
  )
}

export function SolutionDetails({ solution }: { solution: TopicSolution }) {
  const scorePercent = Number(solution.score.replace(',', '.')) * 10

  return (
    <div className="flex flex-col gap-3.5">
      <div className="flex items-center gap-3.5">
        <div
          className="flex size-[68px] shrink-0 items-center justify-center rounded-full"
          style={{
            background: `conic-gradient(var(--color-galaxy-accent) 0% ${scorePercent}%, var(--color-galaxy-track) ${scorePercent}% 100%)`,
          }}
        >
          <div className="flex size-[58px] flex-col items-center justify-center rounded-full bg-galaxy-panel">
            <span className="text-[19px] leading-6 font-bold">{solution.score}</span>
            <span className="text-[11px] leading-3 text-galaxy-subtle">/ 10</span>
          </div>
        </div>
        <div className="min-w-0">
          <p className="text-[11px] leading-3 text-galaxy-accent">{solution.scoreLabel}</p>
          <p className="pt-1 text-[15px] leading-5 font-semibold">{solution.title}</p>
        </div>
      </div>

      <dl className="grid grid-cols-2 gap-px overflow-hidden bg-galaxy-line ring-1 ring-galaxy-line">
        {[
          ['Dampak bisnis', solution.impact],
          ['Urgensi', solution.urgency],
          ['Est. upaya', solution.effort],
          ['Keyakinan AI', `${solution.confidence}%`],
        ].map(([label, value]) => (
          <div key={label} className="bg-galaxy-panel px-2.5 py-2">
            <dt className="text-[11px] leading-3 text-galaxy-subtle">{label}</dt>
            <dd className="pt-1 text-[11px] leading-[14px] font-semibold">{value}</dd>
          </div>
        ))}
      </dl>

      <div className="space-y-2">
        {solution.scoreMetrics.map((metric) => (
          <div key={metric.label}>
            <div className="flex justify-between text-[11px] leading-3 text-galaxy-muted">
              <span>{metric.label}</span>
              <span className="font-semibold text-galaxy-text">{metric.value}%</span>
            </div>
            <div className="mt-1 h-[3px] bg-galaxy-track">
              <div className="h-full bg-galaxy-accent" style={{ width: `${metric.value}%` }} />
            </div>
          </div>
        ))}
      </div>

      <Section title="Kata pelanggan">
        <p>{solution.customerSummary}</p>
        <blockquote className="mt-2 border-l-2 border-galaxy-accent bg-galaxy-soft px-2.5 py-1.5 text-galaxy-muted italic">
          {solution.quote}
        </blockquote>
      </Section>

      <Section title="Dugaan penyebab utama">
        <p>{solution.cause}</p>
      </Section>

      <Section title="Saran tindakan">
        <p className="text-[12px] leading-[17px] font-semibold text-galaxy-text">
          {solution.actionTitle}
        </p>
        <p className="pt-1">{solution.actionDescription}</p>
        <div className="mt-2.5 bg-galaxy-positive-soft px-2.5 py-2 ring-1 ring-galaxy-positive/25">
          <p className="text-[11px] leading-3 font-semibold text-galaxy-positive">Target hasil</p>
          <p className="pt-1 text-galaxy-muted">{solution.target}</p>
        </div>
      </Section>
    </div>
  )
}
