"use client";
import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  ArrowRight,
  ArrowUpRight,
  Atom,
  BookOpen,
  Bookmark,
  Check,
  ChevronRight,
  Clock,
  FlaskConical,
  Flame,
  GraduationCap,
  Home,
  Lightbulb,
  LogOut,
  Menu,
  MessageCircle,
  NotebookPen,
  Play,
  Plus,
  Search,
  Settings,
  Shield,
  Sparkles,
  Target,
  Trash2,
  TrendingUp,
} from "lucide-react";
import { emptyState } from "@/lib/types";
import { api, supabase } from "@/lib/client";
import { clock, activeSegment, completion } from "@/lib/learning";
import type { PublicLesson, Attempt, LearningState } from "@/lib/types";
import { useLearning } from "./useLearning";
import Video from "./Video";
import PdfReader from "./PdfReader";
import Admin from "./Admin";
import StreakCard from "./StreakCard";
import { lessonsForClass } from "@/lib/catalog";
import { addStudySeconds, studyDay, streakSummary } from "@/lib/streak";
type Tab = "PDF" | "My Notes" | "Ask AI";
export default function Gnosis() {
  const router = useRouter();
  const path = usePathname();
  const view = path.split("/")[1] || "landing";
  const requestedId = path.split("/")[2] || "ohms-law";
  const { state, update, ready, user, status, save } = useLearning();
  const [catalog, setLessons] = useState<PublicLesson[]>([]);
  const lessons = lessonsForClass(catalog, state.profile.className);
  const lessonIds = new Set(lessons.map((l) => l.id));
  const classState = {
    ...state,
    notes: state.notes.filter((n) => lessonIds.has(n.lessonId)),
    bookmarks: state.bookmarks.filter((b) => lessonIds.has(b.lessonId)),
    attempts: state.attempts.filter((a) => lessonIds.has(a.lessonId)),
    progress: Object.fromEntries(
      Object.entries(state.progress).filter(([id]) => lessonIds.has(id)),
    ),
  };
  const [contentError, setContentError] = useState("");
  const [contentLoaded, setContentLoaded] = useState(false);
  const [mobile, setMobile] = useState(false);
  const [search, setSearch] = useState("");
  const [focus, setFocus] = useState(false);
  useEffect(() => {
    api("/api/content")
      .then(setLessons)
      .catch((e) => setContentError(e.message))
      .finally(() => setContentLoaded(true));
  }, []);
  const lesson =
    lessons.find((l) => l.id === requestedId) ??
    (view === "learn" ? undefined : lessons[0]);
  useEffect(() => {
    const close = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobile(false);
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, []);
  const go = (url: string) => {
    void save();
    setMobile(false);
    router.push(url);
  };
  const open = (id = lesson?.id) => go(`/learn/${id ?? "ohms-law"}`);
  if (view === "landing") return <Landing go={go} />;
  if (view === "signin") return <SignIn go={go} />;
  const nav = [
    { id: "dashboard", name: "My workspace", Icon: Home },
    { id: "subjects", name: "Subjects", Icon: BookOpen },
    { id: "notes", name: "My notes", Icon: NotebookPen },
    { id: "progress", name: "Learning progress", Icon: TrendingUp },
  ];
  return (
    <div className={focus ? "app focus-mode" : "app"}>
      <a className="skip" href="#main">
        Skip to content
      </a>
      <aside className={`sidebar ${mobile ? "is-open" : ""}`}>
        <button className="brand" onClick={() => go("/")}>
          <span className="brand-icon">
            <GraduationCap size={23} />
          </span>
          GNOSIS<span className="brand-dot">.</span>
        </button>
        <div className="workspace-label">YOUR LEARNING SPACE</div>
        <button className="profile-context" onClick={() => go("/settings")}>
          <div className="context-icon">
            <GraduationCap size={18} />
          </div>
          <div>
            <strong>
              Class {state.profile.className} · {state.profile.exam}
            </strong>
            <span>{state.profile.subjects.join(" + ")}</span>
          </div>
          <ChevronRight size={14} />
        </button>
        <nav>
          {nav.map(({ id, name, Icon }) => (
            <button
              className={view === id ? "nav-link active" : "nav-link"}
              key={id}
              onClick={() => go(`/${id}`)}
            >
              <Icon size={19} />
              {name}
              {view === id && <span className="active-dot" />}
            </button>
          ))}
        </nav>
        <div className="side-tip">
          <div className="tip-icon">
            <Lightbulb size={19} />
          </div>
          <strong>A little deeper, every day.</strong>
          <p>
            Understanding grows with curiosity. Make room for one good question.
          </p>
          <button onClick={() => open()}>
            Find your focus <ArrowRight size={14} />
          </button>
        </div>
        <div className="side-bottom">
          <button className="nav-link" onClick={() => go("/settings")}>
            <Settings size={18} />
            Preferences
          </button>
          <button className="nav-link" onClick={() => go("/admin")}>
            <Shield size={18} />
            Content studio
          </button>
          {user ? (
            <button
              className="nav-link"
              onClick={async () => {
                await save();
                await supabase()?.auth.signOut();
                go("/");
              }}
            >
              <LogOut size={18} />
              Sign out
            </button>
          ) : (
            <button className="nav-link" onClick={() => go("/signin")}>
              <LogOut size={18} />
              Sign in
            </button>
          )}
          <div className="quiet">
            <span /> A quieter way to learn
          </div>
        </div>
      </aside>
      {mobile && (
        <button
          className="overlay"
          aria-label="Close navigation"
          onClick={() => setMobile(false)}
        />
      )}
      <div className="app-body">
        <header className="topbar">
          <button
            className="icon-button mobile-menu"
            aria-label="Open navigation"
            onClick={() => setMobile(true)}
          >
            <Menu size={21} />
          </button>
          <div className="search-box">
            <Search size={17} />
            <input
              aria-label="Search available lessons"
              placeholder="Search for a concept, a little clarity…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            {search && (
              <div className="search-results">
                {lessons
                  .filter((l) =>
                    `${l.title} ${l.chapter} ${l.subject}`
                      .toLowerCase()
                      .includes(search.toLowerCase()),
                  )
                  .map((l) => (
                    <button
                      key={l.id}
                      onClick={() => {
                        setSearch("");
                        open(l.id);
                      }}
                    >
                      <Atom size={18} />
                      <span>
                        {l.title}
                        <small>
                          {l.subject} / {l.chapter}
                        </small>
                      </span>
                      <ArrowRight size={15} />
                    </button>
                  ))}
                {!lessons.some((l) =>
                  `${l.title} ${l.chapter} ${l.subject}`
                    .toLowerCase()
                    .includes(search.toLowerCase()),
                ) && <p>No available lesson matches. Try “Ohm”.</p>}
              </div>
            )}
          </div>
          <div className="top-actions">
            <button
              className="streak-pill"
              aria-label={`${streakSummary(state.activityDays).current} day study streak. View progress`}
              onClick={() => go("/progress")}
            >
              <Flame size={16} />
              {streakSummary(state.activityDays).current}
              <span>day streak</span>
            </button>
            <span className="demo-pill">
              <span />
              {user ? "Connected account" : "Local demo"}
            </span>
            <button
              className="focus-button"
              onClick={() => setFocus((v) => !v)}
            >
              <Target size={16} />
              {focus ? "Exit focus" : "Focus mode"}
            </button>
            <button
              className="avatar"
              aria-label="Edit your profile"
              onClick={() => go("/settings")}
            >
              {state.profile.name ? state.profile.name[0].toUpperCase() : "G"}
            </button>
          </div>
        </header>
        <main id="main" className="main">
          <div className="demo-banner">
            {user
              ? "Your private learning space"
              : "You’re exploring the demo. Progress is saved on this browser."}
            <span role="status">{status}</span>
          </div>
          {contentError && (
            <div className="notice error">
              {contentError}
              <button onClick={() => location.reload()}>
                Retry loading content
              </button>
            </div>
          )}
          {!ready && (
            <div className="notice">
              {status}
              <button onClick={() => location.reload()}>Reload</button>
            </div>
          )}
          {!ready ? (
            <p role="status">Loading your learning workspace…</p>
          ) : ready &&
            contentLoaded &&
            !lessons.length &&
            ["dashboard", "subjects", "learn"].includes(view) ? (
            <>
              <div className="empty panel">
                <BookOpen size={32} />
                <h2>
                  No lessons available for Class {state.profile.className} yet.
                </h2>
                <p>
                  {contentError
                    ? "Resolve the content connection error above, then retry."
                    : `We’re preparing lessons for Class ${state.profile.className}. You can change your class in Preferences.`}
                </p>
                <button
                  className="subtle-button"
                  onClick={() => go("/settings")}
                >
                  Change class in Preferences
                </button>
              </div>
              <StreakCard state={state} />
            </>
          ) : view === "onboarding" || view === "settings" ? (
            <Preferences
              state={state}
              update={update}
              onboarding={view === "onboarding"}
              saveStatus={status}
              demo={!user}
              onDone={() => go("/dashboard")}
            />
          ) : view === "admin" ? (
            <Admin onPublished={() => api("/api/content").then(setLessons)} />
          ) : view === "learn" ? (
            !ready ? (
              <p>Loading your learning data…</p>
            ) : lesson ? (
              <Workspace
                key={lesson.id}
                lesson={lesson}
                state={state}
                update={update}
                ready={ready}
                saveStatus={status}
                go={go}
              />
            ) : (
              <p>
                {contentLoaded
                  ? "This lesson is unavailable or unpublished. Choose an available lesson from Subjects."
                  : "Loading lesson…"}
              </p>
            )
          ) : view === "subjects" ? (
            <Subjects lessons={lessons} open={open} />
          ) : view === "notes" ? (
            <NotesLibrary
              state={classState}
              lessons={lessons}
              go={go}
              update={update}
            />
          ) : view === "progress" ? (
            <Progress state={classState} lessons={lessons} open={open} />
          ) : view === "dashboard" ? (
            <Dashboard
              state={classState}
              lessons={lessons}
              open={open}
              go={go}
            />
          ) : (
            <div className="panel">
              <h1>Page not found</h1>
              <button className="primary" onClick={() => go("/dashboard")}>
                Back to your workspace
              </button>
            </div>
          )}
          <footer>
            <span>
              <span className="tiny-dot" /> Quiet progress. Lasting
              understanding.
            </span>
            <span>GNOSIS · Made for curious minds</span>
          </footer>
        </main>
      </div>
    </div>
  );
}
function Landing({ go }: { go: (url: string) => void }) {
  return (
    <div className="landing">
      <header className="landing-header">
        <button className="brand" onClick={() => go("/")}>
          <span className="brand-icon">
            <GraduationCap size={24} />
          </span>
          GNOSIS<span className="brand-dot">.</span>
        </button>
        <nav>
          <a href="#how">The learning experience</a>
          <button onClick={() => go("/signin")}>
            Sign in <ArrowUpRight size={15} />
          </button>
        </nav>
      </header>
      <main>
        <div className="hero">
          <div className="hero-copy">
            <div className="eyebrow">
              <span className="tiny-dot" /> A LITTLE CURIOSITY GOES A LONG WAY
            </div>
            <h1>
              Don’t just study.
              <br />
              <em>Understand.</em>
            </h1>
            <p>
              Your space to slow down, connect the dots, and turn a lesson into
              something that stays with you.
            </p>
            <div className="hero-actions">
              <button className="primary" onClick={() => go("/dashboard")}>
                Try the free demo <ArrowRight size={18} />
              </button>
              <button className="text-button" onClick={() => go("/onboarding")}>
                Make it yours <ArrowUpRight size={17} />
              </button>
            </div>
            <span className="hero-note">
              <Check size={14} /> No signup needed. Start with Ohm’s Law.
            </span>
          </div>
          <div className="hero-art">
            <div className="orbit orbit-one" />
            <div className="orbit orbit-two" />
            <div className="art-heading">
              <span className="tiny-dot" /> ONE CONCEPT. A WORLD OF CLARITY.
            </div>
            <div className="equation">
              <span>V</span>
              <span>=</span>
              <span>I</span>
              <span className="times">×</span>
              <span>R</span>
            </div>
            <div className="equation-labels">
              <span>potential</span>
              <span>current</span>
              <span>resistance</span>
            </div>
            <svg
              viewBox="0 0 440 160"
              className="hero-circuit"
              aria-label="Simple resistor circuit"
            >
              <path d="M60 85V30h125l10-12 12 24 12-24 12 24 12-12h130v100H60V95" />
              <path d="M46 85h28M52 95h16" />
              <circle cx="320" cy="30" r="5" />
              <text x="290" y="110">
                a moment of understanding.
              </text>
            </svg>
            <div className="floating-note">
              <span className="tip-icon">
                <Sparkles size={19} />
              </span>
              <div>
                <strong>“Why does current double?”</strong>
                <small>Ask questions. Find the connection.</small>
              </div>
            </div>
          </div>
        </div>
        <section className="landing-strip">
          <span>Built around the way you learn</span>
          <span>
            <Play size={16} /> Watch with purpose
          </span>
          <span>
            <MessageCircle size={16} /> Ask in context
          </span>
          <span>
            <NotebookPen size={16} /> Make it your own
          </span>
          <span>
            <Target size={16} /> Practice, then reflect
          </span>
        </section>
        <section id="how" className="how">
          <div className="eyebrow">LESS SCATTER. MORE UNDERSTANDING.</div>
          <h2>
            Everything you need.
            <br />
            Room to think.
          </h2>
          <div className="three-grid">
            {[
              {
                Icon: Play,
                title: "A lesson, in context.",
                body: "Watch a YouTube lesson with relevant concepts and your notes beside it.",
              },
              {
                Icon: MessageCircle,
                title: "No question too small.",
                body: "Ask about the moment you’re stuck on. Live AI connects when a provider is configured.",
              },
              {
                Icon: Target,
                title: "Know what really stuck.",
                body: "Practice with checked questions, understand your mistakes, and return with a clear next step.",
              },
            ].map(({ Icon, title, body }, i) => (
              <article className="panel" key={title}>
                <span className="step">0{i + 1}</span>
                <Icon size={25} />
                <h3>{title}</h3>
                <p>{body}</p>
              </article>
            ))}
          </div>
          <button className="primary" onClick={() => go("/dashboard")}>
            Find your first “aha” <ArrowRight size={17} />
          </button>
        </section>
      </main>
      <footer>
        <span>GNOSIS · Made for curious minds</span>
        <span>One supported chapter. An honest place to start.</span>
      </footer>
    </div>
  );
}
function Dashboard({
  state,
  lessons,
  open,
  go,
}: {
  state: LearningState;
  lessons: PublicLesson[];
  open: (id?: string) => void;
  go: (u: string) => void;
}) {
  const l = lessons[0];
  const p = l ? state.progress[l.id] : null;
  const completed = Object.values(state.progress).filter(
    (p) => p.completed,
  ).length;
  const last = state.attempts.at(-1);
  return (
    <>
      <div className="page-heading">
        <div>
          <div className="eyebrow">
            <span className="tiny-dot" /> YOUR SPACE TO GROW
          </div>
          <h1>
            {state.profile.name
              ? `Welcome back, ${state.profile.name.split(" ")[0]}.`
              : "A good day to understand."}
          </h1>
          <p>A little focus. A little curiosity. A step forward.</p>
        </div>
        <button className="subtle-button" onClick={() => go("/settings")}>
          Class {state.profile.className} <span>·</span> {state.profile.exam}
          <Settings size={14} />
        </button>
      </div>
      <section className="focus-card">
        <div>
          <div className="eyebrow">
            {p?.position
              ? "PICK UP WHERE YOU LEFT OFF"
              : "YOUR FIRST MOMENT OF CLARITY"}{" "}
            <span className="pill">PHYSICS</span>
          </div>
          <h2>{l?.title ?? "Loading your first lesson…"}</h2>
          <p>
            {l?.chapter} <span>·</span> Understand the relationship between V,
            I, and R.
          </p>
          <div className="focus-meta">
            <span>
              <BookOpen size={14} /> 3 pages of original notes
            </span>
            <span>
              <Target size={14} /> 5 checked questions
            </span>
            {p?.position ? (
              <span>
                <Clock size={14} /> Resume at {clock(p.position)}
              </span>
            ) : null}
          </div>
          <button className="primary" onClick={() => open(l?.id)}>
            {p?.position ? "Continue learning" : "Start learning"}{" "}
            <ArrowRight size={17} />
          </button>
        </div>
        <div className="focus-illustration">
          <div className="formula-orbit" />
          <div className="formula-box">
            V <span>=</span> I<span>×</span>R
          </div>
          <small>THE CONNECTION IS THE CONCEPT.</small>
        </div>
      </section>
      <div className="stats-grid">
        {[
          {
            Icon: BookOpen,
            label: "LESSONS COMPLETED",
            value: `${completed}`,
            detail: `of ${lessons.length} available`,
          },
          {
            Icon: Target,
            label: "LATEST QUIZ",
            value: last ? `${last.score}/${last.total}` : "—",
            detail: last
              ? "Your most recent attempt"
              : "Your first attempt starts here",
          },
          {
            Icon: NotebookPen,
            label: "THOUGHTS SAVED",
            value: String(state.notes.length),
            detail: state.notes.length
              ? "Small ideas, made your own"
              : "A clean page for your ideas",
          },
        ].map(({ Icon, label, value, detail }) => (
          <div className="stat-card" key={label}>
            <div>
              <span>{label}</span>
              <Icon size={17} />
            </div>
            <strong>{value}</strong>
            <p>{detail}</p>
          </div>
        ))}
      </div>
      <Subjects lessons={lessons} open={open} compact />
      <StreakCard state={state} />
      <div className="two-grid">
        <section className="panel revision">
          <div className="section-title">
            <span className="tip-icon">
              <Lightbulb size={19} />
            </span>
            <h3>A useful next step</h3>
          </div>
          <p>
            {last
              ? last.results.some((r) => r.chosen !== r.correct)
                ? `Revisit ${[...new Set(last.results.filter((r) => r.chosen !== r.correct).map((r) => r.concept))].join(", ")}. These came from your latest quiz mistakes.`
                : "You answered every question correctly. Revisit the notes to explain the idea in your own words."
              : "Start with the notes, try the five-question check, and your revision suggestions will appear here."}
          </p>
          <button
            className="text-button"
            onClick={() => (last ? go("/progress") : open(l?.id))}
          >
            {last ? "Review your learning" : "Explore the lesson"}
            <ArrowRight size={15} />
          </button>
        </section>
        <section className="quote-card">
          <span className="eyebrow">A THOUGHT TO TAKE WITH YOU</span>
          <blockquote>
            “The important thing is
            <br />
            to keep questioning.”
          </blockquote>
          <span className="muted small">
            Make curiosity part of your practice.
          </span>
        </section>
      </div>
    </>
  );
}
function Subjects({
  lessons,
  open,
  compact = false,
}: {
  lessons: PublicLesson[];
  open: (id?: string) => void;
  compact?: boolean;
}) {
  return (
    <section className="subjects-section">
      {!compact && <div className="eyebrow">BUILD YOUR UNDERSTANDING</div>}
      <div className="section-heading">
        <div>
          {compact ? <h2>Your subjects</h2> : <h1>Your subjects</h1>}
          <p>Choose a subject. Follow your curiosity.</p>
        </div>
        <span className="small muted">
          {new Set(lessons.map((l) => l.subject)).size} available subject
          {new Set(lessons.map((l) => l.subject)).size !== 1 ? "s" : ""}
        </span>
      </div>
      <div className="three-grid">
        {[
          "Physics",
          "Chemistry",
          "Mathematics",
          ...new Set(
            lessons
              .map((l) => l.subject)
              .filter(
                (s) => !["Physics", "Chemistry", "Mathematics"].includes(s),
              ),
          ),
        ].map((s, i) => {
          const ls = lessons.filter((l) => l.subject === s);
          const Icon = i === 0 ? Atom : i === 1 ? FlaskConical : TrendingUp;
          return (
            <article
              className={`subject-card ${!ls.length ? "coming" : ""}`}
              key={s}
            >
              <div className="subject-top">
                <span className={`subject-icon subject-${i}`}>
                  <Icon size={25} />
                </span>
                <span className={ls.length ? "pill available" : "pill"}>
                  {ls.length ? "AVAILABLE NOW" : "COMING SOON"}
                </span>
              </div>
              <h3>{s}</h3>
              <p>
                {ls.length
                  ? [...new Set(ls.map((l) => l.chapter))].join(" · ")
                  : "A little more to look forward to."}
              </p>
              {ls.length ? (
                ls.map((l) => (
                  <button
                    className="lesson-link"
                    key={l.id}
                    onClick={() => open(l.id)}
                  >
                    <span>
                      {l.title}
                      <small>
                        {l.transcriptVerified
                          ? "Reviewed transcript"
                          : "Topic-based concepts"}{" "}
                        · Notes + quiz
                      </small>
                    </span>
                    <ArrowRight size={18} />
                  </button>
                ))
              ) : (
                <div className="coming-label">We’re making room for more.</div>
              )}
            </article>
          );
        })}
      </div>
    </section>
  );
}
function Preferences({
  state,
  update,
  onboarding,
  onDone,
  demo,
  saveStatus,
}: {
  state: LearningState;
  update: (f: (s: LearningState) => LearningState) => void;
  onboarding: boolean;
  onDone: () => void;
  demo: boolean;
  saveStatus: string;
}) {
  const [p, setP] = useState(state.profile);
  const [saved, setSaved] = useState(false);
  const [resetConfirm, setResetConfirm] = useState(false);
  useEffect(() => setP(state.profile), [state.profile]);
  return (
    <section className="preferences">
      <div className="eyebrow">
        {onboarding ? "A SPACE THAT FEELS LIKE YOU" : "YOUR PREFERENCES"}
      </div>
      <h1>{onboarding ? "Let’s make it personal." : "Learn your way."}</h1>
      <p>A few small details to shape your learning space.</p>
      <form
        className="panel form-grid"
        onChange={() => setSaved(false)}
        onSubmit={(e) => {
          e.preventDefault();
          update((s) => ({ ...s, profile: p }));
          setSaved(true);
          if (onboarding) onDone();
        }}
      >
        <label>
          Your name
          <input
            required
            maxLength={100}
            value={p.name}
            placeholder="What should we call you?"
            onChange={(e) => setP({ ...p, name: e.target.value })}
          />
        </label>
        <div className="two-grid">
          <label>
            Class
            <select
              value={p.className}
              onChange={(e) => setP({ ...p, className: e.target.value })}
            >
              <option>11</option>
              <option>12</option>
              <option>Other</option>
            </select>
          </label>
          <label>
            Target exam
            <select
              value={p.exam}
              onChange={(e) => setP({ ...p, exam: e.target.value })}
            >
              <option>JEE</option>
              <option>NEET</option>
              <option>Boards</option>
              <option>Independent learning</option>
            </select>
          </label>
        </div>
        <fieldset>
          <legend>Your subjects</legend>
          <div className="chips">
            {["Physics", "Chemistry", "Mathematics", "Biology"].map((s) => (
              <label key={s} className="check-chip">
                <input
                  type="checkbox"
                  checked={p.subjects.includes(s)}
                  onChange={(e) =>
                    setP({
                      ...p,
                      subjects: e.target.checked
                        ? [...p.subjects, s]
                        : p.subjects.filter((x) => x !== s),
                    })
                  }
                />
                {s}
              </label>
            ))}
          </div>
          <small>
            {p.className === "12"
              ? "Class 12 Physics is available. Other subjects are coming soon."
              : "Lessons for this class are coming soon."}
          </small>
        </fieldset>
        <label>
          Explanation language
          <select
            value={p.language}
            onChange={(e) =>
              setP({ ...p, language: e.target.value as typeof p.language })
            }
          >
            <option>English</option>
            <option>Hindi</option>
            <option>Hinglish</option>
          </select>
          <small>
            Used for live AI answers. The original demo notes are in English.
          </small>
        </label>
        <button className="primary" type="submit">
          {onboarding ? "Open my workspace" : "Save preferences"}
          <ArrowRight size={17} />
        </button>
        <div role="status" aria-live="polite" aria-atomic="true">
          {saved && (
            <div
              className={`preferences-feedback ${
                saveStatus === "Saving…"
                  ? ""
                  : saveStatus === "Cloud saved" ||
                      saveStatus === "Saved on this device"
                    ? "is-saved"
                    : "is-error"
              }`}
            >
              <strong>
                {saveStatus === "Saving…"
                  ? "Saving preferences…"
                  : saveStatus === "Cloud saved" ||
                      saveStatus === "Saved on this device"
                    ? "Preferences saved successfully."
                    : "Preferences could not be saved."}
              </strong>
              <span>
                {saveStatus === "Saved on this device"
                  ? "Your changes are saved on this browser."
                  : saveStatus === "Cloud saved"
                    ? "Your changes are saved to your account."
                    : saveStatus === "Saving…"
                      ? "Please wait a moment."
                      : saveStatus}
              </span>
              <button
                type="button"
                className="text-button"
                aria-label="Dismiss preferences notification"
                onClick={() => setSaved(false)}
              >
                Dismiss
              </button>
            </div>
          )}
        </div>
        {demo && !onboarding && (
          <button
            className="text-button"
            type="button"
            onClick={() => setResetConfirm(true)}
          >
            Reset local demo data
          </button>
        )}
        {demo && resetConfirm && (
          <div className="notice" role="alert">
            <p>
              Reset all demo notes, bookmarks, quiz attempts, progress, and
              preferences on this browser?
            </p>
            <div className="row">
              <button
                type="button"
                className="subtle-button"
                onClick={() => {
                  update(() => emptyState());
                  setP(emptyState().profile);
                  setSaved(false);
                  setResetConfirm(false);
                }}
              >
                Yes, reset demo
              </button>
              <button type="button" onClick={() => setResetConfirm(false)}>
                Keep my data
              </button>
            </div>
          </div>
        )}
      </form>
    </section>
  );
}
function Workspace({
  lesson,
  state,
  update,
  ready,
  saveStatus,
  go,
}: {
  lesson: PublicLesson;
  state: LearningState;
  update: (f: (s: LearningState) => LearningState) => void;
  ready: boolean;
  saveStatus: string;
  go: (u: string) => void;
}) {
  const progress = state.progress[lesson.id];
  const [time, setTime] = useState(progress?.position ?? 0);
  const [seek, setSeek] = useState<{ time: number; nonce: number } | null>(
    null,
  );
  const [tab, setTab] = useState<Tab>("PDF");
  const [conceptTab, setConceptTab] = useState("Definitions");
  const [page, setPage] = useState(1);
  const [pdfRequest, setPdfRequest] = useState(0);
  const [noteText, setNoteText] = useState("");
  const [attempt, setAttempt] = useState<Attempt | null>(
    state.attempts.filter((a) => a.lessonId === lesson.id).at(-1) ?? null,
  );
  const lastWrite = useRef(0);
  const latestTime = useRef(time);
  const pendingStudy = useRef<Record<string, number>>({});
  const flushStudy = () => {
    const pending = pendingStudy.current;
    pendingStudy.current = {};
    if (Object.keys(pending).length)
      update((s) =>
        Object.entries(pending).reduce(
          (next, [day, seconds]) => addStudySeconds(next, seconds, day),
          s,
        ),
      );
  };
  const quizRef = useRef<HTMLElement>(null);
  const jump = (t: number) => {
    setSeek({ time: t, nonce: Date.now() });
    setTime(t);
  };
  useEffect(() => {
    const raw = sessionStorage.getItem("gnosis:jump");
    if (raw) {
      try {
        const j = JSON.parse(raw);
        if (j.lessonId === lesson.id) {
          jump(j.time);
          if (j.cardId) {
            const card = lesson.cards.find((c) => c.id === j.cardId);
            if (card) setConceptTab(card.type);
          }
          sessionStorage.removeItem("gnosis:jump");
        }
      } catch {
        sessionStorage.removeItem("gnosis:jump");
      }
    }
  }, [lesson.id]);
  const recordTime = (t: number) => {
    latestTime.current = t;
    setTime(t);
    if (Date.now() - lastWrite.current > 5000) {
      lastWrite.current = Date.now();
      update((s) => ({
        ...s,
        progress: {
          ...s.progress,
          [lesson.id]: {
            position: t,
            reviewed: s.progress[lesson.id]?.reviewed ?? false,
            completed: s.progress[lesson.id]?.completed ?? false,
          },
        },
      }));
    }
  };
  useEffect(() => {
    const flush = () => {
      flushStudy();
      update((s) => ({
        ...s,
        progress: {
          ...s.progress,
          [lesson.id]: {
            position: latestTime.current,
            reviewed: s.progress[lesson.id]?.reviewed ?? false,
            completed: s.progress[lesson.id]?.completed ?? false,
          },
        },
      }));
    };
    const hidden = () => {
      if (document.visibilityState === "hidden") flush();
    };
    document.addEventListener("visibilitychange", hidden);
    window.addEventListener("pagehide", flush);
    return () => {
      document.removeEventListener("visibilitychange", hidden);
      window.removeEventListener("pagehide", flush);
      flush();
    };
  }, [lesson.id, update]);
  const segment = lesson.transcriptVerified
    ? activeSegment(lesson.segments, time)
    : null;
  const cards = lesson.transcriptVerified
    ? (segment?.conceptCards ?? [])
    : lesson.cards;
  const shown = cards.filter((c) => c.type === conceptTab);
  function source(id: string) {
    const excerpt = lesson.excerpts.find((e) => e.id === id);
    const s = lesson.segments.find((s) => s.id === id);
    if (excerpt) {
      setPage(excerpt.page);
      setPdfRequest((n) => n + 1);
      setTab("PDF");
    }
    if (s && lesson.transcriptVerified) jump(s.startSeconds);
  }
  const sourceName = (id: string) => {
    const e = lesson.excerpts.find((e) => e.id === id);
    const s = lesson.segments.find((s) => s.id === id);
    return e
      ? `Notes · p. ${e.page}`
      : s
        ? `Video · ${clock(s.startSeconds)}`
        : "Source unavailable";
  };
  const addNote = () => {
    if (!noteText.trim()) return;
    update((s) => ({
      ...s,
      notes: [
        ...s.notes,
        {
          id: crypto.randomUUID(),
          lessonId: lesson.id,
          timestamp: time,
          text: noteText.trim(),
          updatedAt: new Date().toISOString(),
        },
      ],
    }));
    setNoteText("");
  };
  return (
    <>
      <div className="breadcrumbs">
        <button onClick={() => go("/subjects")}>Subjects</button>
        <ChevronRight size={12} />
        <span>{lesson.subject}</span>
        <ChevronRight size={12} />
        <span>{lesson.chapter}</span>
      </div>
      <div className="page-heading lesson-heading">
        <div>
          <div className="eyebrow">
            CLASS {lesson.className} · {lesson.subject.toUpperCase()}
          </div>
          <h1>{lesson.title}</h1>
          <p>Watch. Wonder. Make the connection.</p>
        </div>
        <button
          className="subtle-button"
          onClick={() =>
            quizRef.current?.scrollIntoView({ behavior: "smooth" })
          }
        >
          <Target size={16} />
          Check your understanding
        </button>
      </div>
      <div className="learning-grid">
        <div className="learning-left">
          <Video
            videoId={lesson.videoId}
            initial={progress?.position ?? 0}
            seek={seek}
            onTime={recordTime}
            onStudySecond={() => {
              const day = studyDay();
              pendingStudy.current[day] = (pendingStudy.current[day] ?? 0) + 1;
              if (pendingStudy.current[day] >= 5) flushStudy();
            }}
          />
          <div className="lesson-under">
            <span>
              <Clock size={14} />
              {clock(time)} current position
            </span>
            <span className="pill">
              {progress?.completed ? "COMPLETED" : "IN PROGRESS"}
            </span>
          </div>
          <section className="panel concepts">
            <div className="section-title">
              <span className="tip-icon">
                <Sparkles size={19} />
              </span>
              <div>
                <h3>A little clarity, right here.</h3>
                <span className="small muted">
                  {lesson.transcriptVerified
                    ? segment
                      ? `Synced · ${clock(segment.startSeconds)}–${clock(segment.endSeconds)}`
                      : "Transcript gap · no exact context for this moment"
                    : "Topic-based suggestions · no verified transcript"}
                </span>
              </div>
            </div>
            <div className="tabs" role="tablist" aria-label="Concept types">
              {["Definitions", "Formulas", "Recap"].map((t) => (
                <button
                  role="tab"
                  aria-selected={conceptTab === t}
                  key={t}
                  onClick={() => setConceptTab(t)}
                >
                  {t}
                </button>
              ))}
            </div>
            <div className="concept-list">
              {shown.map((c) => (
                <article className="concept" key={c.id}>
                  <div className="concept-title">
                    <h4>{c.title}</h4>
                    <button
                      className="icon-button"
                      aria-label={`Bookmark ${c.title}`}
                      aria-pressed={state.bookmarks.some(
                        (b) => b.cardId === c.id && b.lessonId === lesson.id,
                      )}
                      onClick={() =>
                        update((s) => ({
                          ...s,
                          bookmarks: s.bookmarks.some(
                            (b) =>
                              b.cardId === c.id && b.lessonId === lesson.id,
                          )
                            ? s.bookmarks.filter(
                                (b) =>
                                  !(
                                    b.cardId === c.id &&
                                    b.lessonId === lesson.id
                                  ),
                              )
                            : [
                                ...s.bookmarks,
                                {
                                  id: crypto.randomUUID(),
                                  lessonId: lesson.id,
                                  cardId: c.id,
                                  timestamp: time,
                                  title: c.title,
                                },
                              ],
                        }))
                      }
                    >
                      <Bookmark
                        size={17}
                        fill={
                          state.bookmarks.some(
                            (b) =>
                              b.cardId === c.id && b.lessonId === lesson.id,
                          )
                            ? "currentColor"
                            : "none"
                        }
                      />
                    </button>
                  </div>
                  {c.formula && <div className="math">{c.formula}</div>}
                  <p>{c.body}</p>
                  {c.misconception && (
                    <div className="misconception">
                      <Lightbulb size={15} />
                      <span>{c.misconception}</span>
                    </div>
                  )}
                  <button className="source" onClick={() => source(c.sourceId)}>
                    <BookOpen size={12} />
                    {sourceName(c.sourceId)}
                    <ArrowUpRight size={12} />
                  </button>
                </article>
              ))}
              {!shown.length && (
                <p className="muted">
                  {lesson.transcriptVerified && !segment
                    ? "No transcript segment covers this moment. Your notes remain available."
                    : "No reviewed cards in this tab for this segment."}
                </p>
              )}
            </div>
            <button className="text-button" onClick={() => setTab("Ask AI")}>
              <MessageCircle size={15} />
              Ask about this moment <ArrowRight size={15} />
            </button>
          </section>
          <div className="completion-box">
            <label>
              <input
                type="checkbox"
                checked={progress?.reviewed ?? false}
                onChange={(e) => {
                  const reviewed = e.target.checked;
                  update((s) => ({
                    ...s,
                    progress: {
                      ...s.progress,
                      [lesson.id]: {
                        position: time,
                        reviewed,
                        completed: completion(
                          reviewed,
                          attempt?.score ?? 0,
                          attempt?.total ?? 0,
                        ),
                      },
                    },
                  }));
                }}
              />
              I’ve reviewed the lesson and notes.
            </label>
            <small>
              Complete this lesson by reviewing the material and scoring at
              least 4/5 on the quiz.
            </small>
          </div>
        </div>
        <aside className="learning-panel panel">
          <div className="panel-heading">
            <NotebookPen size={19} />
            <h3>Your thinking space</h3>
            <span className="tiny-dot" />
          </div>
          <div className="tabs" role="tablist" aria-label="Learning tools">
            {(["PDF", "My Notes", "Ask AI"] as Tab[]).map((t) => (
              <button
                role="tab"
                aria-selected={tab === t}
                key={t}
                onClick={() => setTab(t)}
              >
                {t === "Ask AI" && <Sparkles size={13} />} {t}
              </button>
            ))}
          </div>
          {tab === "PDF" ? (
            <>
              <div className="document-title">
                <span className="eyebrow">ORIGINAL DEMO NOTES</span>
                <h4>{lesson.title} · A field guide</h4>
                <p>Read at your own pace. Let the ideas settle.</p>
              </div>
              {lesson.pdfUrl ? (
                <PdfReader
                  url={lesson.pdfUrl}
                  targetPage={page}
                  requestId={pdfRequest}
                />
              ) : (
                <p className="notice">No PDF uploaded yet.</p>
              )}
            </>
          ) : tab === "My Notes" ? (
            <div className="notes-panel">
              <span className="eyebrow">CAPTURE THE CONNECTION</span>
              <p className="small muted">
                Notes keep the current video position. Click a timestamp to
                return.
              </p>
              <label className="sr-only" htmlFor="new-note">
                New personal note
              </label>
              <textarea
                id="new-note"
                maxLength={10000}
                placeholder="What just clicked? Write it in your own words…"
                value={noteText}
                onChange={(e) => setNoteText(e.target.value)}
              />
              <div className="row-between">
                <span className="small muted">At {clock(time)}</span>
                <button
                  disabled={!noteText.trim() || !ready}
                  className="primary small-button"
                  onClick={addNote}
                >
                  <Plus size={14} />
                  Save note
                </button>
              </div>
              <span className="small muted" role="status">
                {saveStatus}
              </span>
              {state.notes.filter((n) => n.lessonId === lesson.id).length ===
                0 && (
                <div className="empty">
                  <NotebookPen size={30} />
                  <h4>A clean page.</h4>
                  <p>Your first thought belongs here.</p>
                </div>
              )}
              {state.notes
                .filter((n) => n.lessonId === lesson.id)
                .map((n) => (
                  <div className="saved-note" key={n.id}>
                    <div className="row-between">
                      <button
                        className="source"
                        onClick={() => jump(n.timestamp)}
                      >
                        <Clock size={12} />
                        {clock(n.timestamp)}
                      </button>
                      <button
                        className="icon-button"
                        aria-label="Delete note"
                        onClick={() =>
                          update((s) => ({
                            ...s,
                            notes: s.notes.filter((x) => x.id !== n.id),
                          }))
                        }
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                    <textarea
                      aria-label={`Edit note at ${clock(n.timestamp)}`}
                      value={n.text}
                      maxLength={10000}
                      onChange={(e) =>
                        update((s) => ({
                          ...s,
                          notes: s.notes.map((x) =>
                            x.id === n.id
                              ? {
                                  ...x,
                                  text: e.target.value,
                                  updatedAt: new Date().toISOString(),
                                }
                              : x,
                          ),
                        }))
                      }
                    />
                  </div>
                ))}
            </div>
          ) : (
            <Chat
              lesson={lesson}
              time={time}
              language={state.profile.language}
              onSource={source}
              sourceName={sourceName}
            />
          )}
        </aside>
      </div>
      <section ref={quizRef} id="quiz" className="quiz-section">
        <Quiz
          lesson={lesson}
          previous={attempt}
          onSource={source}
          onResult={(a) => {
            setAttempt(a);
            update((s) => ({
              ...s,
              attempts: [...s.attempts, a].slice(-100),
              progress: {
                ...s.progress,
                [lesson.id]: {
                  position: time,
                  reviewed: s.progress[lesson.id]?.reviewed ?? false,
                  completed: completion(
                    s.progress[lesson.id]?.reviewed ?? false,
                    a.score,
                    a.total,
                  ),
                },
              },
            }));
          }}
        />
      </section>
    </>
  );
}
function Chat({
  lesson,
  time,
  language,
  onSource,
  sourceName,
}: {
  lesson: PublicLesson;
  time: number;
  language: string;
  onSource: (id: string) => void;
  sourceName: (id: string) => string;
}) {
  const [question, setQuestion] = useState("");
  const [mode, setMode] = useState("Hint first");
  const [messages, setMessages] = useState<
    { role: "user" | "assistant"; content: string; sourceIds?: string[] }[]
  >([]);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [last, setLast] = useState("");
  const send = async (q = question) => {
    if (!q.trim()) return;
    setLast(q);
    setBusy(true);
    setError("");
    const recent = messages
      .slice(-6)
      .map(({ role, content }) => ({ role, content: content.slice(0, 4000) }));
    try {
      const r = await api("/api/chat", {
        method: "POST",
        body: JSON.stringify({
          lessonId: lesson.id,
          timestamp: time,
          question: q,
          mode,
          language,
          recent,
        }),
      });
      setMessages((m) => [
        ...m,
        { role: "user", content: q },
        { role: "assistant", content: r.answer, sourceIds: r.sourceIds },
      ]);
      setQuestion("");
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setBusy(false);
    }
  };
  return (
    <div className="chat-panel">
      <div className="chat-intro">
        <span className="tip-icon">
          <Sparkles size={23} />
        </span>
        <h3>Let’s untangle it.</h3>
        <p>
          Ask a question about {lesson.title}.<br />
          {lesson.transcriptVerified
            ? `Context at ${clock(time)}`
            : "Using approved topic notes; video mapping is unverified."}
        </p>
      </div>
      <label className="small">
        How can I help?
        <select value={mode} onChange={(e) => setMode(e.target.value)}>
          {[
            "Hint first",
            "Explain simply",
            "Worked example",
            "Similar practice",
          ].map((m) => (
            <option key={m}>{m}</option>
          ))}
        </select>
      </label>
      <div className="chat-messages" aria-live="polite">
        {messages.map((m, i) => (
          <div key={i} className={`chat-message ${m.role}`}>
            <span className="eyebrow">
              {m.role === "assistant" ? "LIVE AI" : "YOU"}
            </span>
            <p>{m.content}</p>
            {m.sourceIds?.map((id) => (
              <button className="source" key={id} onClick={() => onSource(id)}>
                {sourceName(id)}
                <ArrowUpRight size={11} />
              </button>
            ))}
          </div>
        ))}
        {busy && <p role="status">Thinking through the context…</p>}
      </div>
      {error && (
        <div className="notice error" role="alert">
          {error}
          <button disabled={busy} onClick={() => send(last)}>
            Retry question
          </button>
        </div>
      )}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          void send();
        }}
      >
        <label className="sr-only" htmlFor="question">
          Your doubt
        </label>
        <textarea
          id="question"
          maxLength={1200}
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Why does current increase with voltage?"
        />
        <div className="row-between">
          <span className="small muted">
            {language} · {question.length}/1200
          </span>
          <button
            className="primary small-button"
            disabled={busy || !question.trim()}
          >
            Ask AI <ArrowRight size={14} />
          </button>
        </div>
      </form>
      <p className="small muted">
        Live answers need a configured AI provider. No simulated AI responses.
        Extra AI practice is unscored.
      </p>
    </div>
  );
}
function Quiz({
  lesson,
  previous,
  onResult,
  onSource,
}: {
  lesson: PublicLesson;
  previous: Attempt | null;
  onResult: (a: Attempt) => void;
  onSource: (id: string) => void;
}) {
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [result, setResult] = useState<Attempt | null>(previous);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  return (
    <>
      <div className="section-heading">
        <div>
          <div className="eyebrow">PAUSE. PRACTICE. REFLECT.</div>
          <h2>What stayed with you?</h2>
          <p>
            {lesson.questions.length} checked questions · No timer, no rush.
          </p>
        </div>
        {result && (
          <button
            className="subtle-button"
            onClick={() => {
              setResult(null);
              setAnswers({});
            }}
          >
            Try again
          </button>
        )}
      </div>
      {result && (
        <div className="quiz-score">
          <span className="subject-icon">
            <Target size={27} />
          </span>
          <div>
            <strong>
              {result.score} / {result.total}
            </strong>
            <p>
              {result.score === result.total
                ? "Every connection made. Nicely understood."
                : "Mistakes are useful. See the reasoning below."}
            </p>
          </div>
          <span className="pill">ATTEMPT SAVED</span>
        </div>
      )}
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          setBusy(true);
          setError("");
          try {
            const a = await api("/api/quiz", {
              method: "POST",
              body: JSON.stringify({ lessonId: lesson.id, answers }),
            });
            setResult(a);
            onResult(a);
          } catch (e) {
            setError((e as Error).message);
          } finally {
            setBusy(false);
          }
        }}
      >
        <div className="quiz-grid">
          {lesson.questions.map((q, i) => {
            const r = result?.results.find((r) => r.questionId === q.id);
            return (
              <fieldset className="question panel" key={q.id}>
                <legend>
                  <span className="eyebrow">
                    QUESTION {String(i + 1).padStart(2, "0")}
                  </span>
                  {q.prompt}
                </legend>
                {q.options.map((o, n) => (
                  <label
                    className={`answer-option ${r ? (n === r.correct ? "correct" : n === r.chosen ? "incorrect" : "") : ""}`}
                    key={n}
                  >
                    <input
                      type="radio"
                      required
                      disabled={!!result}
                      name={q.id}
                      checked={r ? r.chosen === n : answers[q.id] === n}
                      onChange={() => setAnswers((a) => ({ ...a, [q.id]: n }))}
                    />
                    <span>{o}</span>
                    {r && n === r.correct && <Check size={16} />}
                  </label>
                ))}
                {r && (
                  <div className="answer-explanation">
                    <strong>
                      {r.chosen === r.correct
                        ? "Understood."
                        : "Let’s make the connection."}
                    </strong>
                    <p>{r.explanation}</p>
                    <button
                      type="button"
                      className="source"
                      onClick={() => {
                        onSource(r.sourceId);
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }}
                    >
                      Revisit {r.concept}
                      <ArrowUpRight size={12} />
                    </button>
                  </div>
                )}
              </fieldset>
            );
          })}
        </div>
        {error && (
          <p className="notice error" role="alert">
            {error}
          </p>
        )}
        {!result && (
          <div className="quiz-submit">
            <span className="small muted">
              {Object.keys(answers).length} of {lesson.questions.length}{" "}
              answered
            </span>
            <button
              className="primary"
              disabled={
                busy || Object.keys(answers).length !== lesson.questions.length
              }
            >
              {busy ? "Checking…" : "Check my understanding"}
              <ArrowRight size={17} />
            </button>
          </div>
        )}
      </form>
    </>
  );
}
function NotesLibrary({
  state,
  lessons,
  go,
  update,
}: {
  state: LearningState;
  lessons: PublicLesson[];
  go: (u: string) => void;
  update: (f: (s: LearningState) => LearningState) => void;
}) {
  return (
    <>
      <div className="page-heading">
        <div>
          <div className="eyebrow">IDEAS, MADE YOUR OWN</div>
          <h1>Your notebook.</h1>
          <p>A home for the things that clicked.</p>
        </div>
        <span className="pill">
          {state.notes.length} NOTES · {state.bookmarks.length} BOOKMARKS
        </span>
      </div>
      {!state.notes.length && !state.bookmarks.length && (
        <div className="empty panel">
          <NotebookPen size={40} />
          <h2>Good ideas need a place to land.</h2>
          <p>Open a lesson to save a note or bookmark a concept.</p>
          <button className="primary" onClick={() => go("/learn/ohms-law")}>
            Explore the lesson
            <ArrowRight size={16} />
          </button>
        </div>
      )}
      <div className="two-grid">
        {state.notes.map((n) => (
          <article className="panel" key={n.id}>
            <div className="row-between">
              <span className="eyebrow">
                {lessons.find((l) => l.id === n.lessonId)?.title ?? n.lessonId}{" "}
                · {clock(n.timestamp)}
              </span>
              <button
                className="icon-button"
                aria-label="Delete saved note"
                onClick={() =>
                  update((s) => ({
                    ...s,
                    notes: s.notes.filter((x) => x.id !== n.id),
                  }))
                }
              >
                <Trash2 size={16} />
              </button>
            </div>
            <p className="preserve">{n.text}</p>
            <button
              className="text-button"
              onClick={() => go(`/learn/${n.lessonId}`)}
            >
              Open lesson
              <ArrowRight size={15} />
            </button>
          </article>
        ))}
      </div>
      <h2 className="spaced-heading">Bookmarked concepts</h2>
      <div className="two-grid">
        {state.bookmarks.map((b) => (
          <article className="panel" key={b.id}>
            <Bookmark size={19} />
            <h3>{b.title}</h3>
            <p className="small muted">
              {lessons.find((l) => l.id === b.lessonId)?.title ?? b.lessonId} ·
              Saved at {clock(b.timestamp)}
            </p>
            <div className="row-between">
              <button
                className="text-button"
                onClick={() => {
                  sessionStorage.setItem(
                    "gnosis:jump",
                    JSON.stringify({
                      lessonId: b.lessonId,
                      time: b.timestamp,
                      cardId: b.cardId,
                    }),
                  );
                  go(`/learn/${b.lessonId}`);
                }}
              >
                Reopen context
                <ArrowRight size={15} />
              </button>
              <button
                className="icon-button"
                aria-label="Remove bookmark"
                onClick={() =>
                  update((s) => ({
                    ...s,
                    bookmarks: s.bookmarks.filter((x) => x.id !== b.id),
                  }))
                }
              >
                <Trash2 size={15} />
              </button>
            </div>
          </article>
        ))}
      </div>
    </>
  );
}
function Progress({
  state,
  lessons,
  open,
}: {
  state: LearningState;
  lessons: PublicLesson[];
  open: (id?: string) => void;
}) {
  return (
    <>
      <div className="page-heading">
        <div>
          <div className="eyebrow">SMALL STEPS. REAL UNDERSTANDING.</div>
          <h1>Your learning, in perspective.</h1>
          <p>Only your recorded activity. Every new start counts.</p>
        </div>
      </div>
      <StreakCard state={state} />
      <div className="panel">
        <h2>Lesson progress</h2>
        {lessons.map((l) => {
          const p = state.progress[l.id];
          return (
            <div className="progress-row" key={l.id}>
              <div>
                <strong>{l.title}</strong>
                <p className="small muted">
                  {p
                    ? `Last position ${clock(p.position)} · ${p.reviewed ? "Material reviewed" : "Material not yet marked reviewed"}`
                    : "You haven’t started this lesson yet."}
                </p>
              </div>
              <span className="pill">
                {p?.completed ? "COMPLETED" : "NOT COMPLETE"}
              </span>
              <button className="text-button" onClick={() => open(l.id)}>
                Open
                <ArrowRight size={16} />
              </button>
            </div>
          );
        })}
        <small>
          Completion requires material review and at least 80% on a quiz.
        </small>
      </div>
      <h2 className="spaced-heading">Quiz history</h2>
      {!state.attempts.length && (
        <div className="empty panel">
          <Target size={32} />
          <h3>No attempts yet.</h3>
          <p>Try a lesson quiz to see your understanding take shape.</p>
        </div>
      )}
      {[...state.attempts].reverse().map((a) => (
        <article className="panel attempt" key={a.id}>
          <div className="row-between">
            <h3>
              {lessons.find((l) => l.id === a.lessonId)?.title ?? a.lessonId}
            </h3>
            <strong>
              {a.score} / {a.total}
            </strong>
          </div>
          <span className="small muted">{new Date(a.at).toLocaleString()}</span>
          {a.results
            .filter((r) => r.chosen !== r.correct)
            .map((r) => (
              <p key={r.questionId}>
                <strong>Revise {r.concept}:</strong> {r.explanation}
              </p>
            ))}
          <button className="text-button" onClick={() => open(a.lessonId)}>
            Revisit lesson and sources
            <ArrowRight size={15} />
          </button>
        </article>
      ))}
    </>
  );
}
function SignIn({ go }: { go: (u: string) => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signup, setSignup] = useState(false);
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);
  const configured = !!supabase();
  return (
    <div className="auth-page">
      <button className="brand" onClick={() => go("/")}>
        <span className="brand-icon">
          <GraduationCap size={24} />
        </span>
        GNOSIS.
      </button>
      <div className="panel auth-card">
        <span className="eyebrow">YOUR SPACE, WHEREVER YOU ARE</span>
        <h1>{signup ? "Start something good." : "Welcome back."}</h1>
        <p>
          {configured
            ? "Sign in to keep your learning in your private account."
            : "Supabase isn’t connected yet. Explore the local demo while authentication is set up."}
        </p>
        {configured && (
          <form
            className="form-grid"
            onSubmit={async (e) => {
              e.preventDefault();
              setBusy(true);
              setMessage("");
              const sb = supabase()!;
              const { error, data } = signup
                ? await sb.auth.signUp({ email, password })
                : await sb.auth.signInWithPassword({ email, password });
              setBusy(false);
              if (error) setMessage(error.message);
              else if (data.session) go("/dashboard");
              else
                setMessage(
                  "Check your email to confirm your account, then sign in.",
                );
            }}
          >
            <label>
              Email
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
              />
            </label>
            <label>
              Password
              <input
                type="password"
                required
                minLength={8}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete={signup ? "new-password" : "current-password"}
              />
            </label>
            <button className="primary" disabled={busy}>
              {busy ? "Connecting…" : signup ? "Create account" : "Sign in"}
              <ArrowRight size={16} />
            </button>
            <button
              className="text-button"
              type="button"
              onClick={() => setSignup((s) => !s)}
            >
              {signup
                ? "Already have an account? Sign in"
                : "New here? Create an account"}
            </button>
          </form>
        )}
        {message && (
          <p className="notice" role="status">
            {message}
          </p>
        )}
        <button className="subtle-button" onClick={() => go("/dashboard")}>
          Continue in local demo
          <ArrowRight size={16} />
        </button>
        <small>
          Demo data stays in this browser. It is kept separate from account
          data.
        </small>
      </div>
    </div>
  );
}
