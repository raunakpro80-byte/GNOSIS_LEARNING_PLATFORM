import type { Lesson, PublicLesson } from "./types";
export const seed: Lesson = {
  className: "12",
  id: "ohms-law",
  title: "Ohm’s Law",
  subject: "Physics",
  chapter: "Current Electricity",
  description:
    "Understand the relationship between potential difference, current, and resistance. Then put it into practice.",
  videoId: "-Rm7K-rXk7A",
  transcriptVerified: false,
  segments: [],
  status: "Published",
  fixture: true,
  pdfUrl: "/ohms-law-notes.pdf",
  excerpts: [
    {
      id: "notes-p1",
      page: 1,
      text: "Ohm’s law: V = IR. At constant temperature and other physical conditions, current through an ohmic conductor is proportional to the potential difference across it. V is potential difference in volts (V), I is current in amperes (A), R is resistance in ohms (Ω). Resistance is the slope of a V-versus-I graph. An I-versus-V graph has slope 1/R.",
    },
    {
      id: "notes-p2",
      page: 2,
      text: "Worked example: a 6 Ω resistor connected across 12 V carries I = V/R = 2 A. Doubling voltage at constant resistance doubles current. Two resistors of 2 Ω and 4 Ω in series have total resistance 6 Ω. Ohm’s law does not describe every device: diodes are non-ohmic. A filament lamp heats up; its resistance changes with temperature. Never assume R is constant when temperature changes.",
    },
    {
      id: "notes-p3",
      page: 3,
      text: "Revision: identify the known quantities; convert mA to A; use V = IR; check units and physical conditions. A 500 mA current through 10 Ω requires 5 V. A straight V-I line through the origin indicates constant resistance over the measured range. A resistor is ohmic only over conditions where proportionality holds.",
    },
  ],
  cards: [
    {
      id: "law",
      type: "Definitions",
      title: "A simple relationship. A powerful idea.",
      body: "For an ohmic conductor, current is directly proportional to potential difference when temperature and other physical conditions stay constant.",
      sourceId: "notes-p1",
      misconception:
        "This relationship is conditional. It does not hold for every electrical device.",
    },
    {
      id: "formula",
      type: "Formulas",
      title: "The equation that connects them",
      formula: "V = I × R",
      body: "V: potential difference (volts) · I: current (amperes) · R: resistance (ohms). Keep temperature and physical conditions constant.",
      sourceId: "notes-p1",
    },
    {
      id: "graph",
      type: "Definitions",
      title: "Read the graph carefully",
      body: "On a V-versus-I graph, slope is resistance R. Swap the axes, and the slope becomes 1/R.",
      sourceId: "notes-p1",
    },
    {
      id: "example",
      type: "Recap",
      title: "From equation to intuition",
      formula: "12 V ÷ 6 Ω = 2 A",
      body: "A 6 Ω resistor across 12 V carries 2 A. Double the voltage at the same resistance, and the current doubles.",
      sourceId: "notes-p2",
      misconception:
        "If the resistor heats up, the constant-resistance assumption may no longer apply.",
    },
  ],
  questions: [
    {
      id: "q1",
      prompt: "A 6 Ω resistor is connected across 12 V. What current flows?",
      options: ["0.5 A", "2 A", "6 A", "72 A"],
      correct: 1,
      explanation: "I = V/R = 12/6 = 2 A.",
      concept: "Using V = IR",
      sourceId: "notes-p2",
    },
    {
      id: "q2",
      prompt:
        "For an ohmic conductor at constant temperature, doubling the voltage will…",
      options: [
        "halve the current",
        "leave current unchanged",
        "double the current",
        "double resistance",
      ],
      correct: 2,
      explanation: "I = V/R. With R constant, doubling V doubles I.",
      concept: "Direct proportionality",
      sourceId: "notes-p1",
    },
    {
      id: "q3",
      prompt:
        "On a graph with V on the vertical axis and I on the horizontal axis, the slope is…",
      options: ["resistance R", "conductance 1/R", "power VI", "charge Q"],
      correct: 0,
      explanation: "Slope = ΔV/ΔI = R for an ohmic conductor.",
      concept: "Reading V-I graphs",
      sourceId: "notes-p1",
    },
    {
      id: "q4",
      prompt:
        "Which condition is essential when applying Ohm’s law with constant resistance?",
      options: [
        "Current must be zero",
        "Voltage must be 1 V",
        "Wire must be copper",
        "Temperature and physical conditions remain constant",
      ],
      correct: 3,
      explanation:
        "Resistance can change with temperature. The proportionality assumes constant physical conditions.",
      concept: "Conditions of Ohm’s law",
      sourceId: "notes-p1",
    },
    {
      id: "q5",
      prompt:
        "A current of 500 mA flows through a 10 Ω resistor. What is the voltage?",
      options: ["5000 V", "0.05 V", "5 V", "50 V"],
      correct: 2,
      explanation: "500 mA = 0.5 A. V = IR = 0.5 × 10 = 5 V.",
      concept: "Units and conversion",
      sourceId: "notes-p3",
    },
  ],
};
export function publicLesson(lesson: Lesson): PublicLesson {
  return {
    ...lesson,
    questions: lesson.questions.map(
      ({ correct: _c, explanation: _e, ...q }) => q,
    ),
  };
}
