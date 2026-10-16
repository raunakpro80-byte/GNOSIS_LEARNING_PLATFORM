# Working features, fixtures, and verification limits

## Update: themes, study streaks, and class-specific catalog

- Added persistent light/dark appearance across all routes, plus a header streak shortcut and seven-day streak cards on dashboard/progress.
- Study days require a new saved note, quiz submission, or 60 seconds of visible-tab playback; one credit per IST calendar day. Current/best streaks and rollover use tested date logic. Historical activity is not fabricated for existing records.
- Added backward-compatible `activityDays`/`studySeconds` state fields and lesson `className` metadata. No SQL migration is needed for these JSON aggregate additions.
- Ohm’s Law is Class 12 → Physics → Current Electricity. Class 11 catalog/search/direct lesson display omit it; class-specific private records remain saved when switching classes.
- **14 behavioral tests passed**, including class filtering, legacy record migration, streak expiry/deduplication, IST midnight/year boundaries, and watch thresholds. TypeScript and production build passed.
- Browser checks: dark mode and earned streak survived reload; switching Class 11/12 hid/restored the lesson; a new note earned one study day; dark/light controls and mobile streak layout were inspected at 390px with no page overflow.
- Live cloud services retain the external verification limitations below.

## Implemented and locally exercised

- Guest entry without signup; landing, dashboard, subject/chapter/lesson navigation, preferences, notes library, quiz history and revision.
- User-supplied YouTube lesson playing through the official IFrame API. Browser player title: “OHM'S LAW in 20 Minutes” / JEE Wallah. Playback position changes in the GNOSIS UI and survives reload.
- PDF.js renders all three original note pages; previous/next, page entry, zoom, loading/failure/retry states, direct file access, and page references.
- Personal note creation, editing, timestamp seek, autosave status, and reload persistence. Concept bookmark creation and reload persistence; library reopen links restore saved context.
- Five server-scored original questions; correct-answer explanations, mistake-source links, retries, saved attempts, explicit completion rule, and suggestions based on actual quiz mistakes.
- Missing AI credentials show a clear setup error through the real backend. There are no canned chat responses presented as live AI.
- Anonymous admin/read/write/upload/draft/preview and student-state requests are rejected on the server (401).
- Desktop browser inspection and mobile inspection at 390 × 844. No page-level horizontal overflow was observed. Mobile PDF and keyboard controls were exercised. An overlay hit-area issue was repaired, and off-screen navigation is hidden from focus/accessibility until opened.
- Original PDF pages rendered with Poppler and visually reviewed at 1000px; no clipping or overlap observed.

## Code present, external verification blocked

- Supabase email/password authentication, admin role verification, owner-only cloud records, private PDF uploads, signed URL delivery, full content studio, publishing/unpublishing: no project credentials or test accounts supplied. Migration and SQL policies have **not** been executed against a real Supabase instance. Student-vs-student isolation and student-vs-admin 403 behavior need two student accounts and one administrator for end-to-end verification. Anonymous rejection was exercised.
- Live contextual AI and AI draft generation: no provider credentials/model supplied, so provider success, timeout, and citation behavior have **not** been exercised against a live model. The server sends bounded lesson/time context, validates output shape and source IDs, uses HTTPS/timeouts and limits, and renders plain text. The missing-credentials path was exercised.
- Verified timestamp synchronization: no matching transcript supplied. Parsing, gaps, overlap rejection, boundaries and seek direction are unit tested with explicitly synthetic test segments. The actual video remains **topic-based**, not synced. Every segment needs reviewed concept cards and a human-confirmed mapping before enabling sync.
- Admin PDF extraction/OCR failure handling is implemented, but successful authorized upload/storage processing was not exercised without Supabase credentials. OCR execution itself is not implemented.
- Public deployment has been requested; repository upload and hosting are awaiting account authentication. A runnable local application and upload-ready source folder are available.

## Fixtures and simplifications

