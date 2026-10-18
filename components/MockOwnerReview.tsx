"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { api, supabase } from "@/lib/client";
import type { MockQuestion } from "@/lib/mock-types";
import type { MockReviewRecord } from "@/lib/mock-review";
import styles from "./MockOwnerReview.module.css";

const checks = [
  "answer",
  "solution",
  "units",
  "difficulty",
  "uniqueness",
  "wording",
] as const;
type Item = {
  question: MockQuestion;
  contentHash: string;
  review: MockReviewRecord | null;
  findings: unknown;
};
type Preview = { total: number; items: Item[] };
export default function MockOwnerReview() {
  const [chapter, setChapter] = useState(1),
    [offset, setOffset] = useState(0),
    [index, setIndex] = useState(0);
  const [preview, setPreview] = useState<Preview | null>(null),
    [error, setError] = useState(""),
    [status, setStatus] = useState("");
  const [busy, setBusy] = useState(false),
    [checked, setChecked] = useState<string[]>([]),
    [academic, setAcademic] = useState(false),
    [notes, setNotes] = useState("");
  const item = preview?.items[index];
  useEffect(() => {
    const subscription = supabase()?.auth.onAuthStateChange((event) => {
      if (event === "SIGNED_OUT" || event === "SIGNED_IN") {
        setPreview(null);
        setChecked([]);
        setAcademic(false);
        setNotes("");
        setError(
          "Account changed. Refresh access and reviews to verify owner access again.",
        );
      }
    });
    return () => subscription?.data.subscription.unsubscribe();
  }, []);
  async function load() {
    setError("");
    setBusy(true);
    try {
      setPreview(
        await api(
          `/api/mock-tests/review?chapter=${chapter}&offset=${offset}`,
          { cache: "no-store" },
        ),
      );
    } catch (e) {
      setPreview(null);
      setError((e as Error).message);
    } finally {
      setBusy(false);
    }
  }
  useEffect(() => {
    setIndex(0);
    setPreview(null);
    void load();
  }, [chapter, offset]); // Each API call independently checks the signed-in owner.
  useEffect(() => {
    setChecked([]);
    setAcademic(false);
    setNotes("");
    setStatus("");
  }, [item?.question.id]);
  async function decide(decision: "approved" | "draft" | "rejected") {
    if (!item) return;
    setBusy(true);
    setError("");
    try {
      await api("/api/mock-tests/review", {
        method: "POST",
        body: JSON.stringify({
          questionId: item.question.id,
          contentHash: item.contentHash,
          expectedVersion: item.review?.version ?? 0,
          decision,
          academicReviewed: academic,
          checks: Object.fromEntries(
            checks.map((key) => [key, checked.includes(key)]),
          ),
          notes,
        }),
      });
      await load();
      setStatus(
        `Saved: ${decision}. Only approved, unchanged records count toward student tests.`,
      );
      setChecked([]);
      setAcademic(false);
      setNotes("");
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setBusy(false);
    }
  }
  return (
    <main className={styles.review}>
      <Link href="/mock-tests/class-11/physics">← Physics mock tests</Link>
      <h1>Owner question review</h1>
      <p>Private academic review · Class 11 Physics · Original practice</p>
      <p>
        Sign in using your existing GNOSIS owner account. Review each answer
        independently; automated reports are advisory. Approval makes an
        unchanged question eligible immediately. A test size unlocks only when
        enough questions of that difficulty are approved.
      </p>
      <p>
        <Link href="/signin">Sign in</Link> ·{" "}
        <button type="button" disabled={busy} onClick={() => void load()}>
          Refresh access and reviews
        </button>
      </p>
      <label>
        Chapter{" "}
        <select
          value={chapter}
          disabled={busy}
          onChange={(e) => {
            setOffset(0);
            setChapter(Number(e.target.value));
          }}
        >
          {[
            "Units and Measurements",
            "Motion in a Straight Line",
            "Motion in a Plane",
            "Laws of Motion",
          ].map((title, i) => (
            <option key={title} value={i + 1}>
              {i + 1}. {title}
            </option>
          ))}
        </select>
      </label>
      {error && (
        <p role="alert">
          {error} Setup: configure Supabase URL, public anon key, server-only
          service role key and GNOSIS_MOCK_OWNER_ID; apply
          supabase/002_mock_tests.sql. Never enter service keys here.
        </p>
      )}
      {busy && <p role="status">Loading / saving…</p>}
      {status && <p role="status">{status}</p>}
      {item && (
        <>
          <nav
            aria-label="Review question navigation"
            className={styles.controls}
          >
            <button
              disabled={busy || (offset === 0 && index === 0)}
              onClick={() =>
                index > 0
                  ? setIndex(index - 1)
                  : setOffset(Math.max(0, offset - 20))
              }
            >
              Previous
            </button>
            <span>
              {offset + index + 1} of {preview!.total}
            </span>
            <button
              disabled={busy || offset + index + 1 >= preview!.total}
              onClick={() =>
                index + 1 < preview!.items.length
                  ? setIndex(index + 1)
                  : setOffset(offset + 20)
              }
            >
              Next question
            </button>
          </nav>
          <article key={item.question.id}>
            <p>
              {item.question.id} · {item.question.difficulty.toUpperCase()} ·{" "}
              {item.question.topic}
            </p>
            <p>
              Decision:{" "}
              {item.review?.content_hash === item.contentHash
                ? item.review.decision
                : "draft / needs review"}{" "}
              {item.review &&
                `· Previous reviewer ${item.review.reviewer_id} · ${item.review.reviewed_at}`}
            </p>
            <h2>{item.question.prompt}</h2>
            <ol type="A">
              {item.question.options?.map((option, i) => (
                <li key={i}>{option}</li>
              ))}
            </ol>
            <h3>Answer and solution — private</h3>
            <p>
              {item.question.type === "numerical"
                ? item.question.correct
                : (Array.isArray(item.question.correct)
                    ? item.question.correct
                    : [item.question.correct]
                  )
                    .map(
                      (i) =>
                        `${String.fromCharCode(65 + i)}: ${item.question.options?.[i]}`,
                    )
                    .join("; ")}
            </p>
            <p className={styles.solution}>{item.question.explanation}</p>
            <p>Source: {item.question.source.label}</p>
            <details open>
              <summary>
                Existing validation findings and proposed corrections
              </summary>
              <pre>{JSON.stringify(item.findings, null, 2)}</pre>
            </details>
            {item.review && <p>Previous review notes: {item.review.notes}</p>}
            <fieldset disabled={busy}>
              <legend>Independent academic review checklist</legend>
              {checks.map((key) => (
                <label key={key}>
                  <input
                    type="checkbox"
                    checked={checked.includes(key)}
                    onChange={(e) =>
                      setChecked(
                        e.target.checked
                          ? [...checked, key]
                          : checked.filter((x) => x !== key),
                      )
                    }
                  />
                  {key} checked independently; report concerns resolved
                </label>
              ))}
              <label>
                <input
                  type="checkbox"
                  checked={academic}
                  onChange={(e) => setAcademic(e.target.checked)}
                />
                I have completed or obtained qualified human Physics review of
                this exact question.
              </label>
              <label>
                Review notes (explain resolution of any flags)
                <textarea
                  value={notes}
                  maxLength={4000}
                  onChange={(e) => setNotes(e.target.value)}
                />
              </label>
            </fieldset>
            <div className={styles.controls}>
              <button
                disabled={
                  busy ||
                  !academic ||
                  checked.length !== checks.length ||
                  notes.trim().length < 10
                }
                onClick={() => void decide("approved")}
              >
                Approve this reviewed question
              </button>
              <button
                disabled={busy || notes.trim().length < 10}
                onClick={() => void decide("draft")}
              >
                Keep / return to draft
              </button>
              <button
                disabled={busy || notes.trim().length < 10}
                onClick={() => void decide("rejected")}
              >
                Reject for publication
              </button>
            </div>
          </article>
        </>
      )}
    </main>
  );
}
