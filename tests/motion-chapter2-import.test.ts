import { test } from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { createHash } from "node:crypto";
import { spawnSync } from "node:child_process";
import { importMockText } from "../lib/mock-import";
import {
  readMockBank,
  mockCatalog,
  mockCatalogFromBank,
  verifiedChapterQuestions,
} from "../lib/mock-bank";
import { mockCountsByDifficulty, mockDuration } from "../lib/mock-policy";
import { gradeMock, publicMockAttempt } from "../lib/mock-engine";
import type { MockAttempt } from "../lib/mock-types";

const file = "content/mock-questions/11-physics-2-owner-draft.json";
const reviewFile = "docs/question-banks/11-physics-2-import-review.json";
const chapter = { className: "11", subject: "physics", chapter: 2 } as const;
const levels = ["easy", "medium", "hard"] as const;
const load = async () => importMockText(await readFile(file, "utf8"), "json");
const review = async () => JSON.parse(await readFile(reviewFile, "utf8"));
const sha = (data: string | Buffer) =>
  createHash("sha256").update(data).digest("hex");
type Value = number | number[];
type Check = [() => Value, Value[]];
const pathLength = (position: (t: number) => number, times: number[]) =>
  times
    .slice(1)
    .reduce((sum, t, i) => sum + Math.abs(position(t) - position(times[i])), 0);
const close = (a: Value, b: Value): boolean =>
  typeof a === "number" && typeof b === "number"
    ? Math.abs(a - b) <= 1e-9 * Math.max(1, Math.abs(a), Math.abs(b))
    : Array.isArray(a) &&
      Array.isArray(b) &&
      a.length === b.length &&
      a.every((v, i) => close(v, b[i]));

