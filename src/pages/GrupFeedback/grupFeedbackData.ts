export const TOTAL_FEEDBACK = '2.847'

export interface FeedbackTopic {
  id: string
  priority: string
  label: string
  count: number
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
    radius: 76,
    colors: ['#DED2FA', '#B398E8', '#9475D1'],
    isPrimary: true,
  },
  {
    id: 'ukuran-porsi',
    priority: 'Tinggi',
    label: 'Ukuran porsi',
    count: 61,
    radius: 53,
    colors: ['#D3E5FC', '#A2C1EF', '#7DA2DB'],
  },
  {
    id: 'sikap-staf',
    priority: 'Tinggi',
    label: 'Sikap staf',
    count: 47,
    radius: 52,
    colors: ['#F8D4E8', '#E6A3C7', '#CE81AD'],
  },
  {
    id: 'rasa-tak-konsisten',
    priority: 'Sedang',
    label: 'Rasa tak konsisten',
    count: 36,
    radius: 53,
    colors: ['#CEF0E9', '#91CABF', '#68AA9D'],
  },
  {
    id: 'harga-kemahalan',
    priority: 'Sedang',
    label: 'Harga kemahalan',
    count: 39,
    radius: 53,
    colors: ['#FFE2C2', '#E9B98A', '#CF9766'],
  },
  {
    id: 'kebersihan',
    priority: 'Sedang',
    label: 'Kebersihan',
    count: 28,
    radius: 50,
    colors: ['#CFF0DD', '#93CBAA', '#68AA86'],
  },
  {
    id: 'pengiriman-telat',
    priority: 'Rendah',
    label: 'Pengiriman telat',
    count: 19,
    radius: 50,
    colors: ['#D8DEFA', '#ABB6E9', '#8997D2'],
  },
]
