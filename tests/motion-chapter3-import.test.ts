import { test } from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { createHash } from "node:crypto";
import { spawnSync } from "node:child_process";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { importMockText, mockCsvColumns } from "../lib/mock-import";
import {
  readMockBank,
  mockCatalog,
  mockCatalogFromBank,
  verifiedChapterQuestions,
} from "../lib/mock-bank";
import { chapterTitle } from "../lib/mock-schema";
import { mockCountsByDifficulty, mockDuration } from "../lib/mock-policy";
import { gradeMock, publicMockAttempt } from "../lib/mock-engine";
import type { MockAttempt } from "../lib/mock-types";

const file = "content/mock-questions/11-physics-3-owner-draft.json";
const reviewFile = "docs/question-banks/11-physics-3-import-review.json";
const chapter = { className: "11", subject: "physics", chapter: 3 } as const;
const levels = ["easy", "medium", "hard"] as const;
const load = async () => importMockText(await readFile(file, "utf8"), "json");
const review = async () => JSON.parse(await readFile(reviewFile, "utf8"));
const sha = (s: Buffer) => createHash("sha256").update(s).digest("hex");
type Value = number | number[];
type Check = [() => Value, Value[]];
const close = (a: Value, b: Value): boolean =>
  typeof a === "number" && typeof b === "number"
    ? Math.abs(a - b) < 1e-9 * Math.max(1, Math.abs(a), Math.abs(b))
    : Array.isArray(a) &&
      Array.isArray(b) &&
      a.length === b.length &&
      a.every((v, i) => close(v, b[i]));
const hypot = Math.hypot,
  sqrt = Math.sqrt,
  pi = Math.PI;
