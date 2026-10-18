# GNOSIS mock test verification — 18 October 2026

> Historical snapshot before the subsequent configuration update. Current allowed counts, timings, sample exclusion and manual instructions are in [the configuration update](MOCK-TEST-CONFIGURATION-UPDATE.md). The old configuration and sample-enabled browser instructions below no longer describe new tests.

## Outcome and scope

The reusable engine passed the automated checks below against a local production build. It is integrated with all 106 existing curriculum chapters. This is an engine verification, not academic approval or a claim that all chapters have usable question banks. No push or deployment was performed.

Actual content: 20 Easy Units and Measurements questions remain drafts. Motion in a Straight Line has 40 explicitly marked development samples (20 Easy, 10 Medium, 10 Hard). There are **zero approved non-sample questions** in the current curriculum. Production excludes development samples unless explicitly enabled for QA. The complete chapter inventory is in `MOCK-TEST-AVAILABILITY.md`.

## Verification matrix

| Requirement                 | Evidence and outcome                                                                                                                                                                                                              | Limit                                                                                                                                                                             |
| --------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Correct chapter integration | PASS: 106 curriculum identities; 318 server-rendered overview/detailed/one-shot cases each contain exactly one shared mock section after lecture content. Production catalog requests checked all 106 chapter identities.         | Not 318 individually clicked browser journeys.                                                                                                                                    |
| Difficulty isolation        | PASS: nine production HTTP start/submit combinations contain only the selected difficulty. Mixed selection is rejected by schema.                                                                                                 | Larger configurations use private synthetic QA fixtures.                                                                                                                          |
| 20/30/40 questions          | PASS: exact counts, unique IDs and prompts in all nine HTTP cases; insufficient combinations cannot start.                                                                                                                        | Real content currently enables only development Easy/20 for Motion in a Straight Line.                                                                                            |
| Nine timers                 | PASS: server deadlines equal the table below; client duration overrides rejected. Browser showed Medium/40 = 70 and Hard/40 = 100 minutes.                                                                                        | These are GNOSIS practice timings.                                                                                                                                                |
| No repeated question        | PASS: random selection without replacement and exact ID/prompt uniqueness assertions. Bank import rejects duplicate IDs.                                                                                                          | Semantic similarity still needs editorial review of future banks.                                                                                                                 |
| Rendering and notation      | PASS within scope: question/options and Unicode/caret notation visibly rendered in mobile browser; responsive setup, running and result views inspected at 390/768/1180 widths.                                                   | Plain text/Unicode only; no LaTeX or diagram renderer.                                                                                                                            |
| Server scoring              | PASS: MCQ +4/-1/0, exact-set multiple correct, numerical tolerance, blank and invalid responses checked. HTTP cases and browser result: one correct + one wrong = 3 marks, 50% accuracy.                                          | Does not establish academic approval of question content.                                                                                                                         |
| Hidden answer keys          | PASS: active API and catalog payload assertions exclude correct answers, explanations and token hashes. Server-only bank loading reviewed.                                                                                        | Question source JSON contains answers in the repository by design; this is not protection from someone reading source.                                                            |
| Refresh/resume              | PASS: browser retained two responses, review flag, current question and continuing deadline. Saved result survived an actual production-server restart.                                                                           | Browser capability token and private server files must both survive.                                                                                                              |
| Expiry and submission       | PASS: controlled private QA deadline produced automatic expired result; late responses ignored; last saved answers graded; concurrent and duplicate submissions immutable. Browser submit confirmation/Keep working also checked. | Deadline shortened only in private fixture storage; did not wait 100 minutes. Closed browsers settle on the next request.                                                         |
| Explanations                | PASS for structure, post-submission disclosure and computational checks on existing 40 sample answer keys and 20 draft formulas/options.                                                                                          | Independent subject-expert review of explanations and difficulty labels is still pending. Do not publish drafts as approved.                                                      |
| Guest safety                | PASS: random capability tokens, stored hashes, invalid bearer/foreign question/invalid option rejection, revision conflict 409, no-store and Authorization variance, private file adapter and locks checked.                      | Local disk persistence; no cloud/account recovery or distributed rate limiting.                                                                                                   |
| Desktop/mobile              | PASS within scope: native browser actions, question navigation, answers, clear, review, refresh, results and viewport checks. No horizontal content overflow in measured iframe widths.                                           | Desktop Chromium/IAB with resized frames, not physical devices or Safari. The existing floating theme switch can cover content near the viewport edge; scroll to expose controls. |
| Existing functionality      | PASS within regression scope: learning/streak tests, legacy quiz, resource mapping and PDF HTTP delivery; books/notes render independently and shared component wiring preserved.                                                 | External YouTube streaming and live Supabase/AI services were not comprehensively retested.                                                                                       |
| Invalid/insufficient banks  | PASS: empty bank returns zero and rejects start; malformed bank returns clear 503 without private validation details. Browser can resume a saved snapshot while availability is unavailable.                                      | A malformed bank fails the whole catalog closed until fixed.                                                                                                                      |

