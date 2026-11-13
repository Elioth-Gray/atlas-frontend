import gsap from 'gsap'
import { BarChart2, FileText, Lightbulb, ListChecks, Quote } from 'lucide-react'
import { useEffect, useRef } from 'react'

import type { References, Solution } from '@/typings/api'

function formatReferenceBasis(
  references?: References,
  defaultText = 'opini pelanggan terkait'
): string {
  if (!references) return defaultText
  const parts: string[] = []
  if (references.opinion_ids.length > 0) {
    parts.push('bukti pelanggan')
  }
  if (references.owner_message_ids.length > 0) {
    parts.push('jawaban owner')
  }
  if (references.memory_ids.length > 0) {
    parts.push('memori bisnis')
  }
  return parts.length > 0 ? parts.join(' + ') : defaultText
}

export function GroundedSolutionView({ solution }: { solution: Solution }) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const sections = el.querySelectorAll<HTMLElement>('[data-solution-section]')
    if (sections.length === 0) return

    gsap.fromTo(
      sections,
      { opacity: 0, y: 18, scale: 0.98 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.42,
        stagger: 0.075,
        ease: 'power3.out',
        clearProps: 'transform,opacity',
      }
    )
  }, [solution])

  return (
    <div
      ref={containerRef}
      className="flex flex-col gap-4 text-[11px] leading-[16px] text-galaxy-muted"
    >
      {/* 1. Temuan */}
      {solution.findings.length > 0 && (
        <div data-solution-section>
          <h3 className="flex items-center gap-1.5 text-[12px] font-semibold text-galaxy-text">
            <FileText aria-hidden="true" className="size-3.5 text-galaxy-subtle" />
            <span>1. Temuan</span>
          </h3>
          <div className="mt-2 space-y-2">
            {solution.findings.map((finding, index) => (
              <div key={index}>
                <p className="text-galaxy-text">{finding.statement}</p>
                <p className="mt-1 text-[10px] text-galaxy-subtle">
                  Referensi: {formatReferenceBasis(finding.references, 'opini pelanggan terkait')}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 2. Bukti pelanggan */}
      {solution.customer_evidence.length > 0 && (
        <div data-solution-section>
          <h3 className="flex items-center gap-1.5 text-[12px] font-semibold text-galaxy-text">
            <Quote aria-hidden="true" className="size-3.5 text-galaxy-subtle" />
            <span>2. Bukti pelanggan</span>
          </h3>
          <div className="mt-2 space-y-2">
            {solution.customer_evidence.map((item) => (
              <div
                key={item.opinion_id}
                className="rounded-md bg-galaxy-soft/70 p-2.5 ring-1 ring-galaxy-line"
              >
                <blockquote className="font-medium text-galaxy-text italic">
                  “{item.quote}”
                </blockquote>
                <p className="mt-1 text-[10px] text-galaxy-subtle">
                  {item.note || 'Terhubung ke opinion_id sumber'}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 3. Hipotesis penyebab */}
      {solution.hypotheses.length > 0 && (
        <div data-solution-section>
          <h3 className="flex items-center gap-1.5 text-[12px] font-semibold text-galaxy-text">
            <Lightbulb aria-hidden="true" className="size-3.5 text-galaxy-subtle" />
            <span>3. Hipotesis penyebab</span>
          </h3>
          <div className="mt-2 space-y-2.5">
            {solution.hypotheses.map((hyp, index) => (
              <div key={index}>
                <p className="text-galaxy-text">{hyp.statement}</p>
                <p className="mt-1 text-[10px] text-galaxy-subtle">
                  Hipotesis · Belum terverifikasi sebagai penyebab pasti
                </p>
                <p className="mt-0.5 text-[10px] text-galaxy-subtle">
                  Dasar: {formatReferenceBasis(hyp.references, 'bukti pelanggan + jawaban owner')}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 4. Rekomendasi */}
      {solution.recommendations.length > 0 && (
        <div data-solution-section>
          <h3 className="flex items-center gap-1.5 text-[12px] font-semibold text-galaxy-text">
            <ListChecks aria-hidden="true" className="size-3.5 text-galaxy-subtle" />
            <span>4. Rekomendasi</span>
          </h3>
          <div className="mt-2 space-y-2.5">
            {solution.recommendations.map((rec, index) => (
              <div key={index} className="rounded-md bg-galaxy-soft/70 p-3 ring-1 ring-galaxy-line">
                <p className="text-[12px] font-semibold text-galaxy-text">{rec.title}</p>
                <p className="mt-1.5 text-galaxy-muted">{rec.description}</p>
                <p className="mt-2 text-[10px] text-galaxy-subtle">
                  Prioritas: {rec.priority || 'menyesuaikan penilaian AI, bukan skor numerik'}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 5. Indikator keberhasilan */}
      {solution.success_indicators.length > 0 && (
        <div data-solution-section>
          <h3 className="flex items-center gap-1.5 text-[12px] font-semibold text-galaxy-text">
            <BarChart2 aria-hidden="true" className="size-3.5 text-galaxy-subtle" />
            <span>5. Indikator keberhasilan</span>
          </h3>
          <div className="mt-2 space-y-2">
            {solution.success_indicators.map((ind, index) => (
              <div key={index} className="space-y-1 text-galaxy-text">
                <p>
                  <span className="font-semibold">Metrik:</span> {ind.metric}
                </p>
                <p>
                  <span className="font-semibold">Target:</span> {ind.target}
                </p>
                <p>
                  <span className="font-semibold">Waktu evaluasi:</span> {ind.timeframe}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
