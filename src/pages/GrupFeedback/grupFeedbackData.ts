export const TOTAL_FEEDBACK = '2.847'

export interface FeedbackTopic {
  id: string
  priority: string
  label: string
  count: number
  cx: number
  cy: number
  radius: number
  colors: readonly [string, string, string]
  isPrimary?: boolean
}

export const FEEDBACK_TOPICS: FeedbackTopic[] = [
  {
    id: 'layanan-lambat',
    priority: 'Prioritas',
    label: 'Layanan lambat',
    count: 84,
    cx: 490,
    cy: 244,
    radius: 76,
    colors: ['#DED2FA', '#B398E8', '#9475D1'],
    isPrimary: true,
  },
  {
    id: 'ukuran-porsi',
    priority: 'Tinggi',
    label: 'Ukuran porsi',
    count: 61,
    cx: 263,
    cy: 109,
    radius: 53,
    colors: ['#D3E5FC', '#A2C1EF', '#7DA2DB'],
  },
  {
    id: 'sikap-staf',
    priority: 'Tinggi',
    label: 'Sikap staf',
    count: 47,
    cx: 714,
    cy: 106,
    radius: 52,
    colors: ['#F8D4E8', '#E6A3C7', '#CE81AD'],
  },
  {
    id: 'rasa-tak-konsisten',
    priority: 'Sedang',
    label: 'Rasa tak konsisten',
    count: 36,
    cx: 723,
    cy: 404,
    radius: 53,
    colors: ['#CEF0E9', '#91CABF', '#68AA9D'],
  },
  {
    id: 'harga-kemahalan',
    priority: 'Sedang',
    label: 'Harga kemahalan',
    count: 39,
    cx: 331,
    cy: 423,
    radius: 53,
    colors: ['#FFE2C2', '#E9B98A', '#CF9766'],
  },
  {
    id: 'kebersihan',
    priority: 'Sedang',
    label: 'Kebersihan',
    count: 28,
    cx: 128,
    cy: 295,
    radius: 50,
    colors: ['#CFF0DD', '#93CBAA', '#68AA86'],
  },
  {
    id: 'pengiriman-telat',
    priority: 'Rendah',
    label: 'Pengiriman telat',
    count: 19,
    cx: 862,
    cy: 240,
    radius: 50,
    colors: ['#D8DEFA', '#ABB6E9', '#8997D2'],
  },
]

export interface SolutionMetric {
  label: string
  value: string
  width: number
}

export const FEATURED_SOLUTION = {
  topic: 'Layanan lambat',
  title: 'Percepat layanan di jam ramai',
  feedbackCount: 84,
  impact: 'Pendapatan & retensi',
  urgency: 'Segera',
  effort: 'Rendah · 2 minggu',
  confidence: 92,
  customerSummary:
    'Antrean lama dan layanan kurang sigap terjadi Sabtu–Minggu pukul 09–11. Pelanggan tetap menilai kualitas produk tinggi.',
  quote: '“Kopinya selalu enak, tapi nunggu 20 menit bikin mikir lagi buat balik.”',
  cause:
    'Staf akhir pekan tetap sama, padahal pesanan naik 31% dalam 6 minggu. Kapasitas kasir jadi hambatan utama.',
  actionTitle: 'Uji coba staf jam ramai selama 2 minggu',
  actionDescription:
    'Tambah 1 staf dengan pelatihan lintas tugas di kasir pukul 09–11 tiap akhir pekan. Tugaskan pencatat pesanan khusus saat ramai, lalu bandingkan rata-rata waktu proses pesanan dengan acuan saat ini: 14 menit.',
  target: 'Waktu tunggu turun 35–45%; kunjungan ulang pelanggan terdampak diprediksi naik 8–12%.',
  score: '9,2',
  scoreLabel: 'Sangat direkomendasikan',
  scoreDescription: 'Potensi dampak besar, mudah diterapkan.',
  scoreMetrics: [
    { label: 'Dampak', value: '94%', width: 94 },
    { label: 'Kelayakan', value: '88%', width: 88 },
    { label: 'Kecepatan', value: '92%', width: 92 },
  ] satisfies SolutionMetric[],
} as const

export function createSolutionSummary() {
  const scoreLines = FEATURED_SOLUTION.scoreMetrics
    .map((metric) => `- ${metric.label}: ${metric.value}`)
    .join('\n')

  return [
    'ATLAS - Ringkasan Solusi Feedback AI',
    '',
    `Topik: ${FEATURED_SOLUTION.topic} (${FEATURED_SOLUTION.feedbackCount} sebutan)`,
    `Rekomendasi: ${FEATURED_SOLUTION.title}`,
    `Dampak bisnis: ${FEATURED_SOLUTION.impact}`,
    `Urgensi: ${FEATURED_SOLUTION.urgency}`,
    `Estimasi upaya: ${FEATURED_SOLUTION.effort}`,
    `Keyakinan AI: ${FEATURED_SOLUTION.confidence}%`,
    '',
    'Saran tindakan:',
    FEATURED_SOLUTION.actionTitle,
    FEATURED_SOLUTION.actionDescription,
    '',
    'Target hasil:',
    FEATURED_SOLUTION.target,
    '',
    `Skor solusi: ${FEATURED_SOLUTION.score}/10 (${FEATURED_SOLUTION.scoreLabel})`,
    scoreLines,
  ].join('\n')
}
