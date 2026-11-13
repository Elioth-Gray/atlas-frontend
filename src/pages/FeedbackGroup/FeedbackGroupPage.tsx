import { useMemo } from 'react'
import { useSearchParams } from 'react-router'

import { PageHeader } from '@/components/layout/PageHeader'
import { APP_NAME } from '@/constants'
import { useAuth } from '@/contexts/AuthContext'
import { useShopDashboard, useShopIssues } from '@/hooks/data/useInsights'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'
import type { IssueListParams, PlanetStatus } from '@/typings/api'
import { computeDateRange, formatPlanetStatus } from '@/utils/format'

import type { FeedbackFilterState } from './components/FeedbackFilters'
import { DEFAULT_FEEDBACK_FILTERS, FeedbackFilters } from './components/FeedbackFilters'
import { FeedbackMap } from './components/FeedbackMap'
import { FEEDBACK_TOPICS, mapIssuesToTopics, TOTAL_FEEDBACK } from './feedbackGroupData'

const PERIOD_FROM_QUERY: Record<string, string> = {
  '7d': '7 hari terakhir',
  '30d': '30 hari terakhir',
  '90d': '90 hari terakhir',
  'all': 'Semua waktu',
  '7 hari terakhir': '7 hari terakhir',
  '30 hari terakhir': '30 hari terakhir',
  '90 hari terakhir': '90 hari terakhir',
  'Semua waktu': 'Semua waktu',
}

const PERIOD_TO_QUERY: Record<string, string> = {
  '7 hari terakhir': '7d',
  '30 hari terakhir': '30d',
  '90 hari terakhir': '90d',
  'Semua waktu': 'all',
}

const STATUS_FROM_QUERY: Record<string, string> = {
  'unconsulted': 'Belum dikonsultasikan',
  'consulted': 'Sudah dikonsultasikan',
  'new_reviews': 'Ada ulasan baru',
  'UNCONSULTED': 'Belum dikonsultasikan',
  'CONSULTED': 'Sudah dikonsultasikan',
  'HAS_NEW_REVIEWS': 'Ada ulasan baru',
  'Belum dikonsultasikan': 'Belum dikonsultasikan',
  'Sudah dikonsultasikan': 'Sudah dikonsultasikan',
  'Ada ulasan baru': 'Ada ulasan baru',
}

const STATUS_TO_QUERY: Record<string, string> = {
  'Belum dikonsultasikan': 'unconsulted',
  'Sudah dikonsultasikan': 'consulted',
  'Ada ulasan baru': 'new_reviews',
}

const STATUS_TO_API: Record<string, PlanetStatus> = {
  'Belum dikonsultasikan': 'UNCONSULTED',
  'Sudah dikonsultasikan': 'CONSULTED',
  'Ada ulasan baru': 'HAS_NEW_REVIEWS',
}

export default function FeedbackGroupPage() {
  useDocumentTitle(`Grup Feedback & Solusi AI | ${APP_NAME}`)
  const { activeShopId, isAuthenticated, searchQuery } = useAuth()
  const [searchParams, setSearchParams] = useSearchParams()

  const filters = useMemo<FeedbackFilterState>(() => {
    const rawPeriod = searchParams.get('period') ?? ''
    const rawStatus = searchParams.get('status') ?? ''

    return {
      period: PERIOD_FROM_QUERY[rawPeriod] ?? DEFAULT_FEEDBACK_FILTERS.period,
      status: STATUS_FROM_QUERY[rawStatus] ?? DEFAULT_FEEDBACK_FILTERS.status,
    }
  }, [searchParams])

  function handleFiltersChange(next: FeedbackFilterState) {
    const nextParams = new URLSearchParams(searchParams)

    const periodParam = PERIOD_TO_QUERY[next.period]
    if (periodParam && next.period !== DEFAULT_FEEDBACK_FILTERS.period) {
      nextParams.set('period', periodParam)
    } else {
      nextParams.delete('period')
    }

    const statusParam = STATUS_TO_QUERY[next.status]
    if (statusParam) {
      nextParams.set('status', statusParam)
    } else {
      nextParams.delete('status')
    }

    setSearchParams(nextParams, { replace: true })
  }

  const issueQueryParams = useMemo<IssueListParams>(() => {
    const range = computeDateRange(filters.period)
    return {
      page: 1,
      page_size: 50,
      ...range,
      sentiment: 'Negative',
      status: STATUS_TO_API[filters.status],
    }
  }, [filters.period, filters.status])

  const issuesQuery = useShopIssues(activeShopId, issueQueryParams, isAuthenticated)
  const dashboardQuery = useShopDashboard(
    activeShopId,
    computeDateRange(filters.period),
    isAuthenticated
  )

  const baseTopics = useMemo(() => {
    if (isAuthenticated) {
      return issuesQuery.data ? mapIssuesToTopics(issuesQuery.data.data) : []
    }
    if (issuesQuery.data && issuesQuery.data.data.length > 0) {
      return mapIssuesToTopics(issuesQuery.data.data)
    }
    return FEEDBACK_TOPICS
  }, [isAuthenticated, issuesQuery.data])

  const filteredTopics = useMemo(() => {
    const q = searchQuery.trim().toLowerCase()

    return baseTopics.filter((topic) => {
      if (topic.negativeCount <= 0) return false
      if (q && !topic.label.toLowerCase().includes(q)) return false
      if (filters.status !== 'Semua status') {
        const label = formatPlanetStatus(topic.planetStatus)
        if (label !== filters.status) return false
      }
      return true
    })
  }, [baseTopics, filters.status, searchQuery])

  const totalFeedbackText = useMemo(() => {
    if (dashboardQuery.data) {
      return dashboardQuery.data.kpi.sentiment.negative.toLocaleString('id-ID')
    }
    if (issuesQuery.data) {
      const sum = issuesQuery.data.data.reduce(
        (acc, item) => acc + item.stats.sentiment.negative,
        0
      )
      return sum.toLocaleString('id-ID')
    }
    if (isAuthenticated) {
      return '0'
    }
    return TOTAL_FEEDBACK
  }, [dashboardQuery.data, isAuthenticated, issuesQuery.data])

  return (
    <div className="flex flex-1 flex-col">
      <PageHeader
        title="Grup Feedback & Solusi AI"
        subtitle="Jelajahi grup feedback dan temukan solusi AI dalam satu halaman."
      />

      <main className="mx-auto w-full max-w-[1600px] flex-1 px-4 pt-[22px] pb-[50px] sm:px-7">
        <FeedbackFilters filters={filters} onChange={handleFiltersChange} />
        <div className="mt-[18px]">
          <FeedbackMap topics={filteredTopics} totalFeedbackText={totalFeedbackText} />
        </div>
      </main>
    </div>
  )
}
