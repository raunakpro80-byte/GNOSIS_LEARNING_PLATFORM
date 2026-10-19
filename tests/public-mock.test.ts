import { test } from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { createHash } from "node:crypto";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import {
  publicMockChapterNumber,
  publicMockChapterPath,
  publicMockShareUrl,
  publicPhysicsMockChapters,
  publicPhysicsMockPath,
} from "../lib/public-mock-routes";
import { mockCatalog, readMockBank } from "../lib/mock-bank";
import {
  PublicMockIndex,
  PublicMockChapter,
} from "../components/PublicMockTests";
import { mockAttemptStorageIssue } from "../lib/mock-hosting";

test("public mock routes use existing chapter identities and canonical token-free origin URLs", () => {
  assert.deepEqual(
    publicPhysicsMockChapters.map((q) => q.number),
    [1, 2, 3, 4],
  );
  assert.deepEqual(
    publicPhysicsMockChapters.map((q) => q.title),
    [
      "Units and Measurements",
      "Motion in a Straight Line",
      "Motion in a Plane",
      "Laws of Motion",
    ],
  );
  for (const n of [1, 2, 3, 4]) {
    assert.equal(publicMockChapterNumber(`chapter-${n}`), n);
    assert.equal(
      publicMockChapterPath(n),
      `${publicPhysicsMockPath}/chapter-${n}`,
    );
    assert.equal(
      publicMockShareUrl(
        "https://example.test/attempt?token=private#answers",
        n,
      ),
      `https://example.test${publicMockChapterPath(n)}`,
    );
  }
  for (const s of [
    "chapter-0",
    "chapter-5",
    "chapter-01",
    "chapter-1/extra",
    "other",
  ])
    assert.equal(publicMockChapterNumber(s), null);
  assert.throws(() => publicMockChapterPath(5));
  assert.throws(() => publicMockShareUrl("javascript:alert(1)", 1));
});

test("public pages render safe availability and shared engine without requiring a profile", async () => {
  const catalogs = await Promise.all(
    [1, 2, 3, 4].map((chapter) =>
      mockCatalog({ className: "11", subject: "physics", chapter }),
    ),
  );
  const index = renderToStaticMarkup(
    createElement(PublicMockIndex, { catalogs }),
  );
  for (const c of catalogs) {
    assert.ok(index.includes(publicMockChapterPath(c.chapter.chapter)));
    assert.ok(index.includes(c.title));
    const page = renderToStaticMarkup(
      createElement(PublicMockChapter, { catalog: c }),
    );
    assert.ok(page.includes("Share Test"));
    assert.ok(page.includes('id="chapter-mock-test"'));
    assert.ok(page.includes("Practice questions — academic review pending."));
    assert.ok(page.includes("Chapter Mock Test"));
    assert.ok(page.includes('data-mock-mode="guest-practice"'));
    assert.ok(!page.includes('aria-label="Practice mode"'));
    assert.ok(!page.includes("Practice Preview"));
    assert.ok(!page.includes("Approved mock tests"));
    assert.equal(c.approvedCounts.all, 0);
    assert.deepEqual(c.sizes, { easy: [], medium: [], hard: [] });
    assert.ok(!page.includes('"correct"'));
    assert.ok(!page.includes('"explanation"'));
  }
});

test("public readiness audit distinguishes270 real drafts from40 ineligible development samples", async () => {
  const all = await readMockBank(),
    drafts = all.filter(
      (q) =>
        q.className === "11" &&
        q.subject === "physics" &&
        q.verification.status === "draft",
    );
  assert.deepEqual(
    [1, 2, 3, 4].map((n) => drafts.filter((q) => q.chapter === n).length),
    [90, 60, 60, 60],
  );
  assert.equal(all.filter((q) => q.developmentSample).length, 40);
  const before = JSON.parse(
    await readFile("docs/question-banks/public-mock-readiness.json", "utf8"),
  ).bankCheckpoint;
  assert.equal(before.length, 9);
  for (const q of before)
    assert.equal(
      createHash("sha256")
        .update(await readFile(q.file))
        .digest("hex"),
      q.sha256,
    );
});

test("Vercel cannot silently create ephemeral file-backed attempts", () => {
  assert.equal(mockAttemptStorageIssue({}), null);
  assert.match(
    mockAttemptStorageIssue({ VERCEL: "1" })!,
    /durable server storage/,
  );
  assert.match(
    mockAttemptStorageIssue({
      VERCEL: "1",
      GNOSIS_MOCK_DATA_DIR: "/tmp/attempts",
    })!,
    /unavailable/,
  );
});
