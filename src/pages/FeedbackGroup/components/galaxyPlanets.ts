import * as THREE from 'three'

import type { FeedbackTopic } from '../feedbackGroupData'
import {
  createCoreGlow,
  createOrbitLine,
  createPlanet,
  createPlanetRing,
  satelliteRadius,
} from './galaxyObjects'
import type { GalaxyTheme } from './galaxyTheme'

const ORBIT_RADII = [4.4, 6.5, 8.6]
const PRIMARY_RADIUS = 1.35
const ORBIT_SPEED = 0.08
const MAX_STRETCH = 1.7

// Wide canvases get wider (elliptical) orbits so the camera can stay high enough to keep planets apart
export function orbitStretch(aspect: number) {
  return THREE.MathUtils.clamp(aspect / 1.5, 1, MAX_STRETCH)
}

export interface Planet {
  topic: FeedbackTopic
  body: THREE.Group
  surface: THREE.Mesh
  radius: number
  orbitRadius: number
  angle: number
}

export function createPlanetSystem(topics: FeedbackTopic[], theme: GalaxyTheme) {
  const group = new THREE.Group()
  const orbitLines = ORBIT_RADII.map((radius) => createOrbitLine(radius, theme))
  group.add(...orbitLines)

  const satellites = topics.filter((topic) => !topic.isPrimary)
  const planets: Planet[] = topics.map((topic) => {
    const radius = topic.isPrimary ? PRIMARY_RADIUS : satelliteRadius(topic.count)
    const { body, surface } = createPlanet(topic, radius, theme)
    if (topic.isPrimary) body.add(createPlanetRing(topic, radius), createCoreGlow(7, theme))
    group.add(body)

    // Spread satellites 60° apart and move them together so they never bunch up
    const index = satellites.indexOf(topic)
    return {
      topic,
      body,
      surface,
      radius,
      orbitRadius: topic.isPrimary ? 0 : ORBIT_RADII[index % ORBIT_RADII.length],
      angle: (index / Math.max(satellites.length, 1)) * Math.PI * 2 + 0.5,
    }
  })

  if (topics.length === 0) group.add(createCoreGlow(7, theme))

  const extent =
    ORBIT_RADII[ORBIT_RADII.length - 1] +
    Math.max(...planets.map((planet) => planet.radius), PRIMARY_RADIUS)
  const setStretch = (stretch: number) => orbitLines.forEach((line) => (line.scale.x = stretch))
  return { group, planets, extent, setStretch }
}

interface MotionState {
  delta: number
  stretch: number
  speedFactor: number
  hoveredId: string | null
  focused: Planet | null
}

export function movePlanets(
  planets: Planet[],
  { delta, stretch, speedFactor, hoveredId, focused }: MotionState
) {
  planets.forEach((planet) => {
    planet.angle += ORBIT_SPEED * delta * speedFactor
    planet.body.position.set(
      Math.cos(planet.angle) * planet.orbitRadius * stretch,
      0,
      Math.sin(planet.angle) * planet.orbitRadius
    )
    planet.surface.rotation.y += delta * (focused === planet ? 0.35 : 0.25 * speedFactor)
    const scale = planet.topic.id === hoveredId && !focused ? 1.18 : 1
    planet.body.scale.setScalar(THREE.MathUtils.lerp(planet.body.scale.x, scale, delta * 10))
  })
}
