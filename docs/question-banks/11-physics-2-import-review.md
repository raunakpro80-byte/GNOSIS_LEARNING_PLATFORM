# Class 11 Physics — Chapter 2 import and editorial review

Date: 2026-10-18. **All 60 imports remain drafts. No academic approval or activation.**

## Import and preservation

- Used the master exactly once after deep equality with the three difficulty files (10/20/30); manifest is metadata, not another bank.
- Mapped TO_BE_MAPPED to the existing identity className="11", subject="physics", chapter=2 (Motion in a Straight Line). No Chapter 1 mapping.
- Adapted field names to schemaVersion=1, single-correct type, original source label and draft verification. Retained all source IDs, stems, options, keys, explanations, topics and difficulty labels for a traceable review.
- Ran existing JSON importer dry run, then --write; named the new bank 11-physics-2-owner-draft.json. Duplicate-ID replay is rejected.
- Every pre-existing bank file is byte-for-byte preserved; SHA-256 snapshots are in the companion JSON, including all Chapter 1 drafts and the existing 40 Chapter 2 development samples.
- Chapter 2 now has **60 drafts** (10 Easy,20 Medium,30 Hard), **40 separate development samples**, **0 approved eligible questions**. Total records 100; samples are not approved student questions.

## Findings

- **49 distinct imported records have content/difficulty/repetition flags** (overlapping categories; see each record). All 60 still need qualified academic review.
- No incorrect numerical keys, invalid physical dimensions, or multiple correct options were found in the supplied 60 on their stated idealized models. This is an assistant review, not an academic certification.
- **12 Medium questions** appear Easy: 003,004,006,007,008,009,012,014,015,016,018,019. Most are direct single-formula/area substitutions.
- **29 Hard questions** warrant downgrade or substantial replacement. H016 is a plausible Hard candidate because it requires two separate reversal checks; it is still a draft. Several others are respectable moderate questions, but computational length alone does not establish Hard difficulty.
- **11 semantic/template groups** below; 4 contain repetition within the incoming bank, 9 touch development samples (some overlap). A shared broad topic alone was not treated as a duplicate.
- Zero exact normalized-stem duplicates across the incoming and existing banks. Semantic near-duplicates still exist despite this lexical result.
- Source answer positions are uneven; the imbalance is a bank-level issue and is not counted as 60 separate content flags. No answer was altered to force balance.

| Difficulty |   A |   B |   C |   D |
| ---------- | --: | --: | --: | --: |
| Easy       |   3 |   4 |   3 |   0 |
| Medium     |   1 |   6 |  11 |   2 |
| Hard       |  10 |   8 |   9 |   3 |

Before approval, reorder options using a reproducible permutation, update keys, remove answer-letter references in explanations, and rerun answer-content/scoring tests. Aim for near-balanced positions across the final reviewed set; do not change the actual mathematical answer.

## Semantic repetition dispositions

### D01 — semantic duplicate

`GNO-PHY11-C02-E-008`, `motion11-07`. Signed v-t area asks the same quantity in different wording.

Recommendation: retain a genuinely distinct learning objective, or replace the incoming draft. Existing sample/approved data is not edited.

### D02 — numerical template near-duplicate

`GNO-PHY11-C02-E-004`, `motion11-12`. Single substitution in v=u+at; only parameters differ.

Recommendation: retain a genuinely distinct learning objective, or replace the incoming draft. Existing sample/approved data is not edited.

### D03 — numerical template near-duplicate

`GNO-PHY11-C02-E-009`, `motion11-38`. Endpoint velocities to constant acceleration; only parameters differ.

Recommendation: retain a genuinely distinct learning objective, or replace the incoming draft. Existing sample/approved data is not edited.

### D04 — numerical template near-duplicate

`GNO-PHY11-C02-E-007`, `motion11-15`. Dropped-from-rest displacement; only fall duration differs.

Recommendation: retain a genuinely distinct learning objective, or replace the incoming draft. Existing sample/approved data is not edited.

### D05 — numerical template near-duplicate

`GNO-PHY11-C02-E-002`, `motion11-36`. Two opposite legs and sum of their lengths; numeric substitution.

Recommendation: retain a genuinely distinct learning objective, or replace the incoming draft. Existing sample/approved data is not edited.

### D06 — numerical template near-duplicate

`GNO-PHY11-C02-M-001`, `motion11-22`. Equal-distance two-speed harmonic mean with different speeds.

Recommendation: retain a genuinely distinct learning objective, or replace the incoming draft. Existing sample/approved data is not edited.

### D07 — special-case near-duplicate

`GNO-PHY11-C02-M-008`, `GNO-PHY11-C02-M-016`, `motion11-30`. Distance in nth second under constant acceleration; free fall is a specialization.

Recommendation: retain a genuinely distinct learning objective, or replace the incoming draft. Existing sample/approved data is not edited.

### D08 — solving-structure near-duplicate

`GNO-PHY11-C02-M-010`, `GNO-PHY11-C02-M-017`, `GNO-PHY11-C02-H-022`, `motion11-21`. Constant acceleration, one interior velocity zero, split path there; H022 adds averaging.

Recommendation: retain a genuinely distinct learning objective, or replace the incoming draft. Existing sample/approved data is not edited.

### D09 — scaled/shifted polynomial near-duplicate

`GNO-PHY11-C02-H-001`, `GNO-PHY11-C02-H-003`, `GNO-PHY11-C02-H-024`. H001 position is exactly 3 times an antiderivative of H024 velocity. H003 uses the same cubic/two-stationary-point path method with shifted roots.

Recommendation: retain a genuinely distinct learning objective, or replace the incoming draft. Existing sample/approved data is not edited.

### D10 — numerical template near-duplicate

`GNO-PHY11-C02-H-012`, `GNO-PHY11-C02-H-029`. Final interval of free fall as fraction of total height; same squared-time ratio.

Recommendation: retain a genuinely distinct learning objective, or replace the incoming draft. Existing sample/approved data is not edited.

### D11 — numerical template near-duplicate

`GNO-PHY11-C02-H-010`, `motion11-23`. Accelerated pursuer versus constant-speed leader with an initial gap; same quadratic model.

Recommendation: retain a genuinely distinct learning objective, or replace the incoming draft. Existing sample/approved data is not edited.

The lexical screen uses lowercased Unicode word tokens, common stop-word removal and Jaccard >= 0.55. It found six pairs; their individual dispositions are in the JSON. It is a triage tool, not a semantic proof. E006 versus motion11-40 (direction versus speed magnitude), M011 versus single-stage questions, and H016 versus a single reversal are related but not duplicates.

## Shared wording and units review

Use an introductory ideal-motion convention for all gravity questions: constant stated g, negligible drag, and validity only before ground contact. Explicitly verify this in E007,M007,M016,H004,H008,H012,H020,H025,H029. H008 includes enough height; H025 meets at 19.6875 m before impact. M019 is exactly 2 km under the model, so “approximate” is unnecessary. M008 uses a shorthand nth-second formula: write u(1 s)+(a/2)(2n-1)(1 s)² on editorial revision so the dimensions of distance are explicit. Polynomial laws use numerical t in seconds and x in metres; coefficients carry the required dimensions. H017 should typeset 5+(sqrt(65))/2 clearly in its distractor. H013 has a negative-speed distractor: replace with a plausible nonnegative speed on revision. H027 topic should describe accelerated relative motion rather than braking. No diagrams or official PYQ claims were added.

## Question-by-question record

Each check below independently recomputes the quantity or establishes the conceptual result. Full original wording/options/solution are included so the reviewer need not find the ZIP. Replacement briefs are **proposals only**, not ready-to-use solved questions. They require a fresh four-option draft and independent calculation before any substitution. No unreviewed replacement is silently published.

### GNO-PHY11-C02-E-001 — Easy

**Topic:** Distance and displacement

A walker moves 9 m to the right and then 4 m to the left along a line. What is the net displacement?

A. 5 m right
B. 13 m right
C. 5 m left
D. 13 m left

**Supplied key:** A — 5 m right

**Supplied explanation:** Taking right as positive, displacement = 9 - 4 = +5 m, i.e., 5 m right.

**Independent recalculation:** Net displacement 9-4 = +5 m; distance 13 m is a different quantity.

**Findings:** No answer-key or solution-calculation error found on the stated ideal model; unique correct option on inspection. Suitable NCERT fundamental.

**Content flags:** None identified beyond universal pending human review.

**Proposed original replacement brief:** Retain provisionally; qualified reviewer must confirm wording, distractors and difficulty.

**Remaining review:** Confirm prerequisites, difficulty, uniqueness, physical assumptions and distractors. Status remains draft.

- [ ] Qualified reviewer approves this exact record (record SHA-256 in companion JSON).
- [ ] Any revision is solved and checked independently; review metadata refers to the revised record hash.

### GNO-PHY11-C02-E-002 — Easy

**Topic:** Distance and displacement

A cyclist goes 6 m east and then 8 m west on a straight road. What is the total distance travelled?

A. 2 m
B. 14 m
C. 8 m
D. 6 m

**Supplied key:** B — 14 m

**Supplied explanation:** Distance adds actual path lengths regardless of direction: 6 + 8 = 14 m.

**Independent recalculation:** Path length 6+8 = 14 m, not signed displacement -2 m.

**Findings:** No answer-key or solution-calculation error found on the stated ideal model; unique correct option on inspection. Suitable NCERT fundamental.

**Content flags:** near-duplicate/semantic repetition: D05

**Proposed original replacement brief:** Ask the necessary relation between distance and displacement for any straight-line trip, including equality conditions; use one conceptual distinction rather than another two-leg sum.

**Remaining review:** Confirm prerequisites, difficulty, uniqueness, physical assumptions and distractors. Status remains draft.

- [ ] Qualified reviewer approves this exact record (record SHA-256 in companion JSON).
- [ ] Any revision is solved and checked independently; review metadata refers to the revised record hash.

### GNO-PHY11-C02-E-003 — Easy

**Topic:** SI units

Which is the SI unit of acceleration?

A. m/s
B. m/s²
C. m²/s
D. s/m

**Supplied key:** B — m/s²

**Supplied explanation:** Acceleration is change of velocity per time, so its SI unit is (m/s)/s = m/s².

**Independent recalculation:** [a]=[v]/[t]=(m/s)/s=m/s². Other dimensions differ.

**Findings:** No answer-key or solution-calculation error found on the stated ideal model; unique correct option on inspection. Suitable NCERT fundamental.

**Content flags:** None identified beyond universal pending human review.

**Proposed original replacement brief:** Retain provisionally; qualified reviewer must confirm wording, distractors and difficulty.

**Remaining review:** Confirm prerequisites, difficulty, uniqueness, physical assumptions and distractors. Status remains draft.

- [ ] Qualified reviewer approves this exact record (record SHA-256 in companion JSON).
- [ ] Any revision is solved and checked independently; review metadata refers to the revised record hash.

### GNO-PHY11-C02-E-004 — Easy

