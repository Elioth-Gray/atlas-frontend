import { useQueryClient } from '@tanstack/react-query'
import { createContext, type ReactNode, useState, useSyncExternalStore } from 'react'

import {
  clearAuthSession,
  getAuthSession,
  setActiveShopId,
  setAuthFromResponse,
  subscribeAuthSession,
} from '@/api/authSession'
import { fetchMyShops, loginUser, registerOwner } from '@/api/endpoints'
import { CURRENT_USER } from '@/constants'
import { useMyShops } from '@/hooks/data/useOwnerShops'
import { useContextHook } from '@/hooks/useContextHook'
import type {
  AuthResponse,
  LoginRequest,
  MyShop,
  RegisterRequest,
  Shop,
  ShopRole,
  User,
} from '@/typings/api'
import { formatShopRole, getInitials } from '@/utils/format'

export interface DisplayUser {
  name: string
  role: string
  initials: string
  email?: string
}

export interface AuthContextValue {
  isAuthenticated: boolean
  user: User | null
  displayUser: DisplayUser
  shops: MyShop[]
  activeShop: Shop | null
  activeShopRole: ShopRole | null
  activeShopId: string | null
  isLoadingShops: boolean
  searchQuery: string
  setSearchQuery: (query: string) => void
  selectShop: (shopId: string) => void
  login: (payload: LoginRequest) => Promise<AuthResponse>
  register: (payload: RegisterRequest) => Promise<AuthResponse>
  logout: () => void
}

const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const queryClient = useQueryClient()
  const session = useSyncExternalStore(subscribeAuthSession, getAuthSession, () => null)
  const [searchQuery, setSearchQuery] = useState('')

  const isAuthenticated = Boolean(session?.accessToken)
  const { data: shopsPage, isLoading: isLoadingShops } = useMyShops(isAuthenticated)

  const shops = shopsPage?.data ?? []

  let activeMembership: MyShop | null = null
  if (isAuthenticated) {
    if (session?.activeShopId) {
      activeMembership = shops.find((item) => item.shop.id === session.activeShopId) ?? null
    }
    if (!activeMembership) {
      activeMembership = shops[0] ?? null
    }
  }

  const activeShop = activeMembership?.shop ?? session?.initialShop ?? null
  const activeShopRole: ShopRole | null =
    activeMembership?.role ?? (session?.initialShop ? 'Owner' : null)
  const activeShopId = activeShop?.id ?? session?.activeShopId ?? null

  const displayUser: DisplayUser = session?.user
    ? {
        name: session.user.name,
        role: formatShopRole(activeShopRole),
        initials: getInitials(session.user.name, CURRENT_USER.initials),
        email: session.user.email,
      }
    : CURRENT_USER

  function selectShop(shopId: string) {
    setActiveShopId(shopId)
  }

  async function login(payload: LoginRequest) {
    const auth = await loginUser(payload)
    setAuthFromResponse(auth)
    try {
      const myShops = await fetchMyShops({ page: 1, page_size: 50 })
      queryClient.setQueryData(['owner', 'shops'], myShops)
      const firstShopId = myShops.data[0]?.shop.id ?? null
      if (firstShopId) {
        setActiveShopId(firstShopId)
      }
    } catch {
      // Shops will be refetched by useMyShops if needed
    }
    return auth
  }

  async function register(payload: RegisterRequest) {
    return registerOwner(payload)
  }

  function logout() {
    clearAuthSession()
    queryClient.clear()
  }

  const value: AuthContextValue = {
    isAuthenticated,
    user: session?.user ?? null,
    displayUser,
    shops,
    activeShop,
    activeShopRole,
    activeShopId,
    isLoadingShops,
    searchQuery,
    setSearchQuery,
    selectShop,
    login,
    register,
    logout,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  return useContextHook(AuthContext, 'AuthProvider')
}
