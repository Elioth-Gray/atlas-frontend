import { Toaster } from 'sonner'

import { useTheme } from '@/hooks/useTheme'

export function AppToaster() {
  const { theme } = useTheme()

  return (
    <Toaster
      theme={theme}
      position="top-right"
      closeButton
      toastOptions={{
        unstyled: true,
        classNames: {
          toast:
            'flex w-full max-w-[360px] items-start gap-2.5 border border-border bg-surface px-3.5 py-3 font-sans text-[12px] leading-[17px] text-heading shadow-card',
          title: 'font-semibold text-heading',
          description: 'pt-0.5 text-[11px] text-body',
          closeButton:
            'border border-border bg-surface-subtle text-muted-foreground hover:text-heading',
          success: 'border-l-4 border-l-success',
          error: 'border-l-4 border-l-danger',
          warning: 'border-l-4 border-l-warning',
          info: 'border-l-4 border-l-primary',
        },
      }}
    />
  )
}