**Topic:** Uniform acceleration

A body has initial velocity 2 m/s and accelerates uniformly at 3 m/s² for 4 s. Its final velocity is:

A. 10 m/s
B. 12 m/s
C. 14 m/s
D. 16 m/s

**Supplied key:** C — 14 m/s

**Supplied explanation:** v = u + at = 2 + 3 × 4 = 14 m/s.

**Independent recalculation:** v=u+at=2+3(4)=14 m/s.

**Findings:** No answer-key or solution-calculation error found on the stated ideal model; unique correct option on inspection. Suitable NCERT fundamental.

**Content flags:** near-duplicate/semantic repetition: D02

**Proposed original replacement brief:** Ask which quantity the slope of a straight velocity-time graph represents, with dimensional distractors; avoid another u+at substitution.

**Remaining review:** Confirm prerequisites, difficulty, uniqueness, physical assumptions and distractors. Status remains draft.

- [ ] Qualified reviewer approves this exact record (record SHA-256 in companion JSON).
- [ ] Any revision is solved and checked independently; review metadata refers to the revised record hash.

### GNO-PHY11-C02-E-005 — Easy

**Topic:** Position-time graph

A horizontal straight line on a position-time graph indicates:

A. constant nonzero acceleration
B. increasing velocity
C. object at rest
D. constant negative velocity

**Supplied key:** C — object at rest

**Supplied explanation:** A horizontal x–t graph has zero slope, so velocity dx/dt = 0.

**Independent recalculation:** A horizontal x-t line has slope dx/dt=0 throughout the interval.

**Findings:** No answer-key or solution-calculation error found on the stated ideal model; unique correct option on inspection. Suitable NCERT fundamental.

**Content flags:** None identified beyond universal pending human review.

**Proposed original replacement brief:** Retain provisionally; qualified reviewer must confirm wording, distractors and difficulty.

**Remaining review:** Confirm prerequisites, difficulty, uniqueness, physical assumptions and distractors. Status remains draft.

- [ ] Qualified reviewer approves this exact record (record SHA-256 in companion JSON).
- [ ] Any revision is solved and checked independently; review metadata refers to the revised record hash.

### GNO-PHY11-C02-E-006 — Easy

**Topic:** Velocity sign

If the velocity of a particle on the x-axis is −7 m/s, it moves:

A. towards negative x
B. towards positive x
C. with negative speed
D. with zero acceleration necessarily

**Supplied key:** A — towards negative x

**Supplied explanation:** The minus sign specifies motion in the negative x-direction. Speed remains positive (7 m/s).

**Independent recalculation:** v=-7 m/s points toward negative x; speed is +7 m/s; acceleration is unspecified.

**Findings:** No answer-key or solution-calculation error found on the stated ideal model; unique correct option on inspection. Suitable NCERT fundamental.

**Content flags:** None identified beyond universal pending human review.

**Proposed original replacement brief:** Retain provisionally; qualified reviewer must confirm wording, distractors and difficulty.

**Remaining review:** Confirm prerequisites, difficulty, uniqueness, physical assumptions and distractors. Status remains draft.

- [ ] Qualified reviewer approves this exact record (record SHA-256 in companion JSON).
- [ ] Any revision is solved and checked independently; review metadata refers to the revised record hash.

### GNO-PHY11-C02-E-007 — Easy

**Topic:** Free fall

An object is released from rest. Taking g = 10 m/s², how far does it fall in 2 s?

A. 10 m
B. 15 m
C. 20 m
D. 40 m

**Supplied key:** C — 20 m

**Supplied explanation:** s = ut + ½gt² = 0 + ½ × 10 × 2² = 20 m.

**Independent recalculation:** s=gt²/2=10(2²)/2=20 m, in ideal free fall before ground contact.

**Findings:** No answer-key or solution-calculation error found on the stated ideal model; unique correct option on inspection. Suitable NCERT fundamental.

**Content flags:** near-duplicate/semantic repetition: D04

**Proposed original replacement brief:** Ask whether equal successive time intervals in ideal free fall cover equal distances, and explain increasing speed; avoid another dropped-body displacement calculation.

**Remaining review:** Confirm prerequisites, difficulty, uniqueness, physical assumptions and distractors. Status remains draft.

- [ ] Qualified reviewer approves this exact record (record SHA-256 in companion JSON).
- [ ] Any revision is solved and checked independently; review metadata refers to the revised record hash.

### GNO-PHY11-C02-E-008 — Easy

**Topic:** Velocity-time graph

The signed area under a velocity–time graph gives:

A. acceleration
B. displacement
C. instantaneous speed
D. jerk

**Supplied key:** B — displacement

**Supplied explanation:** Displacement is the integral of velocity over time, represented by signed area under the v–t curve.

**Independent recalculation:** Signed velocity-time area is integral v dt = displacement; absolute area gives distance.

**Findings:** No answer-key or solution-calculation error found on the stated ideal model; unique correct option on inspection. Suitable NCERT fundamental.

**Content flags:** near-duplicate/semantic repetition: D01

**Proposed original replacement brief:** Ask what the intercept of a position-time graph represents, with position/velocity/acceleration/distance choices; this avoids repeating the existing area question.

**Remaining review:** Confirm prerequisites, difficulty, uniqueness, physical assumptions and distractors. Status remains draft.

- [ ] Qualified reviewer approves this exact record (record SHA-256 in companion JSON).
- [ ] Any revision is solved and checked independently; review metadata refers to the revised record hash.

### GNO-PHY11-C02-E-009 — Easy

**Topic:** Uniform acceleration

A vehicle slows from 24 m/s to 8 m/s in 4 s at constant acceleration. Find its acceleration.

A. −4 m/s²
B. +4 m/s²
C. −8 m/s²
D. +8 m/s²

**Supplied key:** A — −4 m/s²

**Supplied explanation:** a = (v - u)/t = (8 - 24)/4 = −4 m/s².

**Independent recalculation:** a=(8-24)/4=-4 m/s². Deceleration does not imply negative speed.

**Findings:** No answer-key or solution-calculation error found on the stated ideal model; unique correct option on inspection. Suitable NCERT fundamental.

**Content flags:** near-duplicate/semantic repetition: D03

**Proposed original replacement brief:** Ask for the sign of acceleration when a left-moving particle is slowing down; specify +x right, and distinguish acceleration from speed.

**Remaining review:** Confirm prerequisites, difficulty, uniqueness, physical assumptions and distractors. Status remains draft.

- [ ] Qualified reviewer approves this exact record (record SHA-256 in companion JSON).
- [ ] Any revision is solved and checked independently; review metadata refers to the revised record hash.

### GNO-PHY11-C02-E-010 — Easy

**Topic:** Vertical motion

At the highest point of a ball thrown vertically upward (ignoring air resistance), which statement is true?

A. velocity and acceleration are both zero
B. velocity is zero, acceleration is downward
C. velocity is upward, acceleration zero
D. velocity is downward, acceleration upward

**Supplied key:** B — velocity is zero, acceleration is downward

**Supplied explanation:** Instantaneous velocity is zero at the top, but gravitational acceleration g still points downward.

**Independent recalculation:** At the apex v=0 instantaneously; a=-g remains nonzero, with upward positive.

**Findings:** No answer-key or solution-calculation error found on the stated ideal model; unique correct option on inspection. Suitable NCERT fundamental.

**Content flags:** None identified beyond universal pending human review.

**Proposed original replacement brief:** Retain provisionally; qualified reviewer must confirm wording, distractors and difficulty.

**Remaining review:** Confirm prerequisites, difficulty, uniqueness, physical assumptions and distractors. Status remains draft.

- [ ] Qualified reviewer approves this exact record (record SHA-256 in companion JSON).
- [ ] Any revision is solved and checked independently; review metadata refers to the revised record hash.

### GNO-PHY11-C02-M-001 — Medium

**Topic:** Average speed

A vehicle covers two equal-distance sections at 12 m/s and 18 m/s. Find its average speed.

A. 15 m/s
B. 14.4 m/s
C. 16 m/s
D. 13.5 m/s

**Supplied key:** B — 14.4 m/s

**Supplied explanation:** For equal distances, average speed = 2v₁v₂/(v₁+v₂) = 2×12×18/30 = 14.4 m/s.

**Independent recalculation:** For two equal lengths d: time=d/12+d/18=5d/36; speed=2d/(5d/36)=14.4 m/s.

**Findings:** No answer-key or solution-calculation error found on the stated ideal model; unique correct option on inspection. Provisional multi-step Medium fit.

**Content flags:** near-duplicate/semantic repetition: D06

**Proposed original replacement brief:** Use two unequal-distance legs and a fixed stop; ask for the speed required on the second leg to meet a specified overall average. Include the stop in elapsed time.

**Remaining review:** Confirm prerequisites, difficulty, uniqueness, physical assumptions and distractors. Status remains draft.

- [ ] Qualified reviewer approves this exact record (record SHA-256 in companion JSON).
- [ ] Any revision is solved and checked independently; review metadata refers to the revised record hash.

### GNO-PHY11-C02-M-002 — Medium

**Topic:** Piecewise motion

A car starts from rest, accelerates at 2 m/s² for 6 s, then travels at the attained constant speed for 4 s. Total distance?

A. 72 m
B. 80 m
C. 84 m
D. 96 m

**Supplied key:** C — 84 m

**Supplied explanation:** First phase: s₁ = ½×2×6² = 36 m and v = 12 m/s. Second: s₂ = 12×4 = 48 m. Total 84 m.

**Independent recalculation:** Phase 1 gives s=2(6²)/2=36 m and v=12 m/s; phase 2 gives 48 m; total 84 m.

**Findings:** No answer-key or solution-calculation error found on the stated ideal model; unique correct option on inspection. Provisional multi-step Medium fit.

**Content flags:** None identified beyond universal pending human review.

**Proposed original replacement brief:** Retain provisionally; qualified reviewer must confirm wording, distractors and difficulty.

**Remaining review:** Confirm prerequisites, difficulty, uniqueness, physical assumptions and distractors. Status remains draft.

- [ ] Qualified reviewer approves this exact record (record SHA-256 in companion JSON).
- [ ] Any revision is solved and checked independently; review metadata refers to the revised record hash.

### GNO-PHY11-C02-M-003 — Medium

**Topic:** Variable velocity

A particle moves on a line with v(t) = 5 + 3t (m/s). Its displacement from t = 0 to 4 s is:

A. 32 m
B. 36 m
C. 40 m
D. 44 m

**Supplied key:** D — 44 m

**Supplied explanation:** Δx = ∫₀⁴(5+3t)dt = [5t + 1.5t²]₀⁴ = 20+24 = 44 m.

**Independent recalculation:** Integral of (5+3t) from 0 to 4 is 5(4)+3(4²)/2=44 m.

**Findings:** No answer-key or solution-calculation error found on the stated ideal model; unique correct option on inspection. Needs classification revision or replacement.

**Content flags:** difficulty: likely Easy rather than required moderate multi-step Medium

