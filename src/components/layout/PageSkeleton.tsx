import { useLocation } from 'react-router'

import { Skeleton } from '@/components/ui/Skeleton'
import { APP_NAME } from '@/constants'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'

const CARD_CLASS = 'border border-border bg-surface p-[18px]'

const SKELETON_TITLES: Record<string, string> = {
  '/dashboard': `Dashboard | ${APP_NAME}`,
  '/create-qr': `Buat QR | ${APP_NAME}`,
  '/qr-generator': `Buat QR | ${APP_NAME}`,
  '/feedback-group': `Grup Feedback & Solusi AI | ${APP_NAME}`,
  '/issues': `Grup Feedback & Solusi AI | ${APP_NAME}`,
  '/galaxy': `Grup Feedback & Solusi AI | ${APP_NAME}`,
  '/business-account': `Edit Akun Bisnis | ${APP_NAME}`,
  '/settings/business': `Edit Akun Bisnis | ${APP_NAME}`,
}

// Shown while a page's code and data load: the page header, filters, figures, charts and a table,
// each drawn as the block it will become, so the layout does not jump when the content lands
export function PageSkeleton() {
  const { pathname } = useLocation()
  useDocumentTitle(SKELETON_TITLES[pathname] ?? APP_NAME)

  return (
    <div role="status" aria-live="polite" className="flex flex-1 flex-col">
      <span className="sr-only">Memuat halaman...</span>

      <div className="flex min-h-[84px] flex-col justify-center gap-3 border-b border-border bg-surface px-4 py-4 sm:px-7 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-col gap-2">
          <Skeleton className="h-7 w-48" />
          <Skeleton className="h-3.5 w-64" />
        </div>
        <div className="flex items-center gap-[9px]">
          <Skeleton className="h-[37px] flex-1 sm:w-[245px] sm:flex-none" />
          <Skeleton className="size-[37px]" />
          <Skeleton className="size-[37px]" />
        </div>
      </div>

      <div className="mx-auto w-full max-w-[1600px] flex-1 px-4 pt-[22px] pb-[50px] sm:px-7">
        <div className="flex flex-wrap gap-[7px]">
          {['w-32', 'w-28', 'w-28', 'w-28', 'w-9'].map((width, index) => (
            <Skeleton key={index} className={`h-[34px] ${width}`} />
          ))}
        </div>

        <div className="mt-[18px] grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {Array.from({ length: 4 }, (_, index) => (
            <div key={index} className={CARD_CLASS}>
              <Skeleton className="h-3 w-24" />
              <Skeleton className="mt-3 h-7 w-20" />
              <Skeleton className="mt-2 h-3 w-36" />
            </div>
          ))}
        </div>

        <div className="mt-3 grid gap-3 xl:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
          <div className="flex min-w-0 flex-col gap-3">
            <div className={CARD_CLASS}>
              <Skeleton className="h-4 w-32" />
              <Skeleton className="mt-2 h-3 w-48" />
              <Skeleton className="mt-5 h-[180px] w-full" />
            </div>
            <div className={CARD_CLASS}>
              <Skeleton className="h-4 w-36" />
              <div className="mt-5 flex flex-col gap-3">
                {['w-full', 'w-4/5', 'w-3/5', 'w-1/2', 'w-1/3'].map((width, index) => (
                  <Skeleton key={index} className={`h-3 ${width}`} />
                ))}
              </div>
            </div>
          </div>
          <div className={CARD_CLASS}>
            <Skeleton className="h-4 w-28" />
            <Skeleton className="mt-2 h-3 w-20" />
            <div className="mt-6 flex h-[260px] items-end gap-3">
              {['h-2/5', 'h-3/5', 'h-1/2', 'h-4/5', 'h-3/5', 'h-full', 'h-3/4'].map(
                (height, index) => (
                  <Skeleton key={index} className={`flex-1 ${height}`} />
                )
              )}
            </div>
          </div>
        </div>

        <div className={`mt-3 ${CARD_CLASS}`}>
          <Skeleton className="h-4 w-32" />
          <div className="mt-5 flex flex-col">
            {Array.from({ length: 4 }, (_, index) => (
              <div key={index} className="flex items-center gap-4 border-t border-border py-3">
                <Skeleton className="size-8 shrink-0" />
                <Skeleton className="h-3 w-32" />
                <Skeleton className="h-3 flex-1" />
                <Skeleton className="hidden h-3 w-20 sm:block" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
