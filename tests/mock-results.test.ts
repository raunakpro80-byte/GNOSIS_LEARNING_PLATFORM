import { test } from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { MockResults } from "../components/ChapterMockTest";
import { parseMockBank } from "../lib/mock-schema";
import { gradeMock } from "../lib/mock-engine";
import type { MockAttempt, MockResult } from "../lib/mock-types";

async function attempt(): Promise<MockAttempt> {
  const questions = parseMockBank(
    JSON.parse(
      await readFile("content/mock-questions/11-physics-2.json", "utf8"),
    ),
  )
    .filter((question) => question.type === "single")
    .slice(0, 10);
  return {
    schemaVersion: 1,
    id: "result-review-fixture",
    tokenHash: "a".repeat(64),
    config: {
      className: "11",
      subject: "physics",
      chapter: 2,
      count: 10,
      difficulty: "easy",
      durationMinutes: 10,
    },
    chapterTitle: "Motion in a Straight Line",
    startedAt: 1000,
    expiresAt: 601000,
    revision: 0,
    questions,
    answers: {},
    result: null,
  };
}

function render(result: MockResult) {
  return renderToStaticMarkup(
    createElement(MockResults, {
      result,
      practicePreview: true,
      difficulty: "easy",
      onRetry: () => {},
      onNextDifficulty: () => {},
    }),
  );
}

test("result review excludes correct questions, retains original numbering and solutions, and removes topic analysis", async () => {
  const fixture = await attempt();
  fixture.answers[fixture.questions[0].id] = fixture.questions[0]
    .correct as number;
  fixture.answers[fixture.questions[1].id] =
    ((fixture.questions[1].correct as number) + 1) % 4;
  const result = gradeMock(fixture, 31000, "manual");
  const html = render(result);
  assert.equal(result.marksObtained, 3);
  assert.equal(result.correct, 1);
  assert.equal(result.wrong, 1);
  assert.equal(result.unattempted, 8);
  assert.equal((html.match(/class="mock-review-item"/g) || []).length, 9);
  assert.doesNotMatch(html, /Question 1 ·/);
  assert.match(html, /Question 2 ·/);
  assert.match(html, /Question 10 ·/);
  assert.match(html, /Incorrect/);
  assert.match(html, /Unattempted/);
  assert.match(html, /Correct answer:/);
  assert.match(html, /mock-explanation/);
  assert.doesNotMatch(
    html,
    /Topics to revisit|mock-topic-analysis|Continue at your own pace|Accuracy =/,
  );
});

test("a perfect result shows a clear empty review and retains score and retry", async () => {
  const fixture = await attempt();
  for (const question of fixture.questions)
    fixture.answers[question.id] = question.correct as number;
  const result = gradeMock(fixture, 31000, "manual");
  const html = render(result);
  assert.equal(result.marksObtained, 40);
  assert.match(html, /All answers correct. Nothing to review./);
  assert.doesNotMatch(html, /class="mock-review-item"/);
  assert.match(html, /Retry test/);
  assert.match(html, /40 \/ 40/);
});
