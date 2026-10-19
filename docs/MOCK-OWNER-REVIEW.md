# Mock test owner review and durable attempts

This change does not publish questions or change any source JSON. It is not deployed.

## Findings

| Class 11 Physics            |                        Real drafts | Eligible approvals in source |
| --------------------------- | ---------------------------------: | ---------------------------: |
| 1 Units and Measurements    | 90 (40 Easy / 20 Medium / 30 Hard) |                            0 |
| 2 Motion in a Straight Line |                  60 (10 / 20 / 30) |                            0 |
| 3 Motion in a Plane         |                  60 (10 / 20 / 30) |                            0 |
| 4 Laws of Motion            |                  60 (10 / 20 / 30) |                            0 |

Chapter 2 also has 40 development samples. These remain excluded, even if their legacy status says verified. All nine bank files are unchanged. Existing reports are advisory checks, not academic approval. Chapter 2 flags 49 records, Chapter 3 flags 45, and Chapter 4 flags 34; Chapter 1's curated records still need independent academic review. Review flags include difficulty misclassification, near duplicates and missing motion/friction assumptions. No blanket approval is justified.

The existing Vercel project Environment Variables page was inspected on 2026-10-18 and showed **No Environment Variables Added**. Locally only `.env.example` exists; no Supabase credentials were present in the shell. A real Supabase connection and database migration have therefore NOT been verified.

## One-time configuration (owner)

Use your existing Supabase project if you have one. No new paid service is required by this implementation.

