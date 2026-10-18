import { z } from "zod";
import { chaptersFor } from "./curriculum";
import type { MockChapter, MockQuestion } from "./mock-types";
import { mockCountsByDifficulty, mockDuration } from "./mock-policy";
export const mockChapterSchema = z.object({
  className: z.enum(["11", "12"]),
  subject: z.enum(["physics", "chemistry", "mathematics", "biology"]),
  chapter: z.number().int().min(1).max(30),
});
export function chapterTitle(c: MockChapter) {
  const chapter = chaptersFor(c.className, c.subject).find(
    (x) => x.number === c.chapter,
  );
  if (!chapter)
    throw new Error("Choose a chapter from the Class 11 or 12 curriculum.");
  return chapter.title;
}
export const mockConfigSchema = mockChapterSchema
  .extend({
    count: z.union([z.literal(10), z.literal(20), z.literal(30)]).default(10),
    difficulty: z.enum(["easy", "medium", "hard"]).default("easy"),
  })
  .strict()
  .refine(
    (config) =>
      mockCountsByDifficulty[config.difficulty].includes(config.count),
    {
      message:
        "That question count is not supported for the selected difficulty.",
      path: ["count"],
    },
  )
  .transform((config) => ({
    ...config,
    durationMinutes: mockDuration(config.difficulty, config.count),
  }));
export const mockQuestionSchema = mockChapterSchema
  .extend({
    id: z.string().regex(/^[a-zA-Z0-9][a-zA-Z0-9_-]{2,79}$/),
    topic: z.string().trim().min(2).max(120),
    type: z.enum(["single", "multiple", "numerical"]),
    difficulty: z.enum(["easy", "medium", "hard"]),
    prompt: z.string().trim().min(8).max(3000),
    options: z
      .array(z.string().trim().min(1).max(1000))
      .min(2)
      .max(6)
      .optional(),
    correct: z.union([
      z.number().finite(),
      z.array(z.number().int().nonnegative()).min(2).max(6),
    ]),
    tolerance: z.number().finite().min(0).max(1).optional(),
    explanation: z.string().trim().min(12).max(5000),
    source: z
      .object({
        kind: z.enum(["original", "reference"]),
        label: z.string().trim().min(3).max(300),
        reference: z.string().trim().min(1).max(1000).optional(),
      })
      .strict(),
    verification: z
      .object({
        status: z.enum(["draft", "verified"]),
        method: z.string().trim().min(5).max(500),
      })
      .strict(),
    developmentSample: z.boolean().optional(),
  })
  .strict()
  .superRefine((q, ctx) => {
    try {
      chapterTitle(q);
    } catch {
      ctx.addIssue({
        code: "custom",
        message: "Chapter is not in the curriculum.",
      });
    }
    if (q.type === "numerical") {
      if (typeof q.correct !== "number" || q.options)
        ctx.addIssue({
          code: "custom",
          message: "Numerical questions need a finite answer and no options.",
        });
    } else {
      if (!q.options || new Set(q.options).size !== q.options.length)
        ctx.addIssue({
          code: "custom",
          message: "MCQ options must be present and distinct.",
        });
      const answers = Array.isArray(q.correct) ? q.correct : [q.correct];
      if (
        (q.type === "single" && Array.isArray(q.correct)) ||
        (q.type === "multiple" && !Array.isArray(q.correct)) ||
        answers.some(
          (n) => !Number.isInteger(n) || n < 0 || n >= (q.options?.length ?? 0),
        ) ||
        new Set(answers).size !== answers.length ||
        q.tolerance !== undefined
      )
        ctx.addIssue({
          code: "custom",
          message:
            "MCQ answer indices must match their type and options; tolerance is numerical-only.",
        });
    }
    if (q.source.kind === "reference" && !q.source.reference)
      ctx.addIssue({
        code: "custom",
        message: "Referenced questions need a source reference.",
      });
  });
export const mockBankSchema = z
  .object({
    schemaVersion: z.literal(1),
    questions: z.array(mockQuestionSchema).min(1).max(2000),
  })
  .strict()
  .superRefine((bank, ctx) => {
    if (new Set(bank.questions.map((q) => q.id)).size !== bank.questions.length)
      ctx.addIssue({ code: "custom", message: "Question IDs must be unique." });
  });
export const mockAnswersSchema = z.record(
  z.string().max(80),
  z.union([
    z.number().int().nonnegative().max(5),
    z.array(z.number().int().nonnegative().max(5)).max(6),
    z.string().max(64),
    z.null(),
  ]),
);
export const saveMockSchema = z
  .object({
    revision: z.number().int().nonnegative(),
    answers: mockAnswersSchema,
  })
  .strict();
export function parseMockBank(data: unknown): MockQuestion[] {
  return mockBankSchema.parse(data).questions as MockQuestion[];
}
