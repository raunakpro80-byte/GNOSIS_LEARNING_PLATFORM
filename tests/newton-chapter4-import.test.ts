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
import { chapterTitle } from "../lib/mock-schema";
import { mockCountsByDifficulty, mockDuration } from "../lib/mock-policy";
import { gradeMock, publicMockAttempt } from "../lib/mock-engine";
import type { MockAttempt } from "../lib/mock-types";

const file = "content/mock-questions/11-physics-4-owner-draft.json";
const reportFile = "docs/question-banks/11-physics-4-import-review.json";
const proposalFile =
  "docs/question-banks/11-physics-4-proposed-corrections.json";
const chapter = { className: "11", subject: "physics", chapter: 4 } as const;
const levels = ["easy", "medium", "hard"] as const;
const load = async () => importMockText(await readFile(file, "utf8"), "json");
const report = async () => JSON.parse(await readFile(reportFile, "utf8"));
const sqrt = Math.sqrt,
  hypot = Math.hypot;
type Value = number | number[];
type Check = [() => Value, Value[]];
const close = (a: Value, b: Value): boolean =>
  typeof a === "number" && typeof b === "number"
    ? Math.abs(a - b) < 1e-9 * Math.max(1, Math.abs(a), Math.abs(b))
    : Array.isArray(a) &&
      Array.isArray(b) &&
      a.length === b.length &&
      a.every((v, i) => close(v, b[i]));
