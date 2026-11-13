import type { AuthResponse, Shop, User } from '@/typings/api'

const STORAGE_KEY = 'atlas_auth_session_v1'

export interface StoredAuthSession {
  accessToken: string
  accessTokenExpiresAt: string
  refreshToken: string
  refreshTokenExpiresAt: string
  user: User
  activeShopId: string | null
  initialShop: Shop | null
}

type Listener = () => void

const listeners = new Set<Listener>()
let memorySession: StoredAuthSession | null = readStoredSession()

function readStoredSession(): StoredAuthSession | null {
  if (typeof window === 'undefined') return null
  try {
    const raw = window.sessionStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw) as Partial<StoredAuthSession>
    if (
      typeof parsed.accessToken === 'string' &&
      typeof parsed.refreshToken === 'string' &&
      parsed.user &&
      typeof parsed.user.id === 'string'
    ) {
      return {
        accessToken: parsed.accessToken,
        accessTokenExpiresAt: parsed.accessTokenExpiresAt ?? '',
        refreshToken: parsed.refreshToken,
        refreshTokenExpiresAt: parsed.refreshTokenExpiresAt ?? '',
        user: parsed.user,
        activeShopId: typeof parsed.activeShopId === 'string' ? parsed.activeShopId : null,
        initialShop: parsed.initialShop ?? null,
      }
    }
  } catch {
    // Ignore storage read errors
  }
  return null
}

function writeStoredSession(session: StoredAuthSession | null) {
  memorySession = session
  if (typeof window !== 'undefined') {
    try {
      if (session) {
        window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(session))
      } else {
        window.sessionStorage.removeItem(STORAGE_KEY)
      }
    } catch {
      // Ignore storage write errors
    }
  }
  listeners.forEach((listener) => listener())
}

export function getAuthSession(): StoredAuthSession | null {
  return memorySession
}

export function setAuthFromResponse(auth: AuthResponse, preferredShopId?: string | null) {
  const previous = memorySession
  const nextShopId = preferredShopId ?? auth.shop?.id ?? previous?.activeShopId ?? null
  writeStoredSession({
    accessToken: auth.access_token,
    accessTokenExpiresAt: auth.access_token_expires_at,
    refreshToken: auth.refresh_token,
    refreshTokenExpiresAt: auth.refresh_token_expires_at,
    user: auth.user,
    activeShopId: nextShopId,
    initialShop: auth.shop ?? previous?.initialShop ?? null,
  })
}

export function setActiveShopId(shopId: string | null) {
  if (!memorySession) return
  if (memorySession.activeShopId === shopId) return
  writeStoredSession({
    ...memorySession,
    activeShopId: shopId,
  })
}

export function updateSessionUser(user: User) {
  if (!memorySession) return
  writeStoredSession({
    ...memorySession,
    user,
  })
}

export function clearAuthSession() {
  writeStoredSession(null)
}

export function subscribeAuthSession(listener: Listener) {
  listeners.add(listener)
  return () => {
    listeners.delete(listener)
  }
}
