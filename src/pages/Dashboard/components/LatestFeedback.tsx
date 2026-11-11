import { ChevronRight, MoreHorizontal } from 'lucide-react'

import { Card } from '@/components/ui/Card'
import { StarRating } from '@/components/ui/StarRating'

import { LATEST_FEEDBACK } from '../dashboardData'

export function LatestFeedback() {
  return (
    <Card className="p-[17px]" label="Feedback terbaru">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-[15px] leading-[18px] font-normal text-heading">Feedback terbaru</h2>
          <p className="pt-1 text-[10px] leading-3 text-body">
            Feedback terbaru dari semua sumber terhubung
          </p>
        </div>
        <button
          type="button"
          aria-disabled="true"
          title="Segera hadir"
          className="flex shrink-0 items-center gap-1 text-[10px] leading-3 text-body"
        >
          Lihat semua
          <ChevronRight aria-hidden="true" className="size-3.5 text-muted-foreground" />
        </button>
      </div>

      <div className="mt-3.5 overflow-x-auto">
        <table className="w-full min-w-[760px] border-collapse text-left">
          <caption className="sr-only">Feedback terbaru dari semua sumber terhubung</caption>
          <thead>
            <tr className="border-b border-border text-[10px] tracking-[0.8px] text-body">
              <th scope="col" className="px-2 py-2 font-normal">
                PELANGGAN
              </th>
              <th scope="col" className="px-2 py-2 font-normal">
                FEEDBACK
              </th>
              <th scope="col" className="px-2 py-2 font-normal">
                GRUP
              </th>
              <th scope="col" className="px-2 py-2 font-normal">
                DITERIMA
              </th>
              <th scope="col" className="px-2 py-2">
                <span className="sr-only">Aksi</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {LATEST_FEEDBACK.map((feedback) => (
              <tr key={feedback.id} className="border-b border-border last:border-0">
                <td className="py-[11px] pr-3 pl-2 align-middle">
                  <div className="flex items-center gap-2">
                    <span
                      className="flex size-[29px] shrink-0 items-center justify-center rounded-[9px] text-[10px] text-body"
                      style={{ backgroundColor: feedback.avatarBackground }}
                    >
                      {feedback.initials}
                    </span>
                    <span className="min-w-0">
                      <span className="block truncate text-[10.5px] font-bold text-body">
                        {feedback.name}
                      </span>
                      <span className="block pt-[3px] text-[10px] text-muted-foreground">
                        {feedback.source}
                      </span>
                    </span>
                  </div>
                </td>

                <td className="max-w-[420px] px-2 py-[11px] align-middle">
                  <StarRating rating={feedback.rating} />
                  <p className="pt-1 text-[10.5px] leading-[15px] text-body">{feedback.text}</p>
                </td>

                <td className="px-2 py-[11px] align-middle">
                  <span
                    className="inline-flex items-center rounded-lg px-2 py-1 text-[10px] whitespace-nowrap text-body"
                    style={{ backgroundColor: `${feedback.groupColor}16` }}
                  >
                    {feedback.group}
                  </span>
                </td>

                <td className="px-2 py-[11px] align-middle text-[10px] whitespace-nowrap text-body">
                  {feedback.received}
                </td>

                <td className="py-[11px] pr-2 pl-2 text-right align-middle">
                  <button
                    type="button"
                    aria-label={`Aksi untuk feedback ${feedback.name}`}
                    className="inline-flex size-7 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-surface-subtle"
                  >
                    <MoreHorizontal aria-hidden="true" className="size-[18px]" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  )
}
