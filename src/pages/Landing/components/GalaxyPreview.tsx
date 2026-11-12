import { Sparkles } from 'lucide-react'

export function GalaxyPreview() {
  return (
    <div aria-hidden="true" className="relative">
      <div
        aria-hidden="true"
        className="absolute -inset-5 rounded-[40px] bg-linear-to-br from-secondary/25 via-primary/10 to-[#5A88F6]/20 blur-2xl"
      />

      <div className="relative overflow-hidden rounded-[26px] border border-border bg-surface p-3 shadow-[0_36px_90px_-40px_rgba(76,29,149,0.55)] sm:p-4">
        <div className="flex items-center justify-between gap-3 px-1 pb-3">
          <div>
            <p className="text-[9px] font-semibold tracking-[0.18em] text-muted-foreground">
              ATLAS / GRUP FEEDBACK
            </p>
            <p className="mt-0.5 text-xs font-semibold text-heading">Demo publik</p>
          </div>
          <span className="rounded-full border border-secondary/25 bg-secondary/10 px-2.5 py-1 text-[9px] font-semibold tracking-[0.12em] text-secondary">
            DATA DEMO
          </span>
        </div>

        <div className="relative h-[350px] overflow-hidden rounded-[18px] border border-white/10 bg-[#090A16]">
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-[radial-gradient(circle_at_62%_38%,rgba(112,72,229,0.38),transparent_42%),radial-gradient(circle_at_20%_70%,rgba(90,136,246,0.18),transparent_38%),radial-gradient(circle_at_85%_15%,rgba(238,109,170,0.14),transparent_32%)]"
          />

          <span className="absolute top-[18%] left-[18%] size-1 animate-twinkle rounded-full bg-white/70" />
          <span className="absolute top-[32%] right-[14%] size-1.5 animate-twinkle rounded-full bg-white/60 [animation-delay:1.1s]" />
          <span className="absolute top-[64%] left-[8%] size-1 animate-twinkle rounded-full bg-white/60 [animation-delay:0.6s]" />
          <span className="absolute right-[28%] bottom-[38%] size-1 animate-twinkle rounded-full bg-white/70 [animation-delay:1.8s]" />
          <span className="absolute top-[12%] right-[34%] text-[10px] text-white/40">✦</span>

          <div className="absolute top-4 left-4">
            <p className="text-[9px] font-semibold tracking-[0.2em] text-white/40">
              FEEDBACK GALAXY
            </p>
            <p className="mt-1 text-sm font-semibold text-white">Peta prioritas masalah</p>
          </div>

          <span className="absolute top-4 right-4 rounded-full border border-white/15 bg-white/10 px-2.5 py-1 text-[9px] font-medium text-white/65">
            Live
          </span>

          <div
            aria-hidden="true"
            className="absolute top-[47%] left-1/2 h-[44%] w-[94%] -translate-x-1/2 -translate-y-1/2 rotate-[-18deg] rounded-[50%] border border-white/10"
          />

          <span className="absolute top-[25%] left-[56%] size-[86px] rounded-full bg-linear-to-br from-[#A986FF] to-[#5B21B6] shadow-[0_0_50px_rgba(139,92,246,0.45)] ring-4 ring-white/5" />
          <span className="absolute top-[38%] left-[17%] size-[58px] rounded-full bg-linear-to-br from-[#FFB7D5] to-[#D6428B] shadow-[0_0_35px_rgba(214,66,139,0.35)] ring-4 ring-white/5" />
          <span className="absolute top-[50%] right-[15%] size-11 rounded-full bg-linear-to-br from-[#8FC3FF] to-[#2F6FED] shadow-[0_0_30px_rgba(59,130,246,0.35)] ring-4 ring-white/5" />
          <span className="absolute bottom-[31%] left-[39%] size-8 rounded-full bg-linear-to-br from-[#9CF0D5] to-[#128A66] shadow-[0_0_25px_rgba(18,138,102,0.35)] ring-4 ring-white/5" />

          <span className="absolute top-[13%] right-[9%] size-7 rounded-full bg-linear-to-br from-[#D8CCFF] to-[#8B5CF6] shadow-[0_0_22px_rgba(139,92,246,0.4)] ring-4 ring-white/5" />

          <div className="absolute right-4 bottom-[34%] rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[9px] font-medium text-white/60 backdrop-blur">
            Harga
          </div>
          <div className="absolute top-[30%] left-[9%] rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[9px] font-medium text-white/60 backdrop-blur">
            Kebersihan
          </div>

          <div className="absolute inset-x-3 bottom-3 w-auto rounded-2xl border border-white/15 bg-[#111220]/90 p-3.5 shadow-[0_18px_40px_-18px_rgba(0,0,0,0.8)] backdrop-blur-md sm:right-auto sm:w-[270px]">
            <div className="flex items-center justify-between gap-2">
              <span className="rounded-full bg-[#F0ABFC]/15 px-2 py-0.5 text-[9px] font-semibold text-[#F0ABFC]">
                PRIORITAS TINGGI
              </span>
              <span className="text-[9px] text-white/40">14 feedback</span>
            </div>

            <p className="mt-2 text-sm font-semibold text-white">Layanan Lambat</p>
            <p className="mt-1 text-[10px] leading-4 text-white/55">
              “Pengalamannya baik, tapi bagian ini masih bisa ditingkatkan.”
            </p>

            <div className="mt-2.5 flex items-start gap-1.5 rounded-lg bg-white/5 p-2">
              <Sparkles className="mt-0.5 size-3 shrink-0 text-secondary" strokeWidth={1.8} />
              <p className="text-[9px] leading-4 text-white/70">
                Preview AI: tinjau pola bersama tim dan uji satu perbaikan terarah.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
