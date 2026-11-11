import type { DownloadFormatId } from './buatQrData'
import { DOWNLOAD_FORMATS } from './buatQrData'
import { canvasToBlob, createCanvas, drawModules, triggerDownload } from './canvasUtils'
import { canvasToPdf } from './pdf'
import { drawPoster, POSTER_HEIGHT, POSTER_WIDTH } from './posterCanvas'
import type { PosterTheme } from './posterTheme'

const QR_COLOR = '#6442DD'
const QUIET_ZONE = 4

function getFormat(format: DownloadFormatId) {
  return DOWNLOAD_FORMATS.find((option) => option.id === format) ?? DOWNLOAD_FORMATS[0]
}

async function exportCanvas(
  canvas: HTMLCanvasElement,
  format: DownloadFormatId,
  fileNameBase: string
) {
  const option = getFormat(format)
  const fileName = `${fileNameBase}.${option.extension}`

  if (format === 'pdf') {
    triggerDownload(await canvasToPdf(canvas), fileName)
    return
  }

  triggerDownload(await canvasToBlob(canvas, option.mimeType, 0.94), fileName)
}

export async function downloadQrCode(
  matrix: string[],
  fileNameBase: string,
  format: DownloadFormatId
) {
  await document.fonts.ready

  const moduleSize = getFormat(format).moduleSize
  const size = (matrix.length + QUIET_ZONE * 2) * moduleSize
  const canvas = createCanvas(size, size)
  const context = canvas.getContext('2d')
  if (!context) throw new Error('Canvas 2D tidak tersedia.')

  context.fillStyle = '#FFFFFF'
  context.fillRect(0, 0, size, size)
  drawModules(context, matrix, 0, 0, size, QR_COLOR, QUIET_ZONE)

  await exportCanvas(canvas, format, fileNameBase)
}

export async function downloadPoster(
  matrix: string[],
  businessName: string,
  fileNameBase: string,
  format: DownloadFormatId,
  theme: PosterTheme
) {
  await document.fonts.ready

  const canvas = createCanvas(POSTER_WIDTH, POSTER_HEIGHT)
  const context = canvas.getContext('2d')
  if (!context) throw new Error('Canvas 2D tidak tersedia.')

  drawPoster(context, matrix, businessName, theme)
  await exportCanvas(canvas, format, fileNameBase)
}
