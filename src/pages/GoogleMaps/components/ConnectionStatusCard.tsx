import { Card } from '@/components/ui/Card'

import { GOOGLE_MAPS_CONNECTION } from '../googleMapsData'

interface ConnectionStatusCardProps {
  lastSynced: string
}

export function ConnectionStatusCard({ lastSynced }: ConnectionStatusCardProps) {
  return (
    <Card label="Status koneksi Google Maps" className="relative overflow-hidden p-[22px]">
      <div className="relative">
        <div className="relative flex size-[72px] items-center justify-center border border-border bg-surface shadow-card">
          <svg aria-hidden="true" viewBox="0 0 24 24" className="size-9">
            <path
              d="M12 2.25c-4.28 0-7.75 3.47-7.75 7.75 0 5.56 7.75 11.75 7.75 11.75s7.75-6.19 7.75-11.75c0-4.28-3.47-7.75-7.75-7.75Z"
              fill="#EA4335"
            />
            <circle cx="12" cy="10" r="2.9" fill="white" />
          </svg>
          <span className="absolute right-0 bottom-0 size-[13px] rounded-full border-[3px] border-surface bg-accent" />
        </div>

        <h2 className="pt-[9px] text-[15px] leading-[22.5px] font-bold text-heading">
          {GOOGLE_MAPS_CONNECTION.businessName} sudah terhubung
        </h2>
        <p className="max-w-[680px] text-[11px] leading-3 text-body">
          {GOOGLE_MAPS_CONNECTION.description}
        </p>

        <dl className="mt-[15px] flex flex-wrap gap-x-[35px] gap-y-3">
          <div>
            <dt className="text-[11px] leading-3 text-body">Sinkronisasi terakhir</dt>
            <dd className="pt-[3px] text-[11px] leading-[13.5px] font-bold text-heading">
              {lastSynced}
            </dd>
          </div>
          <div>
            <dt className="text-[11px] leading-3 text-body">Ulasan diimpor</dt>
            <dd className="pt-[3px] text-[11px] leading-[13.5px] font-bold text-heading">
              {GOOGLE_MAPS_CONNECTION.importedReviews}
            </dd>
          </div>
          <div>
            <dt className="text-[11px] leading-3 text-body">Rating rata-rata</dt>
            <dd className="pt-[3px] text-[11px] leading-[13.5px] font-bold text-heading">
              {GOOGLE_MAPS_CONNECTION.averageRating} ★
            </dd>
          </div>
        </dl>
      </div>
    </Card>
  )
}
