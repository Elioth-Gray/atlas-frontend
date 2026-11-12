import {
  ArrowRight,
  Building2,
  LoaderCircle,
  Lock,
  Mail,
  MapPin,
  Store,
  Tag,
  User,
} from 'lucide-react'
import type { FormEvent, KeyboardEvent } from 'react'
import { useState } from 'react'
import type { FieldErrors } from 'react-hook-form'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router'

import { APP_NAME } from '@/constants'
import { cn } from '@/utils/cn'

import { AuthShell } from './AuthShell'
import { AuthInput, AuthPasswordField, AuthSelect } from './components/AuthField'

const BUSINESS_CATEGORIES = [
  'Kuliner & Minuman',
  'Retail',
  'Fashion',
  'Kecantikan',
  'Jasa',
  'Kesehatan',
  'Pendidikan',
  'Lainnya',
] as const

const BUSINESS_SCALES = ['Kecil', 'Sedang', 'Besar'] as const

interface SignUpValues {
  fullName: string
  email: string
  businessName: string
  category: string
  city: string
  businessScale: string
  password: string
  confirmPassword: string
}

const EMPTY_FORM: SignUpValues = {
  fullName: '',
  email: '',
  businessName: '',
  category: '',
  city: '',
  businessScale: '',
  password: '',
  confirmPassword: '',
}

// The form is split in two sections the owner can switch between; both stay in one form
const SECTIONS = [
  {
    id: 'akun',
    label: 'Data akun',
    fields: ['fullName', 'email', 'password', 'confirmPassword'],
  },
  {
    id: 'bisnis',
    label: 'Data bisnis',
    fields: ['businessName', 'category', 'city', 'businessScale'],
  },
] as const satisfies readonly {
  id: string
  label: string
  fields: readonly (keyof SignUpValues)[]
}[]

type SectionId = (typeof SECTIONS)[number]['id']

const SECONDARY_BUTTON_CLASS =
  'flex h-10 items-center justify-center border border-body px-4 text-sm font-semibold text-heading transition-colors hover:border-primary hover:bg-primary hover:text-primary-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary active:translate-y-px'

