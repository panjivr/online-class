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
- Token desain di `app/globals.css` sebagai dasar penyelarasan Figma.
- Metadata yang tidak meminta pengindeksan selama pratinjau.

## Belum aktif

Belum ada registrasi akun, database, dashboard peserta/admin, pengambilan pembayaran, pengiriman email, video berbayar, materi unduhan, CMS, atau integrasi Figma. Jangan menerima pembayaran atau menyatakan fitur tersebut tersedia sebelum implementasi, konfigurasi, kebijakan, pengujian, dan izin konten siap.

## Materi sumber

Materi referensi pihak ketiga memiliki pembatasan penggunaan pribadi dan tidak untuk dijual atau didistribusikan ulang. Gunakan materi yang dibuat sendiri atau yang memiliki izin tertulis. Nama modul saat ini merupakan rancangan, bukan materi kelas yang sudah diproduksi.

## Figma

Komponen dan token perlu dipetakan ke file Figma Design yang dapat diedit setelah file dibuat. Lihat `docs/figma-handoff.md`. Mengubah Figma tidak secara otomatis mengubah kode produksi.

## Berikutnya

Lihat `docs/launch-checklist.md`. Rahasia layanan disimpan di environment penyedia, jangan ditaruh dalam repo.
