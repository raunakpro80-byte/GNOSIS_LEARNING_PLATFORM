import { identity, failure, json, HttpError, limit } from "@/lib/server";
import { lessonSchema } from "@/lib/schema";
import { validateContent } from "@/lib/content-validation";
import { seed } from "@/lib/seed";
export async function GET(request: Request) {
  try {
    const { db } = await identity(request, true);
    if (new URL(request.url).searchParams.has("template"))
      return Response.json(seed);
    const { data, error } = await db
      .from("lessons")
      .select("*")
      .order("updated_at", { ascending: false });
    if (error)
      throw new HttpError(
        503,
        "Could not load content. Apply the database migration.",
      );
    return Response.json(data);
  } catch (e) {
    return failure(e);
  }
}
export async function POST(request: Request) {
  try {
    const { db, userId } = await identity(request, true);
    limit(`admin:${userId}`, 30);
    const body = await json(request, 2000000);
    const lesson = lessonSchema.parse(body.lesson);
    try {
      validateContent(lesson, body.reviewed === true);
    } catch (error) {
      throw new HttpError(
        400,
        error instanceof Error ? error.message : "Invalid lesson content.",
      );
    }
    const { error: s } = await db
      .from("subjects")
      .upsert({ name: lesson.subject }, { onConflict: "name" });
    const { error: c } = await db
      .from("chapters")
      .upsert(
        { subject: lesson.subject, name: lesson.chapter },
        { onConflict: "subject,name" },
      );
    if (s || c) throw new HttpError(503, "Could not save subject or chapter.");
    const { error } = await db.from("lessons").upsert({
      id: lesson.id,
      subject: lesson.subject,
      chapter: lesson.chapter,
      status: lesson.status,
      payload: lesson,
      updated_at: new Date().toISOString(),
    });
    if (error) throw new HttpError(503, "Could not save lesson.");
    return Response.json({ saved: true });
  } catch (e) {
    return failure(e);
  }
}
