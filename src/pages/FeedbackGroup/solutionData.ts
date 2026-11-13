import type { MemoryCandidate, Solution } from '@/typings/api'

export interface DemoIssueScenario {
  summary: string
  evidence: {
    opinion_id: string
    quote: string
  }[]
  initialQuestion: string
  followUpQuestion: string
  solution: Solution
  memoryCandidates: MemoryCandidate[]
}

export const DEMO_ISSUE_SCENARIOS: Record<string, DemoIssueScenario> = {
  'kebersihan': {
    summary: 'Keluhan pelanggan mengenai kebersihan meja dan area makan.',
    evidence: [
      {
        opinion_id: 'op-kebersihan-1',
        quote: 'Mejanya masih lengket waktu aku duduk.',
      },
      {
        opinion_id: 'op-kebersihan-2',
        quote: 'Toilet kurang terawat saat jam makan siang.',
      },
    ],
    initialQuestion:
      'Saya menemukan keluhan mengenai kebersihan meja. Saat jam ramai, bagaimana biasanya pembagian tugas membersihkan area makan?',
    followUpQuestion:
      'Apakah kasir masih bisa membersihkan meja saat antrean pesanan sedang panjang?',
    solution: {
      findings: [
        {
          statement:
            'Beberapa ulasan yang tersedia melaporkan meja belum bersih saat pelanggan akan duduk.',
          references: {
            opinion_ids: ['op-kebersihan-1', 'op-kebersihan-2'],
            owner_message_ids: [],
            memory_ids: [],
          },
        },
      ],
      customer_evidence: [
        {
          opinion_id: 'op-kebersihan-1',
          quote: 'Mejanya masih lengket waktu aku duduk.',
          note: 'Terhubung ke opinion_id sumber',
        },
      ],
      hypotheses: [
        {
          statement:
            'Pembagian tugas kasir dan pembersihan meja mungkin membuat area makan terlambat dibersihkan saat antrean panjang.',
          confidence: 'Hipotesis · Belum terverifikasi sebagai penyebab pasti',
          references: {
            opinion_ids: ['op-kebersihan-1'],
            owner_message_ids: ['msg-owner-1'],
            memory_ids: [],
          },
        },
      ],
      recommendations: [
        {
          title: 'Uji pembagian tugas saat jam ramai',
          description:
            'Tentukan petugas yang bertanggung jawab memeriksa kebersihan meja selama periode ramai. Evaluasi apakah pembagian tersebut memungkinkan dengan jumlah staf yang tersedia.',
          priority: 'Menyesuaikan penilaian AI, bukan skor numerik',
          references: {
            opinion_ids: ['op-kebersihan-1'],
            owner_message_ids: ['msg-owner-1'],
            memory_ids: [],
          },
        },
      ],
      success_indicators: [
        {
          metric: 'Jumlah keluhan kebersihan meja',
          target: 'Menurun dibanding periode pengamatan awal',
          timeframe: 'Disepakati owner',
        },
      ],
    },
    memoryCandidates: [
      {
        fact_text: 'Kasir juga bertanggung jawab membersihkan meja saat memungkinkan.',
        source_owner_message_ids: ['msg-owner-1'],
      },
    ],
  },
  'ukuran-porsi': {
    summary:
      'Pelanggan melaporkan ukuran porsi menu utama terasa tidak konsisten, terutama pada pesanan bawa pulang.',
    evidence: [
      {
        opinion_id: 'op-porsi-1',
        quote: 'Harganya sama, tapi porsinya sekarang terasa berkurang dibanding biasanya.',
      },
      {
        opinion_id: 'op-porsi-2',
        quote: 'Porsi makan di tempat dan bungkus bawa pulang terasa beda.',
      },
    ],
    initialQuestion:
      'Keluhan pelanggan menyoroti perbedaan porsi antar kunjungan. Apakah dapur saat ini sudah menggunakan alat takar standar untuk setiap menu?',
    followUpQuestion:
      'Apakah kemasan bawa pulang memiliki kapasitas yang sama dengan piring saji di tempat?',
    solution: {
      findings: [
        {
          statement:
            'Ulasan pelanggan menunjukkan persepsi perbedaan takaran porsi antara makan di tempat dan pesanan bawa pulang.',
          references: {
            opinion_ids: ['op-porsi-1', 'op-porsi-2'],
            owner_message_ids: [],
            memory_ids: [],
          },
        },
      ],
      customer_evidence: [
        {
          opinion_id: 'op-porsi-1',
          quote: 'Harganya sama, tapi porsinya sekarang terasa berkurang dibanding biasanya.',
          note: 'Terhubung ke opinion_id sumber',
        },
      ],
      hypotheses: [
        {
          statement:
            'Penakaran manual antar shift dan perbedaan ukuran wadah bungkus kemungkinan memengaruhi konsistensi porsi.',
          confidence: 'Hipotesis · Belum terverifikasi sebagai penyebab pasti',
          references: {
            opinion_ids: ['op-porsi-1', 'op-porsi-2'],
            owner_message_ids: ['msg-owner-1'],
            memory_ids: [],
          },
        },
      ],
      recommendations: [
        {
          title: 'Standarkan takaran porsi',
          description:
            'Sediakan alat takar baku per komponen menu di area plating dan selaraskan acuan porsi antara wadah makan di tempat serta bawa pulang.',
          priority: 'Menyesuaikan penilaian AI, bukan skor numerik',
          references: {
            opinion_ids: ['op-porsi-1'],
            owner_message_ids: ['msg-owner-1'],
            memory_ids: [],
          },
        },
      ],
      success_indicators: [
        {
          metric: 'Jumlah keluhan terkait ukuran porsi',
          target: 'Menurun dibanding periode pengamatan awal',
          timeframe: 'Disepakati owner',
        },
      ],
    },
    memoryCandidates: [
      {
        fact_text: 'Penakaran porsi di dapur masih dilakukan secara manual oleh staf tiap shift.',
        source_owner_message_ids: ['msg-owner-1'],
      },
    ],
  },
  'layanan-lambat': {
    summary:
      'Keluhan pelanggan mengenai waktu tunggu pesanan dan antrean kasir pada jam sibuk akhir pekan.',
    evidence: [
      {
        opinion_id: 'op-layanan-1',
        quote: 'Kopinya enak, tapi menunggu pesanan cukup lama saat akhir pekan.',
      },
      {
        opinion_id: 'op-layanan-2',
        quote: 'Antrean di kasir menumpuk waktu jam sarapan.',
      },
    ],
    initialQuestion:
      'Ulasan menunjukkan antrean menumpuk di jam ramai. Bagaimana alur penerimaan pesanan dan pembuatan minuman di kasir saat ini?',
    followUpQuestion:
      'Apakah petugas kasir juga merangkap menyiapkan pesanan minuman saat jam ramai?',
    solution: {
      findings: [
        {
          statement:
            'Sejumlah ulasan pelanggan mencatat waktu tunggu pesanan yang lama pada jam ramai akhir pekan.',
          references: {
            opinion_ids: ['op-layanan-1', 'op-layanan-2'],
            owner_message_ids: [],
            memory_ids: [],
          },
        },
      ],
      customer_evidence: [
        {
          opinion_id: 'op-layanan-1',
          quote: 'Kopinya enak, tapi menunggu pesanan cukup lama saat akhir pekan.',
          note: 'Terhubung ke opinion_id sumber',
        },
      ],
      hypotheses: [
        {
          statement:
            'Perangkapan peran kasir dan peracik minuman saat jam puncak kemungkinan memperlambat antrean.',
          confidence: 'Hipotesis · Belum terverifikasi sebagai penyebab pasti',
          references: {
            opinion_ids: ['op-layanan-1'],
            owner_message_ids: ['msg-owner-1'],
            memory_ids: [],
          },
        },
      ],
      recommendations: [
        {
          title: 'Percepat layanan di jam ramai',
          description:
            'Pisahkan tugas pencatatan pesanan di kasir dan penyiapan minuman selama periode antrean puncak.',
          priority: 'Menyesuaikan penilaian AI, bukan skor numerik',
          references: {
            opinion_ids: ['op-layanan-1'],
            owner_message_ids: ['msg-owner-1'],
            memory_ids: [],
          },
        },
      ],
      success_indicators: [
        {
          metric: 'Keluhan waktu tunggu pelayanan',
          target: 'Menurun dibanding periode pengamatan awal',
          timeframe: 'Disepakati owner',
        },
      ],
    },
    memoryCandidates: [
      {
        fact_text: 'Petugas kasir merangkap membantu bar saat jam sibuk akhir pekan.',
        source_owner_message_ids: ['msg-owner-1'],
      },
    ],
  },
}