// Independent calculation and numerical meanings of ALL distractors, not an
// answer-key echo. Pair-valued options must match both physical quantities.
const calculations: Record<string, Check> = {
  E001: [() => 9 - 4, [5, 13, -5, -13]],
  E002: [() => 6 + 8, [2, 14, 8, 6]],
  E004: [() => 2 + 3 * 4, [10, 12, 14, 16]],
  E007: [() => (10 * 2 ** 2) / 2, [10, 15, 20, 40]],
  E009: [() => (8 - 24) / 4, [-4, 4, -8, 8]],
  M001: [() => 2 / (1 / 12 + 1 / 18), [15, 14.4, 16, 13.5]],
  M002: [() => (2 * 6 ** 2) / 2 + 2 * 6 * 4, [72, 80, 84, 96]],
  M003: [() => 5 * 4 + (3 * 4 ** 2) / 2, [32, 36, 40, 44]],
  M004: [() => (20 * (20 / 4)) / 2, [40, 50, 60, 80]],
  M005: [() => (2 * 3 ** 2 - 3 * 3 + 4 - (2 - 3 + 4)) / 2, [3, 4, 5, 6]],
  M006: [() => (6 * 12) / 2, [18, 24, 36, 72]],
  M007: [() => 30 * 4 - (10 * 4 ** 2) / 2, [20, 40, -40, 80]],
  M008: [() => 3 * (5 - 4) + (5 ** 2 - 4 ** 2), [10, 11, 12, 13]],
  M009: [() => (10 + 20 + 30) / 3, [15, 18, 20, 24]],
  M010: [() => pathLength((t) => t * t - 6 * t + 8, [0, 3, 5]), [4, 9, 13, 17]],
  M011: [() => 4 * 3 - 2 * 5, [0, 2, 4, -2]],
  M012: [() => 4 * 4 - 2 * 2, [12, 16, 20, -12]],
  M013: [() => (180 + 120) / (90 / 3.6), [7.2, 10, 12, 15]],
  M014: [() => 100 / (30 - 20), [5, 8, 10, 20]],
  M015: [() => (20 ** 2 - 8 ** 2) / (2 * 84), [1, 2, 3, 4]],
  M016: [() => (10 / 2) * (3 ** 2 - 2 ** 2), [15, 20, 25, 35]],
  M017: [
    () => pathLength((t) => 12 * t - 2 * t * t, [0, 3, 5]),
    [10, 18, 22, 26],
  ],
  M018: [() => 2 * 4 - 3 * 2, [-2, 0, 2, 14]],
  M019: [() => 60 * (2 / 60), [1, 1.5, 2, 3]],
  M020: [() => (6 * 20 + 15 * 10) / 30, [8, 9, 10.5, 12]],
  H001: [
    () => pathLength((t) => t ** 3 - 6 * t * t + 9 * t, [0, 1, 3, 4]),
    [4, 8, 12, 16],
  ],
  H002: [
    () => pathLength((t) => 3 * t * t - t ** 3 / 3, [0, 6, 8]),
    [44, 52, 152 / 3, 64],
  ],
  H003: [
    () => pathLength((t) => t ** 3 - 9 * t * t + 24 * t, [0, 2, 4, 6]),
    [36, 40, 44, 52],
  ],
  H004: [
    () => (30 + Math.sqrt(30 ** 2 + 2 * 10 * 40)) / 10,
    [
      3 + Math.sqrt(17),
      3 + Math.sqrt(13),
      6 + Math.sqrt(17),
      Math.sqrt(17) - 3,
    ],
  ],
  H005: [() => ((2 * 5) / 2) * 5 + 10 * 8 + (10 / 2) * 5, [105, 120, 130, 150]],
  H006: [() => 25 * 0.8 + 25 ** 2 / (2 * 5), [62.5, 75, 82.5, 100]],
  H007: [() => 2 * 2 + 2 ** 3 - 2 * 2 ** 2, [0, 4, 6, 8]],
  H008: [() => (10 / 2) * ((3 + 2) ** 2 - 2 ** 2), [65, 75, 85, 105]],
  H009: [() => (3 * 12) / 2 + (2 * 12) / 2 + (1 * 6) / 2, [27, 30, 33, 36]],
  H010: [
    () => (8 + Math.sqrt(8 ** 2 + 4 * 48)) / 2,
    [12, 8 + 4 * Math.sqrt(7), 4 + 8 * Math.sqrt(2), 4 + 4 * Math.sqrt(7)],
  ],
  H011: [
    () => ((30 + (30 - 2 * 5)) * 5) / 2 + 20 ** 2 / 8,
    [125, 150, 175, 200],
  ],
  H012: [() => (5 ** 2 - 4 ** 2) / 5 ** 2, [5 / 25, 7 / 25, 9 / 25, 11 / 25]],
  H013: [() => 15 - 3.5 * ((23 - 15) / 2), [-1, 1, 3, 5]],
  H014: [
    () => (-10 + Math.sqrt(100 + 4 * 300)) / 2,
    [10, 5 * (Math.sqrt(13) - 1), 10 * (Math.sqrt(3) - 1), 15],
  ],
  H015: [
    () => [-16, Math.sqrt(4)],
    [
      [-16, 2],
      [-8, 2],
      [-16, 4],
      [0, 0],
    ],
  ],
  H016: [
    () =>
      pathLength((t) => 10 * t - t * t, [0, 5, 8]) +
      pathLength((t) => -6 * t + 2 * t * t, [0, 1.5, 3]),
    [34, 38, 40, 43],
  ],
  H017: [
    () => (15 + Math.sqrt(15 ** 2 + 4 * 1.5 * 60)) / 3,
    [
      5 + Math.sqrt(65),
      5 + Math.sqrt(65) / 2,
      10 + Math.sqrt(65),
      5 + Math.sqrt(105),
    ],
  ],
  H018: [
    () => [6 * 3 + 4 * 5 + 2 * 4, 6 * 3 - 4 * 5 + 2 * 4],
    [
      [46, 6],
      [46, 14],
      [36, 6],
      [42, -6],
    ],
  ],
  H019: [() => 1 / (0.5 / 24 + 0.25 / 36 + 0.25 / 72), [32, 36, 288 / 7, 40]],
  H020: [
    () => {
      const g = 15 / ((1 + 3) / 2 - 1 / 2);
      return [(g * (1 + 3)) / 2, g];
    },
    [
      [20, 10],
      [15, 5],
      [25, 10],
      [30, 10],
    ],
  ],
  H021: [
    () => Math.sqrt(10 ** 2 + 2 * 5 ** 2),
    [5 * Math.sqrt(6), 5 * Math.sqrt(5), 5 * Math.sqrt(7), 10 * Math.sqrt(6)],
  ],
  H022: [
    () => [0, pathLength((t) => t * t - 4 * t, [0, 2, 4]) / 4],
    [
      [0, 2],
      [2, 2],
      [0, 4],
      [-2, 2],
    ],
  ],
  H023: [() => (2 / 3) * (3 ** 3 - 1 ** 3), [40 / 3, 52 / 3, 56 / 3, 64 / 3]],
  H024: [
    () => pathLength((t) => t ** 3 / 3 - 2 * t * t + 3 * t, [0, 1, 3, 4]),
    [4, 16 / 3, 20 / 3, 8],
  ],
  H025: [() => 45 / 20, [1.5, 2.25, 3, 4.5]],
  H026: [() => -3 + 2 ** 2 + 2, [1, 2, 3, 4]],
  H027: [() => 60 - 10 ** 2 / 4, [0, 0, 0, 35]],
  H028: [() => Math.sqrt(30), [Math.sqrt(15), Math.sqrt(30), 15, 30]],
  H029: [() => (6 ** 2 - 4 ** 2) / 6 ** 2, [4 / 9, 5 / 9, 2 / 3, 7 / 9]],
  H030: [
    () => [(2 * 3 ** 2) / 2 + ((6 + 0) * 6) / 2 + (3 * 2 ** 2) / 2, -3 * 2],
    [
      [21, -6],
      [33, -6],
      [33, 6],
      [27, -6],
    ],
  ],
};
const conceptual: Record<string, string> = {
  E003: "m/s²",
  E005: "object at rest",
  E006: "towards negative x",
  E008: "displacement",
  E010: "velocity is zero, acceleration is downward",
};

