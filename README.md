# BrutalHub

Satu project Next.js 14 (App Router) + Tailwind + Prisma berisi dua mini-app bergaya **Neo-Brutalism**:

- **LinkVault** (`/linkvault`) — simpan link, kelompokkan ke koleksi, cari lagi kapan saja.
- **SkillHive** (`/skillhive`) — dashboard trainer: profil, pengalaman kerja, dan review murid.

Semua data (koleksi, link, trainer, review) tersimpan beneran di database PostgreSQL lewat Prisma — bukan data dummy di frontend.

> **Catatan jujur:** kode ini ditulis di sandbox tanpa akses internet, jadi belum sempat dijalankan `npm install` / `npm run build` secara langsung di sini untuk verifikasi otomatis. Strukturnya mengikuti konvensi resmi Next.js 14 App Router + Prisma yang stabil, tapi tetap **jalankan `npm run build` di komputermu dulu** sebelum deploy, supaya kalau ada typo kecil bisa langsung ketahuan dan gampang diperbaiki.

## 1. Setup lokal

```bash
npm install
```

Buat file `.env` (copy dari `.env.example`) dan isi `DATABASE_URL` dengan connection string PostgreSQL. Cara tercepat & gratis:

- **Opsi A — Vercel Postgres (Neon):** buka project di Vercel → tab **Storage** → **Create Database** → pilih **Postgres** → copy `DATABASE_URL` yang muncul.
- **Opsi B — Neon.tech langsung:** buat project gratis di neon.tech, copy connection string.
- **Opsi C — Supabase:** buat project, ambil connection string dari **Project Settings → Database**.

Setelah `.env` terisi:

```bash
npx prisma db push      # bikin tabel di database sesuai schema.prisma
npm run db:seed         # isi data contoh (koleksi, trainer Hillary Bale, dll)
npm run dev             # jalan di http://localhost:3000
```

## 2. Struktur

```
app/
  page.tsx                  → hub pemilih LinkVault / SkillHive
  linkvault/                → dashboard, detail koleksi, settings
  skillhive/                → sidebar layout, trainers, schedule, dll
  api/                      → route handler (collections, links, reviews)
prisma/
  schema.prisma             → model Collection, Link, Trainer, WorkExperience, Review
  seed.js                   → data awal
lib/
  prisma.ts, utils.ts
components/
  ui/                       → Button, Card, Input, Modal, dll (dipakai bersama)
  linkvault/, skillhive/    → komponen khusus tiap app
```

## 3. Deploy ke Vercel

1. Push folder ini ke repo GitHub/GitLab kamu.
2. Di Vercel: **Add New Project** → import repo tersebut.
3. Di tab **Storage**, buat Postgres database (atau pakai Neon/Supabase eksternal) → Vercel otomatis menambahkan env var `DATABASE_URL` ke project. Kalau pakai DB eksternal, tambahkan manual di **Settings → Environment Variables**.
4. Deploy. Build command sudah otomatis menjalankan `prisma generate` lewat script `build` di `package.json`.
5. Setelah deploy pertama sukses, jalankan migrasi skema & seed **sekali** dari komputer lokal (arahkan `DATABASE_URL` lokal ke database production yang sama):
   ```bash
   npx prisma db push
   npm run db:seed
   ```

## 4. Yang sudah fungsional (bukan sekadar tampilan)

- LinkVault: tambah/hapus koleksi, ubah nama koleksi, tempel & hapus link, pencarian koleksi — semua lewat API route + Prisma.
- SkillHive: lihat daftar trainer & detail trainer dari database, kirim review baru (rating + komentar) yang langsung memperbarui rata-rata rating dan grafik tren.
- Preferences SkillHive tersimpan di `localStorage` perangkat (bukan fitur palsu, memang didesain client-side).

## 5. Visual & animasi (update terbaru)

- Semua emoji sudah diganti ikon SVG custom (`components/icons/index.tsx`) — konsisten, tajam di semua ukuran layar, tidak bergantung font emoji OS.
- Framer Motion dipakai untuk: scroll-reveal (`Reveal`/`RevealGroup`), transisi antar halaman (`PageTransition`), progress bar scroll di atas layar (`ScrollProgress`), tombol & kartu yang terasa "hidup" (tilt, spring, shine sweep), angka statistik yang menghitung naik (`CountUp`), sparkline yang "digambar" saat muncul, dan sidebar SkillHive dengan indikator aktif yang meluncur mulus (`layoutId`).
- Grain overlay tipis + spotlight cursor-follow di kartu untuk nuansa lebih premium/sinematik, tetap dalam batas gaya Neo-Brutalism (border tebal, shadow keras, warna flat).
- Semua animasi memakai transform/opacity (bukan properti yang mahal di-render) supaya tetap ringan.

## 6. Ide pengembangan lanjutan

- Autentikasi admin untuk tambah/edit trainer.
- Upload foto trainer & favicon otomatis untuk link (butuh storage seperti Vercel Blob / S3).
- Pagination untuk daftar link/trainer kalau datanya sudah banyak.
