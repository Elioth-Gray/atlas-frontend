import * as THREE from 'three'

import { createRadialTexture, createStreakTexture } from './galaxyTextures'
import type { GalaxyTheme } from './galaxyTheme'

interface StarLayer {
  count: number
  size: number
  opacity: number
  twinkleSpeed: number
  phase: number
}

// Layers twinkle at their own pace so the sky never pulses as one
const STAR_LAYERS: StarLayer[] = [
  { count: 3400, size: 1.3, opacity: 0.85, twinkleSpeed: 0, phase: 0 },
  { count: 1200, size: 2.1, opacity: 1, twinkleSpeed: 1.4, phase: 0 },
  { count: 420, size: 3.2, opacity: 1, twinkleSpeed: 0.9, phase: 2.1 },
  { count: 110, size: 5, opacity: 1, twinkleSpeed: 0.6, phase: 4.2 },
]

const SHOOTING_STAR_COUNT = 5

function createStarLayer(
  { count, size, opacity }: StarLayer,
  texture: THREE.Texture,
  theme: GalaxyTheme
) {
  const positions = new Float32Array(count * 3)
  const colors = new Float32Array(count * 3)
  const point = new THREE.Vector3()
  const tints = theme.stars.tints.map((tint) => new THREE.Color(tint))

  // A shell well outside the camera so stars always stay behind the planets
  for (let index = 0; index < count; index++) {
    point.randomDirection().multiplyScalar(90 + Math.random() * 60)
    point.toArray(positions, index * 3)
    tints[Math.floor(Math.random() * tints.length)].toArray(colors, index * 3)
  }

  const geometry = new THREE.BufferGeometry()
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))
  return new THREE.Points(
    geometry,
    new THREE.PointsMaterial({
      map: texture,
      size,
      sizeAttenuation: false,
      vertexColors: true,
      transparent: true,
      opacity: opacity * theme.stars.opacity,
      depthWrite: false,
      blending: theme.stars.blending,
    })
  )
}

export function createStarfield(theme: GalaxyTheme) {
  const group = new THREE.Group()
  const texture = createRadialTexture(32)
  const layers = STAR_LAYERS.map((layer) => {
    const points = createStarLayer(layer, texture, theme)
    group.add(points)
    return { layer, material: points.material }
  })

  function update(elapsed: number) {
    layers.forEach(({ layer, material }) => {
      if (!layer.twinkleSpeed) return
      const wave = Math.sin(elapsed * layer.twinkleSpeed + layer.phase)
      material.opacity = layer.opacity * theme.stars.opacity * (0.65 + 0.35 * wave)
    })
  }

  return { group, update }
}

interface ShootingStar {
  mesh: THREE.Mesh<THREE.PlaneGeometry, THREE.MeshBasicMaterial>
  velocity: THREE.Vector3
  life: number
  wait: number
}

// Lives in camera space so streaks always cross the visible sky
export function createShootingStars(theme: GalaxyTheme) {
  const group = new THREE.Group()
  const texture = createStreakTexture()
  const stars: ShootingStar[] = Array.from({ length: SHOOTING_STAR_COUNT }, (_, index) => {
    const geometry = new THREE.PlaneGeometry(4.2, 0.07)
    geometry.translate(-2.1, 0, 0)
    const mesh = new THREE.Mesh(
      geometry,
      new THREE.MeshBasicMaterial({
        map: texture,
        color: theme.streak.color,
        transparent: true,
        blending: theme.streak.blending,
        depthWrite: false,
      })
    )
    mesh.visible = false
    group.add(mesh)
    return { mesh, velocity: new THREE.Vector3(), life: 0, wait: 0.8 + index * 1.6 }
  })

  function launch(star: ShootingStar) {
    const angle = -0.35 - Math.random() * 0.35
    star.velocity.set(Math.cos(angle), Math.sin(angle), 0).multiplyScalar(16 + Math.random() * 8)
    star.mesh.position.set(-18 + Math.random() * 22, 3 + Math.random() * 7, -40)
    star.mesh.rotation.z = angle
    star.mesh.visible = true
    star.life = 0.9
  }

  function update(delta: number) {
    stars.forEach((star) => {
      if (star.life <= 0) {
        star.wait -= delta
        if (star.wait <= 0) launch(star)
        return
      }

      star.life -= delta
      star.mesh.position.addScaledVector(star.velocity, delta)
      star.mesh.material.opacity = Math.min(1, star.life * 2.5)
      if (star.life > 0) return
      star.mesh.visible = false
      star.wait = 1.5 + Math.random() * 4
    })
  }

  return { group, update }
}
