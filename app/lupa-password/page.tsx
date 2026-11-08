import { AuthForm } from "@/components/auth-form";
import { AccountShell } from "@/components/account-shell";
import { authConfigured } from "@/lib/auth";
export const dynamic = "force-dynamic";
export default function ForgotPage() {
  return <AccountShell eyebrow="BANTUAN AKUN" title="Lupa kata sandi?" description="Masukkan email akunmu untuk menerima petunjuk pengaturan ulang."><AuthForm mode="forgot" configured={authConfigured()} /></AccountShell>;
}
