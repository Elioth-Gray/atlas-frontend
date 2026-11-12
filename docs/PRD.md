# Product Requirements Document (PRD): ATLAS Frontend (React)

## 1. Konteks & Tujuan Dokumen

Dokumen ini adalah panduan spesifikasi teknis bagi _AI Coding Agent_ untuk membangun aplikasi **Frontend ATLAS (Sistem Insight AI)**. Aplikasi ini memiliki dua antarmuka utama:

1. **Public Customer Feedback Web App (Mobile-First):** Halaman publik tanpa login yang diakses pelanggan melalui pemindaian QR Code di meja/kasir untuk mengirim rating dan ulasan.
2. **Owner Dashboard & Guided AI Consultation Web App:** Platform SaaS bagi pemilik bisnis (_Owner_) dan staf (_Employee_) untuk memantau statistik ulasan, menjelajahi peta masalah pelanggan (_Feedback Galaxy / Planet_), melakukan konsultasi interaktif dengan **ATLAS AI**, serta mengelola profil dan memori bisnis (_Business Memory_).

---

## 2. Tech Stack & Standar Arsitektur Frontend

- **Framework:** React (TypeScript) + Vite / Next.js (SPA/SSR sesuai konvensi repositori).
- **Styling & UI System:** Tailwind CSS + komponen modular (Shadcn UI / Lucide Icons).
  - **Palet Warna Utama (mengacu desain UI):**
    - Primary Brand: `#6336F5` / `#6C3CE9` (Ungu ATLAS)
    - Background Canvas: `#F8F9FC` ( Abu-abu terang bersih) dan `#FFFFFF` untuk Card
    - Galaxy Dark/Light Orbit: Gradien lembut ungu-biru dengan garis orbit elips tipis
    - Semantic Colors: Positif (`#10B981`), Netral (`#3B82F6`), Negatif/Kritis (`#EC4899` / `#EF4444`), Peringatan/Sedang (`#F59E0B`).
- **State Management & Data Fetching:** TanStack React Query (Server State) + Zustand/Context (Auth & Active Shop State).
- **Visualisasi Data:**
  - Grafik Dashboard: Recharts / Chart.js (Area Line Chart untuk Tren Sentimen, Bar Chart untuk Jumlah Ulasan, Horizontal Progress Bar untuk Keluhan Terbanyak).
  - Peta Feedback (Galaxy 3D / 2.5D Orbit Canvas): React Three Fiber (`@react-three/fiber`) atau SVG/Canvas Interaktif dengan fitur Zoom (`+`/`-`), Pan, dan _Full-screen Toggle_ seperti pada desain UI _Grup Feedback & Solusi AI_.
- **QR & Poster Generator:** `qrcode.react` + `html-to-image` / Canvas API untuk mengunduh poster siap cetak dalam resolusi tinggi (PNG).

---

## 3. Prinsip Batasan Produk (MVP Guardrails - WAJIB DIIKUTI)

Berdasarkan spesifikasi arsitektur terbaru pada dokumen kontrak AI & Database:

1. **DILARANG Menampilkan Skor/Persentase Halusinasi AI:** Meskipun pada _wireframe_ awal terdapat ilustrasi "Skor Solusi 9,2/10" atau "Keyakinan AI 82%", kontrak final AI **melarang** adanya skor solusi numerik, persentase keyakinan model (_confidence score_), diagnosis pasti, atau prediksi persentase dampak yang diada-adakan.
2. **5 Komponen Solusi Terstruktur:** Kartu hasil solusi AI wajib merender 5 bagian standar dari `Consultation_Messages.solution_data`:
   - `findings` (Temuan Utama)
   - `customer_evidence` (Bukti Pelanggan + kutipan & badge `opinion_id`)
   - `hypotheses` (Kemungkinan Penyebab — dilabeli secara eksplisit sebagai _Hipotesis / Dugaan Awal_, bukan fakta mutlak)
   - `recommendations` (Rekomendasi Solusi — opsi tindakan utama, opsi tambahan, dan asumsi kelayakan)
   - `success_indicators` (Indikator Keberhasilan yang dapat diukur mandiri oleh owner)
