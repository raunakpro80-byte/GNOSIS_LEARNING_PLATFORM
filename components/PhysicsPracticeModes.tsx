"use client";
import ChapterMockTest from "./ChapterMockTest";
import type { MockChapter } from "@/lib/mock-types";
import { usesGuestPhysicsPractice } from "@/lib/mock-policy";
export default function PhysicsPracticeModes({
  chapter,
}: {
  chapter: MockChapter;
}) {
  // Keep the existing entry point, but render one inline test with no mode tabs.
  return (
    <ChapterMockTest
      chapter={chapter}
      practicePreview={usesGuestPhysicsPractice(chapter)}
    />
  );
}
