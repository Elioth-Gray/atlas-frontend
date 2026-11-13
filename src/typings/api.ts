export type ErrorCode =
  | 'BAD_REQUEST'
  | 'VALIDATION_ERROR'
  | 'INVALID_INPUT'
  | 'UNAUTHORIZED'
  | 'FORBIDDEN'
  | 'NOT_FOUND'
  | 'ROUTE_NOT_FOUND'
  | 'METHOD_NOT_ALLOWED'
  | 'CONFLICT'
  | 'PAYLOAD_TOO_LARGE'
  | 'INTERNAL_ERROR'
  | 'SERVICE_UNAVAILABLE'
  | 'TIMEOUT'

export interface FieldError {
  field: string
  message: string
}

export interface ApiErrorBody {
  code: ErrorCode
  message: string
  details?: FieldError[]
}

export interface ErrorResponse {
  error: ApiErrorBody
}

export interface DataResponse<T> {
  data: T
}

export interface PageMeta {
  page: number
  page_size: number
  total: number
  total_pages: number
}

export interface ListResponse<T> {
  data: T[]
  meta: PageMeta
}

export interface PageParams {
  page?: number
  page_size?: number
}

export interface Lookup {
  id: string
  name: string
}

export type ShopRole = 'Owner' | 'Employee'

export interface PublicShop {
  id: string
  name: string
  description: string | null
  website: string | null
  image: string | null
  category: Lookup | null
  scale: Lookup | null
}

export interface Shop extends PublicShop {
  created_at: string
  updated_at: string
}

export interface User {
  id: string
  name: string
  email: string
  phone_number: string | null
}

export interface MyShop {
  role: ShopRole
  shop: Shop
}

export interface ShopDetail {
  role: ShopRole
  shop: Shop
  owner: User | null
}

export interface ShopProfileRequest {
  name: string
  description?: string | null
  website?: string | null
  image?: string | null
  category_id: string
  scale_id: string
}

export interface OwnerContactUpdateRequest {
  name?: string
  phone_number?: string
}

export interface UpdateShopRequest extends ShopProfileRequest {
  owner?: OwnerContactUpdateRequest
}

export interface RegisterRequest {
  name: string
  email: string
  phone_number?: string | null
  password: string
  shop: ShopProfileRequest
}

export interface LoginRequest {
  email: string
  password: string
}

export interface RefreshRequest {
  refresh_token: string
}

export interface AuthResponse {
  token_type: 'Bearer'
  access_token: string
  access_token_expires_at: string
  refresh_token: string
  refresh_token_expires_at: string
  user: User
  shop?: Shop
}

export interface SubmitFeedbackRequest {
  name?: string | null
  rating: number
  feedback: string
  image?: string | null
}

export interface FeedbackCreated {
  feedback_id: string
  shop_id: string
  rating: number
  created_at: string
}

export interface Feedback {
  id: string
  name: string | null
  rating: number
  feedback: string
  image: string | null
  created_at: string
}

export type Sentiment = 'Negative' | 'Positive' | 'Neutral'
export type Severity = 'Severe'
export type PlanetStatus = 'UNCONSULTED' | 'CONSULTED' | 'HAS_NEW_REVIEWS'

export interface SentimentBreakdown {
  negative: number
  positive: number
  neutral: number
}

export interface SeverityBreakdown {
  severe: number
  not_severe: number
}

export interface IssueStats {
  unique_feedback_count: number
  opinion_count: number
  average_rating: number
  first_feedback_at: string | null
  last_feedback_at: string | null
  sentiment: SentimentBreakdown
  severity: SeverityBreakdown
}

export interface IssueSummary {
  id: string
  title: string
  stats: IssueStats
  planet_status: PlanetStatus
  last_consulted_at: string | null
  created_at: string
  updated_at: string
}

export interface Evidence {
  opinion_id: string
  opinion_text: string
  evidence_text: string | null
  sentiment: Sentiment
  severity: Severity | null
  feedback_id: string
  feedback: string
  rating: number
  created_at: string
}

export type SessionStatus = 'COLLECTING_CONTEXT' | 'SOLUTION_READY' | 'ARCHIVED'

export interface SessionSummary {
  id: string
  status: SessionStatus
  state_version: number
  question_count: number
  started_by_user_id: string
  final_solution_message_id: string | null
  created_at: string
  updated_at: string
  archived_at: string | null
}

export interface IssueDetail {
  shop_id: string
  issue: IssueSummary
  evidence: Evidence[]
  consultations: SessionSummary[]
}

export interface DashboardRange {
  from: string
  to: string
  time_zone: string
}

