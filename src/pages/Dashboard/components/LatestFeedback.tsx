import { Card } from '@/components/ui/Card'
import { StarRating } from '@/components/ui/StarRating'

import type { FeedbackItem } from '../dashboardData'
import { LATEST_FEEDBACK } from '../dashboardData'

interface LatestFeedbackProps {
  items?: FeedbackItem[]
}

export function LatestFeedback({ items = LATEST_FEEDBACK }: LatestFeedbackProps) {
  return (
    <Card className="p-[17px]" label="Feedback terbaru">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-[15px] leading-[18px] font-normal text-heading">Feedback terbaru</h2>
          <p className="pt-1 text-[11px] leading-3 text-body">
            Feedback terbaru dari semua sumber terhubung
          </p>
        </div>
      </div>

      <div className="mt-3.5 overflow-x-auto">
        {items.length === 0 ? (
          <p className="py-6 text-center text-[11px] text-muted-foreground">
            Belum ada feedback pelanggan yang sesuai dengan filter.
          </p>
        ) : (
          <table className="w-full min-w-[560px] border-collapse text-left lg:min-w-0">
            <caption className="sr-only">Feedback terbaru dari semua sumber terhubung</caption>
            <thead>
              <tr className="border-b border-border text-[11px] text-body">
                <th scope="col" className="px-2 py-2 font-normal">
                  Pelanggan
                </th>
                <th scope="col" className="px-2 py-2 font-normal">
                  Feedback
                </th>
                <th scope="col" className="px-2 py-2 font-normal">
                  Grup
                </th>
                <th scope="col" className="px-2 py-2 font-normal">
                  Diterima
                </th>
              </tr>
            </thead>
            <tbody>
              {items.map((feedback) => (
                <tr key={feedback.id} className="border-b border-border last:border-0">
                  <td className="py-[11px] pr-3 pl-2 align-middle">
                    <div className="flex items-center gap-2">
                      <span
                        className="flex size-[29px] shrink-0 items-center justify-center text-[11px] text-body"
                        style={{ backgroundColor: feedback.avatarBackground }}
                      >
                        {feedback.initials}
                      </span>
                      <span className="min-w-0">
                        <span className="block truncate text-[11px] font-bold text-body">
                          {feedback.name}
                        </span>
                        <span className="block pt-[3px] text-[11px] text-muted-foreground">
                          {feedback.source}
                        </span>
                      </span>
                    </div>
                  </td>

                  <td className="max-w-[420px] px-2 py-[11px] align-middle">
                    <StarRating rating={feedback.rating} />
                    <p className="pt-1 text-[11px] leading-[15px] text-body">{feedback.text}</p>
                  </td>

                  <td className="px-2 py-[11px] align-middle">
                    <span
                      className="inline-flex items-center px-2 py-1 text-[11px] whitespace-nowrap text-body"
                      style={{ backgroundColor: `${feedback.groupColor}16` }}
                    >
                      {feedback.group}
                    </span>
                  </td>

                  <td className="px-2 py-[11px] align-middle text-[11px] whitespace-nowrap text-body">
                    {feedback.received}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </Card>
  )
}
