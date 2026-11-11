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
            index < rating ? 'fill-[#F2B958] text-[#F2B958]' : 'fill-[#343546] text-[#343546]'
          )}
          strokeWidth={0}
        />
      ))}
    </div>
  )
}
