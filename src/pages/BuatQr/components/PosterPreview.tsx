import { BrandMark } from '@/components/layout/BrandMark'
import { Card } from '@/components/ui/Card'

import type { DownloadFormatId } from '../buatQrData'
import { BUSINESS, QR_MATRIX } from '../buatQrData'
import { DownloadMenu } from './DownloadMenu'
import { QrCode } from './QrCode'

interface PosterPreviewProps {
  onDownload: (format: DownloadFormatId) => void
}

export function PosterPreview({ onDownload }: PosterPreviewProps) {
  return (
    <Card className="p-5" label="Preview poster">
      <p className="text-center text-[10px] leading-[10.5px] font-semibold tracking-[1.4px] text-body">
        PREVIEW POSTER
      </p>

      <div className="mt-3.5 flex justify-center">
        <figure>
          <figcaption className="sr-only">Pratinjau poster QR feedback {BUSINESS.name}</figcaption>
          <div
            className="relative flex h-[410px] w-[280px] max-w-full flex-col overflow-hidden rounded-[18px] border border-border bg-white p-[22px]"
            style={{
              backgroundImage:
                'radial-gradient(ellipse 92.79% 135.87% at 80% 25%, rgba(130, 97, 255, 0.40) 0%, rgba(130, 97, 255, 0) 32%)',
            }}
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute top-[158px] left-[-25px] h-[140px] w-[300px] origin-top-left rotate-[-24deg] rounded-[102px] border border-[#8261FF]/25"
            />

            <div className="absolute top-[27px] left-[22px] z-20 flex items-center gap-[8.6px]">
              <BrandMark className="size-[29.64px] shrink-0 overflow-visible" />
              <div className="flex flex-col">
                <span className="text-[12.48px] leading-[18.72px] font-bold tracking-[2.34px] text-muted-foreground">
                  ATLAS
                </span>
                <span className="text-[8px] leading-[10px] tracking-[1.29px] text-muted-foreground">
                  SISTEM INSIGHT AI
                </span>
              </div>
            </div>

            <div className="relative z-10 flex min-h-0 flex-1 flex-col items-center">
              <div aria-hidden="true" className="h-[44px] w-[131px] shrink-0" />

              <div className="w-[210px] pt-[26px] pb-1.5 text-center">
                <h3 className="text-[20px] leading-[25px] font-normal text-heading">
                  Gimana
                  <br />
                  pengalamanmu?
                </h3>
              </div>

              <p className="text-center text-[10px] leading-[15px] text-body">
                Scan untuk kasih feedback.
                <br />
                Cuma butuh semenit.
              </p>

              <div className="mt-2 rounded-[12px] bg-[#6442DD] p-[14px]">
                <QrCode
                  matrix={QR_MATRIX}
                  label={`Kode QR feedback ${BUSINESS.name}`}
                  className="size-[116px] text-white"
                />
              </div>

              <p className="mt-[10px] text-center text-[10px] leading-none tracking-[0.7px] text-body">
                SCAN UNTUK KASIH FEEDBACK
              </p>

              <p className="mt-auto pb-0.5 text-center text-[10px] leading-none font-bold text-body">
                {BUSINESS.name}
              </p>
            </div>
          </div>
        </figure>
      </div>

      <div className="mt-3.5 flex justify-center">
        <DownloadMenu label="Unduh poster" onSelect={onDownload} />
      </div>
    </Card>
  )
}
