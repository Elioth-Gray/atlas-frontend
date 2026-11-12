import './ScanQR.css'

import { ArrowLeft, Check } from 'lucide-react'
import { useNavigate } from 'react-router'

export default function ScanQRSuccess() {
  const navigate = useNavigate()

  return (
    <div className="scan-page">
      <main className="scan-container">
        {/* LOGO ASLI ATLAS */}
        <div className="scan-logo">
          <img src="/images/ATLAS_Name%20w.png" alt="ATLAS" className="scan-logo-image" />
        </div>

        <header className="scan-header">
          <button
            className="scan-back"
            type="button"
            aria-label="Kembali"
            onClick={() => {
              void navigate('/feedback/outlet')
            }}
          >
            <ArrowLeft size={22} />
          </button>

          <div className="scan-header-center">
            <span>FEEDBACK ATLAS</span>
            <h2>Selesai</h2>
          </div>

          <span className="scan-page-number">2/2</span>
        </header>

        <div className="scan-progress">
          <span className="scan-progress-active" />
          <span className="scan-progress-active" />
        </div>

        <section className="scan-success-content">
          <div className="scan-success-orbit">
            <div className="scan-success-circle">
              <Check size={54} strokeWidth={2.5} />
            </div>
          </div>

          <span className="scan-success-label">FEEDBACK TERKIRIM</span>

          <h1>Terima kasih!</h1>

          <p>Feedback kamu berhasil dikirim.</p>

          <p className="scan-success-description">
            Masukanmu membantu bisnis berkembang
            <br />
            dan memberi pengalaman yang lebih baik.
          </p>
        </section>
      </main>
    </div>
  )
}
