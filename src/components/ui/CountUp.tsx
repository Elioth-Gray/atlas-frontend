import gsap from 'gsap'
import { useEffect, useRef } from 'react'

import { cn } from '@/utils/cn'
import { MOTION, shouldAnimate } from '@/utils/motion'

interface CountUpProps {
  // Formatted the Indonesian way, e.g. "2.847", "+18,2%", "3 baru"
  value: string
  delay?: number
  className?: string
}

const NUMBER_PATTERN = /^([^\d]*?)(\d[\d.]*(?:,\d+)?)(.*)$/

function parseValue(value: string) {
  const match = NUMBER_PATTERN.exec(value)
  if (!match) return null
  const [, prefix, numberText, suffix] = match
  const decimals = numberText.split(',')[1]?.length ?? 0
  const target = Number(numberText.replaceAll('.', '').replace(',', '.'))
  const formatter = new Intl.NumberFormat('id-ID', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  })
  return { prefix, suffix, target, formatter }
}

// Counts up from zero on mount; the markup always holds the final value, so it is
// what renders without animation and what remains once the tween ends
export function CountUp({ value, delay = 0, className }: CountUpProps) {
  const displayRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const display = displayRef.current
    const parsed = parseValue(value)
    if (!display || !parsed || !shouldAnimate()) return

    const { prefix, suffix, target, formatter } = parsed
    const counter = { current: 0 }
    const render = () => {
      display.textContent = `${prefix}${formatter.format(counter.current)}${suffix}`
    }
    render()
    const tween = gsap.to(counter, {
      current: target,
      duration: MOTION.duration,
      ease: MOTION.ease,
      delay,
      onUpdate: render,
      onComplete: () => {
        display.textContent = value
      },
    })

    return () => {
      tween.kill()
      display.textContent = value
    }
  }, [value, delay])

  return (
    <span ref={displayRef} className={cn('tabular-nums', className)}>
      {value}
    </span>
  )
}
