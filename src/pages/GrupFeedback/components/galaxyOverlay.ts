export interface ScreenCircle {
  x: number
  y: number
  radius: number
}

export interface GalaxyOverlay {
  panel: HTMLElement | null
  connector: SVGPathElement | null
  anchor: SVGCircleElement | null
  ring: SVGCircleElement | null
}

const ARROW_GAP = 10

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), Math.max(min, max))
}

// Draws the arrow from the solution panel's nearest edge to the focused planet
export function drawConnector(overlay: GalaxyOverlay, planet: ScreenCircle) {
  const { panel, connector, anchor, ring } = overlay
  if (!panel || !connector || !anchor || !ring) return

  const left = panel.offsetLeft
  const top = panel.offsetTop
  const right = left + panel.offsetWidth
  const bottom = top + panel.offsetHeight
  const isPanelBelow = top > planet.y

  const start = isPanelBelow
    ? { x: clamp(planet.x, left + 28, right - 28), y: top }
    : { x: planet.x < left ? left : right, y: clamp(planet.y, top + 36, bottom - 36) }

  // A short elbow out of the panel reads more like a callout than a plain diagonal
  const toPlanetX = planet.x - start.x
  const toPlanetY = planet.y - start.y
  const elbow = isPanelBelow
    ? { x: start.x, y: start.y - Math.min(24, Math.abs(toPlanetY) / 3) }
    : { x: start.x + Math.sign(toPlanetX) * Math.min(28, Math.abs(toPlanetX) / 3), y: start.y }

  const dx = planet.x - elbow.x
  const dy = planet.y - elbow.y
  const length = Math.hypot(dx, dy) || 1
  const reach = Math.max(0, length - planet.radius - ARROW_GAP)
  const end = { x: elbow.x + (dx / length) * reach, y: elbow.y + (dy / length) * reach }

  connector.setAttribute('d', `M ${start.x} ${start.y} L ${elbow.x} ${elbow.y} L ${end.x} ${end.y}`)
  anchor.setAttribute('cx', String(start.x))
  anchor.setAttribute('cy', String(start.y))
  ring.setAttribute('cx', String(planet.x))
  ring.setAttribute('cy', String(planet.y))
  ring.setAttribute('r', String(planet.radius + ARROW_GAP / 2))
}
