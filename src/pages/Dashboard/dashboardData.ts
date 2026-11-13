import type { Dashboard } from '@/typings/api'
import { formatRelativeTime, formatShortDate, getInitials } from '@/utils/format'

export interface StatItem {
  label: string
  value: string
  change: string
  suffix: string
}

export const STATS: StatItem[] = [
  { label: 'Total Feedback', value: '2.847', change: '+18,2%', suffix: 'dari periode lalu' },
  { label: 'Baru Minggu Ini', value: '186', change: '+24,5%', suffix: 'dari periode lalu' },
  { label: 'Opini Negatif', value: '242', change: '65 kritis', suffix: 'dari 7 topik isu' },
  { label: 'Masalah Selesai', value: '48', change: '+8 bulan', suffix: 'ini dari periode lalu' },
]

export interface SentimentPoint {
  label: string
  positive: number
  neutral: number
  negative: number
}

export const SENTIMENT_TREND: SentimentPoint[] = [
  { label: '1 Jun', positive: 52, neutral: 30, negative: 18 },
  { label: '7 Jun', positive: 61, neutral: 26, negative: 13 },
  { label: '13 Jun', positive: 57, neutral: 31, negative: 12 },
  { label: '19 Jun', positive: 70, neutral: 20, negative: 10 },
  { label: '25 Jun', positive: 66, neutral: 22, negative: 12 },
  { label: '30 Jun', positive: 72, neutral: 19, negative: 9 },
]

export interface SentimentSummaryItem {
  label: string
  value: string
  colorClass: string
}

export const SENTIMENT_SUMMARY: SentimentSummaryItem[] = [
  { label: 'Positif', value: '64%', colorClass: 'bg-sentiment-positive' },
  { label: 'Netral', value: '23%', colorClass: 'bg-sentiment-neutral' },
  { label: 'Negatif', value: '13%', colorClass: 'bg-sentiment-negative' },
]

export interface ComplaintItem {
  issueId?: string
  label: string
  count: number
  color: string
  severeCount?: number
}

export const COMPLAINT_COLORS = ['#9D76FF', '#658EFF', '#EE72B5', '#F5B95C', '#55D8B0'] as const

export const TOP_COMPLAINTS: ComplaintItem[] = [
  { label: 'Layanan lambat', count: 84, color: '#9D76FF' },
  { label: 'Ukuran porsi', count: 61, color: '#658EFF' },
  { label: 'Sikap staf', count: 47, color: '#EE72B5' },
  { label: 'Harga kemahalan', count: 39, color: '#F5B95C' },
  { label: 'Kebersihan', count: 28, color: '#55D8B0' },
]

export interface ReviewDay {
  label: string
  qr: number
  google: number
  highlighted?: boolean
}

export const WEEKLY_REVIEWS: ReviewDay[] = [
  { label: 'Sen', qr: 10, google: 6 },
  { label: 'Sel', qr: 15, google: 9 },
  { label: 'Rab', qr: 11, google: 7 },
  { label: 'Kam', qr: 21, google: 12 },
  { label: 'Jum', qr: 17, google: 10 },
  { label: 'Sab', qr: 24, google: 13, highlighted: true },
  { label: 'Min', qr: 20, google: 11 },
]

export interface FeedbackItem {
  id: string | number
  name: string
  initials: string
  source: string
  rating: number
  text: string
  group: string
  groupColor: string
  received: string
  avatarBackground: string
}

