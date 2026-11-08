# Figma dan implementasi

Rancangan awal yang dapat diedit: https://www.figma.com/design/j5jDIY3XYjz3r5Q8PBFYBB. File berisi draft landing desktop dan hero mobile; halaman lainnya dan sinkronisasi otomatis belum dibuat. File Figma menjadi sumber spesifikasi visual, bukan gambar datar.

## Struktur yang disiapkan

- Foundations: warna, tipografi, spacing, radius, grid dan motion.
- Components: brand, tombol, navigasi, kartu kelas, FAQ dan modul dengan state lengkap.
- Pages: landing, kelas, checkout, akun, dashboard, player dan admin.
- Breakpoints: mobile, tablet dan desktop; gunakan Auto Layout dan constraints.

## Pemetaan awal

| Figma | Implementasi |
| --- | --- |
| Foundations / Color | custom properties di app/globals.css |
| Brand / Wordmark | Brand di app/page.tsx |
| Button / Primary | kelas .button dan .button-dark |
| Course / Card | markup .course-card di app/page.tsx |
| Accordion / Module | elemen details.module |
| Accordion / FAQ | elemen details.faq-item |

Pemetaan di atas adalah dokumentasi manual, bukan koneksi Figma Code Connect yang aktif. Setelah komponen diekstraksi dan file desain dibuat, evaluasi Code Connect berdasarkan ketersediaan akun dan hak akses.

## Alur perubahan

Ubah desain → bagikan link frame atau node → implementasikan dalam branch → uji responsive, interaksi, aksesibilitas dan perubahan lintas halaman → review preview → gabungkan/deploy. Teks, harga, FAQ dan materi yang sering berganti sebaiknya dipindahkan ke CMS/admin, tidak perlu mengubah Figma untuk setiap perubahan.