1. In Supabase SQL Editor, apply `supabase/001_schema.sql` **only if the existing GNOSIS schema has never been installed**. Do not rerun or reset an existing schema. Then apply the new `supabase/002_mock_tests.sql` once. It adds only mock tables and one service-only review function; it leaves existing auth, lessons and learning state intact.
2. Use an existing Supabase Auth account for the owner, or create/confirm your own account in Supabase Authentication. Copy that account's **User UID**, not its email or GitHub ID. The existing `/signin` email/password form is reused. No administrator role or change to existing auth code is required.
3. In local `.env.local` (never Git), and later in **the existing** Vercel project → Settings → Environment Variables, configure:

   | Variable                        | Value / visibility                                                                |
   | ------------------------------- | --------------------------------------------------------------------------------- |
   | `NEXT_PUBLIC_SUPABASE_URL`      | Existing Supabase project URL                                                     |
   | `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Project public anon / publishable key, used by existing sign-in                   |
   | `SUPABASE_SERVICE_ROLE_KEY`     | Matching project's legacy service-role key; **server only**, never `NEXT_PUBLIC_` |
   | `GNOSIS_MOCK_OWNER_ID`          | Your Supabase Auth user UUID; **server only**                                     |

   Set these for the intended environment. Public Next.js variables require a new build; restart locally after changing configuration. Production changes require your separate merge/deploy approval. Never paste secret values into a PR, question form or chat.

4. Check RLS in Supabase: `mock_attempts`, `mock_question_reviews`, `mock_review_audit` have RLS enabled and no anon/authenticated access. `record_mock_review` is executable by `service_role` only. An anon or signed-in browser must not be able to read tables or invoke that function directly. The server verifies the owner via `auth.getUser` and exact configured UID before using the service key.
5. Run the real-database smoke checks below in a staging project before production approval. Missing tables, credentials or connectivity fail closed with a setup error; Vercel never falls back to `/tmp` attempts.

## Shortest safe review process

1. Sign in at `/signin` with the configured owner account.
2. Open `/mock-tests/owner-review`, choose a chapter and click **Refresh access and reviews** if needed.
3. For each question, independently check the answer, full solution, units, difficulty, uniqueness and wording. Read the existing report and resolve its concerns. Obtain qualified Physics review if you cannot confidently validate it.
4. Check the six items and the qualified human review declaration; add concise notes explaining any flagged issue's resolution. Click **Approve this reviewed question**, then **Next question**. Use **Keep / return to draft** or **Reject for publication** for unresolved records. No bulk approval shortcut is provided.
5. Reload the public chapter page. Approvals immediately count only for the exact approved content. Easy needs 10 approvals; Medium needs 10 or 20; Hard needs 10, 20 or 30. Timers remain 1/2/3 minutes per question respectively. Nothing is filled from another difficulty.

Approving a question is a publication decision. The owner must actually perform or obtain academic review; a checkbox or automated test does not supply that review. Proposed corrections in reports are not silently applied. To correct a question later, use a separately reviewed content change; its changed hash invalidates the old approval. Existing verified source content is protected from this draft-review interface.

## Persistence and security

- Attempts use Supabase when URL and server service-role key are configured. On local unconfigured development only, the original private file adapter remains available. No production fallback occurs on a database error.
- Browser requests carry an unguessable guest capability; only its hash is stored. The server stores question/answer snapshots, authoritative deadlines, revisions and immutable submitted results. Active responses never include answer keys or explanations.
- Compare-and-swap database versions prevent competing Vercel instances from overwriting responses. Stale writes return 409; expired or duplicate submissions return the original final result. Read/save callbacks have no external side effects.
- Keep browser recovery data: Supabase persistence does **not** provide account synchronization or recovery after the private guest token is lost. Sharing a chapter URL does not share an attempt.
- Existing local attempt files are preserved but are not automatically migrated into Supabase. Finish older local attempts before switching that local server's storage configuration. Production previously refused file-backed attempts, so there is no claimed Vercel file-store migration.
- Decisions have reviewer UID, timestamp, content hash, notes, checklist and append-only audit events. Atomic review version checks prevent stale review overwrites. Question JSON remains untouched.
- Review HTML has no draft data. Private API successes and failures use `private, no-store`, `Vary: Authorization`; bearer-only authentication prevents cookie-based CSRF. Neither query parameters nor owner headers grant access.
- Existing process-local rate limits are best effort, not a distributed abuse limiter. Guest result retention is currently indefinite; configure an explicit retention policy before significant public use. Expiry is finalized on the next attempt request if a browser was closed; no background cron is claimed.

## Checks and manual test

Run `pnpm test`, `pnpm typecheck`, `pnpm report`, `pnpm build`, then `pnpm test:mock:durable`.
If pnpm asks to purge dependencies in a noninteractive environment, set `pnpm_config_verify_deps_before_run=false` for that run; do not delete dependencies.

The durable HTTP test launches a private production Next server and a **local Supabase protocol fixture**, with isolated draft snapshots under ignored `tmp/`. Fixture approvals never reach the real database or source bank. It tests real routes, server auth lookup, owner/non-owner denial, content/checklist gates, audit/version checks, all six timers, exact difficulty pools, hidden answers, saved-response resume, concurrent writes, expiry, scoring, duplicate submission and database failure. It does **not** prove real Supabase connectivity or SQL/RLS behavior.

For a real staging database: apply the migration and settings, sign in as owner, inspect one draft and save a draft/reject review; verify the audit row. In a separate staging fixture bank, approve enough reviewed fixtures and test start → select → save → refresh → submit → result → retry. Restart the server and reopen a saved attempt with its existing private browser token. Verify a signed-out and a different account cannot preview drafts, and anon/authenticated direct table/RPC calls are denied. Check desktop and mobile layouts manually. Do not approve production questions for technical testing.

Public routes remain `/mock-tests/class-11/physics` and `/mock-tests/class-11/physics/chapter-1` through `chapter-4`.

The PR branch `owner-review-supabase` has automatic Vercel deployment disabled in `vercel.json`. This branch-specific guard preserves the existing main deployment behavior. No merge or deployment is authorized by this PR.

## Verification evidence (2026-10-18)

- 84 unit/regression tests passed; source-bank SHA-256 preservation checks passed.
- 8 durable production HTTP fixture tests passed (7 scenarios plus parent test), including owner denial, human-review gates, six configurations, save/resume, concurrency, expiry and database outage.
- 3 existing production HTTP regressions passed for public content, private endpoints and public chapter routes.
- `pnpm typecheck`, `pnpm report` (106 chapters) and `pnpm build` passed.
- Browser inspection of the signed-out owner route confirmed the access error and no draft data. The full authenticated owner UI and real Supabase SQL/RLS still need staging verification after configuration; they are not claimed as live verified.
- No configured lint command exists. Changed TypeScript/TSX/CSS/JSON/Markdown files were formatted with Prettier; `git diff --check` passed.
