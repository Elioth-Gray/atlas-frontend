import { Link } from 'react-router'

import { CONTAINER_CLASS } from '../landingStyles'

const BAND_BUTTON =
  'inline-flex h-10 items-center justify-center whitespace-nowrap px-5 text-sm font-semibold transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sheet-signal-ink active:translate-y-px disabled:cursor-not-allowed disabled:opacity-60'

// The page's one violet field: the hero's action again, as the sign-up anatomy closes
export function ClosingBand() {
  return (
    <section aria-labelledby="penutup-title" className="bg-sheet-signal py-20">
      <div
        data-reveal
        className={`${CONTAINER_CLASS} grid gap-10 lg:grid-cols-12 lg:items-end lg:gap-x-8`}
      >
        <h2
          id="penutup-title"
          className="min-w-0 font-display text-[clamp(1.875rem,3.4vw,3rem)] leading-[1.02] font-normal text-balance break-words text-sheet-signal-ink uppercase lg:col-span-8"
        >
          Pelanggan Anda Bercerita. Dengarkan Lebih Cerdas.
        </h2>

        <div className="lg:col-span-4">
          <p className="text-[15px] leading-relaxed text-sheet-signal-ink">
            Ambil keputusan lebih baik dengan memahami pengalaman nyata pelanggan.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              to="/signup"
              className={`${BAND_BUTTON} bg-sheet text-sheet-ink hover:bg-sheet-3`}
            >
              Mulai dengan ATLAS
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
