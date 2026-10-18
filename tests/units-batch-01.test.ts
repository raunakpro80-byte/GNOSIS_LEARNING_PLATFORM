import { before, test } from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { parseMockBank } from "../lib/mock-schema";
import { importMockText } from "../lib/mock-import";
import {
  mockCatalog,
  readMockBank,
  verifiedChapterQuestions,
} from "../lib/mock-bank";
import { chaptersFor } from "../lib/curriculum";
import type { MockQuestion } from "../lib/mock-types";

let batch: MockQuestion[];
before(async () => {
  const raw = await readFile(
    "content/mock-questions/11-physics-1-easy-batch-01.json",
    "utf8",
  );
  batch = importMockText(raw, "json");
  assert.deepEqual(batch, parseMockBank(JSON.parse(raw)));
});
const selected = (n: number) =>
  batch[n - 1].options![batch[n - 1].correct as number];
function expectOnly(n: number, predicate: (option: string) => boolean) {
  const matches = batch[n - 1].options!.map(predicate);
  assert.equal(
    matches.filter(Boolean).length,
    1,
    `Question ${n}: exactly one physically correct option`,
  );
  assert.equal(
    matches[batch[n - 1].correct as number],
    true,
    `Question ${n}: answer key`,
  );
}
type Dimension = [number, number, number];
const add = (a: Dimension, b: Dimension): Dimension =>
  a.map((v, i) => v + b[i]) as Dimension;
const subtract = (a: Dimension, b: Dimension): Dimension =>
  a.map((v, i) => v - b[i]) as Dimension;
const scale = (a: Dimension, n: number): Dimension =>
  a.map((v) => v * n) as Dimension;
function dimension(option: string): Dimension {
  const result: Dimension = [0, 0, 0];
  for (const token of option.slice(1, -1).split(" ")) {
    const match = /^([MLT])(?:\^(-?\d+))?$/.exec(token);
    assert.ok(match, `Invalid dimensional notation: ${option}`);
    result["MLT".indexOf(match[1])] = Number(match[2] ?? 1);
  }
  return result;
}

test("Units Batch 1: 20 unique original single-correct Easy drafts map to the existing chapter", async () => {
  assert.equal(batch.length, 20);
  assert.equal(chaptersFor("11", "physics")[0].title, "Units and Measurements");
  for (const [i, question] of batch.entries()) {
    assert.equal(
      question.id,
      `gnosis-11-physics-01-easy-${String(i + 1).padStart(3, "0")}`,
    );
    assert.equal(question.className, "11");
    assert.equal(question.subject, "physics");
    assert.equal(question.chapter, 1);
    assert.equal(question.type, "single");
    assert.equal(question.difficulty, "easy");
    assert.equal(question.options!.length, 4);
    assert.equal(new Set(question.options).size, 4);
    assert.equal(question.verification.status, "draft");
    assert.equal(question.source.kind, "original");
    assert.match(question.source.label, /not official PYQs/);
    assert.match(question.verification.method, /review.*pending/i);
  }
  const all = await readMockBank();
  assert.equal(new Set(all.map((q) => q.id)).size, all.length);
});

test("Units Batch 1: mechanical dimensions independently follow defining relations", () => {
  const M: Dimension = [1, 0, 0],
    L: Dimension = [0, 1, 0],
    T: Dimension = [0, 0, 1];
  const velocity = subtract(L, T),
    acceleration = subtract(velocity, T);
  const force = add(M, acceleration),
    energy = add(force, L);
  const expected: Record<number, Dimension> = {
    2: subtract(M, scale(L, 3)),
    3: add(M, velocity),
    4: acceleration,
    5: subtract(force, L),
    6: subtract(energy, M),
  };
  for (const [n, value] of Object.entries(expected))
    expectOnly(
      Number(n),
      (option) => JSON.stringify(dimension(option)) === JSON.stringify(value),
    );
});

test("Units Batch 1: conversions, significant figures, least count and uncertainty calculations", () => {
  function scientific(option: string, unit: string, expected: number) {
    const match = /^([\d.]+) × 10\^(-?\d+) (.+)$/.exec(option);
    return (
      !!match &&
      match[3] === unit &&
      Math.abs(Number(match[1]) * 10 ** Number(match[2]) - expected) <
        expected * 1e-12
    );
  }
  expectOnly(10, (option) => scientific(option, "s", 3.2 / 1_000_000));
  expectOnly(11, (option) => scientific(option, "m^3", 2.5 * (1 / 100) ** 3));
  const significantDigits = "0.005060"
    .replace(".", "")
    .replace(/^0+/, "").length;
  expectOnly(12, (option) => Number(option) === significantDigits);
  expectOnly(13, (option) => option === `${(12.34 + 1.2).toFixed(1)} cm`);
  expectOnly(14, (option) => option === `${(1.0 - 0.9).toFixed(1)} mm`);
  expectOnly(
    15,
    (option) => Number(option.replace("%", "")) === (0.5 / 50.0) * 100,
  );
  expectOnly(
    16,
    (option) =>
      option === `${(2.4 - 0.02).toFixed(2)} m to ${(2.4 + 0.02).toFixed(2)} m`,
  );
  expectOnly(17, (option) => option === `${(1.28 - 0.03).toFixed(2)} cm`);
});

test("Units Batch 1: conceptual keys are unambiguous and uncertainty does not claim certainty", () => {
  const expected: Record<number, string> = {
    1: "mole",
    7: "It is dimensionless, with the special SI unit name radian.",
    8: "x + vt",
    9: "A pure numerical multiplier",
    18: "Its numerical value becomes 100 times larger, while its dimensions remain L.",
    19: "Low accuracy and high precision",
    20: "Time",
  };
  for (const [n, value] of Object.entries(expected))
    expectOnly(Number(n), (option) => option === value);
  assert.match(
    batch[15].explanation,
    /does not assert a confidence level or guarantee/,
  );
  assert.equal(selected(12), "4");
});

test("Units Batch 1: no exact or high lexical-similarity duplicate against existing banks", async () => {
  const all = await readMockBank();
  const normalized = (text: string) =>
    text
      .toLowerCase()
      .replace(/[^\p{L}\p{N}]+/gu, " ")
      .trim();
  const stop = new Set(
    "a an the of is in to and which what its for with as by are from has be it this that".split(
      " ",
    ),
  );
  const tokens = (text: string) =>
    new Set(
      normalized(text)
        .split(" ")
        .filter((word) => !stop.has(word)),
    );
  for (const q of batch)
    for (const other of all) {
      if (q.id === other.id) continue;
      assert.notEqual(
        normalized(q.prompt),
        normalized(other.prompt),
        `Exact duplicate: ${q.id}, ${other.id}`,
      );
      const a = tokens(q.prompt),
        b = tokens(other.prompt);
      const intersection = [...a].filter((word) => b.has(word)).length;
      const similarity = intersection / new Set([...a, ...b]).size;
      assert.ok(
        similarity < 0.65,
        `Review similar prompts: ${q.id}, ${other.id}, Jaccard=${similarity}`,
      );
    }
});

test("Units Batch 1: drafts cannot enable any chapter test or enter a verified question pool", async () => {
  const chapter = { className: "11", subject: "physics", chapter: 1 } as const;
  const catalog = await mockCatalog(chapter);
  assert.deepEqual(catalog.counts, { all: 0, easy: 0, medium: 0, hard: 0 });
  assert.deepEqual(catalog.sizes, { easy: [], medium: [], hard: [] });
  assert.deepEqual(await verifiedChapterQuestions(chapter), []);
});
