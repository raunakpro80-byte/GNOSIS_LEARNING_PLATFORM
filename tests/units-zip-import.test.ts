import { before, test } from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { importMockText } from "../lib/mock-import";
import {
  readMockBank,
  mockCatalog,
  mockCatalogFromBank,
  verifiedChapterQuestions,
} from "../lib/mock-bank";
import { mockCountsByDifficulty, mockDuration } from "../lib/mock-policy";
import { gradeMock, publicMockAttempt } from "../lib/mock-engine";
import type { Difficulty, MockQuestion, MockAttempt } from "../lib/mock-types";
const levels = ["easy", "medium", "hard"] as const;
let banks: Record<Difficulty, MockQuestion[]>;
before(async () => {
  banks = Object.fromEntries(
    await Promise.all(
      levels.map(async (level) => [
        level,
        importMockText(
          await readFile(
            `content/mock-questions/11-physics-1-zip-${level}.json`,
            "utf8",
          ),
          "json",
        ),
      ]),
    ),
  ) as typeof banks;
});
test("Curated ZIP lineage: all 60 IDs, chapter mappings and draft levels are retained", async () => {
  assert.deepEqual(
    levels.map((l) => banks[l].length),
    [10, 20, 30],
  );
  for (const level of levels)
    for (const [i, q] of banks[level].entries()) {
      assert.equal(
        q.id,
        `phy11-units-dimensions-${level}-${String(i + 1).padStart(3, "0")}`,
      );
      assert.deepEqual(
        [q.className, q.subject, q.chapter, q.difficulty],
        ["11", "physics", 1, level],
      );
      assert.equal(q.type, "single");
      assert.equal(q.verification.status, "draft");
      assert.equal(q.source.kind, "original");
      assert.match(q.source.label, /not official PYQs/);
      assert.equal(q.options!.length, 4);
      assert.equal(new Set(q.options).size, 4);
    }
  const all = await readMockBank();
  assert.equal(new Set(all.map((q) => q.id)).size, all.length);
});
test("Curated chapter: no exact or lexical near-duplicate stem across any difficulty", async () => {
  const all = await readMockBank();
  const normal = (s: string) =>
    s
      .toLowerCase()
      .replace(/[^\p{L}\p{N}]+/gu, " ")
      .trim();
  const stop = new Set(
    "a an the of is in to and which what its for with as by are from has be it this that".split(
      " ",
    ),
  );
  const words = (s: string) =>
    new Set(
      normal(s)
        .split(" ")
        .filter((w) => !stop.has(w)),
    );
  for (const q of all.filter(
    (q) => q.className === "11" && q.subject === "physics" && q.chapter === 1,
  ))
    for (const other of all) {
      if (q.id === other.id) continue;
      assert.notEqual(normal(q.prompt), normal(other.prompt));
      const a = words(q.prompt),
        b = words(other.prompt);
      assert.ok(
        [...a].filter((w) => b.has(w)).length / new Set([...a, ...b]).size <
          0.65,
        `${q.id}, ${other.id}`,
      );
    }
});
test("Curated chapter remains wholly inactive; simulated approved catalogs isolate difficulty and preserve all six timers", async () => {
  const chapter = { className: "11", subject: "physics", chapter: 1 } as const;
  const catalog = await mockCatalog(chapter);
  assert.deepEqual(catalog.draftCounts, {
    all: 90,
    easy: 40,
    medium: 20,
    hard: 30,
  });
  assert.equal(catalog.approvedCounts.all, 0);
  assert.deepEqual(catalog.sizes, { easy: [], medium: [], hard: [] });
  assert.deepEqual(await verifiedChapterQuestions(chapter), []);
  for (const level of levels) {
    const fixtures = banks[level].map((q) => ({
      ...q,
      verification: { ...q.verification, status: "verified" as const },
    }));
    const preview = mockCatalogFromBank(chapter, fixtures);
    assert.deepEqual(preview.sizes[level], [...mockCountsByDifficulty[level]]);
    for (const other of levels)
      if (other !== level) assert.deepEqual(preview.sizes[other], []);
    for (const n of mockCountsByDifficulty[level])
      assert.equal(
        mockDuration(level, n),
        n * { easy: 1, medium: 2, hard: 3 }[level],
      );
  }
});
test("Rebalanced answer keys: pure server scoring awards +4/-1/0 and hides every active solution", () => {
  for (const difficulty of levels) {
    const questions = banks[difficulty];
    const count = questions.length as 10 | 20 | 30;
    const attempt: MockAttempt = {
      schemaVersion: 1,
      id: "review-only",
      tokenHash: "not-a-live-token",
      config: {
        className: "11",
        subject: "physics",
        chapter: 1,
        difficulty,
        count,
        durationMinutes: mockDuration(difficulty, count),
      },
      chapterTitle: "Units and Measurements",
      startedAt: 0,
      expiresAt: mockDuration(difficulty, count) * 60000,
      revision: 0,
      questions,
      answers: {},
      result: null,
    };
    const payload = JSON.stringify(publicMockAttempt(attempt, 1000));
    assert.ok(!payload.includes('"correct"'));
    assert.ok(!payload.includes('"explanation"'));
    const blank = gradeMock(attempt, 1000, "manual");
    assert.equal(blank.marksObtained, 0);
    assert.equal(blank.unattempted, count);
    attempt.answers = Object.fromEntries(
      questions.map((q) => [q.id, q.correct]),
    );
    const full = gradeMock(attempt, 1000, "manual");
    assert.equal(full.marksObtained, count * 4);
    assert.equal(full.accuracy, 100);
    assert.equal(full.correct, count);
    attempt.answers = Object.fromEntries(
      questions.map((q) => [q.id, ((q.correct as number) + 1) % 4]),
    );
    const wrong = gradeMock(attempt, 1000, "manual");
    assert.equal(wrong.marksObtained, -count);
    assert.equal(wrong.wrong, count);
  }
});
