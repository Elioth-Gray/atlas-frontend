import { Brain, Check, Edit3, Power, X } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'

import { Card } from '@/components/ui/Card'
import { useShopMemories, useUpdateMemory } from '@/hooks/data/useConsultations'
import type { Memory } from '@/typings/api'
import { cn } from '@/utils/cn'
import { formatShortDate } from '@/utils/format'

interface BusinessMemoriesCardProps {
  shopId: string | null
  enabled: boolean
}

export function BusinessMemoriesCard({ shopId, enabled }: BusinessMemoriesCardProps) {
  const [filterActive, setFilterActive] = useState<'all' | 'active' | 'inactive'>('all')
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editingText, setEditingText] = useState('')

  const isActiveParam = filterActive === 'all' ? undefined : filterActive === 'active'
  const memoriesQuery = useShopMemories(
    shopId,
    { is_active: isActiveParam, page_size: 50 },
    enabled
  )
  const updateMemoryMutation = useUpdateMemory(shopId)

  const memories = memoriesQuery.data?.data ?? []

  function startEdit(memory: Memory) {
    setEditingId(memory.id)
    setEditingText(memory.fact_text)
  }

  function cancelEdit() {
    setEditingId(null)
    setEditingText('')
  }

  async function saveFactText(memory: Memory) {
    const trimmed = editingText.trim()
    if (trimmed.length < 3) {
      toast.error('Fakta operasional minimal 3 karakter.')
      return
    }

    try {
      await updateMemoryMutation.mutateAsync({
        memoryId: memory.id,
        payload: { fact_text: trimmed },
      })
      setEditingId(null)
      setEditingText('')
      toast.success('Fakta operasional berhasil diperbarui.')
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Gagal memperbarui memori bisnis.')
    }
  }

  async function toggleActive(memory: Memory) {
    try {
      await updateMemoryMutation.mutateAsync({
        memoryId: memory.id,
        payload: { is_active: !memory.is_active },
      })
      toast.success(
        memory.is_active
          ? 'Memori operasional dinonaktifkan.'
          : 'Memori operasional diaktifkan kembali.'
      )
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Gagal mengubah status memori.')
    }
  }

  return (
    <Card className="p-5" label="Memori operasional AI">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border pb-[15px]">
        <div className="flex items-start gap-2.5">
          <span className="bg-accent-soft mt-0.5 flex size-7 shrink-0 items-center justify-center text-secondary">
            <Brain aria-hidden="true" className="size-4" strokeWidth={1.8} />
          </span>
          <div>
            <h2 className="text-[15px] leading-[18px] font-bold text-heading">
              Memori Operasional AI
            </h2>
            <p className="pt-1 text-[11px] leading-3 text-body">
              Fakta operasional terkonfirmasi yang digunakan AI sebagai konteks pada sesi konsultasi
              berikutnya.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1" role="group" aria-label="Filter status memori">
          {(
            [
              { id: 'all', label: 'Semua' },
              { id: 'active', label: 'Aktif' },
              { id: 'inactive', label: 'Nonaktif' },
            ] as const
          ).map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setFilterActive(tab.id)}
              className={cn(
                'h-7 px-2.5 text-[11px] font-medium transition-colors',
                filterActive === tab.id
                  ? 'bg-primary text-white'
                  : 'border border-border bg-surface text-body hover:bg-surface-subtle'
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="pt-4">
        {!enabled ? (
          <p className="text-[11px] text-muted-foreground">
            Masuk ke akun pemilik toko untuk melihat dan mengelola memori operasional AI yang
            tersimpan dari sesi konsultasi.
          </p>
        ) : memoriesQuery.isLoading ? (
          <p className="text-[11px] text-muted-foreground">Memuat memori operasional bisnis...</p>
        ) : memories.length === 0 ? (
          <p className="text-[11px] text-muted-foreground">
            Belum ada memori operasional yang tersimpan. Memori baru dapat dikonfirmasi saat kamu
            menyimpan hasil konsultasi AI di halaman Grup Feedback.
          </p>
        ) : (
          <ul className="divide-y divide-border">
            {memories.map((memory) => {
              const isEditing = editingId === memory.id
              return (
                <li
                  key={memory.id}
                  className="flex flex-col gap-2.5 py-3 first:pt-0 last:pb-0 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="min-w-0 flex-1">
                    {isEditing ? (
                      <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                        <input
                          type="text"
                          aria-label="Edit fakta operasional"
                          value={editingText}
                          onChange={(event) => setEditingText(event.target.value)}
                          className="h-8 flex-1 border border-field bg-surface-subtle px-2.5 text-[11px] text-body focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-secondary"
                        />
                        <div className="flex items-center gap-1.5">
                          <button
                            type="button"
                            disabled={updateMemoryMutation.isPending}
                            onClick={() => void saveFactText(memory)}
                            className="inline-flex h-8 items-center gap-1 bg-primary px-2.5 text-[11px] font-semibold text-white hover:bg-primary-hover disabled:opacity-60"
                          >
                            <Check aria-hidden="true" className="size-3.5" />
                            Simpan
                          </button>
                          <button
                            type="button"
                            onClick={cancelEdit}
                            className="inline-flex h-8 items-center gap-1 border border-border bg-surface px-2.5 text-[11px] font-medium text-body hover:bg-surface-subtle"
                          >
                            <X aria-hidden="true" className="size-3.5" />
                            Batal
                          </button>
                        </div>
                      </div>
                    ) : (
                      <>
                        <p
                          className={cn(
                            'text-[12px] leading-[17px] font-medium',
                            memory.is_active ? 'text-heading' : 'text-muted-foreground line-through'
                          )}
                        >
                          {memory.fact_text}
                        </p>
                        <div className="mt-1 flex flex-wrap items-center gap-2 text-[10px] text-muted-foreground">
                          <span
                            className={cn(
                              'inline-flex items-center px-1.5 py-0.5 font-semibold',
                              memory.is_active
                                ? 'bg-success-soft text-success'
                                : 'bg-surface-muted text-muted-foreground'
                            )}
                          >
                            {memory.is_active ? 'Aktif' : 'Nonaktif'}
                          </span>
                          <span>Dikonfirmasi {formatShortDate(memory.created_at)}</span>
                        </div>
                      </>
                    )}
                  </div>

                  {!isEditing && (
                    <div className="flex shrink-0 items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => startEdit(memory)}
                        className="inline-flex h-7 items-center gap-1 border border-border bg-surface px-2 text-[11px] font-medium text-body transition-colors hover:bg-surface-subtle"
                      >
                        <Edit3 aria-hidden="true" className="size-3" />
                        Edit
                      </button>
                      <button
                        type="button"
                        disabled={updateMemoryMutation.isPending}
                        onClick={() => void toggleActive(memory)}
                        className={cn(
                          'inline-flex h-7 items-center gap-1 border px-2 text-[11px] font-medium transition-colors disabled:opacity-60',
                          memory.is_active
                            ? 'border-border bg-surface text-body hover:bg-surface-subtle'
                            : 'bg-accent-soft border-secondary text-secondary hover:opacity-90'
                        )}
                      >
                        <Power aria-hidden="true" className="size-3" />
                        {memory.is_active ? 'Nonaktifkan' : 'Aktifkan'}
                      </button>
                    </div>
                  )}
                </li>
              )
            })}
          </ul>
        )}
      </div>
    </Card>
  )
}
