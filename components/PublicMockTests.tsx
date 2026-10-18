import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import PhysicsPracticeModes from "./PhysicsPracticeModes";
import ShareMockTest from "./ShareMockTest";
import {
  publicMockChapterPath,
  publicPhysicsMockPath,
} from "@/lib/public-mock-routes";
import type { MockCatalog } from "@/lib/mock-types";

function availability(catalog: MockCatalog) {
  const sizes = Object.values(catalog.sizes).reduce(
    (sum, group) => sum + group.length,
    0,
  );
  return sizes
    ? `${sizes} test configurations available`
    : "Coming soon · Questions awaiting academic approval";
}
export function PublicMockIndex({ catalogs }: { catalogs: MockCatalog[] }) {
  return (
    <>
      <div className="page-heading">
        <div>
          <div className="eyebrow">Class 11 · Physics</div>
          <h1>Chapter mock tests</h1>
          <p>
            Choose a chapter, then select your difficulty and test length. No
            account required.
          </p>
        </div>
      </div>
      <p className="mock-intro">
        Approved mock tests: Questions awaiting academic approval. Drafts are
        available only in Practice Preview.
      </p>
      <div className="chapter-list">
        {catalogs.map((catalog) => (
          <article className="chapter-row" key={catalog.chapter.chapter}>
            <span className="chapter-number">
              {String(catalog.chapter.chapter).padStart(2, "0")}
            </span>
            <div className="chapter-copy">
              <Link
                className="chapter-title"
                href={publicMockChapterPath(catalog.chapter.chapter)}
              >
                <h2>{catalog.title}</h2>
              </Link>
              <p>
                {catalog.draftCounts.all > 0
                  ? "Practice Preview available · Questions Pending Academic Review"
                  : availability(catalog)}
              </p>
              <span className="resource-pending">
                Approved questions: Easy {catalog.approvedCounts.easy} · Medium{" "}
                {catalog.approvedCounts.medium} · Hard{" "}
                {catalog.approvedCounts.hard}
              </span>
            </div>
            <Link
              className="subtle-button"
              href={publicMockChapterPath(catalog.chapter.chapter)}
            >
              Open chapter <ArrowRight size={16} />
            </Link>
          </article>
        ))}
      </div>
    </>
  );
}
export function PublicMockChapter({ catalog }: { catalog: MockCatalog }) {
  return (
    <>
      <Link className="text-button" href={publicPhysicsMockPath}>
        <ArrowLeft size={16} /> All chapter tests
      </Link>
      <div className="page-heading">
        <div>
          <div className="eyebrow">
            Class 11 · Physics · Chapter {catalog.chapter.chapter}
          </div>
          <h1>{catalog.title}</h1>
          <p>Practice Preview — Questions Pending Academic Review</p>
        </div>
        <ShareMockTest chapter={catalog.chapter.chapter} />
      </div>
      <p className="mock-intro">
        Approved mock tests: Questions awaiting academic approval. Anyone with
        this link can open the chapter. Each student starts a separate guest
        practice preview using unreviewed drafts. Approved tests remain
        separate. A shared link does not transfer answers or results.
      </p>
      <PhysicsPracticeModes
        key={catalog.chapter.chapter}
        chapter={catalog.chapter}
      />
    </>
  );
}
