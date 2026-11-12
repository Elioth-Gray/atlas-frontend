import { cn } from '@/utils/cn'

interface SkeletonProps {
  className?: string
}

// A placeholder block in the shape of what is coming; a soft light sweeps across it while data loads
export function Skeleton({ className }: SkeletonProps) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        'relative block overflow-hidden bg-surface-subtle after:absolute after:inset-0 after:animate-shimmer after:bg-linear-to-r after:from-transparent after:via-heading/8 after:to-transparent motion-reduce:after:animate-none',
        className
      )}
    />
  )
}
