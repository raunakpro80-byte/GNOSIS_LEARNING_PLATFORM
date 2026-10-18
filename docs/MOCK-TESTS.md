# Chapter mock tests

Mock tests run locally without sign-in or paid services. No deployment was performed.

## Try the first working chapter

1. Start the app with `pnpm dev` and open `http://127.0.0.1:3000`.
2. In Preferences, choose Class 11 and include Physics. Save your preferences.
3. Open Lectures → Physics → Chapter 2: Motion in a Straight Line → Detailed or One-shot.
4. Click **Chapter mock test** beside the chapter resource buttons, or scroll below the video.
5. Choose a question count, difficulty and duration. Click **Start test**.

Direct chapter URL: `http://127.0.0.1:3000/lectures/physics/2/detailed#chapter-mock-test`.

The content bank retains 40 original development samples and 20 draft Units and Measurements questions. Neither can activate new tests. All 106 chapters reuse the same engine and display actual approved counts. Only academically reviewed and approved real questions may be marked verified, with developmentSample absent or false.

Default: Easy, 10 questions. Select difficulty before question count. Every difficulty remains selectable, with unavailable sizes disabled until enough approved questions exist. The count resets to 10 on a difficulty change. No mixed tests or cross-difficulty filling.

| Difficulty | Questions    | Minutes      |
| ---------- | ------------ | ------------ |
| Easy       | 10           | 10           |
| Medium     | 10 / 20      | 20 / 40      |
| Hard       | 10 / 20 / 30 | 30 / 60 / 90 |

These are GNOSIS practice timings, not official examination timings. The shared policy calculates 1/2/3 minutes per question. The server rejects client timer overrides and unsupported difficulty/count pairs. The obsolete sample opt-in flag no longer bypasses approval.

## Taking and reviewing a test

- A server-created deadline starts immediately using the fixed table above. There is no editable student timer or shortened production timer. Expiration logic is verified with a controlled clock in tests.
- Use numbered question buttons, Previous/Next, Mark for review and Clear response. Review flags do not remove answers.
- Responses autosave after a short debounce. Browser recovery stores the guest token, draft responses, navigation position and review flags. Server snapshots store accepted responses and immutable question versions.
- Submit test opens an inline confirmation. At expiration, the last server-saved responses are graded automatically; new answers received after the deadline cannot change the score.
- Refreshing or leaving a page does not pause the deadline. If the browser is closed, expiration is settled on the next server request. No background worker is claimed.
- Results show marks obtained/available, accuracy, correct/wrong/unattempted counts, time taken, topic-level revision suggestions, source/verification information and detailed answer explanations. Expand each question to review it.
- Accuracy is correct divided by attempted. Unattempted topics are shown as not attempted, not inferred to be weak.
- Retry opens a new test setup. The previous server result is immutable; retry never edits a submitted attempt. Easy results suggest Try Medium; Medium suggests Try Hard; Hard suggests Review mistakes, which opens incorrect responses. Suggestions do not bypass bank availability or lock difficulties.

### Scoring

| Type             | Correct                             | Wrong               | Unattempted |
| ---------------- | ----------------------------------- | ------------------- | ----------- |
| Single correct   | +4                                  | −1                  | 0           |
| Numerical        | +4 within stated absolute tolerance | 0                   | 0           |
| Multiple correct | +4 for the exact correct set        | 0; no partial marks | 0           |

Scores can be negative. These are explicit practice rules, not a claim to reproduce every official examination's marking scheme.

## Architecture and security

- `lib/mock-policy.ts`: exact count/timing table, difficulty descriptions and next-step suggestions.
- `lib/mock-types.ts`: typed questions, chapter identity, attempts, public payloads and results.
- `lib/mock-schema.ts`: strict Zod validation using existing curriculum class/subject/chapter numbering.
- `lib/mock-bank.ts`: server-side bank loading, duplicate-ID checks and verified-only availability.
- `lib/mock-engine.ts`: type-aware response validation, scoring, deadline transitions and public payload projection.
- `lib/mock-storage.ts`: a replaceable `MockAttemptStore` interface and local file adapter. Transactions use per-attempt locks and atomic file replacement.
- `lib/mock-service.ts`: server-only random selection, guest-token validation and attempt orchestration.
- `/api/mock-tests`: availability GET and attempt-creation POST.
- `/api/mock-tests/[id]`: token-protected GET recovery, PATCH response save and POST final submission.
- `components/ChapterMockTest.tsx`: the shared engine UI, mounted below chapter lectures/overviews using the existing curriculum identity.
- `content/mock-questions/*.json`: private server question banks. These files are not public assets or client imports.

Correct answers, explanations and private token hashes are omitted from initial/recovery question payloads. Answers and explanations are disclosed only in a final result. Unknown question IDs, invalid answer types/indices, stale revisions and malformed configuration are rejected. Duplicate submissions return the same result. A server restart preserves attempts if the same private storage directory remains available.

Each browser receives an unguessable bearer recovery token; only its hash is stored server-side. This is guest attempt capability access, not account authentication. Clearing browser data loses that recovery token. A conflicting tab must reload server-saved responses instead of silently overwriting them.

### Storage boundaries

