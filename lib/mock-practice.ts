import { createHash, randomBytes, randomInt, randomUUID } from "node:crypto";
import { z } from "zod";
import { readMockBank, mockCatalogFromBank } from "./mock-bank";
import {
  chapterTitle,
  mockConfigSchema,
  mockAnswersSchema,
} from "./mock-schema";
import { gradeMock, publicMockAttempt } from "./mock-engine";
import type { MockAttempt, MockChapter, MockQuestion } from "./mock-types";

export const practiceChapterSchema = z
  .object({
    className: z.literal("11"),
    subject: z.literal("physics"),
    chapter: z.number().int().min(1).max(4),
  })
  .strict();
async function practicePool(chapter: MockChapter) {
  practiceChapterSchema.parse(chapter);
  return (await readMockBank()).filter(
    (q) =>
      q.className === "11" &&
      q.subject === "physics" &&
      q.chapter === chapter.chapter &&
      !q.developmentSample &&
      q.verification.status === "draft",
  );
}
const digest = (questions: MockQuestion[]) =>
  createHash("sha256").update(JSON.stringify(questions)).digest("hex");
export async function practiceCatalog(chapter: MockChapter) {
  const pool = await practicePool(chapter);
  // Only the preview catalog uses these counts. Never rewrite a question's verification status.
  const catalog = mockCatalogFromBank(chapter, []);
  const counts = {
    easy: pool.filter((q) => q.difficulty === "easy").length,
    medium: pool.filter((q) => q.difficulty === "medium").length,
    hard: pool.filter((q) => q.difficulty === "hard").length,
    all: pool.length,
  };
  const { mockCountsByDifficulty } = await import("./mock-policy");
  return {
    ...catalog,
    counts,
    draftCounts: counts,
    sizes: Object.fromEntries(
      (["easy", "medium", "hard"] as const).map((level) => [
        level,
        mockCountsByDifficulty[level].filter((n) => n <= counts[level]),
      ]),
    ),
  };
}
export async function startPractice(raw: unknown) {
  const config = mockConfigSchema.parse(raw);
  const chapter = practiceChapterSchema.parse({
    className: config.className,
    subject: config.subject,
    chapter: config.chapter,
  });
  const pool = (await practicePool(chapter)).filter(
    (q) => q.difficulty === config.difficulty,
  );
  if (pool.length < config.count)
    throw new Error(
      "Not enough draft questions for this practice configuration.",
    );
  for (let i = pool.length - 1; i > 0; i--) {
    const j = randomInt(i + 1);
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }
  const questions = pool.slice(0, config.count),
    id = randomUUID(),
    now = Date.now();
  const attempt: MockAttempt = {
    schemaVersion: 1,
    id,
    tokenHash: "practice-only-no-server-session",
    config,
    chapterTitle: chapterTitle(config),
    startedAt: now,
    expiresAt: now + config.durationMinutes * 60000,
    revision: 0,
    questions,
    answers: {},
    result: null,
  };
  return {
    token: `${id}.${randomBytes(32).toString("base64url")}`,
    attempt: publicMockAttempt(attempt, now),
    manifest: {
      id,
      config: {
        ...chapter,
        count: config.count,
        difficulty: config.difficulty,
      },
      questionIds: questions.map((q) => q.id),
      startedAt: now,
      contentHash: digest(questions),
    },
  };
}
export const practiceSubmissionSchema = z
  .object({
    manifest: z
      .object({
        id: z.string().uuid(),
        config: mockConfigSchema,
        questionIds: z.array(z.string().max(80)).min(10).max(30),
        startedAt: z.number().int().nonnegative(),
        contentHash: z.string().regex(/^[a-f0-9]{64}$/),
      })
      .strict(),
    answers: mockAnswersSchema,
  })
  .strict();
export async function submitPractice(raw: unknown, now = Date.now()) {
  const { manifest, answers } = practiceSubmissionSchema.parse(raw),
    config = manifest.config;
  const chapter = practiceChapterSchema.parse({
    className: config.className,
    subject: config.subject,
    chapter: config.chapter,
  });
  if (
    manifest.questionIds.length !== config.count ||
    new Set(manifest.questionIds).size !== config.count
  )
    throw new Error("Practice question list is invalid or repeated.");
  if (manifest.startedAt > now + 10000)
    throw new Error("Practice start time is invalid.");
  const byId = new Map(
    (await practicePool(chapter))
      .filter((q) => q.difficulty === config.difficulty)
      .map((q) => [q.id, q]),
  );
  const questions = manifest.questionIds.map((id) => {
    const q = byId.get(id);
    if (!q)
      throw new Error("Question does not match this chapter and difficulty.");
    return q;
  });
  if (digest(questions) !== manifest.contentHash)
    throw new Error(
      "Practice content changed since this attempt started. Start a new preview; no result has been guessed.",
    );
  const expiresAt = manifest.startedAt + config.durationMinutes * 60000;
  const attempt: MockAttempt = {
    schemaVersion: 1,
    id: manifest.id,
    tokenHash: "practice-only-no-server-session",
    config,
    chapterTitle: chapterTitle(config),
    startedAt: manifest.startedAt,
    expiresAt,
    revision: 1,
    questions,
    answers,
    result: null,
  };
  attempt.result = gradeMock(
    attempt,
    Math.min(now, expiresAt),
    now >= expiresAt ? "expired" : "manual",
  );
  return publicMockAttempt(attempt, now);
}
