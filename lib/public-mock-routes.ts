import { chaptersFor } from "./curriculum";

export const publicPhysicsMockPath = "/mock-tests/class-11/physics";
export const publicPhysicsMockChapters = chaptersFor("11", "physics").filter(
  (chapter) => chapter.number >= 1 && chapter.number <= 4,
);
export function publicMockChapterNumber(segment: string): number | null {
  const match = /^chapter-([1-4])$/.exec(segment);
  return match ? Number(match[1]) : null;
}
export function publicMockChapterPath(chapter: number) {
  if (!publicPhysicsMockChapters.some((item) => item.number === chapter))
    throw new Error("This chapter has no public mock test route.");
  return `${publicPhysicsMockPath}/chapter-${chapter}`;
}
export function publicMockShareUrl(origin: string, chapter: number) {
  const base = new URL(origin);
  if (!["https:", "http:"].includes(base.protocol))
    throw new Error("A website origin is required.");
  return new URL(publicMockChapterPath(chapter), base.origin).href;
}