| Questions | Easy   | Medium | Hard    |
| --------- | ------ | ------ | ------- |
| 20        | 20 min | 35 min | 50 min  |
| 30        | 30 min | 50 min | 75 min  |
| 40        | 40 min | 70 min | 100 min |

## Checks executed

- TypeScript: `tsc --noEmit --incremental false` passed.
- Unit/regression suite: **38 passed, 0 failed**.
- Existing production HTTP integration suite: **2 passed, 0 failed**.
- Production HTTP configuration/security/recovery matrix: **13 passed, 0 failed**.
- Production build: `next build --webpack` passed.
- Formatting and `git diff --check`: passed for reviewed changes.
- ESLint: unavailable; no lint script/configuration or ESLint package exists. Formatting is not a substitute for lint.

The first matrix run failed nine assertions because the test incorrectly required `Vary` to equal only `Authorization`; Next.js also supplies its framework headers. The assertion was corrected to require membership of `Authorization`; final 13/13 passed. This was a test expectation error, not missing authorization variance. A one-off expiry helper initially used a nonexistent status field; it was corrected to select attempts with a null result before the browser expiry check. Neither issue changed application timing or scoring.

## Fix made during review

Added a typed safe bank-unavailable error and a clear HTTP 503. The client now keeps catalog availability failures separate from attempt recovery, so malformed new content cannot prevent an existing server-saved snapshot from resuming. New attempts remain unavailable until content validates. No authentication, AI Tutor, dashboard, homepage, resource files or lecture playback code was changed in this verification fix.

## Reproducing the larger QA matrix

Use `pnpm prepare:mock:qa --directory tmp/a-new-unique-qa-folder`. The helper refuses to overwrite a directory and creates only private ignored synthetic fixtures and copies of existing banks. These technical fixtures are explicitly development samples, not real academic content.

Build, then start a separate production server on port 3004 with `GNOSIS_ENABLE_SAMPLE_MOCKS=true`, `GNOSIS_MOCK_BANK_DIR=tmp/a-new-unique-qa-folder/banks` and `GNOSIS_MOCK_DATA_DIR=tmp/a-new-unique-qa-folder/attempts`. Run `pnpm test:mock:matrix` with `MOCK_QA_DIR=tmp/a-new-unique-qa-folder` and `MOCK_MATRIX_BASE_URL=http://127.0.0.1:3004`. Keep this separate from the normal local server and student data. The matrix intentionally corrupts/restores only its own private fixture and manipulates only fixture attempt deadlines.

## Beginner browser check

1. Open a terminal in the project folder and run `pnpm dev` if the local server is not already running.
2. Open `http://127.0.0.1:3000`, select Class 11 and Physics in Preferences, then save.
3. Open `http://127.0.0.1:3000/lectures/physics/2/detailed#chapter-mock-test` (Motion in a Straight Line). Scroll below the lecture if necessary.
4. Read the development-sample notice. Select Easy and 20 questions. The duration should be 20 minutes. If an old result appears, use Retry test.
5. Start; answer a question, mark it for review, use Next/Previous and the number palette, and try Clear response.
6. Refresh. Responses, review status, current question and the original deadline should return. The timer must not restart.
7. Use Submit test, test Keep working, then confirm submission. Inspect marks, accuracy, counts, topics and expanded solutions. Retry returns to configuration.
8. Medium/Hard and 30/40 are unavailable with the actual sample counts. Units and Measurements remains unavailable because its questions are drafts. Other empty chapters should display a clear coming-soon state. Do not change verification flags just to enable them.

## Remaining limitations before public production use

Academic approval and real chapter banks are pending. The file store needs a durable transactional database adapter for serverless/distributed hosting; the current local folder does not claim Vercel/cloud persistence. Lost browser tokens have no account recovery. Offline late answers are not accepted after expiry. Local rate limiting is not distributed. No independent security penetration test, accessibility audit, real-device matrix or full external-service regression was performed.

The safe local commit excludes environment secrets, private attempts/tokens, generated Next files, dependencies, build outputs, QA fixture data and the temporary responsive harness. Existing backup references are preserved. No GitHub push or Vercel deployment is authorized by this verification task.
