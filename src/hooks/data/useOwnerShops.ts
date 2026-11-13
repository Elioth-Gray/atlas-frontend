import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import { updateSessionUser } from '@/api/authSession'
import { fetchMyShopDetail, fetchMyShops, updateMyShopDetail } from '@/api/endpoints'
import type { UpdateShopRequest } from '@/typings/api'

import { isUuid } from './usePublicShop'

export function useMyShops(enabled = true) {
  return useQuery({
    queryKey: ['owner', 'shops'],
    queryFn: () => fetchMyShops({ page: 1, page_size: 50 }),
    enabled,
  })
}

export function useMyShopDetail(shopId: string | null | undefined, enabled = true) {
  return useQuery({
    queryKey: ['owner', 'shop', shopId],
    queryFn: () => fetchMyShopDetail(shopId!),
    enabled: enabled && isUuid(shopId),
  })
}

export function useUpdateMyShop(shopId: string | null | undefined) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (payload: UpdateShopRequest) => {
      if (!isUuid(shopId)) throw new Error('Toko aktif belum dipilih.')
      return updateMyShopDetail(shopId, payload)
    },
    onSuccess: (updatedDetail) => {
      if (updatedDetail.owner) {
        updateSessionUser(updatedDetail.owner)
      }
      queryClient.setQueryData(['owner', 'shop', updatedDetail.shop.id], updatedDetail)
      void queryClient.invalidateQueries({ queryKey: ['owner', 'shops'] })
    },
  })
}
