import { lazy, Suspense } from 'react'

import type { Theme } from '@/utils/theme'

import { GALAXY_FACTS } from '../landingData'
import { CONTAINER_CLASS, LEAD_CLASS } from '../landingStyles'

// three.js is heavy, so the galaxy loads in its own chunk when this section's code runs
const FeedbackGalaxy = lazy(() =>
  import('@/pages/FeedbackGroup/components/FeedbackGalaxy').then((module) => ({
    default: module.FeedbackGalaxy,
  }))
)

export function GalaxyStatement({ theme }: { theme: Theme }) {
  return (
    <section
      id="galaxy"
      aria-labelledby="galaxy-title"
      className="scroll-mt-24 border-t border-sheet-rule py-24"
    >
      <div className={CONTAINER_CLASS}>
        <h2
          data-reveal
          id="galaxy-title"
          className="max-w-[16ch] min-w-0 font-display text-[clamp(2.25rem,4.4vw,4.25rem)] leading-[1.02] font-normal break-words text-sheet-ink uppercase"
        >
          Lihat Gambaran Utuh di Balik Setiap Ulasan
        </h2>

        <figure className="mt-12" data-kind="product" data-reveal>
          <div className="relative h-[380px] border border-sheet-rule sm:h-[480px] lg:h-[560px]">
            <Suspense fallback={<div className="absolute inset-0 bg-sheet-2" />}>
              <FeedbackGalaxy
                zoom={1}
                isFullscreen={false}
                theme={theme}
                label="Feedback Galaxy dengan data contoh: tiap planet satu kelompok masalah, planet besar berarti prioritas lebih tinggi."
                className="absolute inset-0 bg-sheet"
                isInteractive={false}
              />
            </Suspense>
          </div>
          <figcaption className="pt-3 text-sm text-sheet-muted">
            Galaxy View dari aplikasi ATLAS, dengan data contoh.
          </figcaption>
        </figure>

        <div
          data-reveal
          className="mt-12 grid gap-10 border-t border-sheet-ink-2 pt-10 lg:grid-cols-12 lg:gap-x-8"
        >
          <p className={`${LEAD_CLASS} lg:col-span-5`}>
            Feedback bukan sekadar komentar. ATLAS menghubungkan feedback yang tersebar menjadi
            insight agar Anda tahu apa yang perlu diperhatikan.
          </p>

          <ul className="border-t border-sheet-rule lg:col-span-6 lg:col-start-7">
            {GALAXY_FACTS.map((fact) => (
              <li
                key={fact}
                className="border-b border-sheet-rule py-4 text-[15px] leading-relaxed text-sheet-ink"
              >
                {fact}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
