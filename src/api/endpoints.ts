import type {
  AuthResponse,
  Dashboard,
  DashboardQueryParams,
  DataResponse,
  FeedbackCreated,
  IssueDetail,
  IssueListParams,
  IssueSummary,
  ListMemoriesParams,
  ListResponse,
  LoginRequest,
  Lookup,
  Memory,
  MyShop,
  PageParams,
  PublicShop,
  RefreshRequest,
  RegisterRequest,
  SaveConsultationRequest,
  SaveConsultationResponse,
  Session,
  ShopDetail,
  StartConsultationRequest,
  SubmitFeedbackRequest,
  TurnRequest,
  UpdateMemoryRequest,
  UpdateShopRequest,
} from '@/typings/api'

import { api } from './client'

// --- Public API (/api/v1/public) ---

export async function fetchShopCategories(): Promise<Lookup[]> {
  const response = await api.get<DataResponse<Lookup[]>>('/api/v1/public/shop-categories')
  return response.data.data
}

export async function fetchShopScales(): Promise<Lookup[]> {
  const response = await api.get<DataResponse<Lookup[]>>('/api/v1/public/shop-scales')
  return response.data.data
}

export async function fetchPublicShop(shopId: string): Promise<PublicShop> {
  const response = await api.get<DataResponse<PublicShop>>(
    `/api/v1/public/shops/${encodeURIComponent(shopId)}`
  )
  return response.data.data
}

export async function submitPublicFeedback(
  shopId: string,
  payload: SubmitFeedbackRequest
): Promise<FeedbackCreated> {
  const response = await api.post<DataResponse<FeedbackCreated>>(
    `/api/v1/public/shops/${encodeURIComponent(shopId)}/feedbacks`,
    payload
  )
  return response.data.data
}

// --- Auth API (/api/v1/auth) ---

export async function registerOwner(payload: RegisterRequest): Promise<AuthResponse> {
  const response = await api.post<DataResponse<AuthResponse>>('/api/v1/auth/signup', payload)
  return response.data.data
}

export async function loginUser(payload: LoginRequest): Promise<AuthResponse> {
  const response = await api.post<DataResponse<AuthResponse>>('/api/v1/auth/signin', payload)
  return response.data.data
}

export async function refreshUserToken(payload: RefreshRequest): Promise<AuthResponse> {
  const response = await api.post<DataResponse<AuthResponse>>('/api/v1/auth/refresh', payload)
  return response.data.data
}

// --- Owner Shops API (/api/v1/owner/shops) ---

export async function fetchMyShops(params?: PageParams): Promise<ListResponse<MyShop>> {
  const response = await api.get<ListResponse<MyShop>>('/api/v1/owner/shops', { params })
  return response.data
}

export async function fetchMyShopDetail(shopId: string): Promise<ShopDetail> {
  const response = await api.get<DataResponse<ShopDetail>>(
    `/api/v1/owner/shops/${encodeURIComponent(shopId)}`
  )
  return response.data.data
}

export async function updateMyShopDetail(
  shopId: string,
  payload: UpdateShopRequest
): Promise<ShopDetail> {
  const response = await api.put<DataResponse<ShopDetail>>(
    `/api/v1/owner/shops/${encodeURIComponent(shopId)}`,
    payload
  )
  return response.data.data
}

// --- Owner Insights API (/api/v1/owner) ---

export async function fetchShopDashboard(
  shopId: string,
  params?: DashboardQueryParams
): Promise<Dashboard> {
  const response = await api.get<DataResponse<Dashboard>>(
    `/api/v1/owner/shops/${encodeURIComponent(shopId)}/dashboard`,
    { params }
  )
  return response.data.data
}

export async function fetchShopIssues(
  shopId: string,
  params?: IssueListParams
): Promise<ListResponse<IssueSummary>> {
  const response = await api.get<ListResponse<IssueSummary>>(
    `/api/v1/owner/shops/${encodeURIComponent(shopId)}/issues`,
    { params }
  )
  return response.data
}

export async function fetchIssueDetail(issueId: string): Promise<IssueDetail> {
  const response = await api.get<DataResponse<IssueDetail>>(
    `/api/v1/owner/issues/${encodeURIComponent(issueId)}`
  )
  return response.data.data
}

// --- Owner Consultations & Memories API (/api/v1/owner) ---

export async function startIssueConsultation(
  issueId: string,
  payload: StartConsultationRequest
): Promise<Session> {
  const response = await api.post<DataResponse<Session>>(
    `/api/v1/owner/issues/${encodeURIComponent(issueId)}/consultations`,
    payload
  )
  return response.data.data
}

export async function fetchConsultationSession(sessionId: string): Promise<Session> {
  const response = await api.get<DataResponse<Session>>(
    `/api/v1/owner/consultations/${encodeURIComponent(sessionId)}`
  )
  return response.data.data
}

export async function sendConsultationTurn(
  sessionId: string,
  payload: TurnRequest
): Promise<Session> {
  const response = await api.post<DataResponse<Session>>(
    `/api/v1/owner/consultations/${encodeURIComponent(sessionId)}/turns`,
    payload
  )
  return response.data.data
}

export async function saveConsultationSession(
  sessionId: string,
  payload: SaveConsultationRequest
): Promise<SaveConsultationResponse> {
  const response = await api.post<DataResponse<SaveConsultationResponse>>(
    `/api/v1/owner/consultations/${encodeURIComponent(sessionId)}/save`,
    payload
  )
  return response.data.data
}

export async function fetchShopMemories(
  shopId: string,
  params?: ListMemoriesParams
): Promise<ListResponse<Memory>> {
  const response = await api.get<ListResponse<Memory>>(
    `/api/v1/owner/shops/${encodeURIComponent(shopId)}/memories`,
    { params }
  )
  return response.data
}

export async function updateBusinessMemory(
  memoryId: string,
  payload: UpdateMemoryRequest
): Promise<Memory> {
  const response = await api.patch<DataResponse<Memory>>(
    `/api/v1/owner/memories/${encodeURIComponent(memoryId)}`,
    payload
  )
  return response.data.data
}
