import gsap from 'gsap'
import { ChevronDown, FileText, Info, Loader2, Send, Sparkles, User, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { toast } from 'sonner'

import { ApiError } from '@/api/ApiError'
import { useConsultationTurn, useSaveConsultation } from '@/hooks/data/useConsultations'
import type {
  ConfirmedMemoryInput,
  MemoryCandidate,
  Message,
  Session,
  Solution,
  TurnEvent,
} from '@/typings/api'

import { playGalaxySound } from './galaxySound'
import { GroundedSolutionView } from './GroundedSolutionView'

export interface ConsultationAdapter {
  status: 'COLLECTING_CONTEXT' | 'SOLUTION_READY' | 'ARCHIVED'
  isProcessing: boolean
  messages: Message[]
  latestSolution: Solution | null
  latestSolutionMessageId: string | null
  memoryCandidates: MemoryCandidate[]
  contextStats?: {
    uniqueFeedbacks: number
    opinionCount: number
    negativeCount: number
    memoriesCount: number
  }
  onSendTurn: (event: TurnEvent, content?: string) => Promise<void>
  onSaveSession: (confirmedMemories: ConfirmedMemoryInput[]) => Promise<void>
  onStartNewConsultation?: () => void
}

interface ConsultationSessionViewProps {
  topicLabel: string
  adapter: ConsultationAdapter
  onClose: () => void
}

interface CandidateOverride {
  fact_text?: string
  selected?: boolean
}

// eslint-disable-next-line react-refresh/only-export-components
export function getLatestSolutionMessage(
  messages: Message[],
  finalId: string | null
): Message | null {
  if (finalId) {
    const exact = messages.find((msg) => msg.id === finalId && msg.solution)
    if (exact) return exact
  }
  for (let idx = messages.length - 1; idx >= 0; idx -= 1) {
    const msg = messages[idx]
    if (msg?.solution) return msg
  }
  return null
}

export function LiveSessionContainer({
  topicLabel,
  session,
  onStartNewConsultation,
  onClose,
}: {
  topicLabel: string
  session: Session
  onStartNewConsultation: () => void
  onClose: () => void
}) {
  const turnMutation = useConsultationTurn(session.id)
  const saveMutation = useSaveConsultation(session.id)
  const [pendingRequestId, setPendingRequestId] = useState<string>(() => crypto.randomUUID())

  const latestSolutionMsg = getLatestSolutionMessage(
    session.messages,
    session.final_solution_message_id
  )

  const adapter: ConsultationAdapter = {
    status: session.status,
    isProcessing: session.is_processing || turnMutation.isPending || saveMutation.isPending,
    messages: session.messages,
    latestSolution: latestSolutionMsg?.solution ?? null,
    latestSolutionMessageId: latestSolutionMsg?.id ?? null,
    memoryCandidates: latestSolutionMsg?.memory_candidates ?? [],
    contextStats: {
      uniqueFeedbacks: session.context_snapshot.stats.unique_feedback_count,
      opinionCount: session.context_snapshot.stats.opinion_count,
      negativeCount: session.context_snapshot.stats.sentiment.negative,
      memoriesCount: session.context_snapshot.memories.length,
    },
    onSendTurn: async (event, content) => {
      try {
        await turnMutation.mutateAsync({
          request_id: pendingRequestId,
          state_version: session.state_version,
          event,
          content,
        })
        setPendingRequestId(crypto.randomUUID())
      } catch (error) {
        if (error instanceof ApiError && error.status === 409) {
          setPendingRequestId(crypto.randomUUID())
          throw new Error('Status sesi baru saja diperbarui. Memuat ulang sesi terbaru...')
        }
        throw error
      }
    },
    onSaveSession: async (confirmedMemories) => {
      if (!latestSolutionMsg) return
      await saveMutation.mutateAsync({
        final_solution_message_id: latestSolutionMsg.id,
        state_version: session.state_version,
        confirmed_memories: confirmedMemories,
      })
    },
    onStartNewConsultation,
  }

  return <ConsultationSessionView topicLabel={topicLabel} adapter={adapter} onClose={onClose} />
}

export function ConsultationSessionView({
  topicLabel,
  adapter,
  onClose,
}: ConsultationSessionViewProps) {
  const [replyText, setReplyText] = useState('')
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [isContinuingDiscussion, setIsContinuingDiscussion] = useState(false)
  const [isReviewingSave, setIsReviewingSave] = useState(false)
  const [candidateOverrides, setCandidateOverrides] = useState<Record<number, CandidateOverride>>(
    {}
  )

  const panelRef = useRef<HTMLDivElement>(null)
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const sendButtonRef = useRef<HTMLButtonElement>(null)
  const seenMessageIdsRef = useRef<Set<string>>(new Set())

  const showStructuredSolution =
    (adapter.status === 'SOLUTION_READY' || adapter.status === 'ARCHIVED') &&
    adapter.latestSolution !== null &&
    !isContinuingDiscussion

  const activeStageKey =
    isReviewingSave && adapter.status === 'SOLUTION_READY'
      ? 'SAVE_REVIEW'
      : showStructuredSolution
        ? 'SOLUTION'
        : 'CHAT'

  // Animate panel stage transition (State B <-> State C <-> State D)
  useEffect(() => {
    const panel = panelRef.current
    if (!panel) return

    gsap.fromTo(
      panel,
      { opacity: 0, x: 24, scale: 0.985 },
      {
        opacity: 1,
        x: 0,
        scale: 1,
        duration: 0.36,
        ease: 'power3.out',
        clearProps: 'transform,opacity',
      }
    )

    const blocks = panel.querySelectorAll<HTMLElement>('[data-stage-block]')
    if (blocks.length > 0) {
      gsap.fromTo(
        blocks,
        { opacity: 0, y: 12 },
        {
          opacity: 1,
          y: 0,
          duration: 0.32,
          stagger: 0.06,
          ease: 'power2.out',
          clearProps: 'transform,opacity',
        }
      )
    }
  }, [activeStageKey])

  // Animate chat bubbles with GSAP and play sound effects when new messages arrive
  useEffect(() => {
    const container = scrollContainerRef.current
    if (!container) return

    const seen = seenMessageIdsRef.current
    const isInitialMount = seen.size === 0
    let hasNewAiText = false
    let hasNewSolution = false

    adapter.messages.forEach((msg, idx) => {
      if (seen.has(msg.id)) return
      seen.add(msg.id)

      const safeId =
        typeof CSS !== 'undefined' && typeof CSS.escape === 'function' ? CSS.escape(msg.id) : msg.id
      const bubbleEl = container.querySelector<HTMLElement>(`[data-chat-msg-id="${safeId}"]`)
      if (bubbleEl) {
        const isOwner = msg.role === 'OWNER'
        gsap.fromTo(
          bubbleEl,
          {
            opacity: 0,
            x: isOwner ? 28 : -24,
            y: 12,
            scale: 0.93,
          },
          {
            opacity: 1,
            x: 0,
            y: 0,
            scale: 1,
            duration: 0.38,
            delay: isInitialMount ? idx * 0.065 : 0,
            ease: 'back.out(1.45)',
            clearProps: 'transform,opacity',
          }
        )
      }

      if (!isInitialMount) {
        if (msg.role === 'ATLAS_AI' && msg.message_type === 'TEXT') {
          hasNewAiText = true
        } else if (msg.role === 'ATLAS_AI' && msg.message_type === 'SOLUTION') {
          hasNewSolution = true
        }
      }
    })

    if (hasNewSolution) {
      playGalaxySound('solution-ready')
    } else if (hasNewAiText) {
      playGalaxySound('chat-receive')
    }

    if (typeof container.scrollTo === 'function') {
      container.scrollTo({
        top: container.scrollHeight,
        behavior: 'smooth',
      })
    }
  }, [adapter.messages, adapter.isProcessing, activeStageKey])

  const candidates = adapter.memoryCandidates.map((item, idx) => {
    const override = candidateOverrides[idx]
    return {
      fact_text: override?.fact_text ?? item.fact_text,
      source_owner_message_ids: item.source_owner_message_ids,
      selected: override?.selected ?? true,
    }
  })

  const lastMessage = adapter.messages[adapter.messages.length - 1]
  const hasAwaitingQuestion =
    adapter.status === 'COLLECTING_CONTEXT' &&
    lastMessage?.role === 'ATLAS_AI' &&
    lastMessage.message_type === 'TEXT'

  async function handleTurn(event: TurnEvent) {
    if (adapter.isProcessing) return

    const requiresContent = event === 'OWNER_REPLY' || event === 'CONTINUE_DISCUSSION'
    const trimmed = replyText.trim()
    if (requiresContent && trimmed.length === 0) {
      setErrorMessage('Silakan tulis kondisi di toko terlebih dahulu.')
      return
    }

    if (sendButtonRef.current) {
      gsap.fromTo(
        sendButtonRef.current,
        { scale: 0.82, rotate: -12 },
        { scale: 1, rotate: 0, duration: 0.28, ease: 'back.out(2)' }
      )
    }

    playGalaxySound(event === 'GENERATE_NOW' ? 'solution-ready' : 'chat-send')

    setErrorMessage(null)
    try {
      await adapter.onSendTurn(event, requiresContent ? trimmed : undefined)
      setReplyText('')
      if (event === 'CONTINUE_DISCUSSION') {
        setIsContinuingDiscussion(false)
      }
      if (event === 'GENERATE_NOW') {
        toast.success('Solusi AI berhasil disusun dan siap ditinjau.')
      }
    } catch (error) {
      const msg =
        error instanceof Error
          ? error.message
          : 'Gagal mengirim respons konsultasi. Silakan coba lagi.'
      setErrorMessage(msg)
      toast.error(msg)
    }
  }

  async function handleConfirmSave() {
    if (adapter.isProcessing) return
    setErrorMessage(null)

    const confirmed: ConfirmedMemoryInput[] = candidates
      .filter((item) => item.selected && item.fact_text.trim().length >= 3)
      .map((item) => ({
        fact_text: item.fact_text.trim(),
        source_owner_message_ids: item.source_owner_message_ids,
      }))

    try {
      await adapter.onSaveSession(confirmed)
      playGalaxySound('save-success')
      setIsReviewingSave(false)
      toast.success('Hasil konsultasi berhasil disimpan ke riwayat.')
    } catch (error) {
      const msg = error instanceof Error ? error.message : 'Gagal menyimpan hasil konsultasi.'
      setErrorMessage(msg)
      toast.error(msg)
    }
  }

  // STATE D: Review Memory Candidates & Confirm Save
  if (isReviewingSave && adapter.status === 'SOLUTION_READY') {
    return (
      <div ref={panelRef} className="flex flex-1 flex-col overflow-hidden">
        <div
          data-stage-block
          className="flex items-start justify-between gap-3 border-b border-galaxy-line px-4 pt-4 pb-3"
        >
          <div>
            <h2 className="text-[14px] leading-5 font-bold text-galaxy-text">
              Simpan hasil konsultasi
            </h2>
            <p className="pt-1 text-[11px] leading-4 text-galaxy-subtle">
              Solusi ini akan disimpan sebagai riwayat konsultasi untuk isu {topicLabel}.
            </p>
          </div>
          <button
            type="button"
            aria-label="Kembali ke solusi"
            onClick={() => {
              playGalaxySound('toggle')
              setIsReviewingSave(false)
            }}
            className="flex size-7 shrink-0 items-center justify-center text-galaxy-subtle transition-colors hover:bg-galaxy-soft hover:text-galaxy-text"
          >
            <X aria-hidden="true" className="size-4" strokeWidth={1.8} />
          </button>
        </div>

        <div
          data-stage-block
          className="flex-1 space-y-4 overflow-y-auto px-4 py-4 text-[11px] leading-[16px]"
        >
          <div className="space-y-2">
            <h3 className="text-[12px] font-semibold text-galaxy-text">
              Fakta bisnis yang dapat diingat AI
            </h3>
            <p className="text-[10px] text-galaxy-subtle">
              Hanya muncul bila AI mengusulkan kandidat yang berasal dari pernyataan owner.
            </p>

            {candidates.length > 0 ? (
              <div className="mt-2 space-y-2.5">
                {candidates.map((cand, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-2.5 rounded-md bg-galaxy-soft/70 p-2.5 ring-1 ring-galaxy-line"
                  >
                    <input
                      id={`memory-candidate-${idx}`}
                      type="checkbox"
                      aria-label={cand.fact_text}
                      checked={cand.selected}
                      onChange={(event) => {
                        const checked = event.target.checked
                        playGalaxySound('toggle')
                        setCandidateOverrides((prev) => ({
                          ...prev,
                          [idx]: { ...prev[idx], selected: checked },
                        }))
                      }}
                      className="mt-0.5 size-3.5 shrink-0 accent-primary"
                    />
                    <label
                      htmlFor={`memory-candidate-${idx}`}
                      className="min-w-0 flex-1 cursor-pointer"
                    >
                      <span className="block font-medium text-galaxy-text">{cand.fact_text}</span>
                      <span className="mt-0.5 block text-[10px] text-galaxy-subtle">
                        Sumber: pesan owner dalam konsultasi ini
                      </span>
                    </label>
                  </div>
                ))}
              </div>
            ) : (
              <p className="rounded-md bg-galaxy-soft/50 p-2.5 text-galaxy-muted ring-1 ring-galaxy-line">
                Tidak ada kandidat fakta bisnis baru yang diusulkan pada sesi ini.
              </p>
            )}

            <p className="pt-1 text-[10px] text-galaxy-muted">
              Owner dapat memilih untuk mengonfirmasi atau tidak menyimpan fakta tersebut sebagai
              Business Memory.
            </p>
          </div>

          <div className="border-t border-galaxy-line pt-3">
            <h3 className="flex items-center gap-1.5 text-[11px] font-semibold text-galaxy-text">
              <Info aria-hidden="true" className="size-3.5 text-galaxy-subtle" />
              <span>Apa yang terjadi setelah disimpan?</span>
            </h3>
            <p className="pt-1 text-galaxy-muted">
              Sesi diarsipkan dan hasil tetap bisa dibaca. Ini tidak berarti masalah bisnis telah
              terselesaikan.
            </p>
          </div>

          {errorMessage && (
            <p role="alert" className="bg-danger-soft px-2.5 py-1.5 text-[11px] text-danger">
              {errorMessage}
            </p>
          )}
        </div>

        <div data-stage-block className="border-t border-galaxy-line px-4 py-3">
          <button
            type="button"
            disabled={adapter.isProcessing}
            onClick={() => void handleConfirmSave()}
            className="flex h-9 w-full items-center justify-center bg-galaxy-soft text-[11px] font-semibold text-galaxy-text ring-1 ring-galaxy-line transition-colors hover:bg-galaxy-accent-soft disabled:opacity-50"
          >
            {adapter.isProcessing ? 'Menyimpan...' : 'Konfirmasi & Simpan'}
          </button>
        </div>
      </div>
    )
  }

  // STATE C: Structured Solution Card
  if (showStructuredSolution && adapter.latestSolution) {
    return (
      <div ref={panelRef} className="flex flex-1 flex-col overflow-hidden">
        <div
          data-stage-block
          className="flex items-start justify-between gap-3 border-b border-galaxy-line px-4 pt-4 pb-3"
        >
          <div className="min-w-0 flex-1">
            <p className="text-[10px] font-semibold tracking-wider text-galaxy-subtle uppercase">
              ATLAS AI CONSULTATION
            </p>
            <h2 className="pt-1 text-[14px] leading-5 font-bold text-galaxy-text">
              Hasil Konsultasi — {topicLabel}
            </h2>
            <p className="pt-0.5 text-[11px] leading-4 text-galaxy-subtle">
              {adapter.status === 'ARCHIVED'
                ? 'Tersimpan di riwayat konsultasi'
                : 'Solusi siap ditinjau · Belum disimpan'}
            </p>
          </div>
          <button
            type="button"
            aria-label="Tutup solusi"
            onClick={onClose}
            className="flex size-7 shrink-0 items-center justify-center text-galaxy-subtle transition-colors hover:bg-galaxy-soft hover:text-galaxy-text"
          >
            <X aria-hidden="true" className="size-4" strokeWidth={1.8} />
          </button>
        </div>

        <div
          data-stage-block
          className="flex-1 [scrollbar-width:thin] [scrollbar-color:var(--color-galaxy-line)_transparent] overflow-y-auto px-4 py-3.5"
        >
          <GroundedSolutionView solution={adapter.latestSolution} />
        </div>

        {adapter.status === 'SOLUTION_READY' ? (
          <div
            data-stage-block
            className="grid grid-cols-2 gap-2 border-t border-galaxy-line px-4 py-3"
          >
            <button
              type="button"
              disabled={adapter.isProcessing}
              onClick={() => {
                playGalaxySound('toggle')
                setIsContinuingDiscussion(true)
              }}
              className="flex h-9 items-center justify-center bg-galaxy-soft px-3 text-[11px] font-semibold text-galaxy-text ring-1 ring-galaxy-line transition-colors hover:bg-galaxy-accent-soft disabled:opacity-50"
            >
              Lanjut diskusi
            </button>
            <button
              type="button"
              disabled={adapter.isProcessing}
              onClick={() => {
                playGalaxySound('toggle')
                setIsReviewingSave(true)
              }}
              className="flex h-9 items-center justify-center bg-primary px-3 text-[11px] font-semibold text-white transition-colors hover:bg-primary-hover disabled:opacity-50"
            >
              Simpan hasil
            </button>
          </div>
        ) : (
          adapter.onStartNewConsultation && (
            <div data-stage-block className="border-t border-galaxy-line px-4 py-3">
              <button
                type="button"
                onClick={adapter.onStartNewConsultation}
                className="flex h-9 w-full items-center justify-center gap-1.5 bg-galaxy-soft px-3 text-[11px] font-semibold text-galaxy-text ring-1 ring-galaxy-line transition-colors hover:bg-galaxy-accent-soft"
              >
                <Sparkles aria-hidden="true" className="size-3.5" />
                Mulai konsultasi baru
              </button>
            </div>
          )
        )}
      </div>
    )
  }

  // STATE B: Chat Consultation (COLLECTING_CONTEXT or CONTINUE_DISCUSSION)
  const turnEventToSend: TurnEvent =
    adapter.status === 'SOLUTION_READY' ? 'CONTINUE_DISCUSSION' : 'OWNER_REPLY'

  return (
    <div ref={panelRef} className="flex flex-1 flex-col overflow-hidden">
      <div
        data-stage-block
        className="flex items-start justify-between gap-3 border-b border-galaxy-line px-4 pt-4 pb-3"
      >
        <div className="min-w-0 flex-1">
          <p className="text-[10px] font-semibold tracking-wider text-galaxy-subtle uppercase">
            ATLAS AI CONSULTATION
          </p>
          <h2 className="pt-1 text-[14px] leading-5 font-bold text-galaxy-text">{topicLabel}</h2>
          <p className="pt-0.5 text-[11px] leading-4 text-galaxy-subtle">
            {isContinuingDiscussion ? 'Melanjutkan diskusi solusi' : 'Mengumpulkan konteks'}
          </p>
        </div>
        <button
          type="button"
          aria-label="Tutup solusi"
          onClick={onClose}
          className="flex size-7 shrink-0 items-center justify-center text-galaxy-subtle transition-colors hover:bg-galaxy-soft hover:text-galaxy-text"
        >
          <X aria-hidden="true" className="size-4" strokeWidth={1.8} />
        </button>
      </div>

      <div
        ref={scrollContainerRef}
        data-stage-block
        className="flex-1 [scrollbar-width:thin] [scrollbar-color:var(--color-galaxy-line)_transparent] space-y-3.5 overflow-y-auto px-4 py-3.5 text-[11px] leading-[16px]"
      >
        {/* Konteks yang sudah diketahui */}
        <details className="group rounded-md bg-galaxy-soft/60 p-2.5 ring-1 ring-galaxy-line">
          <summary className="flex cursor-pointer list-none items-start gap-2">
            <FileText aria-hidden="true" className="mt-0.5 size-3.5 shrink-0 text-galaxy-subtle" />
            <div className="min-w-0 flex-1">
              <p className="font-semibold text-galaxy-text">Konteks yang sudah diketahui</p>
              <p className="pt-0.5 text-[10px] text-galaxy-muted">
                AI telah menerima statistik isu dan bukti ulasan dari backend.
              </p>
              <span className="mt-1 inline-flex items-center gap-1 text-[10px] text-galaxy-subtle">
                Lihat detail sumber
                <ChevronDown aria-hidden="true" className="size-3" />
              </span>
            </div>
          </summary>
          {adapter.contextStats && (
            <div className="mt-2 grid grid-cols-2 gap-2 border-t border-galaxy-line pt-2 text-[10px] text-galaxy-muted">
              <div>Feedback unik: {adapter.contextStats.uniqueFeedbacks}</div>
              <div>Opini terkait: {adapter.contextStats.opinionCount}</div>
              <div>Opini negatif: {adapter.contextStats.negativeCount}</div>
              <div>Memori aktif: {adapter.contextStats.memoriesCount}</div>
            </div>
          )}
        </details>

        {/* Chat Message History */}
        <div className="space-y-3">
          {adapter.messages.map((msg) => {
            if (msg.role === 'ATLAS_AI' && msg.message_type === 'TEXT') {
              return (
                <div
                  key={msg.id}
                  data-chat-msg-id={msg.id}
                  className="flex origin-top-left items-start gap-2.5"
                >
                  <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-galaxy-soft text-galaxy-accent ring-1 ring-galaxy-line">
                    <Sparkles aria-hidden="true" className="size-3" />
                  </span>
                  <div className="min-w-0 flex-1 rounded-md bg-galaxy-soft/45 px-3 py-2 ring-1 ring-galaxy-line/70">
                    <p className="text-[10px] font-semibold text-galaxy-subtle">ATLAS AI</p>
                    {msg.content && <p className="pt-1 text-galaxy-text">{msg.content}</p>}
                  </div>
                </div>
              )
            }

            if (msg.role === 'ATLAS_AI' && msg.message_type === 'SOLUTION' && msg.solution) {
              return (
                <div
                  key={msg.id}
                  data-chat-msg-id={msg.id}
                  className="origin-top-left rounded-md bg-galaxy-soft/70 p-2.5 text-[10px] text-galaxy-muted ring-1 ring-galaxy-line"
                >
                  <p className="font-semibold text-galaxy-accent">
                    ATLAS AI — Ringkasan Solusi Sebelumnya
                  </p>
                  <p className="pt-0.5 text-galaxy-text">
                    {msg.solution.recommendations[0]?.title ?? msg.solution.findings[0]?.statement}
                  </p>
                </div>
              )
            }

            if (msg.role === 'OWNER') {
              return (
                <div
                  key={msg.id}
                  data-chat-msg-id={msg.id}
                  className="flex origin-top-right items-start justify-end gap-2 pl-6"
                >
                  <div className="rounded-md bg-galaxy-accent-soft px-3 py-2 text-galaxy-text ring-1 ring-galaxy-accent/30">
                    <p>{msg.content || 'Melanjutkan langkah konsultasi.'}</p>
                  </div>
                  <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-galaxy-soft text-galaxy-subtle ring-1 ring-galaxy-line">
                    <User aria-hidden="true" className="size-3" />
                  </span>
                </div>
              )
            }

            return null
          })}
        </div>

        {adapter.isProcessing && (
          <div
            role="status"
            className="flex items-center gap-2 rounded-md bg-galaxy-soft px-3 py-2 text-galaxy-accent ring-1 ring-galaxy-line"
          >
            <Loader2 aria-hidden="true" className="size-3.5 animate-spin" />
            <span>Menunggu respons AI...</span>
          </div>
        )}

        {errorMessage && (
          <p role="alert" className="bg-danger-soft px-2.5 py-1.5 text-[11px] text-danger">
            {errorMessage}
          </p>
        )}
      </div>

      {/* Chat Input & Action Controls */}
      <div data-stage-block className="space-y-2.5 border-t border-galaxy-line px-4 py-3">
        <div className="relative rounded-md border border-galaxy-line bg-galaxy-soft/70 p-2 transition-colors focus-within:border-galaxy-accent">
          <textarea
            rows={2}
            aria-label="Ceritakan kondisi di toko"
            placeholder="Ceritakan kondisi di toko..."
            value={replyText}
            disabled={adapter.isProcessing}
            onChange={(event) => setReplyText(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === 'Enter' && !event.shiftKey) {
                event.preventDefault()
                void handleTurn(turnEventToSend)
              }
            }}
            className="w-full resize-none bg-transparent pr-7 text-[11px] text-galaxy-text placeholder:text-galaxy-subtle focus:outline-none disabled:opacity-60"
          />
          <button
            ref={sendButtonRef}
            type="button"
            aria-label="Kirim jawaban"
            disabled={adapter.isProcessing}
            onClick={() => void handleTurn(turnEventToSend)}
            className="absolute right-2 bottom-2 flex size-6 items-center justify-center text-galaxy-subtle transition-colors hover:text-galaxy-text disabled:opacity-40"
          >
            <Send aria-hidden="true" className="size-3.5" />
          </button>
        </div>

        <div className="flex items-center justify-between gap-2 text-[11px]">
          {hasAwaitingQuestion ? (
            <button
              type="button"
              disabled={adapter.isProcessing}
              onClick={() => void handleTurn('SKIP_QUESTION')}
              className="font-medium text-galaxy-muted transition-colors hover:text-galaxy-text disabled:opacity-50"
            >
              Lewati pertanyaan
            </button>
          ) : isContinuingDiscussion ? (
            <button
              type="button"
              onClick={() => {
                playGalaxySound('toggle')
                setIsContinuingDiscussion(false)
              }}
              className="font-medium text-galaxy-muted transition-colors hover:text-galaxy-text"
            >
              Kembali ke solusi
            </button>
          ) : (
            <span />
          )}

          {adapter.status === 'COLLECTING_CONTEXT' && (
            <button
              type="button"
              disabled={adapter.isProcessing}
              onClick={() => void handleTurn('GENERATE_NOW')}
              className="inline-flex items-center gap-1 font-semibold text-galaxy-text transition-colors hover:text-galaxy-accent disabled:opacity-50"
            >
              <Sparkles aria-hidden="true" className="size-3" />
              Buat solusi sekarang
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