const conceptual: Record<string, string> = {
  E001: "Displacement",
  E006: "Vertically downward",
  E007: "Vertical component",
  E009: "v²/r",
};
// Independent formulas and numerical meanings of every listed option.
// H012 and H028 values use the intended convention; a separate ambiguity test
// proves why their wording still needs correction before academic approval.
const calculations: Record<string, Check> = {
  E002: [() => hypot(0.6, 0.8), [0.2, 1, 1.4, 2]],
  E003: [() => 5, [-2, -5, 5, 2]],
  E004: [() => 4 + 7, [3, sqrt(65), 28, 11]],
  E005: [
    () => [2 - 2, 6 - -1],
    [
      [0, 7],
      [7, 0],
      [0, 5],
      [0, -7],
    ],
  ],
  E008: [() => 9 + 0 * 1, [0, 19, 4.5, 9]],
  E010: [() => 8 / 2, [16, 4, 6, 0.25]],
  M001: [
    () => [9 / hypot(9, 12), 12 / hypot(9, 12)],
    [
      [9 / 12, 1],
      [3 / 5, 4 / 5],
      [4 / 5, 3 / 5],
      [3 / 5, -4 / 5],
    ],
  ],
  M002: [() => hypot(8, 15), [23, 7, 17, sqrt(161)]],
  M003: [() => 3 * (3 + 4) - 2 * (-2 + 5), [2, 13, 28, 15]],
  M004: [() => -(2 * -6) / 3, [4, -4, 2, -2]],
  M005: [() => 6 * 10 * Math.sin(pi / 6), [60, 30, 15, 30 * sqrt(3)]],
  M006: [() => (2 * (25 * Math.sin(pi / 6))) / 10, [1.25, 5, 2.5, 4.33]],
  M007: [() => (20 * Math.sin(pi / 6)) ** 2 / 20, [10, 20, 2.5, 5]],
  M008: [() => (20 ** 2 * Math.sin(pi / 2)) / 10, [40, 20, 20 * sqrt(2), 80]],
  M009: [() => 20 * Math.cos(pi / 3) * 3, [60, 30, 30 * sqrt(3), 10]],
  M010: [() => 30 * Math.sin(pi / 6) * 2 - (10 * 2 ** 2) / 2, [20, 30, 10, 0]],
  M011: [() => sqrt((2 * 45) / 10), [4.5, sqrt(3), 9, 3]],
  M012: [() => 12 * sqrt((2 * 20) / 10), [24, 12, 48, 20]],
  M013: [
    () => hypot(6, sqrt(2 * 10 * 5)),
    [16, 2 * sqrt(34), 4 * sqrt(6), sqrt(34)],
  ],
  M014: [() => (5 * 3 + 12 * 4) / hypot(3, 4), [13, 63 / 25, 63 / 5, 12]],
  M015: [() => hypot(4 - 2 + 3, -3 + 7 - 8), [sqrt(29), 5, 9, sqrt(41)]],
  M016: [
    () => sqrt(10 ** 2 + 10 ** 2 + 2 * 10 * 10 * Math.cos((2 * pi) / 3)),
    [10, 20, 10 * sqrt(3), 5],
  ],
  M017: [
    () => 2 * ((2 * pi) / 2) ** 2,
    [pi ** 2, 2 * pi ** 2, 4 * pi ** 2, 2 * pi],
  ],
  M018: [
    () => 0.5 * (2 * pi * 3) ** 2,
    [6 * pi ** 2, 9 * pi ** 2, 18 * pi ** 2, 3 * pi],
  ],
  M019: [() => 2 * pi * 0.4 * (10 / 5), [0.8 * pi, 4 * pi, 2 * pi, 1.6 * pi]],
  M020: [
    () => 0.5 * 2 * ((2 * pi) / 2) ** 2,
    [pi ** 2, 2 * pi ** 2, 0.5 * pi ** 2, 4 * pi ** 2],
  ],
  H001: [
    () => (Math.acos((39 - 5 ** 2 - 7 ** 2) / (2 * 5 * 7)) * 180) / pi,
    [60, 90, 120, 150],
  ],
  H002: [
    () => [
      10 + 6 * Math.cos((2 * pi) / 3) + 6 * Math.cos((4 * pi) / 3),
      6 * Math.sin((2 * pi) / 3) + 6 * Math.sin((4 * pi) / 3),
    ],
    [
      [10, 0],
      [-4, 0],
      [16, 0],
      [4, 0],
    ],
  ],
  H003: [
    () => sqrt(5 ** 2 - (3 - 2) ** 2) - 4,
    [sqrt(24) - 4, -sqrt(24) - 4, 1, sqrt(26) - 4],
  ],
  H004: [() => (4 ** 2 + 6 ** 2 - 28) / 2, [-12, 12, 24, 6]],
  H005: [() => hypot(12, 16), [28, 4, 20, sqrt(112)]],
  H006: [() => 6 * (200 / 8), [200, 250, 120, 150]],
  H007: [() => hypot(30 - 6, 10 - -8), [30, 42, sqrt(468), 24]],
  H008: [() => (10 * (1 + 5)) / 2, [20, 30, 15, 60]],
  H009: [() => (25 ** 2 - 15 ** 2) / 20, [10, 15, 20, 25]],
  H010: [
    () => {
      const a = (Math.asin((20 * sqrt(3) * 10) / 20 ** 2) * 90) / pi;
      return [a, 90 - a];
    },
    [
      [15, 75],
      [20, 70],
      [45, 45],
      [30, 60],
    ],
  ],
  H011: [
    () => {
      const t = 20 / (20 * Math.cos(pi / 4));
      return 20 * Math.sin(pi / 4) * t - 5 * t * t;
    },
    [10, 5, 15, 20],
  ],
  H012: [() => Math.abs((20 - 5) * sqrt((2 * 80) / 10)), [40, 60, 80, 100]],
  H013: [
    () => hypot((10 - -5) * 2, (20 - 10) * 2),
    [5 * sqrt(13), 20 * sqrt(13), 10 * sqrt(13), 30],
  ],
  H014: [() => sqrt(30 ** 2 - 2 * 10 * 25), [10, 25, sqrt(650), 20]],
  H015: [() => (12 ** 2 + 16 ** 2) / (16 * 10), [2.5, 1.6, 2, 4]],
  H016: [() => 10 * ((2 * 10) / 10), [10, 20, 10 * sqrt(2), 40]],
  H017: [
    () => (12 * (10 + sqrt(10 ** 2 + 2 * 10 * 45))) / 10,
    [12 * sqrt(10), 24, 12 * (1 + sqrt(10)), 12 * (1 + sqrt(5))],
  ],
  H018: [
    () => {
      const uy = 30 * Math.sin(pi / 6),
        disc = sqrt(uy ** 2 - 2 * 10 * 10);
      return [(uy - disc) / 10, (uy + disc) / 10];
    },
    [
      [0.5, 2.5],
      [1, 3],
      [2, 3],
      [1, 2],
    ],
  ],
  H019: [() => 100 * Math.sin(pi / 6), [50, 25, 100, 50 * sqrt(3)]],
  H020: [
    () => {
      const rx = 20,
        ry = 0,
        vx = -1 - 3,
        vy = 2 - 4;
      const t = -(rx * vx + ry * vy) / (vx * vx + vy * vy);
      return hypot(rx + vx * t, ry + vy * t);
    },
    [10, 4 * sqrt(5), 2 * sqrt(5), 20],
  ],
  H021: [() => 0.5 * (2 * 4) ** 2, [8, 16, 32, 64]],
  H022: [() => hypot(2 * 3 ** 2, 2 * 4), [26, 18, 8, 2 * sqrt(97)]],
  H023: [() => (2 * pi) / (pi / 6 + pi / 3), [4, 2, 6, 12]],
  H024: [() => hypot(10, 10) / (8 / 4), [10 * sqrt(2), 5 * sqrt(2), 5, 0]],
  H025: [() => 1 / (0.5 ** 2 * 4), [4, 1 / 4, 1, 2]],
  H026: [() => 2 * pi * sqrt(0.8 / (5 * pi * pi)), [0.4, 1.6, 2 * pi, 0.8]],
  H027: [
    () => (2 * 14 * Math.sin((3 * pi) / 4)) / ((3 * 2 * pi * 14) / 4),
    [(2 * sqrt(2)) / (3 * pi), 2 / (3 * pi), sqrt(2) / pi, 1 / 3],
  ],
  H028: [() => sqrt(20 ** 2 - (10 * 1.2) ** 2), [12, 16, 8, sqrt(544)]],
  H029: [() => sqrt(25 ** 2 - ((10 * 3) / 2) ** 2) * 1, [15, 25, 20, 10]],
  H030: [
    () => hypot((13 + 5) / 2, (13 - 5) / 2),
    [sqrt(119), 12, sqrt(169), sqrt(97)],
  ],
};

