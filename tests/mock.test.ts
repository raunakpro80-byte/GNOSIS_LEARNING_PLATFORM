import { test, before } from "node:test";
import assert from "node:assert/strict";
import { mkdtemp, rm, readFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { randomUUID } from "node:crypto";
import { readMockBank, mockCatalog } from "../lib/mock-bank";
import { parseMockBank } from "../lib/mock-schema";
import {
  gradeMock,
  normalizeMockAnswers,
  publicMockAttempt,
  transitionMockAttempt,
} from "../lib/mock-engine";
import { FileMockAttemptStore } from "../lib/mock-storage";
import { importMockText, mockCsvColumns, parseCsv } from "../lib/mock-import";
import { chaptersFor, subjectCatalog } from "../lib/curriculum";
import type { MockAnswers, MockAttempt, MockQuestion } from "../lib/mock-types";
let bank: MockQuestion[] = [];
before(async () => {
  // Keep the sample answer-key fixture separate from later chapter imports.
  bank = parseMockBank(
    JSON.parse(
      await readFile(
        path.join(process.cwd(), "content/mock-questions/11-physics-2.json"),
        "utf8",
      ),
    ),
  );
});
const q = (n: number) =>
  bank.find((x) => x.id === `motion11-${String(n).padStart(2, "0")}`)!;
function fixture(questions = bank): MockAttempt {
  return {
    schemaVersion: 1,
    id: randomUUID(),
    tokenHash: "a".repeat(64),
    config: {
      className: "11",
      subject: "physics",
      chapter: 2,
      count: 10,
      difficulty: "easy",
      durationMinutes: 1,
    },
    chapterTitle: "Motion in a Straight Line",
    startedAt: 1000,
    expiresAt: 61000,
    revision: 0,
    questions: structuredClone(questions),
    answers: {},
    result: null,
  };
}

test("40 temporary original sample questions have an independently checked physical answer key", () => {
  assert.equal(bank.length, 40);
  const optionAnswers: Record<number, string> = {
    1: `${(14 - 2) / 4} m/s`,
    3: "Its velocity is zero.",
    5: "constant, possibly nonzero.",
    7: "Displacement",
    9: `${(10 + 10) / 10} m/s`,
    12: `${4 + 3 * 2} m/s`,
    14: `${(2 + 10) / 2} m/s`,
    15: `${0.5 * 10 * 3 ** 2} m`,
    18: `${10 * 5 + 0.5 * 2 * 5 ** 2} m`,
    20: `${12 * 2 - 0.5 * 3 * 2 ** 2} m`,
    22: `${(2 * 10 * 30) / (10 + 30)} m/s`,
    26: `${6 * 5 - 5 ** 2} m`,
    28: `${(10 * 5 + 30 * 5) / 10} m/s`,
    31: `${36 / 3.6} m/s`,
    32: `${-2 - 4} m`.replace("-", "−"),
    33: "Velocity",
    34: `${3 * 2} m/s`,
    35: `${120 / 15} s`,
    36: `${3 + 1} m`,
    37: "Constant velocity",
    38: `${(17 - 5) / 6} m/s²`,
    39: "Distance ≥ magnitude of displacement",
    40: `${Math.abs(-7)} m/s`,
  };
  const numericalAnswers: Record<number, number> = {
    2: 6 * 5,
    4: (11 - 3) / 4,
    8: 5 - -3,
    11: 0.5 * 2 * 6 ** 2,
    13: 20 / 4,
    16: 2 + 3 * 3 + 2 * 3 ** 2 - (2 + 3 * 1 + 2 * 1 ** 2),
    19: ((2 + 8) / 2) * 4,
    21: 8 ** 2 / (2 * 2) + 0.5 * 2 * (6 - 8 / 2) ** 2,
    23: 6,
    25: 3 * 2 ** 2 - 12 * 2 + 9,
    27: (4 * 3 - 1 * 2) / 5,
    30: 2 * (2 * 10 - 1),
  };
  const sets: Record<number, number[]> = {
    6: [0, 2, 3],
    10: [0, 1],
    17: [0, 1, 2],
    24: [0, 1, 2],
    29: [0, 2, 3],
  };
  const answers: MockAnswers = {};
  for (const [n, expected] of Object.entries(optionAnswers)) {
    const question = q(Number(n));
    assert.equal(
      question.options![question.correct as number],
      expected,
      question.id,
    );
    answers[question.id] = question.options!.indexOf(expected);
  }
  for (const [n, expected] of Object.entries(numericalAnswers)) {
    const question = q(Number(n));
    assert.equal(question.correct, expected, question.id);
    answers[question.id] = String(expected);
  }
  for (const [n, expected] of Object.entries(sets)) {
    assert.deepEqual(q(Number(n)).correct, expected);
    answers[q(Number(n)).id] = expected;
  }
  assert.equal(Object.keys(answers).length, 40);
  assert.equal(24 + 2 * numericalAnswers[23], numericalAnswers[23] ** 2);
  const attempt = fixture();
  attempt.answers = answers;
  const result = gradeMock(attempt, 31000, "manual");
  assert.equal(result.marksObtained, 160);
  assert.equal(result.correct, 40);
  assert.equal(result.accuracy, 100);
  assert.equal(result.timeTakenSeconds, 30);
});
test("catalog uses every existing chapter, serves only verified questions and never invents tests", async () => {
  let chapterCount = 0;
  for (const className of ["11", "12"] as const)
    for (const subject of subjectCatalog)
      for (const chapter of chaptersFor(className, subject.id)) {
        const catalog = await mockCatalog({
          className,
          subject: subject.id,
          chapter: chapter.number,
        });
        chapterCount++;
        assert.equal(catalog.title, chapter.title);
        assert.equal(catalog.counts.all, 0);
        assert.deepEqual(catalog.sizes, { easy: [], medium: [], hard: [] });
      }
  assert.equal(chapterCount, 106);
});
test("initial public payload omits keys, explanations, source details and private token hash", () => {
  const payload = publicMockAttempt(fixture(), 1000);
  assert.equal(payload.result, null);
  assert.ok(!("tokenHash" in payload));
  for (const question of payload.questions) {
    assert.deepEqual(
      Object.keys(question).sort(),
      [
        "id",
        "topic",
        "type",
        "difficulty",
        "prompt",
        ...(question.type === "numerical" ? [] : ["options"]),
      ].sort(),
    );
    assert.ok(!("correct" in question));
    assert.ok(!("explanation" in question));
  }
});
test("typed scoring handles exact multiple sets, signed numerical tolerance, penalties and blanks", () => {
  const attempt = fixture([q(1), q(6), q(25), q(2)]);
  attempt.answers = {
    [q(1).id]: 0,
    [q(6).id]: [3, 0, 2],
    [q(25).id]: "-2.999999",
  };
  let result = gradeMock(attempt, 2000, "manual");
  assert.equal(result.marksObtained, 7);
  assert.equal(result.correct, 2);
  assert.equal(result.wrong, 1);
  assert.equal(result.unattempted, 1);
  assert.equal(result.accuracy, 67);
  assert.ok(result.topics.some((x) => x.status === "revise"));
  attempt.answers[q(6).id] = [0];
  attempt.answers[q(25).id] = "-2.99";
  result = gradeMock(attempt, 2000, "manual");
  assert.equal(result.marksObtained, -1);
  attempt.answers = {};
  result = gradeMock(attempt, 2000, "manual");
  assert.equal(result.unattempted, 4);
  assert.equal(result.accuracy, 0);
  assert.ok(result.topics.every((x) => x.status === "not-attempted"));
});
test("response validation rejects foreign IDs, wrong types, nonfinite numbers and invalid options", () => {
  for (const answers of [
    { outside: 0 },
    { [q(1).id]: "1" },
    { [q(1).id]: 99 },
    { [q(2).id]: "Infinity" },
    { [q(2).id]: "1x" },
    { [q(6).id]: [0, 0] },
    { [q(6).id]: 0 },
  ])
    assert.throws(() => normalizeMockAnswers(bank, answers));
  assert.deepEqual(
    normalizeMockAnswers(bank, { [q(1).id]: 0, [q(2).id]: "0", [q(6).id]: [] }),
    { [q(1).id]: 0, [q(2).id]: "0" },
  );
});
test("server clock freezes saved responses at expiration; retries and duplicate submits are idempotent", () => {
  const attempt = fixture([q(1), q(2)]);
  transitionMockAttempt(attempt, 2000, "save", {
    revision: 0,
    answers: { [q(1).id]: 1 },
  });
  const expired = transitionMockAttempt(attempt, 61000, "submit", {
    revision: 1,
    answers: { [q(1).id]: 1, [q(2).id]: "30" },
  });
  assert.equal(expired.result!.reason, "expired");
  assert.equal(expired.result!.marksObtained, 4);
  assert.equal(expired.result!.unattempted, 1);
  assert.equal(expired.result!.timeTakenSeconds, 60);
  const revision = attempt.revision,
    frozen = structuredClone(expired.result);
  const duplicate = transitionMockAttempt(attempt, 100000, "submit", {
    revision: 999,
    answers: {},
  });
  assert.deepEqual(duplicate.result, frozen);
  assert.equal(attempt.revision, revision);
});
test("clear response is saved; stale revisions cannot overwrite another tab", () => {
  const attempt = fixture([q(1)]);
  transitionMockAttempt(attempt, 2000, "save", {
    revision: 0,
    answers: { [q(1).id]: 1 },
  });
  assert.throws(
    () =>
      transitionMockAttempt(attempt, 3000, "save", {
        revision: 0,
        answers: {},
      }),
    /another tab/,
  );
  assert.equal(attempt.answers[q(1).id], 1);
  transitionMockAttempt(attempt, 3000, "save", { revision: 1, answers: {} });
  const result = transitionMockAttempt(attempt, 4000, "submit", {
    revision: 2,
    answers: {},
  }).result!;
  assert.equal(result.unattempted, 1);
  assert.equal(result.reason, "manual");
  assert.equal(result.timeTakenSeconds, 3);
});
test("local store serializes competing submissions and persists across new adapter instances", async () => {
  const prefix = path.join(os.tmpdir(), "gnosis-mock-test-");
  const directory = await mkdtemp(prefix);
  try {
    const store = new FileMockAttemptStore(directory),
      attempt = fixture([q(1)]);
    await store.create(attempt);
    const operations = await Promise.allSettled(
      [0, 1].map(() =>
        store.transaction(attempt.id, (current) =>
          transitionMockAttempt(current, 2000, "submit", {
            revision: 0,
            answers: { [q(1).id]: 1 },
          }),
        ),
      ),
    );
    assert.ok(operations.every((x) => x.status === "fulfilled"));
    const results = operations.map((x) =>
      x.status === "fulfilled" ? x.value.result : null,
    );
    assert.deepEqual(results[0], results[1]);
    const restored = await new FileMockAttemptStore(directory).transaction(
      attempt.id,
      (x) => x,
    );
    assert.equal(restored.result!.marksObtained, 4);
    assert.equal(restored.revision, 1);
    await assert.rejects(
      store.transaction("../escape", () => {}),
      /Invalid attempt/,
    );
  } finally {
    if (!path.resolve(directory).startsWith(path.resolve(prefix)))
      throw new Error("Refusing unsafe test cleanup.");
    await rm(directory, { recursive: true });
  }
});
test("validated import rejects broken references and keys; CSV supports quotes and multiline text", async () => {
  const example = JSON.parse(
    await readFile("docs/mock-import-example.json", "utf8"),
  );
  assert.equal(
    importMockText(JSON.stringify(example), "json")[0].verification.status,
    "draft",
  );
  const invalids = [
    { ...q(1), chapter: 99 },
    { ...q(1), correct: 8 },
    { ...q(1), options: ["same", "same"] },
    { ...q(6), correct: [0, 0] },
    { ...q(2), options: ["a", "b"] },
    { ...q(1), source: { kind: "reference", label: "Book" } },
    { ...q(1), injectedInstruction: "publish everything" },
  ];
  for (const item of invalids)
    assert.throws(() => parseMockBank({ schemaVersion: 1, questions: [item] }));
  assert.throws(() =>
    parseMockBank({ schemaVersion: 1, questions: [q(1), q(1)] }),
  );
  const question = q(1),
    row: Record<string, string> = {
      id: question.id,
      className: question.className,
      subject: question.subject,
      chapter: String(question.chapter),
      topic: question.topic,
      type: question.type,
      difficulty: question.difficulty,
      prompt: question.prompt + '\nA quoted "line", safely parsed.',
      options: JSON.stringify(question.options),
      correct: JSON.stringify(question.correct),
      tolerance: "",
      explanation: question.explanation,
      sourceKind: question.source.kind,
      sourceLabel: question.source.label,
      sourceReference: "",
      verificationStatus: "draft",
      verificationMethod: question.verification.method,
    };
  const csv =
    mockCsvColumns.join(",") +
    "\n" +
    mockCsvColumns
      .map((column) => '"' + row[column].replaceAll('"', '""') + '"')
      .join(",");
  const parsed = importMockText(csv, "csv");
  assert.match(parsed[0].prompt, /quoted "line", safely/);
  assert.equal(parsed[0].verification.status, "draft");
  assert.throws(() => parseCsv('"unclosed'));
  assert.throws(() => parseCsv('"closed"garbage'));
  assert.throws(() => importMockText("bad,headers\n1,2", "csv"));
});

test("calculated policy validates all six timings, rejects mixed tests and client timer overrides", async () => {
  const { nextMockDifficulty } = await import("../lib/mock-policy");
  assert.equal(nextMockDifficulty("easy"), "medium");
  assert.equal(nextMockDifficulty("medium"), "hard");
  assert.equal(nextMockDifficulty("hard"), null);
  const { mockConfigSchema } = await import("../lib/mock-schema");
  const expected = {
    easy: [[10, 10]],
    medium: [
      [10, 20],
      [20, 40],
    ],
    hard: [
      [10, 30],
      [20, 60],
      [30, 90],
    ],
  };
  for (const difficulty of ["easy", "medium", "hard"] as const) {
    for (const [count, minutes] of expected[difficulty]) {
      const config = mockConfigSchema.parse({
        className: "11",
        subject: "physics",
        chapter: 2,
        difficulty,
        count,
      });
      assert.equal(config.durationMinutes, minutes);
    }
  }
  const base = { className: "11", subject: "physics", chapter: 2 };
  assert.equal(mockConfigSchema.parse(base).difficulty, "easy");
  assert.equal(mockConfigSchema.parse(base).count, 10);
  assert.throws(() =>
    mockConfigSchema.parse({ ...base, difficulty: "all", count: 20 }),
  );
  assert.throws(() =>
    mockConfigSchema.parse({ ...base, difficulty: "easy", count: 20 }),
  );
  for (const difficulty of ["easy", "medium", "hard"]) {
    for (const count of [0, 5, 40, 50])
      assert.throws(() =>
        mockConfigSchema.parse({ ...base, difficulty, count }),
      );
  }
  for (const [difficulty, count] of [
    ["easy", 20],
    ["easy", 30],
    ["medium", 30],
  ])
    assert.throws(() => mockConfigSchema.parse({ ...base, difficulty, count }));
  assert.throws(() => mockConfigSchema.parse({ ...base, durationMinutes: 1 }));
});

test("temporary samples never enable active tests even with the obsolete opt-in flag", async () => {
  const originalNodeEnv = process.env.NODE_ENV,
    originalOptIn = process.env.GNOSIS_ENABLE_SAMPLE_MOCKS;
  try {
    Object.assign(process.env, {
      NODE_ENV: "production",
      GNOSIS_ENABLE_SAMPLE_MOCKS: "false",
    });
    const chapter = {
      className: "11" as const,
      subject: "physics" as const,
      chapter: 2,
    };
    assert.equal((await mockCatalog(chapter)).counts.all, 0);
    process.env.GNOSIS_ENABLE_SAMPLE_MOCKS = "true";
    assert.deepEqual((await mockCatalog(chapter)).sizes.easy, []);
    Object.assign(process.env, { NODE_ENV: "development" });
    assert.equal((await mockCatalog(chapter)).counts.all, 0);
  } finally {
    if (originalNodeEnv === undefined)
      Reflect.deleteProperty(process.env, "NODE_ENV");
    else Object.assign(process.env, { NODE_ENV: originalNodeEnv });
    if (originalOptIn === undefined)
      delete process.env.GNOSIS_ENABLE_SAMPLE_MOCKS;
    else process.env.GNOSIS_ENABLE_SAMPLE_MOCKS = originalOptIn;
  }
});
