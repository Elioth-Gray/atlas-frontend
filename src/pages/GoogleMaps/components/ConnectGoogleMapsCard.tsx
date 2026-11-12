import { Link2, LoaderCircle } from 'lucide-react'

import { Card } from '@/components/ui/Card'

interface ConnectGoogleMapsCardProps {
  isConnecting: boolean
  onConnect: () => void
}

export function ConnectGoogleMapsCard({ isConnecting, onConnect }: ConnectGoogleMapsCardProps) {
  return (
    <Card label="Sambungkan akun Google Maps" className="relative overflow-hidden p-[22px]">
      <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center">
        <div className="relative flex size-[72px] shrink-0 items-center justify-center border border-border bg-surface shadow-card">
          <svg aria-hidden="true" viewBox="0 0 24 24" className="size-9">
            <path
              d="M12 2.25c-4.28 0-7.75 3.47-7.75 7.75 0 5.56 7.75 11.75 7.75 11.75s7.75-6.19 7.75-11.75c0-4.28-3.47-7.75-7.75-7.75Z"
              fill="#EA4335"
            />
            <circle cx="12" cy="10" r="2.9" fill="white" />
          </svg>
          <span className="absolute right-0 bottom-0 size-[13px] rounded-full border-[3px] border-surface bg-warning" />
        </div>

        <div className="min-w-0 flex-1">
          <h2 className="text-[15px] leading-[19px] font-bold text-heading">
            Sambungkan akun Google Maps
          </h2>
          <p className="pt-0.5 text-[11px] leading-4 text-muted-foreground">Belum tersambung</p>
          <p className="max-w-[620px] pt-1 text-[11px] leading-[16px] text-body">
            Hubungkan profil Google Business milikmu agar ATLAS bisa mengimpor ulasan publik dan
            menggabungkannya dengan feedback langsung dari pelanggan.
          </p>
        </div>

        <button
          type="button"
          onClick={onConnect}
          disabled={isConnecting}
          className="flex h-[37px] shrink-0 items-center justify-center gap-[7px] bg-primary px-3.5 text-[11px] font-semibold text-white shadow-card transition-opacity hover:bg-primary-hover hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary disabled:cursor-wait disabled:opacity-80"
        >
          {isConnecting ? (
            <LoaderCircle aria-hidden="true" className="size-3.5 animate-spin" strokeWidth={2} />
          ) : (
            <Link2 aria-hidden="true" className="size-3.5" strokeWidth={2} />
          )}
          {isConnecting ? 'Menyambungkan...' : 'Sambungkan Google Maps'}
        </button>
      </div>
    </Card>
  )
}
