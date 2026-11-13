import type { RefObject } from 'react'

interface GalaxyConnectorProps {
  connectorRef: RefObject<SVGPathElement | null>
  anchorRef: RefObject<SVGCircleElement | null>
  ringRef: RefObject<SVGCircleElement | null>
}

// Arrow from the solution panel to the focused planet; the scene sets its coordinates each frame
export function GalaxyConnector({ connectorRef, anchorRef, ringRef }: GalaxyConnectorProps) {
  return (
    <svg
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-20 size-full animate-callout-in"
    >
      <defs>
        <marker
          id="galaxy-arrow"
          viewBox="0 0 10 10"
          refX="8"
          refY="5"
          markerWidth="7"
          markerHeight="7"
          orient="auto-start-reverse"
        >
          <path d="M 0 1 L 9 5 L 0 9 z" fill="var(--color-galaxy-accent)" />
        </marker>
      </defs>
      <path
        ref={connectorRef}
        fill="none"
        stroke="var(--color-galaxy-accent)"
        strokeWidth="1.5"
        strokeDasharray="5 4"
        markerEnd="url(#galaxy-arrow)"
        className="animate-galaxy-dash"
      />
      <circle ref={anchorRef} r="3.5" fill="var(--color-galaxy-accent)" />
      <circle
        ref={ringRef}
        fill="none"
        stroke="var(--color-galaxy-accent)"
        strokeOpacity="0.7"
        strokeWidth="1.2"
        strokeDasharray="3 5"
        className="animate-galaxy-dash"
      />
    </svg>
  )
}