export const LATEST_FEEDBACK: FeedbackItem[] = [
  {
    id: 1,
    name: 'Maya Chen',
    initials: 'MC',
    source: 'Feedback QR',
    rating: 2,
    text: 'Nunggu lebih dari 20 menit baru pesanan dicatat.',
    group: 'Layanan lambat',
    groupColor: '#FD72AB',
    received: '12 menit lalu',
    avatarBackground: 'rgba(253, 114, 171, 0.13)',
  },
  {
    id: 2,
    name: 'Leo Martin',
    initials: 'LM',
    source: 'Feedback QR',
    rating: 5,
    text: 'Flat white terenak di kota ini. Blend barunya mantap!',
    group: 'Kualitas produk',
    groupColor: '#55D8B0',
    received: '1 jam lalu',
    avatarBackground: 'rgba(85, 216, 176, 0.13)',
  },
  {
    id: 3,
    name: 'Sophie R.',
    initials: 'SR',
    source: 'Feedback QR',
    rating: 3,
    text: 'Tempatnya asyik, tapi belakangan porsinya mengecil.',
    group: 'Ukuran porsi',
    groupColor: '#F6B85C',
    received: '3 jam lalu',
    avatarBackground: 'rgba(246, 184, 92, 0.13)',
  },
  {
    id: 4,
    name: 'Daniel Kim',
    initials: 'DK',
    source: 'Feedback QR',
    rating: 2,
    text: 'Stafnya buru-buru dan kurang ramah hari ini.',
    group: 'Sikap staf',
    groupColor: '#A785FF',
    received: '5 jam lalu',
    avatarBackground: 'rgba(167, 133, 255, 0.13)',
  },
]

const AVATAR_BACKGROUNDS = [
  'rgba(253, 114, 171, 0.13)',
  'rgba(85, 216, 176, 0.13)',
  'rgba(246, 184, 92, 0.13)',
  'rgba(167, 133, 255, 0.13)',
] as const

const GROUP_COLORS = ['#FD72AB', '#55D8B0', '#F6B85C', '#A785FF'] as const
const DAY_LABELS = ['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min'] as const

export const EMPTY_DASHBOARD_DATA = {
  stats: [
    { label: 'Total Feedback', value: '0', change: '★ 0.0', suffix: 'dari 0 opini' },
    { label: 'Baru Minggu Ini', value: '0', change: '★ 0.0', suffix: 'minggu berjalan' },
    { label: 'Opini Negatif', value: '0', change: '0 kritis', suffix: 'dari 0 topik isu' },
    { label: 'Rasio Sentimen', value: '0%', change: '0.0/5', suffix: 'sentimen positif' },
  ] satisfies StatItem[],
  sentimentSummary: [
    { label: 'Positif', value: '0%', colorClass: 'bg-sentiment-positive' },
    { label: 'Netral', value: '0%', colorClass: 'bg-sentiment-neutral' },
    { label: 'Negatif', value: '0%', colorClass: 'bg-sentiment-negative' },
  ] satisfies SentimentSummaryItem[],
  sentimentTrend: DAY_LABELS.map((label) => ({
    label,
    positive: 0,
    neutral: 0,
    negative: 0,
  })) satisfies SentimentPoint[],
  topComplaints: [] as ComplaintItem[],
  totalNegativeOpinions: 0,
  weeklyReviews: DAY_LABELS.map((label) => ({
    label,
    qr: 0,
    google: 0,
    highlighted: false,
  })) satisfies ReviewDay[],
  latestFeedback: [] as FeedbackItem[],
}

