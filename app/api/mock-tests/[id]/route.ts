import { failure, json } from "@/lib/server";
import { accessMock } from "@/lib/mock-service";
export const runtime = "nodejs";
type Context = { params: Promise<{ id: string }> };
async function handle(
  request: Request,
  context: Context,
  operation: "read" | "save" | "submit",
) {
  try {
    const { id } = await context.params;
    const body = operation === "read" ? undefined : await json(request, 20000);
    return Response.json(
      await accessMock(
        id,
        request.headers.get("authorization"),
        operation,
        body,
      ),
      { headers: { "Cache-Control": "no-store", Vary: "Authorization" } },
    );
  } catch (error) {
    return failure(error);
  }
}
export const GET = (request: Request, context: Context) =>
  handle(request, context, "read");
export const PATCH = (request: Request, context: Context) =>
  handle(request, context, "save");
export const POST = (request: Request, context: Context) =>
  handle(request, context, "submit");
