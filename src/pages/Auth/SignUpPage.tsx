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
import type { FormEvent } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router'

import { APP_NAME } from '@/constants'

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

export default function SignUpPage() {
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm<SignUpValues>({ mode: 'onTouched', defaultValues: EMPTY_FORM })

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    void handleSubmit(async () => {
      // Frontend demo: replace with the sign-up endpoint once authentication is available.
      await new Promise((resolve) => setTimeout(resolve, 650))
      void navigate('/dashboard', { replace: true })
    })(event)
  }

  return (
    <AuthShell>
      <title>Daftar — {APP_NAME}</title>

      <div className="w-full max-w-[640px] rounded-[28px] border border-border bg-surface/90 p-6 shadow-[0_36px_90px_-38px_rgba(76,29,149,0.5)] backdrop-blur-xl sm:p-9">
        <div className="text-center">
          <span className="inline-flex items-center rounded-full border border-primary/15 bg-primary/5 px-3 py-1 text-[10px] font-semibold tracking-[0.18em] text-primary dark:border-secondary/25 dark:bg-secondary/10 dark:text-secondary">
            AKUN BISNIS
          </span>
          <h1 className="mt-3 text-[26px] leading-tight font-semibold tracking-[-0.025em] text-heading sm:text-[30px]">
            Mulai Berkembang bersama ATLAS
          </h1>
          <p className="mx-auto mt-2 max-w-md text-[12px] leading-6 text-body">
            Buat akun bisnis dan ubah masukan pelanggan menjadi wawasan yang bisa ditindaklanjuti.
          </p>
        </div>

        <form onSubmit={onSubmit} noValidate className="mt-7">
          <div className="grid gap-4 sm:grid-cols-2">
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

          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-6 flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-linear-to-r from-[#8B5CF6] to-[#6D28D9] text-sm font-semibold text-white shadow-[0_16px_32px_-14px_rgba(109,40,217,0.8)] transition duration-200 hover:opacity-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary disabled:cursor-not-allowed disabled:opacity-70"
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
        </form>

        <div className="my-6 h-px bg-border" />

        <p className="text-center text-[12px] text-body">
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
