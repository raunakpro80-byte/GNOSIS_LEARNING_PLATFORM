"use client";
import { useState } from "react";
import ChapterMockTest from "./ChapterMockTest";
import type { MockChapter } from "@/lib/mock-types";
export default function PhysicsPracticeModes({
  chapter,
}: {
  chapter: MockChapter;
}) {
  const [preview, setPreview] = useState(true);
  return (
    <>
      <div className="row" role="group" aria-label="Practice mode">
        <button
          className={preview ? "primary" : "subtle-button"}
          aria-pressed={preview}
          onClick={() => setPreview(true)}
        >
          Practice Preview
        </button>
        <button
          className={!preview ? "primary" : "subtle-button"}
          aria-pressed={!preview}
          onClick={() => setPreview(false)}
        >
          Approved mock tests
        </button>
      </div>
      <ChapterMockTest
        key={String(preview)}
        chapter={chapter}
        practicePreview={preview}
      />
    </>
  );
}
