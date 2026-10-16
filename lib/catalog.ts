import type { PublicLesson } from "./types";
export function lessonsForClass(lessons: PublicLesson[], className: string) {
  return lessons.filter((lesson) => lesson.className === className);
}
