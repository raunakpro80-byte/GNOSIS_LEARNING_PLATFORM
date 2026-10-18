import {
  practiceCatalog,
  practiceChapterSchema,
  startPractice,
} from "@/lib/mock-practice";
import { MockBankUnavailableError } from "@/lib/mock-bank";
import { failure, HttpError, json, limit } from "@/lib/server";
export const runtime = "nodejs";
export const dynamic = "force-dynamic";
const headers = { "Cache-Control": "no-store" };
function failed(error: unknown) {
  return failure(
    error instanceof MockBankUnavailableError
      ? new HttpError(503, error.message)
      : error,
  );
}
export async function GET(request: Request) {
  try {
    const query = new URL(request.url).searchParams;
    return Response.json(
      await practiceCatalog(
        practiceChapterSchema.parse({
          className: query.get("className"),
          subject: query.get("subject"),
          chapter: Number(query.get("chapter")),
        }),
      ),
      { headers },
    );
  } catch (error) {
    return failed(error);
  }
}
export async function POST(request: Request) {
  try {
    limit("practice-preview-start", 120);
    return Response.json(await startPractice(await json(request, 2000)), {
      headers,
    });
  } catch (error) {
    return failed(error);
  }
}
