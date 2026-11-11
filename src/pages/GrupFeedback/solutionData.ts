import type { FeedbackTopic } from './grupFeedbackData'

export interface SolutionMetric {
  label: string
  value: number
}

export interface TopicSolution {
  title: string
  impact: string
  urgency: string
  effort: string
  confidence: number
  customerSummary: string
  quote: string
  cause: string
  actionTitle: string
  actionDescription: string
  target: string
  score: string
  scoreLabel: string
  scoreMetrics: SolutionMetric[]
}

export const TOPIC_SOLUTIONS: Record<string, TopicSolution> = {
  'layanan-lambat': {
    title: 'Percepat layanan di jam ramai',
    impact: 'Pendapatan & retensi',
    urgency: 'Segera',
    effort: 'Rendah · 2 minggu',
    confidence: 92,
    customerSummary:
      'Antrean lama dan layanan kurang sigap terjadi Sabtu–Minggu pukul 09–11. Pelanggan tetap menilai kualitas produk tinggi.',
    quote: '“Kopinya selalu enak, tapi nunggu 20 menit bikin mikir lagi buat balik.”',
    cause:
      'Staf akhir pekan tetap sama, padahal pesanan naik 31% dalam 6 minggu. Kapasitas kasir jadi hambatan utama.',
    actionTitle: 'Uji coba staf jam ramai selama 2 minggu',
    actionDescription:
      'Tambah 1 staf dengan pelatihan lintas tugas di kasir pukul 09–11 tiap akhir pekan. Tugaskan pencatat pesanan khusus saat ramai, lalu bandingkan rata-rata waktu proses dengan acuan saat ini: 14 menit.',
    target: 'Waktu tunggu turun 35–45%; kunjungan ulang pelanggan terdampak naik 8–12%.',
    score: '9,2',
    scoreLabel: 'Sangat direkomendasikan',
    scoreMetrics: [
      { label: 'Dampak', value: 94 },
      { label: 'Kelayakan', value: 88 },
      { label: 'Kecepatan', value: 92 },
    ],
  },
  'ukuran-porsi': {
    title: 'Standarkan takaran porsi',
    impact: 'Kepuasan & nilai produk',
    urgency: 'Tinggi',
    effort: 'Rendah · 1 minggu',
    confidence: 87,
    customerSummary:
      'Pelanggan lama merasa porsi makanan utama mengecil sejak menu baru, terutama pada pesanan bawa pulang.',
    quote: '“Harganya sama, tapi porsinya sekarang kayak berkurang sepertiga.”',
    cause:
      'Belum ada alat takar baku di dapur; tiap shift menakar berbeda, dan kemasan bawa pulang lebih kecil dari piring.',
    actionTitle: 'Pakai sendok takar & foto acuan porsi',
    actionDescription:
      'Sediakan sendok takar per menu dan tempel foto acuan porsi di area plating. Ganti kemasan bawa pulang ke ukuran yang setara dengan piring makan di tempat.',
    target: 'Keluhan porsi turun 50% dalam 4 minggu; variasi berat porsi di bawah 10%.',
    score: '8,6',
    scoreLabel: 'Direkomendasikan',
    scoreMetrics: [
      { label: 'Dampak', value: 84 },
      { label: 'Kelayakan', value: 93 },
      { label: 'Kecepatan', value: 90 },
    ],
  },
  'sikap-staf': {
    title: 'Latih ulang standar sapaan staf',
    impact: 'Loyalitas pelanggan',
    urgency: 'Tinggi',
    effort: 'Sedang · 3 minggu',
    confidence: 84,
    customerSummary:
      'Pelanggan menyebut staf terburu-buru dan jarang menyapa, terutama saat pergantian shift sore.',
    quote: '“Pesanannya benar, tapi rasanya kayak diusir pelan-pelan.”',
    cause:
      'Tiga staf baru belum ikut orientasi layanan; serah terima shift sore membuat kasir menangani dua tugas sekaligus.',
    actionTitle: 'Sesi pelatihan layanan 2× seminggu',
    actionDescription:
      'Adakan pelatihan singkat 30 menit tentang sapaan, kontak mata, dan penutupan transaksi. Pasang pendamping senior di shift sore selama masa transisi.',
    target: 'Sebutan negatif soal sikap staf turun 40%; rating layanan naik ke 4,5.',
    score: '8,1',
    scoreLabel: 'Direkomendasikan',
    scoreMetrics: [
      { label: 'Dampak', value: 86 },
      { label: 'Kelayakan', value: 80 },
      { label: 'Kecepatan', value: 74 },
    ],
  },
  'rasa-tak-konsisten': {
    title: 'Kunci resep & kalibrasi alat',
    impact: 'Kualitas produk',
    urgency: 'Sedang',
    effort: 'Sedang · 2 minggu',
    confidence: 81,
    customerSummary:
      'Rasa kopi dan saus dinilai berubah-ubah antar kunjungan; keluhan paling banyak muncul di shift malam.',
    quote: '“Kemarin enak banget, hari ini rasanya pahit dan encer.”',
    cause:
      'Grinder belum dikalibrasi ulang sejak ganti biji kopi, dan resep saus masih ditulis tangan tanpa takaran pasti.',
    actionTitle: 'Kalibrasi harian & kartu resep digital',
    actionDescription:
      'Jadwalkan kalibrasi grinder tiap pagi dengan catatan rasio seduh. Pindahkan semua resep ke kartu digital dengan takaran gram dan urutan langkah.',
    target: 'Keluhan rasa turun 45%; skor rasa di survei QR stabil di atas 4,4.',
    score: '7,9',
    scoreLabel: 'Layak dicoba',
    scoreMetrics: [
      { label: 'Dampak', value: 82 },
      { label: 'Kelayakan', value: 78 },
      { label: 'Kecepatan', value: 76 },
    ],
  },
  'harga-kemahalan': {
    title: 'Hadirkan paket hemat bernilai',
    impact: 'Persepsi harga',
    urgency: 'Sedang',
    effort: 'Rendah · 1 minggu',
    confidence: 78,
    customerSummary:
      'Pelanggan membandingkan harga dengan kedai sekitar dan merasa menu utama kurang sepadan dengan porsinya.',
    quote: '“Enak sih, tapi buat tiap hari kemahalan.”',
    cause:
      'Belum ada pilihan paket; harga satuan minuman + makanan 18% di atas rata-rata kompetitor di radius 1 km.',
    actionTitle: 'Uji paket sarapan & paket siang',
    actionDescription:
      'Luncurkan 2 paket kombinasi dengan potongan 10–15% di jam sepi. Tampilkan paket di papan menu depan dan di halaman QR feedback.',
    target: 'Sebutan harga turun 30%; transaksi jam sepi naik 15%.',
    score: '7,6',
    scoreLabel: 'Layak dicoba',
    scoreMetrics: [
      { label: 'Dampak', value: 77 },
      { label: 'Kelayakan', value: 85 },
      { label: 'Kecepatan', value: 88 },
    ],
  },
  'kebersihan': {
    title: 'Jadwal bersih per jam',
    impact: 'Kenyamanan tempat',
    urgency: 'Sedang',
    effort: 'Rendah · 1 minggu',
    confidence: 83,
    customerSummary:
      'Meja yang belum dibersihkan dan toilet yang kurang terawat paling sering disebut saat jam makan siang.',
    quote: '“Mejanya masih lengket waktu aku duduk.”',
    cause:
      'Tidak ada penanggung jawab kebersihan saat jam sibuk; semua staf fokus melayani pesanan.',
    actionTitle: 'Checklist kebersihan tiap 60 menit',
    actionDescription:
      'Tempel checklist berparaf di toilet dan area makan. Tunjuk satu staf per shift sebagai penanggung jawab ronde bersih tiap jam.',
    target: 'Keluhan kebersihan turun 60%; skor kenyamanan naik ke 4,6.',
    score: '8,4',
    scoreLabel: 'Direkomendasikan',
    scoreMetrics: [
      { label: 'Dampak', value: 80 },
      { label: 'Kelayakan', value: 95 },
      { label: 'Kecepatan', value: 92 },
    ],
  },
  'pengiriman-telat': {
    title: 'Atur ulang alur pesanan online',
    impact: 'Rating aplikasi antar',
    urgency: 'Rendah',
    effort: 'Sedang · 3 minggu',
    confidence: 76,
    customerSummary:
      'Pesanan dari aplikasi antar sering menunggu kurir lebih dari 15 menit karena belum siap saat kurir tiba.',
    quote: '“Makanannya sampai sudah dingin.”',
    cause:
      'Pesanan online masuk ke antrean yang sama dengan pesanan di tempat, tanpa penanda prioritas waktu jemput.',
    actionTitle: 'Antrean khusus pesanan online',
    actionDescription:
      'Pisahkan printer tiket untuk pesanan online dan tampilkan estimasi jemput kurir. Siapkan rak serah terima agar kurir tidak menunggu di kasir.',
    target: 'Waktu tunggu kurir di bawah 5 menit; rating aplikasi naik 0,3 poin.',
    score: '7,2',
    scoreLabel: 'Layak dicoba',
    scoreMetrics: [
      { label: 'Dampak', value: 70 },
      { label: 'Kelayakan', value: 76 },
      { label: 'Kecepatan', value: 68 },
    ],
  },
}

export function createSolutionSummary(topic: FeedbackTopic, solution: TopicSolution) {
  return [
    'ATLAS - Ringkasan Solusi Feedback AI',
    '',
    `Topik: ${topic.label} (${topic.count} sebutan)`,
    `Rekomendasi: ${solution.title}`,
    `Dampak bisnis: ${solution.impact}`,
    `Urgensi: ${solution.urgency}`,
    `Estimasi upaya: ${solution.effort}`,
    `Keyakinan AI: ${solution.confidence}%`,
    '',
    'Saran tindakan:',
    solution.actionTitle,
    solution.actionDescription,
    '',
    'Target hasil:',
    solution.target,
    '',
    `Skor solusi: ${solution.score}/10 (${solution.scoreLabel})`,
    ...solution.scoreMetrics.map((metric) => `- ${metric.label}: ${metric.value}%`),
  ].join('\n')
}
