import { ArrowRight, CheckCircle2, Telescope } from 'lucide-react'
import { Link } from 'react-router'

import { BrandLogo } from '@/components/brand/BrandLogo'

import { FaqSection } from './components/FaqSection'
import { GalaxyPreview } from './components/GalaxyPreview'
import { HeroGalaxy } from './components/HeroGalaxy'
import { LandingHeader } from './components/LandingHeader'
import { FEATURES, FOOTER_HELP_LINKS, FOOTER_PRODUCT_LINKS, STEPS } from './landingData'

const EYEBROW_CLASS =
  'inline-flex items-center gap-2 rounded-full border border-primary/15 bg-primary/5 px-3 py-1 text-[10px] font-semibold tracking-[0.18em] text-primary dark:border-secondary/25 dark:bg-secondary/10 dark:text-secondary'

const PRIMARY_BUTTON_CLASS =
  'inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-linear-to-r from-[#8B5CF6] to-[#6D28D9] px-5 text-sm font-semibold text-white shadow-[0_16px_32px_-14px_rgba(109,40,217,0.8)] transition duration-200 hover:-translate-y-0.5 hover:opacity-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary'

const SECONDARY_BUTTON_CLASS =
  'inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-border bg-surface px-5 text-sm font-semibold text-heading transition duration-200 hover:-translate-y-0.5 hover:border-secondary/40 hover:bg-surface-subtle focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary'

const FOOTER_LINK_CLASS =
  'w-fit text-[12px] text-body transition-colors hover:text-heading focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary'

