import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import { ApiError } from '@/api/ApiError'
import {
  fetchConsultationSession,
  fetchShopMemories,
  saveConsultationSession,
  sendConsultationTurn,
  startIssueConsultation,
  updateBusinessMemory,
} from '@/api/endpoints'
import type {
  ListMemoriesParams,
  SaveConsultationRequest,
  StartConsultationRequest,
  TurnRequest,
  UpdateMemoryRequest,
} from '@/typings/api'

import { isUuid } from './usePublicShop'

export function useConsultationSession(sessionId: string | null | undefined, enabled = true) {
  return useQuery({
    queryKey: ['owner', 'consultation', sessionId],
    queryFn: () => fetchConsultationSession(sessionId!),
    enabled: enabled && isUuid(sessionId),
    refetchInterval: (query) => (query.state.data?.is_processing ? 2000 : false),
  })
}

export function useStartConsultation(issueId: string | null | undefined) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (payload: StartConsultationRequest) => {
      if (!isUuid(issueId)) throw new Error('Isu tidak valid.')
      return startIssueConsultation(issueId, payload)
    },
    onSuccess: (session) => {
      queryClient.setQueryData(['owner', 'consultation', session.id], session)
      void queryClient.invalidateQueries({ queryKey: ['owner', 'issue', session.issue_id] })
      void queryClient.invalidateQueries({ queryKey: ['owner', 'issues', session.shop_id] })
    },
  })
}

export function useConsultationTurn(sessionId: string | null | undefined) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (payload: TurnRequest) => {
      if (!isUuid(sessionId)) throw new Error('Sesi konsultasi tidak valid.')
      return sendConsultationTurn(sessionId, payload)
    },
    onSuccess: (session) => {
      queryClient.setQueryData(['owner', 'consultation', session.id], session)
      void queryClient.invalidateQueries({ queryKey: ['owner', 'issue', session.issue_id] })
    },
    onError: (error) => {
      // PRD 6.3: Handle 409 Conflict by seamlessly refetching the latest session state
      if (
        error instanceof ApiError &&
        (error.status === 409 || error.code === 'CONFLICT') &&
        isUuid(sessionId)
      ) {
        void queryClient.invalidateQueries({ queryKey: ['owner', 'consultation', sessionId] })
      }
    },
  })
}

export function useSaveConsultation(sessionId: string | null | undefined) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (payload: SaveConsultationRequest) => {
      if (!isUuid(sessionId)) throw new Error('Sesi konsultasi tidak valid.')
      return saveConsultationSession(sessionId, payload)
    },
    onSuccess: (result) => {
      queryClient.setQueryData(['owner', 'consultation', result.session.id], result.session)
      void queryClient.invalidateQueries({ queryKey: ['owner', 'issue', result.session.issue_id] })
      void queryClient.invalidateQueries({ queryKey: ['owner', 'issues', result.session.shop_id] })
      void queryClient.invalidateQueries({
        queryKey: ['owner', 'memories', result.session.shop_id],
      })
    },
    onError: (error) => {
      if (
        error instanceof ApiError &&
        (error.status === 409 || error.code === 'CONFLICT') &&
        isUuid(sessionId)
      ) {
        void queryClient.invalidateQueries({ queryKey: ['owner', 'consultation', sessionId] })
      }
    },
  })
}

export function useShopMemories(
  shopId: string | null | undefined,
  params?: ListMemoriesParams,
  enabled = true
) {
  return useQuery({
    queryKey: [
      'owner',
      'memories',
      shopId,
      params?.is_active ?? 'all',
      params?.page ?? 1,
      params?.page_size ?? 50,
    ],
    queryFn: () =>
      fetchShopMemories(shopId!, {
        page: params?.page ?? 1,
        page_size: params?.page_size ?? 50,
        is_active: params?.is_active,
      }),
    enabled: enabled && isUuid(shopId),
  })
}

export function useUpdateMemory(shopId: string | null | undefined) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ memoryId, payload }: { memoryId: string; payload: UpdateMemoryRequest }) =>
      updateBusinessMemory(memoryId, payload),
    onSuccess: () => {
      if (isUuid(shopId)) {
        void queryClient.invalidateQueries({ queryKey: ['owner', 'memories', shopId] })
      }
    },
  })
}
