"use client";
import type { MockAnswers, PublicMockAttempt } from "./mock-types";

type Session = {
  token: string;
  attempt: PublicMockAttempt;
  manifest: {
    id: string;
    config: unknown;
    questionIds: string[];
    startedAt: number;
    contentHash: string;
  };
};
const memory = new Map<string, Session>();
const sessionKey = (id: string) => `gnosis:practice-preview:attempt:${id}`;
function save(session: Session) {
  memory.set(session.attempt.id, session);
  try {
    localStorage.setItem(
      sessionKey(session.attempt.id),
      JSON.stringify(session),
    );
  } catch {
    /* The shared UI separately warns if browser recovery cannot be saved. */
  }
}
function load(id: string): Session {
  let raw: string | null = null;
  try {
    raw = localStorage.getItem(sessionKey(id));
  } catch {
    /* In-tab practice can continue without storage. */
  }
  if (raw) {
    if (raw.length > 1000000)
      throw new Error("Saved practice is too large. Start a new preview.");
    const session = JSON.parse(raw) as Session;
    if (
      session.attempt?.id !== id ||
      session.manifest?.id !== id ||
      !Array.isArray(session.attempt.questions) ||
      !session.attempt.questions.length ||
      !Number.isFinite(session.attempt.expiresAt)
    )
      throw new Error("Saved practice is unreadable. Start a new preview.");
    return session;
  }
  const session = memory.get(id);
  if (session) return session;
  throw new Error(
    "This practice preview was cleared from this browser. Start a new preview.",
  );
}
async function network(url: string, method: string, body?: unknown) {
  const response = await fetch(url, {
    method,
    cache: "no-store",
    headers: { "Content-Type": "application/json" },
    ...(body ? { body: JSON.stringify(body) } : {}),
  });
  const data = await response.json();
  if (!response.ok)
    throw new Error(
      data.error ||
        "Practice could not be graded. Reconnect and retry; your browser responses are kept.",
    );
  return data;
}
export async function requestPracticePreview<T>(
  url: string,
  token?: string,
  method = "GET",
  body?: unknown,
  _keepalive = false,
): Promise<T> {
  if (!token) {
    const data = await network(
      url.replace("/api/mock-tests", "/api/mock-practice"),
      method,
      body,
    );
    if (data.manifest) save(data);
    return data as T;
  }
  const id = token.split(".")[0],
    session = load(id);
  if (session.token !== token)
    throw new Error("This preview belongs to a different browser attempt.");
  if (session.attempt.result) return session.attempt as T;
  const input = body as { revision: number; answers: MockAnswers } | undefined;
  if (input) {
    if (input.revision !== session.attempt.revision) {
      const error = new Error(
        "Another tab changed this preview. Reload saved responses.",
      );
      Object.assign(error, { status: 409 });
      throw error;
    }
    session.attempt.answers = input.answers;
    if (method === "PATCH") session.attempt.revision++;
    save(session);
  }
  session.attempt.serverNow = Date.now();
  if (method === "POST" || Date.now() >= session.attempt.expiresAt) {
    const evaluated = await network("/api/mock-practice/submit", "POST", {
      manifest: session.manifest,
      answers: session.attempt.answers,
    });
    const prior = load(id);
    if (prior.attempt.result) return prior.attempt as T;
    session.attempt = { ...evaluated, revision: session.attempt.revision + 1 };
  }
  save(session);
  return session.attempt as T;
}
