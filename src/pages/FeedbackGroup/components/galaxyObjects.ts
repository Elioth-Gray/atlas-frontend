import * as THREE from 'three'

import type { FeedbackTopic } from '../feedbackGroupData'
import { createPlanetTexture, createRadialTexture, createRingTexture } from './galaxyTextures'
import type { GalaxyTheme } from './galaxyTheme'

const ATMOSPHERE_VERTEX = /* glsl */ `
  varying vec3 vNormal;
  varying vec3 vView;
  void main() {
    vec4 viewPosition = modelViewMatrix * vec4(position, 1.0);
    vNormal = normalize(normalMatrix * normal);
    vView = normalize(-viewPosition.xyz);
    gl_Position = projectionMatrix * viewPosition;
  }
`

// Fresnel rim: transparent facing the camera, glowing at the silhouette
const ATMOSPHERE_FRAGMENT = /* glsl */ `
  uniform vec3 uColor;
  uniform float uStrength;
  varying vec3 vNormal;
  varying vec3 vView;
  void main() {
    float rim = pow(1.0 - max(dot(vNormal, vView), 0.0), 2.6);
    gl_FragColor = vec4(uColor, rim * uStrength);
  }
`

// Planet size follows how often the topic is mentioned
export function satelliteRadius(count: number) {
  return 0.3 + 0.055 * Math.sqrt(count)
}

export function createPlanet(topic: FeedbackTopic, radius: number, theme: GalaxyTheme) {
  const body = new THREE.Group()
  const surface = new THREE.Mesh(
    new THREE.SphereGeometry(radius, 64, 48),
    new THREE.MeshStandardMaterial(
      theme.bandedPlanets
        ? { map: createPlanetTexture(topic.colors, topic.id), roughness: 0.85 }
        : { color: topic.colors[1], roughness: 0.55 }
    )
  )
  surface.userData.topicId = topic.id

  const atmosphere = new THREE.Mesh(
    new THREE.SphereGeometry(radius * 1.12, 48, 32),
    new THREE.ShaderMaterial({
      uniforms: {
        uColor: { value: new THREE.Color(theme.atmosphere.color ?? topic.colors[0]) },
        uStrength: { value: theme.atmosphere.strength },
      },
      vertexShader: ATMOSPHERE_VERTEX,
      fragmentShader: ATMOSPHERE_FRAGMENT,
      transparent: true,
      blending: theme.atmosphere.blending,
      depthWrite: false,
    })
  )

  body.add(surface, atmosphere)
  return { body, surface }
}

export function createPlanetRing(topic: FeedbackTopic, radius: number) {
  const inner = radius * 1.4
  const outer = radius * 2.2
  const geometry = new THREE.RingGeometry(inner, outer, 128, 1)
  const positions = geometry.attributes.position
  const uvs = geometry.attributes.uv
  const vertex = new THREE.Vector3()

  // RingGeometry maps UVs on a plane; remap so the texture runs from inner to outer edge
  for (let index = 0; index < positions.count; index++) {
    vertex.fromBufferAttribute(positions, index)
    uvs.setXY(index, (vertex.length() - inner) / (outer - inner), 0.5)
  }

  const ring = new THREE.Mesh(
    geometry,
    new THREE.MeshBasicMaterial({
      map: createRingTexture(topic.colors, topic.id),
      side: THREE.DoubleSide,
      transparent: true,
      depthWrite: false,
    })
  )
  ring.rotation.set(-Math.PI / 2 + 0.3, 0.18, 0)
  return ring
}

export function createOrbitLine(radius: number, theme: GalaxyTheme) {
  const points = Array.from({ length: 257 }, (_, index) => {
    const angle = (index / 256) * Math.PI * 2
    return new THREE.Vector3(Math.cos(angle) * radius, 0, Math.sin(angle) * radius)
  })
  const { color, opacity, dashed } = theme.orbit
  const material = dashed
    ? new THREE.LineDashedMaterial({
        color,
        transparent: true,
        opacity,
        dashSize: 0.22,
        gapSize: 0.16,
      })
    : new THREE.LineBasicMaterial({ color, transparent: true, opacity })
  const line = new THREE.Line(new THREE.BufferGeometry().setFromPoints(points), material)
  line.computeLineDistances()
  return line
}

export function createCoreGlow(scale: number, theme: GalaxyTheme) {
  const glow = new THREE.Sprite(
    new THREE.SpriteMaterial({
      map: createRadialTexture(128, 0.9),
      color: theme.glow.color,
      transparent: true,
      opacity: theme.glow.opacity,
      blending: theme.glow.blending,
      depthWrite: false,
    })
  )
  glow.scale.setScalar(scale)
  return glow
}

export function createLights({ hemisphere, keyLight, rimLight }: GalaxyTheme) {
  const key = new THREE.DirectionalLight(keyLight.color, keyLight.intensity)
  key.position.set(-7, 5, 6)
  const rim = new THREE.DirectionalLight(rimLight.color, rimLight.intensity)
  rim.position.set(7, 2, -6)
  return [
    new THREE.HemisphereLight(hemisphere.sky, hemisphere.ground, hemisphere.intensity),
    key,
    rim,
  ]
}

export function disposeScene(scene: THREE.Scene) {
  scene.traverse((object) => {
    if (!('geometry' in object && 'material' in object)) return
    const { geometry, material } = object as THREE.Mesh<
      THREE.BufferGeometry,
      THREE.Material & { map?: THREE.Texture | null }
    >
    geometry.dispose()
    material.map?.dispose()
    material.dispose()
  })
}
