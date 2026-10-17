import { chaptersFor, type SubjectId } from "./curriculum";

export type ChapterResources = {
  bookPdf: string | null;
  notesPdf: string | null;
  detailedVideoId: string | null;
  oneShotVideoId: string | null;
  videoStartSeconds: number;
};
// Only owner-supplied media belongs here. Keys: class/subject/chapter number.
export const chapterResources: Record<string, Partial<ChapterResources>> = {
  "11/biology/1": {
    notesPdf: "/notes/class-11/biology/the-living-world-notes.pdf",
    detailedVideoId: "Lsrc3RsmRR4",
    oneShotVideoId: "Lsrc3RsmRR4",
  },
  "11/biology/2": {
    notesPdf: "/notes/class-11/biology/biological-classification-notes.pdf",
    detailedVideoId: "mJe-aqB17rI",
    oneShotVideoId: "mJe-aqB17rI",
  },
  "11/biology/3": {
    notesPdf: "/notes/class-11/biology/plant-kingdom-notes.pdf",
    detailedVideoId: "sQEAsqgOME8",
    oneShotVideoId: "sQEAsqgOME8",
  },
  "11/biology/4": {
    notesPdf: "/notes/class-11/biology/animal-kingdom-notes.pdf",
    detailedVideoId: "P0eGiGPSwgc",
    oneShotVideoId: "P0eGiGPSwgc",
  },
  "11/biology/5": {
    notesPdf:
      "/notes/class-11/biology/morphology-of-flowering-plants-notes.pdf",
    detailedVideoId: "oH5of1D4PlU",
    oneShotVideoId: "oH5of1D4PlU",
  },
  "11/biology/6": {
    detailedVideoId: "J3VM-fXrYf4",
    oneShotVideoId: "J3VM-fXrYf4",
  },
  "11/biology/7": {
    notesPdf:
      "/notes/class-11/biology/structural-organisation-in-animals-notes.pdf",
    detailedVideoId: "4bDQJZN5MX8",
    oneShotVideoId: "4bDQJZN5MX8",
  },
  "11/biology/8": {
    notesPdf: "/notes/class-11/biology/cell-the-unit-of-life-notes.pdf",
    detailedVideoId: "rdmJ4mAERe8",
    oneShotVideoId: "rdmJ4mAERe8",
  },
  "11/biology/9": {
    notesPdf: "/notes/class-11/biology/biomolecules-notes.pdf",
  },
  "11/mathematics/1": {
    notesPdf: "/notes/class-11/mathematics/sets-notes.pdf",
    bookPdf: "/books/class-11/mathematics/sets.pdf",
    detailedVideoId: "S2o6x32xFys",
    oneShotVideoId: "S2o6x32xFys",
    videoStartSeconds: 15,
  },
  "11/mathematics/2": {
    notesPdf: "/notes/class-11/mathematics/relations-and-functions-notes.pdf",
    detailedVideoId: "834b8w2EKiA",
    oneShotVideoId: "834b8w2EKiA",
    videoStartSeconds: 15,
    bookPdf: "/books/class-11/mathematics/relations-and-functions.pdf",
  },
  "11/mathematics/3": {
    notesPdf: "/notes/class-11/mathematics/trigonometric-functions-notes.pdf",
    detailedVideoId: "_pNT2pCEEug",
    oneShotVideoId: "_pNT2pCEEug",
    videoStartSeconds: 15,
    bookPdf: "/books/class-11/mathematics/trigonometric-functions.pdf",
  },
  "11/mathematics/4": {
    notesPdf:
      "/notes/class-11/mathematics/complex-numbers-and-quadratic-equations-notes.pdf",
    detailedVideoId: "XoPTYrhGdew",
    oneShotVideoId: "XoPTYrhGdew",
    videoStartSeconds: 15,
    bookPdf:
      "/books/class-11/mathematics/complex-numbers-and-quadratic-equations.pdf",
  },
  "11/mathematics/5": {
    notesPdf: "/notes/class-11/mathematics/linear-inequalities-notes.pdf",
    detailedVideoId: "otz_2spIgq8",
    oneShotVideoId: "otz_2spIgq8",
    videoStartSeconds: 15,
    bookPdf: "/books/class-11/mathematics/linear-inequalities.pdf",
  },
  "11/mathematics/6": {
    detailedVideoId: "VXbKZURwYfU",
    oneShotVideoId: "VXbKZURwYfU",
    videoStartSeconds: 15,
    bookPdf: "/books/class-11/mathematics/permutations-and-combinations.pdf",
  },
  "11/chemistry/1": {
    notesPdf:
      "/notes/class-11/chemistry/some-basic-concepts-of-chemistry-notes.pdf",
    bookPdf: "/books/class-11/chemistry/some-basic-concepts-of-chemistry.pdf",
    detailedVideoId: "ZdzrnPawYf4",
    oneShotVideoId: "_9us2WJRL7E",
  },
  "11/chemistry/2": {
    notesPdf: "/notes/class-11/chemistry/structure-of-atom-notes.pdf",
    bookPdf: "/books/class-11/chemistry/structure-of-atom.pdf",
    detailedVideoId: "t0YvTa26TSs",
    oneShotVideoId: "Okl9bDM7xwg",
  },
  "11/chemistry/3": {
    notesPdf:
      "/notes/class-11/chemistry/classification-of-elements-and-periodicity-in-properties-notes.pdf",
    bookPdf:
      "/books/class-11/chemistry/classification-of-elements-and-periodicity-in-properties.pdf",
    detailedVideoId: "A8UE8We3FiI",
    oneShotVideoId: "GjqU5RmLsCw",
  },
  "11/chemistry/4": {
    notesPdf:
      "/notes/class-11/chemistry/chemical-bonding-and-molecular-structure-notes.pdf",
    bookPdf:
      "/books/class-11/chemistry/chemical-bonding-and-molecular-structure.pdf",
    detailedVideoId: "VTFEPlwgqZY",
    oneShotVideoId: "rhKGEM3w4qM",
  },
  "11/chemistry/5": { bookPdf: "/books/class-11/chemistry/thermodynamics.pdf" },
  "11/chemistry/6": { bookPdf: "/books/class-11/chemistry/equilibrium.pdf" },
  "11/physics/1": {
    detailedVideoId: "Rcdf1W-0F_Q",
    oneShotVideoId: "v3rx_lBBvCk",
    bookPdf: "/books/class-11/physics/units-and-measurements.pdf",
    notesPdf: "/notes/class-11/physics/units-and-measurements.pdf",
  },
  "11/physics/2": {
    detailedVideoId: "LWeOOFvxrd0",
    oneShotVideoId: "joMDsZgx2a0",
    bookPdf: "/books/class-11/physics/motion-in-a-straight-line.pdf",
    notesPdf: "/notes/class-11/physics/motion-in-a-straight-line.pdf",
  },
  "11/physics/3": {
    detailedVideoId: "-N7eYNzRMOM",
    oneShotVideoId: "qN8pSP8o_uY",
    bookPdf: "/books/class-11/physics/motion-in-a-plane.pdf",
    notesPdf: "/notes/class-11/physics/motion-in-a-plane.pdf",
  },
  "11/physics/4": {
    detailedVideoId: "8hG2gbmf7sU",
    oneShotVideoId: "yjb5MgEkzic",
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
    videoStartSeconds: 0,
  };
  if (!chaptersFor(className, subject).some((c) => c.number === chapter))
    return empty;
  return {
    ...empty,
    ...chapterResources[`${className}/${subject}/${chapter}`],
  };
}
