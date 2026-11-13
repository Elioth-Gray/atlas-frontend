import * as THREE from 'three'

// Seeded so every planet keeps the same surface across renders
function seededRandom(seedText: string) {
  let seed = [...seedText].reduce(
    (hash, char) => Math.imul(hash ^ char.charCodeAt(0), 16777619),
    2166136261
  )
  return () => {
    seed = (seed + 0x6d2b79f5) | 0
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

function createCanvas(width: number, height: number) {
  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height
  const context = canvas.getContext('2d')
  if (!context) throw new Error('Canvas 2D tidak tersedia')
  return { canvas, context }
}

function toTexture(canvas: HTMLCanvasElement) {
  const texture = new THREE.CanvasTexture(canvas)
  texture.colorSpace = THREE.SRGBColorSpace
  return texture
}

function paletteColor(palette: THREE.Color[], amount: number, target: THREE.Color) {
  const scaled = THREE.MathUtils.clamp(amount, 0, 1) * (palette.length - 1)
  const index = Math.min(Math.floor(scaled), palette.length - 2)
  return target.copy(palette[index]).lerp(palette[index + 1], scaled - index)
}

// Gas-giant look: latitude bands from the topic palette, broken up by soft storms
export function createPlanetTexture(colors: readonly string[], seed: string) {
  const random = seededRandom(seed)
  const { canvas, context } = createCanvas(512, 256)
  const palette = colors.map((color) => new THREE.Color(color))
  const color = new THREE.Color()
  const phases = [random(), random(), random()].map((value) => value * Math.PI * 2)

  for (let y = 0; y < canvas.height; y++) {
    const latitude = y / canvas.height
    const band =
      0.5 +
      0.3 * Math.sin(latitude * 17 + phases[0]) +
      0.15 * Math.sin(latitude * 41 + phases[1]) +
      0.07 * Math.sin(latitude * 93 + phases[2])
    context.fillStyle = `#${paletteColor(palette, band, color).getHexString()}`
    context.fillRect(0, y, canvas.width, 1)
  }

  for (let index = 0; index < 18; index++) {
    context.fillStyle = `rgba(255, 255, 255, ${0.04 + random() * 0.1})`
    context.beginPath()
    context.ellipse(
      random() * canvas.width,
      40 + random() * 176,
      12 + random() * 46,
      2 + random() * 6,
      0,
      0,
      Math.PI * 2
    )
    context.fill()
  }

  return toTexture(canvas)
}

export function createRingTexture(colors: readonly string[], seed: string) {
  const random = seededRandom(`${seed}-ring`)
  const { canvas, context } = createCanvas(256, 4)
  const palette = colors.map((color) => new THREE.Color(color))
  const color = new THREE.Color()

  for (let x = 0; x < canvas.width; x++) {
    const progress = x / canvas.width
    const fade = Math.sin(progress * Math.PI)
    const alpha = fade * (0.25 + 0.55 * Math.abs(Math.sin(progress * 23 + random() * 0.6)))
    const rgb = paletteColor(palette, progress, color)
    context.fillStyle = `rgba(${rgb.r * 255}, ${rgb.g * 255}, ${rgb.b * 255}, ${alpha})`
    context.fillRect(x, 0, 1, canvas.height)
  }

  return toTexture(canvas)
}

export function createRadialTexture(size: number, innerAlpha = 1) {
  const { canvas, context } = createCanvas(size, size)
  const center = size / 2
  const gradient = context.createRadialGradient(center, center, 0, center, center, center)
  gradient.addColorStop(0, `rgba(255, 255, 255, ${innerAlpha})`)
  gradient.addColorStop(0.35, `rgba(255, 255, 255, ${innerAlpha * 0.45})`)
  gradient.addColorStop(1, 'rgba(255, 255, 255, 0)')
  context.fillStyle = gradient
  context.fillRect(0, 0, size, size)
  return toTexture(canvas)
}

// Horizontal fade used for shooting-star trails: transparent tail, bright head
export function createStreakTexture() {
  const { canvas, context } = createCanvas(128, 8)
  const gradient = context.createLinearGradient(0, 0, canvas.width, 0)
  gradient.addColorStop(0, 'rgba(255, 255, 255, 0)')
  gradient.addColorStop(0.85, 'rgba(220, 210, 255, 0.7)')
  gradient.addColorStop(1, 'rgba(255, 255, 255, 1)')
  context.fillStyle = gradient
  context.fillRect(0, 2, canvas.width, 4)
  return toTexture(canvas)
}
