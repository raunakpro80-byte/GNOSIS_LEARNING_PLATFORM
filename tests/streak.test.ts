import { test } from "node:test";
import assert from "node:assert/strict";
import {
  studyDay,
  streakSummary,
  addStudySeconds,
  recordStudyActions,
  recordStudyDay,
} from "../lib/streak";
import { emptyState } from "../lib/types";
import { stateSchema } from "../lib/schema";
test("study days use midnight IST including month/year boundaries", () => {
  assert.equal(studyDay(new Date("2026-12-31T18:29:59Z")), "2026-12-31");
  assert.equal(studyDay(new Date("2026-12-31T18:30:00Z")), "2027-01-01");
});
test("streak counts today or yesterday, expires on missed day, deduplicates and tracks best", () => {
  assert.equal(streakSummary([], "2026-10-16").current, 0);
  assert.equal(
    streakSummary(["2026-10-14", "2026-10-15"], "2026-10-16").current,
    2,
  );
  assert.equal(streakSummary(["2026-10-14"], "2026-10-16").current, 0);
  const s = streakSummary(
    ["2026-10-14", "2026-10-15", "2026-10-16", "2026-10-16", "2026-10-17"],
    "2026-10-16",
  );
  assert.equal(s.current, 3);
  assert.equal(s.best, 3);
  assert.equal(s.studiedToday, true);
  assert.equal(s.week.length, 7);
  assert.equal(s.week.at(-1)?.date, "2026-10-16");
  assert.equal(
    streakSummary(["2026-12-31", "2027-01-01"], "2027-01-01").current,
    2,
  );
});
test("only meaningful actions earn a day; opening and editing do not", () => {
  const s = emptyState();
  assert.deepEqual(recordStudyActions(s, s, "2026-10-16").activityDays, []);
  const noted = {
    ...s,
    notes: [
      {
        id: "n1",
        lessonId: "ohms-law",
        text: "V = IR",
        timestamp: 0,
        updatedAt: new Date().toISOString(),
      },
    ],
  };
  const earned = recordStudyActions(s, noted, "2026-10-16");
  assert.deepEqual(earned.activityDays, ["2026-10-16"]);
  assert.equal(recordStudyDay(earned, "2026-10-16"), earned);
  const edited = {
    ...earned,
    notes: earned.notes.map((n) => ({ ...n, text: "Updated" })),
  };
  assert.deepEqual(
    recordStudyActions(earned, edited, "2026-10-17").activityDays,
    ["2026-10-16"],
  );
});
test("watch time accumulates across sessions, requires 60 seconds, and does not carry into next day", () => {
  let s = addStudySeconds(emptyState(), 35, "2026-10-16");
  s = stateSchema.parse(JSON.parse(JSON.stringify(s)));
  s = addStudySeconds(s, 24, "2026-10-16");
  assert.deepEqual(s.activityDays, []);
  assert.deepEqual(addStudySeconds(s, 1, "2026-10-16").activityDays, [
    "2026-10-16",
  ]);
  assert.deepEqual(addStudySeconds(s, 1, "2026-10-17").activityDays, []);
  assert.equal(addStudySeconds(s, NaN, "2026-10-16"), s);
});
test("existing saved users load without losing notes or inventing old streak activity", () => {
  const legacy = emptyState() as Partial<ReturnType<typeof emptyState>>;
  delete legacy.activityDays;
  delete legacy.studySeconds;
  const loaded = stateSchema.parse(legacy);
  assert.deepEqual(loaded.activityDays, []);
  assert.deepEqual(loaded.studySeconds, {});
  assert.throws(() =>
    stateSchema.parse({ ...loaded, activityDays: ["2026-02-30"] }),
  );
});
