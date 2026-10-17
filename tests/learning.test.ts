import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import {
  activeSegment,
  parseTranscript,
  transcriptGaps,
  youtubeId,
  grade,
  completion,
} from "../lib/learning";
import { publicLesson, seed } from "../lib/seed";
import { lessonSchema, stateSchema } from "../lib/schema";
import { emptyState } from "../lib/types";
import { validateContent } from "../lib/content-validation";
import { lessonsForClass } from "../lib/catalog";
import {
  chaptersFor,
  examForSubjects,
  lessonsForProfile,
  normalizeProfile,
  selectedSubjects,
  subjectCatalog,
} from "../lib/curriculum";
import { resourcesFor, resourceLabel } from "../lib/chapter-resources";

test("PCM, PCB and PCMB selections derive their exams without adding subjects", () => {
  const pcm = ["Physics", "Chemistry", "Mathematics"];
  const pcb = ["Physics", "Chemistry", "Biology"];
  assert.equal(examForSubjects(pcm), "JEE");
  assert.equal(examForSubjects(pcb), "NEET");
  assert.equal(examForSubjects([...pcb, "Mathematics"]), "JEE + NEET");
  assert.equal(examForSubjects(["Physics", "Chemistry"]), "Boards");
  assert.equal(examForSubjects([]), "Boards");
  assert.deepEqual(
    selectedSubjects(pcb).map((s) => s.name),
    pcb,
  );
  const profile = normalizeProfile({
    ...emptyState().profile,
    subjects: pcb,
    exam: "JEE",
  });
  assert.equal(profile.exam, "NEET");
  assert.deepEqual(profile.subjects, pcb);
  assert.deepEqual(
    normalizeProfile({ ...profile, subjects: ["Physics", "Maths", "Biology"] })
      .subjects,
    ["Physics", "Mathematics", "Biology"],
  );
});

test("lecture history respects both class and chosen subjects", () => {
  const physics = publicLesson(seed);
  const biology = { ...physics, id: "biology-demo", subject: "Biology" };
  const maths = { ...physics, id: "maths-demo", subject: "Mathematics" };
  const profile = {
    ...emptyState().profile,
    subjects: ["Physics", "Chemistry", "Biology"],
  };
  assert.deepEqual(
    lessonsForProfile([physics, biology, maths], profile).map((l) => l.id),
    [physics.id, biology.id],
  );
  assert.deepEqual(
    lessonsForProfile([physics, biology, maths], {
      ...profile,
      className: "11",
    }),
    [],
  );
  assert.deepEqual(
    lessonsForProfile([physics, biology, maths], { ...profile, subjects: [] }),
    [],
  );
});

