export interface StatItem {
  label: string
  value: string
  change: string
  suffix: string
}

export const STATS: StatItem[] = [
  { label: 'Total Feedback', value: '2.847', change: '+18,2%', suffix: 'dari periode lalu' },
  { label: 'Baru Minggu Ini', value: '186', change: '+24,5%', suffix: 'dari periode lalu' },
  { label: 'Masalah Prioritas', value: '7', change: '3 baru', suffix: 'dari periode lalu' },
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

export const SENTIMENT_SUMMARY = [
  { label: 'Positif', value: '64%', colorClass: 'bg-sentiment-positive' },
  { label: 'Netral', value: '23%', colorClass: 'bg-sentiment-neutral' },
  { label: 'Negatif', value: '13%', colorClass: 'bg-sentiment-negative' },
]

export interface ComplaintItem {
  label: string
  count: number
  color: string
}

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
  id: number
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
    source: 'Google Maps',
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
    source: 'Google Maps',
    rating: 2,
    text: 'Stafnya buru-buru dan kurang ramah hari ini.',
    group: 'Sikap staf',
    groupColor: '#A785FF',
    received: '5 jam lalu',
    avatarBackground: 'rgba(167, 133, 255, 0.13)',
  },
]
