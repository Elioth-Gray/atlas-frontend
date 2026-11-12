import type { RefObject } from 'react'
import { useEffect } from 'react'

// Marks the root with data-js-reveal only once this runs, so content stays visible when scripts fail.
// Each [data-reveal] element gets data-revealed the first time it scrolls into view
export function useReveal(rootRef: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const root = rootRef.current
    if (!root || !('IntersectionObserver' in window)) return

    const targets = root.querySelectorAll<HTMLElement>('[data-reveal]')
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          entry.target.setAttribute('data-revealed', '')
          observer.unobserve(entry.target)
        }
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.12 }
    )

    root.setAttribute('data-js-reveal', '')
    targets.forEach((target) => observer.observe(target))
    return () => observer.disconnect()
  }, [rootRef])
}