3. **Batas Akhir Produk (No Task/Monitoring Tracker):** Alur berakhir saat sesi konsultasi disimpan/diarsipkan (`ARCHIVED`) dan _Business Memory_ dikonfirmasi. Tidak ada fitur _to-do list tracker_, status penyelesaian isu (`issue_status_enum` sudah dihapus dari tabel `Issues`), ataupun pemantauan otomatis pasca-konsultasi.

---

## 4. Spesifikasi Halaman & Fitur Detail

### 4.1. Modul Publik: Alur Pelanggan (QR Feedback Flow)

**Route:** `/feedback/:shopId` (atau `/f/:shopSlug`)  
**Akses:** Publik (Tanpa Login) — Tampilan _Mobile-First_.

- **Langkah 1: Validasi Toko (Landing QR)**
  - Mengambil informasi ringkas toko (`name`, `image`, `description`) dari endpoint publik.
- **Langkah 2: Form Nilai & Tulis (`02 NILAI & TULIS`)**
  - **Input Nama:** Field nama pelanggan (atau opsi default "Anonim" jika dibiarkan kosong, dikirim sebagai string `name` ke tabel `Feedbacks`).
  - **Input Rating Bintang:** Komponen interaktif 1 hingga 5 bintang (`rating` bertipe `decimal`/`number`, wajib diisi).
  - **Input Komentar:** Textarea _"Ceritakan pengalamanmu - Apa yang sudah bagus atau perlu diperbaiki?"_ (`feedback` bertipe `text`, wajib diisi, min. 5 karakter).
  - **Opsional Gambar:** Upload 1 foto pendukung bila diperlukan (`image` nullable).
  - **Disclaimer Privasi:** Teks _"Dengan mengirimkan feedback, kamu telah membaca Kebijakan Privasi"_.
  - **Tombol Submit (`KIRIM`):** Memanggil `POST /api/public/shops/:shopId/feedbacks`. Menampilkan _loading spinner_ dan mencegah _double-submit_.
- **Langkah 3: Layar Konfirmasi (`03 SELESAI`)**
  - Menampilkan pesan apresiasi _"Terima kasih! Masukanmu berhasil dikirim."_ setelah menerima HTTP `201 Created`.

---

### 4.2. Modul Autentikasi & Multi-Shop Context

**Routes:** `/login`, `/register`, `/onboarding/shop`

- **Login & Register:** Form email & password dengan penyimpanan `access_token` dan mekanisme _silent refresh_ menggunakan `refresh_token`.
- **Shop Switcher / Guard:**
  - User terhubung ke toko melalui tabel `Shops_Users` dengan role `Owner` atau `Employee`.
  - Seluruh request ke `/api/owner/*` harus menyertakan konteks `shop_id` aktif.

---

### 4.3. Modul Owner: Layout Utama (Sidebar & Header)

Mengacu pada kelima tangkapan layar desain:

- **Sidebar Kiri:**
  - Logo **ATLAS - SISTEM INSIGHT AI**.
  - Navigasi **MENU UTAMA**:
    1. `Dashboard` (`/dashboard`)
    2. `Buat QR` (`/qr-generator`)
    3. `Google Maps` (`/google-maps`) _(Lihat catatan status MVP di Bagian 4.6)_
    4. `Grup Feedback & AI` (`/issues` atau `/galaxy`) — dilengkapi _badge counter_ jumlah grup isu aktif.
    5. `Akun Bisnis` (`/settings/business`)
  - **Footer Sidebar:** Avatar inisial user, Nama Lengkap (`Users.name`), dan Role (`Pemilik bisnis` / `Karyawan`).
- **Header Atas:**
  - Judul Halaman & Subjudul deskriptif.
  - Global Search Bar (`Cari feedback, masalah...`) dan Avatar User di kanan atas.

---

### 4.4. Halaman 1: Dashboard (`/dashboard`)

Menampilkan ringkasan eksekutif dari feedback dan isu toko:

1. **Filter Bar Global:**
   - Filter Rentang Waktu (`7 hari terakhir`, `30 hari terakhir`, `90 hari terakhir`, `Semua waktu`).
   - Filter Sentimen (`Semua sentimen`, `Positif`, `Netral`, `Negatif`).
   - Filter Severity/Prioritas (`Semua prioritas`, `Severe`/Kritis, dll.).