export interface DashboardKPI {
  total_feedbacks: number
  average_rating: number
  total_opinions: number
  sentiment: SentimentBreakdown
  severe_opinions: number
  active_issues: number
}

export interface DashboardTrendPoint extends SentimentBreakdown {
  date: string
}

export interface DashboardWeeklyReview {
  week_start: string
  feedback_count: number
  average_rating: number
}

export interface DashboardTopComplaint {
  issue_id: string
  title: string
  negative_opinions: number
  unique_feedbacks: number
  severe_opinions: number
}

export interface Dashboard {
  range: DashboardRange
  kpi: DashboardKPI
  sentiment_trend: DashboardTrendPoint[]
  weekly_reviews: DashboardWeeklyReview[]
  top_complaints: DashboardTopComplaint[]
  recent_feedbacks: Feedback[]
}

export interface DashboardQueryParams {
  from?: string
  to?: string
  tz?: string
  sentiment?: Sentiment
  priority?: 'high' | 'medium' | 'low'
}

export interface IssueListParams extends PageParams {
  from?: string
  to?: string
  tz?: string
  sentiment?: Sentiment
  status?: PlanetStatus
}

export interface StartConsultationRequest {
  request_id: string
}

export type TurnEvent = 'OWNER_REPLY' | 'SKIP_QUESTION' | 'GENERATE_NOW' | 'CONTINUE_DISCUSSION'

export interface TurnRequest {
  request_id: string
  state_version: number
  event: TurnEvent
  content?: string
}

export interface ConfirmedMemoryInput {
  fact_text: string
  source_owner_message_ids: string[]
}

export interface SaveConsultationRequest {
  final_solution_message_id: string
  state_version?: number | null
  confirmed_memories?: ConfirmedMemoryInput[]
}

export type MessageRole = 'OWNER' | 'ATLAS_AI'
export type MessageType = 'TEXT' | 'SOLUTION'

export interface MemoryCandidate {
  fact_text: string
  source_owner_message_ids: string[]
}

export interface References {
  opinion_ids: string[]
  owner_message_ids: string[]
  memory_ids: string[]
}

export interface SolutionFinding {
  statement: string
  references: References
}

export interface SolutionCustomerEvidence {
  opinion_id: string
  quote: string
  note: string
}

export interface SolutionHypothesis {
  statement: string
  confidence: string
  references: References
}

export interface SolutionRecommendation {
  title: string
  description: string
  priority: string
  references: References
}

export interface SolutionSuccessIndicator {
  metric: string
  target: string
  timeframe: string
}

export interface Solution {
  findings: SolutionFinding[]
  customer_evidence: SolutionCustomerEvidence[]
  hypotheses: SolutionHypothesis[]
  recommendations: SolutionRecommendation[]
  success_indicators: SolutionSuccessIndicator[]
}

export interface ContextSnapshotEvidence extends Omit<Evidence, 'feedback'> {
  full_feedback: string
}

export interface ContextSnapshot {
  issue: { id: string; title: string }
  period: { from: string | null; to: string | null }
  stats: IssueStats
  evidence: ContextSnapshotEvidence[]
  shop: {
    id: string
    name: string
    description: string
    category: string
    scale: string
  }
  memories: { id: string; fact_text: string }[]
  prior_issue_solution: {
    session_id: string
    message_id: string
    archived_at: string
    solution: Solution
  } | null
  captured_at: string
}

export interface Message {
  id: string
  role: MessageRole
  message_type: MessageType
  content: string | null
  solution: Solution | null
  revision: number | null
  topic_key: string | null
  model_id: string | null
  prompt_version: string | null
  memory_candidates: MemoryCandidate[]
  request_id: string | null
  created_at: string
}

export interface Session {
  id: string
  shop_id: string
  issue_id: string
  started_by_user_id: string
  status: SessionStatus
  state_version: number
  question_count: number
  asked_topics: string[]
  skipped_topics: string[]
  is_processing: boolean
  final_solution_message_id: string | null
  context_snapshot: ContextSnapshot
  messages: Message[]
  replayed: boolean
  created_at: string
  updated_at: string
  archived_at: string | null
}

export interface Memory {
  id: string
  shop_id: string
  fact_text: string
  source_session_id: string
  source_owner_message_ids: string[]
  confirmed_by_user_id: string
  confirmed_at: string
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface SaveConsultationResponse {
  session: Session
  memories: Memory[]
}

export interface ListMemoriesParams extends PageParams {
  is_active?: boolean
}

export interface UpdateMemoryRequest {
  fact_text?: string
  is_active?: boolean
}
