"use client";
import {
  ArrowLeft,
  ArrowRight,
  Atom,
  BookOpen,
  Calculator,
  ChevronRight,
  Dna,
  FileText,
  FlaskConical,
  Play,
  VideoOff,
} from "lucide-react";
import {
  chaptersFor,
  selectedSubjects,
  subjectCatalog,
  type ResourceSection,
} from "@/lib/curriculum";
import { resourcesFor, resourceLabel } from "@/lib/chapter-resources";
import type { Profile } from "@/lib/types";
import PdfReader from "./PdfReader";
import Video from "./Video";
import ChapterMockTest from "./ChapterMockTest";
import { usesGuestPhysicsPractice } from "@/lib/mock-policy";

const sectionNames = {
  books: "NCERT Books",
  notes: "Notes",
  lectures: "Lectures",
};
const subjectIcons = {
  physics: Atom,
  chemistry: FlaskConical,
  mathematics: Calculator,
  biology: Dna,
};
const sectionDescriptions = {
  books: "Your textbooks, organised by subject and chapter.",
  notes: "Chapter notes for the subjects you study.",
  lectures: "Detailed lectures and one-shot revision, organised by chapter.",
};

export function ResourceSubjects({
  profile,
  section,
  go,
  compact = false,
}: {
  profile: Profile;
  section: ResourceSection;
  go: (path: string) => void;
  compact?: boolean;
}) {
  const subjects = selectedSubjects(profile.subjects);
  return (
    <section className="subjects-section resource-subjects">
      {compact && (
        <div className="section-heading">
          <div>
            <h2>Your lectures</h2>
            <p>Only the subjects you selected. Every chapter in one place.</p>
          </div>
        </div>
      )}
      {!subjects.length ? (
        <div className="panel resource-empty">
          <BookOpen size={28} />
          <h2>Choose your subjects</h2>
          <p>
            Select your subjects in Preferences to build your learning space.
          </p>
          <button className="primary" onClick={() => go("/settings")}>
            Choose subjects <ArrowRight size={16} />
          </button>
        </div>
      ) : !["11", "12"].includes(profile.className) ? (
        <div className="panel resource-empty">
          <h2>Choose Class 11 or 12</h2>
          <p>Chapter libraries are available for Classes 11 and 12.</p>
          <button className="primary" onClick={() => go("/settings")}>
            Update preferences
          </button>
        </div>
      ) : (
        <div className="resource-subject-grid">
          {subjects.map((s, i) => {
            const Icon = subjectIcons[s.id];
            const count = chaptersFor(profile.className, s.id).length;
            return (
              <button
                className="subject-card resource-subject-card"
                key={s.id}
                onClick={() => go(`/${section}/${s.id}`)}
              >
                <div className="subject-top">
                  <span className={`subject-icon subject-${i}`}>
                    <Icon size={25} />
                  </span>
                  <span className="pill">{count} CHAPTERS</span>
                </div>
                <h3>{s.name}</h3>
                <p>{s.description}</p>
                <span className="resource-card-footer">
                  Explore{" "}
                  {section === "books"
                    ? "NCERT books"
                    : sectionNames[section].toLowerCase()}{" "}
                  <ArrowRight size={18} />
                </span>
              </button>
            );
          })}
        </div>
      )}
    </section>
  );
}