2. **4 Kartu KPI Utama:**
   - **Total Feedback:** Total ulasan masuk + persentase perubahan dibanding periode lalu.
   - **Baru Minggu Ini:** Jumlah feedback 7 hari terakhir + persentase pertumbuhan.
   - **Masalah Prioritas:** Jumlah cluster `Issues` yang memiliki opini bersentimen `Negative` / severity `Severe`.
   - **Rasio Sentimen / Rating Rata-rata:** Rata-rata rating (`Feedbacks.rating`) dan proporsi sentimen.
3. **Grafik Tren Sentimen (Area Line Chart):**
   - Menampilkan tren harian/mingguan untuk 3 garis: `Positif`, `Netral`, dan `Negatif`.
4. **Grafik Jumlah Ulasan (Vertical Bar Chart):**
   - Menampilkan distribusi jumlah ulasan per hari dalam seminggu (`Sen`, `Sel`, `Rab`, `Kam`, `Jum`, `Sab`, `Min`).
5. **Daftar Keluhan Terbanyak (Horizontal Bar List):**
   - Menampilkan Top 5 `Issues` berdasarkan jumlah opini negatif beserta tombol `Lihat grup >` yang mengarahkan ke halaman _Grup Feedback & Solusi AI_.
6. **Tabel Feedback Terbaru:**
   - Kolom: `PELANGGAN` (Nama & Sumber), `FEEDBACK` (Bintang Rating + Kutipan teks `Feedbacks.feedback`), `GRUP` (Badge nama `Issues.title` hasil ekstraksi), dan `DITERIMA` (Relative timestamp, misal `12 menit lalu`).

---

### 4.5. Halaman 2: Buat QR (`/qr-generator`)

Halaman untuk membuat dan mengunduh poster QR feedback toko:

1. **Panel Pengaturan QR (Kiri):**
   - **Dropdown Bisnis:** Menampilkan nama toko aktif (`Shops.name`).
   - **Dropdown Format Unduhan:** `PNG - Resolusi tinggi` (dan opsi `PDF` / `SVG` opsional).
   - **Link Feedback Publik:** Menampilkan URL publik (contoh: `https://atlas.feedback/s/{shop_id}`) dengan tombol **Salin** (_Copy to clipboard_ dengan notifikasi toast).
2. **Panel Preview Poster (Kanan):**
   - Merender kartu poster berdesain siap cetak:
     - Header: Logo **ATLAS - SISTEM INSIGHT AI**.
     - Headline: _"Gimana pengalamanmu? Scan untuk kasih feedback. Cuma butuh semenit."_
     - Kotak QR Code berwarna ungu (`#5B34EA`) yang mengenkode URL publik toko.
     - Footer Poster: _"SCAN UNTUK KASIH FEEDBACK"_ dan nama toko (`Shops.name`).
   - Tombol **Unduh PNG** di bagian atas dan bawah preview untuk mengekspor elemen poster menjadi file gambar `.png` beresolusi tinggi.

---

### 4.6. Halaman 3: Hubungkan Akun Google Maps (`/google-maps`)

- **Catatan Sinkronisasi Skema DB:** Pada DBML saat ini, tabel `Google_Maps_Platforms` dan FK `google_maps_platform_id` di `Feedbacks` sedang di-_comment out_ untuk fokus MVP Jalur QR.
- **Implementasi Frontend:**
  - Sediakan komponen UI sesuai desain (_status koneksi, ringkasan ulasan diimpor, daftar ulasan terbaru_).
  - Jika endpoint backend mengembalikan status _feature disabled / coming soon_, tampilkan _state_ informatif atau gunakan data hasil integrasi jika ke depannya diaktifkan.

---

### 4.7. Halaman 4: Grup Feedback & Solusi AI (`/galaxy` atau `/issues`)

Ini adalah fitur inti ATLAS yang menggabungkan eksplorasi klaster masalah (**Jalur A**) dan konsultasi interaktif (**Jalur B**).

#### A. Komponen Atas: Peta Feedback / Galaxy View (`Peta feedback kamu`)

