import type {
  MockAnswer,
  MockAnswers,
  MockAttempt,
  MockQuestion,
  MockResult,
  PublicMockAttempt,
} from "./mock-types";
import { saveMockSchema } from "./mock-schema";
export class MockTransitionError extends Error {
  constructor(
    public status: number,
    message: string,
  ) {
    super(message);
  }
}
export function transitionMockAttempt(
  attempt: MockAttempt,
  now: number,
  operation: "read" | "save" | "submit",
  body?: unknown,
) {
  if (!attempt.result && now >= attempt.expiresAt) {
    attempt.result = gradeMock(attempt, attempt.expiresAt, "expired");
    attempt.revision++;
  }
  if (attempt.result) return publicMockAttempt(attempt, now);
  if (operation !== "read") {
    const input = saveMockSchema.parse(body);
    if (input.revision !== attempt.revision)
      throw new MockTransitionError(
        409,
        "This test changed in another tab. Reload the saved test before continuing.",
      );
    try {
      attempt.answers = normalizeMockAnswers(attempt.questions, input.answers);
    } catch (error) {
      throw new MockTransitionError(400, (error as Error).message);
    }
    attempt.revision++;
    if (operation === "submit")
      attempt.result = gradeMock(attempt, now, "manual");
  }
  return publicMockAttempt(attempt, now);
}
const numericPattern = /^[+-]?(?:\d+(?:\.\d*)?|\.\d+)(?:[eE][+-]?\d+)?$/;
export function normalizeMockAnswers(
  questions: MockQuestion[],
  incoming: MockAnswers,
): MockAnswers {
  const ids = new Set(questions.map((q) => q.id));
  if (Object.keys(incoming).some((id) => !ids.has(id)))
    throw new Error("Response contains a question outside this test.");
  const out: MockAnswers = {};
  for (const q of questions) {
    const answer = incoming[q.id];
    if (
      answer === undefined ||
      answer === null ||
      answer === "" ||
      (Array.isArray(answer) && !answer.length)
    )
      continue;
    if (q.type === "numerical") {
      if (
        typeof answer !== "string" ||
        answer.length > 64 ||
        !numericPattern.test(answer.trim()) ||
        !Number.isFinite(Number(answer))
      )
        throw new Error("Enter a valid finite numerical answer.");
      out[q.id] = answer.trim();
    } else if (q.type === "single") {
      if (
        typeof answer !== "number" ||
        !Number.isInteger(answer) ||
        answer < 0 ||
        answer >= q.options!.length
      )
        throw new Error("Choose one valid option.");
      out[q.id] = answer;
    } else {
      if (
        !Array.isArray(answer) ||
        new Set(answer).size !== answer.length ||
        answer.some(
          (n) => !Number.isInteger(n) || n < 0 || n >= q.options!.length,
        )
      )
        throw new Error("Choose valid, distinct options.");
      out[q.id] = [...answer].sort((a, b) => a - b);
    }
  }
  return out;
}
export function publicMockQuestion(q: MockQuestion) {
  return {
    id: q.id,
    topic: q.topic,
    type: q.type,
    difficulty: q.difficulty,
    prompt: q.prompt,
    ...(q.options ? { options: q.options } : {}),
  };
}
export function publicMockAttempt(
  a: MockAttempt,
  now: number,
): PublicMockAttempt {
  return {
    id: a.id,
    config: a.config,
    chapterTitle: a.chapterTitle,
    startedAt: a.startedAt,
    expiresAt: a.expiresAt,
    serverNow: now,
    revision: a.revision,
    questions: a.questions.map(publicMockQuestion),
    answers: a.answers,
    result: a.result,
    storage: "local-server",
    developmentSample: a.questions.some((q) => q.developmentSample),
  };
}
export function gradeMock(
  a: MockAttempt,
  now: number,
  reason: "manual" | "expired",
): MockResult {
  const answers = normalizeMockAnswers(a.questions, a.answers);
  const items = a.questions.map((q) => {
    const answer: MockAnswer = answers[q.id] ?? null;
    const correct =
      answer !== null &&
      (q.type === "numerical"
        ? Math.abs(Number(answer) - (q.correct as number)) <=
          (q.tolerance ?? 1e-6) +
            Number.EPSILON *
              Math.max(
                1,
                Math.abs(q.correct as number),
                Math.abs(Number(answer)),
              ) *
              4
        : q.type === "multiple"
          ? JSON.stringify(answer) ===
            JSON.stringify([...(q.correct as number[])].sort((x, y) => x - y))
          : answer === q.correct);
    const outcome =
      answer === null
        ? ("unattempted" as const)
        : correct
          ? ("correct" as const)
          : ("wrong" as const);
    return {
      question: publicMockQuestion(q),
      answer,
      correct: q.correct,
      ...(q.tolerance === undefined ? {} : { tolerance: q.tolerance }),
      explanation: q.explanation,
      source: q.source,
      verification: q.verification,
      outcome,
      marks: correct ? 4 : answer !== null && q.type === "single" ? -1 : 0,
    };
  });
  const count = (outcome: string) =>
    items.filter((x) => x.outcome === outcome).length;
  const topics = [...new Set(items.map((x) => x.question.topic))]
    .map((topic) => {
      const group = items.filter((x) => x.question.topic === topic);
      const correct = group.filter((x) => x.outcome === "correct").length;
      const wrong = group.filter((x) => x.outcome === "wrong").length;
      return {
        topic,
        total: group.length,
        correct,
        wrong,
        unattempted: group.length - correct - wrong,
        accuracy:
          correct + wrong
            ? Math.round((correct / (correct + wrong)) * 100)
            : null,
        status:
          !correct && !wrong
            ? ("not-attempted" as const)
            : wrong
              ? ("revise" as const)
              : ("practised" as const),
      };
    })
    .sort((x, y) => (x.accuracy ?? 101) - (y.accuracy ?? 101));
  return {
    attemptId: a.id,
    chapter: {
      className: a.config.className,
      subject: a.config.subject,
      chapter: a.config.chapter,
    },
    chapterTitle: a.chapterTitle,
    submittedAt: new Date(now).toISOString(),
    reason,
    totalMarks: items.length * 4,
    marksObtained: items.reduce((n, x) => n + x.marks, 0),
    accuracy:
      count("correct") + count("wrong")
        ? Math.round(
            (count("correct") / (count("correct") + count("wrong"))) * 100,
          )
        : 0,
    correct: count("correct"),
    wrong: count("wrong"),
    unattempted: count("unattempted"),
    timeTakenSeconds: Math.max(
      0,
      Math.min(
        Math.ceil((now - a.startedAt) / 1000),
        Math.ceil((a.expiresAt - a.startedAt) / 1000),
      ),
    ),
    items,
    topics,
  };
}
