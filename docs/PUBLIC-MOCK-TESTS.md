# Public Class 11 Physics mock tests â€” local readiness

The five public routes are implemented locally. **No push or deployment has been performed. There is no newly verified live URL.**

| Chapter                   | Real imported/practice drafts | Academically approved eligible | Active configurations | Route                                    |
| ------------------------- | ----------------------------: | -----------------------------: | --------------------: | ---------------------------------------- |
| Units and Measurements    |                            90 |                              0 |                     0 | `/mock-tests/class-11/physics/chapter-1` |
| Motion in a Straight Line |                            60 |                              0 |                     0 | `/mock-tests/class-11/physics/chapter-2` |
| Motion in a Plane         |                            60 |                              0 |                     0 | `/mock-tests/class-11/physics/chapter-3` |
| Laws of Motion            |                            60 |                              0 |                     0 | `/mock-tests/class-11/physics/chapter-4` |

Index: `/mock-tests/class-11/physics`. Chapter 2 also has40 preserved development samples with a legacy verified flag; these are deliberately ineligible. Total:270 drafts and40 samples,310 records. All Easy/Medium/Hard levels remain blocked by missing academic approval. Existing record-level reports are in `docs/question-banks/11-physics-{1,2,3,4}-*review*`; Chapter1's latest report is `11-physics-1-curation-review.md`.

## Implemented behavior

- Native Next.js routes serve the shared GNOSIS shell and mock test component. No profile selection, authentication or admin access is required for these public pages. They do not change a visitor's selected course.
- Chapter lists derive titles/IDs from the existing curriculum. SSR serves safe counts and clear review-pending states without serializing questions, keys or explanations. Invalid chapter segments return404.
- Share Test copies the current website origin plus the canonical chapter route. It never copies an attempt token, answer, user identifier or query string. Clipboard denial displays a selectable full URL for manual copying. Copied feedback clears after3 seconds.
- Sharing creates access to the chapter, not another person's attempt. Guest answers remain protected by the existing capability token and server-side grading; browser recovery remains scoped to the exact curriculum chapter.
- Eligible questions remain verified AND not development samples. The current gate already makes eligible records available automatically; no approvals were invented here.
- Counts/timers stay Easy10/10min; Medium10/20min or20/40min; Hard10/30min,20/60min,30/90min. Single-correct scoring stays+4/-1/0. Insufficient verified sets stay unavailable.

## Two independent publication blockers

1. **Academic approval:** all270 questions remain drafts. Resolve the record-level answer/wording, semantic repetition and difficulty flags. A qualified Physics reviewer must independently review final exact records and document identity/date/content hash/decision. Only after actual approval and owner authorization may specific records become verified. Never promote the40 samples or bulk-approve content from automated checks.
2. **Durable attempt storage:** `FileMockAttemptStore` is a single-server local disk adapter. Vercel's serverless filesystem is not a persistent shared attempt database. The API now refuses eligible attempt creation on Vercel with a clear503 rather than claiming that `/tmp` provides durable storage. Browsing the public pages and catalog still works. A durable transactional server-side attempt adapter is required before active tests can run on Vercel. No such service has been connected in this task.

Alternative for the current file adapter: deploy a single long-running Node.js server with a persistent private disk and backups. Set `GNOSIS_MOCK_DATA_DIR` to an absolute private directory outside the web root. Keep one application instance: current locks and rate limits are local, not distributed. Use a host-supported start command binding to the host's required address/port, e.g. `pnpm exec next start -H 0.0.0.0 -p "$PORT"` on a Unix Node host. Do not use static GitHub Pages for the API application.

## Hosting/security inspection

- `vercel.json` already identifies Next.js and a locked install/build workflow. The active source is **this repository root**, not the older ignored `GNOSIS/` or `github-verification/` copies. Older general deployment notes referring to uploading the prepared folder are historical.
- No Git remote or `.vercel` project link is configured in this root checkout. A previous conversation/domain is not evidence that these new changes are deployed. Hosting account settings and an actual current production build were not inspected remotely.
- `.env*` (except `.env.example`), private attempt data, temporary QA data and generated builds are ignored. No credentials are needed to browse guest test pages. Do not deploy placeholder Supabase/AI values. Service-role/AI keys must remain server-only if separately configured later; auth/AI behavior is unchanged here.
- Server tracing includes banks for the public route/API handlers and excludes private attempts and temporary fixtures. Banks stay in server-side `content/`, never `public/`. Only safe availability metadata crosses the public page boundary.
- Existing process-local request limits are preserved. A multi-instance host requires a durable atomic store and shared abuse controls before enabling active attempts. Shared public chapter URLs must never carry capability tokens.

