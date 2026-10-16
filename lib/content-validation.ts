import type { Lesson } from "./types";
import { parseTranscript } from "./learning";
export function validateContent(lesson: Lesson, reviewed: boolean) {
  if (lesson.segments.length) parseTranscript(JSON.stringify(lesson.segments));
  const sources = [
    ...lesson.excerpts.map((e) => e.id),
    ...lesson.segments.map((s) => s.id),
  ];
  if (new Set(sources).size !== sources.length)
    throw new Error("Source IDs must be unique within a lesson.");
  if (
    new Set(lesson.questions.map((q) => q.id)).size !== lesson.questions.length
  )
    throw new Error("Question IDs must be unique.");
  const cards = [
    ...lesson.cards,
    ...lesson.segments.flatMap((s) => s.conceptCards),
  ];
  if (new Set(cards.map((c) => c.id)).size !== cards.length)
    throw new Error("Concept-card IDs must be unique.");
  if (lesson.transcriptVerified && (!lesson.videoId || !lesson.segments.length))
    throw new Error(
      "Verified synchronization requires a video and transcript.",
    );
  if (lesson.status !== "Published") return;
  if (
    !reviewed ||
    lesson.questions.length < 5 ||
    !lesson.excerpts.length ||
    !lesson.pdfUrl ||
    !cards.length
  )
    throw new Error(
      "Publishing requires explicit review, a notes PDF, excerpts, reviewed cards, and at least five verified questions.",
    );
  const ids = new Set(sources);
  if (
    cards.some((c) => !ids.has(c.sourceId)) ||
    lesson.questions.some((q) => !ids.has(q.sourceId))
  )
    throw new Error("Every card and question must cite a supplied source ID.");
  if (
    lesson.transcriptVerified &&
    lesson.segments.some((s) => !s.conceptCards.length)
  )
    throw new Error(
      "Add reviewed concept cards to every synchronized segment.",
    );
  for (const q of lesson.questions)
    if (
      q.timestamp !== undefined &&
      (!lesson.transcriptVerified ||
        !lesson.segments.some(
          (s) => q.timestamp! >= s.startSeconds && q.timestamp! < s.endSeconds,
        ))
    )
      throw new Error(
        "Question timestamps require a matching reviewed transcript segment.",
      );
}
