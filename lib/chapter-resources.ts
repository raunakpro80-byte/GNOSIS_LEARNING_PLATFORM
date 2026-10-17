import { chaptersFor, type SubjectId } from "./curriculum";

export type ChapterResources = {
  bookPdf: string | null;
  notesPdf: string | null;
  detailedVideoId: string | null;
  oneShotVideoId: string | null;
};
// Only owner-supplied media belongs here. Keys: class/subject/chapter number.
export const chapterResources: Record<string, Partial<ChapterResources>> = {
  "11/physics/1": {
    detailedVideoId: "Rcdf1W-0F_Q",
    bookPdf: "/books/class-11/physics/units-and-measurements.pdf",
    notesPdf: "/notes/class-11/physics/units-and-measurements.pdf",
  },
  "11/physics/2": {
    detailedVideoId: "LWeOOFvxrd0",
    bookPdf: "/books/class-11/physics/motion-in-a-straight-line.pdf",
    notesPdf: "/notes/class-11/physics/motion-in-a-straight-line.pdf",
  },
  "11/physics/3": {
    detailedVideoId: "-N7eYNzRMOM",
    bookPdf: "/books/class-11/physics/motion-in-a-plane.pdf",
    notesPdf: "/notes/class-11/physics/motion-in-a-plane.pdf",
  },
  "11/physics/4": {
    detailedVideoId: "8hG2gbmf7sU",
    bookPdf: "/books/class-11/physics/laws-of-motion.pdf",
    notesPdf: "/notes/class-11/physics/laws-of-motion.pdf",
  },
};

export function resourceLabel(
  className: string,
  subject: SubjectId,
  chapter: number,
  section: "books" | "notes" | "lectures",
) {
  const resource = resourcesFor(className, subject, chapter);
  if (section === "notes")
    return resource.notesPdf ? "Notes available" : "Notes coming soon";
  if (section === "books")
    return resource.bookPdf ? "PDF available" : "PDF coming soon";
  return resource.detailedVideoId || resource.oneShotVideoId
    ? "Lectures available"
    : "Videos coming soon";
}

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
