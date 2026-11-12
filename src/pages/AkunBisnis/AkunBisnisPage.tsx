import { Save } from 'lucide-react'
import type { FormEvent } from 'react'
import { useEffect, useState } from 'react'

import { PageHeader } from '@/components/layout/PageHeader'
import { APP_NAME } from '@/constants'

import type { BusinessFormValues } from './akunBisnisData'
import { BUSINESS_FORM_VALUES } from './akunBisnisData'
import { BusinessProfileCard } from './components/BusinessProfileCard'
import { OwnerContactCard } from './components/OwnerContactCard'

export default function AkunBisnisPage() {
  const [values, setValues] = useState<BusinessFormValues>(BUSINESS_FORM_VALUES)
  const [profileVersion, setProfileVersion] = useState(0)
  const [isSaved, setIsSaved] = useState(false)

  useEffect(() => {
    if (!isSaved) return

    const timeout = window.setTimeout(() => setIsSaved(false), 3500)
    return () => window.clearTimeout(timeout)
  }, [isSaved])

  function handleFieldChange(field: keyof BusinessFormValues, value: string) {
    setValues((current) => ({ ...current, [field]: value }))
    setIsSaved(false)
  }

  function handleReset() {
    setValues(BUSINESS_FORM_VALUES)
    setProfileVersion((version) => version + 1)
    setIsSaved(false)
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsSaved(true)
  }

  return (
    <>
      <title>Edit Akun Bisnis | {APP_NAME}</title>

      <div className="flex flex-1 flex-col">
        <PageHeader
          title="Edit Akun Bisnis"
          subtitle="Kelola profil bisnis, tim, dan pengaturan kamu."
        />

        <main className="mx-auto w-full max-w-[1600px] flex-1 px-4 pt-[22px] pb-[50px] sm:px-7">
          <form onSubmit={handleSubmit}>
            <div className="flex min-h-[37px] flex-wrap items-center justify-between gap-2">
              <div className="flex flex-wrap items-center gap-[7px]">
                <button
                  type="button"
                  onClick={handleReset}
                  className="h-[37px] border border-border bg-surface px-3.5 text-[11px] font-semibold text-body transition-colors hover:bg-surface-subtle focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="flex h-[37px] items-center justify-center gap-[7px] bg-primary px-3.5 text-[11px] font-semibold text-white shadow-card transition-opacity hover:bg-primary-hover hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary"
                >
                  <Save aria-hidden="true" className="size-4" strokeWidth={1.8} />
                  Simpan perubahan
                </button>
              </div>

              {isSaved && (
                <p role="status" className="text-[11px] font-medium text-success">
                  Perubahan berhasil disimpan.
                </p>
              )}
            </div>

            <div className="mt-[18px] flex flex-col gap-3">
              <BusinessProfileCard
                key={profileVersion}
                values={values}
                onChange={handleFieldChange}
              />
              <OwnerContactCard values={values} onChange={handleFieldChange} />
            </div>
          </form>
        </main>
      </div>
    </>
  )
}
