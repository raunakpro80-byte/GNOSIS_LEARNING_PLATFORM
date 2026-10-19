import { test } from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { createHash } from "node:crypto";
import { pathToFileURL } from "node:url";
import path from "node:path";
import {
  practiceCatalog,
  startPractice,
  submitPractice,
} from "../lib/mock-practice";
import { mockCatalog, readMockBank } from "../lib/mock-bank";
import type { PublicMockAttempt } from "../lib/mock-types";
const configs = [
  ["easy", 10, 10],
  ["medium", 10, 20],
  ["medium", 20, 40],
  ["hard", 10, 30],
  ["hard", 20, 60],
  ["hard", 30, 90],
] as const;
test("all four chapters and 24 preview configurations isolate drafts, hide keys and grade server-side", async () => {
  const bank = await readMockBank();
  for (const chapter of [1, 2, 3, 4]) {
    const identity = {
        className: "11" as const,
        subject: "physics" as const,
        chapter,
      },
      catalog = await practiceCatalog(identity);
    assert.deepEqual(catalog.sizes, {
      easy: [10],
      medium: [10, 20],
      hard: [10, 20, 30],
    });
    assert.equal(catalog.counts.all, chapter === 1 ? 90 : 60);
    assert.equal(catalog.approvedCounts.all, 0);
    for (const [difficulty, count, minutes] of configs) {
      const started = await startPractice({ ...identity, difficulty, count }),
        a = started.attempt;
      assert.equal(a.questions.length, count);
      assert.equal(new Set(a.questions.map((q) => q.id)).size, count);
      assert.equal(a.expiresAt - a.startedAt, minutes * 60000);
      assert.ok(!JSON.stringify(started).includes('"correct"'));
      assert.ok(!JSON.stringify(started).includes('"explanation"'));
      assert.ok(!JSON.stringify(started).includes('"tokenHash"'));
      const selected = a.questions.map((q) =>
        bank.find((real) => real.id === q.id)!,
      );
      assert.ok(
        selected.every(
          (q) =>
            q.chapter === chapter &&
            q.difficulty === difficulty &&
            q.verification.status === "draft" &&
            !q.developmentSample,
        ),
      );
      assert.ok(
        selected.every((q) => q.type === "single" && q.options?.length === 4),
      );
      const answers = Object.fromEntries(
        selected
          .slice(0, -1)
          .map((q, i) => [
            q.id,
            i === 0 ? ((q.correct as number) + 1) % 4 : q.correct,
          ]),
      );
      const result = (
        await submitPractice({ manifest: started.manifest, answers })
      ).result!;
      assert.equal(result.marksObtained, (count - 2) * 4 - 1);
      assert.equal(result.correct, count - 2);
      assert.equal(result.wrong, 1);
      assert.equal(result.unattempted, 1);
      assert.ok(result.items.every((q) => q.explanation.length > 0));
      const expired = (
        await submitPractice(
          { manifest: started.manifest, answers },
          a.expiresAt + 1,
        )
      ).result!;
      assert.equal(expired.reason, "expired");
      assert.equal(expired.marksObtained, result.marksObtained);
      assert.equal(expired.timeTakenSeconds, minutes * 60);
    }
    const approved = await mockCatalog(identity);
    assert.equal(approved.approvedCounts.all, 0);
    assert.deepEqual(approved.sizes, { easy: [], medium: [], hard: [] });
  }
});
test("preview rejects other subjects/classes, unsupported counts, repeated/mixed questions and modified content", async () => {
  const config = {
    className: "11",
    subject: "physics",
    chapter: 1,
    difficulty: "easy",
    count: 10,
  };
  for (const override of [
    { className: "12" },
    { subject: "chemistry" },
    { chapter: 5 },
    { count: 20 },
  ])
    await assert.rejects(startPractice({ ...config, ...override }));
  const { manifest } = await startPractice(config),
    bank = await readMockBank();
  await assert.rejects(
    submitPractice({
      manifest: {
        ...manifest,
        questionIds: manifest.questionIds.map(() => manifest.questionIds[0]),
      },
      answers: {},
    }),
    /repeated/,
  );
  for (const bad of [
    bank.find((q) => q.chapter === 2 && !q.developmentSample)!,
    bank.find((q) => q.chapter === 1 && q.difficulty === "hard")!,
  ])
    await assert.rejects(
      submitPractice({
        manifest: {
          ...manifest,
          questionIds: [bad.id, ...manifest.questionIds.slice(1)],
        },
        answers: {},
      }),
      /chapter and difficulty/,
    );
  await assert.rejects(
    submitPractice({
      manifest: { ...manifest, contentHash: "0".repeat(64) },
      answers: {},
    }),
    /content changed/,
  );
  await assert.rejects(
    submitPractice({ manifest, answers: { unrelated: 0 } }),
    /outside this test/,
  );
  const expired = await submitPractice(
    { manifest, answers: {} },
    manifest.startedAt + 600001,
  );
  assert.equal(expired.result!.reason, "expired");
  assert.equal(expired.result!.timeTakenSeconds, 600);
});
test("browser transport saves, clears, refreshes, retries failed grading and restores results without a database", async () => {
  const originalFetch = globalThis.fetch,
    originalStorage = Object.getOwnPropertyDescriptor(
      globalThis,
      "localStorage",
    ),
    originalNow = Date.now;
  const storage = new Map<string, string>();
  let offline = false;
  Object.defineProperty(globalThis, "localStorage", {
    configurable: true,
    value: {
      getItem: (key: string) => storage.get(key) ?? null,
      setItem: (key: string, value: string) => storage.set(key, value),
      removeItem: (key: string) => storage.delete(key),
    },
  });
  globalThis.fetch = async (input, init) => {
    if (offline) throw new Error("Fixture offline");
    const url = String(input),
      body = init?.body ? JSON.parse(init.body as string) : undefined;
    const data = url.endsWith("/submit")
      ? await submitPractice(body)
      : await startPractice(body);
    return Response.json(data);
  };
  async function fresh() {
    return import(
      pathToFileURL(path.resolve("lib/mock-practice-client.ts")).href +
        `?fixture=${Math.random()}`
    );
  }
  try {
    let client = await fresh();
    const started = await client.requestPracticePreview(
      "/api/mock-tests",
      undefined,
      "POST",
      {
        className: "11",
        subject: "physics",
        chapter: 2,
        difficulty: "easy",
        count: 10,
      },
    );
    const { token, attempt } = started,
      route = `/api/mock-tests/${attempt.id}`,
      question = attempt.questions[0];
    let saved = await client.requestPracticePreview(route, token, "PATCH", {
      revision: 0,
      answers: { [question.id]: 0 },
    });
    assert.equal(saved.answers[question.id], 0);
    client = await fresh();
    const resumed = await client.requestPracticePreview(route, token);
    assert.equal(resumed.id, attempt.id);
    assert.equal(resumed.expiresAt, attempt.expiresAt);
    assert.equal(resumed.answers[question.id], 0);
    saved = await client.requestPracticePreview(route, token, "PATCH", {
      revision: resumed.revision,
      answers: {},
    });
    assert.deepEqual(saved.answers, {});
    offline = true;
    await assert.rejects(
      client.requestPracticePreview(route, token, "POST", {
        revision: saved.revision,
        answers: {},
      }),
      /offline/,
    );
    offline = false;
    const submitted = await client.requestPracticePreview(
      route,
      token,
      "POST",
      { revision: saved.revision, answers: {} },
    );
    assert.ok(submitted.result);
    client = await fresh();
    const result = await client.requestPracticePreview(route, token);
    assert.deepEqual(result.result, submitted.result);
    const retry = await client.requestPracticePreview(
      "/api/mock-tests",
      undefined,
      "POST",
      {
        className: "11",
        subject: "physics",
        chapter: 2,
        difficulty: "hard",
        count: 30,
      },
    );
    assert.notEqual(retry.attempt.id, attempt.id);
    Date.now = () => retry.attempt.expiresAt + 1;
    const expired = await client.requestPracticePreview(
      `/api/mock-tests/${retry.attempt.id}`,
      retry.token,
    );
    assert.equal(expired.result.reason, "expired");
    Date.now = originalNow;
    const bank = await readMockBank();
    for (const chapter of [1, 2, 3, 4])
      for (const [difficulty, count, minutes] of configs) {
        const initial = await client.requestPracticePreview(
          "/api/mock-tests",
          undefined,
          "POST",
          { className: "11", subject: "physics", chapter, difficulty, count },
        );
        const address = `/api/mock-tests/${initial.attempt.id}`;
        const first = initial.attempt.questions[0];
        const correct = bank.find((q) => q.id === first.id)!.correct;
        const response = { [first.id]: correct };
        await client.requestPracticePreview(address, initial.token, "PATCH", {
          revision: 0,
          answers: response,
        });
        client = await fresh();
        const recovered = await client.requestPracticePreview(
          address,
          initial.token,
        );
        assert.equal(recovered.expiresAt, initial.attempt.expiresAt);
        assert.equal(
          recovered.expiresAt - recovered.startedAt,
          minutes * 60000,
        );
        assert.deepEqual(recovered.answers, response);
        assert.equal(recovered.config.chapter, chapter);
        assert.equal(recovered.config.difficulty, difficulty);
        Date.now = () => recovered.expiresAt + 1;
        const finished = await client.requestPracticePreview(
          address,
          initial.token,
        );
        assert.equal(finished.result.reason, "expired");
        assert.equal(finished.result.marksObtained, 4);
        assert.equal(finished.result.unattempted, count - 1);
        assert.equal(finished.result.timeTakenSeconds, minutes * 60);
        client = await fresh();
        assert.deepEqual(
          (await client.requestPracticePreview(address, initial.token)).result,
          finished.result,
        );
        Date.now = originalNow;
      }
    storage.clear();
    client = await fresh();
    await assert.rejects(
      client.requestPracticePreview(route, token),
      /cleared/,
    );
  } finally {
    globalThis.fetch = originalFetch;
    Date.now = originalNow;
    if (originalStorage)
      Object.defineProperty(globalThis, "localStorage", originalStorage);
    else Reflect.deleteProperty(globalThis, "localStorage");
  }
});
test("all nine source question banks keep their recorded hashes", async () => {
  const baseline = JSON.parse(
    await readFile("docs/question-banks/public-mock-readiness.json", "utf8"),
  );
  for (const row of baseline.bankCheckpoint)
    assert.equal(
      createHash("sha256")
        .update(await readFile(row.file))
        .digest("hex"),
      row.sha256,
    );
});
