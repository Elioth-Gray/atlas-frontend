import { STEPS } from '../landingData'
import { CONTAINER_CLASS, ITEM_TITLE_CLASS, LEAD_CLASS, SECTION_HEAD_CLASS } from '../landingStyles'

// The record: each step a full-width row under a hairline, its numeral drawn from the list
export function StepsRecord() {
  return (
    <section
      id="cara-kerja"
      aria-labelledby="cara-kerja-title"
      className="scroll-mt-24 border-t border-sheet-rule py-24"
    >
      <div className={CONTAINER_CLASS}>
        <div data-reveal className="grid gap-6 lg:grid-cols-12 lg:items-end lg:gap-x-8">
          <h2 id="cara-kerja-title" className={`${SECTION_HEAD_CLASS} lg:col-span-7`}>
            Dari Feedback Pelanggan ke Perbaikan Bisnis
          </h2>
          <p className={`${LEAD_CLASS} lg:col-span-5`}>
            ATLAS membantu UMKM mengumpulkan ulasan, menemukan masalah berulang, dan menentukan
            perbaikan lewat analisis AI.
          </p>
        </div>

        <ol className="landing-record mt-12 border-t border-sheet-rule">
          {STEPS.map(({ title, description }) => (
            <li
              key={title}
              data-reveal
              className="grid grid-cols-[3.5rem_minmax(0,1fr)] items-baseline gap-x-6 gap-y-2 border-b border-sheet-rule py-6 md:grid-cols-[4.5rem_minmax(0,6fr)_minmax(0,5fr)] md:gap-x-8"
            >
              <h3 className={ITEM_TITLE_CLASS}>{title}</h3>
              <p className="col-start-2 max-w-[48ch] text-[15px] leading-relaxed text-sheet-ink-2 md:col-start-3">
                {description}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