test("Chapter 3: 60 unique native-schema drafts, real curriculum identity, JSON/CSV importer round trips", async () => {
  const qs = await load();
  assert.equal(chapterTitle(chapter), "Motion in a Plane");
  assert.deepEqual(
    levels.map((d) => qs.filter((q) => q.difficulty === d).length),
    [10, 20, 30],
  );
  assert.equal(new Set(qs.map((q) => q.id)).size, 60);
  for (const q of qs) {
    assert.deepEqual(
      [q.className, q.subject, q.chapter, q.type, q.verification.status],
      ["11", "physics", 3, "single", "draft"],
    );
    assert.equal(q.options!.length, 4);
    assert.equal(new Set(q.options).size, 4);
    assert.equal(q.source.kind, "original");
    assert.match(q.source.label, /not official PYQs/);
  }
  const csvCell = (s: string) => '"' + s.replaceAll('"', '""') + '"';
  const rows = qs.map((q) => {
    const r: Record<string, string> = {
      id: q.id,
      className: q.className,
      subject: q.subject,
      chapter: String(q.chapter),
      topic: q.topic,
      type: q.type,
      difficulty: q.difficulty,
      prompt: q.prompt,
      options: JSON.stringify(q.options),
      correct: JSON.stringify(q.correct),
      tolerance: "",
      explanation: q.explanation,
      sourceKind: q.source.kind,
      sourceLabel: q.source.label,
      sourceReference: q.source.reference ?? "",
      verificationStatus: q.verification.status,
      verificationMethod: q.verification.method,
    };
    return mockCsvColumns.map((k) => csvCell(r[k])).join(",");
  });
  assert.deepEqual(
    importMockText([mockCsvColumns.join(","), ...rows].join("\n"), "csv"),
    qs,
  );
});

