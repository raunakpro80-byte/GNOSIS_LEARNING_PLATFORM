"use client";
import { useEffect, useState } from "react";
import {
  ArrowRight,
  Check,
  Eye,
  FileUp,
  Plus,
  Save,
  Shield,
  Sparkles,
} from "lucide-react";
import { api } from "@/lib/client";
import { youtubeId } from "@/lib/learning";
import type { Lesson, PublicLesson } from "@/lib/types";
import { lessonSchema } from "@/lib/schema";
import Video from "./Video";
import PdfReader from "./PdfReader";
export default function Admin({ onPublished }: { onPublished: () => void }) {
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [editor, setEditor] = useState("");
  const [authorized, setAuthorized] = useState(false);
  const [message, setMessage] = useState("Checking administrator access…");
  const [busy, setBusy] = useState(false);
  const [reviewed, setReviewed] = useState(false);
  const [video, setVideo] = useState("");
  const [preview, setPreview] = useState(false);
  const load = () =>
    api("/api/admin")
      .then((rows) => {
        setAuthorized(true);
        const list = rows.map((r: { payload: Lesson }) => r.payload);
        setLessons(list);
        if (!editor && list[0]) setEditor(JSON.stringify(list[0], null, 2));
        setMessage(
          list.length
            ? "Content loaded."
            : "Create your first lesson, or use the sample template.",
        );
      })
      .catch((e) => {
        setAuthorized(false);
        setMessage(e.message);
      });
  useEffect(() => {
    void load();
  }, []); // Access is also checked independently on every server request.
  const parse = () => lessonSchema.parse(JSON.parse(editor));
  const change = (fn: (l: Lesson) => Lesson) => {
    try {
      setEditor(JSON.stringify(fn(parse()), null, 2));
      setReviewed(false);
    } catch {
      setMessage("Fix the lesson JSON before using these controls.");
    }
  };
  const action = async (fn: () => Promise<void>) => {
    setBusy(true);
    try {
      await fn();
    } catch (e) {
      setMessage((e as Error).message);
    } finally {
      setBusy(false);
    }
  };
  const newLesson = () => {
    setEditor(
      JSON.stringify(
        {
          id: "new-lesson",
          className: "12",
          title: "New lesson",
          subject: "Physics",
          chapter: "Current Electricity",
          description: "",
          videoId: null,
          transcriptVerified: false,
          segments: [],
          cards: [],
          pdfUrl: "",
          excerpts: [],
          questions: [],
          status: "Draft",
          fixture: false,
        },
        null,
        2,
      ),
    );
    setReviewed(false);
  };
  return (
    <>
      <div className="page-heading">
        <div>
          <div className="eyebrow">PROTECTED CONTENT STUDIO</div>
          <h1>Good teaching starts here.</h1>
          <p>Prepare thoughtfully. Review carefully. Publish deliberately.</p>
        </div>
        <span className="pill">
          <Shield size={12} />
          ADMIN ONLY
        </span>
      </div>
      <div className="notice" role="status">
        {message}
      </div>
      {!authorized ? (
        <div className="panel">
          <h3>Administrator access required</h3>
          <p>
            Connect Supabase, sign in, and assign your user ID an admin role
            using the migration instructions. Hidden controls never grant
            access.
          </p>
          <button className="subtle-button" onClick={() => void load()}>
            Retry authorization
          </button>
        </div>
      ) : (
        <>
          <div className="studio-toolbar">
            <button className="primary" onClick={newLesson}>
              <Plus size={16} />
              New subject / chapter / lesson
            </button>
            <select
              aria-label="Select lesson to edit"
              value=""
              onChange={(e) => {
                const l = lessons.find((l) => l.id === e.target.value);
                if (l) {
                  setEditor(JSON.stringify(l, null, 2));
                  setReviewed(false);
                }
              }}
            >
              <option value="">Open an existing lesson…</option>
              {lessons.map((l) => (
                <option key={l.id} value={l.id}>
                  {l.title} · {l.status}
                </option>
              ))}
            </select>
            <button
              className="subtle-button"
              onClick={() =>
                action(async () => {
                  const l = await api("/api/admin?template=1");
                  setEditor(JSON.stringify({ ...l, status: "Draft" }, null, 2));
                  setReviewed(false);
                })
              }
            >
              Load demo template
            </button>
          </div>
          <div className="workflow">
            {["Draft", "Processing", "Review", "Published"].map((s, i) => (
              <span key={s}>
                {i > 0 && <ArrowRight size={14} />}
                <span className="pill">{s}</span>
              </span>
            ))}
          </div>
          {editor && (
            <>
              <section className="panel form-grid">
                <h2>Lesson preparation</h2>
                <p>
                  Edit subject and chapter names in the lesson record to create
                  them when saving. Upload a matching transcript and confirm the
                  mapping against the video.
                </p>
                <div className="row">
                  <label className="grow">
                    YouTube URL
                    <input
                      value={video}
                      onChange={(e) => setVideo(e.target.value)}
                      placeholder="https://www.youtube.com/watch?v=…"
                    />
                  </label>
                  <button
                    className="subtle-button"
                    onClick={() => {
                      try {
                        const id = youtubeId(video);
                        change((l) => ({
                          ...l,
                          videoId: id,
                          transcriptVerified: false,
                        }));
                        setMessage(
                          "Video ID extracted. Recheck transcript mapping before enabling sync.",
                        );
                      } catch (e) {
                        setMessage((e as Error).message);
                      }
                    }}
                  >
                    Validate & attach
                  </button>
                </div>
                <label className="upload">
                  <FileUp size={21} />
                  Upload notes PDF or VTT / SRT / JSON transcript
                  <input
                    type="file"
                    accept=".pdf,.vtt,.srt,.json"
                    disabled={busy}
                    onChange={(e) => {
                      const f = e.target.files?.[0];
                      if (!f) return;
                      void action(async () => {
                        const data = new FormData();
                        data.set("file", f);
                        const r = await api("/api/admin/upload", {
                          method: "POST",
                          body: data,
                        });
                        change((l) => ({
                          ...l,
                          ...(r.segments
                            ? {
                                segments: r.segments,
                                transcriptVerified: false,
                              }
                            : { pdfUrl: r.pdfUrl, excerpts: r.excerpts }),
                          status: "Processing",
                        }));
                        setMessage(
                          r.segments
                            ? `Parsed ${r.segments.length} segments; ${r.gaps.length} gap(s). Confirm mapping and add reviewed cards per segment.`
                            : `Extracted ${r.excerpts.length} readable pages. Review excerpts before publishing.`,
                        );
                      });
                    }}
                  />
                  <small>
                    10 MB maximum. PDFs must contain searchable text; scanned
                    files need OCR.
                  </small>
                </label>
                <div className="row">
                  <button
                    className="subtle-button"
                    disabled={busy}
                    onClick={() =>
                      action(async () => {
                        const r = await api("/api/admin/drafts", {
                          method: "POST",
                          body: JSON.stringify({ lesson: parse() }),
                        });
                        change((l) => ({
                          ...l,
                          cards: r.cards,
                          status: "Review",
                        }));
                        setMessage(r.label);
                      })
                    }
                  >
                    <Sparkles size={16} />
                    Prepare concept drafts
                  </button>
                  <button
                    className="subtle-button"
                    onClick={() => {
                      try {
                        parse();
                        setPreview((v) => !v);
                      } catch (e) {
                        setMessage((e as Error).message);
                      }
                    }}
                  >
                    <Eye size={16} />
                    Preview lesson
                  </button>
                </div>
              </section>
              <section className="panel form-grid">
                <label>
                  Lesson content (validated JSON)
                  <textarea
                    className="json-editor"
                    spellCheck={false}
                    value={editor}
                    onChange={(e) => {
                      setEditor(e.target.value);
                      setReviewed(false);
                    }}
                  />
                </label>
                <p className="small muted">
                  Includes metadata, excerpts, reviewed cards, transcript
                  segments, and verified questions with zero-based answer
                  indices. Every sourceId must match a supplied excerpt or
                  segment. “transcriptVerified” is a human review assertion.
                </p>
                <label className="check-row">
                  <input
                    type="checkbox"
                    checked={reviewed}
                    onChange={(e) => setReviewed(e.target.checked)}
                  />
                  <span>
                    I reviewed the source mapping, concept cards, question
                    answers, and explanations. This content is ready for its
                    selected stage.
                  </span>
                </label>
                <div className="row">
                  <button
                    className="primary"
                    disabled={busy}
                    onClick={() =>
                      action(async () => {
                        const l = parse();
                        await api("/api/admin", {
                          method: "POST",
                          body: JSON.stringify({ lesson: l, reviewed }),
                        });
                        setMessage(`${l.title} saved as ${l.status}.`);
                        onPublished();
                        await load();
                      })
                    }
                  >
                    <Save size={16} />
                    {busy ? "Saving…" : "Save selected stage"}
                  </button>
                  <button
                    className="subtle-button"
                    disabled={busy}
                    onClick={() => change((l) => ({ ...l, status: "Review" }))}
                  >
                    Move to review
                  </button>
                  <button
                    className="subtle-button"
                    disabled={!reviewed || busy}
                    onClick={() =>
                      action(async () => {
                        const l = { ...parse(), status: "Published" as const };
                        await api("/api/admin", {
                          method: "POST",
                          body: JSON.stringify({ lesson: l, reviewed }),
                        });
                        setEditor(JSON.stringify(l, null, 2));
                        setMessage("Published after explicit review.");
                        onPublished();
                        await load();
                      })
                    }
                  >
                    <Check size={16} />
                    Publish reviewed content
                  </button>
                  <button
                    className="subtle-button"
                    disabled={busy}
                    onClick={() =>
                      action(async () => {
                        const l = { ...parse(), status: "Draft" as const };
                        await api("/api/admin", {
                          method: "POST",
                          body: JSON.stringify({ lesson: l, reviewed: false }),
                        });
                        setEditor(JSON.stringify(l, null, 2));
                        setMessage(
                          "Unpublished. Content is now a private draft.",
                        );
                        onPublished();
                        await load();
                      })
                    }
                  >
                    Unpublish
                  </button>
                </div>
              </section>
              {preview && <Preview raw={editor} />}
            </>
          )}
        </>
      )}
    </>
  );
}
function Preview({ raw }: { raw: string }) {
  const [media, setMedia] = useState<PublicLesson | null>(null);
  const [error, setError] = useState("");
  useEffect(() => {
    let alive = true;
    setError("");
    try {
      const lesson = lessonSchema.parse(JSON.parse(raw));
      api("/api/admin/preview", {
        method: "POST",
        body: JSON.stringify({ lesson }),
      })
        .then((result) => {
          if (alive) setMedia(result);
        })
        .catch((e) => {
          if (alive) setError(e.message);
        });
    } catch {
      setError("Fix the lesson JSON to preview media.");
    }
    return () => {
      alive = false;
    };
  }, [raw]);
  try {
    const l = lessonSchema.parse(JSON.parse(raw));
    return (
      <section className="panel">
        <span className="eyebrow">ADMIN PREVIEW · {l.status}</span>
        <h2>{l.title}</h2>
        <p>
          {l.subject} / {l.chapter}
        </p>
        <p>{l.description}</p>
        {error && <p className="notice error">{error}</p>}
        {media && (
          <div className="two-grid">
            <Video
              videoId={media.videoId}
              initial={0}
              seek={null}
              onTime={() => {}}
            />
            {media.pdfUrl && <PdfReader url={media.pdfUrl} />}
          </div>
        )}
        {l.cards.map((c) => (
          <div className="concept" key={c.id}>
            <h3>{c.title}</h3>
            {c.formula && <p className="math">{c.formula}</p>}
            <p>{c.body}</p>
            <small>Source: {c.sourceId}</small>
          </div>
        ))}
        <h3>Verified question review</h3>
        {l.questions.map((q) => (
          <div className="concept" key={q.id}>
            <strong>{q.prompt}</strong>
            <p>Answer: {q.options[q.correct]}</p>
            <p>{q.explanation}</p>
          </div>
        ))}
      </section>
    );
  } catch {
    return <p className="notice error">Fix the lesson JSON to preview it.</p>;
  }
}
