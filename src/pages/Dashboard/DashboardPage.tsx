import { useMemo } from 'react'
import { useSearchParams } from 'react-router'

import { PageHeader } from '@/components/layout/PageHeader'
import { APP_NAME } from '@/constants'
import { useAuth } from '@/contexts/AuthContext'
import { useShopDashboard } from '@/hooks/data/useInsights'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'
import type { DashboardQueryParams } from '@/typings/api'
import { computeDateRange } from '@/utils/format'
import { MOTION } from '@/utils/motion'

import type { DashboardFilterState } from './components/DashboardFilters'
import { DashboardFilters, DEFAULT_DASHBOARD_FILTERS } from './components/DashboardFilters'
import { LatestFeedback } from './components/LatestFeedback'
import { SentimentTrendChart } from './components/SentimentTrendChart'
import { StatCard } from './components/StatCard'
import { TopComplaints } from './components/TopComplaints'
import { WeeklyReviewsChart } from './components/WeeklyReviewsChart'
import {
  EMPTY_DASHBOARD_DATA,
  LATEST_FEEDBACK,
  mapDashboardData,
  SENTIMENT_SUMMARY,
  SENTIMENT_TREND,
  STATS,
  TOP_COMPLAINTS,
  WEEKLY_REVIEWS,
} from './dashboardData'

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

export default function DashboardPage() {
  useDocumentTitle(`Dashboard | ${APP_NAME}`)
  const { activeShopId, isAuthenticated, searchQuery } = useAuth()
  const [searchParams, setSearchParams] = useSearchParams()

  const filters = useMemo<DashboardFilterState>(() => {
    const rawPeriod = searchParams.get('period') ?? ''
    return {
      period: PERIOD_FROM_QUERY[rawPeriod] ?? DEFAULT_DASHBOARD_FILTERS.period,
    }
  }, [searchParams])

  function handleFiltersChange(next: DashboardFilterState) {
    const nextParams = new URLSearchParams(searchParams)
    const periodParam = PERIOD_TO_QUERY[next.period]
    if (periodParam && next.period !== DEFAULT_DASHBOARD_FILTERS.period) {
      nextParams.set('period', periodParam)
    } else {
      nextParams.delete('period')
    }
    setSearchParams(nextParams, { replace: true })
  }

  const dashboardQueryParams = useMemo<DashboardQueryParams>(
    () => computeDateRange(filters.period),
    [filters.period]
  )

  const { data: dashboard } = useShopDashboard(activeShopId, dashboardQueryParams, isAuthenticated)

  const mapped = useMemo(() => {
    if (dashboard) return mapDashboardData(dashboard)
    if (isAuthenticated) return EMPTY_DASHBOARD_DATA
    return null
  }, [dashboard, isAuthenticated])

  const stats = mapped?.stats ?? STATS
  const sentimentTrend = mapped?.sentimentTrend ?? SENTIMENT_TREND
  const sentimentSummary = mapped?.sentimentSummary ?? SENTIMENT_SUMMARY
  const weeklyReviews = mapped?.weeklyReviews ?? WEEKLY_REVIEWS
  const totalNegative = mapped?.totalNegativeOpinions ?? 312

  const filteredComplaints = useMemo(() => {
    const base = mapped?.topComplaints ?? TOP_COMPLAINTS
    const q = searchQuery.trim().toLowerCase()
    return base.filter((item) => {
      if (q && !item.label.toLowerCase().includes(q)) return false
      return true
    })
  }, [mapped?.topComplaints, searchQuery])

  const filteredFeedbacks = useMemo(() => {
    const base = mapped?.latestFeedback ?? LATEST_FEEDBACK
    const q = searchQuery.trim().toLowerCase()
    return base.filter((fb) => {
      if (
        q &&
        !fb.text.toLowerCase().includes(q) &&
        !fb.name.toLowerCase().includes(q) &&
        !fb.group.toLowerCase().includes(q)
      ) {
        return false
      }
      return true
    })
  }, [mapped?.latestFeedback, searchQuery])

  return (
    <div className="flex flex-1 flex-col">
      <PageHeader title="Dashboard" subtitle="Semua feedback, dalam satu tampilan." />

      <main className="mx-auto w-full max-w-[1600px] flex-1 px-4 pt-[22px] pb-[50px] sm:px-7">
        <DashboardFilters filters={filters} onChange={handleFiltersChange} />

        <div className="mt-[18px] grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat, index) => (
            <StatCard key={stat.label} {...stat} delay={index * MOTION.stagger} />
          ))}
        </div>

        <div className="mt-3 grid gap-3 xl:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
          <div className="flex min-w-0 flex-col gap-3">
            <SentimentTrendChart trend={sentimentTrend} summaryItems={sentimentSummary} />
            <TopComplaints complaints={filteredComplaints} totalNegative={totalNegative} />
          </div>
          <WeeklyReviewsChart days={weeklyReviews} />
        </div>

        <div className="mt-3">
          <LatestFeedback items={filteredFeedbacks} />
        </div>
      </main>
    </div>
  )
}
