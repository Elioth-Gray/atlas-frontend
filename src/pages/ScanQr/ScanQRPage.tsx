import './ScanQR.css'

import { ArrowLeft, ArrowRight, LoaderCircle, Star } from 'lucide-react'
import { type FormEvent, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { toast } from 'sonner'

import { ApiError } from '@/api/ApiError'
import { BrandLogo } from '@/components/brand/BrandLogo'
import { StarrySky } from '@/components/decor/StarrySky'
import { APP_NAME } from '@/constants'
import { useAuth } from '@/contexts/AuthContext'
import { isUuid, usePublicShop, useSubmitFeedback } from '@/hooks/data/usePublicShop'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'

// What each star means, read back to the customer as soon as they tap
const RATING_LABELS = ['', 'Kurang', 'Cukup', 'Baik', 'Sangat baik', 'Luar biasa'] as const

export default function ScanQRPage() {
  const navigate = useNavigate()
  const { shopId } = useParams<{ shopId: string }>()
  const { activeShopId, activeShop } = useAuth()

  const resolvedShopId = isUuid(shopId) ? shopId : isUuid(activeShopId) ? activeShopId : undefined
  const { data: publicShop } = usePublicShop(resolvedShopId)
  const submitFeedback = useSubmitFeedback(resolvedShopId)

  const [customerName, setCustomerName] = useState('')
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')
  const [error, setError] = useState('')

  const outletName = publicShop?.name ?? activeShop?.name ?? 'Outlet'
  const pageTitle =
    outletName !== 'Outlet'
      ? `Kirim Feedback - ${outletName} | ${APP_NAME}`
      : `Kirim Feedback | ${APP_NAME}`
  useDocumentTitle(pageTitle)

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()

    if (rating === 0) {
      setError('Pilih rating bintang terlebih dahulu.')
      return
    }

    const trimmedComment = comment.trim()
    if (!trimmedComment) {
      setError('Ceritakan pengalamanmu terlebih dahulu.')
      return
    }

    if (trimmedComment.length < 5) {
      setError('Ceritakan pengalamanmu minimal 5 karakter.')
      return
    }

    setError('')

    const targetSlug = shopId ?? resolvedShopId ?? 'outlet'

    if (isUuid(resolvedShopId)) {
      try {
        await submitFeedback.mutateAsync({
          name: customerName.trim() ? customerName.trim() : null,
          rating,
          feedback: trimmedComment,
          image: null,
        })
        toast.success('Terima kasih! Masukanmu berhasil dikirim.')
        void navigate(`/feedback/${targetSlug}/success`)
      } catch (err) {
        const msg =
          err instanceof ApiError ? err.message : 'Gagal mengirim feedback. Silakan coba lagi.'
        setError(msg)
        toast.error(msg)
      }
      return
    }

    void navigate(`/feedback/${targetSlug}/success`)
  }

  return (
    <div data-theme="dark" className="scan-page dark">
      <StarrySky />

      <main className="scan-shell">
        <header className="scan-topbar scan-rise">
          <button
            className="scan-back"
            type="button"
            aria-label="Kembali"
            onClick={() => {
              void navigate(-1)
            }}
          >
            <ArrowLeft size={20} />
          </button>

          <BrandLogo size="sm" tone="light" />

          <span className="scan-step">
            <span className="sr-only">Langkah </span>1/2
          </span>
        </header>

        <div className="scan-progress scan-rise" aria-hidden="true">
          <span className="scan-progress-active" />
          <span />
        </div>

        <section className="scan-content">
          <div className="scan-intro scan-rise scan-rise--2">
            <div aria-hidden="true" className="scan-intro-orbit" />
            <p className="scan-outlet">{outletName}</p>
            <h1>Bagaimana pengalamanmu hari ini?</h1>
            <p className="scan-hint">
              {publicShop?.description ?? 'Ketuk bintang untuk menilai kunjunganmu.'}
            </p>
          </div>

          <form onSubmit={(e) => void handleSubmit(e)} noValidate>
            <div className="scan-rating scan-rise scan-rise--3">
              <div className="scan-stars" role="group" aria-label="Pilih rating pengalaman">
                {[1, 2, 3, 4, 5].map((value) => (
                  <button
                    type="button"
                    key={value}
                    onClick={() => {
                      setRating(value)
                      setError('')
                    }}
                    aria-label={`${value} bintang`}
                    aria-pressed={rating === value}
                    className={value <= rating ? 'is-filled' : undefined}
                  >
                    <Star
                      fill={value <= rating ? 'currentColor' : 'transparent'}
                      strokeWidth={2.2}
                    />
                  </button>
                ))}
              </div>
              <p className="scan-rating-label" aria-live="polite">
                {rating > 0 ? RATING_LABELS[rating] : 'Belum ada rating'}
              </p>
            </div>

            <div className="scan-comment scan-rise scan-rise--4">
              <label className="scan-label" htmlFor="customer-name">
                Nama kamu (opsional)
              </label>
              <div className="scan-textarea-wrapper mb-3">
                <input
                  id="customer-name"
                  type="text"
                  maxLength={100}
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="Kosongkan untuk kirim sebagai Anonim"
                  className="w-full bg-transparent px-3.5 py-2.5 text-sm text-white placeholder:text-white/45 focus:outline-none"
                />
              </div>

              <label className="scan-label" htmlFor="review">
                Ceritakan pengalamanmu
              </label>

              <div className="scan-textarea-wrapper">
                <textarea
                  id="review"
                  maxLength={500}
                  value={comment}
                  onChange={(e) => {
                    setComment(e.target.value)
                    setError('')
                  }}
                  placeholder="Apa yang sudah bagus atau perlu diperbaiki?"
                />

                <span className="scan-counter">{comment.length}/500</span>
              </div>

              <p className="mt-2 text-[11px] text-white/55">
                Dengan mengirimkan feedback, kamu telah membaca Kebijakan Privasi.
              </p>

              {error && (
                <p className="scan-error" role="alert">
                  {error}
                </p>
              )}
            </div>

            <button
              className="scan-submit scan-rise scan-rise--5"
              type="submit"
              disabled={submitFeedback.isPending}
            >
              {submitFeedback.isPending ? (
                <>
                  <LoaderCircle size={18} className="animate-spin" />
                  <span>Mengirim...</span>
                </>
              ) : (
                <>
                  <span>Kirim Feedback</span>
                  <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>
        </section>
      </main>
    </div>
  )
}
