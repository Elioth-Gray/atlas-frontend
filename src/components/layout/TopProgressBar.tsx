import { useIsFetching, useIsMutating } from '@tanstack/react-query'
import { useLocation, useNavigation } from 'react-router'

export function TopProgressBar() {
  const { pathname } = useLocation()
  const navigation = useNavigation()
  const fetchingCount = useIsFetching()
  const mutatingCount = useIsMutating()

  const isBusy = navigation.state !== 'idle' || fetchingCount > 0 || mutatingCount > 0

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed top-0 right-0 left-0 z-[100] h-[3px] overflow-hidden"
    >
      {/* Route transition progress sweep */}
      <div
        key={pathname}
        className="h-full w-full origin-left animate-route-progress bg-primary dark:bg-secondary"
      />

      {/* Persistent loading indicator while network queries/mutations or route transitions are active */}
      {isBusy && (
        <div className="absolute inset-y-0 left-0 w-full overflow-hidden bg-primary/20 dark:bg-secondary/20">
          <div className="h-full w-1/2 animate-shimmer bg-primary dark:bg-secondary" />
        </div>
      )}
    </div>
  )
}
