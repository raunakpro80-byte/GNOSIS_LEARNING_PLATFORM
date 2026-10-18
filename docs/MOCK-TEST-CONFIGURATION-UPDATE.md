# Mock test configuration update

This replaces the previous fixed 20/30/40 policy. Existing chapter routes, question banks and test components are reused. No question content, authentication or AI Tutor was changed. No deployment or push was performed.

| Difficulty | Questions | Automatic duration |
| ---------- | --------: | -----------------: |
| Easy       |        10 |         10 minutes |
| Medium     |        10 |         20 minutes |
| Medium     |        20 |         40 minutes |
| Hard       |        10 |         30 minutes |
| Hard       |        20 |         60 minutes |
| Hard       |        30 |         90 minutes |

The request's table contains six configurations; all six were tested. These are GNOSIS practice timings, not official examination timings. Easy remains the default, with 10 questions. A difficulty change resets the size to 10, removes unsupported sizes and recalculates the duration before starting. All difficulty choices remain unlocked.

## Approval and persistence

New tests select only questions with `verification.status = verified` and no development-sample flag. Reviewers must set this status honestly after academic approval; the software cannot independently establish academic correctness. Drafts and development samples are excluded in development and production, even if the obsolete sample opt-in environment flag remains set. No bank was promoted or published.

Current approved counts remain zero. The retained Motion in a Straight Line samples and Units and Measurements drafts cannot enable new tests. Sizes are disabled with the actual approved count displayed; there is no fallback to another difficulty. See the regenerated `MOCK-TEST-AVAILABILITY.md` for all 106 chapters.

Earlier saved attempts/results retain their original snapshots and deadlines, including old sample results. Retry uses the new allowed policy and approval gate. Existing records are not rewritten or discarded. Attempts still use a private local server file store, not durable cloud persistence.

## Verification performed

- TypeScript passed; production build passed.
- 38 unit/regression tests passed, including the six timing pairs, unsupported pairs, server timer override rejection, exact-difficulty approved-count boundaries, sample exclusion, scoring, recovery, expiry and existing learning/streak behavior. The final expanded policy and curriculum subset was rerun: 14 passed.
- Updated production HTTP matrix: 10 passed (six configuration cases plus guest security/concurrency, expiry, malformed-bank recovery and empty-bank handling). Every configuration checked exact question count, difficulty isolation, unique IDs/prompts, hidden answer keys, deadlines and +4/-1/0 scoring.
- Existing/real-bank HTTP integration: 2 passed, covering previous API behavior plus rejection of unapproved/obsolete configurations.
- Browser: actual local app showed Easy 10/10 minutes, Medium 10/20 minutes with 10/20 sizes, Hard 10/30 minutes with 10/20/30 sizes, zero-approved availability and disabled Start. Isolated fixture browser checks showed Medium 20/40 minutes, Hard 30/90 minutes, and Hard-to-Easy resetting 30 to 10 and removing unsupported options.
- Formatting checks passed for changed source/tests/docs; no ESLint setup exists.

The first build attempt hit Windows sandbox `EPERM` replacing generated `.next` content; the rerun with normal filesystem access passed. Initial HTTP runs hit sandbox networking errors before reaching the app; both suites passed against accessible local preview servers. No application failures remained in the final runs.

The larger matrix uses synthetic technical fixtures in ignored `tmp/` storage. Their verified status simulates the approval gate solely in the isolated test bank; this is not academic approval. They were not written into the real banks, served on the normal port 3000, or published. Independent academic review and real-device testing remain outside this configuration update.

## Manual browser checks

1. If needed, run `pnpm dev` in the project folder and open `http://127.0.0.1:3000`.
2. Select Class 11 and Physics in Preferences and save.
3. Open `http://127.0.0.1:3000/lectures/physics/3/detailed#chapter-mock-test` and scroll below the lecture. This route avoids replacing any earlier Chapter 2 test result.
4. Easy should show only 10 questions and 10 minutes. Change to Medium: 10/20 options, with 10 questions showing 20 minutes. Change to Hard: 10/20/30 options, with 10 showing 30 minutes.
5. Current approved counts are zero, so sizes and Start are unavailable. This is intentional. Do not relabel drafts/samples to enable them.
6. After academically approved questions are imported, sizes enable only at their exact-difficulty thresholds. Select Medium 20 to see 40 minutes, Hard 20 to see 60, or Hard 30 to see 90. Start, answer, review, clear, navigate, refresh and submit; solutions remain hidden until submission. Single-correct scoring remains +4/-1/0.

## Reproduce the isolated complete matrix

Prepare a new unique directory:

```powershell
pnpm prepare:mock:qa --directory tmp/my-new-policy-qa
pnpm build
$env:GNOSIS_MOCK_BANK_DIR = 'tmp/my-new-policy-qa/banks'
$env:GNOSIS_MOCK_DATA_DIR = 'tmp/my-new-policy-qa/attempts'
pnpm exec next start -H 127.0.0.1 -p 3004
```

In a second terminal in the project folder:

```powershell
$env:MOCK_QA_DIR = 'tmp/my-new-policy-qa'
$env:MOCK_MATRIX_BASE_URL = 'http://127.0.0.1:3004'
pnpm test:mock:matrix
```

Keep fixtures private. Stop that isolated server after testing. Normal development should run without these fixture environment variables; open a fresh terminal for `pnpm dev`.