**Proposed original replacement brief:** Specify a linear v(t) with a zero inside the interval; ask for distance AND average velocity and require identifying the reversal before integrating.

**Remaining review:** Confirm prerequisites, difficulty, uniqueness, physical assumptions and distractors. Status remains draft.

- [ ] Qualified reviewer approves this exact record (record SHA-256 in companion JSON).
- [ ] Any revision is solved and checked independently; review metadata refers to the revised record hash.

### GNO-PHY11-C02-M-004 — Medium

**Topic:** Stopping distance

A vehicle moving at 20 m/s brakes with constant acceleration −4 m/s². How far does it travel before stopping?

A. 40 m
B. 50 m
C. 60 m
D. 80 m

**Supplied key:** B — 50 m

**Supplied explanation:** Using v² = u² + 2as with v = 0: 0 = 400 − 8s, so s = 50 m.

**Independent recalculation:** Stopping time=20/4=5 s; triangular v-t area=20(5)/2=50 m.

**Findings:** No answer-key or solution-calculation error found on the stated ideal model; unique correct option on inspection. Needs classification revision or replacement.

**Content flags:** difficulty: likely Easy rather than required moderate multi-step Medium

**Proposed original replacement brief:** Give a total stopping distance that includes a measured reaction interval; infer the constant braking magnitude, subtracting reaction distance first.

**Remaining review:** Confirm prerequisites, difficulty, uniqueness, physical assumptions and distractors. Status remains draft.

- [ ] Qualified reviewer approves this exact record (record SHA-256 in companion JSON).
- [ ] Any revision is solved and checked independently; review metadata refers to the revised record hash.

### GNO-PHY11-C02-M-005 — Medium

**Topic:** Average velocity

Position is x(t) = 2t² − 3t + 4 metres. Average velocity from t = 1 s to 3 s equals:

A. 3 m/s
B. 4 m/s
C. 5 m/s
D. 6 m/s

**Supplied key:** C — 5 m/s

**Supplied explanation:** x(3)=18−9+4=13; x(1)=2−3+4=3. Average velocity=(13−3)/(3−1)=5 m/s.

**Independent recalculation:** x(1)=3 m and x(3)=13 m; average velocity=(13-3)/2=5 m/s.

**Findings:** No answer-key or solution-calculation error found on the stated ideal model; unique correct option on inspection. Provisional multi-step Medium fit.

**Content flags:** None identified beyond universal pending human review.

**Proposed original replacement brief:** Retain provisionally; qualified reviewer must confirm wording, distractors and difficulty.

**Remaining review:** Confirm prerequisites, difficulty, uniqueness, physical assumptions and distractors. Status remains draft.

- [ ] Qualified reviewer approves this exact record (record SHA-256 in companion JSON).
- [ ] Any revision is solved and checked independently; review metadata refers to the revised record hash.

### GNO-PHY11-C02-M-006 — Medium

**Topic:** Graph area

A triangular positive velocity–time graph rises from 0 to 12 m/s in 3 s and falls to 0 at t = 6 s. Displacement is:

A. 18 m
B. 24 m
C. 36 m
D. 72 m

**Supplied key:** C — 36 m

**Supplied explanation:** Signed area of the triangle = ½×base×height = ½×6×12 = 36 m.

**Independent recalculation:** Positive triangular area=6(12)/2=36 m. Peak location does not change this area.

**Findings:** No answer-key or solution-calculation error found on the stated ideal model; unique correct option on inspection. Needs classification revision or replacement.

**Content flags:** difficulty: likely Easy rather than required moderate multi-step Medium

**Proposed original replacement brief:** Specify a trapezoidal velocity-time graph with a negative final section; ask separately for average speed and average velocity.

**Remaining review:** Confirm prerequisites, difficulty, uniqueness, physical assumptions and distractors. Status remains draft.

- [ ] Qualified reviewer approves this exact record (record SHA-256 in companion JSON).
- [ ] Any revision is solved and checked independently; review metadata refers to the revised record hash.

### GNO-PHY11-C02-M-007 — Medium

**Topic:** Vertical motion

A stone is projected vertically upward at 30 m/s. With g = 10 m/s², what is its displacement after 4 s?

A. 20 m upward
B. 40 m upward
C. 40 m downward
D. 80 m upward

**Supplied key:** B — 40 m upward

**Supplied explanation:** Taking upward positive: y=ut−½gt²=30×4−5×16=40 m upward.

**Independent recalculation:** y=30(4)-10(4²)/2=+40 m; speed has already reversed but displacement is upward.

**Findings:** No answer-key or solution-calculation error found on the stated ideal model; unique correct option on inspection. Needs classification revision or replacement.

**Content flags:** difficulty: likely Easy rather than required moderate multi-step Medium

**Proposed original replacement brief:** Give two measured times at the same height, a supplied g and a launch level; infer launch speed and height before asking the distance travelled between the measurements.

**Remaining review:** Confirm prerequisites, difficulty, uniqueness, physical assumptions and distractors. Status remains draft.

- [ ] Qualified reviewer approves this exact record (record SHA-256 in companion JSON).
- [ ] Any revision is solved and checked independently; review metadata refers to the revised record hash.

### GNO-PHY11-C02-M-008 — Medium

**Topic:** Distance in nth second

A particle has initial velocity 3 m/s and constant acceleration 2 m/s² in the same direction. Distance travelled during the fifth second is:

A. 10 m
B. 11 m
C. 12 m
D. 13 m

**Supplied key:** C — 12 m

**Supplied explanation:** Distance in nth second is u + (a/2)(2n−1). For n=5: 3+1×9=12 m.

**Independent recalculation:** x(5)-x(4)=[3t+t²] from 4 to 5=3+25-16=12 m; velocity remains positive.

**Findings:** No answer-key or solution-calculation error found on the stated ideal model; unique correct option on inspection. Needs classification revision or replacement.

**Content flags:** near-duplicate/semantic repetition: D07; difficulty: likely Easy rather than required moderate multi-step Medium

**Proposed original replacement brief:** Give displacement in two nonadjacent one-second intervals; infer initial velocity and acceleration and ask whether a third interval contains a reversal.

**Remaining review:** Confirm prerequisites, difficulty, uniqueness, physical assumptions and distractors. Status remains draft.

- [ ] Qualified reviewer approves this exact record (record SHA-256 in companion JSON).
- [ ] Any revision is solved and checked independently; review metadata refers to the revised record hash.

### GNO-PHY11-C02-M-009 — Medium

**Topic:** Average speed

A train travels for equal time intervals at 10 m/s, 20 m/s and 30 m/s, all in the same direction. Average speed is:

A. 15 m/s
B. 18 m/s
C. 20 m/s
D. 24 m/s

**Supplied key:** C — 20 m/s

**Supplied explanation:** For equal time periods, average speed is the arithmetic mean: (10+20+30)/3 = 20 m/s.

**Independent recalculation:** With common time tau, distance=(10+20+30)tau; speed=60tau/(3tau)=20 m/s.

**Findings:** No answer-key or solution-calculation error found on the stated ideal model; unique correct option on inspection. Needs classification revision or replacement.

**Content flags:** difficulty: likely Easy rather than required moderate multi-step Medium

**Proposed original replacement brief:** Use unequal time intervals with one signed negative velocity; ask for both average speed and average velocity. Do not just increase the number of equally weighted speeds.

**Remaining review:** Confirm prerequisites, difficulty, uniqueness, physical assumptions and distractors. Status remains draft.

- [ ] Qualified reviewer approves this exact record (record SHA-256 in companion JSON).
- [ ] Any revision is solved and checked independently; review metadata refers to the revised record hash.

### GNO-PHY11-C02-M-010 — Medium

**Topic:** Distance versus displacement

A particle has position x(t)=t²−6t+8 metres for 0≤t≤5 s. Total distance travelled equals:

A. 4 m
B. 9 m
C. 13 m
D. 17 m

**Supplied key:** C — 13 m

**Supplied explanation:** v=2t−6 changes sign at t=3. x(0)=8, x(3)=−1, x(5)=3. Distance = |−1−8|+|3−(−1)|=9+4=13 m.

**Independent recalculation:** v=2t-6 vanishes at 3 s; x(0)=8, x(3)=-1, x(5)=3; path=9+4=13 m.

**Findings:** No answer-key or solution-calculation error found on the stated ideal model; unique correct option on inspection. Provisional multi-step Medium fit.

**Content flags:** near-duplicate/semantic repetition: D08

**Proposed original replacement brief:** Use a two-stage acceleration with a reversal only in the second stage and ask the time spent moving backward, rather than repeating a quadratic path-length calculation.

**Remaining review:** Confirm prerequisites, difficulty, uniqueness, physical assumptions and distractors. Status remains draft.

- [ ] Qualified reviewer approves this exact record (record SHA-256 in companion JSON).
- [ ] Any revision is solved and checked independently; review metadata refers to the revised record hash.

### GNO-PHY11-C02-M-011 — Medium

**Topic:** Piecewise acceleration

A body starts from rest, accelerates at 4 m/s² for 3 s, then accelerates at −2 m/s² for 5 s. Final velocity is:

A. 0 m/s
B. 2 m/s
C. 4 m/s
D. −2 m/s

**Supplied key:** B — 2 m/s

**Supplied explanation:** Velocity after first part = 0+4×3=12 m/s. After second part: 12−2×5=2 m/s.

**Independent recalculation:** v=0+4(3)-2(5)=2 m/s; both intervals have forward motion, including the endpoint.

**Findings:** No answer-key or solution-calculation error found on the stated ideal model; unique correct option on inspection. Provisional multi-step Medium fit.

**Content flags:** None identified beyond universal pending human review.

**Proposed original replacement brief:** Retain provisionally; qualified reviewer must confirm wording, distractors and difficulty.

**Remaining review:** Confirm prerequisites, difficulty, uniqueness, physical assumptions and distractors. Status remains draft.

- [ ] Qualified reviewer approves this exact record (record SHA-256 in companion JSON).
- [ ] Any revision is solved and checked independently; review metadata refers to the revised record hash.

### GNO-PHY11-C02-M-012 — Medium

**Topic:** Signed area

Velocity is +4 m/s from t=0 to 4 s and −2 m/s from t=4 to 6 s. Net displacement is:

A. 12 m
B. 16 m
C. 20 m
D. −12 m

**Supplied key:** A — 12 m

**Supplied explanation:** Displacement = (+4)(4) + (−2)(2) = 16−4 = 12 m. Distance would be 20 m.

**Independent recalculation:** Integral v dt=4(4)-2(2)=+12 m; total distance would be 20 m.

**Findings:** No answer-key or solution-calculation error found on the stated ideal model; unique correct option on inspection. Needs classification revision or replacement.

**Content flags:** difficulty: likely Easy rather than required moderate multi-step Medium

**Proposed original replacement brief:** Specify signed displacements and total path over a two-speed journey; solve the durations and verify their positivity.

