import { APP_NAME } from '@/constants'

export default function HomePage() {
  return (
    <>
      <title>{APP_NAME}</title>
      <main className="flex h-svh w-full flex-col items-center justify-center p-4 text-center text-2xl font-bold">
        Mulai Kerjakan di Sini ya, Bisa baca Guidelines di docs/GUIDELINES.MD
      </main>
    </>
  )
}
