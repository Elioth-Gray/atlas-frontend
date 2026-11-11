// One rhythm for the whole app: a quick start and a long soft settle, like the
// feedback galaxy's camera glide. Count-ups, charts and the QR reveal all use it.
export const MOTION = {
  duration: 1.4,
  ease: 'expo.out',
  stagger: 0.12,
} as const

export const MOTION_MS = MOTION.duration * 1000

// No matchMedia (e.g. jsdom) or a reduced-motion preference means: show the final state
export function shouldAnimate() {
  return (
    typeof window.matchMedia === 'function' &&
    !window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )
}
