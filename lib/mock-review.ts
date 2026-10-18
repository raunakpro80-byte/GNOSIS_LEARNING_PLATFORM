import { createHash } from "node:crypto";
import { z } from "zod";
import type { MockQuestion } from "./mock-types";

export const reviewChecks = [
  "answer",
  "solution",
  "units",
  "difficulty",
  "uniqueness",
  "wording",
] as const;
export const mockReviewDecisionSchema = z
  .object({
    questionId: z.string().min(1).max(80),
    contentHash: z.string().regex(/^[a-f0-9]{64}$/),
    expectedVersion: z.number().int().nonnegative(),
    decision: z.enum(["approved", "rejected", "draft"]),
    academicReviewed: z.boolean(),
    checks: z
      .object({
        answer: z.boolean(),
        solution: z.boolean(),
        units: z.boolean(),
        difficulty: z.boolean(),
        uniqueness: z.boolean(),
        wording: z.boolean(),
      })
      .strict(),
    notes: z.string().trim().min(10).max(4000),
  })
  .strict()
  .superRefine((input, context) => {
    if (
      input.decision === "approved" &&
      (!input.academicReviewed ||
        reviewChecks.some((key) => !input.checks[key]))
    )
      context.addIssue({
        code: "custom",
        message:
          "Approval requires completed independent academic review and every checklist item.",
      });
  });
export type MockReviewDecision = z.infer<typeof mockReviewDecisionSchema>;
export type MockReviewRecord = {
  question_id: string;
  content_hash: string;
  decision: "approved" | "rejected" | "draft";
  version: number;
  reviewer_id: string;
  reviewed_at: string;
  notes: string;
};
// Hash the complete validated record. Any content/status change invalidates approval.
export function mockQuestionHash(question: MockQuestion) {
  return createHash("sha256").update(JSON.stringify(question)).digest("hex");
}
export function applyMockReviews(
  bank: MockQuestion[],
  reviews: MockReviewRecord[],
) {
  const byId = new Map(reviews.map((record) => [record.question_id, record]));
  return bank.map((question) => {
    // Existing academically verified source records are never overwritten by this workflow.
    if (
      question.developmentSample ||
      question.verification.status === "verified"
    )
      return question;
    const review = byId.get(question.id);
    if (
      review?.decision !== "approved" ||
      review.content_hash !== mockQuestionHash(question)
    )
      return question;
    return {
      ...question,
      verification: {
        status: "verified" as const,
        method: `Owner academic review ${review.reviewed_at}; reviewer ${review.reviewer_id}; content SHA-256 ${review.content_hash}`,
      },
    };
  });
}

export function mockOwnerAllowed(
  actualUserId: string,
  configuredOwnerId: string | undefined,
) {
  return (
    !!configuredOwnerId &&
    /^[0-9a-f-]{36}$/i.test(configuredOwnerId) &&
    actualUserId === configuredOwnerId
  );
}
