import { useMutation, useQuery } from '@tanstack/react-query'

import {
  fetchPublicShop,
  fetchShopCategories,
  fetchShopScales,
  submitPublicFeedback,
} from '@/api/endpoints'
import type { Lookup, SubmitFeedbackRequest } from '@/typings/api'

const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i

export function isUuid(value: string | null | undefined): value is string {
  return typeof value === 'string' && UUID_REGEX.test(value)
}

// Seeded master data from backend migrations (000004 & 000005) used as placeholderData
export const DEFAULT_SHOP_CATEGORIES: readonly Lookup[] = [
  { id: '0b7c1e2a-0001-4000-8000-000000000008', name: 'Bakery' },
  { id: '0b7c1e2a-0001-4000-8000-000000000002', name: 'Kafe & Kedai Kopi' },
  { id: '0b7c1e2a-0001-4000-8000-000000000001', name: 'Makanan & Minuman' },
  { id: '0b7c1e2a-0001-4000-8000-000000000003', name: 'Retail & Toko' },
  { id: '0b7c1e2a-0001-4000-8000-000000000004', name: 'Fashion' },
  { id: '0b7c1e2a-0001-4000-8000-000000000005', name: 'Kecantikan & Perawatan' },
  { id: '0b7c1e2a-0001-4000-8000-000000000006', name: 'Jasa' },
  { id: '0b7c1e2a-0001-4000-8000-000000000007', name: 'Lainnya' },
]

export const DEFAULT_SHOP_SCALES: readonly Lookup[] = [
  { id: '0b7c1e2a-0002-4000-8000-000000000001', name: 'Mikro' },
  { id: '0b7c1e2a-0002-4000-8000-000000000002', name: 'Kecil' },
  { id: '0b7c1e2a-0002-4000-8000-000000000003', name: 'Menengah' },
  { id: '0b7c1e2a-0002-4000-8000-000000000004', name: 'Besar' },
]

export function useShopCategories() {
  return useQuery({
    queryKey: ['public', 'shop-categories'],
    queryFn: fetchShopCategories,
    placeholderData: () => [...DEFAULT_SHOP_CATEGORIES],
    staleTime: 10 * 60 * 1000,
  })
}

export function useShopScales() {
  return useQuery({
    queryKey: ['public', 'shop-scales'],
    queryFn: fetchShopScales,
    placeholderData: () => [...DEFAULT_SHOP_SCALES],
    staleTime: 10 * 60 * 1000,
  })
}

export function usePublicShop(shopId: string | undefined) {
  return useQuery({
    queryKey: ['public', 'shop', shopId],
    queryFn: () => fetchPublicShop(shopId!),
    enabled: isUuid(shopId),
  })
}

export function useSubmitFeedback(shopId: string | undefined) {
  return useMutation({
    mutationFn: (payload: SubmitFeedbackRequest) => {
      if (!shopId) throw new Error('ID toko tidak ditemukan.')
      return submitPublicFeedback(shopId, payload)
    },
  })
}
