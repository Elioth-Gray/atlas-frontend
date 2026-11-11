import { PageHeader } from '@/components/layout/PageHeader'
import { APP_NAME } from '@/constants'

import { FeedbackFilters } from './components/FeedbackFilters'
import { FeedbackMap } from './components/FeedbackMap'

export default function GrupFeedbackPage() {
  return (
    <>
      <title>Grup Feedback & Solusi AI — {APP_NAME}</title>

      <div className="flex flex-1 flex-col">
        <PageHeader
          title="Grup Feedback & Solusi AI"
          subtitle="Jelajahi grup feedback dan temukan solusi AI dalam satu halaman."
        />

        <main className="mx-auto w-full max-w-[1600px] flex-1 px-4 pt-[22px] pb-[50px] sm:px-7">
          <FeedbackFilters />
          <div className="mt-[18px]">
            <FeedbackMap />
          </div>
        </main>
      </div>
    </>
  )
}
