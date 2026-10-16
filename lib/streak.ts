import type { LearningState } from "./types";

export const STUDY_TIME_ZONE = "Asia/Kolkata";
export function studyDay(now = new Date()): string {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: STUDY_TIME_ZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(now);
  const value = (type: string) => parts.find((p) => p.type === type)!.value;
  return `${value("year")}-${value("month")}-${value("day")}`;
}
function previousDay(day: string, offset = 1) {
  return new Date(Date.parse(`${day}T00:00:00Z`) - offset * 86400000)
    .toISOString()
    .slice(0, 10);
}
export function streakSummary(days: string[], today = studyDay()) {
  const sorted = [...new Set(days.filter((day) => day <= today))].sort();
  const recorded = new Set(sorted);
  let current = 0;
  let cursor = recorded.has(today) ? today : previousDay(today);
  while (recorded.has(cursor)) {
    current++;
    cursor = previousDay(cursor);
  }
  let best = 0,
    run = 0,
    last = "";
  for (const day of sorted) {
    run = last === previousDay(day) ? run + 1 : 1;
    best = Math.max(best, run);
    last = day;
  }
  return {
    current,
    best,
    studiedToday: recorded.has(today),
    week: Array.from({ length: 7 }, (_, i) => {
      const date = previousDay(today, 6 - i);
      return { date, active: recorded.has(date), today: date === today };
    }),
  };
}
export function recordStudyDay(
  state: LearningState,
  day = studyDay(),
): LearningState {
  return state.activityDays.includes(day)
    ? state
    : {
        ...state,
        activityDays: [...state.activityDays, day].sort().slice(-3660),
      };
}
export function addStudySeconds(
  state: LearningState,
  seconds: number,
  day = studyDay(),
): LearningState {
  if (!Number.isFinite(seconds) || seconds <= 0) return state;
  const total = Math.min(60, (state.studySeconds[day] ?? 0) + seconds);
  if (total === (state.studySeconds[day] ?? 0)) return state;
  const next = {
    ...state,
    studySeconds: { ...state.studySeconds, [day]: total },
  };
  return total >= 60 ? recordStudyDay(next, day) : next;
}
export function recordStudyActions(
  before: LearningState,
  after: LearningState,
  day = studyDay(),
): LearningState {
  const oldNotes = new Set(before.notes.map((note) => note.id));
  const oldAttempts = new Set(before.attempts.map((attempt) => attempt.id));
  return after.notes.some(
    (note) => note.text.trim() && !oldNotes.has(note.id),
  ) || after.attempts.some((attempt) => !oldAttempts.has(attempt.id))
    ? recordStudyDay(after, day)
    : after;
}
