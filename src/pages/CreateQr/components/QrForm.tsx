import { Check, Copy, Link2, Store } from 'lucide-react'
import { useEffect, useId, useState } from 'react'
import { toast } from 'sonner'

import { Card } from '@/components/ui/Card'
import { ThemedSelect } from '@/components/ui/ThemedSelect'
import { useAuth } from '@/contexts/AuthContext'

import type { BusinessProfile } from '../createQrData'
import { BUSINESS } from '../createQrData'

interface QrFormProps {
  business?: BusinessProfile
}

export function QrForm({ business = BUSINESS }: QrFormProps) {
  const linkId = useId()
  const { shops, activeShopId, selectShop } = useAuth()
  const [isCopied, setIsCopied] = useState(false)

  useEffect(() => {
    if (!isCopied) return

    const timeout = window.setTimeout(() => setIsCopied(false), 2000)
    return () => window.clearTimeout(timeout)
  }, [isCopied])

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(business.feedbackUrl)
      setIsCopied(true)
      toast.success('Link feedback publik berhasil disalin.')
    } catch (error) {
      console.error('Gagal menyalin link feedback:', error)
      toast.error('Gagal menyalin link feedback.')
    }
  }

  return (
    <Card className="p-5" label="Buat QR feedback">
      <h2 className="text-[15px] leading-[18px] font-bold text-heading">Buat QR feedback</h2>
      <p className="pt-1 text-[11px] leading-3 text-body">
        Atur QR feedback untuk {business.name}.
      </p>

      <div className="mt-5 grid gap-4">
        <div>
          <p className="text-[11px] leading-3 text-body">Bisnis</p>
          {shops.length > 1 ? (
            <div className="mt-1.5">
              <ThemedSelect
                icon={Store}
                label="Pilih bisnis"
                value={activeShopId ?? ''}
                options={shops.map((entry) => ({
                  value: entry.shop.id,
                  label: entry.shop.name,
                }))}
                onChange={selectShop}
                size="md"
                variant="field"
              />
            </div>
          ) : (
            <div className="mt-1.5 flex h-10 items-center gap-2 border border-field bg-surface-subtle px-[11px]">
              <Store
                aria-hidden="true"
                className="size-[15px] shrink-0 text-icon"
                strokeWidth={1.6}
              />
              <span className="min-w-0 flex-1 truncate text-[11px] text-body">{business.name}</span>
            </div>
          )}
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
              value={business.feedbackUrl}
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
