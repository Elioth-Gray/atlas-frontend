import { Star } from 'lucide-react'

import { cn } from '@/utils/cn'

interface StarRatingProps {
  rating: number
}

export function StarRating({ rating }: StarRatingProps) {
  return (
    <div className="flex items-center" role="img" aria-label={`${rating} dari 5 bintang`}>
      {Array.from({ length: 5 }, (_, index) => (
        <Star
          key={index}
          aria-hidden="true"
          className={cn(
            'size-3',
            index < rating ? 'fill-warning text-warning' : 'fill-border text-border'
          )}
          strokeWidth={0}
        />
      ))}
    </div>
  )
}
