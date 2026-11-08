# Setup akun dan checkout

## Status

Kode akun, checkout, webhook, dashboard, dan akses kelas telah disiapkan. Lingkungan harus memiliki database PostgreSQL sendiri, layanan email dengan domain terverifikasi, akun Midtrans, harga dan kebijakan kelas. Kode belum berarti layanan aktif atau transaksi nyata telah diuji.

## Environment

- DATABASE_URL: database PostgreSQL terisolasi dengan koneksi terenkripsi.
- BETTER_AUTH_SECRET: rahasia acak; berbeda untuk produksi dan preview.
- BETTER_AUTH_URL: URL HTTPS resmi untuk produksi.
- RESEND_API_KEY dan AUTH_EMAIL_FROM: email transaksional dari domain terverifikasi.
- MIDTRANS_SERVER_KEY dan MIDTRANS_IS_PRODUCTION: gunakan server key sandbox untuk pengujian; jangan kirim kunci ke browser.
- REMOTE_COURSE_PRICE_IDR: harga integer dalam rupiah, ditetapkan pemilik.
- REMOTE_COURSE_ACCESS_DAYS: durasi akses, ditetapkan pemilik.
- REMOTE_COURSE_PRIVATE_SOURCES: JSON berisi videos (array 8 URL YouTube) dan documents (URL folder Drive). Simpan sebagai rahasia server, jangan commit.

## Aktivasi dan pengujian

1. Provision database baru yang terpisah dari proyek lain dan cek biaya provider. Buat serta tinjau migration Prisma; jalankan hanya pada database yang benar, lalu generate Prisma Client.
2. Konfigurasi email verifikasi dan reset password; uji kirim serta kedaluwarsa token. Jangan membuka pendaftaran jika email belum berfungsi.
3. Gunakan akun Midtrans sandbox. Konfigurasi notification URL /api/webhooks/midtrans pada domain HTTPS yang dapat dijangkau Midtrans; deployment terlindungi SSO mungkin tidak dapat menerima webhook.
4. Tetapkan harga dan durasi akses setelah kebijakan disepakati. Uji checkout, pembayaran pending, settlement, capture fraud challenge, signature palsu, nominal salah, webhook duplikat/berurutan terbalik, pembayaran terlambat, dan kepemilikan data lintas pengguna.
5. Uji dashboard dan area belajar untuk akun yang memiliki akses dan yang tidak; pastikan tidak ada tautan sumber di HTML bagi pengunjung tanpa hak.
6. Bangun pengelolaan admin, refund, pembatalan/dispute, rekonsiliasi dengan status API, keamanan dan backup sebelum pemakaian produksi.

YouTube unlisted dan Google Drive tetap dapat dibagikan oleh peserta yang menerima tautannya. Autentikasi website membatasi pemberian tautan, tetapi bukan DRM. Untuk kontrol akses yang lebih kuat, gunakan video hosting dengan signed playback dan storage privat.
