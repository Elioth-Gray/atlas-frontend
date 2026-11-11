import { APP_NAME } from '@/constants'

import type { DownloadFormatId } from './buatQrData'
import { BUSINESS, QR_MATRIX } from './buatQrData'
import { BuatQrHeader } from './components/BuatQrHeader'
import { DownloadMenu } from './components/DownloadMenu'
import { PosterPreview } from './components/PosterPreview'
import { QrForm } from './components/QrForm'
import { downloadPoster, downloadQrCode } from './qrDownloads'

export default function BuatQrPage() {
  function handleDownloadQr(format: DownloadFormatId) {
    void downloadQrCode(QR_MATRIX, `atlas-qr-${BUSINESS.slug}`, format).catch((error: unknown) => {
      console.error('Gagal mengunduh QR:', error)
    })
  }

  function handleDownloadPoster(format: DownloadFormatId) {
    void downloadPoster(QR_MATRIX, BUSINESS.name, `atlas-poster-${BUSINESS.slug}`, format).catch(
      (error: unknown) => {
        console.error('Gagal mengunduh poster:', error)
      }
    )
  }

  return (
    <>
      <title>Buat QR — {APP_NAME}</title>

      <div className="flex flex-1 flex-col">
        <BuatQrHeader />

        <main className="w-full flex-1 px-4 pt-[22px] pb-12 sm:px-7">
          <div className="mx-auto w-full max-w-[980px]">
            <DownloadMenu label="Unduh QR" onSelect={handleDownloadQr} />

            <div className="mt-[18px] grid items-start gap-[13px] lg:grid-cols-[minmax(0,1fr)_340px]">
              <QrForm />
              <PosterPreview onDownload={handleDownloadPoster} />
            </div>
          </div>
        </main>
      </div>
    </>
  )
}