**Remaining review:** Confirm prerequisites, difficulty, uniqueness, physical assumptions and distractors. Status remains draft.

- [ ] Qualified reviewer approves this exact record (record SHA-256 in companion JSON).
- [ ] Any revision is solved and checked independently; review metadata refers to the revised record hash.

### GNO-PHY11-C02-M-013 — Medium

**Topic:** Unit conversion

A 180 m-long train moving at 90 km/h completely crosses a 120 m-long platform. What time does the train take to cross the platform?

A. 7.2 s
B. 10 s
C. 12 s
D. 15 s

**Supplied key:** C — 12 s

**Supplied explanation:** Train must move its own length plus platform length: 180+120=300 m. Speed=90×5/18=25 m/s. Time=300/25=12 s.

**Independent recalculation:** 90 km/h=25 m/s; required translation=180+120=300 m; time=12 s.

**Findings:** No answer-key or solution-calculation error found on the stated ideal model; unique correct option on inspection. Provisional multi-step Medium fit.

**Content flags:** None identified beyond universal pending human review.

**Proposed original replacement brief:** Retain provisionally; qualified reviewer must confirm wording, distractors and difficulty.

**Remaining review:** Confirm prerequisites, difficulty, uniqueness, physical assumptions and distractors. Status remains draft.

- [ ] Qualified reviewer approves this exact record (record SHA-256 in companion JSON).
- [ ] Any revision is solved and checked independently; review metadata refers to the revised record hash.

### GNO-PHY11-C02-M-014 — Medium

**Topic:** Relative motion

Two cars travel in the same direction at 30 m/s and 20 m/s. The faster car starts 100 m behind. After how long will it catch the slower car?

A. 5 s
B. 8 s
C. 10 s
D. 20 s

**Supplied key:** C — 10 s

**Supplied explanation:** Relative speed = 30−20=10 m/s. Catch-up time = separation/relative speed =100/10=10 s.

**Independent recalculation:** Relative speed=30-20=10 m/s; 100 m gap closes in 10 s.

**Findings:** No answer-key or solution-calculation error found on the stated ideal model; unique correct option on inspection. Needs classification revision or replacement.

**Content flags:** difficulty: likely Easy rather than required moderate multi-step Medium

**Proposed original replacement brief:** Give two successive gap measurements between uniformly moving vehicles and a later speed change; infer the missing speed and eventual catch time.

**Remaining review:** Confirm prerequisites, difficulty, uniqueness, physical assumptions and distractors. Status remains draft.

- [ ] Qualified reviewer approves this exact record (record SHA-256 in companion JSON).
- [ ] Any revision is solved and checked independently; review metadata refers to the revised record hash.

### GNO-PHY11-C02-M-015 — Medium

**Topic:** Uniform acceleration

A body speeds up uniformly from 8 m/s to 20 m/s while covering 84 m. Its acceleration is:

A. 1 m/s²
B. 2 m/s²
C. 3 m/s²
D. 4 m/s²

**Supplied key:** B — 2 m/s²

**Supplied explanation:** From v²−u²=2as: a=(400−64)/(2×84)=336/168=2 m/s².

**Independent recalculation:** a=(20²-8²)/(2(84))=336/168=2 m/s².

**Findings:** No answer-key or solution-calculation error found on the stated ideal model; unique correct option on inspection. Needs classification revision or replacement.

**Content flags:** difficulty: likely Easy rather than required moderate multi-step Medium

**Proposed original replacement brief:** Give two speed-distance measurements over adjacent intervals; infer uniform acceleration, then calculate the time for the second interval.

**Remaining review:** Confirm prerequisites, difficulty, uniqueness, physical assumptions and distractors. Status remains draft.

- [ ] Qualified reviewer approves this exact record (record SHA-256 in companion JSON).
- [ ] Any revision is solved and checked independently; review metadata refers to the revised record hash.

### GNO-PHY11-C02-M-016 — Medium

**Topic:** Free fall

An object is dropped from rest and falls freely for 3 s. Take g=10 m/s². Distance covered during the third second is:

A. 15 m
B. 20 m
C. 25 m
D. 35 m

**Supplied key:** C — 25 m

**Supplied explanation:** s(3)−s(2)=½g(3²−2²)=5(9−4)=25 m.

**Independent recalculation:** Free-fall path in [2,3] s is 5(3²-2²)=25 m, before any impact.

**Findings:** No answer-key or solution-calculation error found on the stated ideal model; unique correct option on inspection. Needs classification revision or replacement.

**Content flags:** near-duplicate/semantic repetition: D07; difficulty: likely Easy rather than required moderate multi-step Medium

**Proposed original replacement brief:** Infer the fall duration from the fraction of height covered in the final second, then calculate total height using supplied g.

**Remaining review:** Confirm prerequisites, difficulty, uniqueness, physical assumptions and distractors. Status remains draft.

- [ ] Qualified reviewer approves this exact record (record SHA-256 in companion JSON).
- [ ] Any revision is solved and checked independently; review metadata refers to the revised record hash.

### GNO-PHY11-C02-M-017 — Medium

**Topic:** Direction reversal

A particle has v(t)=12−4t m/s. How much total distance does it cover from t=0 to 5 s?

A. 10 m
B. 18 m
C. 22 m
D. 26 m

**Supplied key:** D — 26 m

**Supplied explanation:** v changes sign at t=3. Distance 0–3 s = area ½×3×12=18 m; 3–5 s = ½×2×8=8 m. Total 26 m.

**Independent recalculation:** v=0 at 3 s; positive triangular area=18 m, negative area magnitude=8 m; total 26 m.

**Findings:** No answer-key or solution-calculation error found on the stated ideal model; unique correct option on inspection. Provisional multi-step Medium fit.

**Content flags:** near-duplicate/semantic repetition: D08

**Proposed original replacement brief:** Give minimum position and two endpoint positions under constant acceleration; infer the reversal time and ask the interval average speed.

**Remaining review:** Confirm prerequisites, difficulty, uniqueness, physical assumptions and distractors. Status remains draft.

- [ ] Qualified reviewer approves this exact record (record SHA-256 in companion JSON).
- [ ] Any revision is solved and checked independently; review metadata refers to the revised record hash.

### GNO-PHY11-C02-M-018 — Medium

**Topic:** Acceleration-time graph

Acceleration is +2 m/s² for the first 4 s and −3 m/s² for the next 2 s. Change in velocity over all 6 s is:

A. −2 m/s
B. 0 m/s
C. +2 m/s
D. +14 m/s

**Supplied key:** C — +2 m/s

**Supplied explanation:** Δv = ∫a dt = (+2)(4)+(−3)(2)=8−6=+2 m/s.

**Independent recalculation:** Change in velocity=2(4)-3(2)=+2 m/s; initial velocity is unnecessary.

**Findings:** No answer-key or solution-calculation error found on the stated ideal model; unique correct option on inspection. Needs classification revision or replacement.

**Content flags:** difficulty: likely Easy rather than required moderate multi-step Medium

**Proposed original replacement brief:** Give an unknown-duration acceleration pulse followed by a known pulse; determine its duration from final velocity and then the total displacement.

**Remaining review:** Confirm prerequisites, difficulty, uniqueness, physical assumptions and distractors. Status remains draft.

- [ ] Qualified reviewer approves this exact record (record SHA-256 in companion JSON).
- [ ] Any revision is solved and checked independently; review metadata refers to the revised record hash.

### GNO-PHY11-C02-M-019 — Medium

**Topic:** Average speed and conversion

A scooter moves steadily at 60 km/h for 2 minutes. Approximate distance covered is:

A. 1 km
B. 1.5 km
C. 2 km
D. 3 km

**Supplied key:** C — 2 km

**Supplied explanation:** Time is 2/60 h. Distance = 60 km/h × (2/60 h) = 2 km.

**Independent recalculation:** 60 km/h times (2/60) h=2 km exactly under the stated steady-speed model.

**Findings:** No answer-key or solution-calculation error found on the stated ideal model; unique correct option on inspection. Needs classification revision or replacement.

**Content flags:** difficulty: likely Easy rather than required moderate multi-step Medium

**Proposed original replacement brief:** Give two different speed units and a timed stop over two legs; calculate overall average speed using total elapsed time.

**Remaining review:** Confirm prerequisites, difficulty, uniqueness, physical assumptions and distractors. Status remains draft.

- [ ] Qualified reviewer approves this exact record (record SHA-256 in companion JSON).
- [ ] Any revision is solved and checked independently; review metadata refers to the revised record hash.

### GNO-PHY11-C02-M-020 — Medium

**Topic:** Unequal time average

A bus travels for 20 s at 6 m/s and then 10 s at 15 m/s along the same direction. Its average velocity is:

A. 8 m/s
B. 9 m/s
C. 10.5 m/s
D. 12 m/s

**Supplied key:** B — 9 m/s

**Supplied explanation:** Total displacement = 6×20+15×10=270 m. Total time 30 s; average velocity=270/30=9 m/s.

**Independent recalculation:** Displacement=6(20)+15(10)=270 m; divide by 30 s to obtain 9 m/s.

**Findings:** No answer-key or solution-calculation error found on the stated ideal model; unique correct option on inspection. Provisional multi-step Medium fit.

**Content flags:** None identified beyond universal pending human review.

**Proposed original replacement brief:** Retain provisionally; qualified reviewer must confirm wording, distractors and difficulty.

**Remaining review:** Confirm prerequisites, difficulty, uniqueness, physical assumptions and distractors. Status remains draft.

- [ ] Qualified reviewer approves this exact record (record SHA-256 in companion JSON).
- [ ] Any revision is solved and checked independently; review metadata refers to the revised record hash.

### GNO-PHY11-C02-H-001 — Hard

**Topic:** Polynomial motion

A particle moves according to x(t)=t³−6t²+9t (metres). Its total distance travelled from 0 to 4 s is:

A. 4 m
B. 8 m
C. 12 m
D. 16 m

**Supplied key:** C — 12 m

**Supplied explanation:** v=3(t−1)(t−3), so reversals at 1 and 3 s. Positions x(0)=0, x(1)=4, x(3)=0, x(4)=4. Distance=4+4+4=12 m.

**Independent recalculation:** v=3(t-1)(t-3); x at times 0,1,3,4 is 0,4,0,4 m; sum absolute changes=12 m.

**Findings:** No answer-key or solution-calculation error found on the stated ideal model; unique correct option on inspection. Needs classification revision or replacement.

**Content flags:** near-duplicate/semantic repetition: D09; difficulty: likely Medium or below; insufficient evidence for challenging Hard as written

**Proposed original replacement brief:** Infer an unknown velocity scale in v=k(t-1)(t-3) from measured displacement, then determine distinct times at which cumulative distance reaches a specified threshold. Require interval checks, not only one integral.

**Remaining review:** Confirm prerequisites, difficulty, uniqueness, physical assumptions and distractors. Status remains draft.

- [ ] Qualified reviewer approves this exact record (record SHA-256 in companion JSON).
- [ ] Any revision is solved and checked independently; review metadata refers to the revised record hash.

