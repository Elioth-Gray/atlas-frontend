import { useRef } from 'react'

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
      <p className="text-center text-[11px] leading-4 font-semibold text-body">Preview poster</p>

      <div className="mt-3.5 flex justify-center">
        <figure>
          <figcaption className="sr-only">Pratinjau poster QR feedback {BUSINESS.name}</figcaption>
          <div
            ref={posterRef}
            className="relative flex h-[410px] w-[280px] max-w-full flex-col overflow-hidden border border-border p-[22px]"
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
              <img
                src={theme.logoSrc}
                alt=""
                width={64}
                height={64}
                className="size-[29.64px] shrink-0 object-contain"
              />
              <span
                className="wordmark font-display text-[15px] leading-none font-normal tracking-[0.6px]"
                style={{ color: theme.brandText }}
              >
                ATLAS
              </span>
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
                className="relative mt-2 overflow-hidden p-[14px]"
                style={{ backgroundColor: theme.qrBox }}
              >
                <span
                  data-reveal="scan"
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-0 top-0 z-10 h-[3px] bg-white opacity-0 shadow-scanline"
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
                className="mt-[10px] text-center text-[10px] leading-none"
                style={{ color: theme.body }}
              >
                Scan untuk kasih feedback
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
