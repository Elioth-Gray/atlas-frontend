// Shared class strings for the Manifesto landing: square controls, one container, one head scale

export const CONTAINER_CLASS = 'mx-auto w-full max-w-[1440px] px-4 sm:px-10 lg:px-16'

const BUTTON_BASE =
  'inline-flex h-10 items-center justify-center whitespace-nowrap px-5 text-sm font-semibold transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 active:translate-y-px disabled:cursor-not-allowed disabled:opacity-60'

export const PRIMARY_BUTTON_CLASS = `${BUTTON_BASE} bg-sheet-signal text-sheet-signal-ink hover:bg-sheet-signal-deep focus-visible:outline-sheet-signal-text`

export const SECONDARY_BUTTON_CLASS = `${BUTTON_BASE} border border-sheet-ink-2 text-sheet-ink hover:border-sheet-signal hover:bg-sheet-signal hover:text-sheet-signal-ink focus-visible:outline-sheet-signal-text`

export const SECTION_HEAD_CLASS =
  'min-w-0 font-display text-[clamp(1.875rem,3vw,2.625rem)] leading-[1.02] text-balance font-normal break-words text-sheet-ink uppercase'

export const ITEM_TITLE_CLASS =
  'min-w-0 font-display text-[clamp(1.125rem,1.4vw,1.375rem)] leading-[1.02] font-normal break-words text-sheet-ink uppercase'

export const LEAD_CLASS = 'max-w-[52ch] text-[15px] leading-relaxed text-sheet-ink-2 sm:text-base'

export const TEXT_LINK_CLASS =
  'text-sheet-ink underline decoration-1 underline-offset-4 transition-colors hover:text-sheet-signal-text focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sheet-signal-text'