test("Chapter 3: independently calculate all 60 intended keys and compare all numerical distractors", async () => {
  assert.equal(
    Object.keys(calculations).length + Object.keys(conceptual).length,
    60,
  );
  for (const q of await load()) {
    const m = q.id.match(/-([EMH])-(\d{3})$/)!;
    const code = m[1] + m[2];
    if (calculations[code]) {
      const [solve, values] = calculations[code],
        answer = solve();
      assert.deepEqual(
        values.map((v, i) => (close(v, answer) ? i : -1)).filter((i) => i >= 0),
        [q.correct],
        q.id,
      );
    } else assert.equal(q.options![q.correct as number], conceptual[code]);
  }
});

test("Chapter 3: ambiguity/domain flags are real and cannot be dismissed by matching the intended key", async () => {
  // H012 has two possible meanings of target moving away from x=0.
  assert.equal(Math.abs(20 * 4 - 5 * 4), 60);
  assert.equal(Math.abs(20 * 4 - -5 * 4), 100);
  // H028 both signs satisfy every given speed/apex-time measurement.
  for (const ux of [16, -16]) {
    assert.equal(hypot(ux, 12), 20);
    assert.equal(12 / 10, 1.2);
  }
  assert.ok(16 * 2.5 - 5 * 2.5 ** 2 > 0); // H015: continuation caveat unnecessary.
  assert.ok((2 * 20 * Math.sin(pi / 3)) / 10 > 3); // corrected M009 still airborne.
  assert.ok(100 + 10 * 2 - 5 * 2 ** 2 > 0); // corrected H013 slower projectile airborne.
  const r = await review();
  for (const id of ["GNO-PHY11-C03-H-012", "GNO-PHY11-C03-H-028"]) {
    const record = r.questions.find((q: { id: string }) => q.id === id);
    assert.ok(record.flags.length);
    assert.ok(record.proposedCorrection);
    assert.equal(record.status, "draft");
  }
});

