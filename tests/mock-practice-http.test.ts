import { test } from "node:test";
import assert from "node:assert/strict";
import { readMockBank } from "../lib/mock-bank";
const base = process.env.TEST_BASE_URL ?? "http://127.0.0.1:3006";
const headers = { "Content-Type": "application/json" };
test("production HTTP: preview is playable for every chapter/configuration without database, while approved tests stay gated", async () => {
  const bank = await readMockBank();
  for (const chapter of [1, 2, 3, 4]) {
    const query = `?className=11&subject=physics&chapter=${chapter}`;
    const catalogResponse = await fetch(base + "/api/mock-practice" + query);
    assert.equal(catalogResponse.status, 200);
    const catalog = await catalogResponse.json();
    assert.deepEqual(catalog.sizes, {
      easy: [10],
      medium: [10, 20],
      hard: [10, 20, 30],
    });
    assert.equal(catalog.approvedCounts.all, 0);
    const approved = await (
      await fetch(base + "/api/mock-tests" + query)
    ).json();
    assert.equal(approved.approvedCounts.all, 0);
    assert.deepEqual(approved.sizes, { easy: [], medium: [], hard: [] });
    for (const [difficulty, count, minutes] of [
      ["easy", 10, 10],
      ["medium", 10, 20],
      ["medium", 20, 40],
      ["hard", 10, 30],
      ["hard", 20, 60],
      ["hard", 30, 90],
    ] as const) {
      const start = await fetch(base + "/api/mock-practice", {
        method: "POST",
        headers,
        body: JSON.stringify({
          className: "11",
          subject: "physics",
          chapter,
          difficulty,
          count,
        }),
      });
      assert.equal(start.status, 200);
      const data = await start.json();
      assert.equal(
        data.attempt.expiresAt - data.attempt.startedAt,
        minutes * 60000,
      );
      assert.equal(data.attempt.questions.length, count);
      assert.equal(
        new Set(data.attempt.questions.map((q: { id: string }) => q.id)).size,
        count,
      );
      assert.ok(!JSON.stringify(data).includes('"correct"'));
      assert.ok(!JSON.stringify(data).includes('"explanation"'));
      const questions = data.attempt.questions.map((q: { id: string }) =>
        bank.find((real) => real.id === q.id)!,
      );
      assert.ok(
        questions.every(
          (q: {
            chapter: number;
            difficulty: string;
            developmentSample?: boolean;
          }) =>
            q.chapter === chapter &&
            q.difficulty === difficulty &&
            !q.developmentSample,
        ),
      );
      const answers = Object.fromEntries(
        questions.map((q: { id: string; correct: number }) => [
          q.id,
          q.correct,
        ]),
      );
      const submitted = await fetch(base + "/api/mock-practice/submit", {
        method: "POST",
        headers,
        body: JSON.stringify({ manifest: data.manifest, answers }),
      });
      assert.equal(submitted.status, 200);
      const result = (await submitted.json()).result;
      assert.equal(result.marksObtained, count * 4);
      assert.equal(result.correct, count);
      assert.ok(
        result.items.every(
          (q: { explanation: string }) => q.explanation.length,
        ),
      );
    }
    const page = await fetch(
      `${base}/mock-tests/class-11/physics/chapter-${chapter}`,
    );
    assert.equal(page.status, 200);
    const html = await page.text();
    assert.ok(html.includes("Chapter Mock Test"));
    assert.ok(html.includes("Practice questions — academic review pending."));
    assert.ok(!html.includes("Practice Preview"));
    assert.ok(!html.includes("Approved mock tests"));
    assert.ok(html.includes('data-mock-mode="guest-practice"'));
    assert.ok(!html.includes('"correct"'));
  }
  const invalid = await fetch(base + "/api/mock-practice", {
    method: "POST",
    headers,
    body: JSON.stringify({
      className: "11",
      subject: "chemistry",
      chapter: 1,
      difficulty: "easy",
      count: 10,
    }),
  });
  assert.equal(invalid.status, 400);
});
