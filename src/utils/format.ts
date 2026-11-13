import type { PlanetStatus, ShopRole } from '@/typings/api'

const MONTHS_SHORT_ID = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'Mei',
  'Jun',
  'Jul',
  'Agu',
  'Sep',
  'Okt',
  'Nov',
  'Des',
] as const

export function getInitials(name: string | null | undefined, fallback = 'AN'): string {
  if (!name || !name.trim()) return fallback
  const parts = name.trim().split(/\s+/)
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase()
  return `${parts[0][0] ?? ''}${parts[parts.length - 1][0] ?? ''}`.toUpperCase()
}

export function formatShopRole(role: ShopRole | null | undefined): string {
  if (role === 'Employee') return 'Karyawan'
  return 'Pemilik bisnis'
}

export function formatPlanetStatus(status: PlanetStatus | undefined): string {
  switch (status) {
    case 'CONSULTED':
      return 'Sudah dikonsultasikan'
    case 'HAS_NEW_REVIEWS':
      return 'Ada ulasan baru'
    case 'UNCONSULTED':
    default:
      return 'Belum dikonsultasikan'
  }
}

export function formatRelativeTime(isoDate: string): string {
  const timestamp = Date.parse(isoDate)
  if (Number.isNaN(timestamp)) return isoDate

  const diffSeconds = Math.max(0, Math.floor((Date.now() - timestamp) / 1000))
  if (diffSeconds < 60) return 'Baru saja'
  const diffMinutes = Math.floor(diffSeconds / 60)
  if (diffMinutes < 60) return `${diffMinutes} menit lalu`
  const diffHours = Math.floor(diffMinutes / 60)
  if (diffHours < 24) return `${diffHours} jam lalu`
  const diffDays = Math.floor(diffHours / 24)
  if (diffDays < 30) return `${diffDays} hari lalu`

  const date = new Date(timestamp)
  return `${date.getUTCDate()} ${MONTHS_SHORT_ID[date.getUTCMonth()] ?? ''} ${date.getUTCFullYear()}`
}

export function formatShortDate(dateStr: string): string {
  const parts = dateStr.split('-')
  if (parts.length !== 3) return dateStr
  const monthIdx = Number(parts[1]) - 1
  const day = Number(parts[2])
  const monthLabel = MONTHS_SHORT_ID[monthIdx]
  if (!monthLabel || Number.isNaN(day)) return dateStr
  return `${day} ${monthLabel}`
}

function toIsoDateString(date: Date): string {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

export function computeDateRange(periodLabel: string): {
  from: string
  to: string
  tz: string
} {
  const now = new Date()
  const to = toIsoDateString(now)
  const fromDate = new Date(now)

  if (periodLabel.includes('7')) {
    fromDate.setDate(now.getDate() - 6)
  } else if (periodLabel.includes('90')) {
    fromDate.setDate(now.getDate() - 89)
  } else if (periodLabel.toLowerCase().includes('semua')) {
    fromDate.setDate(now.getDate() - 364)
  } else {
    fromDate.setDate(now.getDate() - 29)
  }

  return {
    from: toIsoDateString(fromDate),
    to,
    tz: 'Asia/Jakarta',
  }
}
