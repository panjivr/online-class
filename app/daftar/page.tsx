import { AuthForm } from "@/components/auth-form";
import { AccountShell } from "@/components/account-shell";
import { authConfigured } from "@/lib/auth";
export const dynamic = "force-dynamic";
export default function SignUpPage() {
  return <AccountShell eyebrow="MULAI LANGKAHMU" title="Buat akun baru." description="Siapkan akun untuk mengakses kelas dan riwayat pembelianmu."><AuthForm mode="register" configured={authConfigured()} /></AccountShell>;
}
