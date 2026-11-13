import gsap from 'gsap'
import type { RefObject } from 'react'
import { useEffect } from 'react'

import { MOTION, shouldAnimate } from '@/utils/motion'

// Spread over the whole QR so the modules "grow" outward from the center
const MODULE_SPREAD = 0.85

/**
 * Plays the "QR is being generated" reveal on the poster preview:
 * text fades up, the QR box pops in, modules grow from the center, then a scan line sweeps it.
 * Elements opt in with data-reveal="item" | "qr-box" | "scan". Replays when replayKey changes.
 */
export function usePosterReveal(rootRef: RefObject<HTMLElement | null>, replayKey: string) {
  useEffect(() => {
    const root = rootRef.current
    if (!root || !shouldAnimate()) return

    const context = gsap.context(() => {
      const qrBox = root.querySelector<HTMLElement>('[data-reveal="qr-box"]')
      const scan = root.querySelector<HTMLElement>('[data-reveal="scan"]')
      const modules = [...root.querySelectorAll<SVGRectElement>('[data-reveal="qr-box"] rect')]
      const size = modules[0]?.ownerSVGElement?.viewBox.baseVal.width ?? 0
      const center = size / 2
      const maxDistance = Math.hypot(center, center) || 1

      const timeline = gsap.timeline({ defaults: { ease: MOTION.ease } })
      timeline.from('[data-reveal="item"]', {
        opacity: 0,
        y: 14,
        duration: MOTION.duration * 0.6,
        stagger: MOTION.stagger * 0.6,
      })

      if (qrBox) {
        timeline.from(
          qrBox,
          { opacity: 0, scale: 0.82, duration: MOTION.duration * 0.5, ease: 'back.out(1.7)' },
          '<0.15'
        )
      }

      timeline.from(
        modules,
        {
          opacity: 0,
          scale: 0,
          transformOrigin: '50% 50%',
          duration: 0.35,
          ease: 'back.out(2.2)',
          stagger: (_, target: SVGRectElement) => {
            const x = Number(target.getAttribute('x')) + 0.5
            const y = Number(target.getAttribute('y')) + 0.5
            return (Math.hypot(x - center, y - center) / maxDistance) * MODULE_SPREAD
          },
        },
        '-=0.2'
      )

      if (scan && qrBox) {
        timeline
          .fromTo(
            scan,
            { y: 0, opacity: 0 },
            { y: () => qrBox.clientHeight, opacity: 1, duration: 0.9, ease: 'power2.inOut' },
            '-=0.35'
          )
          .to(scan, { opacity: 0, duration: 0.25 })
          .fromTo(
            qrBox,
            { boxShadow: '0 0 0 0 rgba(167, 133, 255, 0.55)' },
            {
              boxShadow: '0 0 0 14px rgba(167, 133, 255, 0)',
              duration: MOTION.duration * 0.6,
              ease: 'power2.out',
              clearProps: 'boxShadow',
            },
            '<'
          )
      }
    }, root)

    return () => context.revert()
  }, [rootRef, replayKey])
}
