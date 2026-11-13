import './ScanQR.css'

import { ArrowLeft, Check } from 'lucide-react'
import { useNavigate, useParams } from 'react-router'

import { BrandLogo } from '@/components/brand/BrandLogo'
import { StarrySky } from '@/components/decor/StarrySky'
import { APP_NAME } from '@/constants'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'

export default function ScanQRSuccess() {
  useDocumentTitle(`Feedback Terkirim | ${APP_NAME}`)
  const navigate = useNavigate()
  const { shopId } = useParams<{ shopId: string }>()
  const backPath = `/feedback/${shopId ?? 'outlet'}`

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
              void navigate(backPath)
            }}
          >
            <ArrowLeft size={20} />
          </button>

          <BrandLogo size="sm" tone="light" />

          <span className="scan-step">
            <span className="sr-only">Langkah </span>2/2
          </span>
        </header>

        <div className="scan-progress scan-rise" aria-hidden="true">
          <span className="scan-progress-active" />
          <span className="scan-progress-active" />
        </div>

        <section className="scan-success-content">
          {/* The check lands at the centre of an orbit, a satellite circling it: the feedback is in */}
          <div className="scan-success-orbit" aria-hidden="true">
            <span className="scan-success-satellite" />
            <div className="scan-success-circle">
              <Check size={52} strokeWidth={2.5} />
            </div>
          </div>

          <h1 className="scan-rise scan-rise--3">Terima kasih!</h1>

          <p className="scan-rise scan-rise--4">Masukanmu berhasil dikirim.</p>

          <p className="scan-success-description scan-rise scan-rise--5">
            Masukanmu membantu bisnis berkembang dan memberi pengalaman yang lebih baik.
          </p>
        </section>
      </main>
    </div>
  )
}
