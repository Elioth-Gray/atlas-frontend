import { Upload } from 'lucide-react'
import type { ChangeEvent } from 'react'
import { useEffect, useId, useRef, useState } from 'react'

import { Card } from '@/components/ui/Card'

import type { BusinessFormValues } from '../akunBisnisData'
import { BUSINESS_CATEGORIES, BUSINESS_LOGO_INITIALS, BUSINESS_SCALES } from '../akunBisnisData'
import { SelectField, TextareaField, TextField } from './FormFields'

const LOGO_TYPES = ['image/png', 'image/jpeg', 'image/svg+xml']
const MAX_LOGO_SIZE = 2 * 1024 * 1024

interface BusinessProfileCardProps {
  values: BusinessFormValues
  onChange: (field: keyof BusinessFormValues, value: string) => void
}

export function BusinessProfileCard({ values, onChange }: BusinessProfileCardProps) {
  const id = useId()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [logoPreview, setLogoPreview] = useState<string | null>(null)
  const [logoError, setLogoError] = useState<string | null>(null)

  useEffect(() => {
    if (!logoPreview) return

    return () => URL.revokeObjectURL(logoPreview)
  }, [logoPreview])

  function handleLogoChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]
    event.target.value = ''

    if (!file) return

    if (!LOGO_TYPES.includes(file.type)) {
      setLogoError('Format logo harus PNG, JPG, atau SVG.')
      return
    }

    if (file.size > MAX_LOGO_SIZE) {
      setLogoError('Ukuran logo maksimal 2 MB.')
      return
    }

    setLogoError(null)
    setLogoPreview(URL.createObjectURL(file))
  }

  return (
    <Card className="p-5" label="Profil bisnis">
      <div className="border-b border-border pb-[15px]">
        <h2 className="text-[15px] leading-[18px] font-bold text-heading">Profil bisnis</h2>
        <p className="pt-1 text-[10px] leading-3 text-body">
          Perbarui tampilan profil bisnismu di ATLAS.
        </p>
      </div>

      <div className="grid gap-6 pt-[18px] lg:grid-cols-[225px_minmax(0,1fr)]">
        <div className="flex items-start gap-[14px]">
          <div className="flex size-[65px] shrink-0 items-center justify-center overflow-hidden rounded-[16px] bg-linear-to-br from-[#745DC7] to-[#2A274C] text-[15px] text-white">
            {logoPreview ? (
              <img
                src={logoPreview}
                alt="Pratinjau logo bisnis"
                className="size-full object-cover"
              />
            ) : (
              BUSINESS_LOGO_INITIALS
            )}
          </div>

          <div className="min-w-0 flex-1">
            <p className="text-[10px] leading-[13.5px] font-bold text-body">Logo bisnis</p>
            <p className="pt-[3px] text-[10px] leading-3 text-muted-foreground">
              PNG, JPG, atau SVG. Maks. 2 MB.
            </p>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/png,image/jpeg,image/svg+xml"
              className="hidden"
              onChange={handleLogoChange}
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="mt-2 flex h-[27px] items-center gap-[5px] rounded-[9px] border border-border bg-surface px-2 text-[10px] font-semibold text-body transition-colors hover:bg-surface-subtle focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary"
            >
              <Upload aria-hidden="true" className="size-3.5" strokeWidth={1.8} />
              Upload logo baru
            </button>

            {logoError && (
              <p role="alert" className="pt-1.5 text-[10px] leading-3 text-[#D14343]">
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
            value={values.category}
            options={BUSINESS_CATEGORIES}
            onChange={(value) => onChange('category', value)}
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
            value={values.scale}
            options={BUSINESS_SCALES}
            onChange={(value) => onChange('scale', value)}
          />
        </div>
      </div>
    </Card>
  )
}
