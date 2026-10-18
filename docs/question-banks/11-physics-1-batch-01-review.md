# Units and Measurements — Easy Batch 1 review record

## Status

- Target bank: Class 11 → Physics → existing chapter 1, Units and Measurements.
- Batch: 20 original Easy questions; IDs `gnosis-11-physics-01-easy-001` through `020`.
- Every item has four distinct options, exactly one keyed answer, a topic and an explanation.
- All 20 remain `verification.status: "draft"`. No academic-review or publication approval has been granted.
- No student test is activated: the verified pool and 20/30/40 availability lists remain empty for this chapter.
- Progress toward the requested target: **20/120 drafted; 0 approved**. Easy: 20/40 drafted; Medium: 0/40; Hard: 0/40. Batch 2 has not started.

## Reference handling and originality

The supplied private Units and Dimension DPP was inspected offline as a concept/difficulty reference. It emphasizes elementary mechanical dimensions, comparing dimensions and simple ratios. No source questions, option sets, diagrams, answer key or worked solutions were imported, quoted or adapted by numerical substitution. The private PDF and its rendered pages are not included in the repository or public assets. Existing textbook material was consulted for broad chapter scope only.

This original batch also covers basic NCERT units and measurement conventions beyond the DPP's narrower focus: significant figures, vernier least count, uncertainties, zero correction, accuracy and precision. These are direct definitions, one-step dimensional substitutions or simple arithmetic. No advanced multi-concept derivation is labelled Easy. All source fields identify GNOSIS original practice, not official PYQs.

## Import record

The existing `scripts/import-mock-questions.ts` was used first in dry-run mode, then with `--write`. Both reported **20 valid questions, 0 verified**. The uniquely generated bank file was renamed without overwriting any existing bank to:

`content/mock-questions/11-physics-1-easy-batch-01.json`

The authoring input remains in ignored `tmp/mock-imports/`; it is not loaded as a second bank. Runtime bank loading checks ID uniqueness globally. No homepage, dashboard, lecture, notes, textbook, authentication or AI code changed for this batch.

## Answer and formula checks

The table is a review aid, not a claim of independent academic approval. Keys below are generated from the saved JSON; separate tests independently derive the physical dimensions and arithmetic, and explicitly check the conceptual keys.

| Question | Topic                             | Key | Correct option                                                               |
| -------- | --------------------------------- | --- | ---------------------------------------------------------------------------- |
| 01       | SI base units                     | C   | mole                                                                         |
| 02       | Dimensions of density             | A   | [M L^-3]                                                                     |
| 03       | Dimensions of momentum            | D   | [M L T^-1]                                                                   |
| 04       | Dimensions of acceleration        | B   | [L T^-2]                                                                     |
| 05       | Dimensions of a force constant    | C   | [M T^-2]                                                                     |
| 06       | Dimensions of specific energy     | D   | [L^2 T^-2]                                                                   |
| 07       | Dimensionless quantities          | A   | It is dimensionless, with the special SI unit name radian.                   |
| 08       | Dimensional homogeneity           | B   | x + vt                                                                       |
| 09       | Limits of dimensional analysis    | D   | A pure numerical multiplier                                                  |
| 10       | SI prefixes                       | C   | 3.2 × 10^-6 s                                                                |
| 11       | Conversion of volume units        | B   | 2.5 × 10^-6 m^3                                                              |
| 12       | Counting significant figures      | A   | 4                                                                            |
| 13       | Significant figures in addition   | C   | 13.5 cm                                                                      |
| 14       | Vernier least count               | D   | 0.1 mm                                                                       |
| 15       | Percentage uncertainty            | A   | 1%                                                                           |
| 16       | Interpreting a quoted uncertainty | B   | 2.38 m to 2.42 m                                                             |
| 17       | Zero-error correction             | A   | 1.25 cm                                                                      |
| 18       | Units versus dimensions           | C   | Its numerical value becomes 100 times larger, while its dimensions remain L. |
| 19       | Accuracy and precision            | B   | Low accuracy and high precision                                              |
| 20       | Base quantities in mechanics      | D   | Time                                                                         |

## Validation and duplicates

- JSON/schema and existing curriculum mapping: passed.
- Single-correct structure and option uniqueness: passed for all 20.
- Dimensional vectors derived independently from mass/length/time definitions: passed for density, momentum, acceleration, force constant and specific energy.
- Prefix and cubic-volume conversions, significant figures, addition rounding, least count, percentage uncertainty, interval endpoints and zero correction: passed.
- Every question has exactly one option satisfying the independent expected answer.
- Normalized exact prompt duplicates across all existing bank files: none.
- Token-set Jaccard screening at 0.65 similarity across existing banks: no flags. This is a lexical screening heuristic, not a plagiarism or semantic-originality guarantee; manual concept/stem review also found no near duplicates.
- Draft exclusion from verified pools and all difficulty/count availability lists: passed.

## Questions requiring reviewer attention

No unresolved mathematical or dimensional error was found during author checks. All 20 still require independent academic review.

Specific wording checks retained for the reviewer:

- Q7 distinguishes a dimensionless plane angle from its named SI unit, radian.
- Q12 includes both an internal zero and a trailing decimal zero; the answer is four significant figures.
- Q14 explicitly specifies a direct vernier and both division lengths.
- Q15 asks a numerical percentage uncertainty; it does not require an unstated confidence level.
- Q16 describes the interval represented by the quoted uncertainty, not a guaranteed bound on the true value.
- Q19 distinguishes repeatability (precision) from closeness to a certified reference (accuracy).

Do not change draft status until the reviewer checks each stem, all distractors, key, explanation, difficulty and syllabus fit, and the owner approves publication. Existing imports and the engine then allow only the selected difficulty, and only 20/30/40 combinations with sufficient approved questions. There is no automatic publication step.

## Completed checks

All 34 unit/regression checks passed, including the six new Batch 1 checks. Standalone TypeScript passed. The running local API reported zero approved questions for chapter 1 and rejected Easy 20-, 30- and 40-question starts with HTTP 400. This confirms the saved draft bank is not student-visible or runnable. Nothing was pushed, deployed or academically approved.