export function getDemoScenario(topicId: string, topicLabel: string): DemoIssueScenario {
  const existing = DEMO_ISSUE_SCENARIOS[topicId]
  if (existing) return existing

  return {
    summary: `Keluhan pelanggan mengenai ${topicLabel.toLowerCase()} yang teridentifikasi dari pengelompokan opini.`,
    evidence: [
      {
        opinion_id: `op-${topicId}-1`,
        quote: `Perlu perhatian lebih terkait ${topicLabel.toLowerCase()} saat jam operasional ramai.`,
      },
    ],
    initialQuestion: `Saya melihat beberapa opini pelanggan terkait ${topicLabel.toLowerCase()}. Bagaimana alur operasional harian di toko untuk area ini?`,
    followUpQuestion: `Apakah ada kendala kapasitas staf atau peralatan saat menangani ${topicLabel.toLowerCase()} pada jam sibuk?`,
    solution: {
      findings: [
        {
          statement: `Ulasan pelanggan menyoroti kendala berulang pada aspek ${topicLabel.toLowerCase()}.`,
          references: {
            opinion_ids: [`op-${topicId}-1`],
            owner_message_ids: [],
            memory_ids: [],
          },
        },
      ],
      customer_evidence: [
        {
          opinion_id: `op-${topicId}-1`,
          quote: `Perlu perhatian lebih terkait ${topicLabel.toLowerCase()} saat jam operasional ramai.`,
          note: 'Terhubung ke opinion_id sumber',
        },
      ],
      hypotheses: [
        {
          statement: `Koordinasi tugas staf pada jam sibuk kemungkinan memengaruhi konsistensi ${topicLabel.toLowerCase()}.`,
          confidence: 'Hipotesis · Belum terverifikasi sebagai penyebab pasti',
          references: {
            opinion_ids: [`op-${topicId}-1`],
            owner_message_ids: ['msg-owner-1'],
            memory_ids: [],
          },
        },
      ],
      recommendations: [
        {
          title: `Evaluasi prosedur ${topicLabel.toLowerCase()}`,
          description: `Tetapkan standar pemeriksaan ${topicLabel.toLowerCase()} yang jelas antar shift dan tinjau pembagian peran saat jam ramai.`,
          priority: 'Menyesuaikan penilaian AI, bukan skor numerik',
          references: {
            opinion_ids: [`op-${topicId}-1`],
            owner_message_ids: ['msg-owner-1'],
            memory_ids: [],
          },
        },
      ],
      success_indicators: [
        {
          metric: `Jumlah keluhan terkait ${topicLabel.toLowerCase()}`,
          target: 'Menurun dibanding periode pengamatan awal',
          timeframe: 'Disepakati owner',
        },
      ],
    },
    memoryCandidates: [
      {
        fact_text: `Prosedur ${topicLabel.toLowerCase()} dikelola bergantian oleh staf shift aktif.`,
        source_owner_message_ids: ['msg-owner-1'],
      },
    ],
  }
}
