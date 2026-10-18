# Chapter 1 — draft curation and human review

18 October 2026. Class 11 Physics, existing chapter 1: Units and Measurements. **90 drafts: 40 Easy, 20 Medium, 30 Hard. Zero approved.** No test was activated and no deployment or push was performed. Difficulty labels are author classifications pending a qualified Physics reviewer.

## What changed

The 60 owner-ZIP records were curated in place, retaining their unique IDs, chapter mapping, difficulty and draft status. All 20 Medium and all 30 Hard tasks were replaced or substantially reconstructed. Eight of ten ZIP Easy tasks were replaced; the luminous-intensity stem and area concept were retained with expanded solutions and reordered options. The previous 30 Easy drafts were re-read, independently recalculated with their existing tests, and retained unchanged. All existing verified records elsewhere, including marked development samples, were preserved. Private pre-edit snapshots and original hashes remain in ignored tmp storage; the machine review record includes retained-file hashes.

Medium now requires combinations of dimensional constraints, instrument readings/corrections, mixed-operation reporting, geometry/conversion, calibrated gains or uncertainty propagation. Hard now requires dimensional completeness/rank reasoning, shared-input treatment, inverse fitting, exact versus approximate interval propagation, constrained optimization or coupled physical scaling. These are new solving tasks rather than enlarged numbers. Some Hard items are enrichment beyond standard school maximum-error rules, so exam/prerequisite suitability must still be decided by the human reviewer. We do not claim an official JEE/NEET difficulty calibration.

## Resolution of the eight earlier flags

- **phy11-units-dimensions-easy-004:** Semantic duplicate of the earlier acceleration-dimension recall task. Replacement: Parallax prevention; no acceleration-dimension task remains at this ID.
- **phy11-units-dimensions-easy-009:** Near-duplicate significant-figure counting with changed digits. Replacement: Rounding across a carry while preserving significant figures.
- **phy11-units-dimensions-medium-001:** Semantic duplicate of the earlier F=kx spring-constant dimension task. Replacement: Two time-dependent force coefficients, then their dimensional ratio.
- **phy11-units-dimensions-medium-005:** Numerical clone of the existing km/h-to-m/s task in the motion bank. Replacement: Cube geometry plus density and cubic unit conversion.
- **phy11-units-dimensions-medium-006:** Near-duplicate multiplication/significant-figure task. Replacement: Mixed addition/division with guard digits and two reporting rules.
- **phy11-units-dimensions-hard-002:** Semantic duplicate of the numerical-prefactor limitation question. Replacement: Underdetermined capillary dimensional model and general function.
- **phy11-units-dimensions-hard-015:** Related spring-constant target, not an exact duplicate; under-level as Hard. Replacement: Derive permittivity dimensions, construct a charge-based time scale, then compare parameter changes.
- **phy11-units-dimensions-hard-017:** Related energy-density/pressure concept, not necessarily a duplicate; too direct as Hard. Replacement: Infer unknown dimensions from three nonorthogonal unit transformations, then predict a fourth.

Six were semantic/near-duplicate tasks. Two were related concepts rather than conclusively identical questions; they were still replaced to remove overlap and correct difficulty. Shared chapter principles may appear in a basic definition and a genuinely different application; that alone is not treated as a duplicate. No current repeated stem, numerical-substitution clone or full solving task was found during author review. Semantic uniqueness still needs human confirmation.

## Answer ordering and scoring

Balanced option ordering uses a recorded deterministic random seed, shuffling both target positions and distractors. The correct mathematical answer was identified before shuffling and preserved as text afterwards; its zero-based index was updated. No explanation relies on an option letter. Curated Easy A/B/C/D = **3/3/2/2**, Medium = **5/5/5/5**, Hard = **8/8/7/7**. The 30 earlier Easy drafts were not shuffled. Across all 40 Easy drafts, A/B/C/D = 11/10/10/9.

Pure server-scoring checks on the revised snapshots verify full correct = 4N, full wrong = -N, blank = 0, and hidden initial answer keys. These tests do not create live attempts or change verification statuses.

## Validation and limits

JSON/current importer-schema validation, global IDs, exact-difficulty counts and draft exclusion were checked. Separate answer checks cover all 90: the retained 30 via their existing dimension/arithmetic/option tests and the curated 60 via new recalculation, dimensional row reduction, finite-difference sensitivity, exact endpoint, asymptotic and covariance tests as applicable. Every current question has four distinct options with one checked answer. Author checks are not a substitute for an independent qualified review.

Normalized exact and token-set Jaccard screening at 0.65 is applied across all difficulty levels and against other chapter banks. No flags were found. This lexical screen does not establish semantic originality; the eight flagged tasks and the new cross-level applications were also compared manually by target, assumptions, structure and method. No plagiarism clearance against all external sources is claimed.

Uncertainty problems explicitly separate first-order worst-case bounds, exact finite intervals and standard uncertainties/covariances. Shared inputs are simplified before propagation. General dimensional forms state their allowed function arguments and do not claim to establish physical laws. Model-specific relations are supplied in the problem.

