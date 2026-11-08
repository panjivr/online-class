import { currentSession } from "@/lib/session";
import { paymentConfigured, remotePrice } from "@/lib/payments";
import { CheckoutButton } from "@/components/checkout-button";
import { whatsappFor } from "@/lib/catalog";

export const dynamic = "force-dynamic";
export default async function CheckoutPage() {
  const session = await currentSession();
  const price = remotePrice() ?? 99000;
  const enabled = paymentConfigured() && Boolean(session?.user?.emailVerified);
  return <main className="store-page"><header className="store-header"><a href="/">← Kembali ke kelas</a><a href="/dashboard">Akun saya</a></header><div className="store-grid"><section><span className="account-eyebrow">RINGKASAN KELAS</span><h1>Langkah pertamamu<br /><em>dimulai di sini.</em></h1><p className="store-lead">Panduan kerja remote internasional bersama Fia, lengkap dengan topik video dan dokumen pendukung.</p><ul className="store-list"><li>8 topik video pembelajaran</li><li>Referensi CV, cover letter, portofolio dan job tracker</li><li>Akses seumur hidup dan pembaruan materi</li></ul><a className="under-link" href={whatsappFor("Kerja Remote Internasional")} target="_blank" rel="noopener noreferrer">Tanya admin melalui WhatsApp ↗</a></section><aside className="checkout-card"><span className="account-eyebrow">RINGKASAN PEMBELIAN</span><h2>Kerja Remote Internasional</h2><div className="checkout-price"><span>Harga kelas</span><strong>{new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(price)}</strong></div>{!enabled && <p className="form-notice">Pembayaran sungguhan belum aktif. Kamu bisa mencoba alur pemesanan dan persetujuan admin melalui versi demo.</p>}{!enabled && <a className="account-submit link-button" href="/trial">Coba pembelian demo →</a>}{!session && <p><a className="under-link" href="/masuk">Masuk ke akun →</a></p>}{session && <><p>Akun: {session.user.email}</p><CheckoutButton enabled={enabled} /></>}<small>Akses sungguhan diberikan setelah pembayaran dikonfirmasi. Hasil setiap peserta berbeda.</small></aside></div></main>;
}
