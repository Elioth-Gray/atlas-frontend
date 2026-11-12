import { Link } from 'react-router'

import { CONTAINER_CLASS, PRIMARY_BUTTON_CLASS } from '../landingStyles'

const HERO_TERMS = ['Gratis untuk mulai', 'Tanpa kartu kredit', 'Siap dalam 5 menit']

// A poster: the creed set wide in the middle of the first screen, an orbit turning behind it
export function LandingHero() {
  return (
    <section
      id="beranda"
      aria-labelledby="hero-title"
      className="relative scroll-mt-24 overflow-hidden"
    >
      {/* Two orbits in hairline behind the creed, planets riding them */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute top-[4%] right-[-14%] h-[78%] w-[74%] rotate-[-14deg] rounded-[50%] border border-sheet-rule" />
        <div className="landing-orbit absolute top-[18%] right-[2%] h-[50%] w-[50%] rounded-[50%] border border-dashed border-sheet-rule" />
        <span className="landing-float absolute top-[11%] right-[34%] size-3 rounded-full bg-sheet-signal-text" />
        <span className="landing-float landing-float--slow absolute top-[62%] right-[8%] size-2 rounded-full bg-sheet-ink-2" />
      </div>
      <div
        className={`${CONTAINER_CLASS} relative flex min-h-[calc(100svh-4rem)] flex-col justify-center gap-8 pt-10 pb-20`}
      >
        <div className="@container min-w-0">
          <h1
            id="hero-title"
            className="min-w-0 animate-wipe font-display text-[8.6cqi] leading-[0.9] font-normal break-words text-sheet-ink uppercase"
          >
            <span className="block whitespace-nowrap">Satu Suara Kecil.</span>{' '}
            <span className="block whitespace-nowrap">
              <span className="text-sheet-signal-text">Sejuta</span> Makna Besar.
            </span>{' '}
            <span className="block whitespace-nowrap">Awal Sebuah Cerita.</span>
          </h1>
        </div>

        <div className="grid gap-6 border-t border-sheet-rule pt-6 lg:grid-cols-12 lg:items-center lg:gap-x-8">
          <p className="text-base leading-snug text-sheet-ink-2 sm:text-[17px] lg:col-span-6">
            Ubah feedback pelanggan menjadi insight bisnis.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-6 lg:col-span-6 lg:justify-end">
            <ul className="flex flex-wrap gap-x-5 gap-y-1 text-sm text-sheet-muted sm:order-1 lg:order-none">
              {HERO_TERMS.map((term) => (
                <li key={term}>{term}</li>
              ))}
            </ul>
            <Link to="/signup" className={`self-start sm:self-auto ${PRIMARY_BUTTON_CLASS}`}>
              Mulai Gratis
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
