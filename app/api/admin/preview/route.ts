import { identity, failure, json, signedPdf } from "@/lib/server";
import { lessonSchema } from "@/lib/schema";
import { publicLesson } from "@/lib/seed";
export async function POST(request: Request) {
  try {
    await identity(request, true);
    const lesson = lessonSchema.parse((await json(request, 2000000)).lesson);
    return Response.json(publicLesson(await signedPdf(lesson)));
  } catch (e) {
    return failure(e);
  }
}