test("Chapter 3: preserve all seven prior banks byte-for-byte and reject duplicate import replay", async () => {
  const r = await review();
  assert.equal(r.preexistingFiles.length, 7);
  for (const f of r.preexistingFiles)
    assert.equal(sha(await readFile(f.file)), f.sha256, f.file);
  const before = await readMockBank();
  assert.equal(
    before.filter(
      (q) =>
        q.className === "11" &&
        q.subject === "physics" &&
        [1, 2].includes(q.chapter),
    ).length,
    190,
  );
  assert.equal(new Set(before.map((q) => q.id)).size, before.length);
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

test("Chapter 3: transparent review counts, duplicate flags, balanced options and readable escaped text", async () => {
  const qs = await load(),
    r = await review(),
    all = await readMockBank();
  assert.equal(r.questions.length, 60);
  assert.equal(
    r.questions.filter((q: { flags: string[] }) => q.flags.length).length,
    45,
  );
  assert.equal(r.semanticGroups.length, 2);
  assert.deepEqual(r.optionDistribution, {
    easy: { A: 3, B: 3, C: 2, D: 2 },
    medium: { A: 5, B: 5, C: 5, D: 5 },
    hard: { A: 7, B: 7, C: 8, D: 8 },
  });
  const norm = (s: string) =>
    s
      .toLowerCase()
      .replace(/[^\p{L}\p{N}]+/gu, " ")
      .trim();
  for (const q of qs) {
    for (const other of all)
      if (q.id !== other.id)
        assert.notEqual(
          norm(q.prompt),
          norm(other.prompt),
          `${q.id}/${other.id}`,
        );
    for (const text of [q.prompt, ...q.options!, q.explanation]) {
      assert.ok(!text.includes("\uFFFD"));
      assert.ok(!/\\\(|\\\[|\$\$/.test(text));
      const html = renderToStaticMarkup(createElement("span", null, text));
      assert.ok(html.length >= text.length); // plain-text escaping, no HTML injection.
    }
    const record = r.questions.find((a: { id: string }) => a.id === q.id);
    assert.equal(record.correctAnswer, q.options![q.correct as number]);
    assert.equal(record.academicApproval, "pending");
    if (record.flags.length)
      assert.ok(record.proposedCorrection || record.replacementBrief);
  }
});

test("Chapter 3: drafts never activate; simulated eligibility only enables exact chapter and difficulty", async () => {
  const c = await mockCatalog(chapter);
  assert.deepEqual(c.draftCounts, { all: 60, easy: 10, medium: 20, hard: 30 });
  assert.equal(c.approvedCounts.all, 0);
  assert.equal(c.sampleCounts.all, 0);
  assert.deepEqual(c.sizes, { easy: [], medium: [], hard: [] });
  assert.deepEqual(await verifiedChapterQuestions(chapter), []);
  const all = await readMockBank();
  for (const d of levels) {
    const simulated = all.map((q) => ({
      ...q,
      verification: {
        ...q.verification,
        status:
          q.chapter === 3 && q.difficulty === d
            ? ("verified" as const)
            : ("draft" as const),
      },
    }));
    const catalog = mockCatalogFromBank(chapter, simulated);
    assert.deepEqual(catalog.sizes[d], [...mockCountsByDifficulty[d]]);
    for (const other of levels)
      if (other !== d) assert.deepEqual(catalog.sizes[other], []);
    for (const previous of [1, 2])
      assert.equal(
        mockCatalogFromBank({ ...chapter, chapter: previous }, simulated)
          .approvedCounts.all,
        0,
      );
  }
});

test("Chapter 3: all six configurations retain exact difficulty, timers, hidden keys and +4/-1/0", async () => {
  const qs = await load(),
    timers = { easy: [10], medium: [20, 40], hard: [30, 60, 90] };
  for (const d of levels)
    for (const [i, count] of mockCountsByDifficulty[d].entries()) {
      const questions = qs
        .filter((q) => q.chapter === 3 && q.difficulty === d)
        .slice(0, count);
      assert.equal(questions.length, count);
      assert.equal(new Set(questions.map((q) => q.id)).size, count);
      assert.equal(mockDuration(d, count), timers[d][i]);
      const attempt: MockAttempt = {
        schemaVersion: 1,
        id: "chapter3-review-only",
        tokenHash: "not-live",
        config: {
          ...chapter,
          difficulty: d,
          count,
          durationMinutes: timers[d][i],
        },
        chapterTitle: "Motion in a Plane",
        startedAt: 0,
        expiresAt: timers[d][i] * 60000,
        revision: 0,
        questions,
        answers: {},
        result: null,
      };
      const publicPayload = JSON.stringify(publicMockAttempt(attempt, 1000));
      assert.ok(!publicPayload.includes('"correct"'));
      assert.ok(!publicPayload.includes('"explanation"'));
      assert.equal(gradeMock(attempt, 1000, "manual").unattempted, count);
      assert.equal(gradeMock(attempt, 1000, "manual").marksObtained, 0);
      attempt.answers = Object.fromEntries(
        questions.map((q) => [q.id, q.correct]),
      );
      assert.equal(gradeMock(attempt, 1000, "manual").marksObtained, count * 4);
      assert.equal(gradeMock(attempt, 1000, "manual").accuracy, 100);
      attempt.answers = Object.fromEntries(
        questions.map((q) => [q.id, ((q.correct as number) + 1) % 4]),
      );
      assert.equal(gradeMock(attempt, 1000, "manual").marksObtained, -count);
    }
});
