# Physics Practice Preview

Database-free practice on the existing public Class 11 Physics chapter pages, Chapters 1–4. No Supabase settings, migration, account or paid service is required. PR #1 remains separate and unmerged.

Every preview displays **Practice Preview — Questions Pending Academic Review**. It reads only existing real drafts: Chapter 1 has 90 (40 Easy / 20 Medium / 30 Hard), Chapters 2–4 have 60 each (10 / 20 / 30). Development samples are excluded. No question JSON or verification status changes. Existing academic concerns in the review reports remain unresolved; content is not an official or academically approved examination bank.

The shared existing test interface is reused. Preview is the default on public Physics chapter pages; **Approved mock tests** opens the original verified-only workflow. Lectures and all other subjects continue using the original engine unchanged.

Six configurations: Easy 10/10 minutes; Medium 10/20 or 20/40; Hard 10/30, 20/60 or 30/90. Chapter and difficulty are never mixed. Server start shuffles without repeated IDs and returns no correct answers or explanations. `/api/mock-practice/submit` independently loads the selected question IDs from the existing bank, validates class/chapter/difficulty/count and content hash, and uses the existing server grader (+4 correct, −1 wrong, 0 blank for single-correct). It never trusts a client-supplied answer key or solution.

Attempts, responses, palette position, marked questions and results are stored in localStorage, separately from approved attempts. A memory fallback permits the current tab to continue if storage is blocked, with a visible recovery warning. Clearing browser data or changing devices loses recovery. Network is needed to start or grade; saved responses can be resumed offline while the timer runs. If grading fails, reconnect and retry; expiry also retries on returning online. Ordinary refresh preserves the deadline and responses. A completed result is reused locally rather than silently restarting the attempt. A retry starts a new attempt.

## Honest security limits

This is **practice only**, not cheating-resistant or exam-grade persistence. A database-free, unsigned browser manifest can be edited by a technically skilled user; local deadlines, saved answers and scores cannot be made authoritative. The random local session token only identifies browser recovery and is not a server-authenticated exam capability. A user can deliberately submit early to reveal solutions. The UI hides solutions until submission, and grading keys remain server-side before that point.

There is no durable server attempt store, account sync, proctoring or tamper-proof duplicate submission guarantee. Multi-tab revision checks are best effort in localStorage, not atomic database locks. Existing process-local rate limits remain best effort. If source questions change during an attempt, grading rejects a changed content hash and asks for a fresh preview instead of guessing a result. Unreviewed questions and difficulty labels may have academic issues; do not use preview results as certified assessment.

## Check locally

Run `pnpm test`, `pnpm typecheck`, `pnpm build`; then run the existing HTTP integration checks against a local production server. Additional `tests/mock-practice.test.ts` checks all 24 chapter/configuration combinations, exact difficulty pools, scoring, missing/mixed/duplicate records, source hashes, expiry, browser storage, refresh, clear response, failed-submit retry, result recovery and new attempts. These browser transport tests use isolated memory storage and server grading fixtures, never approve real questions.

Open `/mock-tests/class-11/physics/chapter-1` through `chapter-4`. Select difficulty and count, verify the duration, Start Practice Preview, select answers, Next/Previous, palette, Mark for review, Clear response, refresh, submit and inspect explanations. Repeat on mobile. The permanent preview disclosure must stay visible. Approved mock tests must still show zero eligible approved questions until actual review occurs.

## Verification

Before publication: 86 unit/regression tests passed, TypeScript passed, the production build passed, and the availability report passed. Three existing production HTTP integration tests passed. A separate production HTTP test passed all 24 chapter/difficulty/count configurations and server-scored results. Browser checks at desktop size and 390 × 844 confirmed selection, Next/Previous, review marking, clear response, palette, refresh recovery, countdown, confirmation, results, expanded explanations and retry/difficulty selection. Mobile document width stayed within the viewport. All nine source bank SHA-256 hashes match the prior checkpoint. A fresh Windows worktree initially converted line endings; restoring the unmodified Git blob bytes resolved those preservation-test failures without changing any question content.
