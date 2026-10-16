import "server-only";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { seed } from "./seed";
import { lessonSchema } from "./schema";
import type { Lesson } from "./types";
export function configured() {
  return !!(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );
}
export async function identity(
  request: Request,
  admin = false,
): Promise<{ db: SupabaseClient; userId: string }> {
  const token = request.headers
    .get("authorization")
    ?.match(/^Bearer (.+)$/)?.[1];
  if (!token) throw new HttpError(401, "Sign in to continue.");
  if (!configured())
    throw new HttpError(
      503,
      "Supabase is not configured. Use local demo mode.",
    );
  const db = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      global: { headers: { Authorization: `Bearer ${token}` } },
      auth: { persistSession: false, autoRefreshToken: false },
    },
  );
  const { data, error } = await db.auth.getUser(token);
  if (error || !data.user)
    throw new HttpError(401, "Your session expired. Sign in again.");
  if (
    request.headers.get("x-gnosis-owner") &&
    request.headers.get("x-gnosis-owner") !== data.user.id
  )
    throw new HttpError(
      409,
      "Account changed. Reload your learning data before saving.",
    );
  if (admin) {
    const { data: allowed, error: e } = await db.rpc("is_admin");
    if (e || !allowed)
      throw new HttpError(403, "Administrator access is required.");
  }
  return { db, userId: data.user.id };
}
export function service() {
  if (!configured()) return null;
  if (!process.env.SUPABASE_SERVICE_ROLE_KEY)
    throw new HttpError(
      503,
      "Content server setup is incomplete. Add SUPABASE_SERVICE_ROLE_KEY on the server, or remove Supabase settings to use the local demo.",
    );
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY,
    { auth: { persistSession: false, autoRefreshToken: false } },
  );
}
export async function getLesson(id: string): Promise<Lesson> {
  if (id === seed.id && !service()) return seed;
  const db = service();
  if (!db) throw new HttpError(404, "Lesson not found.");
  const { data, error } = await db
    .from("lessons")
    .select("payload")
    .eq("id", id)
    .eq("status", "Published")
    .maybeSingle();
  if (error) throw new HttpError(503, "Content storage is unavailable.");
  if (!data) throw new HttpError(404, "Lesson not found or unpublished.");
  return lessonSchema.parse(data.payload);
}
export class HttpError extends Error {
  constructor(
    public status: number,
    message: string,
  ) {
    super(message);
  }
}
export function failure(error: unknown) {
  return Response.json(
    {
      error:
        error instanceof HttpError
          ? error.message
          : "Request could not be completed. Check input and try again.",
    },
    { status: error instanceof HttpError ? error.status : 400 },
  );
}
export async function json(request: Request, max = 500000) {
  const raw = await request.text();
  if (raw.length > max) throw new HttpError(413, "Request is too large.");
  try {
    return JSON.parse(raw);
  } catch {
    throw new HttpError(400, "Invalid JSON.");
  }
}
const buckets = new Map<string, { count: number; until: number }>();
export function limit(key: string, max = 10, windowMs = 60000) {
  const now = Date.now();
  for (const [k, b] of buckets) if (b.until < now) buckets.delete(k);
  const b = buckets.get(key);
  if (b && b.until > now) {
    if (b.count >= max)
      throw new HttpError(429, "Too many requests. Wait a minute and retry.");
    b.count++;
  } else buckets.set(key, { count: 1, until: now + windowMs });
}
export async function signedPdf(lesson: Lesson) {
  if (!lesson.pdfUrl.startsWith("storage:")) return lesson;
  const db = service();
  if (!db) throw new HttpError(503, "Document storage is not configured.");
  const { data, error } = await db.storage
    .from("lesson-documents")
    .createSignedUrl(lesson.pdfUrl.slice(8), 3600);
  if (error) throw new HttpError(503, "Could not open notes PDF.");
  return { ...lesson, pdfUrl: data.signedUrl };
}
