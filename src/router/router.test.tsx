import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { createMemoryRouter, RouterProvider } from 'react-router'
import { describe, expect, it } from 'vitest'

import { routes } from '@/router'

function renderPath(path: string) {
  const router = createMemoryRouter(routes, { initialEntries: [path] })
  render(<RouterProvider router={router} />)
  return router
}

describe('routes', () => {
  it('shows the landing page on the start page', async () => {
    renderPath('/')

    expect(await screen.findByRole('heading', { name: /Dengar Lebih Baik/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /Mulai Gratis/i })).toBeInTheDocument()
  })

  it('shows the sign-in page', async () => {
    renderPath('/login')

    expect(await screen.findByRole('heading', { name: 'Masuk ke ATLAS' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Masuk' })).toBeInTheDocument()
  })

  it('shows the sign-up page', async () => {
    renderPath('/signup')

    expect(
      await screen.findByRole('heading', { name: 'Mulai Berkembang bersama ATLAS' })
    ).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Buat Akun/i })).toBeInTheDocument()
  })

  it('shows the dashboard on its own page', async () => {
    renderPath('/dashboard')

    expect(await screen.findByRole('heading', { name: 'Dashboard' })).toBeInTheDocument()
    expect(screen.getByText('2.847')).toBeInTheDocument()
  })

  it('shows the QR page', async () => {
    renderPath('/buat-qr')

    expect(await screen.findByRole('heading', { name: 'Buat QR' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Buat QR feedback' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Unduh QR' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Unduh poster' })).toBeInTheDocument()
  })

  it('shows the feedback group and AI solution page', async () => {
    renderPath('/grup-feedback')

    expect(
      await screen.findByRole('heading', { name: 'Grup Feedback & Solusi AI' })
    ).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Peta feedback kamu' })).toBeInTheDocument()
    expect(screen.queryByRole('heading', { name: 'Solusi Feedback AI' })).not.toBeInTheDocument()
  })

  it('shows the AI solution for a feedback topic when it is picked', async () => {
    const user = userEvent.setup()
    renderPath('/grup-feedback')

    await user.click(await screen.findByRole('button', { name: 'Lihat solusi untuk Ukuran porsi' }))

    expect(screen.getByRole('heading', { name: 'Solusi Feedback AI' })).toBeInTheDocument()
    expect(screen.getByText('Standarkan takaran porsi')).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Tutup solusi' }))
    expect(screen.queryByRole('heading', { name: 'Solusi Feedback AI' })).not.toBeInTheDocument()
  })

  it('shows the business account page', async () => {
    renderPath('/akun-bisnis')

    expect(await screen.findByRole('heading', { name: 'Edit Akun Bisnis' })).toBeInTheDocument()
    expect(screen.getByLabelText('Nama bisnis')).toHaveValue('Northstar Coffee')
    expect(screen.getByRole('button', { name: 'Simpan perubahan' })).toBeInTheDocument()
  })

  it('switches between the light and dark theme from the header', async () => {
    const user = userEvent.setup()
    renderPath('/dashboard')

    await user.click(await screen.findByRole('button', { name: 'Gunakan tema gelap' }))
    expect(document.documentElement).toHaveClass('dark')

    await user.click(screen.getByRole('button', { name: 'Gunakan tema terang' }))
    expect(document.documentElement).not.toHaveClass('dark')
  })

  it('logs out from the sidebar', async () => {
    const user = userEvent.setup()
    const router = renderPath('/dashboard')

    await user.click(await screen.findByRole('button', { name: 'Keluar' }))

    expect(await screen.findByRole('heading', { name: 'Masuk ke ATLAS' })).toBeInTheDocument()
    expect(router.state.location.pathname).toBe('/login')
  })

  it('sends an unknown path back to the landing page', async () => {
    const router = renderPath('/unknown')

    expect(await screen.findByRole('heading', { name: /Dengar Lebih Baik/i })).toBeInTheDocument()
    expect(router.state.location.pathname).toBe('/')
  })
})
