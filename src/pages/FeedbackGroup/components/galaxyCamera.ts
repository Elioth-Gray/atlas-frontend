import * as THREE from 'three'

// Below ~40° the inner orbit passes in front of and behind the central planet, so planets overlap
const VIEW_ANGLES = Array.from({ length: 8 }, (_, index) =>
  THREE.MathUtils.degToRad(40 + index * 3)
)
const TARGET_SHIFTS = [0, 0.15, 0.3, 0.45, 0.6, 0.75]
const SAMPLE_ANGLES = Array.from({ length: 48 }, (_, index) => (index / 48) * Math.PI * 2)

// Screen area (in NDC) the outer orbit may use; the bottom keeps room for labels
const BOUNDS = { x: 0.94, top: 0.86, bottom: 0.78 }

// Small penalty so ties go to the pose that keeps the system vertically centered
const CENTER_WEIGHT = 0.15
const IDEAL_CENTER_Y = 0.1

interface CameraPose {
  viewAngle: number
  targetZ: number
  distance: number
}

function place(camera: THREE.PerspectiveCamera, { viewAngle, targetZ, distance }: CameraPose) {
  camera.position.set(0, Math.sin(viewAngle) * distance, Math.cos(viewAngle) * distance + targetZ)
  camera.lookAt(0, 0, targetZ)
  camera.updateMatrixWorld()
}

function fits(camera: THREE.PerspectiveCamera, pose: CameraPose, extent: number, stretch: number) {
  place(camera, pose)
  const point = new THREE.Vector3()
  return SAMPLE_ANGLES.every((angle) => {
    point.set(Math.cos(angle) * extent * stretch, 0, Math.sin(angle) * extent).project(camera)
    return Math.abs(point.x) <= BOUNDS.x && point.y <= BOUNDS.top && point.y >= -BOUNDS.bottom
  })
}

function closestDistance(
  camera: THREE.PerspectiveCamera,
  extent: number,
  stretch: number,
  viewAngle: number,
  targetZ: number
) {
  let low = extent * 0.5
  let high = extent * stretch * 40
  for (let step = 0; step < 16; step++) {
    const distance = (low + high) / 2
    if (fits(camera, { viewAngle, targetZ, distance }, extent, stretch)) high = distance
    else low = distance
  }
  return high
}

// Tries a range of tilts and aim points, keeping the one where the outer orbit fills the canvas most.
// Leaves the camera in that pose and returns the point it looks at.
export function fitCamera(camera: THREE.PerspectiveCamera, extent: number, stretch: number) {
  const zoom = camera.zoom
  camera.zoom = 1
  camera.updateProjectionMatrix()

  const center = new THREE.Vector3()
  let best: CameraPose = { viewAngle: VIEW_ANGLES[0], targetZ: 0, distance: extent * 40 }
  let bestScore = Infinity
  for (const viewAngle of VIEW_ANGLES) {
    for (const shift of TARGET_SHIFTS) {
      const targetZ = extent * shift * Math.sin(viewAngle)
      const pose = {
        viewAngle,
        targetZ,
        distance: closestDistance(camera, extent, stretch, viewAngle, targetZ),
      }
      place(camera, pose)
      const centerY = center.set(0, 0, 0).project(camera).y
      const score = pose.distance * (1 + CENTER_WEIGHT * Math.abs(centerY - IDEAL_CENTER_Y))
      if (score < bestScore) {
        best = pose
        bestScore = score
      }
    }
  }
  place(camera, best)

  camera.zoom = zoom
  camera.updateProjectionMatrix()
  return new THREE.Vector3(0, 0, best.targetZ)
}