test("Chapter 2: exactly 60 unique draft records, correct identity and native importer", async () => {
  const questions = await load();
  assert.deepEqual(
    levels.map((d) => questions.filter((q) => q.difficulty === d).length),
    [10, 20, 30],
  );
  assert.equal(new Set(questions.map((q) => q.id)).size, 60);
  for (const q of questions) {
    assert.deepEqual(
      [q.className, q.subject, q.chapter, q.type, q.verification.status],
      ["11", "physics", 2, "single", "draft"],
    );
    assert.equal(q.options!.length, 4);
    assert.equal(new Set(q.options).size, 4);
    assert.equal(q.source.kind, "original");
    assert.match(q.source.label, /not official PYQs/);
    assert.equal(q.developmentSample, undefined);
    const report = (await review()).questions.find(
      (r: { id: string }) => r.id === q.id,
    );
    assert.equal(report.correctAnswer, q.options![q.correct as number]);
    assert.equal(report.status, "draft");
    assert.equal(report.humanReview, "pending");
  }
  // The archive format is intentionally not silently accepted without mapping.
  assert.throws(() =>
    importMockText(
      JSON.stringify({
        schemaVersion: "1.0-draft",
        questions: [{ chapterId: "TO_BE_MAPPED" }],
      }),
      "json",
    ),
  );
});

test("Chapter 2: independently recomputed answers and exactly one matching option for all 60", async () => {
  const questions = await load();
  assert.equal(
    Object.keys(calculations).length + Object.keys(conceptual).length,
    60,
  );
  for (const q of questions) {
    const [, level, n] = q.id.match(/-([EMH])-(\d{3})$/)!;
    const code = level + n;
    if (calculations[code]) {
      const [solve, choices] = calculations[code];
      const answer = solve();
      const hits = choices
        .map((v, i) => (close(answer, v) ? i : -1))
        .filter((i) => i >= 0);
      assert.deepEqual(
        hits,
        [q.correct],
        `${q.id}: independently evaluated options`,
      );
    } else {
      assert.equal(q.options![q.correct as number], conceptual[code]);
    }
  }
  // Additional physical-domain checks, not just option values.
  assert.ok((10 * 5 ** 2) / 2 < 130); // H008: both still in flight.
  assert.ok(45 - 5 * (45 / 20) ** 2 > 0); // H025: meeting before impact.
  for (let t = 0; t <= 20; t += 0.1) {
    assert.ok(60 - 10 * t + t * t > 0); // H027 no physical meeting.
    assert.ok(t ** 4 - 8 * t * t >= -16 - 1e-10); // H015 lower bound.
  }
});

test("Chapter 2: preservation hashes protect every preexisting question bank", async () => {
  const r = await review();
  assert.equal(r.preexistingFiles.length, 6);
  for (const item of r.preexistingFiles)
    assert.equal(
      sha(await readFile(item.file)),
      item.sha256,
      `${item.file} must stay byte-for-byte unchanged`,
    );
  const all = await readMockBank();
  assert.equal(
    all.filter(
      (q) =>
        q.className === "11" &&
        q.subject === "physics" &&
        [1, 2].includes(q.chapter),
    ).length,
    190,
  );
  assert.equal(new Set(all.map((q) => q.id)).size, all.length);
});

