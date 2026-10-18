import type { Difficulty } from "./mock-types";

export const mockQuestionCounts = [10, 20, 30] as const;
export type MockQuestionCount = (typeof mockQuestionCounts)[number];
export const mockCountsByDifficulty: Record<
  Difficulty,
  readonly MockQuestionCount[]
> = {
  easy: [10],
  medium: [10, 20],
  hard: [10, 20, 30],
};
export const mockMinutesPerQuestion: Record<Difficulty, number> = {
  easy: 1,
  medium: 2,
  hard: 3,
};
export function mockDuration(difficulty: Difficulty, count: MockQuestionCount) {
  return mockMinutesPerQuestion[difficulty] * count;
}
export const difficultyDescriptions: Record<Difficulty, string> = {
  easy: "NCERT fundamentals, direct formula questions and basic concepts.",
  medium: "Conceptual and numerical questions requiring multiple steps.",
  hard: "Challenging JEE/NEET-level reasoning, multi-concept applications and advanced numericals.",
};
export function nextMockDifficulty(difficulty: Difficulty): Difficulty | null {
  return difficulty === "easy"
    ? "medium"
    : difficulty === "medium"
      ? "hard"
      : null;
}
