# Remote Worker

Website kelas kerja remote dengan Next.js App Router. Login, dashboard, checkout, dan area belajar memerlukan layanan serta konfigurasi yang belum otomatis tersedia.

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

Akun, checkout Midtrans, dan akses materi memerlukan database, email transaksional, harga, serta kredensial gateway. Tanpa konfigurasi, akun dan pembayaran ditutup. Admin/CMS, pengelolaan refund, rekonsiliasi dan streaming privat belum tersedia. Jangan menerima pembayaran produksi sebelum konfigurasi dan uji menyeluruh selesai.

## Materi sumber

Pengguna menyatakan kelas kerja remote adalah proyek kerja sama dengan pembuat materi. Akses, penggunaan, dan distribusi konten mengikuti kesepakatan para pemiliknya. Tautan sumber materi disimpan sebagai rahasia pada preview, bukan di repo publik; area peserta membutuh­kan akun, database, dan hak akses yang aktif. Kurikulum kelas desain merupakan rancangan dari presentasi pemilik.

## Figma

Rancangan awal Figma Design: https://www.figma.com/design/j5jDIY3XYjz3r5Q8PBFYBB. Lihat `docs/figma-handoff.md`. Mengubah Figma tidak secara otomatis mengubah kode produksi.

## Berikutnya

Lihat `docs/launch-checklist.md` dan `docs/setup-commerce.md`. Rahasia layanan disimpan di environment penyedia, jangan ditaruh dalam repo.
