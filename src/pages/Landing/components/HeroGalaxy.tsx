import { Sparkles } from 'lucide-react'

const CHIP_CLASS =
  'rounded-full border border-border/80 bg-surface/90 px-3 py-1 text-[10px] font-semibold text-body shadow-[0_6px_18px_-8px_rgba(23,32,51,0.35)] backdrop-blur'

export function HeroGalaxy() {
  return (
    <div
      aria-hidden="true"
      className="relative mx-auto aspect-square w-full max-w-[540px] select-none"
    >
      <div className="absolute inset-[2%] rounded-full bg-[radial-gradient(circle_at_36%_30%,rgba(196,181,253,0.65),rgba(147,197,253,0.22)_46%,transparent_70%)] blur-2xl dark:bg-[radial-gradient(circle_at_36%_30%,rgba(109,40,217,0.5),rgba(90,136,246,0.15)_46%,transparent_70%)]" />

      <div className="absolute inset-[4%] rounded-full border border-primary/10 dark:border-white/10" />
      <div className="absolute inset-[14%] rounded-full border border-dashed border-primary/20 dark:border-secondary/20" />
      <div className="absolute inset-[28%] rounded-full border border-primary/10 dark:border-white/10" />
      <div className="absolute top-1/2 left-1/2 h-[42%] w-[105%] -translate-x-1/2 -translate-y-1/2 rotate-[-20deg] rounded-[50%] border border-primary/15 dark:border-white/15" />

      <span className="absolute top-[10%] left-[22%] size-1.5 animate-twinkle rounded-full bg-secondary" />
      <span className="absolute top-[18%] right-[14%] size-1 animate-twinkle rounded-full bg-[#5A88F6] [animation-delay:1.2s]" />
      <span className="absolute bottom-[18%] left-[12%] size-1.5 animate-twinkle rounded-full bg-[#EE6DAA] [animation-delay:0.7s]" />
      <span className="absolute top-[58%] right-[6%] size-1 animate-twinkle rounded-full bg-secondary [animation-delay:2s]" />
      <span className="absolute bottom-[7%] left-[46%] size-1 animate-twinkle rounded-full bg-[#5A88F6] [animation-delay:1.7s]" />
      <span className="absolute top-[4%] left-[46%] text-lg text-secondary/60">✦</span>
      <span className="absolute right-[20%] bottom-[28%] text-xs text-[#5A88F6]/70">✦</span>

      <div className="absolute top-1/2 left-1/2 w-[43%] -translate-x-1/2 -translate-y-1/2 rounded-[30px] border border-white/70 bg-white/80 p-5 text-center shadow-[0_32px_70px_-24px_rgba(76,29,149,0.55)] backdrop-blur-xl dark:border-white/10 dark:bg-[#151626]/85">
        <span className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-linear-to-br from-[#A986FF] to-[#6442DD] shadow-[0_14px_28px_-12px_rgba(109,40,217,0.8)]">
          <Sparkles className="size-7 text-white" strokeWidth={1.8} />
        </span>
        <p className="mt-3 text-[10px] font-semibold tracking-[0.18em] text-secondary">
          INSIGHT AI
        </p>
        <p className="mt-1.5 text-[15px] leading-none font-semibold text-heading">
          12 kelompok feedback
        </p>
        <p className="mt-2 text-[10px] text-muted-foreground">Siap diprioritaskan</p>
      </div>

      <div className="absolute top-[19%] left-[2%] flex animate-float flex-col items-center gap-2">
        <span className="size-14 rounded-full bg-linear-to-br from-[#B69CFF] to-[#6D28D9] shadow-[0_20px_35px_-15px_rgba(109,40,217,0.8)] ring-4 ring-white/50 dark:ring-white/10" />
        <span className={CHIP_CLASS}>Layanan</span>
      </div>

      <div className="absolute top-[13%] right-[3%] flex animate-float-slow flex-col items-center gap-2">
        <span className="size-10 rounded-full bg-linear-to-br from-[#8FC3FF] to-[#3B82F6] shadow-[0_18px_30px_-14px_rgba(59,130,246,0.85)] ring-4 ring-white/50 dark:ring-white/10" />
        <span className={CHIP_CLASS}>Produk</span>
      </div>

      <div className="absolute top-[50%] right-[0%] flex animate-float flex-col items-center gap-2 [animation-delay:1.4s]">
        <span className="size-12 rounded-full bg-linear-to-br from-[#FFB7D5] to-[#E64C98] shadow-[0_18px_30px_-14px_rgba(230,76,152,0.75)] ring-4 ring-white/50 dark:ring-white/10" />
        <span className={CHIP_CLASS}>Harga</span>
      </div>

      <div className="absolute bottom-[13%] left-[5%] flex animate-float-slow flex-col items-center gap-2 [animation-delay:0.8s]">
        <span className="size-9 rounded-full bg-linear-to-br from-[#9CF0D5] to-[#19A97C] shadow-[0_16px_28px_-14px_rgba(25,169,124,0.75)] ring-4 ring-white/50 dark:ring-white/10" />
        <span className={CHIP_CLASS}>Kebersihan</span>
      </div>

      <div className="absolute right-[10%] bottom-[5%] flex animate-float flex-col items-center gap-2 [animation-delay:2.1s]">
        <span className="size-8 rounded-full bg-linear-to-br from-[#D8CCFF] to-[#8B5CF6] shadow-[0_14px_24px_-12px_rgba(139,92,246,0.8)] ring-4 ring-white/50 dark:ring-white/10" />
        <span className={CHIP_CLASS}>Waktu Tunggu</span>
      </div>
    </div>
  )
}
