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

function drawPosterBrand(context: CanvasRenderingContext2D, theme: PosterTheme) {
  const x = 45.7
  const y = 55.7
  const markSize = 59.3
  const gradient = context.createLinearGradient(x, y, x + markSize, y + markSize)
  gradient.addColorStop(0, '#A986FF')
  gradient.addColorStop(1, '#6442DD')

  context.fillStyle = gradient
  context.beginPath()
  context.roundRect(x, y, markSize, markSize, markSize / 2)
  context.fill()

  context.strokeStyle = '#DDE1EC'
  context.lineWidth = 1.8
  context.beginPath()
  context.roundRect(x + 15.8, y + 12.9, 13.6, 13.6, 1.3)
  context.stroke()
  context.beginPath()
  context.roundRect(x + 26.6, y + 26.6, 5.9, 5.9, 0.8)
  context.stroke()

  context.strokeStyle = '#9679FF'
  context.beginPath()
  context.ellipse(x + 22.6, y + 35.9, 24.2, 8.6, (-26 * Math.PI) / 180, 0, Math.PI * 2)
  context.stroke()

  context.fillStyle = '#67B5FF'
  context.beginPath()
  context.arc(x + 53.1, y + 16.4, 3.9, 0, Math.PI * 2)
  context.fill()

  const textX = x + markSize + 17.2
  context.textAlign = 'left'
  context.fillStyle = theme.brandText
  context.font = '700 25px Poppins, sans-serif'
  drawTrackedText(context, 'ATLAS', textX, y + 24, 4.7)
  context.font = '400 20px Poppins, sans-serif'
  drawTrackedText(context, 'SISTEM INSIGHT AI', textX, y + 53, 2.6)
  context.textAlign = 'center'
}

export function drawPoster(
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

  drawPosterBrand(context, theme)

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
  context.font = '400 40px Poppins, sans-serif'
  context.textAlign = 'center'
  context.fillText('Gimana', POSTER_WIDTH / 2, 220)
  context.fillText('pengalamanmu?', POSTER_WIDTH / 2, 270)

  context.fillStyle = theme.body
  context.font = '400 20px Poppins, sans-serif'
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
  context.font = '400 18px Poppins, sans-serif'
  drawCenteredTrackedText(context, 'SCAN UNTUK KASIH FEEDBACK', POSTER_WIDTH / 2, 664, 2)

  context.font = '700 20px Poppins, sans-serif'
  context.fillText(businessName, POSTER_WIDTH / 2, 776)
}
