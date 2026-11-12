import './ScanQR.css'

import { ArrowLeft, ArrowRight, Star } from 'lucide-react'
import { type FormEvent, useState } from 'react'
import { useNavigate } from 'react-router'

import { BrandLogo } from '@/components/brand/BrandLogo'

export default function ScanQRPage() {
  const navigate = useNavigate()

  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')
  const [error, setError] = useState('')

  const outletName = 'OUTLET'

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
    <div className="scan-page">
      <main className="scan-container">
        <div className="scan-logo">
          <BrandLogo tone="light" />
        </div>

        <header className="scan-header">
          <button
            className="scan-back"
            type="button"
            aria-label="Kembali"
            onClick={() => {
              void navigate(-1)
            }}
          >
            <ArrowLeft size={22} />
          </button>

          <div className="scan-header-center">
            <span>FEEDBACK ATLAS</span>
            <h2>Nilai & Tulis</h2>
          </div>

          <span className="scan-page-number">1/2</span>
        </header>

        <div className="scan-progress">
          <span className="scan-progress-active" />
          <span />
        </div>

        <p className="scan-outlet">{outletName}</p>

        <section className="scan-content">
          <h1>
            Bagaimana
            <br />
            pengalamanmu hari ini?
          </h1>

          <p>Ketuk bintang untuk menilai kunjunganmu.</p>

          <form onSubmit={handleSubmit}>
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
                >
                  <Star
                    size={39}
                    fill={value <= rating ? '#9879FF' : 'transparent'}
                    color={value <= rating ? '#9879FF' : '#424158'}
                    strokeWidth={2.5}
                  />
                </button>
              ))}
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

            {error && (
              <p className="scan-error" role="alert">
                {error}
              </p>
            )}

            <button className="scan-submit" type="submit">
              <span>Kirim Feedback</span>
              <ArrowRight size={20} />
            </button>
          </form>
        </section>
      </main>
    </div>
  )
}
