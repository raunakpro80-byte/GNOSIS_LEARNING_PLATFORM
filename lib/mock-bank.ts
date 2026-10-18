import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import { parseMockBank } from "./mock-schema";
import {
  mockChapterKey,
  type MockCatalog,
  type MockChapter,
  type MockQuestion,
} from "./mock-types";
import { chapterTitle } from "./mock-schema";
import { mockCountsByDifficulty } from "./mock-policy";
import { chaptersFor, subjectCatalog } from "./curriculum";
export const mockBankDirectory = () =>
  path.resolve(
    process.env.GNOSIS_MOCK_BANK_DIR ||
      path.join(process.cwd(), "content/mock-questions"),
  );
export class MockBankUnavailableError extends Error {
  constructor(cause: unknown) {
    super(
      "Chapter tests are temporarily unavailable because the question bank could not be validated. Please try again after the content is corrected. Your other learning resources remain available.",
      { cause },
    );
    this.name = "MockBankUnavailableError";
  }
}
export async function readMockBank(): Promise<MockQuestion[]> {
  try {
    const directory = mockBankDirectory();
    const names = (await readdir(directory))
      .filter((x) => x.endsWith(".json"))
      .sort();
    const questions: MockQuestion[] = [];
    for (const name of names)
      questions.push(
        ...parseMockBank(
          JSON.parse(await readFile(path.join(directory, name), "utf8")),
        ),
      );
    if (new Set(questions.map((q) => q.id)).size !== questions.length)
      throw new Error("The question bank contains duplicate IDs.");
    return questions;
  } catch (cause) {
    throw new MockBankUnavailableError(cause);
  }
}
function chapterQuestions(chapter: MockChapter, bank: MockQuestion[]) {
  chapterTitle(chapter);
  return bank.filter((q) => mockChapterKey(q) === mockChapterKey(chapter));
}
function eligibleQuestion(q: MockQuestion) {
  return q.verification.status === "verified" && !q.developmentSample;
}
function countsFor(questions: MockQuestion[]): MockCatalog["counts"] {
  return {
    all: questions.length,
    easy: questions.filter((q) => q.difficulty === "easy").length,
    medium: questions.filter((q) => q.difficulty === "medium").length,
    hard: questions.filter((q) => q.difficulty === "hard").length,
  };
}
export async function verifiedChapterQuestions(chapter: MockChapter) {
  return chapterQuestions(chapter, await readMockBank()).filter(
    eligibleQuestion,
  );
}
export function mockCatalogFromBank(
  chapter: MockChapter,
  bank: MockQuestion[],
): MockCatalog {
  const chapterBank = chapterQuestions(chapter, bank);
  const questions = chapterBank.filter(eligibleQuestion);
  const approved = chapterBank.filter(
    (q) => q.verification.status === "verified" && !q.developmentSample,
  );
  return {
    chapter,
    title: chapterTitle(chapter),
    counts: countsFor(questions),
    approvedCounts: countsFor(approved),
    sampleCounts: countsFor(
      chapterBank.filter(
        (q) => q.verification.status === "verified" && q.developmentSample,
      ),
    ),
    draftCounts: countsFor(
      chapterBank.filter((q) => q.verification.status === "draft"),
    ),
    sizes: Object.fromEntries(
      (["easy", "medium", "hard"] as const).map((difficulty) => [
        difficulty,
        mockCountsByDifficulty[difficulty].filter(
          (n) =>
            n <= questions.filter((q) => q.difficulty === difficulty).length,
        ),
      ]),
    ) as MockCatalog["sizes"],
    developmentSample: questions.some((q) => q.developmentSample),
    storage: "local-server",
  };
}
export async function curriculumMockCatalog(): Promise<MockCatalog[]> {
  const bank = await readMockBank();
  return (["11", "12"] as const).flatMap((className) =>
    subjectCatalog.flatMap((subject) =>
      chaptersFor(className, subject.id).map((chapter) =>
        mockCatalogFromBank(
          { className, subject: subject.id, chapter: chapter.number },
          bank,
        ),
      ),
    ),
  );
}
export async function mockCatalog(chapter: MockChapter): Promise<MockCatalog> {
  return mockCatalogFromBank(chapter, await readMockBank());
}
