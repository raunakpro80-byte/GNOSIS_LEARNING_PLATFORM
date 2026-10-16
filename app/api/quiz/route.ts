import { failure, getLesson, json, limit } from "@/lib/server";
import { grade } from "@/lib/learning";
import { z } from "zod";
export async function POST(request: Request) {
  try {
    limit("quiz", 120);
    const { lessonId, answers } = z
      .object({
        lessonId: z.string().max(80),
        answers: z.record(z.string(), z.number().int()),
      })
      .parse(await json(request, 15000));
    const result = grade(await getLesson(lessonId), answers);
    return Response.json({
      ...result,
      id: crypto.randomUUID(),
      lessonId,
      at: new Date().toISOString(),
    });
  } catch (e) {
    return failure(e);
  }
}
