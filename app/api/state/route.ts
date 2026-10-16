import { identity, failure, json, HttpError } from "@/lib/server";
import { stateSchema } from "@/lib/schema";
export async function GET(request: Request) {
  try {
    const { db, userId } = await identity(request);
    const { data, error } = await db
      .from("learning_state")
      .select("data")
      .eq("user_id", userId)
      .maybeSingle();
    if (error) throw new HttpError(503, "Could not load your learning data.");
    return Response.json(data?.data ?? null);
  } catch (e) {
    return failure(e);
  }
}
export async function PUT(request: Request) {
  try {
    const { db, userId } = await identity(request);
    const state = stateSchema.parse(await json(request));
    const { error } = await db
      .from("learning_state")
      .upsert({
        user_id: userId,
        data: state,
        updated_at: new Date().toISOString(),
      });
    if (error)
      throw new HttpError(
        503,
        "Could not save. Your changes remain in this session; retry.",
      );
    return Response.json({ saved: true });
  } catch (e) {
    return failure(e);
  }
}
