import { test } from "node:test";
import assert from "node:assert/strict";
const base = process.env.TEST_BASE_URL ?? "http://localhost:3000";
test("real banks never activate unapproved samples or drafts; unavailable and obsolete configurations fail safely", async () => {
  for (const chapter of [1, 2, 3, 4]) {
    const catalog = await fetch(
      base + "/api/mock-tests?className=11&subject=physics&chapter=" + chapter,
    ).then((r) => r.json());
    assert.equal(catalog.counts.all, 0);
    assert.deepEqual(catalog.sizes, { easy: [], medium: [], hard: [] });
    for (const [difficulty, count] of [
      ["easy", 10],
      ["medium", 10],
      ["medium", 20],
      ["hard", 10],
      ["hard", 20],
      ["hard", 30],
      // Obsolete size policy is global; exercise it once to stay below the
      // production start-rate limit while checking six valid pairs per chapter.
      ...(chapter === 4
        ? [
            ["easy", 20],
            ["medium", 30],
            ["hard", 40],
          ]
        : []),
    ]) {
      const response = await fetch(base + "/api/mock-tests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          className: "11",
          subject: "physics",
          chapter,
          difficulty,
          count,
        }),
      });
      assert.equal(response.status, 400);
    }
  }
});