Primary rule checks used [NIST uncertainty propagation](https://physics.nist.gov/cuu/Uncertainty/combination.html) and [MIT dimensional-analysis notes](https://ocw.mit.edu/courses/2-25-advanced-fluid-mechanics-fall-2013/resources/mit2_25f13_the_buckingham/). These are checks on the underlying methods, not copied exercise content.

## Findings requiring particular human attention

- All 90 need independent approval of answer, full solution, uniqueness and difficulty. There is no completed human academic approval in this repository.
- Hard 001/002/006/016 use dimensional rank or general functions; confirm suitability and avoid treating an arbitrary dimensionless function as a determined law.
- Hard 004 uses a second-order change; Hard 012 uses exact interval bounds. Do not replace them with first-order approximations.
- Hard 007/011/013/022/025/029/030 rely on shared measurements/calibration and therefore must not double-count derived-input errors.
- Hard 010 involves constrained optimization; 021/022/026/030 use standard uncertainty/covariance rather than elementary maximum-error rules. Check whether these should be enrichment-only within the intended JEE/NEET chapter scope.
- Hard 015/027/028/029 use supplied electrical/contact/diffusion/photon models; the required formulas are stated, but prerequisite fairness and scope still need review.
- All distractors were author checked; a qualified reviewer should look for alternate interpretations, rounding ambiguity and equivalent general-function representations.

## Human-review checklist and activation boundary

1. Work through the per-question sections below without looking at the key first. Recalculate each result, including units, assumptions, uncertainty model, limiting cases and all options. Compare against the referenced automated test, not just the solution text.
2. Decide whether its provisional Easy/Medium/Hard level and prerequisites match the intended syllabus. Rewrite or keep draft any item that fails; do not approve it only to meet a question-count target. Compare across levels for near-clones.
3. Complete each question's checklist and record the reviewer name, qualification, review date, findings and owner approval. This document contains blank checkboxes, not signatures or fictional reviewer approval.
4. Keep verification.status=draft until actual independent academic review AND owner approval. Only then edit the selected existing record in place to verified and record the real decision in verification.method. Re-importing an approved copy with the same ID would correctly fail duplicate-ID validation.
5. Re-run pnpm test, pnpm typecheck and pnpm report:mock after edits. Changing a status to verified can immediately enable local tests; it is an activation action, not just a note. No such change was made here.

Reviewer: __________________ Qualification: __________________ Date: __________________

Owner approval / approved question IDs: ________________________________________________

## Current test configuration

Easy 10 → 10 minutes; Medium 10/20 → 20/40 minutes; Hard 10/20/30 → 30/60/90 minutes. The unchanged server engine filters exact difficulty and enforces deadlines. All combinations remain unavailable on the real bank until enough questions are actually approved. Synthetic/private or in-memory QA fixtures may simulate approval solely for engine tests; no chapter content is promoted to run them.

## Question summary

| Question ID                          | Level  | Key | Correct answer                                                                             | Review state                                       |
| ------------------------------------ | ------ | --- | ------------------------------------------------------------------------------------------ | -------------------------------------------------- |
| gnosis-11-physics-01-easy-001        | easy   | C   | mole                                                                                       | Draft — author checks passed; human review pending |
| gnosis-11-physics-01-easy-002        | easy   | A   | [M L^-3]                                                                                   | Draft — author checks passed; human review pending |
| gnosis-11-physics-01-easy-003        | easy   | D   | [M L T^-1]                                                                                 | Draft — author checks passed; human review pending |
| gnosis-11-physics-01-easy-004        | easy   | B   | [L T^-2]                                                                                   | Draft — author checks passed; human review pending |
| gnosis-11-physics-01-easy-005        | easy   | C   | [M T^-2]                                                                                   | Draft — author checks passed; human review pending |
| gnosis-11-physics-01-easy-006        | easy   | D   | [L^2 T^-2]                                                                                 | Draft — author checks passed; human review pending |
| gnosis-11-physics-01-easy-007        | easy   | A   | It is dimensionless, with the special SI unit name radian.                                 | Draft — author checks passed; human review pending |
| gnosis-11-physics-01-easy-008        | easy   | B   | x + vt                                                                                     | Draft — author checks passed; human review pending |
| gnosis-11-physics-01-easy-009        | easy   | D   | A pure numerical multiplier                                                                | Draft — author checks passed; human review pending |
| gnosis-11-physics-01-easy-010        | easy   | C   | 3.2 × 10^-6 s                                                                              | Draft — author checks passed; human review pending |
| gnosis-11-physics-01-easy-011        | easy   | B   | 2.5 × 10^-6 m^3                                                                            | Draft — author checks passed; human review pending |
| gnosis-11-physics-01-easy-012        | easy   | A   | 4                                                                                          | Draft — author checks passed; human review pending |
| gnosis-11-physics-01-easy-013        | easy   | C   | 13.5 cm                                                                                    | Draft — author checks passed; human review pending |
| gnosis-11-physics-01-easy-014        | easy   | D   | 0.1 mm                                                                                     | Draft — author checks passed; human review pending |
| gnosis-11-physics-01-easy-015        | easy   | A   | 1%                                                                                         | Draft — author checks passed; human review pending |
| gnosis-11-physics-01-easy-016        | easy   | B   | 2.38 m to 2.42 m                                                                           | Draft — author checks passed; human review pending |
| gnosis-11-physics-01-easy-017        | easy   | A   | 1.25 cm                                                                                    | Draft — author checks passed; human review pending |
| gnosis-11-physics-01-easy-018        | easy   | C   | Its numerical value becomes 100 times larger, while its dimensions remain L.               | Draft — author checks passed; human review pending |
| gnosis-11-physics-01-easy-019        | easy   | B   | Low accuracy and high precision                                                            | Draft — author checks passed; human review pending |
| gnosis-11-physics-01-easy-020        | easy   | D   | Time                                                                                       | Draft — author checks passed; human review pending |
| gnosis-11-physics-01-plan60-easy-001 | easy   | C   | 12.3 mm                                                                                    | Draft — author checks passed; human review pending |
| gnosis-11-physics-01-plan60-easy-002 | easy   | A   | 3.2 cm^2                                                                                   | Draft — author checks passed; human review pending |
| gnosis-11-physics-01-plan60-easy-003 | easy   | D   | No, because an exact count does not limit the significant figures.                         | Draft — author checks passed; human review pending |
| gnosis-11-physics-01-plan60-easy-004 | easy   | B   | 0.010 mm                                                                                   | Draft — author checks passed; human review pending |
| gnosis-11-physics-01-plan60-easy-005 | easy   | C   | [L T^-3]                                                                                   | Draft — author checks passed; human review pending |
| gnosis-11-physics-01-plan60-easy-006 | easy   | A   | kg m s^-2                                                                                  | Draft — author checks passed; human review pending |
| gnosis-11-physics-01-plan60-easy-007 | easy   | D   | 2.0 × 10^-3                                                                                | Draft — author checks passed; human review pending |
| gnosis-11-physics-01-plan60-easy-008 | easy   | B   | (12.0 ± 0.3) cm                                                                            | Draft — author checks passed; human review pending |
| gnosis-11-physics-01-plan60-easy-009 | easy   | C   | 9                                                                                          | Draft — author checks passed; human review pending |
| gnosis-11-physics-01-plan60-easy-010 | easy   | A   | s                                                                                          | Draft — author checks passed; human review pending |
| phy11-units-dimensions-easy-001      | easy   | B   | 10^9                                                                                       | Draft — author checks passed; human review pending |
| phy11-units-dimensions-easy-002      | easy   | C   | Candela                                                                                    | Draft — author checks passed; human review pending |
| phy11-units-dimensions-easy-003      | easy   | A   | The smallest change in the measured quantity that one scale division represents.           | Draft — author checks passed; human review pending |
| phy11-units-dimensions-easy-004      | easy   | A   | View along a line perpendicular to the scale through the pointer.                          | Draft — author checks passed; human review pending |
| phy11-units-dimensions-easy-005      | easy   | D   | It decreases; a fixed calibration bias would not be removed by averaging.                  | Draft — author checks passed; human review pending |
| phy11-units-dimensions-easy-006      | easy   | A   | 1.50 × 10^3 m                                                                              | Draft — author checks passed; human review pending |
| phy11-units-dimensions-easy-007      | easy   | B   | 100.0 g                                                                                    | Draft — author checks passed; human review pending |
| phy11-units-dimensions-easy-008      | easy   | B   | Absolute uncertainty has units of mm; relative uncertainty is dimensionless.               | Draft — author checks passed; human review pending |
| phy11-units-dimensions-easy-009      | easy   | D   | 1.00 m                                                                                     | Draft — author checks passed; human review pending |
| phy11-units-dimensions-easy-010      | easy   | C   | [L^2]                                                                                      | Draft — author checks passed; human review pending |
| phy11-units-dimensions-hard-001      | hard   | D   | T = sqrt(L/g) Φ(A/L)                                                                       | Draft — author checks passed; human review pending |
| phy11-units-dimensions-hard-002      | hard   | C   | h = r Φ(S/(ρ g r^2))                                                                       | Draft — author checks passed; human review pending |
| phy11-units-dimensions-hard-003      | hard   | A   | (2/5, 3/5, 7/5); F2/F1=1/2                                                                 | Draft — author checks passed; human review pending |
| phy11-units-dimensions-hard-004      | hard   | C   | sqrt(G h/c^5); change = -ε^2/2                                                             | Draft — author checks passed; human review pending |
| phy11-units-dimensions-hard-005      | hard   | B   | 3                                                                                          | Draft — author checks passed; human review pending |
| phy11-units-dimensions-hard-006      | hard   | D   | No; E m/p^2 is dimensionless, and all three quantities depend on L and T only through L/T. | Draft — author checks passed; human review pending |
| phy11-units-dimensions-hard-007      | hard   | C   | 1/90                                                                                       | Draft — author checks passed; human review pending |
| phy11-units-dimensions-hard-008      | hard   | D   | 3.00%                                                                                      | Draft — author checks passed; human review pending |
| phy11-units-dimensions-hard-009      | hard   | C   | (12.00±0.18) m/s^2                                                                         | Draft — author checks passed; human review pending |
| phy11-units-dimensions-hard-010      | hard   | A   | tx=80 s, ty=20 s; minimum about 1.118%                                                     | Draft — author checks passed; human review pending |
| phy11-units-dimensions-hard-011      | hard   | D   | 2.5%                                                                                       | Draft — author checks passed; human review pending |
| phy11-units-dimensions-hard-012      | hard   | A   | About 10.56%, on the lower-speed side.                                                     | Draft — author checks passed; human review pending |
| phy11-units-dimensions-hard-013      | hard   | B   | About 0.211%                                                                               | Draft — author checks passed; human review pending |
| phy11-units-dimensions-hard-014      | hard   | B   | B_ms=B_s/1000; C_ms=C_s/sqrt(1000); C^2/(A^2 B) is dimensionless and invariant.            | Draft — author checks passed; human review pending |
| phy11-units-dimensions-hard-015      | hard   | B   | 1/2                                                                                        | Draft — author checks passed; human review pending |
| phy11-units-dimensions-hard-016      | hard   | A   | f=(E/h) Φ(G E^2/(h c^5))                                                                   | Draft — author checks passed; human review pending |
| phy11-units-dimensions-hard-017      | hard   | C   | [M L^2 T^-2]; ratio 16/3                                                                   | Draft — author checks passed; human review pending |
| phy11-units-dimensions-hard-018      | hard   | D   | (0.96π^2 m/s^2, 0.060 m); δg/g≈2.0%                                                        | Draft — author checks passed; human review pending |
| phy11-units-dimensions-hard-019      | hard   | A   | 50/51                                                                                      | Draft — author checks passed; human review pending |
| phy11-units-dimensions-hard-020      | hard   | A   | t=A/[π(sqrt(R^2+A/π)+R)]; t≈A/(2πR)                                                        | Draft — author checks passed; human review pending |
| phy11-units-dimensions-hard-021      | hard   | D   | 45                                                                                         | Draft — author checks passed; human review pending |
| phy11-units-dimensions-hard-022      | hard   | C   | 7%                                                                                         | Draft — author checks passed; human review pending |
| phy11-units-dimensions-hard-023      | hard   | D   | v=3 m/s; E_min=36 J                                                                        | Draft — author checks passed; human review pending |
| phy11-units-dimensions-hard-024      | hard   | B   | 2.00%                                                                                      | Draft — author checks passed; human review pending |
| phy11-units-dimensions-hard-025      | hard   | B   | v*=(2.00±0.24) m/s                                                                         | Draft — author checks passed; human review pending |
| phy11-units-dimensions-hard-026      | hard   | B   | ρ_xy=-1/2; u_rel(x/y)=sqrt(12)%                                                            | Draft — author checks passed; human review pending |
| phy11-units-dimensions-hard-027      | hard   | A   | 2                                                                                          | Draft — author checks passed; human review pending |
| phy11-units-dimensions-hard-028      | hard   | B   | It is multiplied by 1/(2 sqrt(2)).                                                         | Draft — author checks passed; human review pending |
| phy11-units-dimensions-hard-029      | hard   | C   | 3.5%                                                                                       | Draft — author checks passed; human review pending |
| phy11-units-dimensions-hard-030      | hard   | A   | n=1.500; u(n)≈0.0184                                                                       | Draft — author checks passed; human review pending |
| phy11-units-dimensions-medium-001    | medium | A   | [T^-2]                                                                                     | Draft — author checks passed; human review pending |
| phy11-units-dimensions-medium-002    | medium | D   | 4                                                                                          | Draft — author checks passed; human review pending |
| phy11-units-dimensions-medium-003    | medium | A   | 3 sqrt(2)                                                                                  | Draft — author checks passed; human review pending |
| phy11-units-dimensions-medium-004    | medium | A   | 12.25 mm                                                                                   | Draft — author checks passed; human review pending |
| phy11-units-dimensions-medium-005    | medium | C   | 3000 kg/m^3                                                                                | Draft — author checks passed; human review pending |
| phy11-units-dimensions-medium-006    | medium | B   | 10.8                                                                                       | Draft — author checks passed; human review pending |
| phy11-units-dimensions-medium-007    | medium | B   | 0.15 m/s                                                                                   | Draft — author checks passed; human review pending |
| phy11-units-dimensions-medium-008    | medium | C   | 2                                                                                          | Draft — author checks passed; human review pending |
| phy11-units-dimensions-medium-009    | medium | B   | 0.20 N/m                                                                                   | Draft — author checks passed; human review pending |
| phy11-units-dimensions-medium-010    | medium | C   | 0.020 Pa s                                                                                 | Draft — author checks passed; human review pending |
| phy11-units-dimensions-medium-011    | medium | D   | 6%                                                                                         | Draft — author checks passed; human review pending |
| phy11-units-dimensions-medium-012    | medium | D   | 1/54                                                                                       | Draft — author checks passed; human review pending |
| phy11-units-dimensions-medium-013    | medium | B   | 0.168%                                                                                     | Draft — author checks passed; human review pending |
| phy11-units-dimensions-medium-014    | medium | B   | 1.125×10^19                                                                                | Draft — author checks passed; human review pending |
| phy11-units-dimensions-medium-015    | medium | D   | [L T^-2]                                                                                   | Draft — author checks passed; human review pending |
| phy11-units-dimensions-medium-016    | medium | A   | 3.2%                                                                                       | Draft — author checks passed; human review pending |
| phy11-units-dimensions-medium-017    | medium | C   | 2.5×10^5 dyn/cm                                                                            | Draft — author checks passed; human review pending |
| phy11-units-dimensions-medium-018    | medium | C   | 15.0 cm                                                                                    | Draft — author checks passed; human review pending |
| phy11-units-dimensions-medium-019    | medium | A   | 3                                                                                          | Draft — author checks passed; human review pending |
| phy11-units-dimensions-medium-020    | medium | D   | 0.00733 rad                                                                                | Draft — author checks passed; human review pending |

## Full question-by-question review

### gnosis-11-physics-01-easy-001

**Difficulty:** easy (provisional). **Topic:** SI base units. **Status:** DRAFT.

A sample contains a specified amount of substance. Which SI base unit is used for this quantity?

A. kilogram  
B. kelvin  
C. mole  
D. candela

**Correct answer:** C — mole

**Explanation:**

Amount of substance is an SI base quantity with unit mole (mol). Kilogram measures mass, kelvin temperature and candela luminous intensity.

**Validation findings:** Retained foundational draft; independent derivation and unique-option checks in existing units-batch-01 or units-plan60-batch-01 tests. Full wording/solution re-read in this curation pass. No known unresolved answer-key/unit error in author checks; this is not independent academic approval.

**Changes:** Retained unchanged; same broad chapter concepts may occur in applications, but no repeated task found.

**Remaining concerns:** Independent qualified review of stem, distractors, solution, syllabus and Easy label required.

- [ ] Independent recalculation and full explanation approved.
- [ ] Every distractor is plausible and unambiguously incorrect under the stated assumptions.
- [ ] Difficulty, syllabus/prerequisites, originality and absence of a repeated task approved.
- [ ] Reviewer name/date and owner approval recorded before status changes.

### gnosis-11-physics-01-easy-002

**Difficulty:** easy (provisional). **Topic:** Dimensions of density. **Status:** DRAFT.

A uniform sample has mass m and volume V. Using density ρ = m/V, select the dimensional formula of ρ.

A. [M L^-3]  
B. [M L^3]  
C. [M L^-2]  
D. [M^-1 L^3]

**Correct answer:** A — [M L^-3]

**Explanation:**

Mass has dimension M and volume has dimension L^3. Dividing gives [ρ] = M/L^3 = M L^-3. Its SI unit is kg m^-3.

**Validation findings:** Retained foundational draft; independent derivation and unique-option checks in existing units-batch-01 or units-plan60-batch-01 tests. Full wording/solution re-read in this curation pass. No known unresolved answer-key/unit error in author checks; this is not independent academic approval.

**Changes:** Retained unchanged; same broad chapter concepts may occur in applications, but no repeated task found.

**Remaining concerns:** Independent qualified review of stem, distractors, solution, syllabus and Easy label required.

- [ ] Independent recalculation and full explanation approved.
- [ ] Every distractor is plausible and unambiguously incorrect under the stated assumptions.
- [ ] Difficulty, syllabus/prerequisites, originality and absence of a repeated task approved.
- [ ] Reviewer name/date and owner approval recorded before status changes.

### gnosis-11-physics-01-easy-003

**Difficulty:** easy (provisional). **Topic:** Dimensions of momentum. **Status:** DRAFT.

Linear momentum is defined by p = mv, where m is mass and v is velocity. What are the dimensions of p?

A. [M L T^-2]  
B. [L T^-1]  
C. [M L^2 T^-2]  
D. [M L T^-1]

**Correct answer:** D — [M L T^-1]

**Explanation:**

Velocity has dimensions L T^-1. Thus [p] = [m][v] = M L T^-1, corresponding to the SI unit kg m s^-1.

**Validation findings:** Retained foundational draft; independent derivation and unique-option checks in existing units-batch-01 or units-plan60-batch-01 tests. Full wording/solution re-read in this curation pass. No known unresolved answer-key/unit error in author checks; this is not independent academic approval.

**Changes:** Retained unchanged; same broad chapter concepts may occur in applications, but no repeated task found.

**Remaining concerns:** Independent qualified review of stem, distractors, solution, syllabus and Easy label required.

- [ ] Independent recalculation and full explanation approved.
- [ ] Every distractor is plausible and unambiguously incorrect under the stated assumptions.
- [ ] Difficulty, syllabus/prerequisites, originality and absence of a repeated task approved.
- [ ] Reviewer name/date and owner approval recorded before status changes.

### gnosis-11-physics-01-easy-004

**Difficulty:** easy (provisional). **Topic:** Dimensions of acceleration. **Status:** DRAFT.

Acceleration measures the change in velocity per unit time. Which dimensional formula follows from this definition?

A. [L T^-1]  
B. [L T^-2]  
C. [L^2 T^-2]  
D. [T^-2]

**Correct answer:** B — [L T^-2]

**Explanation:**

Velocity has dimensions L T^-1. Dividing a velocity change by a time interval gives L T^-1/T = L T^-2. The SI unit is m s^-2.

**Validation findings:** Retained foundational draft; independent derivation and unique-option checks in existing units-batch-01 or units-plan60-batch-01 tests. Full wording/solution re-read in this curation pass. No known unresolved answer-key/unit error in author checks; this is not independent academic approval.

**Changes:** Retained unchanged; same broad chapter concepts may occur in applications, but no repeated task found.

**Remaining concerns:** Independent qualified review of stem, distractors, solution, syllabus and Easy label required.

- [ ] Independent recalculation and full explanation approved.
- [ ] Every distractor is plausible and unambiguously incorrect under the stated assumptions.
- [ ] Difficulty, syllabus/prerequisites, originality and absence of a repeated task approved.
- [ ] Reviewer name/date and owner approval recorded before status changes.

### gnosis-11-physics-01-easy-005

**Difficulty:** easy (provisional). **Topic:** Dimensions of a force constant. **Status:** DRAFT.

A spring obeys F = kx, where F is force and x is extension. If [F] = M L T^-2, what are the dimensions of k?

A. [M L T^-2]  
B. [M L^2 T^-2]  
C. [M T^-2]  
D. [M T^-1]

**Correct answer:** C — [M T^-2]

**Explanation:**

Rearrange the defining relation to k = F/x. Therefore [k] = (M L T^-2)/L = M T^-2. The SI unit N m^-1 equals kg s^-2.

**Validation findings:** Retained foundational draft; independent derivation and unique-option checks in existing units-batch-01 or units-plan60-batch-01 tests. Full wording/solution re-read in this curation pass. No known unresolved answer-key/unit error in author checks; this is not independent academic approval.

**Changes:** Retained unchanged; same broad chapter concepts may occur in applications, but no repeated task found.

**Remaining concerns:** Independent qualified review of stem, distractors, solution, syllabus and Easy label required.

- [ ] Independent recalculation and full explanation approved.
- [ ] Every distractor is plausible and unambiguously incorrect under the stated assumptions.
- [ ] Difficulty, syllabus/prerequisites, originality and absence of a repeated task approved.
- [ ] Reviewer name/date and owner approval recorded before status changes.

### gnosis-11-physics-01-easy-006

**Difficulty:** easy (provisional). **Topic:** Dimensions of specific energy. **Status:** DRAFT.

Specific energy means energy divided by mass. Given [energy] = M L^2 T^-2, which formula represents specific energy?

A. [M^2 L^2 T^-2]  
B. [M L T^-2]  
C. [L T^-1]  
D. [L^2 T^-2]

**Correct answer:** D — [L^2 T^-2]

**Explanation:**

Divide the energy dimensions by M: (M L^2 T^-2)/M = L^2 T^-2. Hence J kg^-1 is equivalent to m^2 s^-2.

**Validation findings:** Retained foundational draft; independent derivation and unique-option checks in existing units-batch-01 or units-plan60-batch-01 tests. Full wording/solution re-read in this curation pass. No known unresolved answer-key/unit error in author checks; this is not independent academic approval.

**Changes:** Retained unchanged; same broad chapter concepts may occur in applications, but no repeated task found.

**Remaining concerns:** Independent qualified review of stem, distractors, solution, syllabus and Easy label required.

- [ ] Independent recalculation and full explanation approved.
- [ ] Every distractor is plausible and unambiguously incorrect under the stated assumptions.
- [ ] Difficulty, syllabus/prerequisites, originality and absence of a repeated task approved.
- [ ] Reviewer name/date and owner approval recorded before status changes.

### gnosis-11-physics-01-easy-007

**Difficulty:** easy (provisional). **Topic:** Dimensionless quantities. **Status:** DRAFT.

A plane angle in radians is the arc length divided by the radius of the circle. What follows about its dimensions?

A. It is dimensionless, with the special SI unit name radian.  
B. It has the dimension of length.  
C. It has the dimension of area.  
D. It has the dimension of inverse length.

**Correct answer:** A — It is dimensionless, with the special SI unit name radian.

**Explanation:**

Both arc length and radius have dimension L, so their ratio has dimension L/L = 1. A plane angle is dimensionless; radian (rad) is its special SI unit name.

**Validation findings:** Retained foundational draft; independent derivation and unique-option checks in existing units-batch-01 or units-plan60-batch-01 tests. Full wording/solution re-read in this curation pass. No known unresolved answer-key/unit error in author checks; this is not independent academic approval.

**Changes:** Retained unchanged; same broad chapter concepts may occur in applications, but no repeated task found.

**Remaining concerns:** Independent qualified review of stem, distractors, solution, syllabus and Easy label required.

- [ ] Independent recalculation and full explanation approved.
- [ ] Every distractor is plausible and unambiguously incorrect under the stated assumptions.
- [ ] Difficulty, syllabus/prerequisites, originality and absence of a repeated task approved.
- [ ] Reviewer name/date and owner approval recorded before status changes.

### gnosis-11-physics-01-easy-008

**Difficulty:** easy (provisional). **Topic:** Dimensional homogeneity. **Status:** DRAFT.

Let x be a length, v a velocity and t a time. Which addition is dimensionally meaningful?

A. x + v  
B. x + vt  
C. v + t  
D. x + t

**Correct answer:** B — x + vt

**Explanation:**

Quantities can be added only when their dimensions agree. The product vt has dimensions (L T^-1)T = L, matching x. Every other listed sum combines different dimensions.

**Validation findings:** Retained foundational draft; independent derivation and unique-option checks in existing units-batch-01 or units-plan60-batch-01 tests. Full wording/solution re-read in this curation pass. No known unresolved answer-key/unit error in author checks; this is not independent academic approval.

**Changes:** Retained unchanged; same broad chapter concepts may occur in applications, but no repeated task found.

**Remaining concerns:** Independent qualified review of stem, distractors, solution, syllabus and Easy label required.

- [ ] Independent recalculation and full explanation approved.
- [ ] Every distractor is plausible and unambiguously incorrect under the stated assumptions.
- [ ] Difficulty, syllabus/prerequisites, originality and absence of a repeated task approved.
- [ ] Reviewer name/date and owner approval recorded before status changes.

### gnosis-11-physics-01-easy-009

**Difficulty:** easy (provisional). **Topic:** Limits of dimensional analysis. **Status:** DRAFT.

Even after dimensional analysis fixes every power of the variables in a proposed relation, which item cannot be obtained by that method alone?

A. The fixed power of mass  
B. The fixed power of length  
C. The fixed power of time  
D. A pure numerical multiplier

**Correct answer:** D — A pure numerical multiplier

**Explanation:**

A pure number has no dimensions. Multiplying a dimensionally consistent expression by any dimensionless numerical factor leaves its dimensions unchanged, so dimensional analysis alone cannot fix that factor.

**Validation findings:** Retained foundational draft; independent derivation and unique-option checks in existing units-batch-01 or units-plan60-batch-01 tests. Full wording/solution re-read in this curation pass. No known unresolved answer-key/unit error in author checks; this is not independent academic approval.

**Changes:** Retained unchanged; same broad chapter concepts may occur in applications, but no repeated task found.

**Remaining concerns:** Independent qualified review of stem, distractors, solution, syllabus and Easy label required.

- [ ] Independent recalculation and full explanation approved.
- [ ] Every distractor is plausible and unambiguously incorrect under the stated assumptions.
- [ ] Difficulty, syllabus/prerequisites, originality and absence of a repeated task approved.
- [ ] Reviewer name/date and owner approval recorded before status changes.

### gnosis-11-physics-01-easy-010

**Difficulty:** easy (provisional). **Topic:** SI prefixes. **Status:** DRAFT.

An electronic timer records a delay of 3.2 μs. What is this delay in seconds?

A. 3.2 × 10^-3 s  
B. 3.2 × 10^6 s  
C. 3.2 × 10^-6 s  
D. 3.2 × 10^-9 s

**Correct answer:** C — 3.2 × 10^-6 s

**Explanation:**

The prefix micro (μ) denotes 10^-6. Therefore 3.2 μs = 3.2 × 10^-6 s. The time dimension is unchanged by the unit conversion.

**Validation findings:** Retained foundational draft; independent derivation and unique-option checks in existing units-batch-01 or units-plan60-batch-01 tests. Full wording/solution re-read in this curation pass. No known unresolved answer-key/unit error in author checks; this is not independent academic approval.

**Changes:** Retained unchanged; same broad chapter concepts may occur in applications, but no repeated task found.

**Remaining concerns:** Independent qualified review of stem, distractors, solution, syllabus and Easy label required.

- [ ] Independent recalculation and full explanation approved.
- [ ] Every distractor is plausible and unambiguously incorrect under the stated assumptions.
- [ ] Difficulty, syllabus/prerequisites, originality and absence of a repeated task approved.
- [ ] Reviewer name/date and owner approval recorded before status changes.

### gnosis-11-physics-01-easy-011

**Difficulty:** easy (provisional). **Topic:** Conversion of volume units. **Status:** DRAFT.

A small liquid sample occupies 2.5 cm^3. Express this volume in m^3.

A. 2.5 × 10^-2 m^3  
B. 2.5 × 10^-6 m^3  
C. 2.5 × 10^-4 m^3  
D. 2.5 × 10^6 m^3

**Correct answer:** B — 2.5 × 10^-6 m^3

**Explanation:**

Since 1 cm = 10^-2 m, cubing gives 1 cm^3 = (10^-2)^3 m^3 = 10^-6 m^3. Thus the volume is 2.5 × 10^-6 m^3.

**Validation findings:** Retained foundational draft; independent derivation and unique-option checks in existing units-batch-01 or units-plan60-batch-01 tests. Full wording/solution re-read in this curation pass. No known unresolved answer-key/unit error in author checks; this is not independent academic approval.

**Changes:** Retained unchanged; same broad chapter concepts may occur in applications, but no repeated task found.

**Remaining concerns:** Independent qualified review of stem, distractors, solution, syllabus and Easy label required.

- [ ] Independent recalculation and full explanation approved.
- [ ] Every distractor is plausible and unambiguously incorrect under the stated assumptions.
- [ ] Difficulty, syllabus/prerequisites, originality and absence of a repeated task approved.
- [ ] Reviewer name/date and owner approval recorded before status changes.

### gnosis-11-physics-01-easy-012

**Difficulty:** easy (provisional). **Topic:** Counting significant figures. **Status:** DRAFT.

A measured length is written as 0.005060 m. How many significant figures are stated?

A. 4  
B. 2  
C. 3  
D. 1

**Correct answer:** A — 4

**Explanation:**

The zeros before 5 locate the decimal point and are not significant. The four significant digits are 5, the zero between 5 and 6, 6, and the final zero after the decimal point.

**Validation findings:** Retained foundational draft; independent derivation and unique-option checks in existing units-batch-01 or units-plan60-batch-01 tests. Full wording/solution re-read in this curation pass. No known unresolved answer-key/unit error in author checks; this is not independent academic approval.

**Changes:** Retained unchanged; same broad chapter concepts may occur in applications, but no repeated task found.

**Remaining concerns:** Independent qualified review of stem, distractors, solution, syllabus and Easy label required.

- [ ] Independent recalculation and full explanation approved.
- [ ] Every distractor is plausible and unambiguously incorrect under the stated assumptions.
- [ ] Difficulty, syllabus/prerequisites, originality and absence of a repeated task approved.
- [ ] Reviewer name/date and owner approval recorded before status changes.

### gnosis-11-physics-01-easy-013

**Difficulty:** easy (provisional). **Topic:** Significant figures in addition. **Status:** DRAFT.

Two measured lengths, 12.34 cm and 1.2 cm, are added. Using the usual decimal-place rule for addition, how should the sum be reported?

A. 13.54 cm  
B. 13.540 cm  
C. 13.5 cm  
D. 14 cm

**Correct answer:** C — 13.5 cm

**Explanation:**

The unrounded sum is 13.54 cm. The least precise input is stated to one decimal place, so the sum must be rounded to one decimal place: 13.5 cm.

**Validation findings:** Retained foundational draft; independent derivation and unique-option checks in existing units-batch-01 or units-plan60-batch-01 tests. Full wording/solution re-read in this curation pass. No known unresolved answer-key/unit error in author checks; this is not independent academic approval.

**Changes:** Retained unchanged; same broad chapter concepts may occur in applications, but no repeated task found.

**Remaining concerns:** Independent qualified review of stem, distractors, solution, syllabus and Easy label required.

- [ ] Independent recalculation and full explanation approved.
- [ ] Every distractor is plausible and unambiguously incorrect under the stated assumptions.
- [ ] Difficulty, syllabus/prerequisites, originality and absence of a repeated task approved.
- [ ] Reviewer name/date and owner approval recorded before status changes.

### gnosis-11-physics-01-easy-014

**Difficulty:** easy (provisional). **Topic:** Vernier least count. **Status:** DRAFT.

For a direct vernier, one main-scale division is 1.0 mm and one vernier-scale division is 0.9 mm. What is its least count?

A. 1.9 mm  
B. 0.9 mm  
C. 1.0 mm  
D. 0.1 mm

**Correct answer:** D — 0.1 mm

**Explanation:**

For this direct vernier, least count = one main-scale division minus one vernier-scale division = 1.0 − 0.9 = 0.1 mm.

**Validation findings:** Retained foundational draft; independent derivation and unique-option checks in existing units-batch-01 or units-plan60-batch-01 tests. Full wording/solution re-read in this curation pass. No known unresolved answer-key/unit error in author checks; this is not independent academic approval.

**Changes:** Retained unchanged; same broad chapter concepts may occur in applications, but no repeated task found.

**Remaining concerns:** Independent qualified review of stem, distractors, solution, syllabus and Easy label required.

- [ ] Independent recalculation and full explanation approved.
- [ ] Every distractor is plausible and unambiguously incorrect under the stated assumptions.
- [ ] Difficulty, syllabus/prerequisites, originality and absence of a repeated task approved.
- [ ] Reviewer name/date and owner approval recorded before status changes.

### gnosis-11-physics-01-easy-015

**Difficulty:** easy (provisional). **Topic:** Percentage uncertainty. **Status:** DRAFT.

A length is reported as (50.0 ± 0.5) cm. What is the percentage uncertainty, using the quoted absolute uncertainty?

A. 1%  
B. 0.5%  
C. 0.1%  
D. 10%

**Correct answer:** A — 1%

**Explanation:**

Percentage uncertainty = (absolute uncertainty/measured value) × 100% = (0.5/50.0) × 100% = 1%. The centimetre units cancel in the ratio.

**Validation findings:** Retained foundational draft; independent derivation and unique-option checks in existing units-batch-01 or units-plan60-batch-01 tests. Full wording/solution re-read in this curation pass. No known unresolved answer-key/unit error in author checks; this is not independent academic approval.

**Changes:** Retained unchanged; same broad chapter concepts may occur in applications, but no repeated task found.

**Remaining concerns:** Independent qualified review of stem, distractors, solution, syllabus and Easy label required.

- [ ] Independent recalculation and full explanation approved.
- [ ] Every distractor is plausible and unambiguously incorrect under the stated assumptions.
- [ ] Difficulty, syllabus/prerequisites, originality and absence of a repeated task approved.
- [ ] Reviewer name/date and owner approval recorded before status changes.

### gnosis-11-physics-01-easy-016

**Difficulty:** easy (provisional). **Topic:** Interpreting a quoted uncertainty. **Status:** DRAFT.

A reported length is (2.40 ± 0.02) m. Which interval is represented by this quoted uncertainty?

A. 2.20 m to 2.60 m  
B. 2.38 m to 2.42 m  
C. 2.39 m to 2.41 m  
D. 2.40 m to 2.42 m

**Correct answer:** B — 2.38 m to 2.42 m

**Explanation:**

Subtract and add the quoted uncertainty: 2.40 − 0.02 = 2.38 m and 2.40 + 0.02 = 2.42 m. This states the reported interval; it does not assert a confidence level or guarantee the true value lies inside it.

**Validation findings:** Retained foundational draft; independent derivation and unique-option checks in existing units-batch-01 or units-plan60-batch-01 tests. Full wording/solution re-read in this curation pass. No known unresolved answer-key/unit error in author checks; this is not independent academic approval.

**Changes:** Retained unchanged; same broad chapter concepts may occur in applications, but no repeated task found.

**Remaining concerns:** Independent qualified review of stem, distractors, solution, syllabus and Easy label required.

- [ ] Independent recalculation and full explanation approved.
- [ ] Every distractor is plausible and unambiguously incorrect under the stated assumptions.
- [ ] Difficulty, syllabus/prerequisites, originality and absence of a repeated task approved.
- [ ] Reviewer name/date and owner approval recorded before status changes.

### gnosis-11-physics-01-easy-017

**Difficulty:** easy (provisional). **Topic:** Zero-error correction. **Status:** DRAFT.

A length instrument reads +0.03 cm when it should read zero. It later indicates 1.28 cm for an object. What is the zero-corrected length?

A. 1.25 cm  
B. 1.28 cm  
C. 0.03 cm  
D. 1.31 cm

**Correct answer:** A — 1.25 cm

**Explanation:**

A positive zero error makes the indicated length too large. Corrected reading = indicated reading − zero error = 1.28 − 0.03 = 1.25 cm.

**Validation findings:** Retained foundational draft; independent derivation and unique-option checks in existing units-batch-01 or units-plan60-batch-01 tests. Full wording/solution re-read in this curation pass. No known unresolved answer-key/unit error in author checks; this is not independent academic approval.

**Changes:** Retained unchanged; same broad chapter concepts may occur in applications, but no repeated task found.

**Remaining concerns:** Independent qualified review of stem, distractors, solution, syllabus and Easy label required.

- [ ] Independent recalculation and full explanation approved.
- [ ] Every distractor is plausible and unambiguously incorrect under the stated assumptions.
- [ ] Difficulty, syllabus/prerequisites, originality and absence of a repeated task approved.
- [ ] Reviewer name/date and owner approval recorded before status changes.

### gnosis-11-physics-01-easy-018

**Difficulty:** easy (provisional). **Topic:** Units versus dimensions. **Status:** DRAFT.

A fixed rod is described first in metres and then in centimetres. Which statement is correct?

A. Its physical length becomes 100 times larger.  
B. Its dimensions change from L to L^2.  
C. Its numerical value becomes 100 times larger, while its dimensions remain L.  
D. Its numerical value and unit both remain unchanged.

**Correct answer:** C — Its numerical value becomes 100 times larger, while its dimensions remain L.

**Explanation:**

The rod itself does not change. Because 1 m = 100 cm, its numerical value is multiplied by 100 when expressed in centimetres. Both units describe the same length dimension L.

**Validation findings:** Retained foundational draft; independent derivation and unique-option checks in existing units-batch-01 or units-plan60-batch-01 tests. Full wording/solution re-read in this curation pass. No known unresolved answer-key/unit error in author checks; this is not independent academic approval.

**Changes:** Retained unchanged; same broad chapter concepts may occur in applications, but no repeated task found.

**Remaining concerns:** Independent qualified review of stem, distractors, solution, syllabus and Easy label required.

- [ ] Independent recalculation and full explanation approved.
- [ ] Every distractor is plausible and unambiguously incorrect under the stated assumptions.
- [ ] Difficulty, syllabus/prerequisites, originality and absence of a repeated task approved.
- [ ] Reviewer name/date and owner approval recorded before status changes.

### gnosis-11-physics-01-easy-019

**Difficulty:** easy (provisional). **Topic:** Accuracy and precision. **Status:** DRAFT.

Repeated readings from an instrument are tightly clustered but noticeably displaced from a certified reference value. Which description best fits these readings?

A. High accuracy and high precision  
B. Low accuracy and high precision  
C. High accuracy and low precision  
D. Low accuracy and low precision

**Correct answer:** B — Low accuracy and high precision

**Explanation:**

Tight clustering indicates high precision, or repeatability. A noticeable offset from the certified reference indicates low accuracy relative to that reference. Precision alone does not establish accuracy.

**Validation findings:** Retained foundational draft; independent derivation and unique-option checks in existing units-batch-01 or units-plan60-batch-01 tests. Full wording/solution re-read in this curation pass. No known unresolved answer-key/unit error in author checks; this is not independent academic approval.

**Changes:** Retained unchanged; same broad chapter concepts may occur in applications, but no repeated task found.

**Remaining concerns:** Independent qualified review of stem, distractors, solution, syllabus and Easy label required.

- [ ] Independent recalculation and full explanation approved.
- [ ] Every distractor is plausible and unambiguously incorrect under the stated assumptions.
- [ ] Difficulty, syllabus/prerequisites, originality and absence of a repeated task approved.
- [ ] Reviewer name/date and owner approval recorded before status changes.

### gnosis-11-physics-01-easy-020

**Difficulty:** easy (provisional). **Topic:** Base quantities in mechanics. **Status:** DRAFT.

In the standard M–L–T description of mechanics, which base quantity completes mass and length?

A. Force  
B. Velocity  
C. Acceleration  
D. Time

**Correct answer:** D — Time

**Explanation:**

The mechanical base quantities in the M–L–T system are mass, length and time. Force, velocity and acceleration are derived from these base quantities.

**Validation findings:** Retained foundational draft; independent derivation and unique-option checks in existing units-batch-01 or units-plan60-batch-01 tests. Full wording/solution re-read in this curation pass. No known unresolved answer-key/unit error in author checks; this is not independent academic approval.

**Changes:** Retained unchanged; same broad chapter concepts may occur in applications, but no repeated task found.

**Remaining concerns:** Independent qualified review of stem, distractors, solution, syllabus and Easy label required.

- [ ] Independent recalculation and full explanation approved.
- [ ] Every distractor is plausible and unambiguously incorrect under the stated assumptions.
- [ ] Difficulty, syllabus/prerequisites, originality and absence of a repeated task approved.
- [ ] Reviewer name/date and owner approval recorded before status changes.

### gnosis-11-physics-01-plan60-easy-001

**Difficulty:** easy (provisional). **Topic:** Mean of repeated measurements. **Status:** DRAFT.

Three readings of the same length are 12.2 mm, 12.4 mm and 12.3 mm. Taking their arithmetic mean as the best estimate, what length should be recorded?

A. 36.9 mm  
B. 12.4 mm  
C. 12.3 mm  
D. 0.1 mm

**Correct answer:** C — 12.3 mm

**Explanation:**

1. Add the readings: 12.2 + 12.4 + 12.3 = 36.9 mm.
2. Divide by the number of readings: 36.9/3 = 12.3 mm.
3. The mean remains in millimetres; the sum alone is not the best estimate.

**Validation findings:** Retained foundational draft; independent derivation and unique-option checks in existing units-batch-01 or units-plan60-batch-01 tests. Full wording/solution re-read in this curation pass. No known unresolved answer-key/unit error in author checks; this is not independent academic approval.

**Changes:** Retained unchanged; same broad chapter concepts may occur in applications, but no repeated task found.

**Remaining concerns:** Independent qualified review of stem, distractors, solution, syllabus and Easy label required.

- [ ] Independent recalculation and full explanation approved.
- [ ] Every distractor is plausible and unambiguously incorrect under the stated assumptions.
- [ ] Difficulty, syllabus/prerequisites, originality and absence of a repeated task approved.
- [ ] Reviewer name/date and owner approval recorded before status changes.

### gnosis-11-physics-01-plan60-easy-002

**Difficulty:** easy (provisional). **Topic:** Significant figures in multiplication. **Status:** DRAFT.

A rectangular label has measured sides 2.4 cm and 1.32 cm. Using the significant-figure rule for multiplication, how should its area be reported?

A. 3.2 cm^2  
B. 3.17 cm^2  
C. 3.168 cm^2  
D. 3.0 cm^2

**Correct answer:** A — 3.2 cm^2

**Explanation:**

1. Calculate area: A = 2.4 × 1.32 = 3.168 cm^2.
2. The factors have two and three significant figures, respectively. A product is reported with the smaller number, two.
3. Rounding 3.168 to two significant figures gives 3.2 cm^2.

**Validation findings:** Retained foundational draft; independent derivation and unique-option checks in existing units-batch-01 or units-plan60-batch-01 tests. Full wording/solution re-read in this curation pass. No known unresolved answer-key/unit error in author checks; this is not independent academic approval.

**Changes:** Retained unchanged; same broad chapter concepts may occur in applications, but no repeated task found.

**Remaining concerns:** Independent qualified review of stem, distractors, solution, syllabus and Easy label required.

- [ ] Independent recalculation and full explanation approved.
- [ ] Every distractor is plausible and unambiguously incorrect under the stated assumptions.
- [ ] Difficulty, syllabus/prerequisites, originality and absence of a repeated task approved.
- [ ] Reviewer name/date and owner approval recorded before status changes.

### gnosis-11-physics-01-plan60-easy-003

**Difficulty:** easy (provisional). **Topic:** Exact counts and significant figures. **Status:** DRAFT.

A technician counts exactly 12 washers and measures their total mass to five significant figures. When calculating the mean mass per washer, does the divisor 12 limit the result to two significant figures?

A. Yes, because every two-digit number has only two significant figures.  
B. Yes, because division always reduces precision to two significant figures.  
C. No, because the measured total mass is also exact.  
D. No, because an exact count does not limit the significant figures.

**Correct answer:** D — No, because an exact count does not limit the significant figures.

**Explanation:**

1. The number 12 here comes from counting, not an uncertain measurement.
2. Exact counts have no measurement uncertainty and do not impose a finite significant-figure limit.
3. Dividing by this exact count leaves the measured total mass as the precision-limiting input; it does not make that measured mass exact.

**Validation findings:** Retained foundational draft; independent derivation and unique-option checks in existing units-batch-01 or units-plan60-batch-01 tests. Full wording/solution re-read in this curation pass. No known unresolved answer-key/unit error in author checks; this is not independent academic approval.

**Changes:** Retained unchanged; same broad chapter concepts may occur in applications, but no repeated task found.

**Remaining concerns:** Independent qualified review of stem, distractors, solution, syllabus and Easy label required.

- [ ] Independent recalculation and full explanation approved.
- [ ] Every distractor is plausible and unambiguously incorrect under the stated assumptions.
- [ ] Difficulty, syllabus/prerequisites, originality and absence of a repeated task approved.
- [ ] Reviewer name/date and owner approval recorded before status changes.

### gnosis-11-physics-01-plan60-easy-004

**Difficulty:** easy (provisional). **Topic:** Screw-gauge least count. **Status:** DRAFT.

A screw gauge advances by 0.50 mm in one complete turn, and its circular scale has 50 equal divisions. What displacement corresponds to one circular-scale division?

A. 0.10 mm  
B. 0.010 mm  
C. 1.0 mm  
D. 25 mm

**Correct answer:** B — 0.010 mm

**Explanation:**

1. One complete turn advances the screw by its pitch, 0.50 mm.
2. One division is 1/50 of a turn, so least count = pitch/50.
3. Thus the displacement is 0.50/50 = 0.010 mm per division.

**Validation findings:** Retained foundational draft; independent derivation and unique-option checks in existing units-batch-01 or units-plan60-batch-01 tests. Full wording/solution re-read in this curation pass. No known unresolved answer-key/unit error in author checks; this is not independent academic approval.

**Changes:** Retained unchanged; same broad chapter concepts may occur in applications, but no repeated task found.

**Remaining concerns:** Independent qualified review of stem, distractors, solution, syllabus and Easy label required.

- [ ] Independent recalculation and full explanation approved.
- [ ] Every distractor is plausible and unambiguously incorrect under the stated assumptions.
- [ ] Difficulty, syllabus/prerequisites, originality and absence of a repeated task approved.
- [ ] Reviewer name/date and owner approval recorded before status changes.

### gnosis-11-physics-01-plan60-easy-005

**Difficulty:** easy (provisional). **Topic:** Dimensions of a coefficient. **Status:** DRAFT.

A length s is related to elapsed time t by s = c t^3. The constant c is independent of time. What is the dimensional formula of c?

A. [L T^3]  
B. [L^3 T^-1]  
C. [L T^-3]  
D. [T^-3]

**Correct answer:** C — [L T^-3]

**Explanation:**

1. Rearrange the relation: c = s/t^3.
2. Substitute dimensions [s] = L and [t] = T.
3. Therefore [c] = L/T^3 = L T^-3. Its SI unit is m s^-3.

**Validation findings:** Retained foundational draft; independent derivation and unique-option checks in existing units-batch-01 or units-plan60-batch-01 tests. Full wording/solution re-read in this curation pass. No known unresolved answer-key/unit error in author checks; this is not independent academic approval.

**Changes:** Retained unchanged; same broad chapter concepts may occur in applications, but no repeated task found.

**Remaining concerns:** Independent qualified review of stem, distractors, solution, syllabus and Easy label required.

- [ ] Independent recalculation and full explanation approved.
- [ ] Every distractor is plausible and unambiguously incorrect under the stated assumptions.
- [ ] Difficulty, syllabus/prerequisites, originality and absence of a repeated task approved.
- [ ] Reviewer name/date and owner approval recorded before status changes.

### gnosis-11-physics-01-plan60-easy-006

**Difficulty:** easy (provisional). **Topic:** SI derived unit of force. **Status:** DRAFT.

A laboratory force sensor reports readings in newtons. Which expression in SI base units is equivalent to one newton?

A. kg m s^-2  
B. kg m^2 s^-2  
C. kg m s^-1  
D. kg m^-1 s^-2

**Correct answer:** A — kg m s^-2

**Explanation:**

1. Force equals mass multiplied by acceleration: F = ma.
2. The SI base units are kg for mass and m s^-2 for acceleration.
3. Their product is kg m s^-2, so 1 N = 1 kg m s^-2.

**Validation findings:** Retained foundational draft; independent derivation and unique-option checks in existing units-batch-01 or units-plan60-batch-01 tests. Full wording/solution re-read in this curation pass. No known unresolved answer-key/unit error in author checks; this is not independent academic approval.

**Changes:** Retained unchanged; same broad chapter concepts may occur in applications, but no repeated task found.

**Remaining concerns:** Independent qualified review of stem, distractors, solution, syllabus and Easy label required.

- [ ] Independent recalculation and full explanation approved.
- [ ] Every distractor is plausible and unambiguously incorrect under the stated assumptions.
- [ ] Difficulty, syllabus/prerequisites, originality and absence of a repeated task approved.
- [ ] Reviewer name/date and owner approval recorded before status changes.

### gnosis-11-physics-01-plan60-easy-007

**Difficulty:** easy (provisional). **Topic:** Dimensionless strain calculation. **Status:** DRAFT.

For a wire, longitudinal strain is defined as extension divided by original length. A 100 mm wire extends by 0.20 mm. What is its longitudinal strain?

A. 2.0 × 10^-3 mm  
B. 0.20  
C. 500  
D. 2.0 × 10^-3

**Correct answer:** D — 2.0 × 10^-3

**Explanation:**

1. Use strain = extension/original length. Both lengths are already in the same unit.
2. Divide: 0.20/100 = 0.0020 = 2.0 × 10^-3.
3. The millimetre units cancel. Strain is dimensionless, so appending mm would be incorrect.

**Validation findings:** Retained foundational draft; independent derivation and unique-option checks in existing units-batch-01 or units-plan60-batch-01 tests. Full wording/solution re-read in this curation pass. No known unresolved answer-key/unit error in author checks; this is not independent academic approval.

**Changes:** Retained unchanged; same broad chapter concepts may occur in applications, but no repeated task found.

**Remaining concerns:** Independent qualified review of stem, distractors, solution, syllabus and Easy label required.

- [ ] Independent recalculation and full explanation approved.
- [ ] Every distractor is plausible and unambiguously incorrect under the stated assumptions.
- [ ] Difficulty, syllabus/prerequisites, originality and absence of a repeated task approved.
- [ ] Reviewer name/date and owner approval recorded before status changes.

### gnosis-11-physics-01-plan60-easy-008

**Difficulty:** easy (provisional). **Topic:** Uncertainty in a difference. **Status:** DRAFT.

Two measured lengths are A = (18.0 ± 0.1) cm and B = (6.0 ± 0.2) cm. Using the worst-case rule that absolute uncertainties add in subtraction, what is A - B?

A. (12.0 ± 0.1) cm  
B. (12.0 ± 0.3) cm  
C. (24.0 ± 0.3) cm  
D. (12.0 ± 0.02) cm

**Correct answer:** B — (12.0 ± 0.3) cm

**Explanation:**

1. Subtract the central values: 18.0 - 6.0 = 12.0 cm.
2. For the specified worst-case rule, add absolute uncertainties: 0.1 + 0.2 = 0.3 cm.
3. Report A - B = (12.0 ± 0.3) cm. This is the stated worst-case convention, not a statistical confidence interval.

**Validation findings:** Retained foundational draft; independent derivation and unique-option checks in existing units-batch-01 or units-plan60-batch-01 tests. Full wording/solution re-read in this curation pass. No known unresolved answer-key/unit error in author checks; this is not independent academic approval.

**Changes:** Retained unchanged; same broad chapter concepts may occur in applications, but no repeated task found.

**Remaining concerns:** Independent qualified review of stem, distractors, solution, syllabus and Easy label required.

- [ ] Independent recalculation and full explanation approved.
- [ ] Every distractor is plausible and unambiguously incorrect under the stated assumptions.
- [ ] Difficulty, syllabus/prerequisites, originality and absence of a repeated task approved.
- [ ] Reviewer name/date and owner approval recorded before status changes.

### gnosis-11-physics-01-plan60-easy-009

**Difficulty:** easy (provisional). **Topic:** Change of area unit. **Status:** DRAFT.

A fixed area has numerical value 36 when the length unit is u. If the length unit is changed to u′ = 2u, what is the numerical value of the same area in the new square unit?

A. 72  
B. 18  
C. 9  
D. 144

**Correct answer:** C — 9

**Explanation:**

1. The original area is A = 36u^2.
2. The new square unit is (u′)^2 = (2u)^2 = 4u^2.
3. Therefore A = (36/4)(u′)^2 = 9(u′)^2. The physical area is unchanged.

**Validation findings:** Retained foundational draft; independent derivation and unique-option checks in existing units-batch-01 or units-plan60-batch-01 tests. Full wording/solution re-read in this curation pass. No known unresolved answer-key/unit error in author checks; this is not independent academic approval.

**Changes:** Retained unchanged; same broad chapter concepts may occur in applications, but no repeated task found.

**Remaining concerns:** Independent qualified review of stem, distractors, solution, syllabus and Easy label required.

- [ ] Independent recalculation and full explanation approved.
- [ ] Every distractor is plausible and unambiguously incorrect under the stated assumptions.
- [ ] Difficulty, syllabus/prerequisites, originality and absence of a repeated task approved.
- [ ] Reviewer name/date and owner approval recorded before status changes.

### gnosis-11-physics-01-plan60-easy-010

**Difficulty:** easy (provisional). **Topic:** Dimensions of a quotient. **Status:** DRAFT.

A quantity P has dimensions [M L T^-1] and a nonzero quantity F has dimensions [M L T^-2]. What SI base unit is appropriate for the quotient P/F?

A. s  
B. m  
C. kg  
D. s^-1

**Correct answer:** A — s

**Explanation:**

1. Divide the dimensions: [P/F] = (M L T^-1)/(M L T^-2).
2. Mass and length cancel, and T^-1/T^-2 = T.
3. The quotient therefore has the dimension of time, whose SI base unit is the second, s.

**Validation findings:** Retained foundational draft; independent derivation and unique-option checks in existing units-batch-01 or units-plan60-batch-01 tests. Full wording/solution re-read in this curation pass. No known unresolved answer-key/unit error in author checks; this is not independent academic approval.

**Changes:** Retained unchanged; same broad chapter concepts may occur in applications, but no repeated task found.

**Remaining concerns:** Independent qualified review of stem, distractors, solution, syllabus and Easy label required.

- [ ] Independent recalculation and full explanation approved.
- [ ] Every distractor is plausible and unambiguously incorrect under the stated assumptions.
- [ ] Difficulty, syllabus/prerequisites, originality and absence of a repeated task approved.
- [ ] Reviewer name/date and owner approval recorded before status changes.

### phy11-units-dimensions-easy-001

**Difficulty:** easy (provisional). **Topic:** Ratio of SI prefixes. **Status:** DRAFT.

How many milliwatts equal one megawatt?

A. 10^3  
B. 10^9  
C. 10^-9  
D. 10^6

**Correct answer:** B — 10^9

**Explanation:**

1. Mega means 10^6 and milli means 10^-3.
2. Divide the size of a megawatt by the size of a milliwatt: 10^6/10^-3 = 10^9.
3. Thus 1 MW = 10^9 mW; the physical power is unchanged.

**Validation findings:** Prefix exponents checked by subtracting -3 from 6. No known unresolved answer-key/unit error in author checks; this is not independent academic approval.

**Changes:** Rewritten to replace repetitive recall or under-level solving; supplied ID and difficulty preserved. Balanced option order with answer identity retained.

**Remaining concerns:** Confirm syllabus fit, difficulty, distractors and wording independently.

- [ ] Independent recalculation and full explanation approved.
- [ ] Every distractor is plausible and unambiguously incorrect under the stated assumptions.
- [ ] Difficulty, syllabus/prerequisites, originality and absence of a repeated task approved.
- [ ] Reviewer name/date and owner approval recorded before status changes.

### phy11-units-dimensions-easy-002

**Difficulty:** easy (provisional). **Topic:** Luminous-intensity unit. **Status:** DRAFT.

Which SI unit measures luminous intensity?

A. Kelvin  
B. Lux  
C. Candela  
D. Mole

**Correct answer:** C — Candela

**Explanation:**

1. Luminous intensity is an SI base quantity.
2. Its unit is the candela, symbol cd.
3. Lux measures illuminance; mole and kelvin refer to different base quantities.

**Validation findings:** SI quantity/unit classification; only candela fits. No known unresolved answer-key/unit error in author checks; this is not independent academic approval.

**Changes:** Retained correct luminous-intensity stem; expanded reasoning and balanced options without changing the answer.

**Remaining concerns:** Confirm syllabus fit, difficulty, distractors and wording independently.

- [ ] Independent recalculation and full explanation approved.
- [ ] Every distractor is plausible and unambiguously incorrect under the stated assumptions.
- [ ] Difficulty, syllabus/prerequisites, originality and absence of a repeated task approved.
- [ ] Reviewer name/date and owner approval recorded before status changes.

### phy11-units-dimensions-easy-003

**Difficulty:** easy (provisional). **Topic:** Resolution versus accuracy. **Status:** DRAFT.

Which description defines the least count of an ideal graduated measuring instrument?

A. The smallest change in the measured quantity that one scale division represents.  
B. A guarantee that every measurement equals the true value.  
C. The difference between every reading and the true value.  
D. The maximum value the instrument can measure.

**Correct answer:** A — The smallest change in the measured quantity that one scale division represents.

**Explanation:**

1. Least count describes the scale increment or nominal resolution.
2. It is different from range, which is the largest measurable value.
3. Resolution alone does not guarantee accuracy or remove bias.

**Validation findings:** Definition contrasted with range, error and accuracy. No known unresolved answer-key/unit error in author checks; this is not independent academic approval.

**Changes:** Rewritten to replace repetitive recall or under-level solving; supplied ID and difficulty preserved. Balanced option order with answer identity retained.

**Remaining concerns:** Confirm syllabus fit, difficulty, distractors and wording independently.

- [ ] Independent recalculation and full explanation approved.
- [ ] Every distractor is plausible and unambiguously incorrect under the stated assumptions.
- [ ] Difficulty, syllabus/prerequisites, originality and absence of a repeated task approved.
- [ ] Reviewer name/date and owner approval recorded before status changes.

### phy11-units-dimensions-easy-004

**Difficulty:** easy (provisional). **Topic:** Parallax prevention. **Status:** DRAFT.

When reading the position of a pointer above a scale, which viewing position reduces parallax error?

A. View along a line perpendicular to the scale through the pointer.  
B. View from the left end of the scale.  
C. Increase the angle between the viewing line and the scale normal.  
D. View from the right end of the scale.

**Correct answer:** A — View along a line perpendicular to the scale through the pointer.

**Explanation:**

1. A pointer separated from a scale can appear shifted when viewed obliquely.
2. Viewing normally through the pointer aligns it with its scale mark.
3. Changing the side of an oblique view changes the apparent reading rather than removing parallax.

**Validation findings:** Geometrical line-of-sight check; no numerical substitution clone. No known unresolved answer-key/unit error in author checks; this is not independent academic approval.

**Changes:** Rewritten to replace repetitive recall or under-level solving; supplied ID and difficulty preserved. Balanced option order with answer identity retained.

**Remaining concerns:** Confirm syllabus fit, difficulty, distractors and wording independently.

- [ ] Independent recalculation and full explanation approved.
- [ ] Every distractor is plausible and unambiguously incorrect under the stated assumptions.
- [ ] Difficulty, syllabus/prerequisites, originality and absence of a repeated task approved.
- [ ] Reviewer name/date and owner approval recorded before status changes.

### phy11-units-dimensions-easy-005

**Difficulty:** easy (provisional). **Topic:** Independent random errors. **Status:** DRAFT.

Independent readings have identical finite variance and zero-mean random errors. What happens to the random uncertainty of their arithmetic mean as more readings are taken?

A. It increases in direct proportion to the number of readings.  
B. It necessarily becomes exactly zero after ten readings.  
C. It removes every fixed calibration bias.  
D. It decreases; a fixed calibration bias would not be removed by averaging.

**Correct answer:** D — It decreases; a fixed calibration bias would not be removed by averaging.

**Explanation:**

1. Independent zero-mean fluctuations partly cancel in a mean.
2. For identical independent variances, the standard uncertainty of the mean scales as 1/sqrt(N).
3. A bias shared by all readings remains shared by the mean.

**Validation findings:** Variance of a mean is sigma^2/N under the stated independence assumptions. No known unresolved answer-key/unit error in author checks; this is not independent academic approval.

**Changes:** Rewritten to replace repetitive recall or under-level solving; supplied ID and difficulty preserved. Balanced option order with answer identity retained.

**Remaining concerns:** Confirm syllabus fit, difficulty, distractors and wording independently.

- [ ] Independent recalculation and full explanation approved.
- [ ] Every distractor is plausible and unambiguously incorrect under the stated assumptions.
- [ ] Difficulty, syllabus/prerequisites, originality and absence of a repeated task approved.
- [ ] Reviewer name/date and owner approval recorded before status changes.

### phy11-units-dimensions-easy-006

**Difficulty:** easy (provisional). **Topic:** Unambiguous significant-figure notation. **Status:** DRAFT.

Which notation states a length of 1500 m with exactly three significant figures?

A. 1.50 × 10^3 m  
B. 1.500 × 10^3 m  
C. 1.5000 × 10^3 m  
D. 1.5 × 10^3 m

**Correct answer:** A — 1.50 × 10^3 m

**Explanation:**

1. In scientific notation, count the significant digits in the coefficient.
2. The coefficient 1.50 has three significant figures.
3. The power of ten sets magnitude and does not change that count.

**Validation findings:** Coefficient digits counted independently; no ambiguous bare integer. No known unresolved answer-key/unit error in author checks; this is not independent academic approval.

**Changes:** Rewritten to replace repetitive recall or under-level solving; supplied ID and difficulty preserved. Balanced option order with answer identity retained.

**Remaining concerns:** Confirm syllabus fit, difficulty, distractors and wording independently.

- [ ] Independent recalculation and full explanation approved.
- [ ] Every distractor is plausible and unambiguously incorrect under the stated assumptions.
- [ ] Difficulty, syllabus/prerequisites, originality and absence of a repeated task approved.
- [ ] Reviewer name/date and owner approval recorded before status changes.

### phy11-units-dimensions-easy-007

**Difficulty:** easy (provisional). **Topic:** Cancellation of a constant balance offset. **Status:** DRAFT.

A balance adds the same unknown constant offset to every reading. It indicates 120.4 g for a container with a sample and 20.4 g for the empty container. Ignoring random error, what sample mass follows from these readings?

A. 99.5 g  
B. 100.0 g  
C. 140.8 g  
D. 120.4 g

**Correct answer:** B — 100.0 g

**Explanation:**

1. Write the two readings as container + sample + offset and container + offset.
2. Subtract the readings; the container and common offset cancel.
3. The sample mass is 120.4 - 20.4 = 100.0 g.

**Validation findings:** Subtraction of two equations eliminates the shared additive nuisance parameter. No known unresolved answer-key/unit error in author checks; this is not independent academic approval.

**Changes:** Rewritten to replace repetitive recall or under-level solving; supplied ID and difficulty preserved. Balanced option order with answer identity retained.

**Remaining concerns:** Confirm syllabus fit, difficulty, distractors and wording independently.

- [ ] Independent recalculation and full explanation approved.
- [ ] Every distractor is plausible and unambiguously incorrect under the stated assumptions.
- [ ] Difficulty, syllabus/prerequisites, originality and absence of a repeated task approved.
- [ ] Reviewer name/date and owner approval recorded before status changes.

### phy11-units-dimensions-easy-008

**Difficulty:** easy (provisional). **Topic:** Units of absolute and relative uncertainty. **Status:** DRAFT.

A distance is recorded in millimetres. Which statement about its uncertainties is correct?

A. Absolute uncertainty is dimensionless; relative uncertainty has units of mm.  
B. Absolute uncertainty has units of mm; relative uncertainty is dimensionless.  
C. Both uncertainties have units of mm^2.  
D. Both absolute and relative uncertainty must have units of mm.

**Correct answer:** B — Absolute uncertainty has units of mm; relative uncertainty is dimensionless.

**Explanation:**

1. Absolute uncertainty is a possible change in the distance, so it has the same unit.
2. Relative uncertainty is absolute uncertainty divided by the distance.
3. The equal length units cancel in that ratio.

**Validation findings:** Dimensional check on a difference and a ratio. No known unresolved answer-key/unit error in author checks; this is not independent academic approval.

**Changes:** Rewritten to replace repetitive recall or under-level solving; supplied ID and difficulty preserved. Balanced option order with answer identity retained.

**Remaining concerns:** Confirm syllabus fit, difficulty, distractors and wording independently.

- [ ] Independent recalculation and full explanation approved.
- [ ] Every distractor is plausible and unambiguously incorrect under the stated assumptions.
- [ ] Difficulty, syllabus/prerequisites, originality and absence of a repeated task approved.
- [ ] Reviewer name/date and owner approval recorded before status changes.

### phy11-units-dimensions-easy-009

**Difficulty:** easy (provisional). **Topic:** Rounding with a carry. **Status:** DRAFT.

Round the measured value 0.9996 m to three significant figures.

A. 0.999 m  
B. 1.000 m  
C. 1 m  
D. 1.00 m

**Correct answer:** D — 1.00 m

**Explanation:**

1. The first three significant digits are 9, 9 and 9.
2. The next digit is 6, so rounding carries into the units place.
3. Write 1.00 m to retain exactly three significant figures after the carry.

**Validation findings:** Decimal rounding and retained trailing zeros checked. No known unresolved answer-key/unit error in author checks; this is not independent academic approval.

**Changes:** Rewritten to replace repetitive recall or under-level solving; supplied ID and difficulty preserved. Balanced option order with answer identity retained.

**Remaining concerns:** Confirm syllabus fit, difficulty, distractors and wording independently.

- [ ] Independent recalculation and full explanation approved.
- [ ] Every distractor is plausible and unambiguously incorrect under the stated assumptions.
- [ ] Difficulty, syllabus/prerequisites, originality and absence of a repeated task approved.
- [ ] Reviewer name/date and owner approval recorded before status changes.

### phy11-units-dimensions-easy-010

**Difficulty:** easy (provisional). **Topic:** Dimensions of area. **Status:** DRAFT.

A rectangle has length l and breadth b. What is the dimensional formula of its area lb?

A. [L^3]  
B. [M L^2]  
C. [L^2]  
D. [L]

**Correct answer:** C — [L^2]

**Explanation:**

1. Both l and b have dimensions L.
2. Multiplying gives L × L = L^2.
3. No mass or time factor is introduced.

**Validation findings:** Product of two independent length dimensions. No known unresolved answer-key/unit error in author checks; this is not independent academic approval.

**Changes:** Retained area-dimension concept, clarified rectangular-area wording, expanded explanation and balanced options.

**Remaining concerns:** Confirm syllabus fit, difficulty, distractors and wording independently.

- [ ] Independent recalculation and full explanation approved.
- [ ] Every distractor is plausible and unambiguously incorrect under the stated assumptions.
- [ ] Difficulty, syllabus/prerequisites, originality and absence of a repeated task approved.
- [ ] Reviewer name/date and owner approval recorded before status changes.

### phy11-units-dimensions-hard-001

**Difficulty:** hard (provisional). **Topic:** Dimensional completeness with an amplitude. **Status:** DRAFT.

An oscillation period T depends only on mass m, gravity g, length L and a displacement amplitude A. All are positive. Without assuming amplitude independence, which is the most general form justified by dimensions? Φ denotes an arbitrary dimensionless function of a dimensionless argument.

A. T = (L/g) Φ(A/L)  
B. T = C sqrt(L/g), with C forced to be amplitude-independent  
C. T = sqrt(L/g) Φ(A)  
D. T = sqrt(L/g) Φ(A/L)

**Correct answer:** D — T = sqrt(L/g) Φ(A/L)

**Explanation:**

1. Mass has no other mass-bearing input, so a period cannot acquire a nonzero power of m.
2. L and g provide a time scale sqrt(L/g). A and L also provide the dimensionless ratio A/L.
3. The period divided by that time scale can be an arbitrary function of A/L.
4. Dimensional analysis cannot force this function to be constant or determine it.

**Validation findings:** Independent exponent balance plus identification of the remaining dimensionless degree of freedom. No known unresolved answer-key/unit error in author checks; this is not independent academic approval.

**Changes:** Rewritten to replace repetitive recall or under-level solving; supplied ID and difficulty preserved. Balanced option order with answer identity retained.

**Remaining concerns:** Amplitude functions and limits of dimensional inference are enrichment material; confirm intended Hard scope.

- [ ] Independent recalculation and full explanation approved.
- [ ] Every distractor is plausible and unambiguously incorrect under the stated assumptions.
- [ ] Difficulty, syllabus/prerequisites, originality and absence of a repeated task approved.
- [ ] Reviewer name/date and owner approval recorded before status changes.

### phy11-units-dimensions-hard-002

**Difficulty:** hard (provisional). **Topic:** An underdetermined capillary model. **Status:** DRAFT.

A length h depends only on positive surface tension S, density ρ, acceleration magnitude g and tube radius r. Use [S]=M T^-2 and [ρ]=M L^-3. Which expression is the most general dimensionally permitted form, with Φ arbitrary and dimensionless?

A. h = r Φ(S/(ρ g r))  
B. h = (1/r) Φ(S/(ρ g r^2))  
C. h = r Φ(S/(ρ g r^2))  
D. h = r Φ(S ρ/(g r^2))

**Correct answer:** C — h = r Φ(S/(ρ g r^2))

**Explanation:**

1. The product ρ g r^2 has dimensions M T^-2, the same as S.
2. Thus S/(ρ g r^2) and h/r are dimensionless.
3. Dimensional completeness permits h/r to be an unspecified function of that input group.
4. A specific inverse-radius capillary law requires physical input beyond dimensions alone.

**Validation findings:** Dimensional rank and both dimensionless groups checked; distractors fail either output scale or argument units. No known unresolved answer-key/unit error in author checks; this is not independent academic approval.

**Changes:** Rewritten to replace repetitive recall or under-level solving; supplied ID and difficulty preserved. Balanced option order with answer identity retained.

**Remaining concerns:** Qualified review of difficulty, syllabus/prerequisites, all options and derivation remains required.

- [ ] Independent recalculation and full explanation approved.
- [ ] Every distractor is plausible and unambiguously incorrect under the stated assumptions.
- [ ] Difficulty, syllabus/prerequisites, originality and absence of a repeated task approved.
- [ ] Reviewer name/date and owner approval recorded before status changes.

### phy11-units-dimensions-hard-003

**Difficulty:** hard (provisional). **Topic:** Local drag-law exponents. **Status:** DRAFT.

Over a comparison range, drag is modeled by F=C ρ^a η^b v^c r^d with positive inputs and unchanged dimensionless C. Density is ρ, dynamic viscosity η, speed v and radius r. Experiments give c=7/5. In a second comparison r doubles, v is fixed, ρr^3 stays constant, and η/ρ^(2/3) stays constant. Find (a,b,d) and F2/F1.

A. (2/5, 3/5, 7/5); F2/F1=1/2  
B. (2/5, 3/5, 7/5); F2/F1=2  
C. (3/5, 2/5, 7/5); F2/F1=1/2  
D. (2/5, 3/5, 7/5); F2/F1=2^(7/5)

**Correct answer:** A — (2/5, 3/5, 7/5); F2/F1=1/2

**Explanation:**

1. Use [ρ]=M L^-3, [η]=M L^-1 T^-1, [v]=L T^-1 and [r]=L. Mass gives a+b=1 and time gives b+c=2.
2. With c=7/5, b=3/5 and a=2/5. Length then gives d=7/5.
3. The comparison constraints give ρ2/ρ1=2^-3 and η2/η1=(2^-3)^(2/3)=2^-2.
4. Thus F2/F1=(2^-3)^(2/5)(2^-2)^(3/5)2^(7/5)=2^-1=1/2.
5. The density-viscosity relation and fixed ρr^3 are supplied comparison constraints, not universal fluid laws.

**Validation findings:** Three exponent equations solved, then two coupled comparison constraints substituted into the full force monomial; all candidate pairs checked. No known unresolved answer-key/unit error in author checks; this is not independent academic approval.

**Changes:** Rewritten to replace repetitive recall or under-level solving; supplied ID and difficulty preserved. Balanced option order with answer identity retained.

**Remaining concerns:** Qualified review of difficulty, syllabus/prerequisites, all options and derivation remains required.

- [ ] Independent recalculation and full explanation approved.
- [ ] Every distractor is plausible and unambiguously incorrect under the stated assumptions.
- [ ] Difficulty, syllabus/prerequisites, originality and absence of a repeated task approved.
- [ ] Reviewer name/date and owner approval recorded before status changes.

### phy11-units-dimensions-hard-004

**Difficulty:** hard (provisional). **Topic:** A natural time scale and a second-order change. **Status:** DRAFT.

A time scale is a monomial in G, action h and speed c, where [G]=M^-1 L^3 T^-2 and [h]=M L^2 T^-1. G changes to G(1+ε), h to h(1-ε), and c stays fixed, with |ε| much smaller than 1. Which pair gives the time scale and its leading nonzero fractional change?

A. sqrt(G h/c^5); change = +ε^2/2  
B. G h/c^5; change = -ε^2  
C. sqrt(G h/c^5); change = -ε^2/2  
D. sqrt(G h/c^3); change = -ε^2/2

**Correct answer:** C — sqrt(G h/c^5); change = -ε^2/2

**Explanation:**

1. Write τ∝G^a h^b c^d. Mass gives b=a, time gives a=1/2, and length gives d=-5/2.
2. Thus τ∝sqrt(Gh/c^5).
3. The exact ratio after the changes is sqrt((1+ε)(1-ε))=sqrt(1-ε^2).
4. Expanding gives 1-ε^2/2+O(ε^4). First-order cancellation does not imply no change.

**Validation findings:** Monomial dimensions independently solved; binomial-series leading term checked numerically and algebraically. No known unresolved answer-key/unit error in author checks; this is not independent academic approval.

**Changes:** Rewritten to replace repetitive recall or under-level solving; supplied ID and difficulty preserved. Balanced option order with answer identity retained.

**Remaining concerns:** Second-order perturbation expansion is enrichment; ε denotes a shared signed change, not independent uncertainty bounds.

- [ ] Independent recalculation and full explanation approved.
- [ ] Every distractor is plausible and unambiguously incorrect under the stated assumptions.
- [ ] Difficulty, syllabus/prerequisites, originality and absence of a repeated task approved.
- [ ] Reviewer name/date and owner approval recorded before status changes.

### phy11-units-dimensions-hard-005

**Difficulty:** hard (provisional). **Topic:** Units based on derived quantities. **Status:** DRAFT.

Take force, density and speed as independent unit-defining quantities, with new units 8 N, 2 kg/m^3 and 4 m/s respectively. By expressing energy as a monomial in these quantities, find the numerical value of 12 J in the new energy unit.

A. 1.5  
B. 3  
C. 48  
D. 6

**Correct answer:** B — 3

**Explanation:**

1. Set [E]=[F]^a[ρ]^b[v]^c. Solving mass, length and time gives a=3/2, b=-1/2 and c=-1.
2. One new energy unit is (8 N)^(3/2)(2 kg/m^3)^(-1/2)(4 m/s)^(-1).
3. Its SI value is sqrt(8^3)/(sqrt(2)×4)=4 J.
4. The numerical value of 12 J is therefore 12/4=3.

**Validation findings:** Nonstandard dimensional basis inverted and resulting unit dimensions checked before conversion. No known unresolved answer-key/unit error in author checks; this is not independent academic approval.

**Changes:** Rewritten to replace repetitive recall or under-level solving; supplied ID and difficulty preserved. Balanced option order with answer identity retained.

**Remaining concerns:** Qualified review of difficulty, syllabus/prerequisites, all options and derivation remains required.

- [ ] Independent recalculation and full explanation approved.
- [ ] Every distractor is plausible and unambiguously incorrect under the stated assumptions.
- [ ] Difficulty, syllabus/prerequisites, originality and absence of a repeated task approved.
- [ ] Reviewer name/date and owner approval recorded before status changes.

### phy11-units-dimensions-hard-006

**Difficulty:** hard (provisional). **Topic:** Rank failure in a proposed unit system. **Status:** DRAFT.

A proposed system uses positive energy E, nonzero momentum magnitude p and positive mass m as three independent base quantities. Can these define separate length and time units, and which group demonstrates the issue?

A. Yes; E m/p^2 is dimensionless but all three remain dimensionally independent.  
B. No; E/(m p^2) is dimensionless.  
C. Yes; E, p and m allow a pure time monomial.  
D. No; E m/p^2 is dimensionless, and all three quantities depend on L and T only through L/T.

**Correct answer:** D — No; E m/p^2 is dimensionless, and all three quantities depend on L and T only through L/T.

**Explanation:**

1. The vectors are [E]=M L^2 T^-2, [p]=M L T^-1 and [m]=M.
2. Their L and T rows are negatives, so the dimension matrix has rank 2, not 3.
3. Indeed E m/p^2 is dimensionless.
4. A monomial in these quantities cannot contain T without the opposite power of L, so separate length and time units cannot be obtained.

**Validation findings:** Rank computed independently and impossibility of a pure time monomial proved. No known unresolved answer-key/unit error in author checks; this is not independent academic approval.

**Changes:** Rewritten to replace repetitive recall or under-level solving; supplied ID and difficulty preserved. Balanced option order with answer identity retained.

**Remaining concerns:** Qualified review of difficulty, syllabus/prerequisites, all options and derivation remains required.

- [ ] Independent recalculation and full explanation approved.
- [ ] Every distractor is plausible and unambiguously incorrect under the stated assumptions.
- [ ] Difficulty, syllabus/prerequisites, originality and absence of a repeated task approved.
- [ ] Reviewer name/date and owner approval recorded before status changes.

### phy11-units-dimensions-hard-007

**Difficulty:** hard (provisional). **Topic:** A ratio with shared measured inputs. **Status:** DRAFT.

Let R=(x-y)/(x+y), with x=(10.0±0.1) cm and y=(8.0±0.1) cm. Their errors have independent bounded signs. Find the first-order worst-case absolute uncertainty in R by propagating the primitive x and y readings, not treating numerator and denominator as independent.

A. 1/180  
B. 1/9  
C. 1/90  
D. 1/81

**Correct answer:** C — 1/90

**Explanation:**

1. The central value is R=2/18=1/9.
2. Partial derivatives are ∂R/∂x=2y/(x+y)^2 and ∂R/∂y=-2x/(x+y)^2.
3. The absolute first-order bound is (16×0.1+20×0.1)/18^2=3.6/324=1/90.
4. Numerator and denominator contain the same readings; treating them as independent derived measurements double-counts some error possibilities.

**Validation findings:** Primitive-input derivatives checked by finite differences and corner evaluation. No known unresolved answer-key/unit error in author checks; this is not independent academic approval.

**Changes:** Rewritten to replace repetitive recall or under-level solving; supplied ID and difficulty preserved. Balanced option order with answer identity retained.

**Remaining concerns:** Qualified review of difficulty, syllabus/prerequisites, all options and derivation remains required.

- [ ] Independent recalculation and full explanation approved.
- [ ] Every distractor is plausible and unambiguously incorrect under the stated assumptions.
- [ ] Difficulty, syllabus/prerequisites, originality and absence of a repeated task approved.
- [ ] Reviewer name/date and owner approval recorded before status changes.

### phy11-units-dimensions-hard-008

**Difficulty:** hard (provisional). **Topic:** Uncertainty amplified by hollow geometry. **Status:** DRAFT.

A hollow sphere has density ρ=3m/[4π(R^3-r^3)], with R=(10.000±0.001) cm and r=(9.900±0.001) cm. Mass has a 1.0% maximum relative uncertainty. Radius and mass errors have independent bounded signs. What is the first-order worst-case percentage uncertainty in ρ, rounded to two decimal places?

A. 2.00%  
B. 4.00%  
C. 1.06%  
D. 3.00%

**Correct answer:** D — 3.00%

**Explanation:**

1. For V proportional to R^3-r^3, the absolute differential bound is proportional to 3(R^2δR+r^2δr).
2. The relative volume bound is 3(10^2×0.001+9.9^2×0.001)/(10^3-9.9^3)=0.02000034... .
3. Add the 0.010 mass bound because density divides by volume.
4. The total is 3.0000337...%, reported as 3.00%. The thin difference amplifies the radius errors.

**Validation findings:** Analytical partial derivatives and numerical first-order propagation checked; not an exact finite-bound claim. No known unresolved answer-key/unit error in author checks; this is not independent academic approval.

**Changes:** Rewritten to replace repetitive recall or under-level solving; supplied ID and difficulty preserved. Balanced option order with answer identity retained.

**Remaining concerns:** Qualified review of difficulty, syllabus/prerequisites, all options and derivation remains required.

- [ ] Independent recalculation and full explanation approved.
- [ ] Every distractor is plausible and unambiguously incorrect under the stated assumptions.
- [ ] Difficulty, syllabus/prerequisites, originality and absence of a repeated task approved.
- [ ] Reviewer name/date and owner approval recorded before status changes.

### phy11-units-dimensions-hard-009

**Difficulty:** hard (provisional). **Topic:** Inferring acceleration before propagating uncertainty. **Status:** DRAFT.

A trajectory is x(t)=u t+(a/2)t^2 with unknown u and a. At times t and 2t, displacements are x1=(5.00±0.02) m and x2=(22.00±0.02) m. The common time scale is t=(1.000±0.005) s. Treat x1,x2,t as independently bounded primitive inputs. What is the first-order estimate a±δa?

A. (17.00±0.23) m/s^2  
B. (12.00±0.30) m/s^2  
C. (12.00±0.18) m/s^2  
D. (12.00±0.06) m/s^2

**Correct answer:** C — (12.00±0.18) m/s^2

**Explanation:**

1. Eliminate u: x2-2x1=a t^2, so a=(x2-2x1)/t^2.
2. The central acceleration is (22-10)/1^2=12 m/s^2.
3. Sensitivity magnitudes give δa=(δx2+2δx1)/t^2+2|a|δt/t.
4. This is 0.02+0.04+2×12×0.005=0.18 m/s^2. The two observation times share the same t error.

**Validation findings:** Elimination, dimensions and primitive-input derivatives independently checked. No known unresolved answer-key/unit error in author checks; this is not independent academic approval.

**Changes:** Rewritten to replace repetitive recall or under-level solving; supplied ID and difficulty preserved. Balanced option order with answer identity retained.

**Remaining concerns:** Qualified review of difficulty, syllabus/prerequisites, all options and derivation remains required.

- [ ] Independent recalculation and full explanation approved.
- [ ] Every distractor is plausible and unambiguously incorrect under the stated assumptions.
- [ ] Difficulty, syllabus/prerequisites, originality and absence of a repeated task approved.
- [ ] Reviewer name/date and owner approval recorded before status changes.

### phy11-units-dimensions-hard-010

**Difficulty:** hard (provisional). **Topic:** Allocating measurement time. **Status:** DRAFT.

For Q=x^2/y, independent bounded errors have percentage bounds 4/sqrt(tx/1 s)% in x and 1/sqrt(ty/1 s)% in y. Total measurement time is tx+ty=100 s with tx,ty>0. Which allocation minimizes the first-order worst-case percentage bound in Q?

A. tx=80 s, ty=20 s; minimum about 1.118%  
B. tx=50 s, ty=50 s; minimum about 1.273%  
C. tx=90 s, ty=10 s; minimum about 1.160%  
D. tx=20 s, ty=80 s; minimum about 1.901%

**Correct answer:** A — tx=80 s, ty=20 s; minimum about 1.118%

**Explanation:**

1. The objective is U=8/sqrt(tx)+1/sqrt(ty), with numerical times expressed in seconds.
2. Using ty=100-tx, stationarity gives 8/tx^(3/2)=1/ty^(3/2).
3. Thus tx/ty=8^(2/3)=4, hence tx=80 s and ty=20 s.
4. The positive second derivative and divergent endpoint errors ensure a minimum. U=8/sqrt(80)+1/sqrt(20)=1.1180339...%.

**Validation findings:** Constrained optimization, curvature and endpoint limits checked; bound/time model explicitly supplied. No known unresolved answer-key/unit error in author checks; this is not independent academic approval.

**Changes:** Rewritten to replace repetitive recall or under-level solving; supplied ID and difficulty preserved. Balanced option order with answer identity retained.

**Remaining concerns:** Qualified review of difficulty, syllabus/prerequisites, all options and derivation remains required.

- [ ] Independent recalculation and full explanation approved.
- [ ] Every distractor is plausible and unambiguously incorrect under the stated assumptions.
- [ ] Difficulty, syllabus/prerequisites, originality and absence of a repeated task approved.
- [ ] Reviewer name/date and owner approval recorded before status changes.

### phy11-units-dimensions-hard-011

**Difficulty:** hard (provisional). **Topic:** Shared diameter in an elastic-wave inference. **Status:** DRAFT.

A wire is assigned Y=4FL/(πd^2 ΔL) and ρ=4m/(πd^2 L), using the SAME measured diameter d in both. Wave speed is v=sqrt(Y/ρ). Independent primitive maximum percentage uncertainties are F:1%, L:0.5%, m:1%, ΔL:2%, d:3%. What is the first-order maximum percentage uncertainty in v?

A. 5.0%  
B. 8.5%  
C. 3.5%  
D. 2.5%

**Correct answer:** D — 2.5%

**Explanation:**

1. Take the ratio before propagating: Y/ρ=F L^2/(m ΔL). The common d cancels exactly.
2. Hence v=L sqrt(F/(m ΔL)).
3. The relative bound is δL/L+(1/2)(δF/F+δm/m+δΔL/ΔL).
4. Substituting gives 0.5%+(1/2)(1%+1%+2%)=2.5%. Counting diameter twice would be incorrect.

**Validation findings:** Algebraic common-input cancellation and sensitivity exponents independently checked. No known unresolved answer-key/unit error in author checks; this is not independent academic approval.

**Changes:** Rewritten to replace repetitive recall or under-level solving; supplied ID and difficulty preserved. Balanced option order with answer identity retained.

**Remaining concerns:** Qualified review of difficulty, syllabus/prerequisites, all options and derivation remains required.

- [ ] Independent recalculation and full explanation approved.
- [ ] Every distractor is plausible and unambiguously incorrect under the stated assumptions.
- [ ] Difficulty, syllabus/prerequisites, originality and absence of a repeated task approved.
- [ ] Reviewer name/date and owner approval recorded before status changes.

### phy11-units-dimensions-hard-012

**Difficulty:** hard (provisional). **Topic:** Exact finite bounds through a square root. **Status:** DRAFT.

Kinetic speed is inferred from v=sqrt[2(E2-E1)/m]. Independently bounded readings are E2=(10.0±0.1) J and E1=(9.0±0.1) J; m=0.50 kg is exact. Relative to the central speed, which side allows the larger percentage deviation using exact finite bounds rather than linearisation, and what is it to two decimal places?

A. About 10.56%, on the lower-speed side.  
B. About 9.54%, on the lower-speed side.  
C. Exactly 10.00%, symmetrically on both sides.  
D. About 20.00%, on the higher-speed side.

**Correct answer:** A — About 10.56%, on the lower-speed side.

**Explanation:**

1. The energy difference has central value 1 J and exact interval [0.8,1.2] J.
2. The central speed is 2 m/s, with limiting ratios sqrt(0.8) and sqrt(1.2).
3. The lower deviation is 1-sqrt(0.8)=0.1055728...; the upper is sqrt(1.2)-1=0.0954451... .
4. The larger deviation is therefore 10.56% on the lower side. A first-order 10% estimate is not the exact answer.

**Validation findings:** Monotone interval propagation checked at all energy endpoints; exact versus first-order distinction explicit. No known unresolved answer-key/unit error in author checks; this is not independent academic approval.

**Changes:** Rewritten to replace repetitive recall or under-level solving; supplied ID and difficulty preserved. Balanced option order with answer identity retained.

**Remaining concerns:** Qualified review of difficulty, syllabus/prerequisites, all options and derivation remains required.

- [ ] Independent recalculation and full explanation approved.
- [ ] Every distractor is plausible and unambiguously incorrect under the stated assumptions.
- [ ] Difficulty, syllabus/prerequisites, originality and absence of a repeated task approved.
- [ ] Reviewer name/date and owner approval recorded before status changes.

### phy11-units-dimensions-hard-013

**Difficulty:** hard (provisional). **Topic:** Common zero error in a hollow cylinder. **Status:** DRAFT.

A hollow cylindrical section has V=πh(R^2-r^2), with h exact. Both radii are measured by one instrument that adds the SAME unknown zero offset δ. Use R=10 mm, r=9 mm and |δ|≤0.02 mm. What is the maximum relative percentage shift in the computed V from this common offset?

A. About 2.00%  
B. About 0.211%  
C. Exactly 0%  
D. About 4.01%

**Correct answer:** B — About 0.211%

**Explanation:**

1. The measured squared-radius difference is (R+δ)^2-(r+δ)^2.
2. Its δ^2 terms cancel, leaving (R^2-r^2)+2δ(R-r).
3. The relative shift is exactly 2δ/(R+r), since h and π cancel.
4. Its maximum magnitude is 2(0.02)/19=0.00210526..., or about 0.211%. Independent radius-error propagation is inapplicable to this common offset.

**Validation findings:** Common-offset expression expanded exactly; worst endpoints agree with the formula. No known unresolved answer-key/unit error in author checks; this is not independent academic approval.

**Changes:** Rewritten to replace repetitive recall or under-level solving; supplied ID and difficulty preserved. Balanced option order with answer identity retained.

**Remaining concerns:** Qualified review of difficulty, syllabus/prerequisites, all options and derivation remains required.

- [ ] Independent recalculation and full explanation approved.
- [ ] Every distractor is plausible and unambiguously incorrect under the stated assumptions.
- [ ] Difficulty, syllabus/prerequisites, originality and absence of a repeated task approved.
- [ ] Reviewer name/date and owner approval recorded before status changes.

### phy11-units-dimensions-hard-014

**Difficulty:** hard (provisional). **Topic:** A logarithm, a fractional power and a change of time unit. **Status:** DRAFT.

A length obeys x=A ln(1+B t)+C sqrt(t), with A,B,C nonzero, on a domain with t>0 and 1+B t>0. Keep length units fixed but change the numerical time unit from seconds to milliseconds, so t_ms=1000 t_s. Which transformation and invariant are correct?

A. B_ms=1000 B_s; C_ms=sqrt(1000) C_s; C^2/(A^2 B) is invariant.  
B. B_ms=B_s/1000; C_ms=C_s/sqrt(1000); C^2/(A^2 B) is dimensionless and invariant.  
C. B_ms=B_s/1000; C_ms=C_s/1000; C/(A B) is dimensionless.  
D. B_ms=B_s; C_ms=C_s/sqrt(1000); C^2/(A B) is dimensionless.

**Correct answer:** B — B_ms=B_s/1000; C_ms=C_s/sqrt(1000); C^2/(A^2 B) is dimensionless and invariant.

**Explanation:**

1. The logarithm requires [B]=T^-1; its coefficient has [A]=L.
2. The square-root term requires [C]=L T^-1/2. Thus C^2/(A^2 B) is dimensionless.
3. Keeping B t fixed under t_ms=1000t_s gives B_ms=B_s/1000.
4. Keeping C sqrt(t) fixed gives C_ms=C_s/sqrt(1000). The same factors cancel in the invariant.

**Validation findings:** Coefficient dimensions, numerical-unit substitution and invariant checked separately. No known unresolved answer-key/unit error in author checks; this is not independent academic approval.

**Changes:** Rewritten to replace repetitive recall or under-level solving; supplied ID and difficulty preserved. Balanced option order with answer identity retained.

**Remaining concerns:** Qualified review of difficulty, syllabus/prerequisites, all options and derivation remains required.

- [ ] Independent recalculation and full explanation approved.
- [ ] Every distractor is plausible and unambiguously incorrect under the stated assumptions.
- [ ] Difficulty, syllabus/prerequisites, originality and absence of a repeated task approved.
- [ ] Reviewer name/date and owner approval recorded before status changes.

### phy11-units-dimensions-hard-015

**Difficulty:** hard (provisional). **Topic:** A time scale involving electric charge. **Status:** DRAFT.

In a model, Coulomb force is F=q^2/(4πε r^2), defining ε; q is a positive charge magnitude and all scale parameters are positive. A characteristic time is a monomial in ε, mass m, length r and charge q, with no further dimensional inputs. In a comparison m is multiplied by 8, r by 1/2 and q by 2; ε is unchanged. What time-scale ratio follows?

A. 1  
B. 1/2  
C. 1/4  
D. 2

**Correct answer:** B — 1/2

**Explanation:**

1. From the force law [ε]=[q]^2/([F]L^2), using [q]=I T.
2. A time scale is proportional to sqrt(ε m r^3/q^2); its square has dimensions T^2.
3. The ratio is sqrt(8×(1/2)^3/2^2)=sqrt(1/4)=1/2.
4. The dimensionless proportionality factor is assumed unchanged; no physical oscillation law is asserted.

**Validation findings:** Four-variable dimensional solution and combined parameter ratio checked. No known unresolved answer-key/unit error in author checks; this is not independent academic approval.

**Changes:** Rewritten to replace repetitive recall or under-level solving; supplied ID and difficulty preserved. Balanced option order with answer identity retained.

**Remaining concerns:** All electrical relations are supplied; qualified reviewer must approve prerequisite and chapter fit.

- [ ] Independent recalculation and full explanation approved.
- [ ] Every distractor is plausible and unambiguously incorrect under the stated assumptions.
- [ ] Difficulty, syllabus/prerequisites, originality and absence of a repeated task approved.
- [ ] Reviewer name/date and owner approval recorded before status changes.

### phy11-units-dimensions-hard-016

**Difficulty:** hard (provisional). **Topic:** General frequency law with four dimensional inputs. **Status:** DRAFT.

A frequency f depends only on a positive energy E, G, action h and speed c. Use [G]=M^-1L^3T^-2 and [h]=ML^2T^-1. Which is a dimensionally complete general form? Φ is arbitrary and takes a dimensionless argument.

A. f=(E/h) Φ(G E^2/(h c^5))  
B. f=(E/h) Φ(G E^2/(h c^3))  
C. f=(E/h) Φ(G E/(h c^5))  
D. f=(h/E) Φ(G E^2/(h c^5))

**Correct answer:** A — f=(E/h) Φ(G E^2/(h c^5))

**Explanation:**

1. E/h supplies a frequency scale.
2. G E^2 and h c^5 both have dimensions M L^7 T^-6.
3. Their ratio is dimensionless; with four dimensional inputs of rank 3, one independent input group remains.
4. Thus f h/E can be an unspecified function of G E^2/(h c^5). Dimensions alone do not determine Φ.

**Validation findings:** Input rank, output scale and every candidate function argument checked. No known unresolved answer-key/unit error in author checks; this is not independent academic approval.

**Changes:** Rewritten to replace repetitive recall or under-level solving; supplied ID and difficulty preserved. Balanced option order with answer identity retained.

**Remaining concerns:** Qualified review of difficulty, syllabus/prerequisites, all options and derivation remains required.

- [ ] Independent recalculation and full explanation approved.
- [ ] Every distractor is plausible and unambiguously incorrect under the stated assumptions.
- [ ] Difficulty, syllabus/prerequisites, originality and absence of a repeated task approved.
- [ ] Reviewer name/date and owner approval recorded before status changes.

### phy11-units-dimensions-hard-017

**Difficulty:** hard (provisional). **Topic:** Reconstructing dimensions from nonorthogonal unit changes. **Status:** DRAFT.

A nonzero quantity Q has unknown dimensions M^a L^b T^c. Relative to original units, new base-unit size factors (M,L,T) and numerical-value ratios Q_new/Q_old are: (2,2,1):1/8; (1,2,2):1; (2,1,2):2. What are its dimensions and its numerical-value ratio for factors (3,1/2,2)?

A. [M^2 L T^-1]; ratio 2/9  
B. [M L^2 T^-2]; ratio 3/16  
C. [M L^2 T^-2]; ratio 16/3  
D. [M^-1 L^2 T^-2]; ratio 16/3

**Correct answer:** C — [M L^2 T^-2]; ratio 16/3

**Explanation:**

1. Numerical values scale inversely with the unit size. The three observations imply a+b=3, b+c=0 and a+c=-1.
2. Solving gives a=1, b=2 and c=-2.
3. For the final units the Q-unit size factor is 3×(1/2)^2×2^-2=3/16.
4. The numerical-value ratio is its reciprocal, 16/3.

**Validation findings:** Independent linear system solution and a fourth unit-system prediction checked. No known unresolved answer-key/unit error in author checks; this is not independent academic approval.

**Changes:** Rewritten to replace repetitive recall or under-level solving; supplied ID and difficulty preserved. Balanced option order with answer identity retained.

**Remaining concerns:** Qualified review of difficulty, syllabus/prerequisites, all options and derivation remains required.

- [ ] Independent recalculation and full explanation approved.
- [ ] Every distractor is plausible and unambiguously incorrect under the stated assumptions.
- [ ] Difficulty, syllabus/prerequisites, originality and absence of a repeated task approved.
- [ ] Reviewer name/date and owner approval recorded before status changes.

### phy11-units-dimensions-hard-018

**Difficulty:** hard (provisional). **Topic:** A zero offset hidden in a pendulum calibration. **Status:** DRAFT.

A supplied small-angle model is T^2=4π^2(L+δ)/g. Unknown constant length offset δ and acceleration g apply to both trials. Indicated lengths L1=0.90 m and L2=2.10 m are exact; independent bounded period readings are T1=(2.00±0.01) s and T2=(3.00±0.01) s. Find central (g,δ) and the first-order maximum percentage uncertainty in g.

A. (1.20π^2 m/s^2, 0.30 m); δg/g≈2.0%  
B. (0.96π^2 m/s^2, 0.060 m); δg/g≈1.0%  
C. (0.96π^2 m/s^2, -0.060 m); δg/g≈2.0%  
D. (0.96π^2 m/s^2, 0.060 m); δg/g≈2.0%

**Correct answer:** D — (0.96π^2 m/s^2, 0.060 m); δg/g≈2.0%

**Explanation:**

1. Eliminate δ by subtraction: g=4π^2(L2-L1)/(T2^2-T1^2).
2. Centrally, g=4π^2×1.20/5=0.96π^2 m/s^2.
3. Then δ=T1^2g/(4π^2)-L1=0.96-0.90=0.060 m. Both central model equations are satisfied.
4. Exact indicated lengths leave only the period difference uncertain. First-order propagation gives δg/g≈(2T2δT2+2T1δT1)/(T2^2-T1^2).
5. This is (2×3×0.01+2×2×0.01)/5=0.020, or 2.0%. The formula is a first-order bound, not an exact finite-interval maximum.

**Validation findings:** Two-parameter inverse calibration, back-substitution and primitive-period first-order sensitivity independently checked. No known unresolved answer-key/unit error in author checks; this is not independent academic approval.

**Changes:** Rewritten to replace repetitive recall or under-level solving; supplied ID and difficulty preserved. Balanced option order with answer identity retained.

**Remaining concerns:** Qualified review of difficulty, syllabus/prerequisites, all options and derivation remains required.

- [ ] Independent recalculation and full explanation approved.
- [ ] Every distractor is plausible and unambiguously incorrect under the stated assumptions.
- [ ] Difficulty, syllabus/prerequisites, originality and absence of a repeated task approved.
- [ ] Reviewer name/date and owner approval recorded before status changes.

### phy11-units-dimensions-hard-019

**Difficulty:** hard (provisional). **Topic:** Coupled ruler and clock calibration. **Status:** DRAFT.

A ruler reports length L_read=μL and a clock reports t_read=λt, where μ,λ are constant positive gains. The ruler is then recalibrated by multiplying every reported length by u0/u_read, using an exact speed standard u0 measured with the SAME ruler and clock. An acceleration is inferred as 2L_cal/t_read^2 for motion from rest. If λ=1.02, what is a_inferred/a_true, independent of μ?

A. 50/51  
B. 1.02  
C. 1  
D. 1/(1.02)^2

**Correct answer:** A — 50/51

**Explanation:**

1. The measured speed standard is u_read=(μ/λ)u0.
2. Recalibrated lengths become L_cal=μL×(λ/μ)=λL.
3. The inferred acceleration is 2λL/(λt)^2=a_true/λ.
4. For λ=1.02, the ratio is 1/1.02=50/51; speed calibration has not removed clock gain from an acceleration.

**Validation findings:** Successive calibration maps composed before deriving acceleration; units and μ cancellation checked. No known unresolved answer-key/unit error in author checks; this is not independent academic approval.

**Changes:** Rewritten to replace repetitive recall or under-level solving; supplied ID and difficulty preserved. Balanced option order with answer identity retained.

**Remaining concerns:** Qualified review of difficulty, syllabus/prerequisites, all options and derivation remains required.

- [ ] Independent recalculation and full explanation approved.
- [ ] Every distractor is plausible and unambiguously incorrect under the stated assumptions.
- [ ] Difficulty, syllabus/prerequisites, originality and absence of a repeated task approved.
- [ ] Reviewer name/date and owner approval recorded before status changes.

### phy11-units-dimensions-hard-020

**Difficulty:** hard (provisional). **Topic:** Stable algebra for a thin annular layer. **Status:** DRAFT.

A positive thin annular layer has area A=π[(R+t)^2-R^2], with known positive R. Directly computing t=sqrt(R^2+A/π)-R can lose numerical precision for A/(πR^2) much smaller than 1. Which pair gives an algebraically equivalent stable expression and its leading thin-layer approximation?

A. t=A/[π(sqrt(R^2+A/π)+R)]; t≈A/(2πR)  
B. t=A/[π(sqrt(R^2+A/π)-R)]; t≈A/(2πR)  
C. t=A/[π(sqrt(R^2+A/π)+R)]; t≈sqrt(A/π)  
D. t=A/[2π(sqrt(R^2+A/π)+R)]; t≈A/(2πR)

**Correct answer:** A — t=A/[π(sqrt(R^2+A/π)+R)]; t≈A/(2πR)

**Explanation:**

1. Multiply the original difference by its conjugate over itself.
2. The numerator becomes (R^2+A/π)-R^2=A/π, leaving a sum of positive lengths in the denominator.
3. Thus t=A/[π(sqrt(R^2+A/π)+R)], which avoids subtracting nearly equal values.
4. In the stated thin limit the denominator approaches 2πR, giving t≈A/(2πR); both expressions have length dimensions.

**Validation findings:** Exact rationalization checked algebraically and with small-parameter numeric evaluations; asymptotic limit checked. No known unresolved answer-key/unit error in author checks; this is not independent academic approval.

**Changes:** Rewritten to replace repetitive recall or under-level solving; supplied ID and difficulty preserved. Balanced option order with answer identity retained.

**Remaining concerns:** Qualified review of difficulty, syllabus/prerequisites, all options and derivation remains required.

- [ ] Independent recalculation and full explanation approved.
- [ ] Every distractor is plausible and unambiguously incorrect under the stated assumptions.
- [ ] Difficulty, syllabus/prerequisites, originality and absence of a repeated task approved.
- [ ] Reviewer name/date and owner approval recorded before status changes.

### phy11-units-dimensions-hard-021

**Difficulty:** hard (provisional). **Topic:** Random averaging with a calibration floor. **Status:** DRAFT.

Independent length readings have standard deviation 0.20 cm and share a separate calibration standard uncertainty of 0.040 cm, independent of the random reading noise. The mean length is 10.0 cm. For Q=1/(mean length)^2, what is the smallest number N of readings giving first-order relative STANDARD uncertainty in Q no greater than 1.0%?

A. 100  
B. 16  
C. 40  
D. 45

**Correct answer:** D — 45

**Explanation:**

1. The mean has standard variance u_x^2=(0.20)^2/N+(0.040)^2; the shared calibration term does not average away.
2. For Q=x^-2, relative standard uncertainty is 2u_x/x. The requirement gives u_x≤0.050 cm.
3. Therefore 0.040/N+0.0016≤0.0025, or N≥44.444... .
4. The smallest integer is 45. A bounded-error sum would be a different uncertainty model.

**Validation findings:** Variance model and logarithmic sensitivity independently derived; adjacent integers 44 and 45 checked. No known unresolved answer-key/unit error in author checks; this is not independent academic approval.

**Changes:** Rewritten to replace repetitive recall or under-level solving; supplied ID and difficulty preserved. Balanced option order with answer identity retained.

**Remaining concerns:** Standard-uncertainty/covariance concepts go beyond elementary maximum-error rules; prerequisites need human approval.

- [ ] Independent recalculation and full explanation approved.
- [ ] Every distractor is plausible and unambiguously incorrect under the stated assumptions.
- [ ] Difficulty, syllabus/prerequisites, originality and absence of a repeated task approved.
- [ ] Reviewer name/date and owner approval recorded before status changes.

### phy11-units-dimensions-hard-022

**Difficulty:** hard (provisional). **Topic:** A fitted power and common calibration cancellation. **Status:** DRAFT.

Exact preliminary trials establish Y∝X^n and show Y multiplying by 8 when X doubles; treat the inferred n as exact. A later prediction with positive input values is Y=Y0(X/X0)^n. Independent residual relative STANDARD uncertainties in Y0,X,X0 are 2%,1%,2%. X and X0 also share the same unknown 5% multiplicative calibration error. What is the first-order relative standard uncertainty of the prediction?

A. sqrt(99)%  
B. 5%  
C. 7%  
D. sqrt(274)%

**Correct answer:** C — 7%

**Explanation:**

1. The exact preliminary ratio gives 2^n=8, so n=3.
2. A common multiplicative scale cancels exactly in X/X0 and contributes no separate 5% term.
3. For independent residual errors, squared relative standard uncertainties add with squared sensitivities: 2^2+3^2(1^2+2^2)=49 in percent-squared units.
4. The relative standard uncertainty is sqrt(49)%=7%. The exponent was stipulated exact.

**Validation findings:** Exponent inference, common-mode cancellation and independent residual covariance propagation checked. No known unresolved answer-key/unit error in author checks; this is not independent academic approval.

**Changes:** Rewritten to replace repetitive recall or under-level solving; supplied ID and difficulty preserved. Balanced option order with answer identity retained.

**Remaining concerns:** Reviewer must distinguish preliminary exact model identification from later noisy inputs.

- [ ] Independent recalculation and full explanation approved.
- [ ] Every distractor is plausible and unambiguously incorrect under the stated assumptions.
- [ ] Difficulty, syllabus/prerequisites, originality and absence of a repeated task approved.
- [ ] Reviewer name/date and owner approval recorded before status changes.

### phy11-units-dimensions-hard-023

**Difficulty:** hard (provisional). **Topic:** Dimensional coefficients and an extremum. **Status:** DRAFT.

For v>0 a model energy is E(v)=A v^2+B/v^2, with positive constants A and B. A=2.0 kg and B=162 kg m^4 s^-4. Find the speed at minimum energy and the minimum energy.

A. v=6 m/s; E_min=72 J  
B. v=3 m/s; E_min=18 J  
C. v=9 m/s; E_min=36 J  
D. v=3 m/s; E_min=36 J

**Correct answer:** D — v=3 m/s; E_min=36 J

**Explanation:**

1. Homogeneity requires [A]=M and [B]=M L^4 T^-4, consistent with the supplied units.
2. For positive terms, A v^2+B/v^2≥2sqrt(AB), with equality when A v^2=B/v^2.
3. Hence v^4=B/A=81 m^4 s^-4 and v=3 m/s.
4. The minimum is 2sqrt(2×162)=36 J; direct substitution gives 18+18 J.

**Validation findings:** Coefficient dimensions, AM-GM minimum, equality condition and direct substitution checked. No known unresolved answer-key/unit error in author checks; this is not independent academic approval.

**Changes:** Rewritten to replace repetitive recall or under-level solving; supplied ID and difficulty preserved. Balanced option order with answer identity retained.

**Remaining concerns:** Qualified review of difficulty, syllabus/prerequisites, all options and derivation remains required.

- [ ] Independent recalculation and full explanation approved.
- [ ] Every distractor is plausible and unambiguously incorrect under the stated assumptions.
- [ ] Difficulty, syllabus/prerequisites, originality and absence of a repeated task approved.
- [ ] Reviewer name/date and owner approval recorded before status changes.

### phy11-units-dimensions-hard-024

**Difficulty:** hard (provisional). **Topic:** Angular uncertainty in ill-conditioned triangulation. **Status:** DRAFT.

A supplied triangulation model is x=b/(cot α-cot β). Take b=10 m exactly, α=30.00° and β=31.00°, each with an independently bounded error of ±0.01°. Using first-order worst-case propagation, what is the approximate maximum percentage uncertainty in x? Derivatives of trigonometric functions use radians.

A. 0.0200%  
B. 2.00%  
C. 0.200%  
D. 0.0349%

**Correct answer:** B — 2.00%

**Explanation:**

1. Let D=cot α-cot β, so δx/x≈δD/|D| because b is exact.
2. The bound is δD≤(csc^2 α+csc^2 β)δθ, with δθ=0.01π/180 rad.
3. At the given angles D≈0.0677713 and the resulting ratio is about 0.0200098.
4. Thus the percentage bound is about 2.00%. Small angular errors are amplified by the small difference D.

**Validation findings:** Radian derivatives and cancellation conditioning checked against finite differences and interval corners. No known unresolved answer-key/unit error in author checks; this is not independent academic approval.

**Changes:** Rewritten to replace repetitive recall or under-level solving; supplied ID and difficulty preserved. Balanced option order with answer identity retained.

**Remaining concerns:** Qualified review of difficulty, syllabus/prerequisites, all options and derivation remains required.

- [ ] Independent recalculation and full explanation approved.
- [ ] Every distractor is plausible and unambiguously incorrect under the stated assumptions.
- [ ] Difficulty, syllabus/prerequisites, originality and absence of a repeated task approved.
- [ ] Reviewer name/date and owner approval recorded before status changes.

### phy11-units-dimensions-hard-025

**Difficulty:** hard (provisional). **Topic:** Uncertainty in a fitted force-law crossover. **Status:** DRAFT.

A force model is F=a v+b v^2 with positive a,b. At exact speeds u=1 m/s and 2u, measurements are F1=(3.00±0.03) N and F2=(8.00±0.08) N with independent bounded errors. Define v* by equality of the two force contributions. What is v* and its first-order maximum absolute uncertainty?

A. v*=(4.00±0.24) m/s  
B. v*=(2.00±0.24) m/s  
C. v*=(2.00±0.12) m/s  
D. v*=(2.00±0.08) m/s

**Correct answer:** B — v*=(2.00±0.24) m/s

**Explanation:**

1. Solving the two force equations gives a=(2F1-F2/2)/u and b=(F2/2-F1)/u^2.
2. Equal contributions require v*=a/b=u(4F1-F2)/(F2-2F1)=2 m/s.
3. At the central readings and u=1 m/s, sensitivities to F1 and F2 are +4 and -1.5 (m/s)/N.
4. The bound is 4(0.03)+1.5(0.08)=0.24 m/s. Fitted a and b must not be propagated as independent inputs.

**Validation findings:** Two-parameter fit eliminated; quotient derivatives checked using primitive measured forces. No known unresolved answer-key/unit error in author checks; this is not independent academic approval.

**Changes:** Rewritten to replace repetitive recall or under-level solving; supplied ID and difficulty preserved. Balanced option order with answer identity retained.

**Remaining concerns:** Qualified review of difficulty, syllabus/prerequisites, all options and derivation remains required.

- [ ] Independent recalculation and full explanation approved.
- [ ] Every distractor is plausible and unambiguously incorrect under the stated assumptions.
- [ ] Difficulty, syllabus/prerequisites, originality and absence of a repeated task approved.
- [ ] Reviewer name/date and owner approval recorded before status changes.

### phy11-units-dimensions-hard-026

**Difficulty:** hard (provisional). **Topic:** Inferring correlation from two uncertainty combinations. **Status:** DRAFT.

Positive x and y each have relative STANDARD uncertainty 2%. Their product xy has first-order relative standard uncertainty 2%. Using linear covariance propagation, what correlation coefficient ρ_xy and relative standard uncertainty of x/y follow?

A. ρ_xy=+1/2; u_rel(x/y)=2%  
B. ρ_xy=-1/2; u_rel(x/y)=sqrt(12)%  
C. ρ_xy=-1; u_rel(x/y)=4%  
D. ρ_xy=0; u_rel(x/y)=sqrt(8)%

**Correct answer:** B — ρ_xy=-1/2; u_rel(x/y)=sqrt(12)%

**Explanation:**

1. For the product, percent-squared relative variance is 4+4+2ρ_xy(2)(2).
2. Setting this equal to 2^2 gives 4=8+8ρ_xy and ρ_xy=-1/2.
3. For the quotient the covariance term changes sign, giving 4+4-8(-1/2)=12.
4. Thus the relative standard uncertainty is sqrt(12)%, not a worst-case sum.

**Validation findings:** Covariance sign change, positive-semidefinite admissibility and numerical result checked. No known unresolved answer-key/unit error in author checks; this is not independent academic approval.

**Changes:** Rewritten to replace repetitive recall or under-level solving; supplied ID and difficulty preserved. Balanced option order with answer identity retained.

**Remaining concerns:** Correlation and standard uncertainty must be approved as intended Hard enrichment topics.

- [ ] Independent recalculation and full explanation approved.
- [ ] Every distractor is plausible and unambiguously incorrect under the stated assumptions.
- [ ] Difficulty, syllabus/prerequisites, originality and absence of a repeated task approved.
- [ ] Reviewer name/date and owner approval recorded before status changes.

### phy11-units-dimensions-hard-027

**Difficulty:** hard (provisional). **Topic:** Contact-time scaling from two physical models. **Status:** DRAFT.

An idealised elastic contact obeys F∝Y sqrt(R) δ^(3/2), where Y has pressure dimensions, R is a curvature length and δ compression. Assume initial kinetic energy m v^2 sets the work scale and contact time τ scales as δ_max/v. If m and R both multiply by 32 while Y and v stay fixed, what is τ_new/τ_old?

A. 2  
B. 4  
C. 8  
D. 1

**Correct answer:** A — 2

**Explanation:**

1. Work is the integral of force over compression, so its scale is Y sqrt(R) δ_max^(5/2).
2. Equate this with m v^2 to get δ_max∝m^(2/5)v^(4/5)Y^(-2/5)R^(-1/5).
3. Then τ∝δ_max/v∝m^(2/5)v^(-1/5)Y^(-2/5)R^(-1/5).
4. The ratio is 32^(2/5)32^(-1/5)=32^(1/5)=2. The final expression has time dimensions.

**Validation findings:** Force-to-work integration exponent, energy matching, time scaling and dimensional closure checked. No known unresolved answer-key/unit error in author checks; this is not independent academic approval.

**Changes:** Rewritten to replace repetitive recall or under-level solving; supplied ID and difficulty preserved. Balanced option order with answer identity retained.

**Remaining concerns:** This explicitly supplied idealised contact model is enrichment, not a memorisation requirement or universal law.

- [ ] Independent recalculation and full explanation approved.
- [ ] Every distractor is plausible and unambiguously incorrect under the stated assumptions.
- [ ] Difficulty, syllabus/prerequisites, originality and absence of a repeated task approved.
- [ ] Reviewer name/date and owner approval recorded before status changes.

### phy11-units-dimensions-hard-028

**Difficulty:** hard (provisional). **Topic:** Coupled diffusion and temperature scaling. **Status:** DRAFT.

For a model particle, D=k_B Θ/(6πηr), ℓ=αr and a characteristic time τ=ℓ^2/D. All parameters are positive. Here Θ is absolute temperature, k_B and α are constants, and η and r vary with Θ as η∝Θ^-2 and r∝Θ^(1/2). What happens to τ when Θ doubles?

A. It is multiplied by 2 sqrt(2).  
B. It is multiplied by 1/(2 sqrt(2)).  
C. It is multiplied by 1/sqrt(2).  
D. It is multiplied by sqrt(2).

**Correct answer:** B — It is multiplied by 1/(2 sqrt(2)).

**Explanation:**

1. Combine the supplied relations: τ∝r^2×ηr/Θ=ηr^3/Θ.
2. Substitute the two temperature dependences: τ∝Θ^-2×Θ^(3/2)×Θ^-1=Θ^(-3/2).
3. Doubling temperature therefore multiplies τ by 2^(-3/2)=1/(2sqrt(2)).
4. Dimensional checking uses [k_BΘ]=energy and [ηr]=M T^-1, giving [D]=L^2 T^-1 and [τ]=T.

**Validation findings:** Three model relations and coupled exponents combined; diffusion and time dimensions checked. No known unresolved answer-key/unit error in author checks; this is not independent academic approval.

**Changes:** Rewritten to replace repetitive recall or under-level solving; supplied ID and difficulty preserved. Balanced option order with answer identity retained.

**Remaining concerns:** The temperature laws are model assumptions only; do not infer them for arbitrary real fluids.

- [ ] Independent recalculation and full explanation approved.
- [ ] Every distractor is plausible and unambiguously incorrect under the stated assumptions.
- [ ] Difficulty, syllabus/prerequisites, originality and absence of a repeated task approved.
- [ ] Reviewer name/date and owner approval recorded before status changes.

### phy11-units-dimensions-hard-029

**Difficulty:** hard (provisional). **Topic:** A reflectivity calibration that cancels a measured input. **Status:** DRAFT.

For the SAME steady photon beam, supplied models give absorbed force F_a=P/c, partially reflecting force F_m=(1+r)P/c and power P=N h c/λ. Reflectivity is inferred as r=F_m/F_a-1, then h is computed as F_m λ/[N(1+r)]. Independent primitive maximum percentage uncertainties are F_a:1%, F_m:5%, λ:0.5%, N:2%. What is the first-order maximum percentage uncertainty in h? Here N is the photon arrival rate and λ is the wavelength.

A. 8.5%  
B. 2.5%  
C. 3.5%  
D. 13.5%

**Correct answer:** C — 3.5%

**Explanation:**

1. Insert the fitted reflectivity before propagating: 1+r=F_m/F_a.
2. Then h=F_m λ/[N(F_m/F_a)]=F_a λ/N; F_m cancels exactly.
3. The surviving bounded relative contributions add: 1%+0.5%+2%=3.5%.
4. The unit is force×length/(count rate)=J s, consistent with action; count rate has units s^-1.

**Validation findings:** Shared calibration substitution, exact cancellation and primitive-error propagation checked. No known unresolved answer-key/unit error in author checks; this is not independent academic approval.

**Changes:** Rewritten to replace repetitive recall or under-level solving; supplied ID and difficulty preserved. Balanced option order with answer identity retained.

**Remaining concerns:** All photon relations are supplied; advanced context and prerequisite fairness need qualified review.

- [ ] Independent recalculation and full explanation approved.
- [ ] Every distractor is plausible and unambiguously incorrect under the stated assumptions.
- [ ] Difficulty, syllabus/prerequisites, originality and absence of a repeated task approved.
- [ ] Reviewer name/date and owner approval recorded before status changes.

### phy11-units-dimensions-hard-030

**Difficulty:** hard (provisional). **Topic:** An exponent fitted from two noisy ratios. **Status:** DRAFT.

A model Y=C X^n is fitted from central ratios X2/X1=4 and Y2/Y1=8. Each of X1,X2,Y1,Y2 has independent residual relative STANDARD uncertainty 1%. The X readings share an additional common multiplicative calibration uncertainty of 5%, and the Y readings share a separate one of 5%. What are n and its first-order absolute standard uncertainty?

A. n=1.500; u(n)≈0.0184  
B. n=2.000; u(n)≈0.0184  
C. n=1.500; u(n)≈0.00721  
D. n=1.500; u(n)≈0.0559

**Correct answer:** A — n=1.500; u(n)≈0.0184

**Explanation:**

1. The exponent is n=ln(Y2/Y1)/ln(X2/X1)=ln8/ln4=1.5.
2. Both common multiplicative calibrations cancel exactly inside their respective ratios.
3. Residual logarithmic variances are 2(0.01)^2 for each ratio. Linear propagation gives u(n)^2=[2(0.01)^2+n^2×2(0.01)^2]/(ln4)^2.
4. This gives u(n)=sqrt(0.00065)/ln4≈0.0183908, an absolute uncertainty in the dimensionless exponent.

**Validation findings:** Logarithmic-ratio Jacobian and covariance cancellation independently checked. No known unresolved answer-key/unit error in author checks; this is not independent academic approval.

**Changes:** Rewritten to replace repetitive recall or under-level solving; supplied ID and difficulty preserved. Balanced option order with answer identity retained.

**Remaining concerns:** Standard uncertainty, logarithms and inverse parameter fitting are advanced enrichment; no bounded confidence interval is asserted.

- [ ] Independent recalculation and full explanation approved.
- [ ] Every distractor is plausible and unambiguously incorrect under the stated assumptions.
- [ ] Difficulty, syllabus/prerequisites, originality and absence of a repeated task approved.
- [ ] Reviewer name/date and owner approval recorded before status changes.

### phy11-units-dimensions-medium-001

**Difficulty:** medium (provisional). **Topic:** Coefficients in a time-dependent force. **Status:** DRAFT.

A force is F = a t + b/t for nonzero time t. What is the dimensional formula of a/b?

A. [T^-2]  
B. [T^2]  
C. [M L T^-2]  
D. Dimensionless

**Correct answer:** A — [T^-2]

**Explanation:**

1. Each term must have force dimensions M L T^-2.
2. Therefore [a] = M L T^-3 and [b] = M L T^-1.
3. Dividing the two dimensions cancels mass and length and leaves T^-2.

**Validation findings:** Two coefficient equations solved before taking their quotient. No known unresolved answer-key/unit error in author checks; this is not independent academic approval.

**Changes:** Rewritten to replace repetitive recall or under-level solving; supplied ID and difficulty preserved. Balanced option order with answer identity retained.

**Remaining concerns:** Confirm syllabus fit, difficulty, distractors and wording independently.

- [ ] Independent recalculation and full explanation approved.
- [ ] Every distractor is plausible and unambiguously incorrect under the stated assumptions.
- [ ] Difficulty, syllabus/prerequisites, originality and absence of a repeated task approved.
- [ ] Reviewer name/date and owner approval recorded before status changes.

### phy11-units-dimensions-medium-002

**Difficulty:** medium (provisional). **Topic:** Power-law exponent matching. **Status:** DRAFT.

Assume a power P is a dimensionless constant times ρ^a v^b A^c, where ρ is mass density, v speed and A area. What is 2a + b - c?

A. 3  
B. 6  
C. 2  
D. 4

**Correct answer:** D — 4

**Explanation:**

1. Use [P] = M L^2 T^-3, [ρ] = M L^-3, [v] = L T^-1 and [A] = L^2.
2. Mass gives a=1; time gives b=3.
3. Length gives -3a+b+2c=2, so c=1. Hence 2a+b-c=4.

**Validation findings:** Three independent exponent equations solved; dimensionless coefficient assumed. No known unresolved answer-key/unit error in author checks; this is not independent academic approval.

**Changes:** Rewritten to replace repetitive recall or under-level solving; supplied ID and difficulty preserved. Balanced option order with answer identity retained.

**Remaining concerns:** Confirm syllabus fit, difficulty, distractors and wording independently.

- [ ] Independent recalculation and full explanation approved.
- [ ] Every distractor is plausible and unambiguously incorrect under the stated assumptions.
- [ ] Difficulty, syllabus/prerequisites, originality and absence of a repeated task approved.
- [ ] Reviewer name/date and owner approval recorded before status changes.

### phy11-units-dimensions-medium-003

**Difficulty:** medium (provisional). **Topic:** Pendulum scaling from dimensions. **Status:** DRAFT.

For a proposed pendulum model T = C L^a g^b, C is dimensionless and unchanged between two trials. In trial 2, L is nine times larger and g is half its trial-1 value. Find T2/T1 by dimensional analysis.

A. 3 sqrt(2)  
B. 9/2  
C. 6  
D. 3/sqrt(2)

**Correct answer:** A — 3 sqrt(2)

**Explanation:**

1. Matching T to L^a(L T^-2)^b gives -2b=1 and a+b=0.
2. Thus a=1/2 and b=-1/2.
3. The ratio is sqrt(9)/sqrt(1/2)=3 sqrt(2); no physical value of C is inferred.

**Validation findings:** Exponent solution plus parameter-ratio substitution; unchanged dimensionless conditions stated. No known unresolved answer-key/unit error in author checks; this is not independent academic approval.

**Changes:** Rewritten to replace repetitive recall or under-level solving; supplied ID and difficulty preserved. Balanced option order with answer identity retained.

**Remaining concerns:** Confirm syllabus fit, difficulty, distractors and wording independently.

- [ ] Independent recalculation and full explanation approved.
- [ ] Every distractor is plausible and unambiguously incorrect under the stated assumptions.
- [ ] Difficulty, syllabus/prerequisites, originality and absence of a repeated task approved.
- [ ] Reviewer name/date and owner approval recorded before status changes.

### phy11-units-dimensions-medium-004

**Difficulty:** medium (provisional). **Topic:** Vernier reading with zero correction. **Status:** DRAFT.

On a direct vernier, 20 vernier divisions equal 19 main-scale divisions; one main division is 1.00 mm. A reading has main-scale value 12.00 mm and the 7th vernier division coinciding. The instrument reads +0.10 mm when closed. What is the corrected length?

A. 12.25 mm  
B. 12.70 mm  
C. 12.35 mm  
D. 12.45 mm

**Correct answer:** A — 12.25 mm

**Explanation:**

1. One vernier division is 19/20 mm, so least count is 1/20=0.05 mm.
2. The indicated length is 12.00+7(0.05)=12.35 mm.
3. Subtract the positive zero error: 12.35-0.10=12.25 mm.

**Validation findings:** Vernier geometry, scale reading and correction checked separately. No known unresolved answer-key/unit error in author checks; this is not independent academic approval.

**Changes:** Rewritten to replace repetitive recall or under-level solving; supplied ID and difficulty preserved. Balanced option order with answer identity retained.

**Remaining concerns:** Confirm syllabus fit, difficulty, distractors and wording independently.

- [ ] Independent recalculation and full explanation approved.
- [ ] Every distractor is plausible and unambiguously incorrect under the stated assumptions.
- [ ] Difficulty, syllabus/prerequisites, originality and absence of a repeated task approved.
- [ ] Reviewer name/date and owner approval recorded before status changes.

### phy11-units-dimensions-medium-005

**Difficulty:** medium (provisional). **Topic:** Density from measured geometry. **Status:** DRAFT.

A uniform cube has mass 24 g and side 2.0 cm. Treat these values as exact for this calculation. What is its density in kg/m^3?

A. 3 kg/m^3  
B. 300 kg/m^3  
C. 3000 kg/m^3  
D. 24000 kg/m^3

**Correct answer:** C — 3000 kg/m^3

**Explanation:**

1. The volume is (2.0)^3=8.0 cm^3.
2. Density is 24/8=3 g/cm^3.
3. Since 1 g/cm^3=10^-3 kg/10^-6 m^3=1000 kg/m^3, the result is 3000 kg/m^3.

**Validation findings:** Cubic geometry, division and cubic unit conversion independently recalculated. No known unresolved answer-key/unit error in author checks; this is not independent academic approval.

**Changes:** Rewritten to replace repetitive recall or under-level solving; supplied ID and difficulty preserved. Balanced option order with answer identity retained.

**Remaining concerns:** Confirm syllabus fit, difficulty, distractors and wording independently.

- [ ] Independent recalculation and full explanation approved.
- [ ] Every distractor is plausible and unambiguously incorrect under the stated assumptions.
- [ ] Difficulty, syllabus/prerequisites, originality and absence of a repeated task approved.
- [ ] Reviewer name/date and owner approval recorded before status changes.

### phy11-units-dimensions-medium-006

**Difficulty:** medium (provisional). **Topic:** Mixed-operation significant figures. **Status:** DRAFT.

Using the usual school significant-figure rules, evaluate (12.34 cm + 0.6 cm)/(1.20 cm). Keep guard digits until the final rounding.

A. 10.78  
B. 10.8  
C. 10.75  
D. 11

**Correct answer:** B — 10.8

**Explanation:**

1. The numerator is 12.94 cm before rounding, but addition limits it to tenths of a centimetre (three significant figures here).
2. Carry the guard digits through division: 12.94/1.20=10.7833... .
3. Both the effective numerator precision and denominator support three significant figures, so report 10.8; units cancel.

**Validation findings:** Mixed decimal-place and significant-figure rules; guard-digit convention explicit. No known unresolved answer-key/unit error in author checks; this is not independent academic approval.

**Changes:** Rewritten to replace repetitive recall or under-level solving; supplied ID and difficulty preserved. Balanced option order with answer identity retained.

**Remaining concerns:** Confirm syllabus fit, difficulty, distractors and wording independently.

- [ ] Independent recalculation and full explanation approved.
- [ ] Every distractor is plausible and unambiguously incorrect under the stated assumptions.
- [ ] Difficulty, syllabus/prerequisites, originality and absence of a repeated task approved.
- [ ] Reviewer name/date and owner approval recorded before status changes.

### phy11-units-dimensions-medium-007

**Difficulty:** medium (provisional). **Topic:** Difference followed by a quotient. **Status:** DRAFT.

Independent bounded measurements are x2=(20.0±0.2) m, x1=(5.0±0.1) m and t=(3.00±0.03) s. For v=(x2-x1)/t, what is the first-order worst-case absolute uncertainty?

A. 0.10 m/s  
B. 0.15 m/s  
C. 0.05 m/s  
D. 0.30 m/s

**Correct answer:** B — 0.15 m/s

**Explanation:**

1. The displacement estimate is 15.0 m, with worst-case absolute uncertainty 0.3 m.
2. Its relative uncertainty is 0.3/15=2%; that of time is 0.03/3=1%.
3. The speed estimate is 5 m/s. Its first-order relative bound is 3%, giving 0.15 m/s.

**Validation findings:** Primitive bounded errors propagated through difference then ratio, without statistical quadrature. No known unresolved answer-key/unit error in author checks; this is not independent academic approval.

**Changes:** Rewritten to replace repetitive recall or under-level solving; supplied ID and difficulty preserved. Balanced option order with answer identity retained.

**Remaining concerns:** Confirm syllabus fit, difficulty, distractors and wording independently.

- [ ] Independent recalculation and full explanation approved.
- [ ] Every distractor is plausible and unambiguously incorrect under the stated assumptions.
- [ ] Difficulty, syllabus/prerequisites, originality and absence of a repeated task approved.
- [ ] Reviewer name/date and owner approval recorded before status changes.

### phy11-units-dimensions-medium-008

**Difficulty:** medium (provisional). **Topic:** Speed conversion with new base units. **Status:** DRAFT.

A speed is 18 km/h. A new unit of length is 5 m and a new unit of time is 2 s. What is the numerical value of the speed in the new system?

A. 5  
B. 10  
C. 2  
D. 0.5

**Correct answer:** C — 2

**Explanation:**

1. Convert the speed: 18 km/h=5 m/s.
2. One new speed unit is 5 m/2 s=2.5 m/s.
3. The numerical value is 5/2.5=2.

**Validation findings:** Physical speed conversion followed by numerical-value/unit-size inversion. No known unresolved answer-key/unit error in author checks; this is not independent academic approval.

**Changes:** Rewritten to replace repetitive recall or under-level solving; supplied ID and difficulty preserved. Balanced option order with answer identity retained.

**Remaining concerns:** Confirm syllabus fit, difficulty, distractors and wording independently.

- [ ] Independent recalculation and full explanation approved.
- [ ] Every distractor is plausible and unambiguously incorrect under the stated assumptions.
- [ ] Difficulty, syllabus/prerequisites, originality and absence of a repeated task approved.
- [ ] Reviewer name/date and owner approval recorded before status changes.

### phy11-units-dimensions-medium-009

**Difficulty:** medium (provisional). **Topic:** Surface tension with two interfaces. **Status:** DRAFT.

A light movable wire of length 3.0 cm bounds a film with two interfaces. Use F=2γl, where γ is surface tension. If the film pulls with F=0.012 N, what is γ?

A. 0.0020 N/m  
B. 0.20 N/m  
C. 0.40 N/m  
D. 0.80 N/m

**Correct answer:** B — 0.20 N/m

**Explanation:**

1. The two interfaces give the factor 2 in F=2γl.
2. Convert l=3.0 cm=0.030 m and rearrange γ=F/(2l).
3. Then γ=0.012/(2×0.030)=0.20 N/m.

**Validation findings:** Interface count, unit conversion and rearrangement; [γ]=M T^-2. No known unresolved answer-key/unit error in author checks; this is not independent academic approval.

**Changes:** Rewritten to replace repetitive recall or under-level solving; supplied ID and difficulty preserved. Balanced option order with answer identity retained.

**Remaining concerns:** Confirm syllabus fit, difficulty, distractors and wording independently.

- [ ] Independent recalculation and full explanation approved.
- [ ] Every distractor is plausible and unambiguously incorrect under the stated assumptions.
- [ ] Difficulty, syllabus/prerequisites, originality and absence of a repeated task approved.
- [ ] Reviewer name/date and owner approval recorded before status changes.

### phy11-units-dimensions-medium-010

**Difficulty:** medium (provisional). **Topic:** Viscosity inferred from a shear experiment. **Status:** DRAFT.

Two parallel plates have area 0.20 m^2, separation 2.0 mm and relative speed 0.30 m/s. Using F=ηAv/d, a measured force of 0.60 N implies which dynamic viscosity?

A. 0.20 Pa s  
B. 0.0020 Pa s  
C. 0.020 Pa s  
D. 20 Pa s

**Correct answer:** C — 0.020 Pa s

**Explanation:**

1. Convert the gap: d=0.0020 m.
2. Rearrange η=Fd/(Av).
3. Substitution gives 0.60×0.0020/(0.20×0.30)=0.020 kg m^-1 s^-1=0.020 Pa s.

**Validation findings:** SI conversion, substitution and viscosity-unit reduction checked; ideal linear shear model stipulated. No known unresolved answer-key/unit error in author checks; this is not independent academic approval.

**Changes:** Rewritten to replace repetitive recall or under-level solving; supplied ID and difficulty preserved. Balanced option order with answer identity retained.

**Remaining concerns:** Confirm syllabus fit, difficulty, distractors and wording independently.

- [ ] Independent recalculation and full explanation approved.
- [ ] Every distractor is plausible and unambiguously incorrect under the stated assumptions.
- [ ] Difficulty, syllabus/prerequisites, originality and absence of a repeated task approved.
- [ ] Reviewer name/date and owner approval recorded before status changes.

### phy11-units-dimensions-medium-011

**Difficulty:** medium (provisional). **Topic:** Density uncertainty from a radius measurement. **Status:** DRAFT.

A sphere has mass (40.0±1.2) g and radius (2.00±0.02) cm. Using ρ=3m/(4πr^3), find the first-order maximum percentage uncertainty in ρ. Treat π as exact.

A. 12%  
B. 4%  
C. 9%  
D. 6%

**Correct answer:** D — 6%

**Explanation:**

1. The relative mass bound is 1.2/40=3%; the radius bound is 0.02/2=1%.
2. For m r^-3, absolute relative contributions add as 3%+3(1%).
3. The first-order maximum percentage uncertainty is 6%; this is not an exact finite-bound calculation.

**Validation findings:** Raw absolute uncertainties converted to fractional values before weighted propagation. No known unresolved answer-key/unit error in author checks; this is not independent academic approval.

**Changes:** Rewritten to replace repetitive recall or under-level solving; supplied ID and difficulty preserved. Balanced option order with answer identity retained.

**Remaining concerns:** Confirm syllabus fit, difficulty, distractors and wording independently.

- [ ] Independent recalculation and full explanation approved.
- [ ] Every distractor is plausible and unambiguously incorrect under the stated assumptions.
- [ ] Difficulty, syllabus/prerequisites, originality and absence of a repeated task approved.
- [ ] Reviewer name/date and owner approval recorded before status changes.

### phy11-units-dimensions-medium-012

**Difficulty:** medium (provisional). **Topic:** Gravitational-constant unit conversion. **Status:** DRAFT.

Infer [G] from F=Gm1m2/r^2. A new mass unit is 2 kg, length unit 3 m and time unit 0.50 s. What is the ratio of the numerical value of G in the new system to its SI numerical value?

A. 54  
B. 27/2  
C. 1/27  
D. 1/54

**Correct answer:** D — 1/54

**Explanation:**

1. From the force law, [G]=M^-1 L^3 T^-2.
2. One new G unit is (2)^-1(3)^3(0.50)^-2=54 SI G units.
3. The same constant therefore has 1/54 of its SI numerical value.

**Validation findings:** Dimensions derived from the force law, then all three base-unit scale factors inverted. No known unresolved answer-key/unit error in author checks; this is not independent academic approval.

**Changes:** Rewritten to replace repetitive recall or under-level solving; supplied ID and difficulty preserved. Balanced option order with answer identity retained.

**Remaining concerns:** Confirm syllabus fit, difficulty, distractors and wording independently.

- [ ] Independent recalculation and full explanation approved.
- [ ] Every distractor is plausible and unambiguously incorrect under the stated assumptions.
- [ ] Difficulty, syllabus/prerequisites, originality and absence of a repeated task approved.
- [ ] Reviewer name/date and owner approval recorded before status changes.

### phy11-units-dimensions-medium-013

**Difficulty:** medium (provisional). **Topic:** Absolute temperature and relative uncertainty. **Status:** DRAFT.

A thermometer reads (25.0±0.5) °C. Use T_K=θ_C+273.15, treating the offset as exact. What is the relative percentage uncertainty in the absolute temperature, rounded to three significant figures?

A. 2.00%  
B. 0.168%  
C. 0.500%  
D. 0.00168%

**Correct answer:** B — 0.168%

**Explanation:**

1. Convert the central absolute temperature: T=25.0+273.15=298.15 K.
2. An exact additive offset leaves the absolute uncertainty at 0.5 K.
3. The relative percentage uncertainty is 100(0.5/298.15)=0.1677008...%, reported as 0.168%. Dividing by 25.0 would describe a different, scale-dependent ratio.

**Validation findings:** Exact affine temperature conversion; absolute uncertainty unchanged; percentage based on Kelvin absolute temperature. No known unresolved answer-key/unit error in author checks; this is not independent academic approval.

**Changes:** Rewritten to replace repetitive recall or under-level solving; supplied ID and difficulty preserved. Balanced option order with answer identity retained.

**Remaining concerns:** Confirm syllabus fit, difficulty, distractors and wording independently.

- [ ] Independent recalculation and full explanation approved.
- [ ] Every distractor is plausible and unambiguously incorrect under the stated assumptions.
- [ ] Difficulty, syllabus/prerequisites, originality and absence of a repeated task approved.
- [ ] Reviewer name/date and owner approval recorded before status changes.

### phy11-units-dimensions-medium-014

**Difficulty:** medium (provisional). **Topic:** SI time and current in a charge count. **Status:** DRAFT.

A steady current of 6.0 mA flows for 5.0 min. Use Q=It and N=Q/e, with e=1.6×10^-19 C. Treat inputs as exact for this exercise. How many elementary charges pass?

A. 1.125×10^16  
B. 1.125×10^19  
C. 1.875×10^17  
D. 1.8×10^19

**Correct answer:** B — 1.125×10^19

**Explanation:**

1. Convert I=0.0060 A and t=300 s.
2. Charge transferred is Q=0.0060×300=1.8 C.
3. Divide by e: N=1.8/(1.6×10^-19)=1.125×10^19, a dimensionless count.

**Validation findings:** Two prefix/time conversions, charge relation and count conversion; governing relations supplied. No known unresolved answer-key/unit error in author checks; this is not independent academic approval.

**Changes:** Rewritten to replace repetitive recall or under-level solving; supplied ID and difficulty preserved. Balanced option order with answer identity retained.

**Remaining concerns:** Confirm syllabus fit, difficulty, distractors and wording independently.

- [ ] Independent recalculation and full explanation approved.
- [ ] Every distractor is plausible and unambiguously incorrect under the stated assumptions.
- [ ] Difficulty, syllabus/prerequisites, originality and absence of a repeated task approved.
- [ ] Reviewer name/date and owner approval recorded before status changes.

### phy11-units-dimensions-medium-015

**Difficulty:** medium (provisional). **Topic:** Dimensionless phase with two terms. **Status:** DRAFT.

In y=A sin(αt^2+βx), t is time and x is length. What are the dimensions of α/β?

A. [L T^2]  
B. [T^-2]  
C. [L^-1 T^-2]  
D. [L T^-2]

**Correct answer:** D — [L T^-2]

**Explanation:**

1. A sine argument must be dimensionless; both terms in the sum must individually be dimensionless.
2. Hence [α]=T^-2 and [β]=L^-1.
3. Their quotient has dimensions L T^-2.

**Validation findings:** Two independent phase constraints and their quotient, rather than angular-frequency recall. No known unresolved answer-key/unit error in author checks; this is not independent academic approval.

**Changes:** Rewritten to replace repetitive recall or under-level solving; supplied ID and difficulty preserved. Balanced option order with answer identity retained.

**Remaining concerns:** Confirm syllabus fit, difficulty, distractors and wording independently.

- [ ] Independent recalculation and full explanation approved.
- [ ] Every distractor is plausible and unambiguously incorrect under the stated assumptions.
- [ ] Difficulty, syllabus/prerequisites, originality and absence of a repeated task approved.
- [ ] Reviewer name/date and owner approval recorded before status changes.

### phy11-units-dimensions-medium-016

**Difficulty:** medium (provisional). **Topic:** Uncertainty of a sum in a denominator. **Status:** DRAFT.

A quantity is Q=L^2/(t1+t2), with L=(10.0±0.1) m, t1=(2.00±0.02) s and t2=(3.00±0.04) s. What is the first-order worst-case percentage uncertainty in Q?

A. 3.2%  
B. 4.0%  
C. 2.0%  
D. 2.4%

**Correct answer:** A — 3.2%

**Explanation:**

1. The denominator is 5.00 s with absolute bound 0.02+0.04=0.06 s.
2. Its fractional bound is 0.06/5=1.2%; L contributes 2×(0.1/10)=2%.
3. The first-order total relative bound is 2%+1.2%=3.2%.

**Validation findings:** Addition performed before relative uncertainty; squared length sensitivity checked. No known unresolved answer-key/unit error in author checks; this is not independent academic approval.

**Changes:** Rewritten to replace repetitive recall or under-level solving; supplied ID and difficulty preserved. Balanced option order with answer identity retained.

**Remaining concerns:** Confirm syllabus fit, difficulty, distractors and wording independently.

- [ ] Independent recalculation and full explanation approved.
- [ ] Every distractor is plausible and unambiguously incorrect under the stated assumptions.
- [ ] Difficulty, syllabus/prerequisites, originality and absence of a repeated task approved.
- [ ] Reviewer name/date and owner approval recorded before status changes.

### phy11-units-dimensions-medium-017

**Difficulty:** medium (provisional). **Topic:** Stiffness in CGS units. **Status:** DRAFT.

A spring stiffness is 250 N/m. Using F=kx, convert k to dyn/cm; 1 kg=1000 g and 1 m=100 cm.

A. 2.5×10^3 dyn/cm  
B. 0.25 dyn/cm  
C. 2.5×10^5 dyn/cm  
D. 2.5×10^7 dyn/cm

**Correct answer:** C — 2.5×10^5 dyn/cm

**Explanation:**

1. Stiffness has force/length units.
2. One newton is 10^5 dyn, and one metre is 100 cm, so 1 N/m=10^3 dyn/cm.
3. Thus 250 N/m=2.5×10^5 dyn/cm.

**Validation findings:** Force conversion and denominator conversion treated separately; no dimension-only clone retained. No known unresolved answer-key/unit error in author checks; this is not independent academic approval.

**Changes:** Rewritten to replace repetitive recall or under-level solving; supplied ID and difficulty preserved. Balanced option order with answer identity retained.

**Remaining concerns:** Confirm syllabus fit, difficulty, distractors and wording independently.

- [ ] Independent recalculation and full explanation approved.
- [ ] Every distractor is plausible and unambiguously incorrect under the stated assumptions.
- [ ] Difficulty, syllabus/prerequisites, originality and absence of a repeated task approved.
- [ ] Reviewer name/date and owner approval recorded before status changes.

### phy11-units-dimensions-medium-018

**Difficulty:** medium (provisional). **Topic:** Two-point linear instrument calibration. **Status:** DRAFT.

An instrument obeys R=aL+b exactly over its calibration range. R=12.5 divisions at L=10.0 cm and R=24.5 divisions at L=20.0 cm. What length corresponds to R=18.5 divisions?

A. 18.0 cm  
B. 15.4 cm  
C. 15.0 cm  
D. 14.8 cm

**Correct answer:** C — 15.0 cm

**Explanation:**

1. Subtract calibration equations: a=(24.5-12.5)/(20-10)=1.2 divisions/cm.
2. Then b=12.5-1.2×10=0.5 divisions.
3. For R=18.5, L=(18.5-0.5)/1.2=15.0 cm.

**Validation findings:** Gain and offset determined before inversion; calibration is within the stated range. No known unresolved answer-key/unit error in author checks; this is not independent academic approval.

**Changes:** Rewritten to replace repetitive recall or under-level solving; supplied ID and difficulty preserved. Balanced option order with answer identity retained.

**Remaining concerns:** Confirm syllabus fit, difficulty, distractors and wording independently.

- [ ] Independent recalculation and full explanation approved.
- [ ] Every distractor is plausible and unambiguously incorrect under the stated assumptions.
- [ ] Difficulty, syllabus/prerequisites, originality and absence of a repeated task approved.
- [ ] Reviewer name/date and owner approval recorded before status changes.

### phy11-units-dimensions-medium-019

**Difficulty:** medium (provisional). **Topic:** Numerical value of a dimensionless energy ratio. **Status:** DRAFT.

A dimensionless ratio is defined by Π=E/(Fl), where E=0.30 J, F=2.0 N and l=5.0 cm. What is Π? Treat the data as exact.

A. 3  
B. 0.30  
C. 0.03  
D. 30

**Correct answer:** A — 3

**Explanation:**

1. Force times length has energy dimensions, so Π is dimensionless.
2. Convert l=0.050 m; Fl=2.0×0.050=0.10 J.
3. Therefore Π=0.30/0.10=3.

**Validation findings:** Dimensionless identification, denominator unit conversion and numerical ratio. No known unresolved answer-key/unit error in author checks; this is not independent academic approval.

**Changes:** Rewritten to replace repetitive recall or under-level solving; supplied ID and difficulty preserved. Balanced option order with answer identity retained.

**Remaining concerns:** Confirm syllabus fit, difficulty, distractors and wording independently.

- [ ] Independent recalculation and full explanation approved.
- [ ] Every distractor is plausible and unambiguously incorrect under the stated assumptions.
- [ ] Difficulty, syllabus/prerequisites, originality and absence of a repeated task approved.
- [ ] Reviewer name/date and owner approval recorded before status changes.

### phy11-units-dimensions-medium-020

**Difficulty:** medium (provisional). **Topic:** Angle estimate and a first-order bound. **Status:** DRAFT.

For a circular arc use θ=s/r. Measurements are s=(12.0±0.1) mm and r=(3.00±0.03) cm. What is the approximate first-order worst-case absolute uncertainty in θ, expressed in radians?

A. 0.00400 rad  
B. 0.0733 rad  
C. 0.00183 rad  
D. 0.00733 rad

**Correct answer:** D — 0.00733 rad

**Explanation:**

1. Convert r=30.0 mm, so θ=12/30=0.400 rad.
2. The fractional bound is 0.1/12+0.03/3=0.018333... .
3. Thus δθ≈0.400×0.018333=0.00733 rad; angle is dimensionless but rad is an appropriate named unit.

**Validation findings:** Mixed units handled before ratio; both absolute errors propagated into an angular bound. No known unresolved answer-key/unit error in author checks; this is not independent academic approval.

**Changes:** Rewritten to replace repetitive recall or under-level solving; supplied ID and difficulty preserved. Balanced option order with answer identity retained.

**Remaining concerns:** Confirm syllabus fit, difficulty, distractors and wording independently.

- [ ] Independent recalculation and full explanation approved.
- [ ] Every distractor is plausible and unambiguously incorrect under the stated assumptions.
- [ ] Difficulty, syllabus/prerequisites, originality and absence of a repeated task approved.
- [ ] Reviewer name/date and owner approval recorded before status changes.

## Final checks

- Question-bank schema and global ID validation: passed for all 130 loaded records, including the 90 chapter drafts.
- Full regression suite: **56 passed, 0 failed**. The 13 curation/scoring checks were rerun after final wording/validation refinements, all passed.
- Production HTTP matrix: **10 passed, 0 failed**, covering all six exact-difficulty sizes/timers plus guest safety, expiry, duplicate submissions and unavailable banks. Private synthetic fixtures only; no real draft status changed.
- Production API integration: **2 passed, 0 failed**. Real chapter API: HTTP 200; 90 drafts (40/20/30), zero approved, empty size lists.
- Standalone TypeScript and production build: **passed**. Initial type/build attempt discovered a private backup test under tmp; it was preserved as plain text so TypeScript no longer treated it as source. No application/configuration fix was required.
- Scoring after reordering: all-correct +4N, all-wrong -N, blank 0 and active answer-key stripping passed on curated snapshots.
- Duplicate screen: zero exact/lexical flags at 0.65; maximum token-set similarity 0.3824 (phy11-units-dimensions-medium-007 and phy11-units-dimensions-medium-020). Human semantic review still required.
- Formatting and Git whitespace checks passed; no ESLint setup exists.
- Existing verified records and the previous 30 Easy drafts are unchanged; all 90 chapter questions remain drafts.
- No known unresolved arithmetic/dimensional answer error was found in author checks. Independent academic approval, exam-level calibration and advanced-prerequisite suitability remain pending.
- No push, activation or deployment performed.
  The machine-readable companion is [11-physics-1-curation.json](11-physics-1-curation.json). Historical import reports describe the pre-curation ZIP; this document supersedes their difficulty/duplicate findings for the current content.