export function mapDashboardData(dashboard: Dashboard) {
  const { kpi } = dashboard
  const totalSentiment = kpi.sentiment.positive + kpi.sentiment.neutral + kpi.sentiment.negative
  const posPct =
    totalSentiment > 0 ? Math.round((kpi.sentiment.positive / totalSentiment) * 100) : 0
  const neuPct = totalSentiment > 0 ? Math.round((kpi.sentiment.neutral / totalSentiment) * 100) : 0
  const negPct = totalSentiment > 0 ? Math.max(0, 100 - posPct - neuPct) : 0

  const latestWeek = dashboard.weekly_reviews[dashboard.weekly_reviews.length - 1]
  const weeklyCount = latestWeek?.feedback_count ?? kpi.total_feedbacks

  const stats: StatItem[] = [
    {
      label: 'Total Feedback',
      value: kpi.total_feedbacks.toLocaleString('id-ID'),
      change: `★ ${kpi.average_rating.toFixed(1)}`,
      suffix: `dari ${kpi.total_opinions} opini`,
    },
    {
      label: 'Baru Minggu Ini',
      value: weeklyCount.toLocaleString('id-ID'),
      change: `★ ${(latestWeek?.average_rating ?? kpi.average_rating).toFixed(1)}`,
      suffix: 'minggu berjalan',
    },
    {
      label: 'Opini Negatif',
      value: kpi.sentiment.negative.toLocaleString('id-ID'),
      change: `${kpi.severe_opinions} kritis`,
      suffix: `dari ${kpi.active_issues} topik isu`,
    },
    {
      label: 'Rasio Sentimen',
      value: `${posPct}%`,
      change: `${kpi.average_rating.toFixed(1)}/5`,
      suffix: 'sentimen positif',
    },
  ]

  const sentimentSummary: SentimentSummaryItem[] = [
    { label: 'Positif', value: `${posPct}%`, colorClass: 'bg-sentiment-positive' },
    { label: 'Netral', value: `${neuPct}%`, colorClass: 'bg-sentiment-neutral' },
    { label: 'Negatif', value: `${negPct}%`, colorClass: 'bg-sentiment-negative' },
  ]

  const step = Math.max(1, Math.floor(dashboard.sentiment_trend.length / 6))
  const sampledTrend = dashboard.sentiment_trend.filter(
    (_, idx) => idx % step === 0 || idx === dashboard.sentiment_trend.length - 1
  )

  const sentimentTrend: SentimentPoint[] =
    sampledTrend.length > 0
      ? sampledTrend.map((point) => {
          const dayTotal = point.positive + point.neutral + point.negative
          if (dayTotal === 0) {
            return {
              label: formatShortDate(point.date),
              positive: 0,
              neutral: 0,
              negative: 0,
            }
          }
          const p = Math.round((point.positive / dayTotal) * 100)
          const n = Math.round((point.neutral / dayTotal) * 100)
          return {
            label: formatShortDate(point.date),
            positive: p,
            neutral: n,
            negative: Math.max(0, 100 - p - n),
          }
        })
      : SENTIMENT_TREND

  const topComplaints: ComplaintItem[] = dashboard.top_complaints.map((item, idx) => ({
    issueId: item.issue_id,
    label: item.title,
    count: item.negative_opinions,
    severeCount: item.severe_opinions,
    color: COMPLAINT_COLORS[idx % COMPLAINT_COLORS.length],
  }))

  // Aggregate daily opinion/feedback activity by day of week (Mon-Sun) or weekly buckets
  const dayBuckets = [0, 0, 0, 0, 0, 0, 0]
  dashboard.sentiment_trend.forEach((pt) => {
    const dt = new Date(`${pt.date}T00:00:00Z`)
    if (!Number.isNaN(dt.getTime())) {
      const mondayIdx = (dt.getUTCDay() + 6) % 7
      dayBuckets[mondayIdx] += pt.positive + pt.neutral + pt.negative
    }
  })
  const maxDayCount = Math.max(...dayBuckets, 0)
  const weeklyReviews: ReviewDay[] = DAY_LABELS.map((label, idx) => ({
    label,
    qr: dayBuckets[idx],
    google: 0,
    highlighted: maxDayCount > 0 && dayBuckets[idx] === maxDayCount,
  }))

  const defaultTopTitle = dashboard.top_complaints[0]?.title ?? 'Feedback pelanggan'
  const latestFeedback: FeedbackItem[] = dashboard.recent_feedbacks.map((fb, idx) => {
    const displayName = fb.name?.trim() ? fb.name.trim() : 'Anonim'
    const ratingLabel =
      fb.rating >= 4 ? 'Apresiasi pelanggan' : fb.rating <= 2.5 ? defaultTopTitle : 'Masukan umum'
    return {
      id: fb.id,
      name: displayName,
      initials: getInitials(displayName),
      source: 'Feedback QR',
      rating: Math.round(fb.rating),
      text: fb.feedback,
      group: ratingLabel,
      groupColor: GROUP_COLORS[idx % GROUP_COLORS.length],
      received: formatRelativeTime(fb.created_at),
      avatarBackground: AVATAR_BACKGROUNDS[idx % AVATAR_BACKGROUNDS.length],
    }
  })

  return {
    stats,
    sentimentSummary,
    sentimentTrend,
    topComplaints,
    totalNegativeOpinions: kpi.sentiment.negative,
    weeklyReviews,
    latestFeedback,
  }
}
