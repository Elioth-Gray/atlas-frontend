import { describe, expect, it } from 'vitest'

import { clearAuthSession, getAuthSession, setAuthFromResponse } from '@/api/authSession'
import { mapShopDetailToFormValues } from '@/pages/BusinessAccount/businessAccountData'
import { mapDashboardData } from '@/pages/Dashboard/dashboardData'
import { mapIssuesToTopics } from '@/pages/FeedbackGroup/feedbackGroupData'
import type { AuthResponse, Dashboard, IssueSummary, ShopDetail } from '@/typings/api'

describe('REST contract mappers & auth session', () => {
  it('stores and clears auth session tokens and active shop ID', () => {
    clearAuthSession()
    expect(getAuthSession()).toBeNull()

    const mockAuth: AuthResponse = {
      token_type: 'Bearer',
      access_token: 'jwt-access-123',
      access_token_expires_at: '2026-12-01T00:00:00Z',
      refresh_token: 'jwt-refresh-456',
      refresh_token_expires_at: '2026-12-30T00:00:00Z',
      user: {
        id: '0b7c1e2a-0000-4000-8000-000000000001',
        name: 'Budi Santoso',
        email: 'budi@kopinusantara.id',
        phone_number: '+628123456789',
      },
      shop: {
        id: '0b7c1e2a-0000-4000-8000-000000000099',
        name: 'Kopi Nusantara',
        description: 'Kedai kopi lokal',
        website: 'https://kopinusantara.id',
        image: null,
        category: { id: '0b7c1e2a-0001-4000-8000-000000000001', name: 'Cafe / Coffee Shop' },
        scale: { id: '0b7c1e2a-0002-4000-8000-000000000002', name: 'Medium' },
        created_at: '2026-11-01T00:00:00Z',
        updated_at: '2026-11-01T00:00:00Z',
      },
    }

    setAuthFromResponse(mockAuth)
    const session = getAuthSession()
    expect(session?.accessToken).toBe('jwt-access-123')
    expect(session?.refreshToken).toBe('jwt-refresh-456')
    expect(session?.activeShopId).toBe('0b7c1e2a-0000-4000-8000-000000000099')

    clearAuthSession()
    expect(getAuthSession()).toBeNull()
  })

  it('maps GET /api/v1/owner/shops/:shopId/dashboard response to Dashboard UI models', () => {
    const payload: Dashboard = {
      range: { from: '2026-11-01', to: '2026-11-12', time_zone: 'Asia/Jakarta' },
      kpi: {
        total_feedbacks: 142,
        average_rating: 4.3,
        total_opinions: 210,
        sentiment: { positive: 130, neutral: 40, negative: 40 },
        severe_opinions: 9,
        active_issues: 4,
      },
      sentiment_trend: [
        { date: '2026-11-10', positive: 10, neutral: 5, negative: 5 },
        { date: '2026-11-11', positive: 15, neutral: 3, negative: 2 },
      ],
      weekly_reviews: [{ week_start: '2026-11-09', feedback_count: 38, average_rating: 4.5 }],
      top_complaints: [
        {
          issue_id: '0b7c1e2a-0003-4000-8000-000000000001',
          title: 'Antrean kasir lambat',
          negative_opinions: 24,
          unique_feedbacks: 19,
          severe_opinions: 6,
        },
      ],
      recent_feedbacks: [
        {
          id: '0b7c1e2a-0004-4000-8000-000000000001',
          name: 'Rina',
          rating: 2,
          feedback: 'Menunggu pesanan 25 menit saat jam makan siang.',
          image: null,
          created_at: '2026-11-12T10:00:00Z',
        },
      ],
    }

    const mapped = mapDashboardData(payload)
    expect(mapped.stats[0]?.value).toBe('142')
    expect(mapped.topComplaints[0]?.label).toBe('Antrean kasir lambat')
    expect(mapped.latestFeedback[0]?.name).toBe('Rina')
  })

  it('maps GET /api/v1/owner/shops/:shopId/issues response to 3D Galaxy planets', () => {
    const issues: IssueSummary[] = [
      {
        id: '0b7c1e2a-0005-4000-8000-000000000001',
        title: 'Waktu tunggu penyajian lama',
        stats: {
          unique_feedback_count: 28,
          opinion_count: 35,
          average_rating: 2.1,
          first_feedback_at: '2026-11-01T00:00:00Z',
          last_feedback_at: '2026-11-12T00:00:00Z',
          sentiment: { negative: 30, neutral: 3, positive: 2 },
          severity: { severe: 12, not_severe: 23 },
        },
        planet_status: 'HAS_NEW_REVIEWS',
        last_consulted_at: '2026-11-05T00:00:00Z',
        created_at: '2026-11-01T00:00:00Z',
        updated_at: '2026-11-12T00:00:00Z',
      },
    ]

    const topics = mapIssuesToTopics(issues)
    expect(topics).toHaveLength(1)
    expect(topics[0]?.label).toBe('Waktu tunggu penyajian lama')
    expect(topics[0]?.count).toBe(30)
    expect(topics[0]?.negativeCount).toBe(30)
    expect(topics[0]?.uniqueFeedbackCount).toBe(28)
    expect(topics[0]?.planetStatus).toBe('HAS_NEW_REVIEWS')
    expect(topics[0]?.isPrimary).toBe(true)
  })

  it('maps GET /api/v1/owner/shops/:shopId response to BusinessFormValues', () => {
    const detail: ShopDetail = {
      role: 'Owner',
      shop: {
        id: '0b7c1e2a-0000-4000-8000-000000000099',
        name: 'Roastery Senja',
        description: 'Kopi sangrai segar setiap hari',
        website: 'https://senja.id',
        image: null,
        category: { id: '0b7c1e2a-0001-4000-8000-000000000008', name: 'Bakery' },
        scale: { id: '0b7c1e2a-0002-4000-8000-000000000002', name: 'Medium' },
        created_at: '2026-11-01T00:00:00Z',
        updated_at: '2026-11-10T00:00:00Z',
      },
      owner: {
        id: '0b7c1e2a-0000-4000-8000-000000000001',
        name: 'Sari Dewi',
        email: 'sari@senja.id',
        phone_number: '081122334455',
      },
    }

    const form = mapShopDetailToFormValues(detail)
    expect(form.name).toBe('Roastery Senja')
    expect(form.category).toBe('Bakery')
    expect(form.categoryId).toBe('0b7c1e2a-0001-4000-8000-000000000008')
    expect(form.ownerName).toBe('Sari Dewi')
    expect(form.email).toBe('sari@senja.id')
  })
})