test("Chapter 2: review flags, key distribution and semantic duplicate dispositions are explicit", async () => {
  const r = await review();
  assert.equal(r.questions.length, 60);
  assert.equal(
    r.questions.filter((q: { flags: string[] }) => q.flags.length).length,
    49,
  );
  assert.equal(r.semanticGroups.length, 11);
  assert.equal(
    r.questions
      .filter((q: { flags: string[] }) => q.flags.length)
      .every((q: { proposalBrief: string }) => !!q.proposalBrief),
    true,
  );
  assert.deepEqual(r.optionDistribution, {
    easy: { A: 3, B: 4, C: 3, D: 0 },
    medium: { A: 1, B: 6, C: 11, D: 2 },
    hard: { A: 10, B: 8, C: 9, D: 3 },
  });
  const all = await readMockBank();
  const norm = (s: string) =>
    s
      .toLowerCase()
      .replace(/[^\p{L}\p{N}]+/gu, " ")
      .trim();
  for (const q of await load())
    for (const other of all)
      if (q.id !== other.id)
        assert.notEqual(
          norm(q.prompt),
          norm(other.prompt),
          `${q.id} / ${other.id}`,
        );
});

test("Chapter 2: zero eligible questions, 60 drafts, 40 separate samples, all configurations gated", async () => {
  const c = await mockCatalog(chapter);
  assert.deepEqual(c.draftCounts, { all: 60, easy: 10, medium: 20, hard: 30 });
  assert.deepEqual(c.sampleCounts, { all: 40, easy: 20, medium: 10, hard: 10 });
  assert.equal(c.approvedCounts.all, 0);
  assert.deepEqual(c.sizes, { easy: [], medium: [], hard: [] });
  assert.deepEqual(await verifiedChapterQuestions(chapter), []);
  // In-memory technical gate simulation only; NEVER write approved content.
  const bank = await load();
  for (const difficulty of levels) {
    const simulated = bank
      .filter((q) => q.difficulty === difficulty)
      .map((q) => ({
        ...q,
        verification: { ...q.verification, status: "verified" as const },
      }));
    const sizes = mockCatalogFromBank(chapter, simulated).sizes;
    assert.deepEqual(sizes[difficulty], [
      ...mockCountsByDifficulty[difficulty],
    ]);
    for (const other of levels)
      if (other !== difficulty) assert.deepEqual(sizes[other], []);
  }
});

test("Chapter 2: all six timers and scoring preserve keys hidden until submission", async () => {
  const bank = await load();
  const minutes = { easy: [10], medium: [20, 40], hard: [30, 60, 90] };
  for (const difficulty of levels)
    for (const [i, count] of mockCountsByDifficulty[difficulty].entries()) {
      assert.equal(mockDuration(difficulty, count), minutes[difficulty][i]);
      const questions = bank
        .filter((q) => q.difficulty === difficulty)
        .slice(0, count);
      assert.equal(questions.length, count);
      assert.equal(new Set(questions.map((q) => q.id)).size, count);
      const attempt: MockAttempt = {
        schemaVersion: 1,
        id: "chapter2-review-only",
        tokenHash: "not-live",
        config: {
          ...chapter,
          difficulty,
          count,
          durationMinutes: minutes[difficulty][i],
        },
        chapterTitle: "Motion in a Straight Line",
        startedAt: 0,
        expiresAt: minutes[difficulty][i] * 60000,
        revision: 0,
        questions,
        answers: {},
        result: null,
      };
      const active = JSON.stringify(publicMockAttempt(attempt, 1000));
      assert.ok(!active.includes('"correct"'));
      assert.ok(!active.includes('"explanation"'));
      assert.equal(gradeMock(attempt, 1000, "manual").unattempted, count);
      attempt.answers = Object.fromEntries(
        questions.map((q) => [q.id, q.correct]),
      );
      const correct = gradeMock(attempt, 1000, "manual");
      assert.equal(correct.marksObtained, 4 * count);
      assert.equal(correct.accuracy, 100);
      attempt.answers = Object.fromEntries(
        questions.map((q) => [q.id, ((q.correct as number) + 1) % 4]),
      );
      assert.equal(gradeMock(attempt, 1000, "manual").marksObtained, -count);
    }
});

test("Chapter 2: importer replay rejects existing IDs without writing a second bank", async () => {
  const before = await readMockBank();
  const replay = spawnSync(
    process.execPath,
    [
      "node_modules/tsx/dist/cli.mjs",
      "scripts/import-mock-questions.ts",
      "--input",
      file,
      "--write",
    ],
    { encoding: "utf8" },
  );
  assert.equal(replay.status, 1);
  assert.match(replay.stderr, /question ID already exists/);
  assert.deepEqual(await readMockBank(), before);
});
