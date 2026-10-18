export type MockChapter = {
  className: "11" | "12";
  subject: "physics" | "chemistry" | "mathematics" | "biology";
  chapter: number;
};
export type Difficulty = "easy" | "medium" | "hard";
export type MockAnswer = number | number[] | string | null;
export type MockAnswers = Record<string, MockAnswer>;
export type MockQuestion = MockChapter & {
  id: string;
  topic: string;
  type: "single" | "multiple" | "numerical";
  difficulty: Difficulty;
  prompt: string;
  options?: string[];
  correct: number | number[];
  tolerance?: number;
  explanation: string;
  source: { kind: "original" | "reference"; label: string; reference?: string };
  verification: { status: "draft" | "verified"; method: string };
  developmentSample?: boolean;
};
export type PublicMockQuestion = Pick<
  MockQuestion,
  "id" | "topic" | "type" | "difficulty" | "prompt" | "options"
>;
export type MockConfig = MockChapter & {
  count: 10 | 20 | 30;
  difficulty: Difficulty;
  durationMinutes: number;
};
export type MockCatalog = {
  chapter: MockChapter;
  title: string;
  counts: Record<Difficulty | "all", number>;
  approvedCounts: Record<Difficulty | "all", number>;
  sampleCounts: Record<Difficulty | "all", number>;
  draftCounts: Record<Difficulty | "all", number>;
  sizes: Record<Difficulty, number[]>;
  developmentSample: boolean;
  storage: "local-server" | "supabase";
};
export type MockResultItem = {
  question: PublicMockQuestion;
  answer: MockAnswer;
  correct: number | number[];
  tolerance?: number;
  explanation: string;
  source: MockQuestion["source"];
  verification: MockQuestion["verification"];
  outcome: "correct" | "wrong" | "unattempted";
  marks: number;
};
export type MockResult = {
  attemptId: string;
  chapter: MockChapter;
  chapterTitle: string;
  submittedAt: string;
  reason: "manual" | "expired";
  totalMarks: number;
  marksObtained: number;
  accuracy: number;
  correct: number;
  wrong: number;
  unattempted: number;
  timeTakenSeconds: number;
  items: MockResultItem[];
  topics: {
    topic: string;
    total: number;
    correct: number;
    wrong: number;
    unattempted: number;
    accuracy: number | null;
    status: "revise" | "practised" | "not-attempted";
  }[];
};
export type MockAttempt = {
  schemaVersion: 1;
  id: string;
  tokenHash: string;
  config: MockConfig;
  chapterTitle: string;
  startedAt: number;
  expiresAt: number;
  revision: number;
  questions: MockQuestion[];
  answers: MockAnswers;
  result: MockResult | null;
};
export type PublicMockAttempt = {
  id: string;
  config: MockConfig;
  chapterTitle: string;
  startedAt: number;
  expiresAt: number;
  serverNow: number;
  revision: number;
  questions: PublicMockQuestion[];
  answers: MockAnswers;
  result: MockResult | null;
  storage: "local-server" | "supabase";
  developmentSample: boolean;
};
export function mockChapterKey(c: MockChapter) {
  return `${c.className}/${c.subject}/${c.chapter}`;
}
