import { submitPractice } from "@/lib/mock-practice";
import { MockBankUnavailableError } from "@/lib/mock-bank";
import { failure, HttpError, json, limit } from "@/lib/server";
export const runtime = "nodejs";
export async function POST(request: Request) {
  try {
    limit("practice-preview-submit", 120);
    return Response.json(await submitPractice(await json(request, 20000)), {
      headers: { "Cache-Control": "no-store" },
    });
  } catch (error) {
    return failure(
      error instanceof MockBankUnavailableError
        ? new HttpError(503, error.message)
        : error,
    );
  }
}
