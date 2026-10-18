import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import ChapterMockTest from "./ChapterMockTest";
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
              <p>{availability(catalog)}</p>
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
          <p>{availability(catalog)}</p>
        </div>
        <ShareMockTest chapter={catalog.chapter.chapter} />
      </div>
      <p className="mock-intro">
        Anyone with this link can open the chapter. Each student starts a
        separate guest attempt when approved questions are available. A shared
        link does not transfer answers or results.
      </p>
      <ChapterMockTest
        key={catalog.chapter.chapter}
        chapter={catalog.chapter}
      />
    </>
  );
}