- Menampilkan total feedback yang dikelompokkan ke dalam $N$ topik/isu (`Issues`) yang saling terhubung pada lintasan orbit elips.
- **Representasi Planet (Node Isu):**
  - Ukuran node proporsional terhadap jumlah sebutan/opini (`opinion_count`) atau jumlah feedback unik (`unique_feedback_count`).
  - Menampilkan teks di dalam lingkaran: Tingkat Prioritas/Severity, Judul Isu (`Issues.title`), dan jumlah sebutan (misal: `84 sebutan`).
  - **Indikator Status Planet (3 Status Wajib):**
    1. `Belum Dikonsultasikan`: Belum ada `Consultation_Sessions` berstatus `ARCHIVED` untuk `issue_id` ini.
    2. `Sudah Dikonsultasikan`: Memiliki minimal satu sesi `ARCHIVED` (`final_solution_message_id != null`).
    3. `Ada Ulasan Baru`: Memiliki sesi `ARCHIVED`, tetapi terdapat `Feedback_Opinions` baru yang masuk setelah `archived_at` sesi terakhir.
- **Kontrol Kanvas:** Tombol Zoom Out (`-`), Zoom In (`+`), Fullscreen toggle, serta toggle tampilan _List View_ untuk aksesibilitas.

#### B. Drawer / Panel Detail Planet (Saat Planet Diklik)

Sebelum atau saat memulai sesi AI, tampilkan ringkasan bukti isu (`GET /api/owner/issues/:issueId`):

- Judul Isu (`Issues.title`).
- Statistik Terpisah (Wajib dibedakan sesuai _Evidence Rules_):
  - **Jumlah Feedback Unik** (`unique_feedback_count`)
  - **Total Opini Terkait** (`total_opinion_count`)
  - Breakdown Sentimen (`Negative`, `Neutral`, `Positive`) & Severity.
- **3–5 Ulasan Pelanggan Terbaru/Representatif:** Menampilkan kutipan asli (`evidence_text` & komentar `feedback`), rating bintang, dan waktu diterima.
- **Tombol Aksi Utama:**
  - Jika belum ada sesi aktif: **Mulai Konsultasi AI** (`POST /api/owner/issues/:issueId/consultations`).
  - Jika ada sesi `COLLECTING_CONTEXT` atau `SOLUTION_READY` yang belum diarsipkan: **Lanjutkan Sesi Konsultasi** (`GET /api/owner/consultations/:sessionId`).
  - Tab **Riwayat Konsultasi**: Melihat daftar sesi `ARCHIVED` sebelumnya pada isu tersebut.

#### C. Area Konsultasi Terpadu (Guided AI Consultation Workspace)

Mengikuti _state machine_ sesi dari backend (`COLLECTING_CONTEXT` $\rightarrow$ `SOLUTION_READY` $\rightarrow$ `ARCHIVED`):

1. **State `COLLECTING_CONTEXT` (Tanya Jawab Kontekstual 1 Pertanyaan per Turn):**
   - **Riwayat Chat (`Consultation_Messages`):**
     - Menampilkan bubble pesan `ATLAS_AI` (`message_type = 'TEXT'`) yang berisi tepat **1 pertanyaan kontekstual** beserta indikator progres pertanyaan (misal: _Pertanyaan 2 dari maks. 4_).
     - Menampilkan bubble balasan `OWNER` (`message_type = 'TEXT'`).
   - **3 Kontrol Aksi Owner pada Setiap Giliran (Wajib Ada):**
     1. **Jawab (`OWNER_REPLY`):** Input teks jawaban owner + tombol Kirim (`POST /api/owner/consultations/:sessionId/turns` dengan `event: "OWNER_REPLY"`).
     2. **Lewati Pertanyaan (`SKIP_QUESTION`):** Tombol _"Lewati / Tidak Tahu"_ jika owner tidak memiliki data untuk pertanyaan tersebut (`event: "SKIP_QUESTION"`).
     3. **Buat Solusi Sekarang (`GENERATE_NOW`):** Tombol pintas _"Langsung Buat Solusi"_ untuk meminta AI segera menyusun solusi dengan asumsi & keterbatasan dari bukti yang ada (`event: "GENERATE_NOW"`).
   - **Penanganan Concurrency & Loading:**
     - Saat `processing_request_id != null` atau request sedang berlangsung, kunci ketiga tombol aksi, tampilkan _skeleton/typing state_ _"ATLAS AI sedang menganalisis bukti & konteks bisnis..."_, dan sertakan `request_id` (UUID v4) serta `state_version` untuk idempotensi.

