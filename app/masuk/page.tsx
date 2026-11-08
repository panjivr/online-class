import { AuthForm } from "@/components/auth-form";
import { AccountShell } from "@/components/account-shell";
import { authConfigured } from "@/lib/auth";
export const dynamic = "force-dynamic";
export default function SignInPage() {
  return <AccountShell eyebrow="SELAMAT DATANG KEMBALI" title="Masuk ke akunmu." description="Lanjutkan perjalanan belajarmu di Remote Worker."><AuthForm mode="login" configured={authConfigured()} /></AccountShell>;
}
