import { Minus, Plus } from 'lucide-react'
import { useId, useState } from 'react'

import { cn } from '@/utils/cn'

import { FAQ_ITEMS } from '../landingData'

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)
  const baseId = useId().replaceAll(':', '')

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-3">
      {FAQ_ITEMS.map((item, index) => {
        const isOpen = openIndex === index
        const buttonId = `${baseId}-faq-button-${index}`
        const panelId = `${baseId}-faq-panel-${index}`

        return (
          <article
            key={item.question}
            className={cn(
              'overflow-hidden rounded-2xl border bg-surface transition-colors',
              isOpen ? 'border-secondary/35 shadow-card' : 'border-border'
            )}
          >
            <h3>
              <button
                id={buttonId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition-colors hover:bg-surface-subtle sm:px-6 sm:py-5"
              >
                <span className="text-[13px] leading-5 font-semibold text-heading sm:text-sm">
                  {item.question}
                </span>
                <span
                  className={cn(
                    'flex size-7 shrink-0 items-center justify-center rounded-full border transition-colors',
                    isOpen
                      ? 'border-transparent bg-primary text-white'
                      : 'border-border bg-surface-subtle text-body'
                  )}
                >
                  {isOpen ? (
                    <Minus aria-hidden="true" className="size-3.5" />
                  ) : (
                    <Plus aria-hidden="true" className="size-3.5" />
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
                'grid transition-[grid-template-rows] duration-300 ease-out',
                isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
              )}
            >
              <div className="overflow-hidden">
                <p className="px-5 pb-5 text-[12px] leading-6 text-body sm:px-6 sm:pb-6 sm:text-[13px]">
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
