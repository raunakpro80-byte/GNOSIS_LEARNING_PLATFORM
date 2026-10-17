export type Card = {
  id: string;
  type: "Definitions" | "Formulas" | "Recap";
  title: string;
  body: string;
  formula?: string;
  sourceId: string;
  misconception?: string;
};
export type Segment = {
  id: string;
  startSeconds: number;
  endSeconds: number;
  text: string;
  conceptCards: Card[];
};
export type Question = {
  id: string;
  prompt: string;
  options: string[];
  correct: number;
  explanation: string;
  concept: string;
  sourceId: string;
  timestamp?: number;
};
export type Excerpt = { id: string; page: number; text: string };
export type Lesson = {
  className: "11" | "12";
  id: string;
  title: string;
  subject: string;
  chapter: string;
  description: string;
  videoId: string | null;
  transcriptVerified: boolean;
  segments: Segment[];
  cards: Card[];
  pdfUrl: string;
  excerpts: Excerpt[];
  questions: Question[];
  status: "Draft" | "Processing" | "Review" | "Published";
  fixture: boolean;
};
export type PublicLesson = Omit<Lesson, "questions"> & {
  questions: Omit<Question, "correct" | "explanation">[];
};
export type Profile = {
  name: string;
  className: string;
  exam: string;
  subjects: string[];
  language: "English" | "Hindi" | "Hinglish";
};
export type Note = {
  id: string;
  lessonId: string;
  timestamp: number;
  text: string;
  updatedAt: string;
};
export type Bookmark = {
  id: string;
  lessonId: string;
  cardId: string;
  timestamp: number;
  title: string;
};
export type Result = {
  questionId: string;
  chosen: number;
  correct: number;
  explanation: string;
  concept: string;
  sourceId: string;
  timestamp?: number;
};
export type Attempt = {
  id: string;
  lessonId: string;
  score: number;
  total: number;
  at: string;
  results: Result[];
};
export type LearningState = {
  activityDays: string[];
  studySeconds: Record<string, number>;
  profile: Profile;
  notes: Note[];
  bookmarks: Bookmark[];
  attempts: Attempt[];
  progress: Record<
    string,
    { position: number; completed: boolean; reviewed: boolean }
  >;
};
export const emptyState = (): LearningState => ({
  activityDays: [],
  studySeconds: {},
  profile: {
    name: "",
    className: "12",
    exam: "Boards",
    subjects: ["Physics"],
    language: "English",
  },
  notes: [],
  bookmarks: [],
  attempts: [],
  progress: {},
});