const concepts: Record<string, string> = {
  E001: "0 N",
  E003: "The water pushes the swimmer forwards",
  E005: "N·s",
  E008: "The net external force is zero",
  E009: "Kinetic friction",
};
// Recomputed force/impulse/constraint equations and numerical interpretation
// of every distractor. Ambiguous source cases are checked under their intended
// motion model here, then explicitly counter-tested below.
const calculations: Record<string, Check> = {
  E002: [() => 18 / 6, [108, 3, 12, 0.33]],
  E004: [() => 5 * 4, [1.25, 9, 80, 20]],
  E006: [() => 3 * 10, [0.3, 30, 13, 300]],
  E007: [() => 2 * 10, [-20, 2, 20, 0]],
  E010: [() => -9, [9, -9, 18, 0]],
  M001: [() => 5 * (28 / (2 + 5)), [8, 20, 12, 28]],
  M002: [() => 4 * (10 + 3), [28, 40, 52, 12]],
  M003: [() => 10 * 0.5, [10, 3, 8.66, 5]],
  M004: [() => (26 - 0.25 * 4 * 10) / 4, [4, 6.5, 9, 2.5]],
  M005: [() => Math.abs(0.25 * (-6 - 14)), [2, 5, 3.5, 20]],
  M006: [() => 0.5 * 5 * 16, [16, 24, 40, 80]],
  M007: [() => ((7 - 3) * 10) / (7 + 3), [2, 10, 7, 4]],
  M008: [() => 3 * (10 + 2), [36, 24, 30, 6]],
  M009: [() => (30 * 0.5) / 5, [6, 3, 5.2, 1.5]],
  M010: [() => 3 * 5 + 2 * -4, [23, -7, 7, 0]],
  M011: [() => (1200 * (10 - 25)) / 5, [-1800, -6000, 3600, -3600]],
  M012: [() => (25 * 0.8 - 0.2 * (5 * 10 - 25 * 0.6)) / 5, [2.6, 3.6, 4, 5]],
  M013: [() => 3 * ((2 * 10) / (3 + 2)), [8, 12, 20, 18]],
  M014: [() => (4 * 3 + 3 ** 2) / 2, [7.5, 9, 10.5, 21]],
  M015: [() => 60 * (10 - 2), [600, 720, 120, 480]],
  M016: [
    () => 10 * (0.5 - (0.2 * sqrt(3)) / 2),
    [5 - sqrt(3), 5 + sqrt(3), 5, 10 - sqrt(3)],
  ],
  M017: [() => (0.15 * 24) / 0.03, [80, 120, 180, 12]],
  M018: [
    () => 20 / (0.5 + (sqrt(3) / 2) * sqrt(3)),
    [20, 10 * sqrt(3), 10, 20 * sqrt(3)],
  ],
  M019: [() => hypot(12, 16) / 5, [5.6, 2.4, 20, 4]],
  M020: [() => 8 / (2 * 10), [0.4, 0.8, 0.2, 4]],
  H001: [
    () => {
      const a = (50 - 0.1 * 4 * 10 - 0.3 * 6 * 10) / 10;
      return 6 * a + 0.3 * 6 * 10;
    },
    [28, 16.8, 34.8, 50],
  ],
  H002: [
    () => 40 - 4 * ((40 - 20 - 2 * sqrt(3)) / 8),
    [30 - sqrt(3), 20 + 2 * sqrt(3), 40, 30 + sqrt(3)],
  ],
  H003: [
    () => {
      const ge = 10 + 2,
        a = ((6 - 4) * ge) / 10;
      return 4 * (ge + a);
    },
    [57.6, 48, 60, 67.2],
  ],
  H004: [
    () => 0.5 * ((70 - 9) / 7 - 9 / 3) * 2 ** 2,
    [40 / 7, 80 / 7, 20 / 7, 14],
  ],
  H005: [() => 3 + 3 ** 3 / 3 - 3 ** 2 / 2, [6, 9, 7.5, 10.5]],
  H006: [
    () => {
      const a1 = 10 / 2,
        v = 2 * a1;
      return (a1 * 2 ** 2) / 2 + v * 4 + ((-5 / 2) * 4 ** 2) / 2;
    },
    [0, 20, 50, 30],
  ],
  H007: [
    () => -10 * (0.5 / (sqrt(3) / 2)),
    [-10 / sqrt(3), 10 / sqrt(3), -5, 5 * sqrt(3)],
  ],
  H008: [
    () => 50 / (0.5 + (0.4 * sqrt(3)) / 2),
    [100 / (1 - 0.4 * sqrt(3)), 100 / (1 + 0.4 * sqrt(3)), 125, 50],
  ],
  H009: [
    () => (8 * 10 - 100 * 0.5 - (0.25 * 100 * sqrt(3)) / 2) / 8,
    [
      (30 + 12.5 * sqrt(3)) / 8,
      (80 - 50 * sqrt(3)) / 8,
      (30 - 12.5 * sqrt(3)) / 8,
      (50 - 12.5 * sqrt(3)) / 8,
    ],
  ],
  H010: [
    () => ((5 * 10 * sqrt(3)) / 2 - 2 * 10 * 0.5) / 7,
    [
      (25 * sqrt(3) + 10) / 7,
      (10 * sqrt(3) - 25) / 7,
      (25 * sqrt(3) - 10) / 3,
      (25 * sqrt(3) - 10) / 7,
    ],
  ],
  H011: [() => ((6 - 2 * 2) * 10) / (6 + 4 * 2), [10 / 7, 20 / 7, 10 / 3, 0]],
  H012: [
    () => (20 * 500 - (1000 - 20 * 20) * 10) / (1000 - 20 * 20),
    [10 / 3, 20 / 3, 50 / 3, 10],
  ],
  H013: [() => -(1 * 30) / (9 + 1), [-30, -10 / 3, -3, 3]],
  H014: [() => (2 * 10) / 0.8, [20, 16, 32, 25]],
  H015: [
    () => 20 ** 2 / (2 * 10 * (0.5 + (0.25 * sqrt(3)) / 2)),
    [
      80 / (2 + 0.5 * sqrt(3)),
      40 / (2 - 0.5 * sqrt(3)),
      40 / (2 + 0.5 * sqrt(3)),
      80 / (2 - 0.5 * sqrt(3)),
    ],
  ],
  H016: [
    () => {
      const ts = (0.5 * 4 * 10 - 10) / 4;
      return (4 ** 2 - ts ** 2) / 2;
    },
    [4, 39 / 8, 25 / 8, 8],
  ],
  H017: [
    () => 4 + 2 * ((60 - 4 - 12) / (2 + 4 + 6)),
    [22 / 3, 16, 34 / 3, 44 / 3],
  ],
  H018: [() => 0.5 * ((20 - 4) / 2 - 4 / 5) * 1 ** 2, [1.8, 7.2, 0, 3.6]],
  H019: [
    () => hypot(2 * 1 ** 2, 2 * 1) / 10,
    [sqrt(2) / 5, 1 / 5, 2 / 5, sqrt(2) / 10],
  ],
  H020: [() => 5 * hypot(6 ** 2 / 10, 2), [18, 2 * sqrt(106), 10, 26]],
  H021: [
    () => {
      const p = (3 * 10 * 0.6) / 0.8;
      return 3 * 10 * 0.8 + p * 0.6;
    },
    [24, 30, 37.5, 22.5],
  ],
  H022: [
    () => {
      const f = 0.25 * 4 * 10,
        a = (30 - f) / 4,
        v = a * 4;
      return (a * 4 ** 2) / 2 + (v * v) / ((2 * f) / 4);
    },
    [80, 40, 160, 120],
  ],
  H023: [
    () => {
      const a = (5 * 10 - 0.2 * 3 * 10) / 8,
        vsq = 2 * a * 2;
      return vsq / (2 * 0.2 * 10);
    },
    [5.5, 2.75, 11, 4],
  ],
  H024: [
    () => {
      const a = ((6 - 4) * 10) / 10;
      return (2 * a * 1) / (2 * 10);
    },
    [0.4, 0.2, 1, 2],
  ],
  H025: [
    () => {
      const ge = 13,
        a = (3 * ge - 2 * ge * 0.5) / 5;
      return 3 * (ge - a);
    },
    [13, 18.2, 23.4, 39],
  ],
  H026: [() => Math.atan(0.5), [0, Math.PI / 4, Math.atan(2), Math.atan(0.5)]],
  H027: [
    () => {
      const v1 = (2 * 10) / 10;
      return (10 * v1 + 1 * 8) / 9;
    },
    [28 / 9, 2, 20 / 9, -28 / 9],
  ],
  H028: [
    () => (10 * 0.5 + (6 * sqrt(3)) / 2) / ((10 * sqrt(3)) / 2 - 6 * 0.5),
    [
      (5 - 3 * sqrt(3)) / (5 * sqrt(3) + 3),
      (5 + 3 * sqrt(3)) / (5 * sqrt(3) - 3),
      (5 + 3 * sqrt(3)) / (5 * sqrt(3) + 3),
      (5 * sqrt(3) - 3) / (5 + 3 * sqrt(3)),
    ],
  ],
  H029: [
    () => 0.5 * (60 / 40 + 60 / 60) * 0.5 ** 2 + (60 / 40 + 60 / 60) * 0.5 * 2,
    [2.5, 0.3125, 2.8125, 3.125],
  ],
  H030: [() => 10 ** 2 / (2 * ((5 + 0.25 * 2 * 10) / 2)), [20, 15, 25, 10]],
};

