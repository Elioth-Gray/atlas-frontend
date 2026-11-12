import './starrySky.css'

const GLINT_COUNT = 7
const METEOR_COUNT = 5

// The night sky behind the dark Manifesto sheets (landing, sign-in, sign-up).
// Purely decorative: fixed behind the page, hidden from assistive tech, still under reduced motion
export function StarrySky() {
  return (
    <div aria-hidden="true" className="starry-sky">
      <span className="starry-sky__far" />
      {Array.from({ length: GLINT_COUNT }, (_, index) => (
        <span key={`glint-${index}`} className="starry-sky__glint" />
      ))}
      {Array.from({ length: METEOR_COUNT }, (_, index) => (
        <span key={`meteor-${index}`} className="starry-sky__meteor" />
      ))}
    </div>
  )
}
