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
  it('shows the dashboard on the start page', async () => {
    renderPath('/')

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
    expect(screen.getByRole('heading', { name: 'Solusi Feedback AI' })).toBeInTheDocument()
  })

  it('asks to connect Google Maps before showing synced reviews', async () => {
    const user = userEvent.setup()
    renderPath('/google-maps')

    expect(
      await screen.findByRole('heading', { name: 'Hubungkan Akun Google Maps' })
    ).toBeInTheDocument()
    expect(screen.queryByText('Northstar Coffee sudah terhubung')).not.toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Sambungkan Google Maps' }))

    expect(
      await screen.findByText('Northstar Coffee sudah terhubung', {}, { timeout: 2000 })
    ).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Sinkronkan ulasan' })).toBeInTheDocument()
  })

  it('shows the business account page', async () => {
    renderPath('/akun-bisnis')

    expect(await screen.findByRole('heading', { name: 'Edit Akun Bisnis' })).toBeInTheDocument()
    expect(screen.getByLabelText('Nama bisnis')).toHaveValue('Northstar Coffee')
    expect(screen.getByRole('button', { name: 'Simpan perubahan' })).toBeInTheDocument()
  })

  it('sends an unknown path back to the start page', async () => {
    const router = renderPath('/unknown')

    expect(await screen.findByRole('heading', { name: 'Dashboard' })).toBeInTheDocument()
    expect(router.state.location.pathname).toBe('/')
  })
})
