import { writeFile } from "node:fs/promises";
import { curriculumMockCatalog } from "../lib/mock-bank";
import { subjectCatalog } from "../lib/curriculum";
import { mockCountsByDifficulty } from "../lib/mock-policy";
const levels = ["easy", "medium", "hard"] as const;
async function main() {
  const catalog = await curriculumMockCatalog();
  const subjectName = (id: string) =>
    subjectCatalog.find((s) => s.id === id)!.name;
  const rows = catalog.map((entry) => {
    const available = levels.flatMap((level) => {
      const sizes = mockCountsByDifficulty[level].filter(
        (size) => size <= entry.approvedCounts[level],
      );
      return sizes.length ? [`${level}: ${sizes.join("/")}`] : [];
    });
    const status = available.length
      ? `Available — ${available.join("; ")}`
      : entry.approvedCounts.all
        ? "Not enough questions"
        : "Coming soon";
    return `| ${entry.chapter.className} | ${subjectName(entry.chapter.subject)} | ${String(entry.chapter.chapter).padStart(2, "0")} | ${entry.title.replaceAll("|", "\\|")} | ${entry.approvedCounts.easy} | ${entry.approvedCounts.medium} | ${entry.approvedCounts.hard} | ${status} |`;
  });
  const nonApproved = catalog
    .filter((entry) => entry.draftCounts.all || entry.sampleCounts.all)
    .map(
      (entry) =>
        `- Class ${entry.chapter.className} ${subjectName(entry.chapter.subject)} ${entry.chapter.chapter}. ${entry.title}: drafts E/M/H = ${levels.map((level) => entry.draftCounts[level]).join("/")}; development samples E/M/H = ${levels.map((level) => entry.sampleCounts[level]).join("/")}.`,
    );
  const content = `# GNOSIS chapter mock-test availability

Generated from the existing curriculum and validated question-bank JSON with \`pnpm report:mock\`. Regenerate after importing or academically approving a bank. This is a snapshot of the current local files, not a deployment record.

**${catalog.length} chapters are integrated with the same reusable engine.** Approved counts mean \`verification.status === "verified"\` with \`developmentSample !== true\`. Drafts and development samples do not count as approved. Only after academic review and owner approval should a real question be marked verified.

Every lecture chapter overview, Detailed and One-shot section uses the existing class/subject/chapter number. Only the learner's selected class and subjects are shown. No duplicated chapter pages or engines are required.

## Complete chapter table

Availability below refers to approved questions only. At least 10 approved questions in one difficulty are needed. Easy supports 10; Medium 10/20; Hard 10/20/30, enabled only at their approved-count thresholds. No difficulties are mixed.

| Class | Subject | Chapter | Chapter name | Approved Easy | Approved Medium | Approved Hard | Approved mock tests |
| --- | --- | --- | --- | ---: | ---: | ---: | --- |
${rows.join("\n")}

## Draft and development-only inventory

${nonApproved.join("\n") || "No draft or development samples found."}

Development samples and drafts never enter new active tests, in development or production. No new question banks were generated, approved or published by this report.

## Current practice policy

| Difficulty | Questions | Time |
| --- | --- | --- |
| Easy | 10 | 10 min |
| Medium | 10 / 20 | 20 / 40 min |
| Hard | 10 / 20 / 30 | 30 / 60 / 90 min |

GNOSIS practice timings, not official examination timings. Timings, hidden active answer keys, server-side scoring, deadlines, guest recovery and duplicate-submission protections use the existing shared engine. Single-correct MCQs score +4/-1/0. Existing numerical/multiple-correct support retains its documented rules.

## Future imports

Use \`pnpm import:mock --input path/to/bank.json\` (or CSV) for validation only. After reviewing the content, use \`--write\` to save it. New questions must remain drafts until reviewed and approved. Duplicate IDs and invalid chapter mappings are rejected. Never place private source PDFs or question banks under \`public/\`.
`;
  await writeFile("docs/MOCK-TEST-AVAILABILITY.md", content);
  console.log(
    `Saved complete availability table for ${catalog.length} chapters to docs/MOCK-TEST-AVAILABILITY.md.`,
  );
}
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
