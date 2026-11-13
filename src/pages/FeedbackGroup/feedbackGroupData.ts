import type {
  IssueSummary,
  PlanetStatus,
  SentimentBreakdown,
  SeverityBreakdown,
} from '@/typings/api'

export const TOTAL_FEEDBACK = '242'

export interface FeedbackTopic {
  id: string
  label: string
  count: number
  radius: number
  colors: readonly [string, string, string]
  isPrimary?: boolean
  planetStatus: PlanetStatus
  uniqueFeedbackCount: number
  negativeCount: number
  severeCount: number
  averageRating?: number
  latestOpinionAt?: string | null
  sentiment?: SentimentBreakdown
  severity?: SeverityBreakdown
}

const PLANET_PALETTES: readonly (readonly [string, string, string])[] = [
  ['#DED2FA', '#B398E8', '#9475D1'],
  ['#D3E5FC', '#A2C1EF', '#7DA2DB'],
  ['#F8D4E8', '#E6A3C7', '#CE81AD'],
  ['#CEF0E9', '#91CABF', '#68AA9D'],
  ['#FFE2C2', '#E9B98A', '#CF9766'],
  ['#CFF0DD', '#93CBAA', '#68AA86'],
  ['#D8DEFA', '#ABB6E9', '#8997D2'],
]

export function mapIssuesToTopics(issues: IssueSummary[]): FeedbackTopic[] {
  const negativeIssues = issues.filter((issue) => issue.stats.sentiment.negative > 0)
  if (negativeIssues.length === 0) return []

  const sorted = [...negativeIssues].sort(
    (a, b) => b.stats.sentiment.negative - a.stats.sentiment.negative
  )
  const maxNegativeCount = Math.max(...sorted.map((item) => item.stats.sentiment.negative), 1)

  return sorted.map((issue, index) => {
    const negativeCount = issue.stats.sentiment.negative
    const ratio = negativeCount / maxNegativeCount
    const isPrimary = index === 0
    const radius = isPrimary ? 76 : Math.round(50 + ratio * 14)

    return {
      id: issue.id,
      label: issue.title,
      count: negativeCount,
      radius,
      colors: PLANET_PALETTES[index % PLANET_PALETTES.length] ?? PLANET_PALETTES[0],
      isPrimary,
      planetStatus: issue.planet_status,
      uniqueFeedbackCount: issue.stats.unique_feedback_count,
      negativeCount,
      severeCount: issue.stats.severity.severe,
      averageRating: issue.stats.average_rating,
      latestOpinionAt: issue.stats.last_feedback_at,
      sentiment: {
        negative: negativeCount,
        positive: 0,
        neutral: 0,
      },
      severity: issue.stats.severity,
    }
  })
}

export const FEEDBACK_TOPICS: FeedbackTopic[] = [
  {
    id: 'layanan-lambat',
    label: 'Layanan lambat',
    count: 68,
    uniqueFeedbackCount: 61,
    negativeCount: 68,
    severeCount: 19,
    planetStatus: 'UNCONSULTED',
    radius: 76,
    colors: ['#DED2FA', '#B398E8', '#9475D1'],
    isPrimary: true,
  },
  {
    id: 'ukuran-porsi',
    label: 'Ukuran porsi',
    count: 49,
    uniqueFeedbackCount: 44,
    negativeCount: 49,
    severeCount: 11,
    planetStatus: 'UNCONSULTED',
    radius: 53,
    colors: ['#D3E5FC', '#A2C1EF', '#7DA2DB'],
  },
  {
    id: 'sikap-staf',
    label: 'Sikap staf',
    count: 39,
    uniqueFeedbackCount: 36,
    negativeCount: 39,
    severeCount: 14,
    planetStatus: 'UNCONSULTED',
    radius: 52,
    colors: ['#F8D4E8', '#E6A3C7', '#CE81AD'],
  },
  {
    id: 'rasa-tak-konsisten',
    label: 'Rasa tak konsisten',
    count: 28,
    uniqueFeedbackCount: 25,
    negativeCount: 28,
    severeCount: 7,
    planetStatus: 'CONSULTED',
    radius: 53,
    colors: ['#CEF0E9', '#91CABF', '#68AA9D'],
  },
  {
    id: 'harga-kemahalan',
    label: 'Harga kemahalan',
    count: 31,
    uniqueFeedbackCount: 29,
    negativeCount: 31,
    severeCount: 5,
    planetStatus: 'UNCONSULTED',
    radius: 53,
    colors: ['#FFE2C2', '#E9B98A', '#CF9766'],
  },
  {
    id: 'kebersihan',
    label: 'Kebersihan',
    count: 22,
    uniqueFeedbackCount: 20,
    negativeCount: 22,
    severeCount: 6,
    planetStatus: 'UNCONSULTED',
    radius: 50,
    colors: ['#CFF0DD', '#93CBAA', '#68AA86'],
  },
  {
    id: 'pengiriman-telat',
    label: 'Pengiriman telat',
    count: 15,
    uniqueFeedbackCount: 14,
    negativeCount: 15,
    severeCount: 3,
    planetStatus: 'HAS_NEW_REVIEWS',
    radius: 50,
    colors: ['#D8DEFA', '#ABB6E9', '#8997D2'],
  },
]
