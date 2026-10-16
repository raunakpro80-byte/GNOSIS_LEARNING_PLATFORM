import { test } from "node:test";
import assert from "node:assert/strict";
const base = process.env.TEST_BASE_URL ?? "http://localhost:3000";
test("HTTP integration: public fixture, private endpoints, missing AI setup and server grading", async () => {
  const content = await fetch(`${base}/api/content`);
  assert.equal(content.status, 200);
  const lessons = await content.json();
  assert.equal(lessons[0].videoId, "-Rm7K-rXk7A");
  assert.ok(lessons[0].questions.every((q: object) => !("correct" in q)));
  for (const [path, method] of [
    ["/api/admin", "GET"],
    ["/api/admin", "POST"],
    ["/api/admin/upload", "POST"],
    ["/api/admin/drafts", "POST"],
    ["/api/admin/preview", "POST"],
    ["/api/state", "GET"],
    ["/api/state", "PUT"],
  ]) {
    const r = await fetch(base + path, { method });
    assert.equal(r.status, 401, `${method} ${path}`);
  }
  const chat = await fetch(`${base}/api/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      lessonId: "ohms-law",
      timestamp: 20,
      question: "Why?",
      language: "English",
      mode: "Hint first",
      recent: [],
    }),
  });
  assert.equal(chat.status, 503);
  assert.match((await chat.json()).error, /not configured/);
  const quiz = await fetch(`${base}/api/quiz`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      lessonId: "ohms-law",
      answers: { q1: 0, q2: 2, q3: 0, q4: 3, q5: 2 },
    }),
  });
  assert.equal(quiz.status, 200);
  const attempt = await quiz.json();
  assert.equal(attempt.score, 4);
  assert.equal(attempt.results[0].correct, 1);
  const invalid = await fetch(`${base}/api/quiz`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ lessonId: "ohms-law", answers: { q1: 1 } }),
  });
  assert.equal(invalid.status, 400);
  const pdf = await fetch(`${base}/ohms-law-notes.pdf`);
  assert.equal(pdf.status, 200);
  assert.equal(
    new TextDecoder().decode(
      new Uint8Array(await pdf.arrayBuffer()).slice(0, 5),
    ),
    "%PDF-",
  );
});
