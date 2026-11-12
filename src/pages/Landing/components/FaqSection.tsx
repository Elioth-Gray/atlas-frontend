import { Minus, Plus } from 'lucide-react'
import { useId, useState } from 'react'

import { cn } from '@/utils/cn'

import { FAQ_ITEMS } from '../landingData'

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)
  const baseId = useId().replaceAll(':', '')

  return (
    <div className="flex w-full flex-col border-t border-sheet-rule">
      {FAQ_ITEMS.map((item, index) => {
        const isOpen = openIndex === index
        const buttonId = `${baseId}-faq-button-${index}`
        const panelId = `${baseId}-faq-panel-${index}`

        return (
          <article key={item.question} className="border-b border-sheet-rule">
            <h3>
              <button
                id={buttonId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className="group flex w-full items-center justify-between gap-6 py-4 text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sheet-signal-text"
              >
                <span className="text-[15px] leading-snug font-semibold text-sheet-ink transition-colors group-hover:text-sheet-signal-text sm:text-base">
                  {item.question}
                </span>
                <span
                  className={cn(
                    'flex size-8 shrink-0 items-center justify-center border transition-colors',
                    isOpen
                      ? 'border-sheet-signal bg-sheet-signal text-sheet-signal-ink'
                      : 'border-sheet-ink-2 text-sheet-ink'
                  )}
                >
                  {isOpen ? (
                    <Minus aria-hidden="true" className="size-4" />
                  ) : (
                    <Plus aria-hidden="true" className="size-4" />
                  )}
                </span>
              </button>
            </h3>

            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              aria-hidden={!isOpen}
              inert={!isOpen}
              className={cn(
                'grid transition-[grid-template-rows] duration-300 ease-out motion-reduce:transition-none',
                isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
              )}
            >
              <div className="overflow-hidden">
                <p className="max-w-[62ch] pb-5 text-[15px] leading-relaxed text-sheet-ink-2">
                  {item.answer}
                </p>
              </div>
            </div>
          </article>
        )
      })}
    </div>
  )
}
