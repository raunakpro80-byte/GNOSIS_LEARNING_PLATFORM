# GNOSIS Code Explained

The current navigation uses `components/ResourceLibrary.tsx`: Lectures, NCERT Books and Notes each open selected subjects → numbered chapters. `lib/curriculum.ts` defines class-specific chapter indexes, subject filtering and automatic target exams. `lib/chapter-resources.ts` holds empty attachment slots for the PDFs and videos the owner will supply. See [Chapter resources](CHAPTER-RESOURCES.md). The lesson workflow described below is the retained legacy Ohm’s Law demonstration.

GNOSIS is a Next.js learning platform. Students open Class 12 → Physics → Current Electricity → Ohm’s Law, watch the supplied YouTube lesson, read PDF notes, save personal notes, and check their understanding with a quiz.

## Folder map

```text
GNOSIS/
├── app/                 Pages, API endpoints, global and dark/light styles
│   ├── [[...path]]/      Landing, dashboard, subjects, learning and settings shell
│   └── api/             Server-side scoring, AI, state, content and protected admin
├── components/          Interactive React components
├── lib/                 Types, validation, learning rules and backend helpers
├── public/              Original lesson PDF and PDF.js worker
├── supabase/            Database, private storage and access-control migration
├── scripts/             Seed content and PDF/worker preparation
├── tests/               Learning, streak and HTTP behavior checks
├── docs/                Setup details, feature limitations and hackathon demo
├── .github/workflows/   CI validation for GitHub pushes and pull requests
├── .env.example         Variable names and placeholders only
├── package.json         Dependencies and run/build/test commands
└── vercel.json          Next.js hosting configuration
```

The frontend and backend run within the same Next.js project. A separate Express server is not required.

## Main files

| File | Purpose |
| --- | --- |
| `components/Gnosis.tsx` | Student screens: landing, preferences, dashboard, subject list, lesson workspace, quizzes and history. |
| `components/Video.tsx` | Official YouTube IFrame API, playback position, seek, cleanup and visible playback callbacks. |
| `components/PdfReader.tsx` | PDF.js loading, page navigation, zoom and retry states. |
| `components/useLearning.ts` | Guest browser storage, authenticated cloud saves, account separation and save status. |
| `components/ThemeToggle.tsx` | Browser-persisted light/dark switch across all routes. |
| `components/StreakCard.tsx` | Current streak, best streak and seven-day activity display. |
| `components/Admin.tsx` | Authorized content preparation, media preview, review and publishing UI. |
| `lib/types.ts` / `lib/schema.ts` | TypeScript entities and Zod runtime validation. |
| `lib/seed.ts` | Original Ohm’s Law notes, concepts, and five answer-checked questions. |
| `lib/learning.ts` | YouTube URL extraction, transcript parsing, exact segment selection, scoring and completion rules. |
| `lib/catalog.ts` | Class filtering: Ohm’s Law appears in Class 12, not Class 11. |
| `lib/streak.ts` | Study-day rules and midnight IST date calculations. |
| `lib/server.ts` | Verified Supabase identity, admin checks, service-only data reads and request limits. |
| `lib/content-validation.ts` | Prevents publishing unreviewed cards, unsupported references and false synchronization. |

## A student request, step by step

1. Browser calls `/api/content`; the server returns published lesson metadata and quiz prompts without answer keys.
2. Preferences select a class. `lessonsForClass()` selects the relevant lessons; the seeded chapter belongs only to Class 12.
3. YouTube playback updates the current position. A verified transcript would select cards via `activeSegment()`; the current supplied video has no reviewed transcript and therefore uses labelled topic cards.
4. New notes and bookmarks update the learner's private state. Guests save on their own browser; signed-in records go through `/api/state` with verified ownership.
5. Quiz choices go to `/api/quiz`. The server grades against the reviewed key, returns explanations, and the browser records the attempt.
6. A new saved note, quiz submission, or 60 visible playback seconds earns one study day. Duplicate activity on the same IST date does not add extra days.
7. A lesson is complete only after explicit material review and a quiz result of at least 80% on five or more questions.

## AI and source trust

`/api/chat` sends bounded transcript/page context to a configured server-side provider. Unknown citation IDs are removed. Responses are rendered as plain text. No key is sent to browser assets. Without AI credentials, the app shows a setup message; it does not fake a live response.

Admin requests independently verify authentication and the admin role. Draft lessons and answer keys are not student-readable Supabase records. Private uploaded PDFs use signed URLs after publication.

## What can a visitor try without setup?

Demo entry, Class 12 catalog, the supplied embedded video, original PDF, topic cards, personal notes/bookmarks, scored quiz, resume, themes and streaks. Supabase authentication/cloud/admin success paths and live AI require the owner's configured services. Original fixture notes are not a transcript or an NCERT reproduction.

See [README](../README.md), [verification and limitations](STATUS.md), [deployment](DEPLOYMENT.md), and [demo script](DEMO.md).
