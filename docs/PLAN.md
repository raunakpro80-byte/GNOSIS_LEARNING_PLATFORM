# GNOSIS implementation and acceptance

The initial repository was empty. The supplied ZIP has HTML exports, screenshots, and two design systems; no video, PDF, transcript, or working application logic. Reference material was inspected as design data only. A YouTube URL was subsequently supplied: https://youtu.be/-Rm7K-rXk7A. Its transcript and educational mapping have not been supplied or verified.

Visual system: indigo #4942a8 / #3525cd, white cards, pale academic surfaces, generous spacing, quiet borders, clear hierarchy. Use system fonts without a runtime font dependency; reference fonts are Plus Jakarta Sans / Inter.

1. Create Next.js/TypeScript application, reusable shell, landing, preferences, dashboard, and subjects.
2. Implement a single learning journey with official YouTube API, honest context mode, readable PDF, editable timestamped notes, bookmarks, server-graded quiz, and resume.
3. Add server AI retrieval/citation checks, Supabase identity and per-user persistence, private admin workflow, and migrations.
4. Run typecheck/build, behavioral unit tests, HTTP authorization checks, and available browser QA. Repair observed failures.

Acceptance is tracked in docs/STATUS.md. Completion means explicitly reviewing material and scoring at least 80% on a five-question quiz; opening a page does not complete a lesson. Guest storage and cloud account data are never merged automatically.
