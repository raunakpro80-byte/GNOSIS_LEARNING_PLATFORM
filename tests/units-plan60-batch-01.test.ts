import { before, test } from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { importMockText } from "../lib/mock-import";
import {
  readMockBank,
  mockCatalog,
  verifiedChapterQuestions,
} from "../lib/mock-bank";
import { chapterTitle } from "../lib/mock-schema";
import type { MockQuestion } from "../lib/mock-types";

let batch: MockQuestion[];
before(async () => {
  batch = importMockText(
    await readFile(
      "content/mock-questions/11-physics-1-plan60-easy-batch-01.json",
      "utf8",
    ),
    "json",
  );
});
function only(n: number, matches: (option: string) => boolean) {
  const q = batch[n - 1];
  const indices = q.options!.flatMap((option, i) =>
    matches(option) ? [i] : [],
  );
  assert.deepEqual(
    indices,
    [q.correct],
    `Question ${n}: exactly one correct option`,
  );
}
test("60-plan Easy Batch 1: ten original four-option drafts use existing chapter identity", () => {
  assert.equal(batch.length, 10);
  for (const [i, q] of batch.entries()) {
    assert.equal(
      q.id,
      `gnosis-11-physics-01-plan60-easy-${String(i + 1).padStart(3, "0")}`,
    );
    assert.equal(q.className, "11");
    assert.equal(q.subject, "physics");
    assert.equal(q.chapter, 1);
    assert.equal(chapterTitle(q), "Units and Measurements");
    assert.equal(q.difficulty, "easy");
    assert.equal(q.type, "single");
    assert.equal(q.options!.length, 4);
    assert.equal(new Set(q.options).size, 4);
    assert.equal(q.verification.status, "draft");
    assert.match(q.verification.method, /academic review.*pending/);
    assert.equal(q.source.kind, "original");
    assert.match(q.source.label, /not official PYQs/);
    assert.match(q.explanation, /^1\. .+\n2\. .+\n3\. .+/);
  }
});
test("60-plan Easy Batch 1: mean, multiplication, screw pitch and strain keys independently calculated", () => {
  only(1, (o) => o === `${((12.2 + 12.4 + 12.3) / 3).toFixed(1)} mm`);
  only(2, (o) => o === `${Number((2.4 * 1.32).toPrecision(2))} cm^2`);
  only(4, (o) => o === `${(0.5 / 50).toFixed(3)} mm`);
  const strain = 0.2 / 100;
  only(7, (o) => {
    const m = /^([\d.]+) × 10\^(-?\d+)$/.exec(o);
    return !!m && Math.abs(Number(m[1]) * 10 ** Number(m[2]) - strain) < 1e-14;
  });
});
test("60-plan Easy Batch 1: dimensional exponents, base force unit, uncertainty and area scaling", () => {
  const coefficient = [0, 1, 0].map((v, i) => v - 3 * [0, 0, 1][i]);
  assert.deepEqual(coefficient, [0, 1, -3]);
  only(5, (o) => o === "[L T^-3]");
  // F = mass * acceleration; the base-unit exponents are kg^1 m^1 s^-2.
  const units: Record<string, number[]> = {
    "kg m s^-2": [1, 1, -2],
    "kg m^2 s^-2": [1, 2, -2],
    "kg m s^-1": [1, 1, -1],
    "kg m^-1 s^-2": [1, -1, -2],
  };
  only(
    6,
    (o) =>
      JSON.stringify(units[o]) ===
      JSON.stringify([1, 0, 0].map((v, i) => v + [0, 1, -2][i])),
  );
  only(
    8,
    (o) => o === `(${(18 - 6).toFixed(1)} ± ${(0.1 + 0.2).toFixed(1)}) cm`,
  );
  only(9, (o) => Number(o) === 36 / 2 ** 2);
  const quotient = [1, 1, -1].map((v, i) => v - [1, 1, -2][i]);
  assert.deepEqual(quotient, [0, 0, 1]);
  only(10, (o) => o === "s");
  only(
    3,
    (o) =>
      o ===
      "No, because an exact count does not limit the significant figures.",
  );
  assert.match(
    batch[7].explanation,
    /worst-case convention, not a statistical confidence interval/,
  );
});
test("60-plan Easy Batch 1: exact and lexical near-duplicate screening against every bank", async () => {
  const all = await readMockBank();
  assert.equal(new Set(all.map((q) => q.id)).size, all.length);
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
  for (const q of batch)
    for (const other of all) {
      if (q.id === other.id) continue;
      assert.notEqual(normal(q.prompt), normal(other.prompt));
      const a = words(q.prompt),
        b = words(other.prompt);
      const similarity =
        [...a].filter((w) => b.has(w)).length / new Set([...a, ...b]).size;
      assert.ok(
        similarity < 0.65,
        `Review possible duplicate: ${q.id}, ${other.id}, ${similarity}`,
      );
    }
});
test("60-plan Easy Batch 1: saved drafts never enter active pools or enable any test size", async () => {
  const chapter = { className: "11", subject: "physics", chapter: 1 } as const;
  const catalog = await mockCatalog(chapter);
  assert.deepEqual(catalog.counts, { all: 0, easy: 0, medium: 0, hard: 0 });
  assert.equal(catalog.draftCounts.easy, 40); // 20 earlier drafts + 10 plan drafts + 10 owner ZIP drafts.
  assert.deepEqual(catalog.sizes, { easy: [], medium: [], hard: [] });
  assert.deepEqual(await verifiedChapterQuestions(chapter), []);
});
