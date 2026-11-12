import { Menu } from '@base-ui/react/menu'
import { ChevronDown, Download, FileImage, FileText } from 'lucide-react'

import { cn } from '@/utils/cn'

import type { DownloadFormatId } from '../buatQrData'
import { DOWNLOAD_FORMATS } from '../buatQrData'

interface DownloadMenuProps {
  label: string
  onSelect: (format: DownloadFormatId) => void
}

const TRIGGER_CLASS =
  'flex h-[37px] items-center justify-center gap-[7px] bg-primary hover:bg-primary-hover px-3.5 text-[11px] font-semibold text-white shadow-card transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary'

export function DownloadMenu({ label, onSelect }: DownloadMenuProps) {
  return (
    <Menu.Root>
      <Menu.Trigger
        className={({ open }) => cn(TRIGGER_CLASS, open && 'opacity-90')}
        aria-label={label}
      >
        <Download aria-hidden="true" className="size-4" strokeWidth={1.8} />
        {label}
        <ChevronDown aria-hidden="true" className="size-3.5" strokeWidth={2} />
      </Menu.Trigger>

      <Menu.Portal>
        <Menu.Positioner sideOffset={6} align="end" className="z-50">
          <Menu.Popup className="min-w-[200px] border border-border bg-surface p-1.5 shadow-card outline-none">
            {DOWNLOAD_FORMATS.map((option) => (
              <Menu.Item
                key={option.id}
                onClick={() => onSelect(option.id)}
                className="flex cursor-pointer items-center gap-2.5 px-2.5 py-2 text-[11px] text-body outline-none select-none data-highlighted:bg-surface-subtle"
              >
                {option.id === 'pdf' ? (
                  <FileText
                    aria-hidden="true"
                    className="size-4 shrink-0 text-sentiment-negative"
                    strokeWidth={1.6}
                  />
                ) : (
                  <FileImage
                    aria-hidden="true"
                    className="size-4 shrink-0 text-secondary"
                    strokeWidth={1.6}
                  />
                )}
                <span className="flex min-w-0 flex-col">
                  <span className="font-semibold">{option.label}</span>
                  <span className="pt-0.5 text-[11px] leading-none text-muted-foreground">
                    {option.description}
                  </span>
                </span>
              </Menu.Item>
            ))}
          </Menu.Popup>
        </Menu.Positioner>
      </Menu.Portal>
    </Menu.Root>
  )
}
