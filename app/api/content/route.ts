import {
  failure,
  service,
  signedPdf,
  getLesson,
  HttpError,
} from "@/lib/server";
import { publicLesson, seed } from "@/lib/seed";
import { lessonSchema } from "@/lib/schema";
export const dynamic = "force-dynamic";
export async function GET(request: Request) {
  try {
    const id = new URL(request.url).searchParams.get("id");
    if (id)
      return Response.json(publicLesson(await signedPdf(await getLesson(id))));
    const db = service();
    if (!db) return Response.json([publicLesson(seed)]);
    const { data, error } = await db
      .from("lessons")
      .select("payload")
      .eq("status", "Published");
    if (error) throw new HttpError(503, "Could not load published lessons.");
    return Response.json(
      await Promise.all(
        (data ?? [])
          .map((x) => lessonSchema.parse(x.payload))
          .map(async (l) => publicLesson(await signedPdf(l))),
      ),
    );
  } catch (e) {
    return failure(e);
  }
}
