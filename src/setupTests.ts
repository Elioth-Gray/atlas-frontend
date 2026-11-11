import '@testing-library/jest-dom/vitest'

import { cleanup, configure } from '@testing-library/react'
import { afterEach } from 'vitest'

// Lazy pages are transformed on first import, which can take longer than the 1s default
configure({ asyncUtilTimeout: 8000 })

// Vitest globals are off, so Testing Library cannot register its cleanup by itself
afterEach(() => {
  cleanup()
})
