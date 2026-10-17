import { z } from "zod";
const card = z.object({
  id: z.string().min(1).max(100),
  type: z.enum(["Definitions", "Formulas", "Recap"]),
  title: z.string().min(1).max(200),
  body: z.string().min(1).max(3000),
  formula: z.string().max(500).optional(),
  sourceId: z.string().min(1),
  misconception: z.string().max(1000).optional(),
});
export const lessonSchema = z.object({
  className: z.enum(["11", "12"]).default("12"),
  id: z.string().regex(/^[a-z0-9-]{1,80}$/),
  title: z.string().min(1).max(200),
  subject: z.string().min(1).max(100),
  chapter: z.string().min(1).max(100),
  description: z.string().max(2000),
  videoId: z
    .string()
    .regex(/^[\w-]{11}$/)
    .nullable(),
  transcriptVerified: z.boolean(),
  segments: z
    .array(
      z.object({
        id: z.string(),
        startSeconds: z.number().min(0),
        endSeconds: z.number().positive(),
        text: z.string().min(1).max(10000),
        conceptCards: z.array(card),
      }),
    )
    .max(3000),
  cards: z.array(card).max(200),
  pdfUrl: z
    .string()
    .max(2000)
    .refine(
      (s) =>
        s === "" || s === "/ohms-law-notes.pdf" || s.startsWith("storage:"),
    ),
  excerpts: z
    .array(
      z.object({
        id: z.string(),
        page: z.number().int().positive(),
        text: z.string().min(1).max(15000),
      }),
    )
    .max(500),
  questions: z
    .array(
      z
        .object({
          id: z.string(),
          prompt: z.string().min(1).max(2000),
          options: z.array(z.string().min(1).max(1000)).min(2).max(6),
          correct: z.number().int().min(0),
          explanation: z.string().min(1).max(3000),
          concept: z.string().min(1),
          sourceId: z.string(),
          timestamp: z.number().nonnegative().optional(),
        })
        .refine((q) => q.correct < q.options.length),
    )
    .max(100),
  status: z.enum(["Draft", "Processing", "Review", "Published"]),
  fixture: z.boolean(),
});
export const stateSchema = z.object({
  activityDays: z.array(z.iso.date()).max(3660).default([]),
  studySeconds: z.record(z.iso.date(), z.number().min(0).max(60)).default({}),
  profile: z.object({
    courseSelected: z.boolean().default(false),
    name: z.string().max(100),
    className: z.string().max(20),
    exam: z.string().max(50),
    subjects: z.array(z.string().max(50)).max(10),
    language: z.enum(["English", "Hindi", "Hinglish"]),
  }),
  notes: z
    .array(
      z.object({
        id: z.string(),
        lessonId: z.string(),
        timestamp: z.number().nonnegative(),
        text: z.string().max(10000),
        updatedAt: z.string(),
      }),
    )
    .max(500),
  bookmarks: z
    .array(
      z.object({
        id: z.string(),
        lessonId: z.string(),
        cardId: z.string(),
        timestamp: z.number().nonnegative(),
        title: z.string().max(200),
      }),
    )
    .max(500),
  attempts: z
    .array(
      z.object({
        id: z.string(),
        lessonId: z.string(),
        score: z.number().int().nonnegative(),
        total: z.number().int().positive(),
        at: z.string(),
        results: z
          .array(
            z.object({
              questionId: z.string(),
              chosen: z.number().int(),
              correct: z.number().int(),
              explanation: z.string().max(3000),
              concept: z.string(),
              sourceId: z.string(),
              timestamp: z.number().nonnegative().optional(),
            }),
          )
          .max(100),
      }),
    )
    .max(100),
  progress: z.record(
    z.string(),
    z.object({
      position: z.number().nonnegative().max(100000),
      completed: z.boolean(),
      reviewed: z.boolean(),
    }),
  ),
});