2. **State `SOLUTION_READY` (Tampilan 5 Komponen Solusi & Kandidat Memory):**
   - Merender pesan `ATLAS_AI` dengan `message_type = 'SOLUTION'` (dan nomor `revision`, misal `Revisi #1`):
     - **Bagian 1: Temuan Utama (`findings`):** Ringkasan pola masalah dari data ulasan, cakupan, dan periode waktu.
     - **Bagian 2: Bukti Pelanggan (`customer_evidence`):** Daftar kutipan asli pelanggan lengkap dengan tag referensi `opinion_id` yang bisa di-_hover_ atau diklik untuk melihat ulasan penuh.
     - **Bagian 3: Kemungkinan Penyebab (`hypotheses`):** Daftar hipotesis akar masalah. **Wajib diberi badge visual "Hipotesis / Dugaan Awal"** beserta sumber perujukannya (`opinion_id`, `owner_message_id`, atau `memory_id`).
     - **Bagian 4: Rekomendasi Solusi (`recommendations`):** Tindakan utama yang disarankan, opsi alternatif, serta catatan asumsi & batasan kelayakan (_caveats_).
     - **Bagian 5: Indikator Keberhasilan (`success_indicators`):** Metrik praktis yang dapat diamati langsung oleh owner (contoh: _"Jumlah keluhan waktu tunggu per minggu berkurang"_).
   - **Panel Konfirmasi Business Memory (`memory_candidates`):**
     - Jika AI mengekstrak kandidat fakta bisnis baru dari jawaban owner pada sesi ini (misal: _"Toko hanya memiliki 2 staf pada shift malam"_), tampilkan kotak persetujuan sebelum/saat menyimpan solusi:
       - Owner dapat **Menyetujui (Centang)**, **Mengedit/Koreksi teks fakta**, atau **Menolak (Hapus centang)** setiap kandidat memory.
       - Sesi tetap boleh disimpan/diarsipkan meskipun owner menolak semua kandidat memory.
   - **Kontrol Aksi Owner pada State `SOLUTION_READY`:**
     - **Lanjut Diskusi (`CONTINUE_DISCUSSION`):** Membuka input chat bagi owner untuk memberikan konteks tambahan atau meminta revisi solusi (`revision + 1`).
     - **Simpan Solusi (`SAVE_RESULT`):** Memanggil `POST /api/owner/consultations/:sessionId/save` (menyertakan `final_solution_message_id` dan daftar `approved_memories`). Mengubah status sesi menjadi `ARCHIVED`.
     - **Ekspor Ringkasan:** Mengunduh atau mencetak 5 bagian solusi ke PDF/dokumen ringkas.

3. **State `ARCHIVED` (Read-Only History):**
   - Sesi bersifat _read-only_.
   - Menampilkan tombol **"Diskusikan Lagi (Mulai Sesi Baru)"** jika owner ingin melakukan analisis ulang di kemudian hari.

---

### 4.8. Halaman 5: Akun Bisnis & Business Memory (`/settings/business`)

Mengacu pada desain _Edit Akun Bisnis_ + kebutuhan manajemen _Business Memory_:

1. **Tab / Bagian 1: Profil Bisnis (`Shops`, `Shop_Category`, `Shop_Scale`):**
   - Upload Logo Bisnis (`Shops.image`, PNG/JPG/SVG maks. 2MB).
   - Input Nama Bisnis (`Shops.name`).
   - Dropdown Kategori Bisnis (`Shops.shop_category_id` $\rightarrow$ `Shop_Category.category`).
   - Textarea Deskripsi Bisnis (`Shops.description`).
   - Input Website (`Shops.website`).
   - Dropdown Skala Bisnis (`Shops.shop_scale_id` $\rightarrow$ `Shop_Scale.scale`, misal: `1-10 karyawan`, `11-50 karyawan`).
2. **Tab / Bagian 2: Kontak Pemilik (`Users` & `Shops_Users`):**
   - Nama Pemilik (`Users.name`), Peran (`Shops_Users.role`), Email (`Users.email`), dan Nomor Telepon (`Users.phone_number`).
   - Tombol `Batal` dan `Simpan perubahan`.
