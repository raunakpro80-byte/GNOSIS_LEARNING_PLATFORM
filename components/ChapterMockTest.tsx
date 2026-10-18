"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Bookmark,
  Clock,
  RotateCcw,
} from "lucide-react";
import type {
  Difficulty,
  MockAnswer,
  MockAnswers,
  MockCatalog,
  MockChapter,
  MockResult,
  PublicMockAttempt,
  PublicMockQuestion,
} from "@/lib/mock-types";
import { mockChapterKey } from "@/lib/mock-types";
import {
  mockCountsByDifficulty,
  mockDuration,
  difficultyDescriptions,
  nextMockDifficulty,
  type MockQuestionCount,
} from "@/lib/mock-policy";

type Recovery = {
  version: 1;
  token: string;
  answers: MockAnswers;
  revision: number;
  marked: string[];
  index: number;
};
class MockRequestError extends Error {
  constructor(
    public status: number,
    message: string,
  ) {
    super(message);
  }
}
async function requestMock<T>(
  url: string,
  token?: string,
  method = "GET",
  body?: unknown,
  keepalive = false,
): Promise<T> {
  const response = await fetch(url, {
    method,
    cache: "no-store",
    keepalive,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    ...(body ? { body: JSON.stringify(body) } : {}),
  });
  const data = await response.json();
  if (!response.ok)
    throw new MockRequestError(
      response.status,
      data.error || "Could not save this test. Retry when connected.",
    );
  return data;
}
const numeric = (value: string) =>
  /^[+-]?(?:\d+(?:\.\d*)?|\.\d+)(?:[eE][+-]?\d+)?$/.test(value.trim()) &&
  Number.isFinite(Number(value));
function hasAnswer(q: PublicMockQuestion, answer: MockAnswer | undefined) {
  return q.type === "numerical"
    ? typeof answer === "string" && numeric(answer)
    : q.type === "multiple"
      ? Array.isArray(answer) && answer.length > 0
      : typeof answer === "number";
}
function cleanAnswers(questions: PublicMockQuestion[], answers: MockAnswers) {
  return Object.fromEntries(
    questions
      .filter((q) => hasAnswer(q, answers[q.id]))
      .map((q) => [q.id, answers[q.id]]),
  );
}
function displayAnswer(q: PublicMockQuestion, answer: MockAnswer | undefined) {
  if (
    answer === undefined ||
    answer === null ||
    answer === "" ||
    (Array.isArray(answer) && !answer.length)
  )
    return "Not attempted";
  if (q.type === "numerical") return String(answer);
  return (Array.isArray(answer) ? answer : [Number(answer)])
    .map((i) => `${String.fromCharCode(65 + i)}. ${q.options?.[i]}`)
    .join("; ");
}
function clock(seconds: number) {
  return `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, "0")}`;
}
function readRecovery(key: string): Recovery | null {
  const raw = localStorage.getItem(key);
  if (!raw) return null;
  if (raw.length > 30000)
    throw new Error(
      "Saved browser test data is too large. Start a new attempt.",
    );
  const data = JSON.parse(raw);
  if (
    data.version !== 1 ||
    typeof data.token !== "string" ||
    !/^[0-9a-f-]{36}\.[A-Za-z0-9_-]{43}$/i.test(data.token) ||
    !data.answers ||
    typeof data.answers !== "object" ||
    Array.isArray(data.answers) ||
    !Number.isInteger(data.revision) ||
    !Number.isInteger(data.index) ||
    !Array.isArray(data.marked) ||
    data.marked.some((x: unknown) => typeof x !== "string") ||
    Object.values(data.answers).some(
      (x) =>
        !(
          x === null ||
          typeof x === "string" ||
          typeof x === "number" ||
          (Array.isArray(x) && x.every((n) => typeof n === "number"))
        ),
    )
  )
    throw new Error(
      "Saved browser test data could not be read. Start a new attempt.",
    );
  return data;
}

