import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import type { MockAttemptStore } from "./mock-storage";
import type { MockAttempt } from "./mock-types";
import type { MockReviewRecord } from "./mock-review";
import { MockTransitionError } from "./mock-engine";

export function mockDatabaseConfigured(
  env: Readonly<Record<string, string | undefined>> = process.env,
) {
  return !!(env.NEXT_PUBLIC_SUPABASE_URL && env.SUPABASE_SERVICE_ROLE_KEY);
}
export function mockDatabase() {
  if (!mockDatabaseConfigured())
    throw new MockTransitionError(
      503,
      "Mock storage setup is incomplete. Configure NEXT_PUBLIC_SUPABASE_URL and server-only SUPABASE_SERVICE_ROLE_KEY, then apply supabase/002_mock_tests.sql.",
    );
  try {
    return createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
      { auth: { persistSession: false, autoRefreshToken: false } },
    );
  } catch {
    throw mockDatabaseFailure();
  }
}
export function mockDatabaseFailure() {
  return new MockTransitionError(
    503,
    "Mock database is unavailable. Check Supabase credentials and apply supabase/002_mock_tests.sql. The save could not be confirmed; reload the saved state before retrying.",
  );
}
export async function readMockReviews(
  db = mockDatabase(),
): Promise<MockReviewRecord[]> {
  // Explicit paging avoids Supabase's default 1,000-row limit as the bank grows.
  const rows: MockReviewRecord[] = [];
  for (let offset = 0; ; offset += 500) {
    const { data, error } = await db
      .from("mock_question_reviews")
      .select(
        "question_id,content_hash,decision,version,reviewer_id,reviewed_at,notes",
      )
      .order("question_id")
      .range(offset, offset + 499);
    if (error || !data) throw mockDatabaseFailure();
    rows.push(...(data as MockReviewRecord[]));
    if (data.length < 500) return rows;
  }
}

export class SupabaseMockAttemptStore implements MockAttemptStore {
  constructor(private db: SupabaseClient = mockDatabase()) {}
  async create(attempt: MockAttempt) {
    const { error } = await this.db
      .from("mock_attempts")
      .insert({ id: attempt.id, version: 0, payload: attempt });
    if (error) throw mockDatabaseFailure();
  }
  async transaction<T>(
    id: string,
    operation: (attempt: MockAttempt) => T | Promise<T>,
  ): Promise<T> {
    // Optimistic compare-and-swap gives each operation a cross-instance atomic commit.
    // Callbacks must only mutate this snapshot, never perform external side effects.
    for (let retry = 0; retry < 12; retry++) {
      const { data: row, error } = await this.db
        .from("mock_attempts")
        .select("version,payload")
        .eq("id", id)
        .maybeSingle();
      if (error) throw mockDatabaseFailure();
      if (!row)
        throw new MockTransitionError(
          404,
          "This test could not be found. Start a new attempt.",
        );
      const attempt = row.payload as MockAttempt;
      if (attempt.schemaVersion !== 1 || attempt.id !== id)
        throw mockDatabaseFailure();
      const before = JSON.stringify(attempt);
      const result = await operation(attempt);
      if (JSON.stringify(attempt) === before) return result;
      const { data: committed, error: updateError } = await this.db
        .from("mock_attempts")
        .update({ payload: attempt, version: row.version + 1 })
        .eq("id", id)
        .eq("version", row.version)
        .select("id");
      if (updateError) throw mockDatabaseFailure();
      if (committed?.length === 1) return result;
    }
    throw new MockTransitionError(
      409,
      "Another tab is updating this test. Reload the saved responses and try again.",
    );
  }
}