3. **Tab / Bagian 3: Memori Bisnis Terkonfirmasi (`Business_Memories`):**
   - Menampilkan daftar seluruh fakta bisnis aktif (`is_active = true`) yang pernah dikonfirmasi owner dari sesi-sesi konsultasi sebelumnya (`GET /api/owner/shops/:shopId/memories`).
   - Fitur untuk **Mengedit teks fakta (`fact_text`)** atau **Menonaktifkan (`is_active = false`)** fakta yang sudah tidak relevan (misal: jumlah staf bertambah atau jam operasional berubah) melalui `PATCH /api/owner/memories/:memoryId`.

---

## 5. Kontrak Integrasi API (Frontend $\leftrightarrow$ Go Backend)

| Method  | Endpoint                                    | Deskripsi                                                                                           | Payload Utama / Query                                                                          |
| :------ | :------------------------------------------ | :-------------------------------------------------------------------------------------------------- | :--------------------------------------------------------------------------------------------- |
| `POST`  | `/api/auth/login`                           | Login user                                                                                          | `{ email, password }`                                                                          |
| `POST`  | `/api/public/shops/:shopId/feedbacks`       | Kirim feedback pelanggan via QR                                                                     | `{ name, rating, feedback, image? }`                                                           |
| `GET`   | `/api/owner/shops/:shopId/dashboard`        | Statistik KPI, grafik sentimen, keluhan terbanyak, feedback terbaru                                 | `?period=30d&sentiment=all&severity=all`                                                       |
| `GET`   | `/api/owner/shops/:shopId/issues`           | Daftar klaster isu untuk Peta Feedback (Galaxy) beserta status konsultasi                           | `?period=30d&sentiment=all`                                                                    |
| `GET`   | `/api/owner/issues/:issueId`                | Detail 1 planet/isu, agregat unik vs opini, 3-5 bukti ulasan, & daftar sesi                         | `?shop_id=:shopId`                                                                             |
| `POST`  | `/api/owner/issues/:issueId/consultations`  | Memulai sesi konsultasi AI baru (`START`)                                                           | `{ shop_id, request_id }`                                                                      |
| `GET`   | `/api/owner/consultations/:sessionId`       | Mengambil state sesi, snapshot ringkas, dan seluruh `Consultation_Messages`                         | -                                                                                              |
| `POST`  | `/api/owner/consultations/:sessionId/turns` | Mengirim giliran percakapan (`OWNER_REPLY`, `SKIP_QUESTION`, `GENERATE_NOW`, `CONTINUE_DISCUSSION`) | `{ request_id, state_version, event, content? }`                                               |
| `POST`  | `/api/owner/consultations/:sessionId/save`  | Mengarsipkan sesi (`ARCHIVED`) & menyimpan _Business Memory_ yang dikonfirmasi                      | `{ final_solution_message_id, confirmed_memories: [{ fact_text, source_owner_message_ids }] }` |
| `GET`   | `/api/owner/shops/:shopId/memories`         | Mengambil daftar _Business Memories_ toko                                                           | `?is_active=true`                                                                              |
| `PATCH` | `/api/owner/memories/:memoryId`             | Mengubah `fact_text` atau `is_active` pada _Business Memory_                                        | `{ fact_text?, is_active? }`                                                                   |
| `PUT`   | `/api/owner/shops/:shopId`                  | Memperbarui profil bisnis & kontak pemilik                                                          | `{ name, description, website, image, shop_category_id, shop_scale_id }`                       |

---

## 6. Kriteria Penerimaan (Acceptance Criteria) untuk Coding Agent

1. **Kepatuhan Desain Visual:** Tampilan Sidebar, Dashboard, Buat QR, Peta Feedback (Planet/Orbit), dan Edit Akun Bisnis sesuai dengan estetika dan tata letak tangkapan layar ATLAS.
2. **Kepatuhan Kontrak AI:** Tidak ada elemen UI yang menampilkan skor solusi fiktif (misal `9.2/10`) atau persentase confidence AI; komponen solusi menampilkan 5 bagian resmi beserta referensi bukti (`opinion_id`, `owner_message_id`, `memory_id`).
3. **Ketahanan State & Error Handling:**
   - Menangani HTTP `409 Conflict` (jika `state_version` berubah atau ada `processing_request_id` yang sedang berjalan) dengan melakukan _refetch_ state sesi terbaru secara mulus.
   - Menampilkan pesan _fallback_ yang ramah apabila layanan AI mengalami _timeout_ tanpa menghilangkan ketikan jawaban owner.