test("chapter libraries have class-specific numbering and no unsupplied media", () => {
  assert.equal(chaptersFor("11", "physics")[0].title, "Units and Measurements");
  assert.equal(chaptersFor("12", "physics")[2].title, "Current Electricity");
  assert.ok(
    !chaptersFor("11", "physics").some(
      (c) => c.title === "Current Electricity",
    ),
  );
  assert.deepEqual(chaptersFor("Other", "physics"), []);
  const expected = { "11": [14, 9, 14, 19], "12": [14, 10, 13, 13] };
  const suppliedNotes = [
    "units-and-measurements",
    "motion-in-a-straight-line",
    "motion-in-a-plane",
    "laws-of-motion",
  ];
  const suppliedDetailedVideos = [
    "Rcdf1W-0F_Q",
    "LWeOOFvxrd0",
    "-N7eYNzRMOM",
    "8hG2gbmf7sU",
  ];
  const suppliedOneShotVideos = [
    "v3rx_lBBvCk",
    "joMDsZgx2a0",
    "qN8pSP8o_uY",
    "yjb5MgEkzic",
  ];
  const chemistryDetailedVideos = [
    "ZdzrnPawYf4",
    "t0YvTa26TSs",
    "A8UE8We3FiI",
    "VTFEPlwgqZY",
  ];
  const chemistryOneShotVideos = [
    "_9us2WJRL7E",
    "Okl9bDM7xwg",
    "GjqU5RmLsCw",
    "rhKGEM3w4qM",
  ];
  const chemistryBooks = [
    "some-basic-concepts-of-chemistry",
    "structure-of-atom",
    "classification-of-elements-and-periodicity-in-properties",
    "chemical-bonding-and-molecular-structure",
    "thermodynamics",
    "equilibrium",
  ];
  const mathematicsBooks = [
    "sets",
    "relations-and-functions",
    "trigonometric-functions",
    "complex-numbers-and-quadratic-equations",
    "linear-inequalities",
    "permutations-and-combinations",
  ];
  const mathematicsVideos = [
    "S2o6x32xFys",
    "834b8w2EKiA",
    "_pNT2pCEEug",
    "XoPTYrhGdew",
    "otz_2spIgq8",
    "VXbKZURwYfU",
  ];
  const biologyVideos = [
    "Lsrc3RsmRR4",
    "mJe-aqB17rI",
    "sQEAsqgOME8",
    "P0eGiGPSwgc",
    "oH5of1D4PlU",
    "J3VM-fXrYf4",
    "4bDQJZN5MX8",
    "rdmJ4mAERe8",
  ];
  const biologyNotes: Record<number, string> = {
    1: "the-living-world",
    2: "biological-classification",
    3: "plant-kingdom",
    4: "animal-kingdom",
    5: "morphology-of-flowering-plants",
    7: "structural-organisation-in-animals",
    8: "cell-the-unit-of-life",
    9: "biomolecules",
  };
  for (const className of ["11", "12"] as const) {
    subjectCatalog.forEach((subject, index) => {
      const chapters = chaptersFor(className, subject.id);
      assert.equal(chapters.length, expected[className][index]);
      assert.deepEqual(
        chapters.map((c) => c.number),
        Array.from({ length: chapters.length }, (_, i) => i + 1),
      );
      for (const chapter of chapters) {
        const hasBiologyVideo =
          className === "11" && subject.id === "biology" && chapter.number <= 8;
        const hasMathematicsVideo =
          className === "11" &&
          subject.id === "mathematics" &&
          chapter.number <= 6;
        const hasPhysicsNotes =
          className === "11" && subject.id === "physics" && chapter.number <= 4;
        const notesPdf = hasPhysicsNotes
          ? `/notes/class-11/physics/${suppliedNotes[chapter.number - 1]}.pdf`
          : className === "11" &&
              subject.id === "chemistry" &&
              chapter.number <= 4
            ? `/notes/class-11/chemistry/${chemistryBooks[chapter.number - 1]}-notes.pdf`
            : className === "11" &&
                subject.id === "mathematics" &&
                chapter.number <= 5
              ? `/notes/class-11/mathematics/${mathematicsBooks[chapter.number - 1]}-notes.pdf`
              : className === "11" &&
                  subject.id === "biology" &&
                  biologyNotes[chapter.number]
                ? `/notes/class-11/biology/${biologyNotes[chapter.number]}-notes.pdf`
                : null;
        const bookPdf = hasPhysicsNotes
          ? `/books/class-11/physics/${suppliedNotes[chapter.number - 1]}.pdf`
          : className === "11" &&
              subject.id === "chemistry" &&
              chapter.number <= 6
            ? `/books/class-11/chemistry/${chemistryBooks[chapter.number - 1]}.pdf`
            : className === "11" &&
                subject.id === "mathematics" &&
                chapter.number <= 6
              ? `/books/class-11/mathematics/${mathematicsBooks[chapter.number - 1]}.pdf`
              : null;
        const detailedVideoId = hasPhysicsNotes
          ? suppliedDetailedVideos[chapter.number - 1]
          : className === "11" &&
              subject.id === "chemistry" &&
              chapter.number <= 4
            ? chemistryDetailedVideos[chapter.number - 1]
            : hasMathematicsVideo
              ? mathematicsVideos[chapter.number - 1]
              : hasBiologyVideo
                ? biologyVideos[chapter.number - 1]
                : null;
        assert.deepEqual(resourcesFor(className, subject.id, chapter.number), {
          bookPdf,
          notesPdf,
          detailedVideoId,
          oneShotVideoId: hasPhysicsNotes
            ? suppliedOneShotVideos[chapter.number - 1]
            : className === "11" &&
                subject.id === "chemistry" &&
                chapter.number <= 4
              ? chemistryOneShotVideos[chapter.number - 1]
              : hasMathematicsVideo
                ? mathematicsVideos[chapter.number - 1]
                : hasBiologyVideo
                  ? biologyVideos[chapter.number - 1]
                  : null,
          videoStartSeconds: hasMathematicsVideo ? 15 : 0,
        });
        assert.equal(
          resourceLabel(className, subject.id, chapter.number, "notes"),
          notesPdf ? "Notes available" : "Notes coming soon",
        );
        assert.equal(
          resourceLabel(className, subject.id, chapter.number, "books"),
          bookPdf ? "PDF available" : "PDF coming soon",
        );
        assert.equal(
          resourceLabel(className, subject.id, chapter.number, "lectures"),
          detailedVideoId ? "Lectures available" : "Videos coming soon",
        );
        for (const pdf of [notesPdf, bookPdf].filter(Boolean))
          assert.equal(
            readFileSync(new URL(`../public${pdf}`, import.meta.url))
              .subarray(0, 5)
              .toString(),
            "%PDF-",
          );
      }
    });
  }
});
test("YouTube extraction supports watch, short, embed and rejects deceptive hosts", () => {
  for (const u of [
    "https://youtu.be/-Rm7K-rXk7A?si=test",
    "https://www.youtube.com/watch?v=-Rm7K-rXk7A",
    "https://youtube.com/embed/-Rm7K-rXk7A",
    "https://youtube.com/shorts/-Rm7K-rXk7A",
  ])
    assert.equal(youtubeId(u), "-Rm7K-rXk7A");
  for (const u of [
    "javascript:alert(1)",
    "https://youtube.com.evil.example/watch?v=-Rm7K-rXk7A",
    "http://youtube.com/watch?v=-Rm7K-rXk7A",
    "https://youtu.be/invalid",
  ])
    assert.throws(() => youtubeId(u));
});
const vtt =
  "WEBVTT\n\n00:00.000 --> 00:10.000\nVoltage is potential difference.\n\n00:15.000 --> 00:25.000\nCurrent is charge flow.";
