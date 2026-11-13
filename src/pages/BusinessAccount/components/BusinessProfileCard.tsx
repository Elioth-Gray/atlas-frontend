import { Trash2, Upload } from 'lucide-react'
import type { ChangeEvent } from 'react'
import { useId, useRef, useState } from 'react'
import { toast } from 'sonner'

import { Card } from '@/components/ui/Card'
import type { Lookup } from '@/typings/api'
import { getInitials } from '@/utils/format'

import type { BusinessFormValues } from '../businessAccountData'
import {
  BUSINESS_CATEGORIES,
  BUSINESS_LOGO_INITIALS,
  BUSINESS_SCALES,
} from '../businessAccountData'
import { SelectField, TextareaField, TextField } from './FormFields'

const LOGO_TYPES = ['image/png', 'image/jpeg', 'image/svg+xml', 'image/webp']
const MAX_LOGO_SIZE = 2 * 1024 * 1024

function readFileAsDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        resolve(reader.result)
      } else {
        reject(new Error('Gagal membaca file gambar.'))
      }
    }
    reader.onerror = () => reject(new Error('Gagal membaca file gambar.'))
    reader.readAsDataURL(file)
  })
}

interface BusinessProfileCardProps {
  values: BusinessFormValues
  categories?: readonly Lookup[]
  scales?: readonly Lookup[]
  onChange: (field: keyof BusinessFormValues, value: string) => void
}

export function BusinessProfileCard({
  values,
  categories,
  scales,
  onChange,
}: BusinessProfileCardProps) {
  const id = useId()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [logoError, setLogoError] = useState<string | null>(null)

  async function handleLogoChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]
    event.target.value = ''

    if (!file) return

    if (!LOGO_TYPES.includes(file.type)) {
      const msg = 'Format logo harus PNG, JPG, WEBP, atau SVG.'
      setLogoError(msg)
      toast.error(msg)
      return
    }

    if (file.size > MAX_LOGO_SIZE) {
      const msg = 'Ukuran logo maksimal 2 MB.'
      setLogoError(msg)
      toast.error(msg)
      return
    }

    try {
      const dataUrl = await readFileAsDataUrl(file)
      setLogoError(null)
      onChange('image', dataUrl)
      toast.info('Logo baru dipilih. Klik "Simpan perubahan" untuk menyimpan.')
    } catch {
      const msg = 'Gagal membaca file logo. Silakan coba gambar lain.'
      setLogoError(msg)
      toast.error(msg)
    }
  }

  function handleRemoveLogo() {
    setLogoError(null)
    onChange('image', '')
    toast.info('Logo dihapus. Klik "Simpan perubahan" untuk menyimpan.')
  }

  const categoryOptions =
    categories && categories.length > 0
      ? categories.map((item) => ({ value: item.id, label: item.name }))
      : BUSINESS_CATEGORIES

  const scaleOptions =
    scales && scales.length > 0
      ? scales.map((item) => ({ value: item.id, label: item.name }))
      : BUSINESS_SCALES

  const activeLogo = values.image.trim() || null
  const initials = getInitials(values.name, BUSINESS_LOGO_INITIALS)

  return (
    <Card className="p-5" label="Profil bisnis">
      <div className="border-b border-border pb-[15px]">
        <h2 className="text-[15px] leading-[18px] font-bold text-heading">Profil bisnis</h2>
        <p className="pt-1 text-[11px] leading-3 text-body">
          Perbarui tampilan profil bisnismu di ATLAS.
        </p>
      </div>

      <div className="grid gap-6 pt-[18px] lg:grid-cols-[225px_minmax(0,1fr)]">
        <div className="flex items-start gap-[14px]">
          <div className="flex size-[65px] shrink-0 items-center justify-center overflow-hidden bg-primary text-[15px] text-white">
            {activeLogo ? (
              <img
                src={activeLogo}
                alt="Pratinjau logo bisnis"
                className="size-full object-cover"
              />
            ) : (
              initials
            )}
          </div>

          <div className="min-w-0 flex-1">
            <p className="text-[11px] leading-[13.5px] font-bold text-body">Logo bisnis</p>
            <p className="pt-[3px] text-[11px] leading-3 text-muted-foreground">
              PNG, JPG, WEBP, atau SVG. Maks. 2 MB.
            </p>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/png,image/jpeg,image/svg+xml,image/webp"
              className="hidden"
              onChange={(event) => void handleLogoChange(event)}
            />
            <div className="mt-2 flex flex-wrap items-center gap-1.5">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="flex h-8 items-center gap-[5px] border border-border bg-surface px-2 text-[11px] font-semibold text-body transition-colors hover:bg-surface-subtle focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary"
              >
                <Upload aria-hidden="true" className="size-3.5" strokeWidth={1.8} />
                Upload logo baru
              </button>

              {activeLogo && (
                <button
                  type="button"
                  aria-label="Hapus logo bisnis"
                  onClick={handleRemoveLogo}
                  className="flex h-8 items-center gap-1 border border-border bg-surface px-2 text-[11px] font-medium text-danger transition-colors hover:bg-surface-subtle focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary"
                >
                  <Trash2 aria-hidden="true" className="size-3.5" strokeWidth={1.8} />
                  Hapus
                </button>
              )}
            </div>

            {logoError && (
              <p role="alert" className="pt-1.5 text-[11px] leading-3 text-danger">
                {logoError}
              </p>
            )}
          </div>
        </div>

        <div className="grid content-start gap-x-4 gap-y-[14px] sm:grid-cols-2">
          <TextField
            id={`${id}-name`}
            label="Nama bisnis"
            value={values.name}
            autoComplete="organization"
            onChange={(value) => onChange('name', value)}
          />
          <SelectField
            id={`${id}-category`}
            label="Kategori bisnis"
            value={categories && categories.length > 0 ? values.categoryId : values.category}
            options={categoryOptions}
            onChange={(value) => {
              if (categories && categories.length > 0) {
                const found = categories.find((item) => item.id === value)
                onChange('categoryId', value)
                if (found) onChange('category', found.name)
              } else {
                onChange('category', value)
              }
            }}
          />
          <div className="sm:col-span-2">
            <TextareaField
              id={`${id}-description`}
              label="Deskripsi bisnis"
              value={values.description}
              onChange={(value) => onChange('description', value)}
            />
          </div>
          <TextField
            id={`${id}-website`}
            label="Website"
            type="url"
            value={values.website}
            autoComplete="url"
            onChange={(value) => onChange('website', value)}
          />
          <SelectField
            id={`${id}-scale`}
            label="Skala bisnis"
            value={scales && scales.length > 0 ? values.scaleId : values.scale}
            options={scaleOptions}
            onChange={(value) => {
              if (scales && scales.length > 0) {
                const found = scales.find((item) => item.id === value)
                onChange('scaleId', value)
                if (found) onChange('scale', found.name)
              } else {
                onChange('scale', value)
              }
            }}
          />
        </div>
      </div>
    </Card>
  )
}