### GNO-PHY11-C02-H-002 — Hard

**Topic:** Velocity reversal integral

Velocity is v(t)=6t−t² m/s. The total distance travelled during 0≤t≤8 s is:

A. 44 m
B. 52 m
C. 152/3 m
D. 64 m

**Supplied key:** C — 152/3 m

**Supplied explanation:** v=t(6−t) changes sign at t=6. Displacement 0–6 = [3t²−t³/3]₀⁶=36 m. From 6–8 it is −44/3 m, contributing +44/3 distance. Total 36+44/3=152/3 m.

**Independent recalculation:** v=t(6-t); primitive F=3t²-t³/3. F(0)=0,F(6)=36,F(8)=64/3; distance=36+(36-64/3)=152/3 m.

**Findings:** No answer-key or solution-calculation error found on the stated ideal model; unique correct option on inspection. Needs classification revision or replacement.

**Content flags:** difficulty: likely Medium or below; insufficient evidence for challenging Hard as written

**Proposed original replacement brief:** Infer a parameter in a quadratic velocity law from a measured average velocity and a stopping event, then calculate total path across both reversals on the physically admissible interval.

**Remaining review:** Confirm prerequisites, difficulty, uniqueness, physical assumptions and distractors. Status remains draft.

- [ ] Qualified reviewer approves this exact record (record SHA-256 in companion JSON).
- [ ] Any revision is solved and checked independently; review metadata refers to the revised record hash.

### GNO-PHY11-C02-H-003 — Hard

**Topic:** Polynomial motion

A particle has x(t)=t³−9t²+24t metres. Total distance between 0 and 6 s equals:

A. 36 m
B. 40 m
C. 44 m
D. 52 m

**Supplied key:** C — 44 m

**Supplied explanation:** v=3(t−2)(t−4), so turning at t=2,4. x(0)=0, x(2)=20, x(4)=16, x(6)=36. Distance =20+4+20=44 m.

**Independent recalculation:** v=3(t-2)(t-4); x at 0,2,4,6 s is 0,20,16,36 m; path=20+4+20=44 m.

**Findings:** No answer-key or solution-calculation error found on the stated ideal model; unique correct option on inspection. Needs classification revision or replacement.

**Content flags:** near-duplicate/semantic repetition: D09; difficulty: likely Medium or below; insufficient evidence for challenging Hard as written

**Proposed original replacement brief:** Use a piecewise jerk-limited motion: match velocity and acceleration at a switch, infer the switch time from a final constraint, and find the minimum total travel distance. Avoid another cubic position with two roots.

**Remaining review:** Confirm prerequisites, difficulty, uniqueness, physical assumptions and distractors. Status remains draft.

- [ ] Qualified reviewer approves this exact record (record SHA-256 in companion JSON).
- [ ] Any revision is solved and checked independently; review metadata refers to the revised record hash.

### GNO-PHY11-C02-H-004 — Hard

**Topic:** Vertical launch from height

A stone is thrown vertically upward at 30 m/s from a balcony 40 m above ground. Take g=10 m/s². Time until it hits the ground is:

A. 3+√17 s
B. 3+√13 s
C. 6+√17 s
D. √17−3 s

**Supplied key:** A — 3+√17 s

**Supplied explanation:** Ground height equation: 40+30t−5t²=0 ⇒ t²−6t−8=0. Positive root t=3+√17 s.

**Independent recalculation:** 40+30t-5t²=0 gives t=3±sqrt(17); only 3+sqrt(17) s is positive. Ignore drag.

**Findings:** No answer-key or solution-calculation error found on the stated ideal model; unique correct option on inspection. Needs classification revision or replacement.

**Content flags:** difficulty: likely Medium or below; insufficient evidence for challenging Hard as written

**Proposed original replacement brief:** Use a delayed second launch from the ground while the first is launched from a balcony; find the range of delays permitting an airborne meeting and check each ground-contact time.

**Remaining review:** Confirm prerequisites, difficulty, uniqueness, physical assumptions and distractors. Status remains draft.

- [ ] Qualified reviewer approves this exact record (record SHA-256 in companion JSON).
- [ ] Any revision is solved and checked independently; review metadata refers to the revised record hash.

### GNO-PHY11-C02-H-005 — Hard

**Topic:** Three-stage motion

A train starts from rest, accelerates at 2 m/s² for 5 s, cruises for 8 s, then brakes uniformly to rest over 5 s. Total distance is:

A. 105 m
B. 120 m
C. 130 m
D. 150 m

**Supplied key:** C — 130 m

**Supplied explanation:** Peak speed=2×5=10 m/s. Accelerating distance 25 m, cruise 80 m, braking distance ½(10+0)×5=25 m. Sum=130 m.

**Independent recalculation:** Peak speed 10 m/s; areas 25+80+25=130 m. Motion remains forward until stop.

**Findings:** No answer-key or solution-calculation error found on the stated ideal model; unique correct option on inspection. Needs classification revision or replacement.

**Content flags:** difficulty: likely Medium or below; insufficient evidence for challenging Hard as written

**Proposed original replacement brief:** Set acceleration and braking limits with a mandatory cruise distance; derive the minimum feasible travel time for a fixed route, distinguishing whether a cruise phase is possible.

**Remaining review:** Confirm prerequisites, difficulty, uniqueness, physical assumptions and distractors. Status remains draft.

- [ ] Qualified reviewer approves this exact record (record SHA-256 in companion JSON).
- [ ] Any revision is solved and checked independently; review metadata refers to the revised record hash.

### GNO-PHY11-C02-H-006 — Hard

**Topic:** Braking with reaction time

A driver travels at 25 m/s, takes 0.8 s to react, then brakes uniformly at 5 m/s². Total stopping distance is:

A. 62.5 m
B. 75 m
C. 82.5 m
D. 100 m

**Supplied key:** C — 82.5 m

**Supplied explanation:** Reaction distance 25×0.8=20 m. Braking distance u²/(2a)=625/10=62.5 m. Sum=82.5 m.

**Independent recalculation:** Reaction path 25(0.8)=20 m; brake path 25²/(2(5))=62.5 m; total 82.5 m.

**Findings:** No answer-key or solution-calculation error found on the stated ideal model; unique correct option on inspection. Needs classification revision or replacement.

**Content flags:** difficulty: likely Medium or below; insufficient evidence for challenging Hard as written

**Proposed original replacement brief:** Given a reaction-time interval and distance-dependent braking a=-k(1+x/L), derive the largest safe initial speed for a fixed obstacle distance; integrate v dv/dx and enforce a nonnegative braking distance.

**Remaining review:** Confirm prerequisites, difficulty, uniqueness, physical assumptions and distractors. Status remains draft.

- [ ] Qualified reviewer approves this exact record (record SHA-256 in companion JSON).
- [ ] Any revision is solved and checked independently; review metadata refers to the revised record hash.

### GNO-PHY11-C02-H-007 — Hard

**Topic:** Variable acceleration

A body initially moves at +2 m/s and has acceleration a(t)=6t−4 m/s². Displacement from t=0 to 2 s is:

A. 0 m
B. 4 m
C. 6 m
D. 8 m

**Supplied key:** B — 4 m

**Supplied explanation:** Integrate a: v=2+3t²−4t. Integrate v over 0–2: Δx=[2t+t³−2t²]₀²=4+8−8=4 m.

**Independent recalculation:** v=2+3t²-4t; integral from 0 to 2 is 4+8-8=4 m. In fact v has negative discriminant and remains positive.

**Findings:** No answer-key or solution-calculation error found on the stated ideal model; unique correct option on inspection. Needs classification revision or replacement.

**Content flags:** difficulty: likely Medium or below; insufficient evidence for challenging Hard as written

**Proposed original replacement brief:** Use a(t)=alpha t-beta with unknown parameters constrained by two signed displacements; solve them, locate all velocity zeros and calculate total distance on a third interval.

**Remaining review:** Confirm prerequisites, difficulty, uniqueness, physical assumptions and distractors. Status remains draft.

- [ ] Qualified reviewer approves this exact record (record SHA-256 in companion JSON).
- [ ] Any revision is solved and checked independently; review metadata refers to the revised record hash.

### GNO-PHY11-C02-H-008 — Hard

**Topic:** Comparative free fall

Two stones are dropped from the same point at least 130 m above the ground, at different times. The first has been falling for 3 s when the second is released. What is the separation 2 s after the second release (g=10 m/s²)?

A. 65 m
B. 75 m
C. 85 m
D. 105 m

**Supplied key:** D — 105 m

**Supplied explanation:** By then the first has fallen for 5 s: 5×25=125 m; the second for 2 s:5×4=20 m. Separation=125−20=105 m.

**Independent recalculation:** First stone falls for 5 s and second for 2 s: separation=5(25-4)=105 m. First falls 125 m, less than the stated minimum height 130 m.

**Findings:** No answer-key or solution-calculation error found on the stated ideal model; unique correct option on inspection. Needs classification revision or replacement.

**Content flags:** difficulty: likely Medium or below; insufficient evidence for challenging Hard as written

**Proposed original replacement brief:** Give delayed drops from two different heights and a rising observation platform; derive the time window during which both stones are above the platform before either impact, using all endpoint restrictions.

**Remaining review:** Confirm prerequisites, difficulty, uniqueness, physical assumptions and distractors. Status remains draft.

- [ ] Qualified reviewer approves this exact record (record SHA-256 in companion JSON).
- [ ] Any revision is solved and checked independently; review metadata refers to the revised record hash.

### GNO-PHY11-C02-H-009 — Hard

**Topic:** Velocity-time piecewise

A body has v=4t (m/s) from t=0 to 3 s and v=12−6(t−3) from t=3 to 6 s. Total distance over 6 s is:

A. 27 m
B. 30 m
C. 33 m
D. 36 m

**Supplied key:** C — 33 m

**Supplied explanation:** First segment area=½×3×12=18 m. Second v crosses 0 at t=5, positive area=½×2×12=12 m, negative magnitude=½×1×6=3 m. Total=33 m.

**Independent recalculation:** First segment path=18 m; next segment crosses v=0 at t=5 s, giving 12+3 m; total 33 m.

**Findings:** No answer-key or solution-calculation error found on the stated ideal model; unique correct option on inspection. Needs classification revision or replacement.

**Content flags:** difficulty: likely Medium or below; insufficient evidence for challenging Hard as written

**Proposed original replacement brief:** Use two vehicles with different continuous piecewise-linear velocity laws; count all meetings and determine minimum separation before the last switch, checking every interval and boundary.

**Remaining review:** Confirm prerequisites, difficulty, uniqueness, physical assumptions and distractors. Status remains draft.

- [ ] Qualified reviewer approves this exact record (record SHA-256 in companion JSON).
- [ ] Any revision is solved and checked independently; review metadata refers to the revised record hash.

### GNO-PHY11-C02-H-010 — Hard

**Topic:** Catch-up with acceleration

