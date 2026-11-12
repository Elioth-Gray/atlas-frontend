import { drawModules } from './canvasUtils'
import type { PosterTheme } from './posterTheme'

export const POSTER_WIDTH = 560
export const POSTER_HEIGHT = 820

function drawTrackedText(
  context: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  spacing: number
) {
  let cursor = x

  for (const character of text) {
    context.fillText(character, cursor, y)
    cursor += context.measureText(character).width + spacing
  }
}

function drawCenteredTrackedText(
  context: CanvasRenderingContext2D,
  text: string,
  centerX: number,
  y: number,
  spacing: number
) {
  const widths = [...text].map((character) => context.measureText(character).width)
  const total = widths.reduce((sum, width) => sum + width, 0) + spacing * (text.length - 1)

  context.textAlign = 'left'
  drawTrackedText(context, text, centerX - total / 2, y, spacing)
  context.textAlign = 'center'
}

const posterLogos = new Map<string, Promise<HTMLImageElement>>()

function loadPosterLogo(src: string) {
  let logo = posterLogos.get(src)
  if (!logo) {
    logo = new Promise((resolve, reject) => {
      const image = new Image()
      image.onload = () => resolve(image)
      image.onerror = () => reject(new Error('Gagal memuat logo ATLAS.'))
      image.src = src
    })
    posterLogos.set(src, logo)
  }
  return logo
}

// The same mark as public/logo, drawn by hand if the file cannot load: an orbit behind,
// the planet, then the front of the orbit
function drawFallbackBrandMark(
  context: CanvasRenderingContext2D,
  x: number,
  y: number,
  size: number,
  theme: PosterTheme
) {
  const scale = size / 64
  const tilt = (-24 * Math.PI) / 180
  context.save()
  context.translate(x, y)
  context.scale(scale, scale)

  context.strokeStyle = theme.markInk
  context.lineWidth = 3.5
  context.lineCap = 'round'
  context.beginPath()
  context.ellipse(32, 32, 27, 6.5, tilt, Math.PI, Math.PI * 2)
  context.stroke()

  context.fillStyle = theme.markPlanet
  context.beginPath()
  context.arc(32, 32, 14, 0, Math.PI * 2)
  context.fill()

  context.beginPath()
  context.ellipse(32, 32, 27, 6.5, tilt, 0, Math.PI)
  context.stroke()
  context.restore()
}

async function drawPosterBrand(context: CanvasRenderingContext2D, theme: PosterTheme) {
  const x = 45.7
  const y = 55.7
  const markSize = 59.3

  try {
    const logo = await loadPosterLogo(theme.logoSrc)
    context.drawImage(logo, x, y, markSize, markSize)
  } catch {
    drawFallbackBrandMark(context, x, y, markSize, theme)
  }

  const textX = x + markSize + 17.2
  context.textAlign = 'left'
  context.fillStyle = theme.brandText
  // The wordmark in the display face, Anton capitals, as in the app's lockup
  context.font = '400 30px Anton, Impact, sans-serif'
  drawTrackedText(context, 'ATLAS', textX, y + 41, 1.2)
  context.textAlign = 'center'
}

export async function drawPoster(
  context: CanvasRenderingContext2D,
  matrix: string[],
  businessName: string,
  theme: PosterTheme
) {
  context.beginPath()
  context.roundRect(0, 0, POSTER_WIDTH, POSTER_HEIGHT, 36)
  context.clip()

  context.fillStyle = theme.background
  context.fillRect(0, 0, POSTER_WIDTH, POSTER_HEIGHT)

  const glow = context.createRadialGradient(
    POSTER_WIDTH * 0.8,
    POSTER_HEIGHT * 0.25,
    0,
    POSTER_WIDTH * 0.8,
    POSTER_HEIGHT * 0.25,
    POSTER_WIDTH * 0.95
  )
  glow.addColorStop(0, theme.glow)
  glow.addColorStop(0.32, 'rgba(130, 97, 255, 0)')
  context.fillStyle = glow
  context.fillRect(0, 0, POSTER_WIDTH, POSTER_HEIGHT)

  await drawPosterBrand(context, theme)

  context.save()
  context.translate(POSTER_WIDTH / 2 - 20, 520)
  context.rotate((-24 * Math.PI) / 180)
  context.beginPath()
  context.ellipse(0, 0, 300, 140, 0, 0, Math.PI * 2)
  context.strokeStyle = theme.orbit
  context.lineWidth = 2
  context.stroke()
  context.restore()

  context.fillStyle = theme.heading
  context.font = '400 40px "Public Sans", sans-serif'
  context.textAlign = 'center'
  context.fillText('Gimana', POSTER_WIDTH / 2, 220)
  context.fillText('pengalamanmu?', POSTER_WIDTH / 2, 270)

  context.fillStyle = theme.body
  context.font = '400 20px "Public Sans", sans-serif'
  context.fillText('Scan untuk kasih feedback.', POSTER_WIDTH / 2, 318)
  context.fillText('Cuma butuh semenit.', POSTER_WIDTH / 2, 340)

  const qrBox = 288
  const qrX = (POSTER_WIDTH - qrBox) / 2
  const qrY = 356
  const qrInner = 232

  context.fillStyle = theme.qrBox
  context.beginPath()
  context.roundRect(qrX, qrY, qrBox, qrBox, 24)
  context.fill()
  drawModules(context, matrix, qrX + 28, qrY + 28, qrInner, theme.qrModules, 0)

  context.fillStyle = theme.body
  context.font = '400 18px "Public Sans", sans-serif'
  drawCenteredTrackedText(context, 'Scan untuk kasih feedback', POSTER_WIDTH / 2, 664, 0)

  context.font = '700 20px "Public Sans", sans-serif'
  context.fillText(businessName, POSTER_WIDTH / 2, 776)
}
