import { PageHeader } from '@/components/layout/PageHeader'
import { APP_NAME } from '@/constants'
import { useTheme } from '@/hooks/useTheme'

import type { DownloadFormatId } from './buatQrData'
import { BUSINESS, QR_MATRIX } from './buatQrData'
import { DownloadMenu } from './components/DownloadMenu'
import { PosterPreview } from './components/PosterPreview'
import { QrForm } from './components/QrForm'
import { POSTER_THEMES } from './posterTheme'
import { downloadPoster, downloadQrCode } from './qrDownloads'

export default function BuatQrPage() {
  const { theme } = useTheme()
  const posterTheme = POSTER_THEMES[theme]

  function handleDownloadQr(format: DownloadFormatId) {
    void downloadQrCode(QR_MATRIX, `atlas-qr-${BUSINESS.slug}`, format).catch((error: unknown) => {
      console.error('Gagal mengunduh QR:', error)
    })
  }

  function handleDownloadPoster(format: DownloadFormatId) {
    void downloadPoster(
      QR_MATRIX,
      BUSINESS.name,
      `atlas-poster-${BUSINESS.slug}-${theme}`,
      format,
      posterTheme
    ).catch((error: unknown) => {
      console.error('Gagal mengunduh poster:', error)
    })
  }

  return (
    <>
      <title>Buat QR | {APP_NAME}</title>

      <div className="flex flex-1 flex-col">
        <PageHeader title="Buat QR" subtitle="Buat QR feedback untuk bisnismu." />

        <main className="mx-auto w-full max-w-[1600px] flex-1 px-4 pt-[22px] pb-[50px] sm:px-7">
          <div className="grid items-start gap-3 lg:grid-cols-[minmax(0,1fr)_340px]">
            <div className="flex flex-col gap-3">
              <QrForm />
              <div className="flex justify-start">
                <DownloadMenu label="Unduh QR" onSelect={handleDownloadQr} />
              </div>
            </div>
            <PosterPreview theme={posterTheme} onDownload={handleDownloadPoster} />
          </div>
        </main>
      </div>
    </>
  )
}