A car starts from rest and accelerates at 2 m/s². At the same instant, a bike 48 m ahead moves at constant 8 m/s. When does the car catch it?

A. 12 s
B. 8+4√7 s
C. 4+8√2 s
D. 4+4√7 s

**Supplied key:** A — 12 s

**Supplied explanation:** Set car displacement t² equal to 48+8t: t²−8t−48=0, so t=(8+√256)/2=12 s.

**Independent recalculation:** t²=48+8t gives roots 12,-4 s; first physical meeting is at 12 s.

**Findings:** No answer-key or solution-calculation error found on the stated ideal model; unique correct option on inspection. Needs classification revision or replacement.

**Content flags:** near-duplicate/semantic repetition: D11; difficulty: likely Medium or below; insufficient evidence for challenging Hard as written

**Proposed original replacement brief:** Use a leader that begins braking after a delay and a pursuer that accelerates only up to a speed cap; determine the first catch and reject roots belonging to the wrong motion phase.

**Remaining review:** Confirm prerequisites, difficulty, uniqueness, physical assumptions and distractors. Status remains draft.

- [ ] Qualified reviewer approves this exact record (record SHA-256 in companion JSON).
- [ ] Any revision is solved and checked independently; review metadata refers to the revised record hash.

### GNO-PHY11-C02-H-011 — Hard

**Topic:** Two-stage deceleration

A train moving at 30 m/s decelerates at 2 m/s² for 5 s, then at 4 m/s² until it stops. What total distance does it cover?

A. 125 m
B. 150 m
C. 175 m
D. 200 m

**Supplied key:** C — 175 m

**Supplied explanation:** Stage 1: speed drops from 30 to20 m/s, distance=(30+20)/2×5=125 m. Stage 2 stopping distance=20²/(2×4)=50 m. Total=175 m.

**Independent recalculation:** First interval ends at 20 m/s and covers (30+20)5/2=125 m; remaining brake path=20²/8=50 m; total 175 m.

**Findings:** No answer-key or solution-calculation error found on the stated ideal model; unique correct option on inspection. Needs classification revision or replacement.

**Content flags:** difficulty: likely Medium or below; insufficient evidence for challenging Hard as written

**Proposed original replacement brief:** Given total stopping time and distance for two unknown braking stages with a fixed acceleration ratio, solve for the switch speed and both stage durations and check feasibility.

**Remaining review:** Confirm prerequisites, difficulty, uniqueness, physical assumptions and distractors. Status remains draft.

- [ ] Qualified reviewer approves this exact record (record SHA-256 in companion JSON).
- [ ] Any revision is solved and checked independently; review metadata refers to the revised record hash.

### GNO-PHY11-C02-H-012 — Hard

**Topic:** Last second of free fall

A ball is dropped from rest and reaches the ground after 5 s. With g=10 m/s², what fraction of the total height is covered in the final 1 s?

A. 5/25
B. 7/25
C. 9/25
D. 11/25

**Supplied key:** C — 9/25

**Supplied explanation:** Distance in final second=½g(5²−4²)=5×9=45 m. Height=½g×5²=125 m. Fraction=45/125=9/25.

**Independent recalculation:** Final-second fall / total fall=(5²-4²)/5²=9/25; g cancels.

**Findings:** No answer-key or solution-calculation error found on the stated ideal model; unique correct option on inspection. Needs classification revision or replacement.

**Content flags:** near-duplicate/semantic repetition: D10; difficulty: likely Medium or below; insufficient evidence for challenging Hard as written

**Proposed original replacement brief:** Infer unknown release speed AND total fall time from distances in two final intervals; use independent equations, select physical roots, then recover height.

**Remaining review:** Confirm prerequisites, difficulty, uniqueness, physical assumptions and distractors. Status remains draft.

- [ ] Qualified reviewer approves this exact record (record SHA-256 in companion JSON).
- [ ] Any revision is solved and checked independently; review metadata refers to the revised record hash.

### GNO-PHY11-C02-H-013 — Hard

**Topic:** Nth second comparison

A particle undergoes constant acceleration. Distances traversed during its fourth and sixth seconds are 15 m and 23 m, with motion always forward. Its initial speed is:

A. −1 m/s
B. 1 m/s
C. 3 m/s
D. 5 m/s

**Supplied key:** B — 1 m/s

**Supplied explanation:** s₄=u+3.5a=15 and s₆=u+5.5a=23. Subtraction:2a=8 ⇒ a=4. Then u=15−14=1 m/s.

**Independent recalculation:** s4=u+3.5a=15, s6=u+5.5a=23; a=4 m/s²,u=1 m/s. Positive velocity at all t>=0 is consistent.

**Findings:** No answer-key or solution-calculation error found on the stated ideal model; unique correct option on inspection. Needs classification revision or replacement.

**Content flags:** difficulty: likely Medium or below; insufficient evidence for challenging Hard as written

**Proposed original replacement brief:** Allow signed displacement in two nonadjacent seconds and supply total distance in an intervening interval; infer all admissible initial velocities and accelerations and rule out inconsistent sign cases.

**Remaining review:** Confirm prerequisites, difficulty, uniqueness, physical assumptions and distractors. Status remains draft.

- [ ] Qualified reviewer approves this exact record (record SHA-256 in companion JSON).
- [ ] Any revision is solved and checked independently; review metadata refers to the revised record hash.

### GNO-PHY11-C02-H-014 — Hard

**Topic:** Crossing moving vehicles

Two vehicles move towards each other on a straight road. Initial gap is 300 m; one starts from rest with acceleration 2 m/s² toward the other, which travels at constant 10 m/s toward it. Meeting time is:

A. 10 s
B. 5(√13−1) s
C. 10(√3−1) s
D. 15 s

**Supplied key:** B — 5(√13−1) s

**Supplied explanation:** Relative closure is t²+10t=300. Positive solution of t²+10t−300=0 is (−10+√1300)/2=5(√13−1) s.

**Independent recalculation:** Closure=t²+10t; setting it to 300 m gives t=5(sqrt(13)-1) s. Other quadratic root is negative.

**Findings:** No answer-key or solution-calculation error found on the stated ideal model; unique correct option on inspection. Needs classification revision or replacement.

**Content flags:** difficulty: likely Medium or below; insufficient evidence for challenging Hard as written

**Proposed original replacement brief:** Have the approaching vehicle brake to rest before a possible meeting; find the threshold initial gap separating collision during braking, after braking, and no meeting within a specified time window.

**Remaining review:** Confirm prerequisites, difficulty, uniqueness, physical assumptions and distractors. Status remains draft.

- [ ] Qualified reviewer approves this exact record (record SHA-256 in companion JSON).
- [ ] Any revision is solved and checked independently; review metadata refers to the revised record hash.

### GNO-PHY11-C02-H-015 — Hard

**Topic:** Position extrema

A particle has x(t)=t⁴−8t² metres for t≥0. Its minimum position and corresponding time are:

A. −16 m at 2 s
B. −8 m at 2 s
C. −16 m at 4 s
D. 0 m at 0 s

**Supplied key:** A — −16 m at 2 s

**Supplied explanation:** dx/dt=4t(t²−4), stationary at t=0 and t=2. x(2)=16−32=−16 m and is the minimum for t≥0.

**Independent recalculation:** x=t⁴-8t²=(t²-4)²-16 >= -16 m; equality at t=2 s on t>=0 proves a global minimum, without relying only on stationarity.

**Findings:** No answer-key or solution-calculation error found on the stated ideal model; unique correct option on inspection. Needs classification revision or replacement.

**Content flags:** difficulty: likely Medium or below; insufficient evidence for challenging Hard as written

**Proposed original replacement brief:** Give a parameterized quartic position whose stationary points merge as the parameter varies; determine when an interior minimum occurs and compare it to a finite observation boundary.

**Remaining review:** Confirm prerequisites, difficulty, uniqueness, physical assumptions and distractors. Status remains draft.

- [ ] Qualified reviewer approves this exact record (record SHA-256 in companion JSON).
- [ ] Any revision is solved and checked independently; review metadata refers to the revised record hash.

### GNO-PHY11-C02-H-016 — Hard

**Topic:** Acceleration sign changes

A particle starts at +10 m/s. Its acceleration is −2 m/s² for 8 s, then +4 m/s² for 3 s. Total distance travelled is:

A. 34 m
B. 38 m
C. 40 m
D. 43 m

**Supplied key:** D — 43 m

**Supplied explanation:** First interval stops at 5 s, going 25 m forward, then moves backward for 3 s:9 m. Second starts v=−6 m/s, stops after 1.5 s, goes 4.5 m backward and then 4.5 m forward. Total=25+9+4.5+4.5=43 m.

**Independent recalculation:** First phase changes sign at 5 s: distance 25+9=34 m, v=-6 m/s at 8 s. Next phase reverses at 1.5 s: distance 4.5+4.5=9 m. Total 43 m.

**Findings:** No answer-key or solution-calculation error found on the stated ideal model; unique correct option on inspection. Plausible Hard: two velocity reversals across acceleration phases.

**Content flags:** None identified beyond universal pending human review.

**Proposed original replacement brief:** Retain provisionally; qualified reviewer must confirm wording, distractors and difficulty.

**Remaining review:** Confirm prerequisites, difficulty, uniqueness, physical assumptions and distractors. Status remains draft.

- [ ] Qualified reviewer approves this exact record (record SHA-256 in companion JSON).
- [ ] Any revision is solved and checked independently; review metadata refers to the revised record hash.

### GNO-PHY11-C02-H-017 — Hard

**Topic:** Relative velocity with head start

A bus moving steadily at 15 m/s passes a parked car. The car starts 4 s later with acceleration 3 m/s². How long after the car starts does it catch the bus?

A. 5+√65 s
B. 5+√65/2 s
C. 10+√65 s
D. 5+√105 s

**Supplied key:** A — 5+√65 s

**Supplied explanation:** At car start, bus is 60 m ahead. Let τ seconds after car starts: 1.5τ²=60+15τ ⇒ τ²−10τ−40=0 ⇒ τ=5+√65 s.

**Independent recalculation:** At delayed car start bus lead=60 m. Relative equation 1.5tau²=60+15tau gives tau=5+sqrt(65) s; negative root is inadmissible.

**Findings:** No answer-key or solution-calculation error found on the stated ideal model; unique correct option on inspection. Needs classification revision or replacement.

**Content flags:** difficulty: likely Medium or below; insufficient evidence for challenging Hard as written

**Proposed original replacement brief:** Combine delayed pursuit with a pursuer speed cap and a later bus speed change; solve for the earliest meeting and show that earlier candidate roots fall outside their phases.

**Remaining review:** Confirm prerequisites, difficulty, uniqueness, physical assumptions and distractors. Status remains draft.

- [ ] Qualified reviewer approves this exact record (record SHA-256 in companion JSON).
- [ ] Any revision is solved and checked independently; review metadata refers to the revised record hash.

### GNO-PHY11-C02-H-018 — Hard

