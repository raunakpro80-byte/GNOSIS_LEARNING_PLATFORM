import { failure, HttpError, json, limit } from "@/lib/server";
import {
  mockOwnerFailure,
  mockOwnerPreview,
  requireMockOwner,
  saveMockOwnerReview,
} from "@/lib/mock-owner-service";
export const runtime = "nodejs";
export const dynamic = "force-dynamic";
const headers = {
  "Cache-Control": "private, no-store",
  Vary: "Authorization",
  "X-Robots-Tag": "noindex, nofollow",
};
function failed(error: unknown) {
  const response = failure(mockOwnerFailure(error));
  Object.entries(headers).forEach(([key, value]) =>
    response.headers.set(key, value),
  );
  return response;
}
export async function GET(request: Request) {
  try {
    await requireMockOwner(request);
    const query = new URL(request.url).searchParams;
    const chapter = Number(query.get("chapter") || 1),
      offset = Number(query.get("offset") || 0);
    if (
      !Number.isInteger(chapter) ||
      chapter < 1 ||
      chapter > 4 ||
      !Number.isInteger(offset) ||
      offset < 0 ||
      offset > 10000
    )
      throw new HttpError(400, "Choose Chapter 1–4 and a valid page.");
    return Response.json(await mockOwnerPreview(chapter, offset), { headers });
  } catch (error) {
    return failed(error);
  }
}
export async function POST(request: Request) {
  try {
    // Bearer-only authentication: no ambient cookies or client-asserted owner identity.
    const userId = await requireMockOwner(request);
    limit(`mock-review:${userId}`, 120);
    return Response.json(
      await saveMockOwnerReview(await json(request, 8000), userId),
      { headers },
    );
  } catch (error) {
    return failed(error);
  }
}
