import { mockCountsByDifficulty } from "../lib/mock-policy";
import { test } from "node:test";
import assert from "node:assert/strict";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import ResourceLibrary from "../components/ResourceLibrary";
import { chaptersFor, subjectCatalog } from "../lib/curriculum";
import { emptyState } from "../lib/types";
import {
  curriculumMockCatalog,
  mockCatalogFromBank,
  readMockBank,
} from "../lib/mock-bank";
import {
  mockChapterKey,
  type Difficulty,
  type MockQuestion,
} from "../lib/mock-types";

test("all 106 curriculum chapters render exactly one shared mock section after each lecture format", () => {
  let chapterCount = 0,
    renderCount = 0;
  for (const className of ["11", "12"] as const)
    for (const subject of subjectCatalog) {
      const profile = {
        ...emptyState().profile,
        className,
        subjects: [subject.name],
        courseSelected: true,
      };
      for (const chapter of chaptersFor(className, subject.id)) {
        chapterCount++;
        for (const format of [null, "detailed", "one-shot"]) {
          const html = renderToStaticMarkup(
            createElement(ResourceLibrary, {
              profile,
              section: "lectures",
              segments: [
                subject.id,
                String(chapter.number),
                ...(format ? [format] : []),
              ],
              go: () => {},
            }),
          );
          assert.equal(
            (html.match(/id="chapter-mock-test"/g) ?? []).length,
            1,
            `${className}/${subject.id}/${chapter.number}/${format}`,
          );
          assert.match(html, /Chapter mock test/);
          const resource = format
            ? html.indexOf('class="panel chapter-resource"')
            : html.indexOf('class="lecture-format-grid"');
          assert.ok(
            resource >= 0 && html.indexOf('id="chapter-mock-test"') > resource,
            "Mock test follows lecture content",
          );
          renderCount++;
        }
      }
      for (const section of ["books", "notes"] as const) {
        const html = renderToStaticMarkup(
          createElement(ResourceLibrary, {
            profile,
            section,
            segments: [subject.id, "1"],
            go: () => {},
          }),
        );
        assert.ok(
          !html.includes('id="chapter-mock-test"'),
          "Books and notes remain their own resource views",
        );
      }
    }
  assert.equal(chapterCount, 106);
  assert.equal(renderCount, 318);
});

test("all-chapter inventory reports approved, draft and sample counts without exposing answers", async () => {
  const catalog = await curriculumMockCatalog();
  assert.equal(catalog.length, 106);
  assert.equal(
    new Set(catalog.map((entry) => mockChapterKey(entry.chapter))).size,
    106,
  );
  const bank = await readMockBank();
  for (const entry of catalog) {
    const approved = bank.filter(
      (q) =>
        mockChapterKey(q) === mockChapterKey(entry.chapter) &&
        q.verification.status === "verified" &&
        !q.developmentSample,
    );
    assert.equal(entry.approvedCounts.all, approved.length);
    for (const level of ["easy", "medium", "hard"] as const)
      assert.equal(
        entry.approvedCounts[level],
        approved.filter((q) => q.difficulty === level).length,
      );
  }
  assert.ok(!JSON.stringify(catalog).includes('"correct"'));
  assert.ok(!JSON.stringify(catalog).includes('"explanation"'));
  assert.equal(
    catalog.find((entry) => mockChapterKey(entry.chapter) === "11/physics/1")!
      .draftCounts.easy,
    40,
  );
  const sample = catalog.find(
    (entry) => mockChapterKey(entry.chapter) === "11/physics/2",
  )!;
  assert.deepEqual(sample.sampleCounts, {
    all: 40,
    easy: 20,
    medium: 10,
    hard: 10,
  });
  assert.deepEqual(sample.approvedCounts, {
    all: 0,
    easy: 0,
    medium: 0,
    hard: 0,
  });
});

test("approved availability unlocks difficulty-specific sizes only within the current chapter and difficulty", async () => {
  const source = (await readMockBank()).find(
    (q) => q.id === "gnosis-11-physics-01-easy-001",
  )!;
  const chapter = { className: "11", subject: "physics", chapter: 1 } as const;
  // In-memory policy fixtures only: no question is promoted or written to a real bank.
  for (const difficulty of ["easy", "medium", "hard"] as const)
    for (const size of [0, 9, 10, 19, 20, 29, 30, 40]) {
      const questions: MockQuestion[] = Array.from(
        { length: size },
        (_, i) => ({
          ...source,
          id: `policy-fixture-${i}`,
          difficulty,
          verification: {
            status: "verified",
            method: "In-memory test fixture only",
          },
        }),
      );
      const catalog = mockCatalogFromBank(chapter, questions);
      assert.deepEqual(
        catalog.sizes[difficulty],
        mockCountsByDifficulty[difficulty].filter((n) => n <= size),
      );
      for (const other of ["easy", "medium", "hard"] as Difficulty[])
        if (other !== difficulty) assert.deepEqual(catalog.sizes[other], []);
      assert.equal(
        mockCatalogFromBank({ ...chapter, chapter: 2 }, questions).counts.all,
        0,
      );
      assert.equal(
        mockCatalogFromBank(
          chapter,
          questions.map((q) => ({
            ...q,
            verification: { ...q.verification, status: "draft" },
          })),
        ).counts.all,
        0,
      );
    }
});
