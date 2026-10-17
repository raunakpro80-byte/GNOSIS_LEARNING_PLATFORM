import type { Profile, PublicLesson } from "./types";

export const subjectCatalog = [
  {
    id: "physics",
    name: "Physics",
    description:
      "Explore matter, motion, energy and the connections between them.",
  },
  {
    id: "chemistry",
    name: "Chemistry",
    description: "Understand elements, reactions and the structure of matter.",
  },
  {
    id: "mathematics",
    name: "Mathematics",
    description:
      "Build your understanding, one idea and one problem at a time.",
  },
  {
    id: "biology",
    name: "Biology",
    description: "Explore living systems, from cells to ecosystems.",
  },
] as const;
export type SubjectId = (typeof subjectCatalog)[number]["id"];
export type ResourceSection = "books" | "notes" | "lectures";
export type Chapter = { number: number; title: string };

// Chapter titles and numbering: NCERT rationalised 2026–27 contents.
// References and attachment instructions are in docs/CHAPTER-RESOURCES.md.
const titles: Record<"11" | "12", Record<SubjectId, string[]>> = {
  "11": {
    physics: [
      "Units and Measurements",
      "Motion in a Straight Line",
      "Motion in a Plane",
      "Laws of Motion",
      "Work, Energy and Power",
      "System of Particles and Rotational Motion",
      "Gravitation",
      "Mechanical Properties of Solids",
      "Mechanical Properties of Fluids",
      "Thermal Properties of Matter",
      "Thermodynamics",
      "Kinetic Theory",
      "Oscillations",
      "Waves",
    ],
    chemistry: [
      "Some Basic Concepts of Chemistry",
      "Structure of Atom",
      "Classification of Elements and Periodicity in Properties",
      "Chemical Bonding and Molecular Structure",
      "Thermodynamics",
      "Equilibrium",
      "Redox Reactions",
      "Organic Chemistry – Some Basic Principles and Techniques",
      "Hydrocarbons",
    ],
    mathematics: [
      "Sets",
      "Relations and Functions",
      "Trigonometric Functions",
      "Complex Numbers and Quadratic Equations",
      "Linear Inequalities",
      "Permutations and Combinations",
      "Binomial Theorem",
      "Sequences and Series",
      "Straight Lines",
      "Conic Sections",
      "Introduction to Three Dimensional Geometry",
      "Limits and Derivatives",
      "Statistics",
      "Probability",
    ],
    biology: [
      "The Living World",
      "Biological Classification",
      "Plant Kingdom",
      "Animal Kingdom",
      "Morphology of Flowering Plants",
      "Anatomy of Flowering Plants",
      "Structural Organisation in Animals",
      "Cell: The Unit of Life",
      "Biomolecules",
      "Cell Cycle and Cell Division",
      "Photosynthesis in Higher Plants",
      "Respiration in Plants",
      "Plant Growth and Development",
      "Breathing and Exchange of Gases",
      "Body Fluids and Circulation",
      "Excretory Products and their Elimination",
      "Locomotion and Movement",
      "Neural Control and Coordination",
      "Chemical Coordination and Integration",
    ],
  },
  "12": {
    physics: [
      "Electric Charges and Fields",
      "Electrostatic Potential and Capacitance",
      "Current Electricity",
      "Moving Charges and Magnetism",
      "Magnetism and Matter",
      "Electromagnetic Induction",
      "Alternating Current",
      "Electromagnetic Waves",
      "Ray Optics and Optical Instruments",
      "Wave Optics",
      "Dual Nature of Radiation and Matter",
      "Atoms",
      "Nuclei",
      "Semiconductor Electronics: Materials, Devices and Simple Circuits",
    ],
    chemistry: [
      "Solutions",
      "Electrochemistry",
      "Chemical Kinetics",
      "The d- and f-Block Elements",
      "Coordination Compounds",
      "Haloalkanes and Haloarenes",
      "Alcohols, Phenols and Ethers",
      "Aldehydes, Ketones and Carboxylic Acids",
      "Amines",
      "Biomolecules",
    ],
    mathematics: [
      "Relations and Functions",
      "Inverse Trigonometric Functions",
      "Matrices",
      "Determinants",
      "Continuity and Differentiability",
      "Application of Derivatives",
      "Integrals",
      "Application of Integrals",
      "Differential Equations",
      "Vector Algebra",
      "Three Dimensional Geometry",
      "Linear Programming",
      "Probability",
    ],
    biology: [
      "Sexual Reproduction in Flowering Plants",
      "Human Reproduction",
      "Reproductive Health",
      "Principles of Inheritance and Variation",
      "Molecular Basis of Inheritance",
      "Evolution",
      "Human Health and Disease",
      "Microbes in Human Welfare",
      "Biotechnology: Principles and Processes",
      "Biotechnology and its Applications",
      "Organisms and Populations",
      "Ecosystem",
      "Biodiversity and Conservation",
    ],
  },
};

export function selectedSubjects(subjects: readonly string[]) {
  return subjectCatalog.filter((s) =>
    subjects.some(
      (name) =>
        name === s.name ||
        (s.id === "mathematics" && ["Math", "Maths"].includes(name)),
    ),
  );
}
export function examForSubjects(subjects: readonly string[]) {
  const ids = selectedSubjects(subjects).map((s) => s.id);
  if (ids.includes("mathematics") && ids.includes("biology"))
    return "JEE + NEET";
  if (ids.includes("biology")) return "NEET";
  if (ids.includes("mathematics")) return "JEE";
  return "Boards";
}
export function normalizeProfile(profile: Profile): Profile {
  const subjects = selectedSubjects(profile.subjects).map((s) => s.name);
  return { ...profile, subjects, exam: examForSubjects(subjects) };
}
export function chaptersFor(className: string, subject: SubjectId): Chapter[] {
  if (className !== "11" && className !== "12") return [];
  return titles[className][subject].map((title, index) => ({
    number: index + 1,
    title,
  }));
}
export function lessonsForProfile(lessons: PublicLesson[], profile: Profile) {
  const names = selectedSubjects(profile.subjects).map((s) => s.name as string);
  return lessons.filter(
    (lesson) =>
      lesson.className === profile.className && names.includes(lesson.subject),
  );
}