export default function LandingPage() {
  const year = new Date().getFullYear()

  return (
    <div className="min-h-svh bg-background font-sans">
      <title>ATLAS — Feedback Pelanggan Jadi Insight Bisnis</title>

      <a
        href="#konten"
        className="sr-only z-[60] rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
      >
        Lewati ke konten
      </a>

      <LandingHeader />

      <main id="konten">
        <section
          id="beranda"
          className="relative scroll-mt-24 overflow-hidden px-5 pt-14 pb-20 sm:px-8 lg:pt-20 lg:pb-28"
        >
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="absolute -top-48 left-1/2 h-[640px] w-[960px] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(143,106,255,0.2),transparent_66%)] blur-2xl" />
            <div className="absolute top-20 -right-32 size-80 rounded-full bg-[#5A88F6]/10 blur-3xl" />
            <div className="absolute bottom-0 -left-32 size-80 rounded-full bg-[#EE6DAA]/10 blur-3xl" />
          </div>

          <div className="relative mx-auto grid w-full max-w-7xl items-center gap-14 lg:grid-cols-[1.04fr_0.96fr] lg:gap-10">
            <div>
              <h1 className="text-[clamp(2rem,4.2vw,3.6rem)] leading-[1.07] font-semibold tracking-[-0.035em] text-heading">
                Dengar Lebih Baik.
                <br />
                <span className="bg-linear-to-r from-[#7C3AED] via-[#8F6AFF] to-[#5A88F6] bg-clip-text text-transparent">
                  Pahami Lebih Dalam.
                </span>
                <br />
                Tumbuh Lebih Cerdas.
              </h1>

              <p className="mt-6 max-w-xl text-[14px] leading-7 text-body sm:text-[15px]">
                Ubah feedback pelanggan menjadi insight bisnis. ATLAS membantu UMKM mengumpulkan
                ulasan, menemukan masalah berulang, dan menentukan perbaikan lewat analisis AI.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Link to="/signup" className={PRIMARY_BUTTON_CLASS}>
                  Mulai Gratis
                  <ArrowRight aria-hidden="true" className="size-4" strokeWidth={2} />
                </Link>
                <a href="#galaxy" className={SECONDARY_BUTTON_CLASS}>
                  <Telescope
                    aria-hidden="true"
                    className="size-4 text-primary dark:text-secondary"
                    strokeWidth={1.9}
                  />
                  Lihat Demo Galaxy
                </a>
              </div>

              <ul className="mt-8 flex flex-wrap gap-x-5 gap-y-2.5 text-[11px] text-muted-foreground">
                {['Gratis untuk mulai', 'Tanpa kartu kredit', 'Siap dalam 5 menit'].map((item) => (
                  <li key={item} className="flex items-center gap-1.5">
                    <CheckCircle2
                      aria-hidden="true"
                      className="size-3.5 text-[#19A97C]"
                      strokeWidth={2}
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <HeroGalaxy />
          </div>
        </section>

        <section
          id="fitur"
          className="scroll-mt-24 border-y border-border bg-surface-subtle/50 px-5 py-20 sm:px-8 lg:py-28"
        >
          <div className="mx-auto w-full max-w-7xl">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl leading-tight font-semibold tracking-[-0.025em] text-heading sm:text-4xl">
                Semua yang Anda Butuhkan untuk Memahami Pelanggan
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-[13px] leading-7 text-body">
                Kumpulkan feedback, temukan masalah berulang, dan jadikan pengalaman pelanggan dasar
                perbaikan.
              </p>
            </div>

            <div className="mt-12 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {FEATURES.map(({ title, description }, index) => (
                <article
                  key={title}
                  className="group relative overflow-hidden rounded-[22px] border border-border bg-surface p-6 shadow-card transition duration-300 hover:-translate-y-1 hover:border-secondary/35 hover:shadow-[0_24px_50px_-30px_rgba(76,29,149,0.4)]"
                >
                  <span className="absolute top-5 right-5 text-[11px] font-semibold tracking-[0.16em] text-muted-foreground/40">
                    0{index + 1}
                  </span>
                  <h3 className="pr-8 text-[15px] leading-5 font-semibold text-heading">{title}</h3>
                  <p className="mt-2.5 text-[12px] leading-6 text-body">{description}</p>
                  <span
                    aria-hidden="true"
                    className="absolute -right-8 -bottom-8 size-24 rounded-full bg-secondary/10 opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-100"
                  />
                </article>
              ))}
            </div>
          </div>
        </section>

        <section
          id="cara-kerja"
          className="relative scroll-mt-24 overflow-hidden border-b border-border bg-[#F4EFFF] px-5 py-20 sm:px-8 lg:py-28 dark:bg-surface-subtle/40"
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-40 left-1/2 h-[420px] w-[760px] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(143,106,255,0.18),transparent_68%)] blur-2xl"
          />
          <div className="relative mx-auto w-full max-w-7xl">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl leading-tight font-semibold tracking-[-0.025em] text-heading sm:text-4xl">
                Dari Feedback Pelanggan ke Perbaikan Bisnis
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-[13px] leading-7 text-body">
                Empat langkah sederhana untuk mengubah pengalaman pelanggan menjadi keputusan yang
                lebih baik.
              </p>
            </div>

            <div className="mt-12 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {STEPS.map(({ title, description, icon: Icon }, index) => (
                <article
                  key={title}
                  className="relative overflow-hidden rounded-[22px] border border-white/80 bg-white/80 p-6 shadow-[0_20px_40px_-32px_rgba(76,29,149,0.45)] backdrop-blur dark:border-white/10 dark:bg-surface/80"
                >
                  <span
                    aria-hidden="true"
                    className="absolute top-4 right-5 text-[44px] leading-none font-bold text-primary/10 dark:text-white/5"
                  >
                    0{index + 1}
                  </span>
                  <span className="flex size-11 items-center justify-center rounded-xl bg-linear-to-br from-[#8B5CF6]/15 to-[#6D28D9]/10 text-primary dark:text-secondary">
                    <Icon aria-hidden="true" className="size-5" strokeWidth={1.8} />
                  </span>
                  <h3 className="mt-5 text-sm leading-5 font-semibold text-heading">{title}</h3>
                  <p className="mt-2 text-[12px] leading-6 text-body">{description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="galaxy" className="scroll-mt-24 px-5 py-20 sm:px-8 lg:py-28">
          <div className="mx-auto grid w-full max-w-7xl items-center gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
            <div>
              <h2 className="text-3xl leading-tight font-semibold tracking-[-0.025em] text-heading sm:text-4xl">
                Lihat Gambaran Utuh di Balik Setiap Ulasan
              </h2>
              <p className="mt-4 max-w-xl text-[13px] leading-7 text-body">
                Feedback bukan sekadar komentar. ATLAS menghubungkan feedback yang tersebar menjadi
                insight agar Anda tahu apa yang perlu diperhatikan.
              </p>

              <ul className="mt-7 flex flex-col gap-3.5">
                {[
                  'Tiap planet mewakili satu masalah dalam feedback.',
                  'Planet besar menandakan prioritas lebih tinggi.',
                  'Masalah terkait dikelompokkan secara visual.',
                  'Pilih planet untuk melihat masalah dan rekomendasi.',
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2.5 text-[12px] leading-5 text-body"
                  >
                    <CheckCircle2
                      aria-hidden="true"
                      className="mt-0.5 size-4 shrink-0 text-primary dark:text-secondary"
                      strokeWidth={1.9}
                    />
                    {item}
                  </li>
                ))}
              </ul>

              <Link to="/grup-feedback" className={`${PRIMARY_BUTTON_CLASS} mt-8`}>
                Jelajahi Demo Galaxy
                <ArrowRight aria-hidden="true" className="size-4" strokeWidth={2} />
              </Link>
            </div>

            <GalaxyPreview />
          </div>
        </section>

        <section
          id="faq"
          className="scroll-mt-24 border-t border-border bg-surface-subtle/50 px-5 py-20 sm:px-8 lg:py-28"
        >
          <div className="mx-auto w-full max-w-7xl">
            <div className="mx-auto max-w-2xl text-center">
              <span className={EYEBROW_CLASS}>FAQ</span>
              <h2 className="mt-5 text-3xl leading-tight font-semibold tracking-[-0.025em] text-heading sm:text-4xl">
                Pertanyaan yang Sering Diajukan
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-[13px] leading-7 text-body">
                Hal yang perlu Anda tahu sebelum mulai memakai ATLAS.
              </p>
            </div>

            <div className="mt-10">
              <FaqSection />
            </div>
          </div>
        </section>

        <section className="px-5 py-20 sm:px-8 lg:py-24">
          <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[32px] bg-[#170D2E] px-6 py-16 text-center shadow-[0_40px_100px_-45px_rgba(76,29,149,0.7)] sm:px-12 lg:py-20">
            <div aria-hidden="true" className="pointer-events-none absolute inset-0">
              <div className="absolute -top-32 left-1/2 h-[420px] w-[720px] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(143,106,255,0.5),transparent_65%)]" />
              <div className="absolute -bottom-40 -left-24 size-80 rounded-full bg-[#5A88F6]/20 blur-3xl" />
              <div className="absolute -right-20 bottom-0 size-64 rounded-full bg-[#EE6DAA]/15 blur-3xl" />
              <div className="absolute top-1/2 left-1/2 h-[70%] w-[110%] -translate-x-1/2 -translate-y-1/2 rotate-[-12deg] rounded-[50%] border border-white/10" />
              <span className="absolute top-[18%] left-[14%] size-1.5 animate-twinkle rounded-full bg-white/70" />
              <span className="absolute top-[26%] right-[18%] size-1 animate-twinkle rounded-full bg-white/60 [animation-delay:1.2s]" />
              <span className="absolute bottom-[20%] left-[30%] size-1 animate-twinkle rounded-full bg-white/60 [animation-delay:0.6s]" />
              <span className="absolute top-[20%] right-[30%] text-sm text-white/30">✦</span>
            </div>

            <div className="relative">
              <h2 className="mx-auto max-w-2xl text-3xl leading-tight font-semibold tracking-[-0.025em] text-white sm:text-4xl lg:text-[42px]">
                Pelanggan Anda Bercerita.
                <br />
                Dengarkan Lebih Cerdas.
              </h2>
              <p className="mx-auto mt-4 max-w-lg text-[13px] leading-7 text-white/60">
                Ambil keputusan lebih baik dengan memahami pengalaman nyata pelanggan.
              </p>

              <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                <Link
                  to="/signup"
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-white px-5 text-sm font-semibold text-[#5B21B6] shadow-lg transition duration-200 hover:-translate-y-0.5 hover:bg-white/95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  Mulai dengan ATLAS
                  <ArrowRight aria-hidden="true" className="size-4" strokeWidth={2} />
                </Link>
                <Link
                  to="/feedback/outlet"
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-white/25 bg-white/5 px-5 text-sm font-semibold text-white transition duration-200 hover:-translate-y-0.5 hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  Mulai Feedback
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-border bg-surface px-5 pt-14 pb-8 sm:px-8">
        <div className="mx-auto w-full max-w-7xl">
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
            <div className="max-w-sm">
              <BrandLogo to="/" />
              <p className="mt-5 text-[12px] leading-6 text-body">
                Feedback pelanggan dan perbaikan bisnis berbasis AI untuk UMKM Indonesia.
              </p>
            </div>

            <div className="flex flex-col gap-3">
              <p className="text-xs font-semibold text-heading">Produk</p>
              {FOOTER_PRODUCT_LINKS.map((link) => (
                <a key={link.label} href={link.href} className={FOOTER_LINK_CLASS}>
                  {link.label}
                </a>
              ))}
            </div>

            <div className="flex flex-col gap-3">
              <p className="text-xs font-semibold text-heading">Akun</p>
              <Link to="/login" className={FOOTER_LINK_CLASS}>
                Masuk
              </Link>
              <Link to="/signup" className={FOOTER_LINK_CLASS}>
                Daftar
              </Link>
            </div>

            <div className="flex flex-col gap-3">
              <p className="text-xs font-semibold text-heading">Bantuan</p>
              {FOOTER_HELP_LINKS.map((link) => (
                <a key={link.label} href={link.href} className={FOOTER_LINK_CLASS}>
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          <div className="mt-12 flex flex-col gap-2 border-t border-border pt-6 text-[11px] text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
            <p>© {year} ATLAS. Semua hak dilindungi.</p>
            <p>Dibuat untuk UMKM Indonesia.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
