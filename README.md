# 🎮 TOPOQUEST — Petualangan Topologi Jaringan

Game edukasi interaktif berbasis web untuk **Lembar Kerja Peserta Didik (LKPD)** mata pelajaran Informatika Kelas 9 — Topik **Topologi Jaringan**.

Dibuat untuk **SMP Negeri 19 Kota Bekasi** · Tim MGMP Informatika · © 2026

---

## 📖 Deskripsi

TOPOQUEST adalah versi digital LKPD yang terdiri dari **5 level mini-game**:

| Level | Nama | Mengacu LKPD | Jenis |
|-------|------|--------------|-------|
| 1 | 🟦 Kenali Topologi | Bagian A | Drag & Drop Matching |
| 2 | 🟩 Bangun Jaringan | Bagian A (praktik) | Drag & Drop Canvas |
| 3 | 🟨 Pilih yang Tepat | Bagian B | Quiz Skenario |
| 4 | 🟧 Uji Trade-off | Bagian B (analisis) | Slider Decision |
| 5 | 🟪 Refleksi Akhir | Bagian C | Exit Ticket |

Fitur: dwibahasa (ID + istilah Inggris), dark mode, papan skor lokal, sertifikat PNG, download jawaban .txt, easter egg 🥚.

---

## 🚀 Cara Pakai (Lokal)

1. Unduh semua file: `index.html`, `style.css`, `script.js`, `favicon.svg`, `logo.png`, `README.md`.
2. Letakkan dalam **satu folder** bernama `topoquest`.
3. Klik dua kali `index.html` → game terbuka di browser. **Selesai!**

> 💡 Tidak perlu install apa pun. Tidak perlu internet (setelah load pertama).

---

## 🌐 Cara Deploy ke GitHub Pages (Gratis, 15 Menit)

### 1️⃣ Persiapan
- Buat akun GitHub gratis di [https://github.com/signup](https://github.com/signup) (cukup pakai email).
- Siapkan semua file dalam satu folder `topoquest`.

### 2️⃣ Upload ke GitHub (Cara Web — Tanpa Coding)
1. Login ke GitHub → klik **"+"** kanan atas → **New repository**.
2. Isi:
   - Repository name: `topoquest`
   - Description: `Game LKPD Topologi Jaringan Kelas 9`
   - Pilih **Public** ✅
   - Centang **Add a README file**
3. Klik **Create repository**.
4. Klik **Add file → Upload files**.
5. Drag semua file (`index.html`, `style.css`, `script.js`, `favicon.svg`, `logo.png`, `README.md`) ke area upload.
6. Scroll bawah → commit message: `Upload awal game TOPOQUEST` → **Commit changes**.
7. Tunggu 10 detik.

### 3️⃣ Aktifkan GitHub Pages
1. Klik tab **Settings** (⚙️).
2. Scroll kiri → klik **Pages**.
3. Bagian **Source**:
   - Branch: **main**
   - Folder: **/ (root)**
4. Klik **Save**.
5. Tunggu 1–2 menit → refresh halaman → akan muncul:
   > ✅ **Your site is live at** `https://username.github.io/topoquest/`
6. Klik tautan → game langsung terbuka. 🎉

### 4️⃣ Bagikan ke Murid
- Salin link: `https://username.github.io/topoquest/`
- Bagikan via Google Classroom, WhatsApp, atau QR Code ([qr-code-generator.com](https://www.qr-code-generator.com/)).
- Murid cukup buka di HP/laptop — **tanpa install, tanpa login**.

---

## ✏️ Kustomisasi

### Ganti Logo
- Timpa file `logo.png` dengan logo asli SMPN 19 (200×200 px).

### Ganti Warna
- Buka `style.css` → cari `/* ⚙️ TUNABLE: Palet Warna */` → ubah nilai hex.

### Ganti Soal
- Buka `script.js` → cari `// ⚙️ TUNABLE: DATA SOAL` → ubah isi `DATA.level1`, `DATA.level2`, dst.

### Ganti Judul Game
- Buka `script.js` → cari `const GAME_TITLE = "TOPOQUEST"` → ubah.
- Atau buka `index.html` → ganti `<title>` dan `<h1 id="appTitle">`.

### Ganti Footer
- Buka `script.js` → cari `const FOOTER_TEXT = "..."` → ubah.
- Buka `index.html` → ganti teks di dalam `<footer>`.

---

## 🐛 Troubleshooting

| Masalah | Solusi |
|---------|--------|
| Halaman 404 | Pastikan nama file `index.html` (huruf kecil semua) |
| Gambar tidak muncul | Cek nama file `logo.png` sama persis (case-sensitive) |
| Tidak update setelah edit | Tunggu 1–2 menit, lalu `Ctrl+Shift+R` (hard refresh) |
| Tidak bisa akses dari HP | Pastikan repo **Public**, bukan Private |
| Link berubah-ubah | Jangan ganti nama repo setelah Pages aktif |

---

## 🛠️ Teknologi

- HTML5, CSS3 (variable + flexbox + grid)
- Vanilla JavaScript ES6+ (tanpa framework)
- Web Audio API (beep)
- Canvas API (sertifikat)
- localStorage (progres & skor)

---

## 📜 Lisensi

Konten materi: **Tim MGMP Informatika SMP Negeri 19 Kota Bekasi**.
Kode: bebas dipakai & dimodifikasi untuk keperluan pendidikan.

---

**© 2026 SMP Negeri 19 Kota Bekasi**