**Topic:** Piecewise position

A particle starts at x=0. It moves at +6 m/s for 3 s, then −4 m/s for 5 s, then +2 m/s for 4 s. Find total distance and final displacement.

A. 46 m, +6 m
B. 46 m, +14 m
C. 36 m, +6 m
D. 42 m, −6 m

**Supplied key:** A — 46 m, +6 m

**Supplied explanation:** Distance=6×3+4×5+2×4=18+20+8=46 m; displacement=18−20+8=+6 m.

**Independent recalculation:** Distance=18+20+8=46 m; displacement=18-20+8=+6 m. Correct option requires both components.

**Findings:** No answer-key or solution-calculation error found on the stated ideal model; unique correct option on inspection. Needs classification revision or replacement.

**Content flags:** difficulty: likely Medium or below; insufficient evidence for challenging Hard as written

**Proposed original replacement brief:** Infer three unknown stage durations from total time, signed displacement and a direction-specific distance constraint, then find the possible elapsed times at which a specified position is visited.

**Remaining review:** Confirm prerequisites, difficulty, uniqueness, physical assumptions and distractors. Status remains draft.

- [ ] Qualified reviewer approves this exact record (record SHA-256 in companion JSON).
- [ ] Any revision is solved and checked independently; review metadata refers to the revised record hash.

### GNO-PHY11-C02-H-019 — Hard

**Topic:** Average speed round trip

A truck travels half the total route distance at 24 km/h, one quarter at 36 km/h and the remaining quarter at 72 km/h. Average speed is:

A. 32 km/h
B. 36 km/h
C. 288/7 km/h
D. 40 km/h

**Supplied key:** A — 32 km/h

**Supplied explanation:** For total distance D, time = D(1/(2×24)+1/(4×36)+1/(4×72)) = D(1/48+1/144+1/288)=D(9/288)=D/32. Average speed =32 km/h.

**Independent recalculation:** Total time per route length=1/48+1/144+1/288=1/32 h/km; average speed=32 km/h.

**Findings:** No answer-key or solution-calculation error found on the stated ideal model; unique correct option on inspection. Needs classification revision or replacement.

**Content flags:** difficulty: likely Medium or below; insufficient evidence for challenging Hard as written

**Proposed original replacement brief:** Derive the allocation of a fixed total time between outbound and return legs with a mandatory rest and a bound on one leg speed, then determine whether a target trip average is feasible.

**Remaining review:** Confirm prerequisites, difficulty, uniqueness, physical assumptions and distractors. Status remains draft.

- [ ] Qualified reviewer approves this exact record (record SHA-256 in companion JSON).
- [ ] Any revision is solved and checked independently; review metadata refers to the revised record hash.

### GNO-PHY11-C02-H-020 — Hard

**Topic:** Gravity time symmetry

A ball is thrown vertically upward. It crosses a level 15 m above launch point at t=1 s and again at t=3 s. Assuming constant g, find launch speed and g.

A. 20 m/s, 10 m/s²
B. 15 m/s, 5 m/s²
C. 25 m/s, 10 m/s²
D. 30 m/s, 10 m/s²

**Supplied key:** A — 20 m/s, 10 m/s²

**Supplied explanation:** At equal height: u−g(1+3)/2=0 ⇒ u=2g. At t=1, 15=u−g/2=1.5g ⇒ g=10 m/s²; u=20 m/s.

**Independent recalculation:** At equal height u(3-1)-g(9-1)/2=0 implies u=2g s; 15=u(1)-g/2 yields g=10 m/s²,u=20 m/s.

**Findings:** No answer-key or solution-calculation error found on the stated ideal model; unique correct option on inspection. Needs classification revision or replacement.

**Content flags:** difficulty: likely Medium or below; insufficient evidence for challenging Hard as written

**Proposed original replacement brief:** Use two crossings of a moving observation platform plus a third timestamp to infer launch speed, gravity and platform speed; ensure independent constraints and identify any degeneracy before constructing options.

**Remaining review:** Confirm prerequisites, difficulty, uniqueness, physical assumptions and distractors. Status remains draft.

- [ ] Qualified reviewer approves this exact record (record SHA-256 in companion JSON).
- [ ] Any revision is solved and checked independently; review metadata refers to the revised record hash.

### GNO-PHY11-C02-H-021 — Hard

**Topic:** Position-dependent acceleration

A particle moves along +x with speed 10 m/s at x=0. Its acceleration depends on position as a(x)=2x (m/s² when x is in metres). Find its speed at x=5 m.

A. 5√6 m/s
B. 5√5 m/s
C. 5√7 m/s
D. 10√6 m/s

**Supplied key:** A — 5√6 m/s

**Supplied explanation:** Use a=v dv/dx. Thus v dv/dx=2x ⇒ (v²−100)/2=x². At x=5, v²=100+2×25=150, so v=5√6 m/s (positive direction).

**Independent recalculation:** v dv/dx=2x; integral gives (v²-100)/2=x²; v(5)=sqrt(150)=5sqrt(6) m/s; positive root follows stated direction.

**Findings:** No answer-key or solution-calculation error found on the stated ideal model; unique correct option on inspection. Needs classification revision or replacement.

**Content flags:** difficulty: likely Medium or below; insufficient evidence for challenging Hard as written

**Proposed original replacement brief:** For a(x)=alpha-beta x with positive launch speed, derive the accessible position interval and determine whether a proposed checkpoint is reachable before reversal, using the integrated v² constraint.

**Remaining review:** Confirm prerequisites, difficulty, uniqueness, physical assumptions and distractors. Status remains draft.

- [ ] Qualified reviewer approves this exact record (record SHA-256 in companion JSON).
- [ ] Any revision is solved and checked independently; review metadata refers to the revised record hash.

### GNO-PHY11-C02-H-022 — Hard

**Topic:** Average velocity and speed

A particle moves as x(t)=t²−4t (metres). For t=0 to4 s, what are average velocity and average speed?

A. 0 m/s and 2 m/s
B. 2 m/s and 2 m/s
C. 0 m/s and 4 m/s
D. −2 m/s and 2 m/s

**Supplied key:** A — 0 m/s and 2 m/s

**Supplied explanation:** x(0)=0, x(2)=−4 (turning), x(4)=0. Net displacement 0, total distance=4+4=8 m in 4 s. Average velocity=0 and speed=2 m/s.

**Independent recalculation:** v=2t-4 reverses at 2 s; x(0)=0,x(2)=-4,x(4)=0; displacement=0, distance=8 m; averages 0 and 2 m/s.

**Findings:** No answer-key or solution-calculation error found on the stated ideal model; unique correct option on inspection. Needs classification revision or replacement.

**Content flags:** near-duplicate/semantic repetition: D08; difficulty: likely Medium or below; insufficient evidence for challenging Hard as written

**Proposed original replacement brief:** Use two unknown coefficients in a quadratic position law with a measured average velocity and total path; determine all admissible reversal times and distinguish solutions using a third measurement.

**Remaining review:** Confirm prerequisites, difficulty, uniqueness, physical assumptions and distractors. Status remains draft.

- [ ] Qualified reviewer approves this exact record (record SHA-256 in companion JSON).
- [ ] Any revision is solved and checked independently; review metadata refers to the revised record hash.

### GNO-PHY11-C02-H-023 — Hard

**Topic:** Time-dependent acceleration

A body starts from rest with acceleration a(t)=4t m/s². Distance travelled in the interval t=1 s to t=3 s is:

A. 40/3 m
B. 52/3 m
C. 56/3 m
D. 64/3 m

**Supplied key:** B — 52/3 m

**Supplied explanation:** Integrate a to v=2t², then x(t)=2t³/3. Distance x(3)−x(1)= (2/3)(27−1)=52/3 m.

**Independent recalculation:** Starting from rest at t=0 gives v=2t² >=0; integral from 1 to 3 is (2/3)(27-1)=52/3 m.

**Findings:** No answer-key or solution-calculation error found on the stated ideal model; unique correct option on inspection. Needs classification revision or replacement.

**Content flags:** difficulty: likely Medium or below; insufficient evidence for challenging Hard as written

**Proposed original replacement brief:** Use a time-dependent acceleration that switches sign with an unknown switch time fixed by terminal rest; find displacement and maximum separation from the origin, testing all velocity roots.

**Remaining review:** Confirm prerequisites, difficulty, uniqueness, physical assumptions and distractors. Status remains draft.

- [ ] Qualified reviewer approves this exact record (record SHA-256 in companion JSON).
- [ ] Any revision is solved and checked independently; review metadata refers to the revised record hash.

### GNO-PHY11-C02-H-024 — Hard

**Topic:** Time-dependent velocity

For v(t)=t²−4t+3 (m/s), find total distance between t=0 and t=4 s.

A. 4 m
B. 16/3 m
C. 20/3 m
D. 8 m

**Supplied key:** A — 4 m

**Supplied explanation:** v=(t−1)(t−3). Antiderivative F=t³/3−2t²+3t. F(0)=0,F(1)=4/3,F(3)=0,F(4)=4/3. Total distance=4/3+4/3+4/3=4 m.

**Independent recalculation:** Primitive F=t³/3-2t²+3t; roots of v are 1,3 s. F at 0,1,3,4 is 0,4/3,0,4/3; absolute changes sum to 4 m.

**Findings:** No answer-key or solution-calculation error found on the stated ideal model; unique correct option on inspection. Needs classification revision or replacement.

**Content flags:** near-duplicate/semantic repetition: D09; difficulty: likely Medium or below; insufficient evidence for challenging Hard as written

**Proposed original replacement brief:** Use a rational positive/negative velocity law with a supplied antiderivative and an unknown parameter fixed by equal forward/backward distances; select the physical parameter and then the first return time. Avoid the existing scaled cubic.

**Remaining review:** Confirm prerequisites, difficulty, uniqueness, physical assumptions and distractors. Status remains draft.

- [ ] Qualified reviewer approves this exact record (record SHA-256 in companion JSON).
- [ ] Any revision is solved and checked independently; review metadata refers to the revised record hash.

### GNO-PHY11-C02-H-025 — Hard

**Topic:** Two-phase gravity motion

From a platform 45 m high, a stone is dropped. At the same instant, a second stone is projected vertically upward from ground at 20 m/s. With g=10 m/s², when are they at the same height?

A. 1.5 s
B. 2.25 s
C. 3 s
D. 4.5 s

**Supplied key:** B — 2.25 s

**Supplied explanation:** Heights: upper stone y₁=45−5t²; lower stone y₂=20t−5t². Equate:45=20t ⇒ t=2.25 s (both still above ground at that instant).

**Independent recalculation:** Same constant gravity cancels in relative height: 45=20t gives 2.25 s. Height is 45-5(2.25²)=19.6875 m>0; neither stone has hit ground.

**Findings:** No answer-key or solution-calculation error found on the stated ideal model; unique correct option on inspection. Needs classification revision or replacement.

