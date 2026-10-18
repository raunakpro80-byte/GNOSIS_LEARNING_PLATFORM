import { test } from "node:test";
import assert from "node:assert/strict";
import path from "node:path";
import { readFile, writeFile, unlink, rename } from "node:fs/promises";
import { FileMockAttemptStore } from "../lib/mock-storage";
import type { Difficulty, PublicMockAttempt } from "../lib/mock-types";

const base = process.env.MOCK_MATRIX_BASE_URL ?? "http://127.0.0.1:3004";
const chapterNumber = Number(process.env.MOCK_MATRIX_CHAPTER ?? "1");
assert.ok(
  [1, 3, 4].includes(chapterNumber),
  "Only the isolated chapter 1/3/4 QA fixtures are supported",
);
const directory = path.resolve(process.env.MOCK_QA_DIR ?? "tmp/mock-final-qa");
assert.ok(
  directory.startsWith(path.resolve("tmp") + path.sep),
  "Only private ignored QA data may be changed",
);
const headers = { "Content-Type": "application/json" };
const configurations = {
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
const key = (id: string) => Number(id.split("-").at(-1)) % 4;
async function start(difficulty: Difficulty, count: number) {
  const response = await fetch(`${base}/api/mock-tests`, {
    method: "POST",
    headers,
    body: JSON.stringify({
      className: "11",
      subject: "physics",
      chapter: chapterNumber,
      difficulty,
      count,
    }),
  });
  assert.equal(response.status, 200);
  assert.equal(response.headers.get("cache-control"), "no-store");
  return (await response.json()) as {
    token: string;
    attempt: PublicMockAttempt;
  };
}
const auth = (token: string) => ({
  ...headers,
  Authorization: `Bearer ${token}`,
});
const url = (id: string) => `${base}/api/mock-tests/${id}`;

for (const difficulty of ["easy", "medium", "hard"] as const)
  for (const [count, minutes] of configurations[difficulty]) {
    test(`production HTTP matrix: ${difficulty}/${count}, ${minutes} minutes, unique questions and hidden keys`, async () => {
      const { token, attempt } = await start(difficulty, count);
      assert.equal(attempt.config.durationMinutes, minutes);
      assert.equal(attempt.config.chapter, chapterNumber);
      const stored = JSON.parse(
        await readFile(
          path.join(directory, "attempts", `${attempt.id}.json`),
          "utf8",
        ),
      );
      assert.ok(
        stored.questions.every(
          (q: {
            className: string;
            subject: string;
            chapter: number;
            difficulty: string;
          }) =>
            q.className === "11" &&
            q.subject === "physics" &&
            q.chapter === chapterNumber &&
            q.difficulty === difficulty,
        ),
      );
      assert.equal(attempt.expiresAt - attempt.startedAt, minutes * 60000);
      assert.equal(attempt.questions.length, count);
      assert.equal(new Set(attempt.questions.map((q) => q.id)).size, count);
      assert.equal(new Set(attempt.questions.map((q) => q.prompt)).size, count);
      assert.ok(
        attempt.questions.every(
          (q) =>
            q.difficulty === difficulty && q.id.startsWith(`qa-${difficulty}-`),
        ),
      );
      assert.equal(attempt.result, null);
      assert.ok(!("tokenHash" in attempt));
      for (const q of attempt.questions)
        for (const field of [
          "correct",
          "explanation",
          "verification",
          "source",
        ])
          assert.ok(!(field in q));
      const resumedResponse = await fetch(url(attempt.id), {
        headers: auth(token),
      });
      assert.ok(
        resumedResponse.headers
          .get("vary")
          ?.toLowerCase()
          .split(/\s*,\s*/)
          .includes("authorization"),
      );
      const resumed = await resumedResponse.json();
      assert.equal(resumed.expiresAt, attempt.expiresAt);
      const answers = {
        [attempt.questions[0].id]: key(attempt.questions[0].id),
        [attempt.questions[1].id]: (key(attempt.questions[1].id) + 1) % 4,
      };
      const response = await fetch(url(attempt.id), {
        method: "POST",
        headers: auth(token),
        body: JSON.stringify({ revision: 0, answers }),
      });
      assert.equal(response.status, 200);
      const submitted = await response.json();
      assert.equal(submitted.result.totalMarks, count * 4);
      assert.equal(submitted.result.marksObtained, 3);
      assert.equal(submitted.result.accuracy, 50);
      assert.equal(submitted.result.correct, 1);
      assert.equal(submitted.result.wrong, 1);
      assert.equal(submitted.result.unattempted, count - 2);
      assert.ok(
        submitted.result.items.every(
          (item: object) => "correct" in item && "explanation" in item,
        ),
      );
      if (difficulty === "easy" && count === 10)
        await writeFile(
          path.join(directory, "restart-proof.json"),
          JSON.stringify({ id: attempt.id, token, result: submitted.result }),
          { mode: 0o600 },
        );
    });
  }

test("production HTTP guest safety: tokens, validation, clears, stale tabs and concurrent duplicate submission", async () => {
  const { token, attempt } = await start("easy", 10),
    endpoint = url(attempt.id);
  assert.equal((await fetch(endpoint)).status, 401);
  assert.equal(
    (
      await fetch(endpoint, {
        headers: auth(`${attempt.id}.${"z".repeat(43)}`),
      })
    ).status,
    401,
  );
  const save = (revision: number, answers: unknown) =>
    fetch(endpoint, {
      method: "PATCH",
      headers: auth(token),
      body: JSON.stringify({ revision, answers }),
    });
  assert.equal((await save(0, { foreign: 0 })).status, 400);
  assert.equal((await save(0, { [attempt.questions[0].id]: 99 })).status, 400);
  assert.equal(
    (await save(0, { [attempt.questions[0].id]: key(attempt.questions[0].id) }))
      .status,
    200,
  );
  assert.equal((await save(0, {})).status, 409);
  const clear = await save(1, {});
  assert.equal(clear.status, 200);
  assert.deepEqual((await clear.json()).answers, {});
  const body = JSON.stringify({
    revision: 2,
    answers: { [attempt.questions[0].id]: key(attempt.questions[0].id) },
  });
  const responses = await Promise.all(
    [1, 2].map(() =>
      fetch(endpoint, { method: "POST", headers: auth(token), body }),
    ),
  );
  assert.ok(responses.every((r) => r.status === 200));
  const results = await Promise.all(responses.map((r) => r.json()));
  assert.deepEqual(results[0].result, results[1].result);
  assert.equal(results[0].result.marksObtained, 4);
  const stored = JSON.parse(
    await readFile(
      path.join(directory, "attempts", `${attempt.id}.json`),
      "utf8",
    ),
  );
  assert.ok(!JSON.stringify(stored).includes(token.split(".")[1]));
});

test("production HTTP expiry grades saved answers only and remains immutable", async () => {
  const { token, attempt } = await start("hard", 20),
    endpoint = url(attempt.id);
  const first = attempt.questions[0],
    second = attempt.questions[1];
  assert.equal(
    (
      await fetch(endpoint, {
        method: "PATCH",
        headers: auth(token),
        body: JSON.stringify({
          revision: 0,
          answers: { [first.id]: key(first.id) },
        }),
      })
    ).status,
    200,
  );
  await new FileMockAttemptStore(path.join(directory, "attempts")).transaction(
    attempt.id,
    (saved) => {
      saved.expiresAt = Date.now() - 1;
      saved.startedAt = saved.expiresAt - 60 * 60000;
    },
  );
  const body = JSON.stringify({
    revision: 1,
    answers: { [first.id]: key(first.id), [second.id]: key(second.id) },
  });
  const expired = await fetch(endpoint, {
    method: "POST",
    headers: auth(token),
    body,
  }).then((r) => r.json());
  assert.equal(expired.result.reason, "expired");
  assert.equal(expired.result.marksObtained, 4);
  assert.equal(expired.result.unattempted, 19);
  assert.equal(expired.result.timeTakenSeconds, 60 * 60);
  const duplicate = await fetch(endpoint, {
    method: "POST",
    headers: auth(token),
    body,
  }).then((r) => r.json());
  assert.deepEqual(duplicate.result, expired.result);
});

test("malformed banks fail closed with a clear 503 while saved attempts still resume", async () => {
  const { token, attempt } = await start("easy", 10);
  const malformed = path.join(directory, "banks", "invalid-qa-only.json");
  await writeFile(malformed, "{ invalid QA fixture JSON", { flag: "wx" });
  try {
    const catalog = await fetch(
      `${base}/api/mock-tests?className=11&subject=physics&chapter=${chapterNumber}`,
    );
    assert.equal(catalog.status, 503);
    assert.match(
      (await catalog.json()).error,
      /temporarily unavailable.*could not be validated/,
    );
    assert.equal(
      (
        await fetch(`${base}/api/mock-tests`, {
          method: "POST",
          headers,
          body: JSON.stringify({
            className: "11",
            subject: "physics",
            chapter: chapterNumber,
            difficulty: "easy",
            count: 10,
          }),
        })
      ).status,
      503,
    );
    const resumed = await fetch(url(attempt.id), { headers: auth(token) });
    assert.equal(resumed.status, 200);
    assert.equal((await resumed.json()).expiresAt, attempt.expiresAt);
  } finally {
    await unlink(malformed);
  }
});

test("empty banks show no enabled configurations and reject starts", async () => {
  const bank = path.join(directory, "banks", "qa-bank.json"),
    held = bank + ".held";
  await rename(bank, held);
  try {
    const catalog = await fetch(
      `${base}/api/mock-tests?className=11&subject=physics&chapter=${chapterNumber}`,
    ).then((r) => r.json());
    assert.deepEqual(catalog.counts, { all: 0, easy: 0, medium: 0, hard: 0 });
    assert.deepEqual(catalog.sizes, { easy: [], medium: [], hard: [] });
    assert.equal(
      (
        await fetch(`${base}/api/mock-tests`, {
          method: "POST",
          headers,
          body: JSON.stringify({
            className: "11",
            subject: "physics",
            chapter: chapterNumber,
            difficulty: "easy",
            count: 20,
          }),
        })
      ).status,
      400,
    );
  } finally {
    await rename(held, bank);
  }
});
