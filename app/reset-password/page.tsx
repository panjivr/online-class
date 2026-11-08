import { AuthForm } from "@/components/auth-form";
import { AccountShell } from "@/components/account-shell";
import { authConfigured } from "@/lib/auth";
export const dynamic = "force-dynamic";
export default async function ResetPage({ searchParams }: { searchParams: Promise<{ token?: string }> }) {
  const { token } = await searchParams;
  return <AccountShell eyebrow="BANTUAN AKUN" title="Buat kata sandi baru." description="Pilih kata sandi yang kuat untuk akunmu."><AuthForm mode="reset" token={token} configured={authConfigured()} /></AccountShell>;
}
