import type { CSSProperties } from 'react'

interface QrCodeProps {
  matrix: string[]
  label: string
  className?: string
  style?: CSSProperties
}

export function QrCode({ matrix, label, className, style }: QrCodeProps) {
  const size = matrix.length

  return (
    <svg
      role="img"
      aria-label={label}
      viewBox={`0 0 ${size} ${size}`}
      className={className}
      style={style}
      shapeRendering="crispEdges"
    >
      {matrix.flatMap((row, rowIndex) =>
        [...row].map((module, columnIndex) =>
          module === '1' ? (
            <rect
              key={`${rowIndex}-${columnIndex}`}
              x={columnIndex}
              y={rowIndex}
              width="1"
              height="1"
              fill="currentColor"
            />
          ) : null
        )
      )}
    </svg>
  )
}