The default server directory is `.gnosis-mock-data/`, ignored by Git and excluded from deployment traces. `GNOSIS_MOCK_DATA_DIR` can point to another private, writable directory. Never place it under `public/`. Browser records use `gnosis:mock:v1:<class>/<subject>/<chapter>` and are separate from existing learning data.

This adapter requires a persistent writable local server. It is **not suitable for the existing Vercel serverless deployment** without a durable store adapter. A future Supabase adapter should implement atomic attempt transactions, ownership/capability checks, immutable grading results, question snapshots and revision checks. No database migration, cloud connection or authentication was added here. Mock attempts do not change legacy lesson completion, quiz history or study-streak rules.

The existing in-process guest start limiter is a local safeguard, not a distributed production rate limiter. Existing videos, PDFs, personal notes and the original Ohm's Law quiz remain separate and unchanged.

## Import more questions

Use `docs/mock-import-example.json` or `docs/mock-import-example.csv` as a template. The example is deliberately a draft and is not served to students.

```powershell
pnpm import:mock --input docs/mock-import-example.json
pnpm import:mock --input docs/mock-import-example.csv
```

These commands validate only. After reviewing actual question content, import explicitly:

```powershell
pnpm import:mock --input "C:/path/to/reviewed-questions.json" --write
```

Imports accept a maximum 5 MB / 2,000 questions per file, validate every chapter against the curriculum, reject duplicate IDs and unknown fields, and never overwrite an existing bank file. CSV supports quoted commas, escaped quotes and multiline fields. JSON inside CSV options/correct fields is parsed as data; no expression is evaluated.

Use `verification.status: "draft"` until the content and key are reviewed. Only `verified` questions are available in tests. Give every question a topic, difficulty, explanation, source and honest verification method. Existing attempts retain their own question snapshot when the bank changes.

Single-correct keys are zero-based option indices. Multiple-correct keys are distinct zero-based indices. Numerical keys are finite numbers with optional nonnegative absolute tolerance; the default is 0.000001. Referenced material requires a source reference. Do not label unreviewed or generated material verified merely to make a test available.

## Verification

Run `pnpm test`, `pnpm typecheck` and `pnpm build`. With a demo server running, run `pnpm test:integration`; use `TEST_BASE_URL` for another port. HTTP tests create disposable guest attempts on the selected server. On Windows, atomic-rename tests require normal filesystem permissions; the restricted tool sandbox blocks rename operations.

For production HTTP QA, use an isolated private fixture bank and attempt directory as described in MOCK-TEST-CONFIGURATION-UPDATE.md. Samples never bypass the active-content gate. CI checks the real-bank unavailable states.

The independent tests cover all six current timing combinations, rejection of mixed tests/client timer overrides, production sample exclusion, the original sample answer key, all 106 chapter identities, public payload stripping, numerical tolerance, mixed-type marking, invalid responses, strict imports, server deadlines, clearing answers, revision conflicts, duplicate submissions and persistent atomic storage.

### Latest local verification

- 28 unit/regression tests passed, including every count/difficulty timing, sample answer keys, deadline expiry, scoring, duplicate submissions and production sample exclusion.
- Both production HTTP integration suites passed; a correct single MCQ plus a wrong single MCQ returned 3/40 and 50% accuracy.
- Standalone TypeScript, formatting checks and the production build passed.
- Browser checks covered Easy/Medium/Hard selection, disabled unavailable lengths, navigation, review flags, clear response, countdown, refresh recovery, submit/cancel, explained results, Try Medium and a chapter with no questions.
- A 390px mobile viewport had no horizontal overflow or sticky-timer overlap. Automatic expiry was verified with a controlled deadline in the isolated disposable QA attempt directory; no application timer override or short-test endpoint was introduced.
- No deployment, authentication change, AI change or full question-bank generation was performed.

Existing guest attempts retain their original question snapshot and deadline. If an earlier result appears in the browser, choose **Retry test** to enter the new Easy/10-question setup. Old results are not rewritten to the new timing table.

## Whole-curriculum availability

All 106 existing Class 11/12 chapters share the same component below chapter overviews and Detailed/One-shot lectures. The existing chapter routes and curriculum IDs are unchanged. `approvedCounts` excludes drafts and development samples; `sampleCounts` and `draftCounts` are separate metadata. The UI shows approved Easy/Medium/Hard counts explicitly, excludes local samples from active tests, and explains unavailable or review-pending combinations.

Run `pnpm report:mock` after bank imports or academic approval to regenerate [the complete chapter availability table](MOCK-TEST-AVAILABILITY.md). The report contains every chapter, approved counts and available question counts without exposing question content. Current real approved counts are zero; Units Batch 1 remains draft, and Motion in a Straight Line remains a development-only sample bank.

Coverage checks render one shared mock section in all 318 chapter/lecture-format combinations, check separate book/notes views, exercise all 106 live availability endpoints, and verify that difficulty-specific sizes unlock only within the chosen chapter and difficulty. No new questions were generated or published during this integration.

Whole-curriculum validation completed: 37 tests passed, including all 318 lecture-format renders and approved-count thresholds. Both production HTTP integration suites passed. All 106 live chapter availability endpoints returned matching curriculum identities and approved counts without question content. Standalone TypeScript, formatting checks and the production build passed. A separate localhost browser profile confirmed Class 12 Biology uses the same section, displays zero approved questions and disables unavailable configurations. No banks were changed or published during this integration.