export default function ChapterMockTest({ chapter }: { chapter: MockChapter }) {
  const key = mockChapterKey(chapter),
    storageKey = `gnosis:mock:v1:${key}`;
  const [catalog, setCatalog] = useState<MockCatalog | null>(null);
  const [attempt, setAttempt] = useState<PublicMockAttempt | null>(null);
  const [answers, setAnswers] = useState<MockAnswers>({});
  const [marked, setMarked] = useState<string[]>([]),
    [index, setIndex] = useState(0);
  const [loading, setLoading] = useState(true),
    [error, setError] = useState("");
  const [catalogError, setCatalogError] = useState("");
  const [storageWarning, setStorageWarning] = useState("");
  const [status, setStatus] = useState(""),
    [busy, setBusy] = useState(false);
  const [confirm, setConfirm] = useState(false),
    [remaining, setRemaining] = useState(0);
  const [difficulty, setDifficulty] = useState<Difficulty>("easy");
  const [count, setCount] = useState<MockQuestionCount>(10);
  const duration = mockDuration(difficulty, count);
  const tokenRef = useRef(""),
    attemptRef = useRef<PublicMockAttempt | null>(null),
    answersRef = useRef<MockAnswers>({});
  const revisionRef = useRef(0),
    conflictRef = useRef(false),
    queue = useRef<Promise<unknown>>(Promise.resolve());
  const clockRef = useRef({ serverNow: 0, monotonic: 0 }),
    mounted = useRef(true),
    autoFired = useRef(false);
  const confirmRef = useRef<HTMLDivElement>(null),
    submitRef = useRef<HTMLButtonElement>(null);
  const questionRef = useRef<HTMLDivElement>(null);
  function navigateQuestion(next: number) {
    setIndex(next);
    questionRef.current?.scrollIntoView({
      block: "start",
      behavior: matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "auto"
        : "smooth",
    });
  }
  answersRef.current = answers;
  const accept = useCallback((next: PublicMockAttempt) => {
    attemptRef.current = next;
    revisionRef.current = next.revision;
    clockRef.current = {
      serverNow: next.serverNow,
      monotonic: performance.now(),
    };
    if (mounted.current) {
      setAttempt(next);
      setRemaining(
        Math.max(0, Math.ceil((next.expiresAt - next.serverNow) / 1000)),
      );
      if (next.result) {
        setAnswers(next.answers);
        setConfirm(false);
      }
    }
  }, []);
  useEffect(() => {
    mounted.current = true;
    if (window.location.hash === "#chapter-mock-test")
      document.getElementById("chapter-mock-test")?.scrollIntoView({
        block: "start",
      });
    return () => {
      mounted.current = false;
    };
  }, []);
  useEffect(() => {
    let alive = true;
    async function load() {
      try {
        // Saved attempts use immutable snapshots and can resume even if a later bank import is invalid.
        try {
          const data = await requestMock<MockCatalog>(
            `/api/mock-tests?className=${chapter.className}&subject=${chapter.subject}&chapter=${chapter.chapter}`,
          );
          if (alive) {
            setCatalog(data);
            setCatalogError("");
          }
        } catch (e) {
          if (alive) setCatalogError((e as Error).message);
        }
        let recovery: Recovery | null = null;
        try {
          recovery = readRecovery(storageKey);
        } catch (e) {
          if (alive) setStorageWarning((e as Error).message);
        }
        if (recovery) {
          const restored = await requestMock<PublicMockAttempt>(
            `/api/mock-tests/${recovery.token.split(".")[0]}`,
            recovery.token,
          );
          if (!alive) return;
          tokenRef.current = recovery.token;
          accept(restored);
          const draft =
            !restored.result && recovery.revision === restored.revision
              ? Object.fromEntries(
                  Object.entries(recovery.answers).filter(([id]) =>
                    restored.questions.some((q) => q.id === id),
                  ),
                )
              : restored.answers;
          setAnswers(draft);
          setMarked(
            recovery.marked.filter((id) =>
              restored.questions.some((q) => q.id === id),
            ),
          );
          setIndex(
            Math.max(
              0,
              Math.min(restored.questions.length - 1, recovery.index),
            ),
          );
          setStatus(
            restored.result
              ? "Result saved on the practice server"
              : "Test restored. The timer continued while you were away.",
          );
        }
      } catch (e) {
        if (alive) setError((e as Error).message);
      } finally {
        if (alive) setLoading(false);
      }
    }
    void load();
    return () => {
      alive = false;
    };
  }, [chapter.className, chapter.subject, chapter.chapter, storageKey, accept]);
  useEffect(() => {
    if (!attempt || !tokenRef.current) return;
    try {
      localStorage.setItem(
        storageKey,
        JSON.stringify({
          version: 1,
          token: tokenRef.current,
          answers,
          revision: revisionRef.current,
          marked,
          index,
        } satisfies Recovery),
      );
    } catch {
      setStorageWarning(
        "Browser recovery storage is unavailable. Keep this tab open; your responses can still save to the practice server.",
      );
    }
  }, [attempt, answers, marked, index, storageKey]);

  const send = useCallback(
    (operation: "save" | "submit" | "read", keepalive = false) => {
      const capturedToken = tokenRef.current;
      const task = async () => {
        const current = attemptRef.current;
        if (!current || current.result || capturedToken !== tokenRef.current)
          return current;
        if (conflictRef.current && operation !== "read")
          throw new Error(
            "Reload the server-saved test to resolve the other-tab change.",
          );
        try {
          const next = await requestMock<PublicMockAttempt>(
            `/api/mock-tests/${current.id}`,
            capturedToken,
            operation === "read"
              ? "GET"
              : operation === "submit"
                ? "POST"
                : "PATCH",
            operation === "read"
              ? undefined
              : {
                  revision: revisionRef.current,
                  answers: cleanAnswers(current.questions, answersRef.current),
                },
            keepalive,
          );
          if (
            operation === "read" &&
            !next.result &&
            next.revision !== revisionRef.current
          )
            throw new MockRequestError(
              409,
              "This test changed in another tab. Reload the server-saved responses.",
            );
          accept(next);
          if (operation === "read" && !next.result) autoFired.current = false;
          if (mounted.current) {
            setStatus(
              next.result
                ? "Result saved on the practice server"
                : "Responses saved to the practice server",
            );
            setError("");
          }
          return next;
        } catch (e) {
          if (e instanceof MockRequestError && e.status === 409)
            conflictRef.current = true;
          if (mounted.current) {
            setError((e as Error).message);
            setStatus(
              "Not saved to the server. Browser recovery data is kept where available.",
            );
          }
          throw e;
        }
      };
      const pending = queue.current.catch(() => {}).then(task);
      queue.current = pending;
      return pending;
    },
    [accept],
  );
  const sendRef = useRef(send);
  sendRef.current = send;
  useEffect(() => {
    if (!attempt || attempt.result) return;
    const timeout = setTimeout(() => {
      void send("save").catch(() => {});
    }, 400);
    return () => clearTimeout(timeout);
    // Save response edits, not every timer or status render.
  }, [answers, attempt?.id, !!attempt?.result, send]);
  useEffect(() => {
    const leave = () => {
      void sendRef.current("save", true).catch(() => {});
    };
    const hide = () => {
      if (document.visibilityState === "hidden") leave();
      else void sendRef.current("read").catch(() => {});
    };
    window.addEventListener("pagehide", leave);
    document.addEventListener("visibilitychange", hide);
    return () => {
      window.removeEventListener("pagehide", leave);
      document.removeEventListener("visibilitychange", hide);
      void sendRef.current("save", true).catch(() => {});
    };
  }, []);
  useEffect(() => {
    if (!attempt || attempt.result) return;
    const tick = () => {
      const estimatedNow =
        clockRef.current.serverNow +
        performance.now() -
        clockRef.current.monotonic;
      setRemaining(
        Math.max(0, Math.ceil((attempt.expiresAt - estimatedNow) / 1000)),
      );
    };
    tick();
    const timer = setInterval(tick, 250);
    return () => clearInterval(timer);
  }, [attempt]);
  useEffect(() => {
    if (!attempt || attempt.result || remaining > 0 || autoFired.current)
      return;
    autoFired.current = true;
    setConfirm(false);
    setBusy(true);
    void send("read")
      .catch(() => {})
      .finally(() => {
        if (mounted.current) setBusy(false);
      });
  }, [attempt, remaining, send]);
  useEffect(() => {
    if (confirm)
      confirmRef.current?.querySelector<HTMLButtonElement>("button")?.focus();
  }, [confirm]);
  const sizes = catalog?.sizes[difficulty] ?? [];

  async function start() {
    setBusy(true);
    setError("");
    try {
      const started = await requestMock<{
        token: string;
        attempt: PublicMockAttempt;
      }>("/api/mock-tests", undefined, "POST", {
        ...chapter,
        count,
        difficulty,
      });
      tokenRef.current = started.token;
      conflictRef.current = false;
      autoFired.current = false;
      answersRef.current = {};
      setAnswers({});
      setMarked([]);
      setIndex(0);
      accept(started.attempt);
      setStatus(
        "Test started. Responses are saved locally, not to a cloud account.",
      );
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setBusy(false);
    }
  }
  async function reloadSaved() {
    const current = attemptRef.current;
    if (!current) return;
    setBusy(true);
    try {
      await queue.current.catch(() => {});
      const restored = await requestMock<PublicMockAttempt>(
        `/api/mock-tests/${current.id}`,
        tokenRef.current,
      );
      conflictRef.current = false;
      setAnswers(restored.answers);
      accept(restored);
      setError("");
      setStatus("Loaded server-saved responses.");
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setBusy(false);
    }
  }
  async function submit() {
    const current = attemptRef.current;
    if (!current) return;
    if (
      current.questions.some(
        (q) =>
          q.type === "numerical" &&
          typeof answersRef.current[q.id] === "string" &&
          (answersRef.current[q.id] as string).trim() &&
          !numeric(answersRef.current[q.id] as string),
      )
    ) {
      setError(
        "Complete or clear the invalid numerical response before submitting.",
      );
      setConfirm(false);
      return;
    }
    setBusy(true);
    try {
      await send("save");
      await send("submit");
      setConfirm(false);
    } catch {
    } finally {
      setBusy(false);
    }
  }
  function retry(nextDifficulty?: Difficulty) {
    if (attempt) {
      const level =
        nextDifficulty ??
        (["easy", "medium", "hard"].includes(attempt.config.difficulty)
          ? attempt.config.difficulty
          : "easy");
      setDifficulty(level);
      setCount(
        !nextDifficulty &&
          mockCountsByDifficulty[level].includes(attempt.config.count)
          ? attempt.config.count
          : 10,
      );
    }
    tokenRef.current = "";
    attemptRef.current = null;
    autoFired.current = false;
    conflictRef.current = false;
    setAttempt(null);
    setAnswers({});
    setMarked([]);
    setIndex(0);
    setError("");
    try {
      localStorage.removeItem(storageKey);
    } catch {}
  }
  const question = attempt?.questions[index];
  const answered =
    attempt?.questions.filter((q) => hasAnswer(q, answers[q.id])).length ?? 0;
  const frozen = busy || remaining <= 0 || conflictRef.current;
  return (
    <section
      className="mock-section"
      id="chapter-mock-test"
      aria-labelledby="mock-heading"
    >
      <div className="section-heading">
        <div>
          <div className="eyebrow">Chapter practice</div>
          <h2 id="mock-heading">Chapter mock test</h2>
        </div>
        <span className="small muted">Guest practice · No sign-in</span>
      </div>
      <p className="mock-storage-note">
        {(attempt?.storage ?? catalog?.storage) === "supabase"
          ? "Guest responses are stored in Supabase on the server. Keep this browser's recovery data to reopen your private attempt; there is no account sync."
          : "Browser recovery + local practice server. Keep your browser data to resume. Local server data does not persist across Vercel instances."}
      </p>
      {attempt?.developmentSample && (
        <p className="notice">
          Temporary original development sample · For testing the engine, not an
          official examination paper.
        </p>
      )}
      {loading ? (
        <p role="status" className="inline-empty">
          Loading chapter tests…
        </p>
      ) : (
        <>
          {storageWarning && (
            <p role="status" className="notice">
              {storageWarning}
            </p>
          )}
          {catalogError && (
            <div className="notice error" role="alert">
              <p>{catalogError}</p>
              <button onClick={() => location.reload()}>
                Reload test availability
              </button>
            </div>
          )}
          {error && (
            <div className="notice error" role="alert">
              <p>{error}</p>
              {attempt ? (
                <>
                  <button
                    onClick={() => {
                      void (
                        remaining <= 0 ? reloadSaved() : send("save")
                      ).catch(() => {});
                    }}
                    disabled={busy}
                  >
                    Retry connection
                  </button>
                  {conflictRef.current && (
                    <button onClick={reloadSaved} disabled={busy}>
                      Reload server-saved responses
                    </button>
                  )}
                </>
              ) : (
                !catalog && (
                  <button onClick={() => location.reload()}>
                    Reload tests
                  </button>
                )
              )}
            </div>
          )}
          {attempt?.result ? (
            <MockResults
              result={attempt.result}
              difficulty={attempt.config.difficulty}
              onRetry={() => retry()}
              onNextDifficulty={(next) => retry(next)}
            />
          ) : attempt && question ? (
            <>
              <div className="mock-running-bar">
                <div>
                  <strong>{attempt.chapterTitle}</strong>
                  <span>
                    {attempt.questions.length} questions ·{" "}
                    {attempt.config.difficulty} · +4 correct
                  </span>
                </div>
                <div
                  className={`mock-timer ${remaining <= 60 ? "is-urgent" : ""}`}
                  role="timer"
                  aria-label={`${remaining} seconds remaining`}
                >
                  <Clock size={16} />
                  {clock(remaining)}
                </div>
                <button
                  ref={submitRef}
                  className="primary"
                  onClick={() => setConfirm(true)}
                  disabled={frozen}
                >
                  Submit test
                </button>
              </div>
              <p className="mock-save-status" role="status">
                {status}
                {remaining <= 0 && !attempt.result
                  ? " Time is up. Reconnect to retrieve your result."
                  : ""}
              </p>
              <div className="mock-scoring">
                Single correct: +4 / −1. Numerical: +4 / 0. Multiple correct: +4
                for the exact set, otherwise 0. Unattempted: 0. No partial
                marks.
              </div>
              <div className="mock-exam-layout">
                <div className="mock-question-area" ref={questionRef}>
                  <div className="mock-question-meta">
                    <span>
                      Question {index + 1} of {attempt.questions.length}
                    </span>
                    <span>
                      {question.difficulty} ·{" "}
                      {question.type === "single"
                        ? "Single correct"
                        : question.type === "multiple"
                          ? "Multiple correct"
                          : "Numerical answer"}
                    </span>
                  </div>
                  <fieldset disabled={frozen} className="mock-answer-fieldset">
                    <legend>{question.prompt}</legend>
                    {question.type === "numerical" ? (
                      <label className="mock-numerical">
                        Your numerical answer
                        <input
                          type="text"
                          inputMode="decimal"
                          maxLength={64}
                          value={
                            typeof answers[question.id] === "string"
                              ? (answers[question.id] as string)
                              : ""
                          }
                          onChange={(e) =>
                            setAnswers((prev) => ({
                              ...prev,
                              [question.id]: e.target.value,
                            }))
                          }
                          aria-invalid={
                            typeof answers[question.id] === "string" &&
                            !!(answers[question.id] as string).trim() &&
                            !numeric(answers[question.id] as string)
                          }
                        />
                        <small>
                          Use the units requested in the question. A negative
                          sign or decimal is allowed.
                        </small>
                      </label>
                    ) : (
                      question.options?.map((option, n) => (
                        <label className="mock-option" key={n}>
                          <input
                            type={
                              question.type === "multiple"
                                ? "checkbox"
                                : "radio"
                            }
                            name={`mock-${attempt.id}-${question.id}`}
                            checked={
                              question.type === "multiple"
                                ? Array.isArray(answers[question.id]) &&
                                  (answers[question.id] as number[]).includes(n)
                                : answers[question.id] === n
                            }
                            onChange={(e) =>
                              setAnswers((prev) => ({
                                ...prev,
                                [question.id]:
                                  question.type === "single"
                                    ? n
                                    : e.target.checked
                                      ? [
                                          ...(Array.isArray(prev[question.id])
                                            ? (prev[question.id] as number[])
                                            : []),
                                          n,
                                        ]
                                      : (prev[question.id] as number[]).filter(
                                          (v) => v !== n,
                                        ),
                              }))
                            }
                          />
                          <span className="mock-option-letter">
                            {String.fromCharCode(65 + n)}
                          </span>
                          <span>{option}</span>
                        </label>
                      ))
                    )}
                  </fieldset>
                  <div className="mock-question-tools">
                    <button
                      className="subtle-button"
                      aria-pressed={marked.includes(question.id)}
                      onClick={() =>
                        setMarked((prev) =>
                          prev.includes(question.id)
                            ? prev.filter((id) => id !== question.id)
                            : [...prev, question.id],
                        )
                      }
                      disabled={frozen}
                    >
                      <Bookmark size={15} />
                      {marked.includes(question.id)
                        ? "Marked for review"
                        : "Mark for review"}
                    </button>
                    <button
                      className="text-button"
                      disabled={frozen || answers[question.id] === undefined}
                      onClick={() =>
                        setAnswers((prev) => {
                          const next = { ...prev };
                          delete next[question.id];
                          return next;
                        })
                      }
                    >
                      Clear response
                    </button>
                  </div>
                  <div className="mock-question-navigation">
                    <button
                      className="subtle-button"
                      disabled={index === 0}
                      onClick={() => navigateQuestion(index - 1)}
                    >
                      <ArrowLeft size={15} />
                      Previous
                    </button>
                    <button
                      className="subtle-button"
                      disabled={index === attempt.questions.length - 1}
                      onClick={() => navigateQuestion(index + 1)}
                    >
                      Next
                      <ArrowRight size={15} />
                    </button>
                  </div>
                </div>
                <aside
                  className="mock-palette"
                  aria-label="Question navigation"
                >
                  <h3>Questions</h3>
                  <p>
                    {answered} answered · {attempt.questions.length - answered}{" "}
                    unanswered
                  </p>
                  <div className="mock-number-grid">
                    {attempt.questions.map((q, n) => (
                      <button
                        key={q.id}
                        aria-label={`Question ${n + 1}, ${hasAnswer(q, answers[q.id]) ? "answered" : "unanswered"}${marked.includes(q.id) ? ", marked for review" : ""}`}
                        aria-current={index === n ? "step" : undefined}
                        data-answered={hasAnswer(q, answers[q.id])}
                        data-marked={marked.includes(q.id)}
                        onClick={() => navigateQuestion(n)}
                      >
                        {n + 1}
                        {marked.includes(q.id) && <Bookmark size={9} />}
                      </button>
                    ))}
                  </div>
                  <p>
                    {marked.length} marked for review. Marking does not clear an
                    answer.
                  </p>
                </aside>
              </div>
              {confirm && (
                <div
                  ref={confirmRef}
                  className="mock-submit-confirm"
                  role="dialog"
                  aria-labelledby="mock-confirm-heading"
                  onKeyDown={(e) => {
                    if (e.key === "Escape") {
                      setConfirm(false);
                      submitRef.current?.focus();
                    }
                  }}
                >
                  <h3 id="mock-confirm-heading">Submit this test?</h3>
                  <p>
                    {answered} answered, {attempt.questions.length - answered}{" "}
                    unanswered, {marked.length} marked for review. Submission is
                    final; you can start a new attempt afterward.
                  </p>
                  <div className="row">
                    <button
                      className="subtle-button"
                      onClick={() => {
                        setConfirm(false);
                        submitRef.current?.focus();
                      }}
                    >
                      Keep working
                    </button>
                    <button
                      className="primary"
                      disabled={busy}
                      onClick={submit}
                    >
                      {busy ? "Submitting…" : "Confirm submission"}
                    </button>
                  </div>
                </div>
              )}
              <p className="mock-deadline-note">
                The server enforces the deadline. At expiry, the last
                server-saved responses are graded. Refreshing or leaving this
                page does not pause the test.
              </p>
            </>
          ) : catalog ? (
            <>
              <h3 className="mock-instructions-title">Before you begin</h3>
              {catalog.developmentSample && (
                <p className="notice">
                  Temporary original development sample · Not an official paper
                  or a subject-expert-approved question bank.
                </p>
              )}
              <p className="mock-intro">
                Choose any difficulty. Each test uses only that difficulty.{" "}
                {catalog.title} · Class {chapter.className}.
              </p>
              <p
                className="mock-intro"
                aria-label="Approved questions available"
              >
                Approved questions: Easy {catalog.approvedCounts.easy} · Medium{" "}
                {catalog.approvedCounts.medium} · Hard{" "}
                {catalog.approvedCounts.hard}.
                {catalog.developmentSample &&
                  " Development samples are listed separately and do not count as approved."}
              </p>
              <div className="mock-setup">
                <label>
                  Difficulty
                  <select
                    value={difficulty}
                    onChange={(e) => {
                      const level = e.target.value as Difficulty;
                      setDifficulty(level);
                      setCount(10);
                    }}
                  >
                    {(["easy", "medium", "hard"] as const).map((level) => (
                      <option key={level} value={level}>
                        {level === "easy"
                          ? "Easy"
                          : level === "medium"
                            ? "Medium"
                            : "Hard"}{" "}
                        ({catalog.approvedCounts[level]} approved
                        {catalog.counts[level] > catalog.approvedCounts[level]
                          ? ` + ${catalog.counts[level] - catalog.approvedCounts[level]} development samples`
                          : ""}
                        )
                      </option>
                    ))}
                  </select>
                </label>
                <label>
                  Questions
                  <select
                    value={count}
                    onChange={(e) =>
                      setCount(Number(e.target.value) as MockQuestionCount)
                    }
                  >
                    {mockCountsByDifficulty[difficulty].map((n) => (
                      <option key={n} value={n} disabled={!sizes.includes(n)}>
                        {n} questions{sizes.includes(n) ? "" : " — unavailable"}
                      </option>
                    ))}
                  </select>
                </label>
                <label>
                  Test duration
                  <input readOnly value={duration + " minutes"} />
                </label>
                <button
                  className="primary"
                  disabled={busy || !sizes.includes(count)}
                  onClick={start}
                >
                  {busy ? "Starting…" : "Start test"}
                  <ArrowRight size={16} />
                </button>
              </div>
              <p className="mock-difficulty-description">
                {difficultyDescriptions[difficulty]}
              </p>
              {!sizes.includes(count) && (
                <div className="mock-empty" role="status">
                  <h3>
                    {catalog.counts[difficulty]
                      ? "More questions are needed"
                      : "Coming soon — no mock test available yet"}
                  </h3>
                  <p>
                    {catalog.approvedCounts[difficulty]} approved {difficulty}{" "}
                    questions. At least {count} in the same difficulty are
                    required. This combination is unavailable; other chapter
                    resources remain accessible.
                    {catalog.draftCounts[difficulty] > 0 &&
                      ` ${catalog.draftCounts[difficulty]} draft questions await academic review and approval.`}
                  </p>
                </div>
              )}
              <ul className="mock-instructions">
                <li>
                  {count} questions · Maximum {count * 4} marks · {duration}{" "}
                  minutes.
                </li>
                <li>
                  GNOSIS practice timings, not official examination timings.
                </li>
                <li>
                  The timer starts when you press Start test. Refreshing does
                  not pause or reset it.
                </li>
                <li>
                  Use the palette, Previous/Next, Clear response and Mark for
                  review. Marked answers are still graded.
                </li>
                <li>
                  Submission is final. At expiry, the last server-saved
                  responses are submitted automatically.
                </li>
              </ul>
              <p className="mock-deadline-note">
                Single-correct: +4 / −1; numerical: +4 / 0; multiple-correct: +4
                for the exact set, otherwise 0. Unattempted: 0.
              </p>
            </>
          ) : null}
        </>
      )}
    </section>
  );
}
function MockResults({
  result,
  onRetry,
  difficulty,
  onNextDifficulty,
}: {
  result: MockResult;
  difficulty: Difficulty;
  onRetry: () => void;
  onNextDifficulty: (difficulty: Difficulty) => void;
}) {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const reviewRef = useRef<HTMLElement>(null);
  const [reviewMistakes, setReviewMistakes] = useState(false);
  const nextDifficulty = nextMockDifficulty(difficulty);
  useEffect(() => {
    headingRef.current?.focus({ preventScroll: true });
    headingRef.current?.scrollIntoView({
      block: "start",
      behavior: matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "auto"
        : "smooth",
    });
  }, []);
  return (
    <div className="mock-results">
      <div className="section-heading">
        <div>
          <h3 ref={headingRef} tabIndex={-1} className="mock-results-heading">
            Test results
          </h3>
          <p>
            {result.reason === "expired"
              ? "Time expired. Last server-saved responses were submitted automatically."
              : "Your test was submitted."}{" "}
            Results are saved on the practice server. Keep your private browser
            recovery data to reopen this guest attempt.
          </p>
        </div>
        <button className="subtle-button" onClick={onRetry}>
          <RotateCcw size={15} />
          Retry test
        </button>
      </div>
      <div className="mock-next-step">
        <p>
          {nextDifficulty
            ? "Continue at your own pace. Every difficulty remains open; availability depends on the question bank."
            : "Revisit the solutions before starting another attempt."}
        </p>
        {nextDifficulty ? (
          <button
            className="subtle-button"
            onClick={() => onNextDifficulty(nextDifficulty)}
          >
            Try {nextDifficulty === "medium" ? "Medium" : "Hard"}
            <ArrowRight size={15} />
          </button>
        ) : (
          <button
            className="subtle-button"
            onClick={() => {
              setReviewMistakes(true);
              reviewRef.current?.scrollIntoView({
                block: "start",
                behavior: matchMedia("(prefers-reduced-motion: reduce)").matches
                  ? "auto"
                  : "smooth",
              });
            }}
          >
            Review mistakes
          </button>
        )}
      </div>
      <dl className="mock-result-stats">
        {[
          ["Marks obtained", `${result.marksObtained} / ${result.totalMarks}`],
          ["Accuracy", `${result.accuracy}%`],
          ["Correct", result.correct],
          ["Wrong", result.wrong],
          ["Unattempted", result.unattempted],
          ["Time taken", clock(result.timeTakenSeconds)],
        ].map(([label, value]) => (
          <div key={label}>
            <dt>{label}</dt>
            <dd>{value}</dd>
          </div>
        ))}
      </dl>
      <p className="small muted">
        Accuracy = correct ÷ attempted questions. Total marks:{" "}
        {result.totalMarks}. Scores may be negative because of single-correct
        penalties.
      </p>
      <section className="mock-topic-analysis">
        <h3>Topics to revisit</h3>
        <p>
          Based only on this attempt. Unattempted topics are not labelled weak.
        </p>
        <div className="mock-topic-table">
          {result.topics.map((topic) => (
            <div key={topic.topic}>
              <strong>{topic.topic}</strong>
              <span>
                {topic.correct}/{topic.total} correct · {topic.wrong} wrong ·{" "}
                {topic.unattempted} unattempted
              </span>
              <span>
                {topic.status === "revise"
                  ? "Revise"
                  : topic.status === "not-attempted"
                    ? "Not attempted"
                    : "Practised"}
                {topic.accuracy === null
                  ? ""
                  : ` · ${topic.accuracy}% accuracy`}
              </span>
            </div>
          ))}
        </div>
      </section>
      <section className="mock-review" ref={reviewRef}>
        <h3>Question review</h3>
        {result.items.map((item, i) => (
          <details
            key={`${item.question.id}-${reviewMistakes}`}
            className="mock-review-item"
            open={reviewMistakes && item.outcome === "wrong" ? true : undefined}
          >
            <summary>
              <span>
                Question {i + 1} · {item.question.topic}
              </span>
              <span className={`mock-outcome ${item.outcome}`}>
                {item.outcome} · {item.marks > 0 ? "+" : ""}
                {item.marks} marks
              </span>
            </summary>
            <h4>{item.question.prompt}</h4>
            <p>
              <strong>Your answer:</strong>{" "}
              {displayAnswer(item.question, item.answer)}
            </p>
            <p>
              <strong>Correct answer:</strong>{" "}
              {displayAnswer(
                item.question,
                item.question.type === "numerical"
                  ? String(item.correct)
                  : item.correct,
              )}
              {item.tolerance === undefined
                ? ""
                : ` (tolerance ±${item.tolerance})`}
            </p>
            <p className="mock-explanation">{item.explanation}</p>
            <p className="small muted">
              Source: {item.source.label}
              {item.source.reference ? ` · ${item.source.reference}` : ""}.
              Verification: {item.verification.method}
            </p>
          </details>
        ))}
      </section>
    </div>
  );
}
