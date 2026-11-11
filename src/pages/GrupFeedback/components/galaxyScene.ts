import * as THREE from 'three'

import type { FeedbackTopic } from '../grupFeedbackData'
import { fitCamera } from './galaxyCamera'
import { computeFocusPose } from './galaxyFocus'
import { createLights, disposeScene } from './galaxyObjects'
import type { GalaxyOverlay, ScreenCircle } from './galaxyOverlay'
import { drawConnector } from './galaxyOverlay'
import type { Planet } from './galaxyPlanets'
import { createPlanetSystem, movePlanets, orbitStretch } from './galaxyPlanets'
import { createShootingStars, createStarfield } from './galaxyStars'
import type { GalaxyThemeName } from './galaxyTheme'
import { GALAXY_THEMES } from './galaxyTheme'

const FOV = 30
const LABEL_GAP = 6

interface GalaxyOptions {
  topics: FeedbackTopic[]
  getLabels: () => (HTMLElement | null)[]
  getOverlay: () => GalaxyOverlay
  onHover: (topicId: string | null) => void
  onSelect: (topicId: string | null) => void
  animate: boolean
  theme: GalaxyThemeName
}

export interface GalaxyScene {
  setZoom: (zoom: number) => void
  focus: (topicId: string | null) => void
  dispose: () => void
}

