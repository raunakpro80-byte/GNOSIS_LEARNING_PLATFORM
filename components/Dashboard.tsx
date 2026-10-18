"use client";
import {
  ArrowRight,
  BookOpen,
  GraduationCap,
  NotebookPen,
  Play,
  Settings,
  Target,
} from "lucide-react";
import type { LearningState, PublicLesson } from "@/lib/types";
import { chaptersFor, selectedSubjects } from "@/lib/curriculum";
import { resourcesFor } from "@/lib/chapter-resources";
import { clock } from "@/lib/learning";
import StreakCard from "./StreakCard";

export default function Dashboard({
  state,
  lessons,
  go,
}: {
  state: LearningState;
  lessons: PublicLesson[];
  go: (path: string) => void;
}) {
  const subjects = selectedSubjects(state.profile.subjects);
  const chapterCount = subjects.reduce(
    (total, subject) =>
      total + chaptersFor(state.profile.className, subject.id).length,
    0,
  );
  const continuing = lessons.find(
    (l) => state.progress[l.id] && !state.progress[l.id].completed,
  );
  const featured = continuing ?? lessons[0];
  const featuredCompleted = featured && state.progress[featured.id]?.completed;
  const completed = Object.values(state.progress).filter(
    (p) => p.completed,
  ).length;
  const answered = state.attempts.reduce((n, a) => n + a.total, 0);
  const correct = state.attempts.reduce((n, a) => n + a.score, 0);
  const activity = [
    ...state.notes.map((n) => ({
      id: n.id,
      date: n.updatedAt,
      lessonId: n.lessonId,
      title: "Personal note saved",
      detail: n.text,
    })),
    ...state.attempts.map((a) => ({
      id: a.id,
      date: a.at,
      lessonId: a.lessonId,
      title: "Quiz completed",
      detail: `${a.score} of ${a.total} correct`,
    })),
  ]
    .sort((a, b) => Date.parse(b.date) - Date.parse(a.date))
    .slice(0, 3);
  return (
    <div className="workspace-dashboard">
      <div className="page-heading">
        <div>
          <div className="eyebrow">My workspace</div>
          <h1>
            {state.profile.name
              ? `Welcome back, ${state.profile.name.split(" ")[0]}`
              : "Your learning workspace"}
          </h1>
          <p>Pick up where you left off, or start a new chapter.</p>
        </div>
        <button className="subtle-button" onClick={() => go("/settings")}>
          <Settings size={15} />{" "}
          {state.profile.courseSelected
            ? `Class ${state.profile.className} · ${state.profile.exam}`
            : "Set up your course"}
        </button>
      </div>
      <div
        className="workspace-metrics"
        aria-label="Recorded learning activity"
      >
        <div>
          <strong>{completed}</strong>
          <span>Lessons completed</span>
        </div>
        <div>
          <strong>
            {answered ? `${Math.round((correct / answered) * 100)}%` : "—"}
          </strong>
          <span>Quiz accuracy</span>
        </div>
        <div>
          <strong>{state.notes.length}</strong>
          <span>Personal notes</span>
        </div>
        <div>
          <strong>{state.attempts.length}</strong>
          <span>Quiz attempts</span>
        </div>
      </div>
      {!featured && (
        <section
          className="chapter-discovery"
          aria-labelledby="chapter-discovery-title"
        >
          <div className="chapter-discovery-copy">
            <div className="eyebrow">Make room for understanding</div>
            <h2 id="chapter-discovery-title">
              Pick a chapter.
              <br />
              Follow your curiosity.
            </h2>
            <p>
              Lectures, NCERT books and notes, organised around your selected
              subjects.
            </p>
            <div className="chapter-discovery-meta">
              <span>
                <BookOpen size={17} />
                {chapterCount} chapters
              </span>
              <span>
                <GraduationCap size={17} />
                {subjects.length} selected subjects
              </span>
            </div>
            <button
              className="primary"
              onClick={() => go(subjects.length ? "/lectures" : "/settings")}
            >
              {subjects.length ? "Explore lectures" : "Choose subjects"}
              <ArrowRight size={18} />
            </button>
          </div>
          <div className="chapter-discovery-art" aria-hidden="true">
            <BookOpen size={88} strokeWidth={1.9} />
            <span>One chapter at a time</span>
          </div>
        </section>
      )}
      <div className="dashboard-columns">
        <div className="dashboard-primary">
          {featured && (
            <section
              className="resume-section"
              aria-labelledby="resume-heading"
            >
              <div className="section-heading">
                <h2 id="resume-heading">
                  {continuing
                    ? "Continue learning"
                    : featuredCompleted
                      ? "Review a lesson"
                      : "Start learning"}
                </h2>
                <Play size={17} />
              </div>
              {featured ? (
                <>
                  <span className="small muted">
                    {featured.subject} · {featured.chapter}
                  </span>
                  <h3>{featured.title}</h3>
                  <p>
                    {continuing
                      ? `Resume at ${clock(state.progress[featured.id].position)}. Your notes and bookmarks are saved with this lesson.`
                      : "A complete lesson with a video, personal notes and a short quiz."}
                  </p>
                  <button
                    className="primary"
                    onClick={() => go(`/learn/${featured.id}`)}
                  >
                    {continuing
                      ? "Resume lesson"
                      : featuredCompleted
                        ? "Review lesson"
                        : "Open lesson"}
                    <ArrowRight size={16} />
                  </button>
                </>
              ) : null}
            </section>
          )}
          <section
            className="dashboard-subjects"
            aria-labelledby="subjects-heading"
          >
            <div className="section-heading">
              <h2 id="subjects-heading">Your subjects</h2>
              <button className="text-button" onClick={() => go("/settings")}>
                Edit course
              </button>
            </div>
            {subjects.length &&
            ["11", "12"].includes(state.profile.className) ? (
              <div className="subject-directory">
                {subjects.map((subject) => {
                  const chapters = chaptersFor(
                    state.profile.className,
                    subject.id,
                  );
                  const attached = chapters.map((c) =>
                    resourcesFor(state.profile.className, subject.id, c.number),
                  );
                  const videos = attached.filter(
                    (r) => r.detailedVideoId || r.oneShotVideoId,
                  ).length;
                  const books = attached.filter((r) => r.bookPdf).length;
                  const subjectLessons = lessons.filter(
                    (l) => l.subject === subject.name,
                  );
                  const finished = subjectLessons.filter(
                    (l) => state.progress[l.id]?.completed,
                  ).length;
                  return (
                    <button
                      key={subject.id}
                      className="subject-directory-row"
                      onClick={() => go(`/lectures/${subject.id}`)}
                    >
                      <span className="subject-monogram" aria-hidden="true">
                        {subject.name.slice(0, 2)}
                      </span>
                      <span className="subject-directory-copy">
                        <strong>{subject.name}</strong>
                        <span>
                          {chapters.length} chapters · {videos} with lectures ·{" "}
                          {books} textbooks
                        </span>
                      </span>
                      <span className="subject-progress-label">
                        {subjectLessons.length
                          ? `${finished}/${subjectLessons.length} lessons complete`
                          : "Browse chapters"}
                      </span>
                      <ArrowRight size={16} />
                    </button>
                  );
                })}
              </div>
            ) : (
              <p className="inline-empty">
                Choose Class 11 or 12 and your subjects in Preferences.
              </p>
            )}
          </section>
          <nav
            className="library-links"
            aria-label="Quick access to learning resources"
          >
            {[
              {
                title: "Lectures",
                path: "/lectures",
                Icon: Play,
                detail: "Detailed & one-shot",
              },
              {
                title: "NCERT Books",
                path: "/books",
                Icon: BookOpen,
                detail: "Chapter textbooks",
              },
              {
                title: "Notes",
                path: "/notes",
                Icon: NotebookPen,
                detail: "Chapter summaries",
              },
            ].map(({ title, path, Icon, detail }) => (
              <button key={path} onClick={() => go(path)}>
                <Icon size={18} />
                <strong>{title}</strong>
                <span>{detail}</span>
                <ArrowRight size={15} />
              </button>
            ))}
          </nav>
          <section className="recent-section" aria-labelledby="recent-heading">
            <div className="section-heading">
              <h2 id="recent-heading">Recent activity</h2>
              <button className="text-button" onClick={() => go("/progress")}>
                View progress <ArrowRight size={14} />
              </button>
            </div>
            {activity.length ? (
              activity.map((item) => (
                <button
                  key={item.id}
                  className="activity-row"
                  onClick={() => go(`/learn/${item.lessonId}`)}
                >
                  <span>
                    <strong>{item.title}</strong>
                    <span>{item.detail}</span>
                  </span>
                  <time dateTime={item.date}>
                    {new Date(item.date).toLocaleDateString("en", {
                      day: "numeric",
                      month: "short",
                    })}
                  </time>
                  <ArrowRight size={15} />
                </button>
              ))
            ) : (
              <div className="inline-empty">
                <p>No learning activity yet.</p>
                <span>
                  Saved personal notes and quiz results will appear here.
                </span>
              </div>
            )}
          </section>
        </div>
        <aside className="dashboard-secondary">
          <StreakCard state={state} />
          <section
            className="practice-summary"
            aria-labelledby="practice-heading"
          >
            <div className="section-heading">
              <h2 id="practice-heading">Practice</h2>
              <Target size={17} />
            </div>
            {lessons.length ? (
              <>
                <p>Check your understanding with a lesson quiz.</p>
                <button
                  className="text-button"
                  onClick={() => go(`/learn/${featured!.id}`)}
                >
                  Open lesson & quiz <ArrowRight size={15} />
                </button>
              </>
            ) : (
              <p>
                Find chapter mock tests below lectures. Availability varies by
                chapter.
              </p>
            )}
            <div className="future-tools">
              <button onClick={() => go("/lectures")}>
                Chapter mock tests{" "}
                <small>Open a chapter to check availability</small>
              </button>
              <span>
                Previous year questions <small>Not available yet</small>
              </span>
            </div>
          </section>
        </aside>
      </div>
    </div>
  );
}
