import * as THREE from 'three'

import type { Planet } from './galaxyPlanets'

// The panel takes the right side on wide canvases and the bottom on narrow ones
const WIDE_LAYOUT_MIN_WIDTH = 640

const forward = new THREE.Vector3()
const right = new THREE.Vector3()
const up = new THREE.Vector3()
const center = new THREE.Vector3()

interface OverviewPose {
  basePosition: THREE.Vector3
  baseTarget: THREE.Vector3
  width: number
}

// Camera pose that frames one planet beside the solution panel, keeping the overview angle
export function computeFocusPose(
  camera: THREE.PerspectiveCamera,
  planet: Planet,
  { basePosition, baseTarget, width }: OverviewPose,
  position: THREE.Vector3,
  target: THREE.Vector3
) {
  planet.surface.getWorldPosition(center)
  forward.copy(baseTarget).sub(basePosition).normalize()
  right.crossVectors(forward, camera.up).normalize()
  up.crossVectors(right, forward).normalize()

  const distance = planet.radius * (planet.topic.isPrimary ? 15 : 11)
  const halfHeight = distance * Math.tan(THREE.MathUtils.degToRad(camera.fov / 2))

  target.copy(center)
  if (width >= WIDE_LAYOUT_MIN_WIDTH) {
    target.addScaledVector(right, halfHeight * camera.aspect * 0.4)
  } else {
    target.addScaledVector(up, -halfHeight * 0.5)
  }
  position.copy(target).addScaledVector(forward, -distance)
}
