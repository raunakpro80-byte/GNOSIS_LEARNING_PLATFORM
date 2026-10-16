import type { Lesson, Segment, Result } from "./types";
export function youtubeId(input: string): string {
  let u: URL;
  try {
    u = new URL(input);
  } catch {
    throw new Error("Enter a full YouTube URL.");
  }
  if (u.protocol !== "https:") throw new Error("Use an HTTPS YouTube URL.");
  const host = u.hostname.toLowerCase().replace(/^www\./, "");
  const id =
    host === "youtu.be"
      ? u.pathname.slice(1)
      : ["youtube.com", "m.youtube.com", "youtube-nocookie.com"].includes(host)
        ? u.pathname === "/watch"
          ? u.searchParams.get("v")
          : /^\/(embed|shorts)\/([\w-]+)$/.exec(u.pathname)?.[2]
        : null;
  if (!id || !/^[\w-]{11}$/.test(id))
    throw new Error("Unsupported YouTube URL or invalid video ID.");
  return id;
}
export function activeSegment(segments: Segment[], time: number) {
  return (
    segments.find((s) => time >= s.startSeconds && time < s.endSeconds) ?? null
  );
}
export function clock(seconds: number) {
  const s = Math.max(0, Math.floor(seconds));
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
}
function timestamp(s: string) {
  const p = s.trim().replace(",", ".").split(":").map(Number);
  if (
    p.length < 2 ||
    p.length > 3 ||
    p.some((x) => !Number.isFinite(x) || x < 0) ||
    p.at(-1)! >= 60 ||
    (p.length === 3 && p[1] >= 60)
  )
    throw new Error("Invalid transcript timestamp.");
  return p.reduce((a, n) => a * 60 + n, 0);
}
export function parseTranscript(raw: string): Segment[] {
  let segments: Segment[];
  if (raw.trim().startsWith("[")) {
    segments = JSON.parse(raw);
  } else {
    segments = raw
      .replace(/^\uFEFF/, "")
      .replace(/\r/g, "")
      .split(/\n\s*\n/)
      .filter((b) => b.includes("-->"))
      .map((b, i) => {
        const lines = b.split("\n");
        const n = lines.findIndex((l) => l.includes("-->"));
        const [a, z] = lines[n].split("-->");
        return {
          id: `segment-${i + 1}`,
          startSeconds: timestamp(a),
          endSeconds: timestamp(z.trim().split(/\s+/)[0]),
          text: lines
            .slice(n + 1)
            .join(" ")
            .replace(/<[^>]*>/g, ""),
          conceptCards: [],
        };
      });
  }
  if (!Array.isArray(segments) || !segments.length || segments.length > 3000)
    throw new Error("Transcript must contain 1–3000 segments.");
  const ids = new Set<string>();
  for (let i = 0; i < segments.length; i++) {
    const s = segments[i];
    if (
      !s ||
      typeof s.id !== "string" ||
      ids.has(s.id) ||
      typeof s.text !== "string" ||
      !s.text.trim() ||
      !Number.isFinite(s.startSeconds) ||
      !Number.isFinite(s.endSeconds) ||
      s.startSeconds < 0 ||
      s.startSeconds >= s.endSeconds
    )
      throw new Error(`Invalid or duplicate segment ${i + 1}.`);
    ids.add(s.id);
    if (i && s.startSeconds < segments[i - 1].endSeconds)
      throw new Error(`Segment ${i + 1} overlaps or is out of order.`);
    s.conceptCards ??= [];
  }
  return segments;
}
export function transcriptGaps(segments: Segment[]) {
  return segments.flatMap((s, i) =>
    s.startSeconds > (i ? segments[i - 1].endSeconds : 0)
      ? [{ start: i ? segments[i - 1].endSeconds : 0, end: s.startSeconds }]
      : [],
  );
}
export function grade(
  lesson: Lesson,
  answers: Record<string, number>,
): { score: number; total: number; results: Result[] } {
  if (
    Object.keys(answers).length !== lesson.questions.length ||
    lesson.questions.some(
      (q) =>
        !Number.isInteger(answers[q.id]) ||
        answers[q.id] < 0 ||
        answers[q.id] >= q.options.length,
    )
  )
    throw new Error("Answer every question before submitting.");
  const results = lesson.questions.map((q) => ({
    questionId: q.id,
    chosen: answers[q.id],
    correct: q.correct,
    explanation: q.explanation,
    concept: q.concept,
    sourceId: q.sourceId,
    timestamp: q.timestamp,
  }));
  return {
    score: results.filter((r) => r.chosen === r.correct).length,
    total: results.length,
    results,
  };
}
export function completion(reviewed: boolean, score: number, total: number) {
  return reviewed && total >= 5 && score / total >= 0.8;
}
