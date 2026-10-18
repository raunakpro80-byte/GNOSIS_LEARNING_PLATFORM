import { failure, HttpError, json, limit } from "@/lib/server";
import { mockChapterSchema } from "@/lib/mock-schema";
import { mockCatalog, MockBankUnavailableError } from "@/lib/mock-bank";
import { startMock } from "@/lib/mock-service";
export const runtime = "nodejs";
const headers = { "Cache-Control": "no-store" };
export async function GET(request: Request) {
  try {
    const query = new URL(request.url).searchParams;
    const chapter = mockChapterSchema.parse({
      className: query.get("className"),
      subject: query.get("subject"),
      chapter: Number(query.get("chapter")),
    });
    return Response.json(await mockCatalog(chapter), { headers });
  } catch (error) {
    return failure(
      error instanceof MockBankUnavailableError
        ? new HttpError(503, error.message)
        : error,
    );
  }
}
export async function POST(request: Request) {
  try {
    limit("mock-start", 30);
    return Response.json(await startMock(await json(request, 2000)), {
      headers,
    });
  } catch (error) {
    return failure(
      error instanceof MockBankUnavailableError
        ? new HttpError(503, error.message)
        : error,
    );
  }
}
