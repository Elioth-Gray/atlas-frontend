import { Link } from 'react-router'

import type { Theme } from '@/utils/theme'

import { FEATURES } from '../landingData'
import {
  CONTAINER_CLASS,
  ITEM_TITLE_CLASS,
  LEAD_CLASS,
  PRIMARY_BUTTON_CLASS,
  SECTION_HEAD_CLASS,
} from '../landingStyles'

// Sticky head on the left, real captures of the app scrolling past on the right
export function FeatureStack({ theme }: { theme: Theme }) {
  return (
    <section
      id="fitur"
      aria-labelledby="fitur-title"
      className="scroll-mt-24 border-t border-sheet-rule bg-sheet-2 py-24"
    >
      <div className={`${CONTAINER_CLASS} grid gap-14 lg:grid-cols-12 lg:gap-x-8`}>
        <div className="min-w-0 lg:col-span-5">
          <div className="lg:sticky lg:top-24">
            <h2
              id="fitur-title"
              className={`${SECTION_HEAD_CLASS} lg:text-[clamp(1.75rem,2.4vw,2.25rem)]`}
            >
              Semua yang Anda Butuhkan untuk Memahami Pelanggan
            </h2>
            <p className={`mt-5 ${LEAD_CLASS}`}>
              Kumpulkan feedback, temukan masalah berulang, dan jadikan pengalaman pelanggan dasar
              perbaikan.
            </p>
            <Link to="/signup" className={`mt-8 ${PRIMARY_BUTTON_CLASS}`}>
              Daftar gratis
            </Link>
          </div>
        </div>

        <ol className="flex min-w-0 flex-col gap-16 lg:col-span-7">
          {FEATURES.map(({ title, description, images, alt, isPanel }) => (
            <li key={title} data-reveal>
              <figure data-slot={title} data-kind="product">
                <div className="overflow-hidden border border-sheet-rule bg-sheet">
                  <img
                    src={images[theme]}
                    alt={alt}
                    loading="lazy"
                    className={
                      isPanel ? 'w-full' : 'aspect-[4/3] w-full object-cover object-right-top'
                    }
                  />
                </div>
                <figcaption className="grid gap-3 pt-6 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:gap-x-8">
                  <h3 className={ITEM_TITLE_CLASS}>{title}</h3>
                  <p className="text-[15px] leading-relaxed text-sheet-ink-2">{description}</p>
                </figcaption>
              </figure>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
