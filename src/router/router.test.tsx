import { render, screen } from '@testing-library/react'
import { createMemoryRouter, RouterProvider } from 'react-router'
import { describe, expect, it } from 'vitest'

import { routes } from '@/router'

function renderPath(path: string) {
  const router = createMemoryRouter(routes, { initialEntries: [path] })
  render(<RouterProvider router={router} />)
  return router
}

describe('routes', () => {
  it('shows the start page that points to the guidelines', async () => {
    renderPath('/')

    expect(await screen.findByRole('main')).toHaveTextContent('docs/GUIDELINES.MD')
  })

  it('sends an unknown path back to the start page', async () => {
    const router = renderPath('/unknown')

    expect(await screen.findByRole('main')).toHaveTextContent('docs/GUIDELINES.MD')
    expect(router.state.location.pathname).toBe('/')
  })
})
