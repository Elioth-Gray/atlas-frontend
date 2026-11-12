import type { LucideIcon } from 'lucide-react'
import { BrainCircuit, QrCode, ScanLine, Telescope } from 'lucide-react'

export interface NavLink {
  label: string
  href: string
}

export const NAV_LINKS: NavLink[] = [
  { label: 'Beranda', href: '#beranda' },
  { label: 'Fitur', href: '#fitur' },
  { label: 'Cara Kerja', href: '#cara-kerja' },
  { label: 'Galaxy View', href: '#galaxy' },
  { label: 'FAQ', href: '#faq' },
]

export interface Feature {
  title: string
  description: string
}

export const FEATURES: Feature[] = [
  {
    title: 'Kumpulkan Feedback',
    description:
      'Buat QR code unik untuk bisnis Anda agar pelanggan dapat berbagi pengalaman tanpa membuat akun.',
  },
  {
    title: 'Pahami Setiap Ulasan',
    description:
      'ATLAS menganalisis feedback, mengenali aspek terkait, dan mengidentifikasi sentimen dengan AI.',
  },
  {
    title: 'Lihat Gambaran Besarnya',
    description:
      'Jelajahi masalah berulang di galaksi interaktif. Planet besar menandakan prioritas lebih tinggi.',
  },
  {
    title: 'Wujudkan Insight',
    description:
      'Dapatkan saran perbaikan sesuai feedback pelanggan dan konteks bisnis, lalu pantau tindakan Anda.',
  },
]

export interface Step {
  title: string
  description: string
  icon: LucideIcon
}

export const STEPS: Step[] = [
  {
    title: 'Buat QR Code Anda',
    description: 'Buat QR code feedback unik untuk bisnis atau outlet Anda.',
    icon: QrCode,
  },
  {
    title: 'Pelanggan Berbagi Pengalaman',
    description: 'Pelanggan scan, beri nilai, dan kirim feedback tanpa login.',
    icon: ScanLine,
  },
  {
    title: 'AI Mengelompokkan & Memprioritaskan',
    description: 'ATLAS menemukan masalah berulang dan mengelompokkan feedback terkait.',
    icon: BrainCircuit,
  },
  {
    title: 'Jelajahi Insight, Ambil Tindakan',
    description: 'Tinjau Galaxy, rekomendasi, dan langkah perbaikan Anda.',
    icon: Telescope,
  },
]

export interface FaqItem {
  question: string
  answer: string
}

export const FAQ_ITEMS: FaqItem[] = [
  {
    question: 'Apa itu ATLAS?',
    answer:
      'ATLAS adalah platform berbasis AI yang membantu UMKM mengumpulkan, mengelola, dan memahami feedback pelanggan, lalu menentukan perbaikan yang praktis.',
  },
  {
    question: 'Bagaimana ATLAS mengumpulkan feedback?',
    answer:
      'Anda membuat QR code unik untuk setiap bisnis atau outlet. Pelanggan memindai QR tersebut, memberi rating, lalu menulis pengalaman mereka secara langsung.',
  },
  {
    question: 'Apakah pelanggan perlu akun?',
    answer:
      'Tidak. Pelanggan cukup memindai QR code dan mengirim feedback tanpa membuat akun atau mengunduh aplikasi.',
  },
  {
    question: 'Bagaimana AI mengelompokkan feedback?',
    answer:
      'AI membaca isi feedback, mengenali aspek yang dibahas, menganalisis sentimen, lalu mengelompokkan masalah serupa berdasarkan prioritas.',
  },
  {
    question: 'Apa itu Galaxy View?',
    answer:
      'Galaxy View adalah tampilan visual interaktif yang mengubah kelompok feedback menjadi planet. Planet yang lebih besar menandakan masalah dengan prioritas lebih tinggi.',
  },
  {
    question: 'Apakah ATLAS mengambil keputusan bisnis otomatis?',
    answer:
      'Tidak. ATLAS memberi insight dan rekomendasi, tetapi keputusan akhir tetap berada di tangan Anda sebagai pemilik bisnis.',
  },
]

export const FOOTER_PRODUCT_LINKS: NavLink[] = [
  { label: 'Fitur', href: '#fitur' },
  { label: 'Cara Kerja', href: '#cara-kerja' },
  { label: 'Galaxy View', href: '#galaxy' },
]

export const FOOTER_HELP_LINKS: NavLink[] = [
  { label: 'FAQ', href: '#faq' },
  { label: 'Kontak', href: 'mailto:halo@atlas.id' },
  { label: 'Panduan', href: '#cara-kerja' },
]
