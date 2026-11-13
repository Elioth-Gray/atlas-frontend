import { useMemo } from 'react'
import { toast } from 'sonner'

import { PageHeader } from '@/components/layout/PageHeader'
import { APP_NAME } from '@/constants'
import { useAuth } from '@/contexts/AuthContext'
import { useMyShopDetail } from '@/hooks/data/useOwnerShops'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'
import { useTheme } from '@/hooks/useTheme'

import { DownloadMenu } from './components/DownloadMenu'
import { PosterPreview } from './components/PosterPreview'
import { QrForm } from './components/QrForm'
import type { BusinessProfile, DownloadFormatId } from './createQrData'
import { BUSINESS, encodeQrMatrix } from './createQrData'
import { POSTER_THEMES } from './posterTheme'
import { downloadPoster, downloadQrCode } from './qrDownloads'

export default function CreateQrPage() {
  useDocumentTitle(`Buat QR | ${APP_NAME}`)
  const { theme } = useTheme()
  const { activeShop, activeShopId, isAuthenticated } = useAuth()
  const { data: shopDetail } = useMyShopDetail(activeShopId, isAuthenticated)
  const posterTheme = POSTER_THEMES[theme]

  const shop = shopDetail?.shop ?? activeShop

  const business = useMemo<BusinessProfile>(() => {
    if (!shop) return BUSINESS
    const origin = typeof window !== 'undefined' ? window.location.origin : 'https://atlas.feedback'
    const host = typeof window !== 'undefined' ? window.location.host : 'atlas.feedback'
    const slug =
      shop.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '') || shop.id.slice(0, 8)
    return {
      name: shop.name,
      slug,
      feedbackUrl: `${origin}/feedback/${shop.id}`,
      publicPath: `${host}/feedback/${shop.id}`,
    }
  }, [shop])

  const qrMatrix = useMemo(() => encodeQrMatrix(business.feedbackUrl), [business.feedbackUrl])

  function handleDownloadQr(format: DownloadFormatId) {
    void downloadQrCode(qrMatrix, `atlas-qr-${business.slug}`, format)
      .then(() => {
        toast.success(`Kode QR (${format.toUpperCase()}) berhasil diunduh.`)
      })
      .catch((error: unknown) => {
        console.error('Gagal mengunduh QR:', error)
        toast.error('Gagal mengunduh kode QR.')
      })
  }

  function handleDownloadPoster(format: DownloadFormatId) {
    void downloadPoster(
      qrMatrix,
      business.name,
      `atlas-poster-${business.slug}-${theme}`,
      format,
      posterTheme
    )
      .then(() => {
        toast.success(`Poster QR (${format.toUpperCase()}) berhasil diunduh.`)
      })
      .catch((error: unknown) => {
        console.error('Gagal mengunduh poster:', error)
        toast.error('Gagal mengunduh poster QR.')
      })
  }

  return (
    <div className="flex flex-1 flex-col">
      <PageHeader title="Buat QR" subtitle="Buat QR feedback untuk bisnismu." />

      <main className="mx-auto w-full max-w-[1600px] flex-1 px-4 pt-[22px] pb-[50px] sm:px-7">
        <div className="grid items-start gap-3 lg:grid-cols-[minmax(0,1fr)_340px]">
          <div className="flex flex-col gap-3">
            <QrForm business={business} />
            <div className="flex justify-start">
              <DownloadMenu label="Unduh QR" onSelect={handleDownloadQr} />
            </div>
          </div>
          <PosterPreview
            theme={posterTheme}
            business={business}
            matrix={qrMatrix}
            onDownload={handleDownloadPoster}
          />
        </div>
      </main>
    </div>
  )
}
