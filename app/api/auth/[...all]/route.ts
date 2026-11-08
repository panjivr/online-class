import { toNextJsHandler } from "better-auth/next-js";
import { getAuth } from "@/lib/auth";

export const dynamic = "force-dynamic";

async function handle(request: Request, method: "GET" | "POST") {
  const auth = getAuth();
  if (!auth) return Response.json({ error: "Layanan akun belum dikonfigurasi." }, { status: 503 });
  return toNextJsHandler(auth)[method](request);
}

export function GET(request: Request) { return handle(request, "GET"); }
export function POST(request: Request) { return handle(request, "POST"); }
