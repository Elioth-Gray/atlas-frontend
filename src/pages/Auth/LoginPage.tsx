import { ArrowRight, LoaderCircle, Lock, Mail } from 'lucide-react'
import type { FormEvent } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router'

import { APP_NAME } from '@/constants'

import { AuthShell } from './AuthShell'
import { AuthInput, AuthPasswordField } from './components/AuthField'

interface LoginValues {
  email: string
  password: string
  remember: boolean
}

const EMPTY_FORM: LoginValues = {
  email: '',
  password: '',
  remember: false,
}

export default function LoginPage() {
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginValues>({ mode: 'onTouched', defaultValues: EMPTY_FORM })

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    void handleSubmit(async () => {
      // Frontend demo: replace with the sign-in endpoint once authentication is available.
      await new Promise((resolve) => setTimeout(resolve, 550))
      void navigate('/dashboard', { replace: true })
    })(event)
  }

  return (
    <AuthShell
      title="Masuk ke ATLAS"
      description="Lanjutkan perjalanan Anda memahami pelanggan dan menumbuhkan bisnis."
    >
      <title>Masuk | {APP_NAME}</title>

      <div>
        <form onSubmit={onSubmit} noValidate className="flex flex-col gap-4">
          <AuthInput
            id="login-email"
            label="Email"
            icon={Mail}
            type="email"
            placeholder="anda@bisnis.com"
            autoComplete="email"
            error={errors.email?.message}
            {...register('email', {
              required: 'Email wajib diisi.',
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: 'Masukkan alamat email yang valid.',
              },
            })}
          />

          <AuthPasswordField
            id="login-password"
            label="Kata Sandi"
            icon={Lock}
            placeholder="Masukkan kata sandi"
            autoComplete="current-password"
            error={errors.password?.message}
            {...register('password', { required: 'Kata sandi wajib diisi.' })}
          />

          <div className="flex flex-wrap items-center justify-between gap-2">
            <label className="flex cursor-pointer items-center gap-2 text-[11px] text-body">
              <input
                type="checkbox"
                className="size-4 border-field accent-primary"
                {...register('remember')}
              />
              Ingat saya
            </label>

            <a
              href="mailto:halo@atlas.id?subject=Reset%20kata%20sandi%20ATLAS"
              className="text-[11px] font-semibold text-primary transition-colors hover:text-secondary dark:text-secondary"
            >
              Lupa kata sandi?
            </a>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-1 flex h-10 w-full items-center justify-center gap-2 bg-primary text-sm font-semibold text-white transition duration-200 hover:bg-primary-hover hover:opacity-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isSubmitting ? (
              <>
                <LoaderCircle aria-hidden="true" className="size-4 animate-spin" />
                Memeriksa akun...
              </>
            ) : (
              <>
                Masuk
                <ArrowRight aria-hidden="true" className="size-4" strokeWidth={2} />
              </>
            )}
          </button>
        </form>

        <div className="my-5 h-px bg-border" />

        <p className="text-center text-[13px] text-body">
          Belum punya akun?{' '}
          <Link
            to="/signup"
            className="font-semibold text-primary transition-colors hover:text-secondary dark:text-secondary"
          >
            Daftar gratis
          </Link>
        </p>
      </div>
    </AuthShell>
  )
}
