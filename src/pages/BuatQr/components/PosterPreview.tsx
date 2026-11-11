import { useRef } from 'react'

import { BrandMark } from '@/components/layout/BrandMark'
import { Card } from '@/components/ui/Card'

import type { DownloadFormatId } from '../buatQrData'
import { BUSINESS, QR_MATRIX } from '../buatQrData'
import type { PosterTheme } from '../posterTheme'
import { usePosterReveal } from '../usePosterReveal'
import { DownloadMenu } from './DownloadMenu'
import { QrCode } from './QrCode'

interface PosterPreviewProps {
  theme: PosterTheme
  onDownload: (format: DownloadFormatId) => void
}

export function PosterPreview({ theme, onDownload }: PosterPreviewProps) {
  const posterRef = useRef<HTMLDivElement>(null)
  usePosterReveal(posterRef, theme.background)

  return (
    <Card className="p-5" label="Preview poster">
      <p className="text-center text-[10px] leading-[10.5px] font-semibold tracking-[1.4px] text-body">
        PREVIEW POSTER
      </p>

      <div className="mt-3.5 flex justify-center">
        <figure>
          <figcaption className="sr-only">Pratinjau poster QR feedback {BUSINESS.name}</figcaption>
          <div
            ref={posterRef}
            className="relative flex h-[410px] w-[280px] max-w-full flex-col overflow-hidden rounded-[18px] border border-border p-[22px]"
            style={{
              backgroundColor: theme.background,
              backgroundImage: `radial-gradient(ellipse 92.79% 135.87% at 80% 25%, ${theme.glow} 0%, rgba(130, 97, 255, 0) 32%)`,
            }}
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute top-[158px] left-[-25px] h-[140px] w-[300px] origin-top-left rotate-[-24deg] rounded-[102px] border"
              style={{ borderColor: theme.orbit }}
            />

            <div
              data-reveal="item"
              className="absolute top-[27px] left-[22px] z-20 flex items-center gap-[8.6px]"
            >
              <BrandMark className="size-[29.64px] shrink-0 overflow-visible" />
              <div className="flex flex-col" style={{ color: theme.brandText }}>
                <span className="text-[12.48px] leading-[18.72px] font-bold tracking-[2.34px]">
                  ATLAS
                </span>
                <span className="text-[8px] leading-[10px] tracking-[1.29px]">
                  SISTEM INSIGHT AI
                </span>
              </div>
            </div>

            <div className="relative z-10 flex min-h-0 flex-1 flex-col items-center">
              <div aria-hidden="true" className="h-[44px] w-[131px] shrink-0" />

              <div data-reveal="item" className="w-[210px] pt-[26px] pb-1.5 text-center">
                <h3
                  className="text-[20px] leading-[25px] font-normal"
                  style={{ color: theme.heading }}
                >
                  Gimana
                  <br />
                  pengalamanmu?
                </h3>
              </div>

              <p
                data-reveal="item"
                className="text-center text-[10px] leading-[15px]"
                style={{ color: theme.body }}
              >
                Scan untuk kasih feedback.
                <br />
                Cuma butuh semenit.
              </p>

              <div
                data-reveal="qr-box"
                className="relative mt-2 overflow-hidden rounded-[12px] p-[14px]"
                style={{ backgroundColor: theme.qrBox }}
              >
                <span
                  data-reveal="scan"
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-0 top-0 z-10 h-[3px] bg-white opacity-0 shadow-[0_0_14px_4px_rgba(201,184,255,0.85)]"
                />
                <QrCode
                  matrix={QR_MATRIX}
                  label={`Kode QR feedback ${BUSINESS.name}`}
                  className="size-[116px]"
                  style={{ color: theme.qrModules }}
                />
              </div>

              <p
                data-reveal="item"
                className="mt-[10px] text-center text-[10px] leading-none tracking-[0.7px]"
                style={{ color: theme.body }}
              >
                SCAN UNTUK KASIH FEEDBACK
              </p>

              <p
                data-reveal="item"
                className="mt-auto pb-0.5 text-center text-[10px] leading-none font-bold"
                style={{ color: theme.body }}
              >
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