test("VTT parses; exact boundary and gap matching remain honest in both seek directions", () => {
  const s = parseTranscript(vtt);
  assert.equal(s.length, 2);
  assert.equal(activeSegment(s, 0)?.id, "segment-1");
  assert.equal(activeSegment(s, 20)?.id, "segment-2");
  assert.equal(activeSegment(s, 5)?.id, "segment-1");
  assert.equal(activeSegment(s, 10), null);
  assert.equal(activeSegment(s, 14), null);
  assert.equal(activeSegment(s, 25), null);
  assert.deepEqual(transcriptGaps(s), [{ start: 10, end: 15 }]);
});
test("SRT accepts comma milliseconds and normalized JSON preserves reviewed cards", () => {
  const s = parseTranscript("1\n00:00:01,500 --> 00:00:04,000\nHello");
  assert.equal(s[0].startSeconds, 1.5);
  assert.equal(parseTranscript(JSON.stringify(s))[0].endSeconds, 4);
});
test("transcripts reject empty, overlap, out of order, duplicate and invalid timestamps", () => {
  for (const raw of [
    "",
    "WEBVTT",
    "1\n00:00:62,000 --> 00:00:70,000\nBad",
    JSON.stringify([{ id: "a", startSeconds: 4, endSeconds: 2, text: "bad" }]),
    JSON.stringify([
      { id: "a", startSeconds: 0, endSeconds: 5, text: "a" },
      { id: "b", startSeconds: 4, endSeconds: 7, text: "b" },
    ]),
    JSON.stringify([
      { id: "a", startSeconds: 0, endSeconds: 2, text: "a" },
      { id: "a", startSeconds: 3, endSeconds: 4, text: "b" },
    ]),
  ])
    assert.throws(() => parseTranscript(raw));
});
test("original quiz key is independently calculated and public content omits answers", () => {
  // I=12/6, doubling at constant R, V/I slope, temperature condition, .5*10.
  const answers = { q1: 1, q2: 2, q3: 0, q4: 3, q5: 2 };
  assert.equal(grade(seed, answers).score, 5);
  const wrong = grade(seed, { ...answers, q1: 0, q5: 0 });
  assert.equal(wrong.score, 3);
  assert.match(wrong.results[0].explanation, /2 A/);
  assert.throws(() => grade(seed, { q1: 1 }));
  assert.throws(() => grade(seed, { ...answers, q1: 8 }));
  assert.ok(
    publicLesson(seed).questions.every(
      (q) => !("correct" in q) && !("explanation" in q),
    ),
  );
});
test("completion requires explicit review plus at least 80 percent of five questions", () => {
  assert.equal(completion(false, 5, 5), false);
  assert.equal(completion(true, 3, 5), false);
  assert.equal(completion(true, 4, 5), true);
  assert.equal(completion(true, 1, 1), false);
});
test("seed is valid, all citations exist, no made-up video transcript, state survives JSON roundtrip", () => {
  lessonSchema.parse(seed);
  assert.equal(seed.transcriptVerified, false);
  assert.equal(seed.segments.length, 0);
  const ids = new Set(seed.excerpts.map((e) => e.id));
  assert.ok(seed.cards.every((c) => ids.has(c.sourceId)));
  assert.ok(seed.questions.every((q) => ids.has(q.sourceId)));
  const state = emptyState();
  state.notes.push({
    id: "test",
    lessonId: seed.id,
    timestamp: 25,
    text: "<script>alert(1)</script>",
    updatedAt: new Date().toISOString(),
  });
  assert.deepEqual(stateSchema.parse(JSON.parse(JSON.stringify(state))), state);
});
test("publishing rejects unreviewed, unsupported, duplicate and falsely synced content", () => {
  validateContent(seed, true);
  assert.throws(() => validateContent(seed, false));
  assert.throws(() =>
    validateContent({ ...seed, transcriptVerified: true }, true),
  );
  assert.throws(() =>
    validateContent(
      { ...seed, cards: [{ ...seed.cards[0], sourceId: "invented-page" }] },
      true,
    ),
  );
  assert.throws(() =>
    validateContent(
      { ...seed, questions: [...seed.questions, seed.questions[0]] },
      true,
    ),
  );
  assert.throws(() =>
    validateContent(
      {
        ...seed,
        questions: seed.questions.map((q) => ({ ...q, timestamp: 12 })),
      },
      true,
    ),
  );
});
test("Ohm’s Law is listed only in Class 12 Current Electricity, including legacy records", () => {
  const published = publicLesson(seed);
  assert.equal(published.chapter, "Current Electricity");
  assert.equal(published.className, "12");
  assert.equal(lessonsForClass([published], "12").length, 1);
  assert.deepEqual(lessonsForClass([published], "11"), []);
  const { className: _, ...legacy } = seed;
  assert.equal(lessonSchema.parse(legacy).className, "12");
});
