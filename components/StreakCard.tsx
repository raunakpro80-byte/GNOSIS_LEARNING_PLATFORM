"use client";
import { useEffect, useState } from "react";
import { Check, Flame } from "lucide-react";
import { streakSummary, studyDay } from "@/lib/streak";
import type { LearningState } from "@/lib/types";
export default function StreakCard({ state }: { state: LearningState }) {
  const [today, setToday] = useState(studyDay);
  useEffect(() => {
    const refresh = () => setToday(studyDay());
    const timer = setInterval(refresh, 30000);
    document.addEventListener("visibilitychange", refresh);
    return () => {
      clearInterval(timer);
      document.removeEventListener("visibilitychange", refresh);
    };
  }, []);
  const streak = streakSummary(state.activityDays, today);
  return (
    <section className="panel streak-card" aria-label="Study streak">
      <div className="streak-intro">
        <span className="streak-flame">
          <Flame size={27} />
        </span>
        <div>
          <span className="eyebrow">A LITTLE EVERY DAY</span>
          <h2>
            {streak.current} day{streak.current === 1 ? "" : "s"}{" "}
            <span>study streak</span>
          </h2>
          <p>
            {streak.studiedToday
              ? "Today counts. Keep your curiosity going."
              : streak.current
                ? "Your streak is still alive. Make time for a little study today."
                : "Your next small step starts a new streak."}
          </p>
        </div>
        <span className="pill">
          BEST · {streak.best} DAY{streak.best === 1 ? "" : "S"}
        </span>
      </div>
      <div
        className="streak-week"
        aria-label="Study activity for the last seven days"
      >
        {streak.week.map((day) => (
          <div
            key={day.date}
            className={`streak-day ${day.active ? "earned" : ""} ${day.today ? "is-today" : ""}`}
            aria-label={`${day.date}${day.today ? " · today" : ""}: ${day.active ? "study day earned" : "no study activity recorded"}`}
          >
            <span>
              {new Intl.DateTimeFormat("en", {
                weekday: "short",
                timeZone: "UTC",
              }).format(new Date(`${day.date}T12:00:00Z`))}
            </span>
            <span className="streak-day-mark">
              {day.active ? <Check size={16} /> : Number(day.date.slice(-2))}
            </span>
            <small>{day.today ? "Today" : "\u00a0"}</small>
          </div>
        ))}
      </div>
      <p className="streak-rule">
        Earn a day by saving a new note, submitting a quiz, or watching 60
        seconds of a lesson with this tab visible. One day counts once; days
        reset at midnight IST.
      </p>
      {!streak.studiedToday && (state.studySeconds[today] ?? 0) > 0 && (
        <span className="small muted">
          {Math.floor(state.studySeconds[today])}/60 seconds watched today
        </span>
      )}
    </section>
  );
}
