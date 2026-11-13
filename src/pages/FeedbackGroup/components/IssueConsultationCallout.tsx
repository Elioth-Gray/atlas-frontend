import gsap from 'gsap'
import { History, MessageCircle, Sparkles, X } from 'lucide-react'
import type { Ref } from 'react'
import { useEffect, useRef, useState } from 'react'
import { toast } from 'sonner'

import { useConsultationSession, useStartConsultation } from '@/hooks/data/useConsultations'
import { useIssueDetail } from '@/hooks/data/useInsights'
import { isUuid } from '@/hooks/data/usePublicShop'
import type { Message, TurnEvent } from '@/typings/api'
import { cn } from '@/utils/cn'
import { formatPlanetStatus } from '@/utils/format'

import type { FeedbackTopic } from '../feedbackGroupData'
import { getDemoScenario } from '../solutionData'
import type { ConsultationAdapter } from './ConsultationSessionView'
import {
  ConsultationSessionView,
  getLatestSolutionMessage,
  LiveSessionContainer,
} from './ConsultationSessionView'
import { playGalaxySound } from './galaxySound'

interface IssueConsultationCalloutProps {
  topic: FeedbackTopic
  onClose: () => void
  ref?: Ref<HTMLDivElement>
  className?: string
}

export function IssueConsultationCallout({
  topic,
  onClose,
  ref,
  className,
}: IssueConsultationCalloutProps) {
  const isLiveUuid = isUuid(topic.id)
  const issueQuery = useIssueDetail(topic.id, isLiveUuid)
  const startConsultationMutation = useStartConsultation(topic.id)

  const overviewContainerRef = useRef<HTMLDivElement>(null)
  const [viewMode, setViewMode] = useState<'OVERVIEW' | 'CONSULTATION'>('OVERVIEW')
  const [selectedSessionId, setSelectedSessionId] = useState<string | null>(null)
  const [startError, setStartError] = useState<string | null>(null)

  // Local interactive state for non-UUID preview/demo topics
  const demoScenario = getDemoScenario(topic.id, topic.label)
  const [demoStatus, setDemoStatus] = useState<
    'COLLECTING_CONTEXT' | 'SOLUTION_READY' | 'ARCHIVED'
  >('COLLECTING_CONTEXT')
  const [demoMessages, setDemoMessages] = useState<Message[]>(() => [
    {
      id: `msg-ai-init-${topic.id}`,
      role: 'ATLAS_AI',
      message_type: 'TEXT',
      content: demoScenario.initialQuestion,
      solution: null,
      revision: null,
      topic_key: 'initial',
      model_id: null,
      prompt_version: null,
      memory_candidates: [],
      request_id: null,
      created_at: new Date().toISOString(),
    },
  ])

  const detail = issueQuery.data
  const activeSessionId = selectedSessionId ?? detail?.consultations[0]?.id ?? null
  const sessionQuery = useConsultationSession(
    activeSessionId,
    isLiveUuid && viewMode === 'CONSULTATION' && Boolean(activeSessionId)
  )

  // Staggered GSAP entrance for State A (Overview) items when planet detail opens
  useEffect(() => {
    if (viewMode !== 'OVERVIEW') return
    const container = overviewContainerRef.current
    if (!container) return

    const items = container.querySelectorAll<HTMLElement>('[data-overview-item]')
    if (items.length === 0) return

    gsap.fromTo(
      items,
      { opacity: 0, y: 14 },
      {
        opacity: 1,
        y: 0,
        duration: 0.36,
        stagger: 0.055,
        ease: 'power3.out',
        clearProps: 'transform,opacity',
      }
    )
  }, [viewMode, topic.id])

  function transitionToConsultation(onComplete: () => void) {
    playGalaxySound('consult-start')
    onComplete()
  }

  async function handleStartConsultation() {
    setStartError(null)

    if (!isLiveUuid) {
      transitionToConsultation(() => {
        setDemoStatus('COLLECTING_CONTEXT')
        setDemoMessages([
          {
            id: `msg-ai-init-${topic.id}`,
            role: 'ATLAS_AI',
            message_type: 'TEXT',
            content: demoScenario.initialQuestion,
            solution: null,
            revision: null,
            topic_key: 'initial',
            model_id: null,
            prompt_version: null,
            memory_candidates: [],
            request_id: null,
            created_at: new Date().toISOString(),
          },
        ])
        setViewMode('CONSULTATION')
      })
      return
    }

    try {
      const session = await startConsultationMutation.mutateAsync({
        request_id: crypto.randomUUID(),
      })
      transitionToConsultation(() => {
        setSelectedSessionId(session.id)
        setViewMode('CONSULTATION')
      })
    } catch (error) {
      const msg = error instanceof Error ? error.message : 'Gagal memulai sesi konsultasi AI.'
      setStartError(msg)
      toast.error(msg)
    }
  }

  function handleDemoTurn(event: TurnEvent, content?: string): Promise<void> {
    const now = new Date().toISOString()

    if (event === 'GENERATE_NOW') {
      const solutionMsg: Message = {
        id: `msg-sol-${Date.now()}`,
        role: 'ATLAS_AI',
        message_type: 'SOLUTION',
        content: null,
        solution: demoScenario.solution,
        revision: 1,
        topic_key: null,
        model_id: null,
        prompt_version: null,
        memory_candidates: demoScenario.memoryCandidates,
        request_id: null,
        created_at: now,
      }
      setDemoMessages((prev) => [...prev, solutionMsg])
      setDemoStatus('SOLUTION_READY')
      return Promise.resolve()
    }

    const ownerMsg: Message = {
      id: `msg-owner-${Date.now()}`,
      role: 'OWNER',
      message_type: 'TEXT',
      content:
        content ?? (event === 'SKIP_QUESTION' ? 'Lewati pertanyaan ini.' : 'Lanjutkan analisis.'),
      solution: null,
      revision: null,
      topic_key: null,
      model_id: null,
      prompt_version: null,
      memory_candidates: [],
      request_id: null,
      created_at: now,
    }

    const aiQuestionCount = demoMessages.filter(
      (m) => m.role === 'ATLAS_AI' && m.message_type === 'TEXT'
    ).length

    if (aiQuestionCount < 2 && event !== 'CONTINUE_DISCUSSION') {
      const nextQuestionMsg: Message = {
        id: `msg-ai-q2-${Date.now()}`,
        role: 'ATLAS_AI',
        message_type: 'TEXT',
        content: demoScenario.followUpQuestion,
        solution: null,
        revision: null,
        topic_key: 'followup',
        model_id: null,
        prompt_version: null,
        memory_candidates: [],
        request_id: null,
        created_at: now,
      }
      setDemoMessages((prev) => [...prev, ownerMsg, nextQuestionMsg])
    } else {
      const solutionMsg: Message = {
        id: `msg-sol-${Date.now()}`,
        role: 'ATLAS_AI',
        message_type: 'SOLUTION',
        content: null,
        solution: demoScenario.solution,
        revision: 1,
        topic_key: null,
        model_id: null,
        prompt_version: null,
        memory_candidates: demoScenario.memoryCandidates,
        request_id: null,
        created_at: now,
      }
      setDemoMessages((prev) => [...prev, ownerMsg, solutionMsg])
      setDemoStatus('SOLUTION_READY')
    }

    return Promise.resolve()
  }

  const latestDemoSolutionMsg = getLatestSolutionMessage(demoMessages, null)
  const demoAdapter: ConsultationAdapter = {
    status: demoStatus,
    isProcessing: false,
    messages: demoMessages,
    latestSolution: latestDemoSolutionMsg?.solution ?? null,
    latestSolutionMessageId: latestDemoSolutionMsg?.id ?? null,
    memoryCandidates: latestDemoSolutionMsg?.memory_candidates ?? demoScenario.memoryCandidates,
    contextStats: {
      uniqueFeedbacks: topic.uniqueFeedbackCount,
      opinionCount: topic.negativeCount,
      negativeCount: topic.negativeCount,
      memoriesCount: 1,
    },
    onSendTurn: handleDemoTurn,
    onSaveSession: () => {
      setDemoStatus('ARCHIVED')
      return Promise.resolve()
    },
    onStartNewConsultation: () => {
      void handleStartConsultation()
    },
  }

  const effectivePlanetStatus =
    !isLiveUuid && demoStatus === 'ARCHIVED'
      ? 'CONSULTED'
      : (detail?.issue.planet_status ?? topic.planetStatus)
  const statusText = formatPlanetStatus(effectivePlanetStatus)

  const uniqueFeedbacks = detail?.issue.stats.unique_feedback_count ?? topic.uniqueFeedbackCount
  const negativeCount = detail?.issue.stats.sentiment.negative ?? topic.negativeCount
  const opinionCount = negativeCount
  const severeCount = detail?.issue.stats.severity.severe ?? topic.severeCount

  const evidenceQuotes =
    detail && detail.evidence.length > 0
      ? detail.evidence.slice(0, 3).map((ev) => ({
          id: ev.opinion_id,
          quote: ev.evidence_text || ev.opinion_text,
          caption: `Opini pelanggan · Rating ★${ev.rating}`,
        }))
      : demoScenario.evidence.map((ev) => ({
          id: ev.opinion_id,
          quote: ev.quote,
          caption: 'Opini pelanggan',
        }))

  return (
    <section
      ref={ref}
      aria-labelledby={`solution-${topic.id}`}
      className={cn(
        'flex flex-col overflow-hidden rounded-lg bg-galaxy-panel/95 text-galaxy-text shadow-panel ring-1 ring-galaxy-line',
        className
      )}
    >
      {viewMode === 'CONSULTATION' ? (
        isLiveUuid ? (
          sessionQuery.data ? (
            <LiveSessionContainer
              topicLabel={topic.label}
              session={sessionQuery.data}
              onStartNewConsultation={() => void handleStartConsultation()}
              onClose={onClose}
            />
          ) : (
            <div className="flex flex-1 flex-col justify-between p-4 text-[11px]">
              <p className="text-galaxy-subtle">Memuat sesi konsultasi AI...</p>
              <button
                type="button"
                aria-label="Tutup solusi"
                onClick={onClose}
                className="self-end text-galaxy-subtle hover:text-galaxy-text"
              >
                Tutup
              </button>
            </div>
          )
        ) : (
          <ConsultationSessionView
            topicLabel={topic.label}
            adapter={demoAdapter}
            onClose={onClose}
          />
        )
      ) : (
        /* STATE A: Issue Overview (DETAIL ISU) */
        <div ref={overviewContainerRef} className="flex flex-1 flex-col overflow-hidden">
          <div
            data-overview-item
            className="flex items-start justify-between gap-3 border-b border-galaxy-line px-4 pt-4 pb-3"
          >
            <div className="min-w-0 flex-1">
              <p className="text-[10px] font-semibold tracking-wider text-galaxy-subtle uppercase">
                DETAIL ISU
              </p>
              <h2
                id={`solution-${topic.id}`}
                className="pt-1 text-[16px] leading-5 font-bold text-galaxy-text"
              >
                {topic.label}
              </h2>
              <p className="pt-1 text-[11px] leading-3 text-galaxy-subtle">{statusText}</p>
            </div>
            <button
              type="button"
              aria-label="Tutup solusi"
              onClick={onClose}
              className="flex size-7 shrink-0 items-center justify-center text-galaxy-subtle transition-colors hover:bg-galaxy-soft hover:text-galaxy-text focus-visible:outline-2 focus-visible:outline-galaxy-accent"
            >
              <X aria-hidden="true" className="size-4" strokeWidth={1.8} />
            </button>
          </div>

          <div className="flex-1 [scrollbar-width:thin] [scrollbar-color:var(--color-galaxy-line)_transparent] space-y-4 overflow-y-auto px-4 py-4 text-[11px] leading-[16px]">
            {/* Ringkasan masalah */}
            <div data-overview-item>
              <h3 className="text-[12px] font-semibold text-galaxy-text">Ringkasan masalah</h3>
              <p className="pt-1.5 text-galaxy-text">{demoScenario.summary}</p>
              <p className="pt-1 text-[10px] text-galaxy-subtle">
                Ringkasan bersumber dari opini pelanggan; bukan diagnosis AI.
              </p>
            </div>

            {/* 4-Metric Grid */}
            <dl data-overview-item className="grid grid-cols-2 gap-x-4 gap-y-3 pt-1">
              <div>
                <dd className="text-[15px] leading-5 font-bold text-galaxy-text">
                  {uniqueFeedbacks}
                </dd>
                <dt className="pt-0.5 text-[11px] text-galaxy-subtle">Feedback unik</dt>
              </div>
              <div>
                <dd className="text-[15px] leading-5 font-bold text-galaxy-text">{opinionCount}</dd>
                <dt className="pt-0.5 text-[11px] text-galaxy-subtle">Opini terkait</dt>
              </div>
              <div>
                <dd className="text-[15px] leading-5 font-bold text-galaxy-text">
                  {negativeCount}
                </dd>
                <dt className="pt-0.5 text-[11px] text-galaxy-subtle">Opini negatif</dt>
              </div>
              <div>
                <dd className="text-[15px] leading-5 font-bold text-galaxy-text">{severeCount}</dd>
                <dt className="pt-0.5 text-[11px] text-galaxy-subtle">Opini severe</dt>
              </div>
            </dl>

            {/* Bukti ulasan pelanggan */}
            {evidenceQuotes.length > 0 && (
              <div data-overview-item>
                <h3 className="text-[12px] font-semibold text-galaxy-text">
                  Bukti ulasan pelanggan
                </h3>
                <div className="mt-2 space-y-2.5">
                  {evidenceQuotes.map((ev) => (
                    <div key={ev.id}>
                      <blockquote className="text-galaxy-text italic">“{ev.quote}”</blockquote>
                      <p className="mt-0.5 text-[10px] text-galaxy-subtle">{ev.caption}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Butuh memahami penyebabnya? */}
            <div
              data-overview-item
              className="rounded-md bg-galaxy-soft/70 p-3 ring-1 ring-galaxy-line"
            >
              <p className="flex items-center gap-1.5 text-[12px] font-semibold text-galaxy-text">
                <Sparkles aria-hidden="true" className="size-3.5 text-galaxy-accent" />
                <span>Butuh memahami penyebabnya?</span>
              </p>
              <p className="pt-1 text-[11px] text-galaxy-muted">
                AI akan mengevaluasi bukti dan menanyakan konteks operasional jika diperlukan.
              </p>
            </div>

            {startError && (
              <p role="alert" className="bg-danger-soft px-2.5 py-1.5 text-[11px] text-danger">
                {startError}
              </p>
            )}
          </div>

          <div data-overview-item className="space-y-2 border-t border-galaxy-line px-4 py-3">
            {detail && detail.consultations.length > 0 && (
              <button
                type="button"
                onClick={() => {
                  const latest = detail.consultations[0]
                  if (latest) {
                    transitionToConsultation(() => {
                      setSelectedSessionId(latest.id)
                      setViewMode('CONSULTATION')
                    })
                  }
                }}
                className="flex h-8 w-full items-center justify-center gap-1.5 bg-galaxy-soft px-3 text-[11px] font-medium text-galaxy-text ring-1 ring-galaxy-line transition-colors hover:bg-galaxy-accent-soft"
              >
                <History aria-hidden="true" className="size-3.5" />
                Lihat Riwayat Konsultasi
              </button>
            )}
            <button
              type="button"
              disabled={startConsultationMutation.isPending}
              onClick={() => void handleStartConsultation()}
              className="flex h-9 w-full items-center justify-center gap-2 bg-galaxy-soft px-3 text-[12px] font-semibold text-galaxy-text ring-1 ring-galaxy-line transition-colors hover:bg-galaxy-accent-soft disabled:opacity-50"
            >
              <MessageCircle aria-hidden="true" className="size-3.5" />
              {startConsultationMutation.isPending
                ? 'Memulai Konsultasi...'
                : 'Mulai Konsultasi AI'}
            </button>
          </div>
        </div>
      )}
    </section>
  )
}