## Local checks and manual review

Run `pnpm test`, `pnpm typecheck`, `pnpm report`, `pnpm build`, then `pnpm start` for a local production preview. `report` aliases the existing complete curriculum availability report. On this workstation pnpm11's dependency preflight attempted an unsolicited reinstall; checks use `pnpm_config_verify_deps_before_run=false` with the existing installed dependencies. This is a command-session setting, not a change to install policy.

1. Open the index on the local preview, choose each chapter, and refresh directly on its URL with no account or selected course. Counts must stay0 approved and starts unavailable.
2. Click Share Test and paste the link into a fresh private/incognito window. It must contain only origin and canonical chapter path. If clipboard access is denied, select/copy the fallback URL. The link uses localhost during local testing and cannot be shared with another device as a public deployment.
3. Repeat at mobile width, check the drawer and controls, and test the invalid `/chapter-5` route returns404.
4. Use isolated ignored QA fixtures to exercise start/navigation/save/clear/review/submit/results/expiry and all six configurations. These simulations are not academic approval and must never be shipped as active student banks.

## Exact publication sequence

1. Complete qualified academic review and resolve the required counts for each difficulty. Rerun content validators and all checks after changing approved records.
2. Choose durable hosting: implement/configure a transactional attempt adapter for Vercel, or provision a persistent single-server Node host as described above. Verify actual write/resume/expiry/duplicate-submit behavior there with private staging data before student activation.
3. Obtain owner permission to push/deploy. Review the explicit file list/diff, exclude environment/private/generated files, commit the intended source, configure the intended existing remote and push without force. This task does not perform those actions.
4. Import/update the actual root project on the chosen host, configure only necessary server environment values, build and deploy. Ensure public visitor access is allowed in deployment-protection settings.
5. Use the **actual HTTPS deployment origin returned by the host**. Append the five routes above, verify unauthenticated incognito access, direct refresh, clipboard copying, mobile layout and a real approved attempt from a separate device/network. Check keys are hidden until submission and existing resources still work.
6. Only then send the verified production links to students. A local preview or a source branch is not a live public publication.

## Evidence from this implementation

- `pnpm test`:82 passed,0 failed; final targeted public unit rerun:4 passed.
- `pnpm typecheck`, `pnpm report`, and final `pnpm build`:passed. A new environment-helper test typing error was fixed before the successful typecheck/build.
- First bare pnpm test failed before tests when pnpm tried an interactive dependency reinstall. The successful commands disabled automatic dependency verification/installation for that session; no dependencies were purged/reinstalled.
- Final production HTTP integration:3 passed. All five routes return200 for unauthenticated direct visits/refreshes with desktop and mobile User-Agent strings; invalid chapter5 returns404. No question IDs/keys/solutions appear in SSR content. Existing public/private/quiz/PDF API checks passed.
- Isolated synthetic API matrix:10 passed, including six exact chapter/difficulty/count/timer pairs, uniqueness, hidden keys, scoring, save/clear/resume, stale revisions, duplicate submission, expiry, malformed and empty banks. This is technical fixture evidence, not student-question approval.
- Desktop in-app browser:public index navigation,chapter1 reload,existing shell,unavailable controls,Share Test confirmation and exact canonical address in the selectable field observed. Screenshot: `tmp/public-mock-links-20261018/public-chapter-preview.png`.
- The tool clipboard readback returned empty despite browser success status. Canonical URL calculations and the visible full URL field were checked; clipboard behavior in external browsers remains a deployment acceptance check. The visible field allows manual copying.
- No actual incognito profile,remote device or mobile viewport was tested. Mobile User-Agent HTTP requests do not verify mobile layout. Those real-device checks remain required after deployment.
- All9 bank hashes unchanged. Both public page traces include9 unique bank JSON files and no private attempts,temp data or local environment files. Windows trace entries contain both slash styles; counts were normalized before deduplication.
- No question promotion,push or deployment. All270 drafts require academic approval. Active attempts on Vercel require a durable storage adapter.
