import { Check, Copy, Link2, Store } from 'lucide-react'
import { useEffect, useId, useState } from 'react'

import { Card } from '@/components/ui/Card'

import { BUSINESS } from '../buatQrData'

export function QrForm() {
  const linkId = useId()
  const [isCopied, setIsCopied] = useState(false)

  useEffect(() => {
    if (!isCopied) return

    const timeout = window.setTimeout(() => setIsCopied(false), 2000)
    return () => window.clearTimeout(timeout)
  }, [isCopied])

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(BUSINESS.feedbackUrl)
      setIsCopied(true)
    } catch (error) {
      console.error('Gagal menyalin link feedback:', error)
    }
  }

  return (
    <Card className="p-5" label="Buat QR feedback">
      <h2 className="text-[15px] leading-[18px] font-bold text-heading">Buat QR feedback</h2>
      <p className="pt-1 text-[11px] leading-3 text-body">
        Atur QR feedback untuk {BUSINESS.name}.
      </p>

      <div className="mt-5 grid gap-4">
        <div>
          <p className="text-[11px] leading-3 text-body">Bisnis</p>
          <div className="mt-1.5 flex h-10 items-center gap-2 border border-field bg-surface-subtle px-[11px]">
            <Store
              aria-hidden="true"
              className="size-[15px] shrink-0 text-icon"
              strokeWidth={1.6}
            />
            <span className="min-w-0 flex-1 truncate text-[11px] text-body">{BUSINESS.name}</span>
          </div>
        </div>

        <div>
          <label htmlFor={linkId} className="block text-[11px] leading-3 text-body">
            Link feedback publik
          </label>
          <div className="mt-1.5 flex h-10 items-center gap-2 border border-field bg-surface-subtle px-[11px]">
            <Link2
              aria-hidden="true"
              className="size-[15px] shrink-0 text-icon"
              strokeWidth={1.7}
            />
            <input
              id={linkId}
              readOnly
              value={BUSINESS.publicPath}
              className="min-w-0 flex-1 bg-transparent text-[11px] text-body outline-none"
            />
            <button
              type="button"
              onClick={() => void handleCopy()}
              aria-label="Salin link feedback publik"
              className="flex shrink-0 items-center gap-1 px-1 py-0.5 text-[11px] text-muted-foreground transition-colors hover:text-primary focus-visible:outline-2 focus-visible:outline-secondary"
            >
              {isCopied ? (
                <Check aria-hidden="true" className="size-[15px] text-accent" strokeWidth={2} />
              ) : (
                <Copy aria-hidden="true" className="size-[15px] text-secondary" strokeWidth={1.7} />
              )}
              <span aria-live="polite">{isCopied ? 'Tersalin' : 'Salin'}</span>
            </button>
          </div>
        </div>
      </div>
    </Card>
  )
}
