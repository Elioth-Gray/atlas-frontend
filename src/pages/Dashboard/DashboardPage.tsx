import { PageHeader } from '@/components/layout/PageHeader'
import { APP_NAME } from '@/constants'
import { MOTION } from '@/utils/motion'

import { DashboardFilters } from './components/DashboardFilters'
import { LatestFeedback } from './components/LatestFeedback'
import { SentimentTrendChart } from './components/SentimentTrendChart'
import { StatCard } from './components/StatCard'
import { TopComplaints } from './components/TopComplaints'
import { WeeklyReviewsChart } from './components/WeeklyReviewsChart'
import { STATS } from './dashboardData'

export default function DashboardPage() {
  return (
    <>
      <title>Dashboard — {APP_NAME}</title>

      <div className="flex flex-1 flex-col">
        <PageHeader title="Dashboard" subtitle="Semua feedback, dalam satu tampilan." />

        <main className="mx-auto w-full max-w-[1600px] flex-1 px-4 pt-[22px] pb-[50px] sm:px-7">
          <DashboardFilters />

          <div className="mt-[18px] grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {STATS.map((stat, index) => (
              <StatCard key={stat.label} {...stat} delay={index * MOTION.stagger} />
            ))}
          </div>

          <div className="mt-3 grid gap-3 xl:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
            <div className="flex min-w-0 flex-col gap-3">
              <SentimentTrendChart />
              <TopComplaints />
            </div>
            <WeeklyReviewsChart />
          </div>

          <div className="mt-3">
            <LatestFeedback />
          </div>
        </main>
      </div>
    </>
  )
}