**Content flags:** difficulty: likely Medium or below; insufficient evidence for challenging Hard as written

**Proposed original replacement brief:** Use delayed launch under equal gravity and require a meeting at a fixed fraction of the first stone's remaining fall; solve for delay and speed and reject trajectories that already hit ground.

**Remaining review:** Confirm prerequisites, difficulty, uniqueness, physical assumptions and distractors. Status remains draft.

- [ ] Qualified reviewer approves this exact record (record SHA-256 in companion JSON).
- [ ] Any revision is solved and checked independently; review metadata refers to the revised record hash.

### GNO-PHY11-C02-H-026 — Hard

**Topic:** Acceleration-time integration

A particle begins with v₀=−3 m/s and acceleration a(t)=2t+1 (m/s²). Its velocity at t=2 s is:

A. 1 m/s
B. 2 m/s
C. 3 m/s
D. 4 m/s

**Supplied key:** C — 3 m/s

**Supplied explanation:** Δv=∫₀²(2t+1)dt=[t²+t]₀²=6 m/s; final v=−3+6=+3 m/s.

**Independent recalculation:** Integral of 2t+1 from 0 to 2 is 6 m/s; final velocity=-3+6=+3 m/s.

**Findings:** No answer-key or solution-calculation error found on the stated ideal model; unique correct option on inspection. Needs classification revision or replacement.

**Content flags:** difficulty: likely Medium or below; insufficient evidence for challenging Hard as written

**Proposed original replacement brief:** Infer the two coefficients of a linear acceleration from final velocity and displacement; then find every zero-velocity instant and total distance on the full interval.

**Remaining review:** Confirm prerequisites, difficulty, uniqueness, physical assumptions and distractors. Status remains draft.

- [ ] Qualified reviewer approves this exact record (record SHA-256 in companion JSON).
- [ ] Any revision is solved and checked independently; review metadata refers to the revised record hash.

### GNO-PHY11-C02-H-027 — Hard

**Topic:** Relative motion and braking

Car A moves at constant 20 m/s. Car B is 60 m ahead, moving at 10 m/s and accelerates forward at 2 m/s². Can A catch B?

A. Yes, first catch after 4 s
B. Yes, first catch after 6 s
C. Yes, first catch after 10 s
D. No, A never catches B

**Supplied key:** D — No, A never catches B

**Supplied explanation:** Relative gap g(t)=60−(20−10)t+½(2)t² =60−10t+t². Its minimum occurs at t=5 s and is 35 m>0, so there is no meeting.

**Independent recalculation:** Forward gap=60-10t+t²=(t-5)²+35 m. Its positive global minimum excludes a catch at any t>=0.

**Findings:** No answer-key or solution-calculation error found on the stated ideal model; unique correct option on inspection. Needs classification revision or replacement.

**Content flags:** difficulty: likely Medium or below; insufficient evidence for challenging Hard as written; topic label says braking although the leading car accelerates forward

**Proposed original replacement brief:** Find the critical acceleration of a leading car that just avoids a delayed accelerating pursuer within a specified finite time interval; examine both interior minimum and boundary contact cases.

**Remaining review:** Confirm prerequisites, difficulty, uniqueness, physical assumptions and distractors. Status remains draft.

- [ ] Qualified reviewer approves this exact record (record SHA-256 in companion JSON).
- [ ] Any revision is solved and checked independently; review metadata refers to the revised record hash.

### GNO-PHY11-C02-H-028 — Hard

**Topic:** Non-uniform braking

A vehicle starts at +30 m/s and decelerates with a(t)=−2t (m/s²). When does it first stop?

A. √15 s
B. √30 s
C. 15 s
D. 30 s

**Supplied key:** B — √30 s

**Supplied explanation:** v(t)=30+∫₀ᵗ−2τdτ=30−t². Set v=0: t=√30 s.

**Independent recalculation:** v=30-t²; first nonnegative root of v=0 is sqrt(30) s. Acceleration coefficient implicitly carries m/s³.

**Findings:** No answer-key or solution-calculation error found on the stated ideal model; unique correct option on inspection. Needs classification revision or replacement.

**Content flags:** difficulty: likely Medium or below; insufficient evidence for challenging Hard as written

**Proposed original replacement brief:** Given braking a=-kt and a nonzero reaction time, infer k from a measured total stopping distance and derive sensitivity to reaction-time error, distinguishing braking time from total time.

**Remaining review:** Confirm prerequisites, difficulty, uniqueness, physical assumptions and distractors. Status remains draft.

- [ ] Qualified reviewer approves this exact record (record SHA-256 in companion JSON).
- [ ] Any revision is solved and checked independently; review metadata refers to the revised record hash.

### GNO-PHY11-C02-H-029 — Hard

**Topic:** Free fall with delayed start

An object is dropped from a tower. During the last 2 s of its 6 s fall, what fraction of total height does it cover?

A. 4/9
B. 5/9
C. 2/3
D. 7/9

**Supplied key:** B — 5/9

**Supplied explanation:** With s∝t², fraction during t=4 to6 is (6²−4²)/6²=20/36=5/9.

**Independent recalculation:** Fraction of total free-fall height in [4,6] s=(36-16)/36=5/9; requires same ideal g and no impact until 6 s.

**Findings:** No answer-key or solution-calculation error found on the stated ideal model; unique correct option on inspection. Needs classification revision or replacement.

**Content flags:** near-duplicate/semantic repetition: D10; difficulty: likely Medium or below; insufficient evidence for challenging Hard as written

**Proposed original replacement brief:** Use two successive equal-duration fall intervals with a specified path ratio to infer a nonzero release speed and total time; add a height constraint to eliminate otherwise underdetermined cases.

**Remaining review:** Confirm prerequisites, difficulty, uniqueness, physical assumptions and distractors. Status remains draft.

- [ ] Qualified reviewer approves this exact record (record SHA-256 in companion JSON).
- [ ] Any revision is solved and checked independently; review metadata refers to the revised record hash.

### GNO-PHY11-C02-H-030 — Hard

**Topic:** Elevator direction reversal

An elevator starts from rest, accelerates upward at 2 m/s² for 3 s, then accelerates downward at 1 m/s² for 6 s, and finally downward at 3 m/s² for 2 s. Find total distance and final velocity (upward positive).

A. 21 m; −6 m/s
B. 33 m; −6 m/s
C. 33 m; +6 m/s
D. 27 m; −6 m/s

**Supplied key:** B — 33 m; −6 m/s

**Supplied explanation:** First phase: v=6 m/s, displacement +9 m. Second: v falls from +6 to 0, displacement +18 m. Third: it starts from rest, moves downward 6 m and ends at −6 m/s. Total distance=9+18+6=33 m.

**Independent recalculation:** Velocities at 3,9,11 s are +6,0,-6 m/s. Signed paths +9,+18,-6 m; total distance=33 m and final velocity=-6 m/s.

**Findings:** No answer-key or solution-calculation error found on the stated ideal model; unique correct option on inspection. Needs classification revision or replacement.

**Content flags:** difficulty: likely Medium or below; insufficient evidence for challenging Hard as written

**Proposed original replacement brief:** Specify two unknown switch times in an elevator acceleration profile with terminal-velocity and floor-height constraints; solve feasible schedules and compare total path after all interior reversals.

**Remaining review:** Confirm prerequisites, difficulty, uniqueness, physical assumptions and distractors. Status remains draft.

- [ ] Qualified reviewer approves this exact record (record SHA-256 in companion JSON).
- [ ] Any revision is solved and checked independently; review metadata refers to the revised record hash.

## Six preserved configurations

| Difficulty | Count | Minutes | Current availability    |
| ---------- | ----: | ------: | ----------------------- |
| Easy       |    10 |      10 | Unavailable: 0 approved |
| Medium     |    10 |      20 | Unavailable: 0 approved |
| Medium     |    20 |      40 | Unavailable: 0 approved |
| Hard       |    10 |      30 | Unavailable: 0 approved |
| Hard       |    20 |      60 | Unavailable: 0 approved |
| Hard       |    30 |      90 | Unavailable: 0 approved |

The existing engine selects one exact difficulty, no replacement from another level, no duplicate IDs, +4/-1/0 scoring. Timings are GNOSIS practice timings. Counts refer to approved nonsample questions, not draft counts.

## Qualified review and activation checklist

1. Open each question above with the bank JSON. A qualified Physics reviewer independently solves it and checks all four options.
2. Resolve the 11 repetition groups and 12 Medium/29 Hard classification concerns. Write full replacements from the briefs, or explicitly justify retaining the original difficulty. Keep replacement IDs stable only when no approved record is overwritten.
3. Check gravity assumptions, numerical coefficient units, root/interval restrictions, distractor plausibility and topic labels. Rebalance answer positions with consistent keys.
4. Record reviewer identity, date, exact reviewed record hash, solution, difficulty justification, and approval decision in a review artifact. Blank checkboxes are not approval.
5. Only after explicit academic approval, a maintainer may change the specific approved record verification.status to verified and set a truthful reviewer/method reference. Do not change all records in bulk or promote development samples.
6. Run import/schema validation, independent answer and duplicate checks, tests, TypeScript and build. Minimum approved counts: Easy10, Medium10/20, Hard10/20/30. Insufficient sets stay unavailable. Activation changes require the owner’s separate approval; no deployment is part of this task.

## Technical verification

- JSON/schema importer dry run and write: passed, 60 draft records. Replaying the import rejects existing IDs without creating a second bank.
  +- All 60 answers: independent calculation/option checks passed; mathematical equivalents of numerical distractors were compared (including pair-valued answers).
  +- 63 unit/regression tests passed, including seven new Chapter 2 tests, Chapter 1 checks, lecture/resource coverage, grading and storage.
  +- Initial restricted run: 62 passed, one existing atomic-file-rename test failed with Windows EPERM. Rerunning with filesystem permission passed all 63; no application workaround was introduced.
  +- TypeScript: `tsc --noEmit --incremental false` passed.
  +- Production build: `next build --webpack` passed.
  +- Two HTTP integration tests on the local production preview passed: existing content/private endpoints/quiz/PDF delivery and real-bank unavailable states.
  +- Ten HTTP matrix tests on a separate private synthetic-fixture server passed: six timer/count pairs, exact difficulty isolation, unique questions, hidden keys, +4/-1/0, tokens, saved-answer recovery, clearing, stale revisions, concurrent duplicate submission, expiry, malformed/empty banks. These fixtures do not approve any real questions.
  +- Existing bank SHA-256 checks passed again after every suite: all six pre-existing files unchanged, including all Chapter 1 records.
  +- No configured lint command/linter exists. Prettier checked the files added/updated for this task; this is formatting, not lint or academic validation.
  +- No UI or engine source was changed for this import. No push, deployment or activation occurred.

*

+Academic correctness, difficulty and originality beyond the supplied material remain human-review responsibilities. This task supplies replacement **briefs**, not completed replacement banks: writing and independently solving those revised MCQs, balancing options, and recording qualified approval remain pending before activation.
