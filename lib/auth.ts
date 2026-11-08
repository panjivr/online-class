import "server-only";
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { nextCookies } from "better-auth/next-js";
import { getPrisma } from "@/lib/prisma";

export function authConfigured() {
  return Boolean(process.env.DATABASE_URL && process.env.BETTER_AUTH_SECRET &&
    process.env.RESEND_API_KEY && process.env.AUTH_EMAIL_FROM);
}

async function sendMail(to: string, subject: string, url: string) {
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: process.env.AUTH_EMAIL_FROM,
      to: [to],
      subject,
      text: `${subject}\n\nBuka tautan berikut:\n${url}\n\nJika bukan kamu, abaikan pesan ini.`
    })
  });
  if (!response.ok) throw new Error("Email delivery failed");
}

export function getAuth() {
  if (!authConfigured()) return null;
  return betterAuth({
    database: prismaAdapter(getPrisma(), { provider: "postgresql", transaction: true }),
    secret: process.env.BETTER_AUTH_SECRET,
    ...(process.env.BETTER_AUTH_URL ? { baseURL: process.env.BETTER_AUTH_URL } : {}),
    emailAndPassword: {
      enabled: true,
      requireEmailVerification: true,
      minPasswordLength: 10,
      revokeSessionsOnPasswordReset: true,
      sendResetPassword: async ({ user, url }) => {
        await sendMail(user.email, "Atur ulang kata sandi Remote Worker", url);
      }
    },
    emailVerification: {
      sendOnSignUp: true,
      sendOnSignIn: true,
      sendVerificationEmail: async ({ user, url }) => {
        await sendMail(user.email, "Verifikasi email Remote Worker", url);
      }
    },
    rateLimit: { enabled: true, storage: "database" },
    plugins: [nextCookies()]
  });
}
