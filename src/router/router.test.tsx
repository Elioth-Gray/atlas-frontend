import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { createMemoryRouter, MemoryRouter, RouterProvider } from 'react-router'
import { describe, expect, it, vi } from 'vitest'

import { APP_NAME } from '@/constants'
import { FeedbackGalaxy } from '@/pages/FeedbackGroup/components/FeedbackGalaxy'
import { createPlanetSystem } from '@/pages/FeedbackGroup/components/galaxyPlanets'
import { GALAXY_THEMES } from '@/pages/FeedbackGroup/components/galaxyTheme'
import { routes } from '@/router'

function renderPath(path: string) {
  const router = createMemoryRouter(routes, { initialEntries: [path] })
  render(<RouterProvider router={router} />)
  return router
}

describe('routes', () => {
  it('shows the landing page on the start page', async () => {
    renderPath('/')

    expect(
      await screen.findByRole('heading', { name: /Satu Suara Kecil|Dengar Lebih Baik/i })
    ).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /Mulai Gratis/i })).toBeInTheDocument()
    expect(document.title).toBe('ATLAS: Feedback Pelanggan Jadi Insight Bisnis')
  })

  it('shows the sign-in page', async () => {
    renderPath('/signin')

    expect(await screen.findByRole('heading', { name: 'Masuk ke ATLAS' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Masuk' })).toBeInTheDocument()
    expect(document.title).toBe(`Masuk | ${APP_NAME}`)
  })

  it('shows the sign-up page', async () => {
    renderPath('/signup')

    expect(
      await screen.findByRole('heading', { name: 'Mulai Berkembang bersama ATLAS' })
    ).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Buat Akun/i })).toBeDisabled()
    expect(document.title).toBe(`Daftar | ${APP_NAME}`)
  })

  it('shows the dashboard on its own page', async () => {
    renderPath('/dashboard')

    expect(
      await screen.findByRole('heading', { name: 'Dashboard' }, { timeout: 20000 })
    ).toBeInTheDocument()
    expect(screen.getByText('2.847')).toBeInTheDocument()
    expect(document.title).toBe(`Dashboard | ${APP_NAME}`)
  }, 25000)

  it('shows the QR page', async () => {
    renderPath('/create-qr')

    expect(await screen.findByRole('heading', { name: 'Buat QR' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Buat QR feedback' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Unduh QR' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Unduh poster' })).toBeInTheDocument()
    expect(document.title).toBe(`Buat QR | ${APP_NAME}`)
  })

  it('shows the feedback group and AI solution page', async () => {
    renderPath('/feedback-group')

    expect(
      await screen.findByRole('heading', { name: 'Grup Feedback & Solusi AI' })
    ).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Peta feedback kamu' })).toBeInTheDocument()
    expect(screen.queryByText('DETAIL ISU')).not.toBeInTheDocument()
    expect(document.title).toBe(`Grup Feedback & Solusi AI | ${APP_NAME}`)
  })

  it('walks through the 4-state planet consultation flow when a planet is picked', async () => {
    const user = userEvent.setup()
    renderPath('/feedback-group')

    // State A: Issue Overview (DETAIL ISU)
    await user.click(await screen.findByRole('button', { name: 'Lihat solusi untuk Ukuran porsi' }))
    expect(screen.getByText('DETAIL ISU')).toBeInTheDocument()
    expect(screen.getByText('Ringkasan masalah')).toBeInTheDocument()
    expect(screen.getByText('Feedback unik')).toBeInTheDocument()
    expect(screen.getByText('Opini terkait')).toBeInTheDocument()
    expect(screen.getByText('Opini negatif')).toBeInTheDocument()
    expect(screen.getByText('Opini severe')).toBeInTheDocument()

    // State B: Chat Consultation (Mengumpulkan konteks)
    await user.click(screen.getByRole('button', { name: /Mulai Konsultasi AI/i }))
    expect(screen.getByText('Mengumpulkan konteks')).toBeInTheDocument()
    expect(screen.getByText('Konteks yang sudah diketahui')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Lewati pertanyaan' })).toBeInTheDocument()

    // State C: Structured Solution (Hasil Konsultasi)
    await user.click(screen.getByRole('button', { name: /Buat solusi sekarang/i }))
    expect(
      screen.getByRole('heading', { name: 'Hasil Konsultasi — Ukuran porsi' })
    ).toBeInTheDocument()
    expect(screen.getByText('1. Temuan')).toBeInTheDocument()
    expect(screen.getByText('2. Bukti pelanggan')).toBeInTheDocument()
    expect(screen.getByText('3. Hipotesis penyebab')).toBeInTheDocument()
    expect(screen.getByText('4. Rekomendasi')).toBeInTheDocument()
    expect(screen.getByText('Standarkan takaran porsi')).toBeInTheDocument()
    expect(screen.getByText('5. Indikator keberhasilan')).toBeInTheDocument()

    // State D: Review Memory Candidates & Save
    await user.click(screen.getByRole('button', { name: 'Simpan hasil' }))
    expect(screen.getByRole('heading', { name: 'Simpan hasil konsultasi' })).toBeInTheDocument()
    expect(screen.getByText('Fakta bisnis yang dapat diingat AI')).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: 'Konfirmasi & Simpan' }))
    expect(screen.getByText('Tersimpan di riwayat konsultasi')).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Tutup solusi' }))
    expect(
      screen.queryByRole('heading', { name: 'Hasil Konsultasi — Ukuran porsi' })
    ).not.toBeInTheDocument()
  })

  it('shows the business account page', async () => {
    renderPath('/business-account')

    expect(await screen.findByRole('heading', { name: 'Edit Akun Bisnis' })).toBeInTheDocument()
    expect(screen.getByLabelText('Nama bisnis')).toHaveValue('Northstar Coffee')
    expect(screen.getByRole('button', { name: 'Simpan perubahan' })).toBeInTheDocument()
    expect(document.title).toBe(`Edit Akun Bisnis | ${APP_NAME}`)
  })

  it('sets proper titles on customer QR feedback and success pages', async () => {
    renderPath('/feedback/demo-shop')

    expect(await screen.findByRole('button', { name: /Kirim Feedback/i })).toBeInTheDocument()
    expect(document.title).toBe(`Kirim Feedback | ${APP_NAME}`)

    renderPath('/feedback/demo-shop/success')
    expect(await screen.findByRole('heading', { name: 'Terima kasih!' })).toBeInTheDocument()
    expect(document.title).toBe(`Feedback Terkirim | ${APP_NAME}`)
  })

  it('keeps finite 3D orbit geometry and shows the empty-orbit message when no topics exist', () => {
    const getContextSpy = vi
      .spyOn(HTMLCanvasElement.prototype, 'getContext')
      .mockImplementation((() => ({
        createRadialGradient: () => ({ addColorStop: vi.fn() }),
        fillRect: vi.fn(),
        fillStyle: '',
      })) as unknown as typeof HTMLCanvasElement.prototype.getContext)
    let emptySystem: ReturnType<typeof createPlanetSystem>
    try {
      emptySystem = createPlanetSystem([], GALAXY_THEMES.light)
    } finally {
      getContextSpy.mockRestore()
    }
    expect(emptySystem.planets).toHaveLength(0)
    expect(emptySystem.group.children.length).toBeGreaterThanOrEqual(3)
    expect(Number.isFinite(emptySystem.extent)).toBe(true)
    expect(emptySystem.extent).toBeGreaterThan(0)

    render(
      <MemoryRouter>
        <FeedbackGalaxy zoom={1} label="Peta feedback kosong" isFullscreen={false} topics={[]} />
      </MemoryRouter>
    )

    expect(
      screen.getByRole('heading', { name: 'Orbit planet masalah belum ada' })
    ).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /Buat & Unduh QR Feedback/i })).toHaveAttribute(
      'href',
      '/create-qr'
    )
  })

  it('switches between the light and dark theme from the header', async () => {
    const user = userEvent.setup()
    renderPath('/dashboard')

    await user.click(await screen.findByRole('button', { name: 'Gunakan tema gelap' }))
    expect(document.documentElement).toHaveClass('dark')

    await user.click(screen.getByRole('button', { name: 'Gunakan tema terang' }))
    expect(document.documentElement).not.toHaveClass('dark')
  })

  it('logs out from the sidebar profile dropdown', async () => {
    const user = userEvent.setup()
    const router = renderPath('/dashboard')

    await user.click(await screen.findByRole('button', { name: /Buka menu akun/i }))
    await user.click(await screen.findByRole('menuitem', { name: 'Keluar' }))

    expect(await screen.findByRole('heading', { name: 'Masuk ke ATLAS' })).toBeInTheDocument()
    expect(router.state.location.pathname).toBe('/signin')
  })

  it('sends an unknown path back to the landing page', async () => {
    const router = renderPath('/unknown')

    expect(
      await screen.findByRole('heading', { name: /Satu Suara Kecil|Dengar Lebih Baik/i })
    ).toBeInTheDocument()
    expect(router.state.location.pathname).toBe('/')
  })
})
