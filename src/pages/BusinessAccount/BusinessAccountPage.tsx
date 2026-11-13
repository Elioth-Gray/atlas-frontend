import { Save } from 'lucide-react'
import type { FormEvent } from 'react'
import { useState } from 'react'
import { toast } from 'sonner'

import { PageHeader } from '@/components/layout/PageHeader'
import { APP_NAME } from '@/constants'
import { useAuth } from '@/contexts/AuthContext'
import { useMyShopDetail, useUpdateMyShop } from '@/hooks/data/useOwnerShops'
import { useShopCategories, useShopScales } from '@/hooks/data/usePublicShop'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'

import type { BusinessFormValues } from './businessAccountData'
import { BUSINESS_FORM_VALUES, mapShopDetailToFormValues } from './businessAccountData'
import { BusinessMemoriesCard } from './components/BusinessMemoriesCard'
import { BusinessProfileCard } from './components/BusinessProfileCard'
import { OwnerContactCard } from './components/OwnerContactCard'

export default function BusinessAccountPage() {
  useDocumentTitle(`Edit Akun Bisnis | ${APP_NAME}`)
  const { activeShopId, isAuthenticated } = useAuth()
  const shopDetailQuery = useMyShopDetail(activeShopId, isAuthenticated)
  const updateShopMutation = useUpdateMyShop(activeShopId)
  const categoriesQuery = useShopCategories()
  const scalesQuery = useShopScales()

  const [overrides, setOverrides] = useState<Partial<BusinessFormValues>>({})
  const [profileVersion, setProfileVersion] = useState(0)

  const baseValues = shopDetailQuery.data
    ? mapShopDetailToFormValues(shopDetailQuery.data)
    : BUSINESS_FORM_VALUES
  const values: BusinessFormValues = { ...baseValues, ...overrides }

  function handleFieldChange(field: keyof BusinessFormValues, value: string) {
    setOverrides((current) => ({ ...current, [field]: value }))
  }

  function handleReset() {
    setOverrides({})
    setProfileVersion((version) => version + 1)
    toast.info('Perubahan yang belum disimpan telah dibatalkan.')
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!isAuthenticated || !activeShopId) {
      toast.success('Perubahan berhasil disimpan.')
      return
    }

    try {
      await updateShopMutation.mutateAsync({
        name: values.name.trim(),
        description: values.description.trim() || null,
        website: values.website.trim() || null,
        image: values.image.trim() || null,
        category_id: values.categoryId,
        scale_id: values.scaleId,
        owner: {
          name: values.ownerName.trim(),
          phone_number: values.phone.trim(),
        },
      })
      setOverrides({})
      toast.success('Perubahan profil bisnis berhasil disimpan.')
    } catch (error) {
      const msg = error instanceof Error ? error.message : 'Gagal menyimpan perubahan akun bisnis.'
      toast.error(msg)
    }
  }

  return (
    <div className="flex flex-1 flex-col">
      <PageHeader
        title="Edit Akun Bisnis"
        subtitle="Kelola profil bisnis, tim, dan pengaturan kamu."
      />

      <main className="mx-auto w-full max-w-[1600px] flex-1 px-4 pt-[22px] pb-[50px] sm:px-7">
        <form onSubmit={(event) => void handleSubmit(event)}>
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
                disabled={updateShopMutation.isPending}
                className="flex h-[37px] items-center justify-center gap-[7px] bg-primary px-3.5 text-[11px] font-semibold text-white shadow-card transition-opacity hover:bg-primary-hover hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary disabled:opacity-60"
              >
                <Save aria-hidden="true" className="size-4" strokeWidth={1.8} />
                {updateShopMutation.isPending ? 'Menyimpan...' : 'Simpan perubahan'}
              </button>
            </div>
          </div>

          <div className="mt-[18px] flex flex-col gap-3">
            <BusinessProfileCard
              key={profileVersion}
              values={values}
              categories={categoriesQuery.data}
              scales={scalesQuery.data}
              onChange={handleFieldChange}
            />
            <OwnerContactCard values={values} onChange={handleFieldChange} />
          </div>
        </form>

        <div className="mt-3">
          <BusinessMemoriesCard shopId={activeShopId} enabled={isAuthenticated} />
        </div>
      </main>
    </div>
  )
}
