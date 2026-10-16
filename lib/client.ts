"use client";
import { createClient } from "@supabase/supabase-js";
let client: ReturnType<typeof createClient> | null = null;
export function supabase() {
  if (
    !process.env.NEXT_PUBLIC_SUPABASE_URL ||
    !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  )
    return null;
  return (client ??= createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  ));
}
export async function api(path: string, init: RequestInit = {}) {
  const session = await supabase()?.auth.getSession();
  const headers = new Headers(init.headers);
  if (!(init.body instanceof FormData))
    headers.set("Content-Type", "application/json");
  if (session?.data.session)
    headers.set("Authorization", `Bearer ${session.data.session.access_token}`);
  const response = await fetch(path, { ...init, headers });
  const data = await response.json();
  if (!response.ok) throw new Error(data.error ?? "Request failed.");
  return data;
}