// Throws when WebGL is unavailable; the caller shows a fallback
export function createGalaxyScene(container: HTMLElement, options: GalaxyOptions): GalaxyScene {
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  renderer.domElement.style.cssText = 'position:absolute;inset:0;width:100%;height:100%'
  container.appendChild(renderer.domElement)

  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(FOV, 1, 0.1, 400)
  const theme = GALAXY_THEMES[options.theme]
  const stars = createStarfield(theme)
  const shootingStars = createShootingStars(theme)
  camera.add(shootingStars.group)
  scene.add(camera, stars.group, ...createLights(theme))

  const system = createPlanetSystem(options.topics, theme)
  const { planets, extent: outerExtent } = system
  scene.add(system.group)

  const raycaster = new THREE.Raycaster()
  const pointer = new THREE.Vector2()
  const projected = new THREE.Vector3()
  const direction = new THREE.Vector3()
  const basePosition = new THREE.Vector3()
  const baseTarget = new THREE.Vector3()
  const lookTarget = new THREE.Vector3()
  const desiredPosition = new THREE.Vector3()
  const desiredTarget = new THREE.Vector3()
  const screen: ScreenCircle = { x: 0, y: 0, radius: 0 }
  const surfaces = planets.map((planet) => planet.surface)
  let hoveredId: string | null = null
  let focused: Planet | null = null
  let targetZoom = 1
  let speedFactor = options.animate ? 1 : 0
  let elapsed = 0
  let width = 1
  let height = 1
  let stretch = 1
  let isInitialized = false
  let lastTime = performance.now()
  let frameId = 0

  // Refits the overview pose; once running, the camera eases there instead of jumping
  function resize() {
    width = container.clientWidth || 1
    height = container.clientHeight || 1
    renderer.setSize(width, height, false)
    camera.aspect = width / height
    const currentPosition = camera.position.clone()
    stretch = orbitStretch(camera.aspect)
    system.setStretch(stretch)
    baseTarget.copy(fitCamera(camera, outerExtent, stretch))
    basePosition.copy(camera.position)
    if (isInitialized) camera.position.copy(currentPosition)
    else lookTarget.copy(baseTarget)
    isInitialized = true
  }

  function topicAt(event: MouseEvent) {
    const bounds = renderer.domElement.getBoundingClientRect()
    pointer.set(
      ((event.clientX - bounds.left) / bounds.width) * 2 - 1,
      -((event.clientY - bounds.top) / bounds.height) * 2 + 1
    )
    raycaster.setFromCamera(pointer, camera)
    const hit = raycaster.intersectObjects(surfaces, false)[0]
    return (hit?.object.userData.topicId as string | undefined) ?? null
  }

  function setHovered(topicId: string | null) {
    if (topicId === hoveredId) return
    hoveredId = topicId
    renderer.domElement.style.cursor = topicId ? 'pointer' : 'default'
    options.onHover(topicId)
  }

  const handlePointerMove = (event: PointerEvent) => setHovered(topicAt(event))
  const handlePointerLeave = () => setHovered(null)
  const handleClick = (event: MouseEvent) => options.onSelect(topicAt(event))

  function toScreen(planet: Planet) {
    planet.surface.getWorldPosition(projected)
    const distance = projected.distanceTo(camera.position)
    const halfHeight = distance * Math.tan(THREE.MathUtils.degToRad(FOV / 2))
    const worldRadius = planet.radius * planet.body.scale.x
    screen.radius = (worldRadius / halfHeight) * (height / 2) * camera.zoom
    projected.project(camera)
    screen.x = ((projected.x + 1) / 2) * width
    screen.y = ((1 - projected.y) / 2) * height
    return screen
  }

  function isCovered(planet: Planet) {
    planet.surface.getWorldPosition(projected)
    raycaster.set(camera.position, direction.copy(projected).sub(camera.position).normalize())
    return raycaster.intersectObjects(surfaces, false)[0]?.object !== planet.surface
  }

  // Labels sit below each planet; covered ones hide and the rest dim while one is focused
  function updateOverlay() {
    const labels = options.getLabels()
    planets.forEach((planet, index) => {
      const label = labels[index]
      if (!label) return
      const isHidden = isCovered(planet)
      const { x, y, radius } = toScreen(planet)
      label.style.transform = `translate(${x}px, ${y + radius + LABEL_GAP}px) translate(-50%, 0)`
      label.style.zIndex = String(Math.round((1 - projected.z) * 10000))
      label.style.opacity = isHidden ? '0' : focused && focused !== planet ? '0.35' : '1'
      label.style.pointerEvents = isHidden ? 'none' : 'auto'
    })
    if (focused) drawConnector(options.getOverlay(), toScreen(focused))
  }

  function updateCamera(delta: number) {
    if (focused) {
      computeFocusPose(
        camera,
        focused,
        { basePosition, baseTarget, width },
        desiredPosition,
        desiredTarget
      )
    } else {
      desiredPosition.copy(basePosition)
      desiredTarget.copy(baseTarget)
    }
    const ease = Math.min(1, delta * 2.8)
    camera.position.lerp(desiredPosition, ease)
    lookTarget.lerp(desiredTarget, ease)
    camera.lookAt(lookTarget)
    camera.zoom += (targetZoom - camera.zoom) * Math.min(1, delta * 8)
    camera.updateProjectionMatrix()
  }

  function render(time: number) {
    const delta = Math.min((time - lastTime) / 1000, 0.1)
    lastTime = time
    elapsed += delta
    const targetSpeed = options.animate && !hoveredId && !focused ? 1 : 0
    speedFactor += (targetSpeed - speedFactor) * Math.min(1, delta * 4)

    movePlanets(planets, { delta, stretch, speedFactor, hoveredId, focused })

    if (options.animate) {
      stars.group.rotation.y += delta * 0.004
      stars.update(elapsed)
      shootingStars.update(delta)
    }
    updateCamera(delta)
    renderer.render(scene, camera)
    updateOverlay()
    frameId = requestAnimationFrame(render)
  }

  const observer = new ResizeObserver(resize)
  observer.observe(container)
  resize()
  renderer.domElement.addEventListener('pointermove', handlePointerMove)
  renderer.domElement.addEventListener('pointerleave', handlePointerLeave)
  renderer.domElement.addEventListener('click', handleClick)
  frameId = requestAnimationFrame(render)

  return {
    setZoom(zoom) {
      targetZoom = zoom
    },
    focus(topicId) {
      focused = planets.find((planet) => planet.topic.id === topicId) ?? null
    },
    dispose() {
      cancelAnimationFrame(frameId)
      observer.disconnect()
      renderer.domElement.removeEventListener('pointermove', handlePointerMove)
      renderer.domElement.removeEventListener('pointerleave', handlePointerLeave)
      renderer.domElement.removeEventListener('click', handleClick)
      disposeScene(scene)
      renderer.dispose()
      renderer.domElement.remove()
    },
  }
}
