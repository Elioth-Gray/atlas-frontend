import './ScanQR.css'

import { ArrowLeft, ArrowRight, Star } from 'lucide-react'
import { type FormEvent, useState } from 'react'
import { useNavigate } from 'react-router'

import { BrandLogo } from '@/components/brand/BrandLogo'
import { StarrySky } from '@/components/decor/StarrySky'

// What each star means, read back to the customer as soon as they tap
const RATING_LABELS = ['', 'Kurang', 'Cukup', 'Baik', 'Sangat baik', 'Luar biasa'] as const

export default function ScanQRPage() {
  const navigate = useNavigate()

  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')
  const [error, setError] = useState('')

  const outletName = 'Outlet'

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()

    if (rating === 0) {
      setError('Pilih rating bintang terlebih dahulu.')
      return
    }

    if (!comment.trim()) {
      setError('Ceritakan pengalamanmu terlebih dahulu.')
      return
    }

    setError('')

    // Navigasi frontend sementara.
    // Hubungkan API untuk menyimpan feedback sungguhan.
    void navigate('/feedback/outlet/success')
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
            <p className="scan-hint">Ketuk bintang untuk menilai kunjunganmu.</p>
          </div>

          <form onSubmit={handleSubmit} noValidate>
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

              {error && (
                <p className="scan-error" role="alert">
                  {error}
                </p>
              )}
            </div>

            <button className="scan-submit scan-rise scan-rise--5" type="submit">
              <span>Kirim Feedback</span>
              <ArrowRight size={18} />
            </button>
          </form>
        </section>
      </main>
    </div>
  )
}