export default function SignUpPage() {
  const navigate = useNavigate()
  const [activeSection, setActiveSection] = useState<SectionId>('akun')
  // The slide only plays after the first switch, so the form does not move on page load
  const [hasSwitched, setHasSwitched] = useState(false)
  const {
    register,
    handleSubmit,
    getValues,
    trigger,
    formState: { errors, isSubmitting },
  } = useForm<SignUpValues>({ mode: 'onTouched', defaultValues: EMPTY_FORM })

  function showSectionWithErrors(fieldErrors: FieldErrors<SignUpValues>) {
    const section = SECTIONS.find(({ fields }) => fields.some((field) => field in fieldErrors))
    if (section) switchSection(section.id)
  }

  function switchSection(id: SectionId) {
    if (id === activeSection) return
    setHasSwitched(true)
    setActiveSection(id)
  }

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    void handleSubmit(async () => {
      // Frontend demo: replace with the sign-up endpoint once authentication is available.
      await new Promise((resolve) => setTimeout(resolve, 650))
      void navigate('/dashboard', { replace: true })
    }, showSectionWithErrors)(event)
  }

  async function goToBusinessSection() {
    const isAccountValid = await trigger([...SECTIONS[0].fields])
    if (isAccountValid) switchSection('bisnis')
  }

  function handleTabKeyDown(event: KeyboardEvent<HTMLButtonElement>) {
    if (event.key !== 'ArrowRight' && event.key !== 'ArrowLeft') return
    event.preventDefault()
    const next = activeSection === 'akun' ? 'bisnis' : 'akun'
    switchSection(next)
    document.getElementById(`signup-tab-${next}`)?.focus()
  }

  return (
    <AuthShell
      title="Mulai Berkembang bersama ATLAS"
      description="Buat akun bisnis dan ubah masukan pelanggan menjadi wawasan yang bisa ditindaklanjuti."
    >
      <title>Daftar | {APP_NAME}</title>

      <div>
        <div
          role="tablist"
          aria-label="Bagian formulir pendaftaran"
          className="relative grid grid-cols-2 border-b border-border"
        >
          <span
            aria-hidden="true"
            className={cn(
              'absolute bottom-[-1px] left-0 h-0.5 w-1/2 bg-primary transition-transform duration-300 ease-out motion-reduce:transition-none',
              activeSection === 'bisnis' && 'translate-x-full'
            )}
          />
          {SECTIONS.map(({ id, label }, index) => {
            const isActive = id === activeSection
            return (
              <button
                key={id}
                id={`signup-tab-${id}`}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-controls={`signup-panel-${id}`}
                tabIndex={isActive ? 0 : -1}
                onClick={() => switchSection(id)}
                onKeyDown={handleTabKeyDown}
                className={cn(
                  'flex h-10 items-center justify-center gap-2 text-[13px] font-semibold transition-colors focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-secondary',
                  isActive ? 'text-heading' : 'text-muted-foreground hover:text-heading'
                )}
              >
                <span className="font-display text-base leading-none">{index + 1}</span>
                {label}
              </button>
            )
          })}
        </div>

        <form onSubmit={onSubmit} noValidate className="mt-5">
          <div
            id="signup-panel-akun"
            role="tabpanel"
            aria-labelledby="signup-tab-akun"
            hidden={activeSection !== 'akun'}
            className={cn('grid gap-4 sm:grid-cols-2', hasSwitched && 'animate-slide-from-left')}
          >
            <div className="sm:col-span-2">
              <AuthInput
                id="full-name"
                label="Nama Lengkap"
                icon={User}
                placeholder="Nama lengkap Anda"
                autoComplete="name"
                error={errors.fullName?.message}
                {...register('fullName', { required: 'Nama lengkap wajib diisi.' })}
              />
            </div>

            <div className="sm:col-span-2">
              <AuthInput
                id="business-email"
                label="Email Bisnis"
                icon={Mail}
                type="email"
                placeholder="anda@bisnis.com"
                autoComplete="email"
                error={errors.email?.message}
                {...register('email', {
                  required: 'Email bisnis wajib diisi.',
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: 'Masukkan alamat email yang valid.',
                  },
                })}
              />
            </div>

            <AuthPasswordField
              id="password"
              label="Kata Sandi"
              icon={Lock}
              placeholder="Minimal 8 karakter"
              autoComplete="new-password"
              error={errors.password?.message}
              {...register('password', {
                required: 'Kata sandi wajib diisi.',
                minLength: { value: 8, message: 'Kata sandi minimal 8 karakter.' },
              })}
            />

            <AuthPasswordField
              id="confirm-password"
              label="Konfirmasi Kata Sandi"
              icon={Lock}
              placeholder="Ulangi kata sandi"
              autoComplete="new-password"
              error={errors.confirmPassword?.message}
              {...register('confirmPassword', {
                required: 'Konfirmasi kata sandi wajib diisi.',
                validate: (value) => value === getValues('password') || 'Kata sandi belum sama.',
                deps: ['password'],
              })}
            />
          </div>

          <div
            id="signup-panel-bisnis"
            role="tabpanel"
            aria-labelledby="signup-tab-bisnis"
            hidden={activeSection !== 'bisnis'}
            className={cn('grid gap-4 sm:grid-cols-2', hasSwitched && 'animate-slide-from-right')}
          >
            <AuthInput
              id="business-name"
              label="Nama Bisnis"
              icon={Store}
              placeholder="Contoh: Kopi Tetangga"
              autoComplete="organization"
              error={errors.businessName?.message}
              {...register('businessName', { required: 'Nama bisnis wajib diisi.' })}
            />

            <AuthSelect
              id="business-category"
              label="Kategori Bisnis"
              icon={Tag}
              placeholder="Pilih kategori"
              options={BUSINESS_CATEGORIES}
              error={errors.category?.message}
              {...register('category', { required: 'Pilih kategori bisnis Anda.' })}
            />

            <AuthInput
              id="business-city"
              label="Lokasi Bisnis (Kota)"
              icon={MapPin}
              placeholder="Contoh: Bandung"
              autoComplete="address-level2"
              error={errors.city?.message}
              {...register('city', { required: 'Lokasi bisnis wajib diisi.' })}
            />

            <AuthSelect
              id="business-scale"
              label="Skala Bisnis"
              icon={Building2}
              placeholder="Pilih skala bisnis"
              options={BUSINESS_SCALES}
              error={errors.businessScale?.message}
              {...register('businessScale', { required: 'Skala bisnis wajib diisi.' })}
            />
          </div>

          <div className="mt-6 grid grid-cols-[auto_minmax(0,1fr)] gap-3">
            {activeSection === 'akun' ? (
              <button
                type="button"
                onClick={() => void goToBusinessSection()}
                className={SECONDARY_BUTTON_CLASS}
              >
                Lanjut
              </button>
            ) : (
              <button
                type="button"
                onClick={() => switchSection('akun')}
                className={SECONDARY_BUTTON_CLASS}
              >
                Kembali
              </button>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="flex h-10 w-full items-center justify-center gap-2 bg-primary text-sm font-semibold whitespace-nowrap text-primary-foreground transition-colors duration-200 hover:bg-primary-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary active:translate-y-px disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isSubmitting ? (
                <>
                  <LoaderCircle aria-hidden="true" className="size-4 animate-spin" />
                  Membuat akun...
                </>
              ) : (
                <>
                  Buat Akun
                  <ArrowRight aria-hidden="true" className="size-4" strokeWidth={2} />
                </>
              )}
            </button>
          </div>
        </form>

        <div className="my-5 h-px bg-border" />

        <p className="text-center text-[13px] text-body">
          Sudah punya akun?{' '}
          <Link
            to="/login"
            className="font-semibold text-primary transition-colors hover:text-secondary dark:text-secondary"
          >
            Masuk
          </Link>
        </p>
      </div>
    </AuthShell>
  )
}
