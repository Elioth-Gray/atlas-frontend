import { useQuery } from '@tanstack/react-query'

import { fetchIssueDetail, fetchShopDashboard, fetchShopIssues } from '@/api/endpoints'
import type { DashboardQueryParams, IssueListParams } from '@/typings/api'

import { isUuid } from './usePublicShop'

export function useShopDashboard(
  shopId: string | null | undefined,
  params?: DashboardQueryParams,
  enabled = true
) {
  return useQuery({
    queryKey: [
      'owner',
      'dashboard',
      shopId,
      params?.from ?? '',
      params?.to ?? '',
      params?.tz ?? '',
      params?.sentiment ?? '',
      params?.priority ?? '',
    ],
    queryFn: () => fetchShopDashboard(shopId!, params),
    enabled: enabled && isUuid(shopId),
  })
}

export function useShopIssues(
  shopId: string | null | undefined,
  params?: IssueListParams,
  enabled = true
) {
  return useQuery({
    queryKey: [
      'owner',
      'issues',
      shopId,
      params?.page ?? 1,
      params?.page_size ?? 50,
      params?.from ?? '',
      params?.to ?? '',
      params?.tz ?? '',
      params?.sentiment ?? '',
      params?.status ?? '',
    ],
    queryFn: () =>
      fetchShopIssues(shopId!, {
        page: params?.page ?? 1,
        page_size: params?.page_size ?? 50,
        from: params?.from,
        to: params?.to,
        tz: params?.tz,
        sentiment: params?.sentiment,
        status: params?.status,
      }),
    enabled: enabled && isUuid(shopId),
  })
}

export function useIssueDetail(issueId: string | null | undefined, enabled = true) {
  return useQuery({
    queryKey: ['owner', 'issue', issueId],
    queryFn: () => fetchIssueDetail(issueId!),
    enabled: enabled && isUuid(issueId),
  })
}
