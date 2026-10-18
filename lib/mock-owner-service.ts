import "server-only";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { HttpError, identity } from "./server";
import { readMockBank, MockBankUnavailableError } from "./mock-bank";
import {
  mockDatabase,
  mockDatabaseFailure,
  readMockReviews,
} from "./mock-database";
import {
  mockOwnerAllowed,
  mockQuestionHash,
  mockReviewDecisionSchema,
} from "./mock-review";
import { MockTransitionError } from "./mock-engine";

export async function requireMockOwner(request: Request) {
  const { userId } = await identity(request);
  if (!process.env.GNOSIS_MOCK_OWNER_ID)
    throw new HttpError(
      503,
      "Owner review is not configured. Set server-only GNOSIS_MOCK_OWNER_ID to your Supabase Auth user UUID.",
    );
  if (!mockOwnerAllowed(userId, process.env.GNOSIS_MOCK_OWNER_ID))
    throw new HttpError(
      403,
      "Only the configured GNOSIS question-bank owner can review drafts.",
    );
  return userId;
}
export async function mockOwnerPreview(chapter: number, offset: number) {
  const bank = (await readMockBank()).filter(
    (q) =>
      q.className === "11" &&
      q.subject === "physics" &&
      q.chapter === chapter &&
      !q.developmentSample,
  );
  const reviews = new Map(
    (await readMockReviews()).map((row) => [row.question_id, row]),
  );
  const reportName =
    chapter === 1
      ? "11-physics-1-curation.json"
      : `11-physics-${chapter}-import-review.json`;
  // A missing report is a visible review concern; it never constitutes approval.
  let report: { questions?: { id: string }[] } | null = null;
  try {
    report = JSON.parse(
      await readFile(
        path.join(process.cwd(), "docs/question-banks", reportName),
        "utf8",
      ),
    );
  } catch {
    /* surfaced below */
  }
  return {
    total: bank.length,
    offset,
    chapter,
    items: bank.slice(offset, offset + 20).map((question) => ({
      question,
      contentHash: mockQuestionHash(question),
      review: reviews.get(question.id) ?? null,
      findings: report?.questions?.find((item) => item.id === question.id) ?? {
        concern:
          "No question-specific report found. Independently review the complete record before approval.",
      },
    })),
  };
}
export async function saveMockOwnerReview(raw: unknown, userId: string) {
  const input = mockReviewDecisionSchema.parse(raw);
  const question = (await readMockBank()).find(
    (q) =>
      q.id === input.questionId &&
      q.className === "11" &&
      q.subject === "physics" &&
      q.chapter >= 1 &&
      q.chapter <= 4,
  );
  if (!question)
    throw new HttpError(
      404,
      "Question not found in Class 11 Physics Chapters 1–4.",
    );
  if (question.developmentSample || question.verification.status !== "draft")
    throw new HttpError(
      409,
      "This workflow only reviews real drafts; existing verified content and development samples are protected.",
    );
  if (input.contentHash !== mockQuestionHash(question))
    throw new HttpError(
      409,
      "Question content changed. Reload and review the current version.",
    );
  const { error } = await mockDatabase().rpc("record_mock_review", {
    p_question_id: question.id,
    p_content_hash: input.contentHash,
    p_decision: input.decision,
    p_expected_version: input.expectedVersion,
    p_reviewer_id: userId,
    p_notes: input.notes,
    p_checklist: { ...input.checks, academicReviewed: input.academicReviewed },
  });
  if (error?.code === "40001")
    throw new HttpError(
      409,
      "Another review was saved. Reload before changing this decision.",
    );
  if (error) throw mockDatabaseFailure();
  return { saved: true, decision: input.decision };
}
export function mockOwnerFailure(error: unknown) {
  if (error instanceof MockBankUnavailableError)
    return new HttpError(503, error.message);
  return error instanceof MockTransitionError
    ? new HttpError(error.status, error.message)
    : error;
}
