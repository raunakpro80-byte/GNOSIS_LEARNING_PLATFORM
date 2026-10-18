import "server-only";
import {
  createHash,
  randomBytes,
  randomInt,
  randomUUID,
  timingSafeEqual,
} from "node:crypto";
import { verifiedChapterQuestions } from "./mock-bank";
import { FileMockAttemptStore } from "./mock-storage";
import { chapterTitle, mockConfigSchema } from "./mock-schema";
import {
  MockTransitionError,
  publicMockAttempt,
  transitionMockAttempt,
} from "./mock-engine";
import { HttpError } from "./server";
import type { MockAttempt } from "./mock-types";
import { mockAttemptStorageIssue } from "./mock-hosting";
import {
  mockDatabaseConfigured,
  SupabaseMockAttemptStore,
} from "./mock-database";
function attemptStore() {
  const issue = mockAttemptStorageIssue();
  if (issue) throw new HttpError(503, issue);
  return mockDatabaseConfigured()
    ? new SupabaseMockAttemptStore()
    : new FileMockAttemptStore();
}
function storageLabel<T extends { storage: "local-server" | "supabase" }>(
  value: T,
): T {
  return {
    ...value,
    storage: mockDatabaseConfigured() ? "supabase" : "local-server",
  };
}
const hash = (secret: string) =>
  createHash("sha256").update(secret).digest("hex");
export async function startMock(data: unknown) {
  const config = mockConfigSchema.parse(data);
  const pool = (await verifiedChapterQuestions(config)).filter(
    (q) => q.difficulty === config.difficulty,
  );
  if (pool.length < config.count)
    throw new HttpError(
      400,
      "Not enough approved questions for that length and difficulty.",
    );
  const storageIssue = mockAttemptStorageIssue();
  if (storageIssue) throw new HttpError(503, storageIssue);
  for (let i = pool.length - 1; i > 0; i--) {
    const j = randomInt(i + 1);
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }
  const id = randomUUID(),
    secret = randomBytes(32).toString("base64url"),
    now = Date.now();
  const attempt: MockAttempt = {
    schemaVersion: 1,
    id,
    tokenHash: hash(secret),
    config,
    chapterTitle: chapterTitle(config),
    startedAt: now,
    expiresAt: now + config.durationMinutes * 60000,
    revision: 0,
    questions: pool.slice(0, config.count),
    answers: {},
    result: null,
  };
  try {
    await attemptStore().create(attempt);
  } catch (error) {
    if (error instanceof MockTransitionError)
      throw new HttpError(error.status, error.message);
    throw error;
  }
  return {
    token: `${id}.${secret}`,
    attempt: storageLabel(publicMockAttempt(attempt, now)),
  };
}
export async function accessMock(
  id: string,
  authorization: string | null,
  operation: "read" | "save" | "submit",
  body?: unknown,
) {
  const token = authorization?.match(
    /^Bearer ([0-9a-f-]{36})\.([A-Za-z0-9_-]{43})$/i,
  );
  if (!token || token[1] !== id)
    throw new HttpError(
      401,
      "This guest test cannot be opened without its recovery token. Start a new test if browser data was cleared.",
    );
  try {
    const result = await attemptStore().transaction(id, (attempt) => {
      const candidate = Buffer.from(hash(token[2]), "hex"),
        expected = Buffer.from(attempt.tokenHash, "hex");
      if (
        candidate.length !== expected.length ||
        !timingSafeEqual(candidate, expected)
      )
        throw new HttpError(401, "Guest test token is invalid.");
      return transitionMockAttempt(attempt, Date.now(), operation, body);
    });
    return storageLabel(result);
  } catch (error) {
    if (error instanceof MockTransitionError)
      throw new HttpError(error.status, error.message);
    if ((error as NodeJS.ErrnoException).code === "ENOENT")
      throw new HttpError(
        404,
        "This local test is no longer on this server. You can start a new attempt.",
      );
    throw error;
  }
}
