import type { FallbackProps } from 'react-error-boundary'

// Shown by an error boundary. The raw error is never shown to the user
export function ErrorFallback({ resetErrorBoundary }: FallbackProps) {
  return (
    <div role="alert" className="flex flex-col items-start gap-2 p-4">
      <p className="text-sm">Something went wrong.</p>
      <button
        type="button"
        onClick={resetErrorBoundary}
        className="text-sm text-primary underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary active:translate-y-px disabled:cursor-not-allowed disabled:opacity-60"
      >
        Try again
      </button>
    </div>
  )
}
