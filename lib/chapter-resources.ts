import { chaptersFor, type SubjectId } from "./curriculum";

export type ChapterResources = {
  bookPdf: string | null;
  notesPdf: string | null;
  detailedVideoId: string | null;
  oneShotVideoId: string | null;
};
// Only owner-supplied, reviewed media belongs here. No sample PDFs or videos
// are attached to the chapter library. Keys: class/subject/chapter number.
export const chapterResources: Record<string, Partial<ChapterResources>> = {};

export function resourcesFor(
  className: string,
  subject: SubjectId,
  chapter: number,
): ChapterResources {
  const empty: ChapterResources = {
    bookPdf: null,
    notesPdf: null,
    detailedVideoId: null,
    oneShotVideoId: null,
  };
  if (!chaptersFor(className, subject).some((c) => c.number === chapter))
    return empty;
  return {
    ...empty,
    ...chapterResources[`${className}/${subject}/${chapter}`],
  };
}
