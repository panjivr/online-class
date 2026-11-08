# Remote Worker

Fondasi website kelas kerja remote dengan Next.js App Router. Tahap saat ini adalah **pratinjau publikasi dan kurikulum**, bukan sistem penjualan yang sudah aktif.

## Menjalankan

Persyaratan: Node.js 20.9 atau lebih baru dan npm.

```bash
npm install
npm run dev
```

Buka http://localhost:3000. Jalankan pemeriksaan dengan `npm run typecheck` dan `npm run build`.

## Isi saat ini

- Landing page responsif berbahasa Indonesia dan identitas neon.
- Navigasi, rincian kurikulum dan FAQ interaktif.
- Salinan yang menyatakan kelas masih dipersiapkan dan tidak menjanjikan pekerjaan.
- Daftar modul dan FAQ terpusat di `lib/course.ts`.
- Katalog kelas kerja remote, desain Canva, dan desain berbantuan AI di `lib/catalog.ts`.
- Kontak WhatsApp, Instagram, dan TikTok untuk informasi kelas.
- Token desain di `app/globals.css` sebagai dasar penyelarasan Figma.
- Rancangan skema PostgreSQL/Prisma di `prisma/schema.prisma`; belum terhubung ke database.
- Metadata yang tidak meminta pengindeksan selama pratinjau.

## Belum aktif

Belum ada registrasi akun, database, dashboard peserta/admin, pengambilan pembayaran, pengiriman email, video berbayar, materi unduhan, CMS, atau integrasi Figma. Jangan menerima pembayaran atau menyatakan fitur tersebut tersedia sebelum implementasi, konfigurasi, kebijakan, pengujian, dan izin konten siap.

## Materi sumber

Pengguna menyatakan kelas kerja remote adalah proyek kerja sama dengan pembuat materi. Akses, penggunaan, dan distribusi konten mengikuti kesepakatan para pemiliknya. Tautan sumber materi belum disimpan di repo maupun terhubung ke area peserta; repo ini bersifat publik. Kurikulum kelas desain merupakan rancangan dari presentasi pemilik.

## Figma

Rancangan awal Figma Design: https://www.figma.com/design/j5jDIY3XYjz3r5Q8PBFYBB. Lihat `docs/figma-handoff.md`. Mengubah Figma tidak secara otomatis mengubah kode produksi.

## Berikutnya

Lihat `docs/launch-checklist.md`. Rahasia layanan disimpan di environment penyedia, jangan ditaruh dalam repo.