test("Chapter 4: native importer, exact curriculum identity,60 unique drafts and balanced source keys", async () => {
  const qs = await load();
  assert.equal(chapterTitle(chapter), "Laws of Motion");
  assert.deepEqual(
    levels.map((d) => qs.filter((q) => q.difficulty === d).length),
    [10, 20, 30],
  );
  assert.equal(new Set(qs.map((q) => q.id)).size, 60);
  for (const q of qs) {
    assert.deepEqual(
      [q.className, q.subject, q.chapter, q.type, q.verification.status],
      ["11", "physics", 4, "single", "draft"],
    );
    assert.equal(q.options!.length, 4);
    assert.equal(new Set(q.options).size, 4);
    assert.equal(q.source.kind, "original");
    assert.match(q.source.label, /not official PYQs/);
  }
  const r = await report();
  assert.deepEqual(r.optionDistribution, {
    easy: { A: 3, B: 3, C: 2, D: 2 },
    medium: { A: 5, B: 5, C: 5, D: 5 },
    hard: { A: 7, B: 7, C: 8, D: 8 },
  });
});

test("Chapter 4: recalculate all60 intended keys and all numerical distractors", async () => {
  assert.equal(
    Object.keys(calculations).length + Object.keys(concepts).length,
    60,
  );
  for (const q of await load()) {
    const m = q.id.match(/-([EMH])-(\d{3})$/)!,
      code = m[1] + m[2];
    if (calculations[code]) {
      const [solve, values] = calculations[code],
        a = solve();
      assert.deepEqual(
        values.map((v, i) => (close(a, v) ? i : -1)).filter((i) => i >= 0),
        [q.correct],
        q.id,
      );
    } else assert.equal(q.options![q.correct as number], concepts[code]);
  }
});

