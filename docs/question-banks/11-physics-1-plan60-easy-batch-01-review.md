# Units and Measurements — 60-question plan, Easy Batch 1

## Status and scope

Prepared **10 original Easy drafts** for Class 11 → Physics → existing chapter `1`, Units and Measurements. IDs: `gnosis-11-physics-01-plan60-easy-001` through `010`. Each is a single-correct MCQ with four distinct options, one keyed answer, a topic, three-step explanation, original-practice label and explicit pending-review status.

Progress on the current plan: **10/60 drafted, 0/60 academically approved**. Easy 10/10 drafted; Medium 0/20; Hard 0/30. Stop here for this batch. The previous 20 Easy drafts remain unchanged and separate from this 60-question plan; the curriculum inventory therefore reports **30 Easy drafts in total** for this chapter. Neither bank is active. No earlier content was overwritten or promoted.

## Inspection and import

Inspected the curriculum, question schema, JSON/CSV importer, global ID validation, approved-content gate, current difficulty/timer policy and previous review/tests. Mapping uses `{ className: "11", subject: "physics", chapter: 1 }`; no new route or engine was created.

The owner-supplied private DPP was inspected for scope and difficulty only. The latest attached copy matched the inspected local copy by SHA-256. Source text, questions, diagrams, option sets and solutions were not imported or reproduced, and the PDF remains outside the repository. This batch uses independently written stems and solutions, not numerical substitutions into the reference questions. It also covers foundational measurement topics beyond the reference's mechanical-dimension focus. No claim of official PYQ status or independent academic approval is made.

The existing CLI first validated the authoring input in dry-run mode, then imported it with `--write`: **10 valid questions, 0 verified**. The single newly created import file was renamed, without overwriting an existing file, to:

`content/mock-questions/11-physics-1-plan60-easy-batch-01.json`

Authoring input stays under ignored `tmp/mock-imports/` and is not loaded a second time. No schema, importer, UI, lecture, notes, dashboard, scoring or timer implementation was changed for this batch. The existing test command now includes the new question checks; the inventory assertion and generated report reflect 30 chapter drafts.

## Answer checks

| ID suffix | Topic                                 | Key | Independently checked answer                                       |
| --------- | ------------------------------------- | --- | ------------------------------------------------------------------ |
| 001       | Mean of repeated measurements         | C   | (12.2 + 12.4 + 12.3)/3 = 12.3 mm                                   |
| 002       | Significant figures in multiplication | A   | 2.4 × 1.32 = 3.168 cm^2, reported as 3.2 cm^2                      |
| 003       | Exact counts                          | D   | Exact count 12 does not limit significant figures                  |
| 004       | Screw-gauge resolution                | B   | 0.50 mm / 50 = 0.010 mm                                            |
| 005       | Coefficient dimensions                | C   | s/t^3 gives L T^-3                                                 |
| 006       | Newton in SI base units               | A   | Mass × acceleration gives kg m s^-2                                |
| 007       | Strain                                | D   | 0.20 mm / 100 mm = 2.0 × 10^-3, dimensionless                      |
| 008       | Uncertainty in a difference           | B   | Central difference 12.0 cm; worst-case absolute uncertainty 0.3 cm |
| 009       | Change of area unit                   | C   | Doubling the length unit quadruples the square unit: 36/4 = 9      |
| 010       | Dimensions of a quotient              | A   | M L T^-1 divided by M L T^-2 gives T, unit s                       |

Automated checks require exactly one option satisfying the independently computed or explicitly assessed answer for every item. They also check schema, step structure, identity, labels, unique IDs and draft exclusion. These are author validation checks, not academic approval of the explanations.

## Duplicate screening

No normalized exact prompt duplicates were found against the full loaded bank or within this batch. Token-set Jaccard screening at 0.65 flagged no pair; maximum similarity was approximately **0.3214**, between the new multiplication/significant-figure question and the earlier addition/significant-figure question. They test different reporting rules and use different tasks; both were retained after author review.

Shared chapter concepts are intentional, but the new items do not repeat an earlier stem with changed numbers. Lexical screening is a heuristic, not proof of semantic originality or a plagiarism clearance. A human reviewer should still compare concepts, distractors and phrasing against the earlier drafts and the private reference.

## Academic review still required

All 10 require independent review of the full stem, every option, answer, solution, Easy classification and syllabus fit before owner approval. No unresolved mathematical error was found in author checks. Specific attention points:

- 002: Apply the multiplication significant-figure rule, round only at the end and retain the area unit.
- 003: Keep the explicit distinction between an exact count and a measured mass; do not suggest the mass is exact.
- 004: The stated pitch and division count define ideal instrument resolution; no zero correction is implied.
- 007: Both lengths use mm and cancel. A numerically equal answer with mm attached is not a valid strain.
- 008: The stem explicitly requests worst-case addition of absolute uncertainties. Do not substitute quadrature or claim a confidence level.
- 009: The length unit changes; its square changes by four. The physical area is fixed.
- 010: P and F are defined by their dimensions; F is explicitly nonzero so the quotient is well defined.

## Validation outcome

The focused bank/curriculum suite passed 14 tests, including the five new tests. The full regression suite passed **43/43 tests**, and standalone TypeScript passed. The running local API returned HTTP 200 with 30 Easy drafts, zero approved questions and empty Easy/Medium/Hard size lists. Catalog checks confirm zero eligible/approved questions, no enabled sizes and an empty active pool for this chapter. No unapproved bank was activated. No push or deployment was performed.

Later approved content will use the existing policy unchanged: Easy 10/10 minutes; Medium 10/20 or 20/40; Hard 10/30, 20/60 or 30/90. Draft status must not be changed merely to enable a test.