export default function ResourceLibrary({
  profile,
  section,
  segments,
  go,
}: {
  profile: Profile;
  section: ResourceSection;
  segments: string[];
  go: (path: string) => void;
}) {
  const subjectId = segments[0];
  const subject = selectedSubjects(profile.subjects).find(
    (s) => s.id === subjectId,
  );
  const allSubject = subjectCatalog.find((s) => s.id === subjectId);
  const chapters = subject ? chaptersFor(profile.className, subject.id) : [];
  const chapterSegment = segments[1];
  const chapter = chapters.find((c) => String(c.number) === chapterSegment);
  const format = segments[2];
  const invalid =
    !!subjectId &&
    (!subject ||
      !chapters.length ||
      (!!chapterSegment && !chapter) ||
      segments.length > 3 ||
      (!!format &&
        (section !== "lectures" ||
          !["detailed", "one-shot"].includes(format))));
  const base = `/${section}`;
  const subjectPath = `${base}/${subject?.id}`;
  const chapterPath = `${subjectPath}/${chapter?.number}`;
  const resources =
    subject && chapter
      ? resourcesFor(profile.className, subject.id, chapter.number)
      : null;
  const isLecture = section === "lectures";
  const pdf = section === "books" ? resources?.bookPdf : resources?.notesPdf;
  const videoId =
    format === "one-shot"
      ? resources?.oneShotVideoId
      : resources?.detailedVideoId;
  const previous =
    chapter && chapters.find((c) => c.number === chapter.number - 1);
  const next = chapter && chapters.find((c) => c.number === chapter.number + 1);
  return (
    <div className="resource-library">
      <nav className="resource-breadcrumbs" aria-label="Resource breadcrumbs">
        <button onClick={() => go(base)}>{sectionNames[section]}</button>
        {subject && (
          <>
            <ChevronRight size={13} />
            <button onClick={() => go(subjectPath)}>{subject.name}</button>
          </>
        )}
        {chapter && (
          <>
            <ChevronRight size={13} />
            <button onClick={() => go(chapterPath)}>
              Chapter {chapter.number}
            </button>
          </>
        )}
        {format && !invalid && (
          <>
            <ChevronRight size={13} />
            <span>{format === "one-shot" ? "One-shot" : "Detailed"}</span>
          </>
        )}
      </nav>
      {invalid ? (
        <div className="panel resource-empty">
          <BookOpen size={30} />
          <h1>
            {allSubject && !subject
              ? "This subject isn’t in your course."
              : "This chapter isn’t available."}
          </h1>
          <p>
            Choose a chapter from your selected subjects for Class{" "}
            {profile.className}.
          </p>
          <button className="primary" onClick={() => go(base)}>
            Back to {sectionNames[section]}
          </button>
        </div>
      ) : (
        <>
          <div className="page-heading">
            <div>
              <div className="eyebrow">
                Class {profile.className} · {sectionNames[section]}
              </div>
              <h1>
                {chapter
                  ? chapter.title
                  : subject
                    ? subject.name
                    : sectionNames[section]}
              </h1>
              <p>
                {chapter
                  ? `Chapter ${chapter.number} · ${subject?.name}`
                  : subject
                    ? `${chapters.length} chapters. Choose where you’d like to begin.`
                    : sectionDescriptions[section]}
              </p>
            </div>
            {subject && (
              <button
                className="subtle-button"
                onClick={() =>
                  go(chapter ? (format ? chapterPath : subjectPath) : base)
                }
              >
                <ArrowLeft size={15} />
                {chapter
                  ? format
                    ? "Chapter overview"
                    : "All chapters"
                  : "All subjects"}
              </button>
            )}
          </div>
          {subject && chapter && (
            <nav className="chapter-tools" aria-label="Chapter resources">
              {(["lectures", "books", "notes"] as const).map((target) => (
                <button
                  className="subtle-button"
                  key={target}
                  aria-current={section === target ? "page" : undefined}
                  onClick={() =>
                    go(`/${target}/${subject.id}/${chapter.number}`)
                  }
                >
                  {target === "lectures" ? (
                    <Play size={15} />
                  ) : target === "books" ? (
                    <BookOpen size={15} />
                  ) : (
                    <FileText size={15} />
                  )}
                  {sectionNames[target]}
                </button>
              ))}
              {isLecture && format && (
                <button
                  className="subtle-button"
                  onClick={() =>
                    go(
                      `${chapterPath}/${format === "detailed" ? "one-shot" : "detailed"}`,
                    )
                  }
                >
                  {format === "detailed"
                    ? "Switch to one-shot"
                    : "Switch to detailed"}
                </button>
              )}
              {isLecture && (
                <a className="subtle-button" href="#chapter-mock-test">
                  Chapter mock test
                </a>
              )}
              {profile.className === "12" &&
                subject.id === "physics" &&
                chapter.number === 3 && (
                  <button
                    className="subtle-button"
                    onClick={() => go("/learn/ohms-law")}
                  >
                    Ohm’s Law workspace <ArrowRight size={15} />
                  </button>
                )}
            </nav>
          )}
          {!subject ? (
            <ResourceSubjects profile={profile} section={section} go={go} />
          ) : !chapter ? (
            <div className="chapter-list">
              {chapters.map((c) => (
                <article className="chapter-row" key={c.number}>
                  <span className="chapter-number">
                    {String(c.number).padStart(2, "0")}
                  </span>
                  <div className="chapter-copy">
                    <button
                      className="chapter-title"
                      onClick={() => go(`${subjectPath}/${c.number}`)}
                    >
                      <span className="eyebrow">CHAPTER {c.number}</span>
                      <h2>{c.title}</h2>
                    </button>
                    <span className="resource-pending">
                      {resourceLabel(
                        profile.className,
                        subject.id,
                        c.number,
                        section,
                      )}
                    </span>
                  </div>
                  {isLecture ? (
                    <div className="chapter-actions">
                      <button
                        className="subtle-button"
                        onClick={() =>
                          go(`${subjectPath}/${c.number}/detailed`)
                        }
                      >
                        <Play size={14} />
                        Detailed
                      </button>
                      <button
                        className="subtle-button"
                        onClick={() =>
                          go(`${subjectPath}/${c.number}/one-shot`)
                        }
                      >
                        <Play size={14} />
                        One-shot
                      </button>
                    </div>
                  ) : (
                    <button
                      className="subtle-button"
                      aria-label={
                        section === "notes"
                          ? `View notes for chapter ${c.number}: ${c.title}`
                          : `Open chapter ${c.number}: ${c.title}`
                      }
                      onClick={() => go(`${subjectPath}/${c.number}`)}
                    >
                      {section === "notes" ? "View notes" : "View chapter"}{" "}
                      <ArrowRight size={15} />
                    </button>
                  )}
                </article>
              ))}
            </div>
          ) : isLecture && !format ? (
            <div className="lecture-format-grid">
              {(["detailed", "one-shot"] as const).map((f) => (
                <button
                  className="panel lecture-format-card"
                  key={f}
                  onClick={() => go(`${chapterPath}/${f}`)}
                >
                  <span className="resource-format-icon">
                    <Play size={27} />
                  </span>
                  <h2>
                    {f === "detailed" ? "Detailed lecture" : "One-shot lecture"}
                  </h2>
                  <p>
                    {f === "detailed"
                      ? "Take the chapter step by step."
                      : "Revisit the whole chapter in one focused session."}
                  </p>
                  <span className="resource-pending">
                    {(
                      f === "detailed"
                        ? resources?.detailedVideoId
                        : resources?.oneShotVideoId
                    )
                      ? "Video available"
                      : "Video coming soon"}
                  </span>
                  <span className="resource-card-footer">
                    Open section <ArrowRight size={17} />
                  </span>
                </button>
              ))}
            </div>
          ) : (
            <section
              className="panel chapter-resource"
              aria-label={
                isLecture
                  ? `${format === "one-shot" ? "One-shot" : "Detailed"} lecture`
                  : section === "books"
                    ? "Chapter textbook"
                    : "Chapter notes"
              }
            >
              <div className="section-heading">
                <div>
                  <div className="eyebrow">
                    {isLecture
                      ? format === "one-shot"
                        ? "One-shot lecture"
                        : "Detailed lecture"
                      : section === "books"
                        ? "NCERT textbook"
                        : "Chapter notes"}
                  </div>
                  <h2>{chapter.title}</h2>
                </div>
                <span className="pill">
                  {(isLecture ? videoId : pdf) ? "Available" : "Coming soon"}
                </span>
              </div>
              {isLecture && videoId ? (
                <Video
                  key={`${profile.className}/${subject.id}/${chapter.number}/${format}`}
                  videoId={videoId}
                  initial={resources?.videoStartSeconds ?? 0}
                  seek={null}
                  onTime={() => {}}
                />
              ) : !isLecture && pdf ? (
                <PdfReader key={pdf} url={pdf} />
              ) : (
                <div className="resource-placeholder">
                  {isLecture ? <VideoOff size={40} /> : <FileText size={40} />}
                  <h3>
                    {isLecture
                      ? "Lecture not added yet"
                      : section === "books"
                        ? "Textbook not added yet"
                        : "Chapter notes not added yet"}
                  </h3>
                  <p>
                    {isLecture
                      ? "This video hasn’t been added yet. Check back once it’s available."
                      : "This PDF hasn’t been added yet. Check back once it’s available."}
                  </p>
                  <span>
                    Class {profile.className} · {subject.name} · Chapter{" "}
                    {chapter.number}
                  </span>
                </div>
              )}
            </section>
          )}
          {subject && chapter && isLecture && (
            <ChapterMockTest
              key={`${profile.className}/${subject.id}/${chapter.number}`}
              practicePreview={usesGuestPhysicsPractice({
                className: profile.className as "11" | "12",
                subject: subject.id,
                chapter: chapter.number,
              })}
              chapter={{
                className: profile.className as "11" | "12",
                subject: subject.id,
                chapter: chapter.number,
              }}
            />
          )}
          {subject && chapter && isLecture && format && (
            <section
              className="chapter-practice"
              aria-labelledby="chapter-practice-heading"
            >
              <h2 id="chapter-practice-heading">Practice & study tools</h2>
              <p>Check what is available for this chapter.</p>
              <div className="practice-tools">
                <details>
                  <summary>
                    Previous year questions<small>Not available yet</small>
                  </summary>
                  <p>
                    No previous year questions have been added for this chapter.
                  </p>
                </details>
                <details>
                  <summary>
                    AI tutor & personal notes
                    <small>Supported lessons only</small>
                  </summary>
                  <p>
                    These tools are available in the original Ohm’s Law lesson
                    workspace for Class 12 Physics. Live AI needs a configured
                    provider. This chapter library currently contains supplied
                    videos and PDFs.
                  </p>
                </details>
              </div>
            </section>
          )}
          {subject && chapter && (
            <nav className="chapter-pagination" aria-label="Chapter navigation">
              {previous && (
                <button
                  onClick={() =>
                    go(
                      `${subjectPath}/${previous.number}${format ? `/${format}` : ""}`,
                    )
                  }
                >
                  <small>← Previous chapter</small>
                  <span>
                    {previous.number}. {previous.title}
                  </span>
                </button>
              )}
              {next && (
                <button
                  onClick={() =>
                    go(
                      `${subjectPath}/${next.number}${format ? `/${format}` : ""}`,
                    )
                  }
                >
                  <small>Next chapter →</small>
                  <span>
                    {next.number}. {next.title}
                  </span>
                </button>
              )}
            </nav>
          )}
        </>
      )}
    </div>
  );
}