test("Chapter 4: friction ambiguity, optimization, breakaway and no-reversal constraints are explicit", async () => {
  assert.equal((26 - 10) / 4, 4);
  assert.equal((26 + 10) / 4, 9); // M004 two valid source choices.
  const angle = Math.atan(0.5),
    aRight = (20 * (Math.cos(angle) + 0.5 * Math.sin(angle)) - 25) / 5;
  assert.ok(aRight < 0);
  assert.ok(close(aRight, sqrt(20) - 5));
  const leftSlidingAcceleration = (t: number) =>
    (20 * Math.cos(t) + 0.5 * (50 - 20 * Math.sin(t))) / 5;
  assert.ok(leftSlidingAcceleration(0) > leftSlidingAcceleration(angle));
  assert.ok(50 - 20 * Math.sin(angle) > 0); // H026 contact.
  assert.ok(3 * (70 / 10) > 0.4 * 3 * 10); // H004 sticking fails.
  assert.ok(5 * (20 / 7) > 0.5 * 2 * 10); // H018 sticking fails.
  assert.ok(0.4 * 2 * 10 > 5); // H030 stops then sticks, never slides right.
  assert.ok(5 * sqrt(3) - 3 > 0); // H028 positive normal.
  const fmin = 100 / (1 + 0.4 * sqrt(3)),
    fmax = 100 / (1 - 0.4 * sqrt(3));
  assert.ok(fmin > 0 && fmin < fmax);
  const r = await report();
  for (const code of ["M004", "M012", "H001", "H022", "H026"]) {
    const item = r.questions.find(
      (q: { id: string }) =>
        q.id === `GNO-PHY11-C04-${code[0]}-${code.slice(1)}`,
    );
    assert.ok(item.flags.length);
    assert.equal(item.completeProposedRevisionAvailable, true);
    assert.equal(item.status, "draft");
  }
});

