import { RefreshCw } from 'lucide-react'
import { useEffect, useState } from 'react'

import { PageHeader } from '@/components/layout/PageHeader'
import { APP_NAME } from '@/constants'
import { cn } from '@/utils/cn'

import { ConnectGoogleMapsCard } from './components/ConnectGoogleMapsCard'
import { ConnectionStatusCard } from './components/ConnectionStatusCard'
import { ImportedReviews } from './components/ImportedReviews'
import { GOOGLE_MAPS_CONNECTION } from './googleMapsData'

type ConnectionStatus = 'disconnected' | 'connecting' | 'connected' | 'syncing'

export default function GoogleMapsPage() {
  const [status, setStatus] = useState<ConnectionStatus>('disconnected')
  const [lastSynced, setLastSynced] = useState(GOOGLE_MAPS_CONNECTION.lastSynced)

  useEffect(() => {
    if (status !== 'connecting' && status !== 'syncing') return

    const timeout = window.setTimeout(() => {
      setLastSynced('Baru saja')
      setStatus('connected')
    }, 900)

    return () => window.clearTimeout(timeout)
  }, [status])

  const isConnected = status === 'connected' || status === 'syncing'

  return (
    <>
      <title>Google Maps — {APP_NAME}</title>

      <div className="flex flex-1 flex-col">
        <PageHeader
          title={isConnected ? 'Ulasan Google Maps' : 'Hubungkan Akun Google Maps'}
          subtitle={
            isConnected
              ? 'Pantau dan sinkronkan ulasan publik bisnismu.'
              : 'Kumpulkan semua ulasan publik dalam satu tampilan.'
          }
        />

        <main className="mx-auto w-full max-w-[1600px] flex-1 px-4 pt-[22px] pb-[50px] sm:px-7">
          <div>
            {isConnected ? (
              <>
                <button
                  type="button"
                  onClick={() => setStatus('syncing')}
                  disabled={status === 'syncing'}
                  className="flex h-[37px] items-center justify-center gap-[7px] rounded-[9px] bg-linear-to-br from-[#9172FF] to-[#7048E5] px-3.5 text-[10px] font-semibold text-white shadow-card transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary disabled:cursor-wait disabled:opacity-80"
                >
                  <RefreshCw
                    aria-hidden="true"
                    className={cn('size-3.5', status === 'syncing' && 'animate-spin')}
                    strokeWidth={2}
                  />
                  {status === 'syncing' ? 'Menyinkronkan...' : 'Sinkronkan ulasan'}
                </button>

                <div className="mt-[18px] flex flex-col gap-3">
                  <ConnectionStatusCard lastSynced={lastSynced} />
                  <ImportedReviews />
                </div>
              </>
            ) : (
              <ConnectGoogleMapsCard
                isConnecting={status === 'connecting'}
                onConnect={() => setStatus('connecting')}
              />
            )}
          </div>
        </main>
      </div>
    </>
  )
}
