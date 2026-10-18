import { test } from "node:test";
import assert from "node:assert/strict";
import { readMockBank, mockCatalogFromBank } from "../lib/mock-bank";
import {
  applyMockReviews,
  mockQuestionHash,
  mockReviewDecisionSchema,
  mockOwnerAllowed,
  reviewChecks,
} from "../lib/mock-review";
import { mockAttemptStorageIssue } from "../lib/mock-hosting";
test("approval is bound to exact content, human checklist and owner identity", async () => {
  const q = (await readMockBank()).find(
    (q) => !q.developmentSample && q.verification.status === "draft",
  )!;
  const hash = mockQuestionHash(q),
    owner = "11111111-1111-4111-8111-111111111111";
  const review = {
    question_id: q.id,
    content_hash: hash,
    decision: "approved" as const,
    version: 1,
    reviewer_id: owner,
    reviewed_at: new Date().toISOString(),
    notes: "Independently reviewed fixture only",
  };
  const approved = applyMockReviews([q], [review]);
  assert.equal(approved[0].verification.status, "verified");
  assert.equal(q.verification.status, "draft");
  for (const modified of [
    { ...q, prompt: q.prompt + " edited" },
    { ...q, correct: 9 },
    { ...q, difficulty: "hard" as const },
  ])
    assert.equal(
      applyMockReviews([modified], [review])[0].verification.status,
      "draft",
    );
  assert.equal(
    applyMockReviews([q], [{ ...review, decision: "draft" }])[0].verification
      .status,
    "draft",
  );
  const sample = { ...q, developmentSample: true };
  assert.equal(
    applyMockReviews(
      [sample],
      [{ ...review, content_hash: mockQuestionHash(sample) }],
    )[0].verification.status,
    "draft",
  );
  const input = {
    questionId: q.id,
    contentHash: hash,
    expectedVersion: 0,
    decision: "approved",
    academicReviewed: true,
    checks: Object.fromEntries(reviewChecks.map((key) => [key, true])),
    notes: "Independent academic review completed",
  };
  assert.equal(mockReviewDecisionSchema.safeParse(input).success, true);
  assert.equal(
    mockReviewDecisionSchema.safeParse({ ...input, academicReviewed: false })
      .success,
    false,
  );
  for (const key of reviewChecks)
    assert.equal(
      mockReviewDecisionSchema.safeParse({
        ...input,
        checks: { ...input.checks, [key]: false },
      }).success,
      false,
    );
  assert.equal(mockOwnerAllowed(owner, owner), true);
  assert.equal(mockOwnerAllowed("other", owner), false);
  assert.equal(mockOwnerAllowed(owner, undefined), false);
  assert.equal(mockCatalogFromBank(q, approved).approvedCounts.all, 1);
});
test("Vercel requires durable credentials; /tmp never bypasses the guard", () => {
  assert.ok(
    mockAttemptStorageIssue({
      VERCEL: "1",
      GNOSIS_MOCK_DATA_DIR: "/tmp/private",
    }),
  );
  assert.ok(
    mockAttemptStorageIssue({
      VERCEL: "1",
      NEXT_PUBLIC_SUPABASE_URL: "https://example.supabase.co",
    }),
  );
  assert.equal(
    mockAttemptStorageIssue({
      VERCEL: "1",
      NEXT_PUBLIC_SUPABASE_URL: "https://example.supabase.co",
      SUPABASE_SERVICE_ROLE_KEY: "server-only",
    }),
    null,
  );
});