test("Chapter 4: all prior eight banks byte-preserved and reimport cannot duplicate IDs", async () => {
  const r = await report();
  assert.equal(r.preexistingFiles.length, 8);
  for (const f of r.preexistingFiles)
    assert.equal(
      createHash("sha256")
        .update(await readFile(f.file))
        .digest("hex"),
      f.sha256,
      f.file,
    );
  const before = await readMockBank();
  assert.equal(
    before.filter(
      (q) =>
        q.className === "11" &&
        q.subject === "physics" &&
        [1, 2, 3].includes(q.chapter),
    ).length,
    250,
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

test("Chapter 4: duplicate screen, transparent content flags and complete per-record review", async () => {
  const qs = await load(),
    all = await readMockBank(),
    r = await report();
  const norm = (s: string) =>
    s
      .toLowerCase()
      .replace(/[^\p{L}\p{N}]+/gu, " ")
      .trim();
  assert.equal(r.questions.length, 60);
  assert.equal(
    r.questions.filter((q: { flags: string[] }) => q.flags.length).length,
    34,
  );
  assert.equal(r.semanticGroups.length, 1);
  for (const q of qs) {
    for (const other of all)
      if (q.id !== other.id)
        assert.notEqual(
          norm(q.prompt),
          norm(other.prompt),
          `${q.id}/${other.id}`,
        );
    const check = r.questions.find((a: { id: string }) => a.id === q.id);
    assert.equal(check.correctAnswer, q.options![q.correct as number]);
    assert.equal(check.academicApproval, "pending");
    assert.ok(check.independentAnswerAndFBDCheck.length > 30);
    if (check.flags.length)
      assert.ok(
        check.replacementBrief || check.completeProposedRevisionAvailable,
      );
  }
});

test("Chapter 4: seven complete revision proposals validate but are not active bank additions", async () => {
  const p = JSON.parse(await readFile(proposalFile, "utf8"));
  assert.equal(p.notImported, true);
  assert.equal(p.academicApproval, "pending");
  const proposed = importMockText(
    JSON.stringify({
      schemaVersion: 1,
      questions: p.proposals.map(
        (x: { proposedQuestion: unknown }) => x.proposedQuestion,
      ),
    }),
    "json",
  );
  assert.equal(proposed.length, 7);
  assert.ok(
    proposed.every((q) => q.verification.status === "draft" && q.chapter === 4),
  );
  const pendulum = proposed.find((q) => q.id.endsWith("H-014"))!,
    recoil = proposed.find((q) => q.id.endsWith("H-027"))!;
  const tension = (2 * (10 + 2)) / 0.8,
    acceleration = (tension * 0.6) / 2,
    normal = 8 * 12 + tension * 0.8,
    force = 10 * acceleration + 0.1 * normal;
  assert.deepEqual([force, tension], [102, 30]);
  assert.equal(pendulum.options![pendulum.correct as number], "(102 N,30 N)");
  const v1 = (2 * 10) / 12,
    u1 = v1 - 10,
    v2 = (10 * v1 - 8) / 10,
    u2 = v2 + 8;
  assert.ok(close(v2, 13 / 15));
  assert.ok(close(2 * u1 + 1 * u2 + 9 * v2, 0));
  assert.equal(recoil.options![recoil.correct as number], "13/15 m/s RIGHT");
  const bank = await load();
  assert.equal(bank.length, 60);
  assert.notEqual(
    bank.find((q) => q.id === pendulum.id)!.prompt,
    pendulum.prompt,
  );
});

test("Chapter 4: unapproved drafts never activate any size; exact chapter/difficulty simulation only", async () => {
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
          q.className === "11" &&
          q.subject === "physics" &&
          q.chapter === 4 &&
          q.difficulty === d
            ? ("verified" as const)
            : ("draft" as const),
      },
    }));
    const c = mockCatalogFromBank(chapter, simulated);
    assert.deepEqual(c.sizes[d], [...mockCountsByDifficulty[d]]);
    for (const other of levels)
      if (other !== d) assert.deepEqual(c.sizes[other], []);
    for (const previous of [1, 2, 3])
      assert.equal(
        mockCatalogFromBank({ ...chapter, chapter: previous }, simulated)
          .approvedCounts.all,
        0,
      );
  }
});

test("Chapter 4: six exact-difficulty sizes/timers retain hidden keys and +4/-1/0 server grading", async () => {
  const bank = await load(),
    times = { easy: [10], medium: [20, 40], hard: [30, 60, 90] };
  for (const d of levels)
    for (const [i, count] of mockCountsByDifficulty[d].entries()) {
      assert.equal(mockDuration(d, count), times[d][i]);
      const questions = bank
        .filter((q) => q.chapter === 4 && q.difficulty === d)
        .slice(0, count);
      assert.equal(questions.length, count);
      assert.equal(new Set(questions.map((q) => q.id)).size, count);
      const attempt: MockAttempt = {
        schemaVersion: 1,
        id: "chapter4-review-only",
        tokenHash: "not-live",
        config: {
          ...chapter,
          difficulty: d,
          count,
          durationMinutes: times[d][i],
        },
        chapterTitle: "Laws of Motion",
        startedAt: 0,
        expiresAt: times[d][i] * 60000,
        revision: 0,
        questions,
        answers: {},
        result: null,
      };
      const payload = JSON.stringify(publicMockAttempt(attempt, 1000));
      assert.ok(!payload.includes('"correct"'));
      assert.ok(!payload.includes('"explanation"'));
      assert.equal(gradeMock(attempt, 1000, "manual").marksObtained, 0);
      assert.equal(gradeMock(attempt, 1000, "manual").unattempted, count);
      attempt.answers = Object.fromEntries(
        questions.map((q) => [q.id, q.correct]),
      );
      assert.equal(gradeMock(attempt, 1000, "manual").marksObtained, 4 * count);
      assert.equal(gradeMock(attempt, 1000, "manual").accuracy, 100);
      attempt.answers = Object.fromEntries(
        questions.map((q) => [q.id, ((q.correct as number) + 1) % 4]),
      );
      assert.equal(gradeMock(attempt, 1000, "manual").marksObtained, -count);
    }
});