- The three-page PDF, note excerpts, concept cards, and five quiz questions are original educational fixture content. They are not a transcript of the user-supplied video and not official NCERT documents.
- No fake AI chat, fabricated learning history, or seeded user metrics. Browser QA produces real disposable test activity; use Preferences → Reset local demo data for a clean start.
- Without AI settings, admin draft preparation uses explicitly labelled extractive snippets for human editing. With settings, it calls the configured provider and still requires review.
- System fonts substitute for the reference's Plus Jakarta Sans/Inter to avoid an external font dependency. Layout, academic tone, card hierarchy, and indigo/white branding follow the references.
- Content and learner records use validated JSON aggregates with explicit typed entities rather than a normalized table per entity. Saves serialize within one tab; cross-device editing uses last-write-wins.
- Chat conversations are in memory only. Rate limiting is local to the server process; a shared limiter is needed for a scaled deployment. Source validation prevents invalid source links, but factual model correctness still requires review.
- Quiz keys remain server-side until grading. Personal learning metrics are user-editable records, not tamper-resistant exam results.
- Storage signed URLs last one hour. Reload the lesson if a URL expires. Browser/YouTube policies or network restrictions can prevent embedding; the independent notes and direct YouTube link remain available.

## Acceptance evidence

| Criterion | Evidence / state |
| --- | --- |
| Guest demo without signup | Browser journey exercised |
| Lesson opens from dashboard | Browser exercised |
| Supplied YouTube playback | Observed embedded playback and advancing time |
| Seeking matches segment / gaps | Synthetic boundary and seek-direction tests pass; real mapping blocked |
| Honest missing transcript behavior | Actual lesson labelled topic-based, no invented timestamps |
| Contextual AI uses lesson/time | Server implementation; live success blocked by credentials |
| Missing AI credentials | HTTP 503 and browser setup state exercised |
| Valid sources | Seed references tested; PDF page links exercised; AI ID validation implemented |
| PDF pages / zoom | Browser and independent PDF render checks |
| Notes/bookmarks reload | Browser exercised |
| Quiz score / mistakes | Independent key tests and 4/5 browser attempt with explanation |
| Resume restores position | Browser reload restored saved time; note timestamp changed target |
| Student data isolation | RLS and account owner checks implemented; live multi-account test blocked |
| Unauthorized admin mutations | HTTP 401 exercised on every admin endpoint |
| Mobile usable | 390px inspection; no page overflow; keyboard form/reader checks |
| Server credentials kept private | Only public Supabase URL/anon key referenced in client modules; server routes keep privileged keys |
| Production build / type check | Passed; final command results recorded below |
| Limitations documented | This file and README |

## Checks

- `node --import tsx --test tests/learning.test.ts`: **8/8 passed**, including publishing review and citation validation.
- `node --import tsx --test tests/http.test.ts`: local integration suite passed; final production rerun recorded below.
- `node node_modules/typescript/bin/tsc --noEmit`: passed.
- `node node_modules/next/dist/bin/next build --webpack`: passed; a later build hit a Windows generated-file lock, repaired by stopping the preview and separating development `.next-dev` from production `.next`. Final post-repair production build recorded below.
- Dependency installation: clean offline repeat install exit 0 with matching PDF worker postinstall. Optional esbuild install script explicitly disabled; its installed platform binary runs the test suite.
- Browser screenshot/design inspection: landing/dashboard/lesson/PDF/mobile. No automated accessibility audit or exhaustive assistive-technology testing claimed.

## Final production verification — 16 October 2026

- Final post-repair production build: **exit 0**, ten generated routes/pages, including all protected admin handlers and the icon.
- Final standalone TypeScript check: **exit 0**.
- Final eight behavioral tests: **8 passed, 0 failed**.
- Final restarted production HTTP suite: **1 passed, 0 failed**, containing public content checks, seven protected-request checks, missing-AI setup, scored quiz, invalid submission, and PDF checks.
- Node PDF.js extraction smoke check: **3 pages, 105 text items**; storage upload remains externally blocked.
- Client build scan found no AI/service-key environment names or the checked server-only answer explanation in `.next/static`.
- Production browser: saved name/exam/language preferences survived reload; protected admin setup state was visible; reset confirmation was replaced with an in-page flow and verified. Disposable browser QA data was cleared; dashboard returned to zero history.
- Final dashboard screenshot: `docs/preview.png`. Preview processes were stopped after verification; run the documented dev/start command to open the application.
