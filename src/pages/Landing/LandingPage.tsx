import './landing.css'

import { useRef } from 'react'

import { StarrySky } from '@/components/decor/StarrySky'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'
import { cn } from '@/utils/cn'

import { ClosingBand } from './components/ClosingBand'
import { FaqSection } from './components/FaqSection'
import { FeatureStack } from './components/FeatureStack'
import { GalaxyStatement } from './components/GalaxyStatement'
import { LandingFooter } from './components/LandingFooter'
import { LandingHeader } from './components/LandingHeader'
import { LandingHero } from './components/LandingHero'
import { StepsRecord } from './components/StepsRecord'
import { useLandingTheme } from './hooks/useLandingTheme'
import { useReveal } from './hooks/useReveal'
import { CONTAINER_CLASS, SECTION_HEAD_CLASS } from './landingStyles'

// The landing opens on the dark Manifesto sheet; the header toggle switches it to daylight.
// data-theme on the root carries the sheet and galaxy tokens for whichever theme is on
export default function LandingPage() {
  useDocumentTitle('ATLAS: Feedback Pelanggan Jadi Insight Bisnis')
  const rootRef = useRef<HTMLDivElement>(null)
  useReveal(rootRef)
  const { theme, toggleTheme } = useLandingTheme()

  return (
    <div
      ref={rootRef}
      data-theme={theme}
      className={cn(
        'landing min-h-svh bg-sheet font-sans text-base text-sheet-ink-2 transition-colors duration-300 motion-reduce:transition-none',
        theme === 'dark' && 'dark'
      )}
    >
      <StarrySky />

      <a
        href="#konten"
        className="sr-only z-[60] bg-sheet-signal px-4 py-2 text-sm font-semibold text-sheet-signal-ink focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
      >
        Lewati ke konten
      </a>

      <LandingHeader theme={theme} onToggleTheme={toggleTheme} />

      <main id="konten">
        <LandingHero />
        <StepsRecord />
        <FeatureStack theme={theme} />
        <GalaxyStatement theme={theme} />

        <section
          id="faq"
          aria-labelledby="faq-title"
          className="scroll-mt-24 border-t border-sheet-rule py-24"
        >
          <div data-reveal className={`${CONTAINER_CLASS} grid gap-12 lg:grid-cols-12 lg:gap-x-8`}>
            <div className="lg:col-span-4">
              <h2 id="faq-title" className={SECTION_HEAD_CLASS}>
                Pertanyaan yang Sering Diajukan
              </h2>
              <p className="mt-4 max-w-[40ch] text-[15px] leading-relaxed text-sheet-ink-2">
                Hal yang perlu Anda tahu sebelum mulai memakai ATLAS.
              </p>
            </div>
            <div className="min-w-0 lg:col-span-8">
              <FaqSection />
            </div>
          </div>
        </section>

        <ClosingBand />
      </main>

      <LandingFooter theme={theme} />
    </div>
  )
}
