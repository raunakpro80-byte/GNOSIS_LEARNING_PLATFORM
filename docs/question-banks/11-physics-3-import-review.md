# Class 11 Physics — Chapter 3: Motion in a Plane

Import and calculation/editorial review, 2026-10-18. **All 60 records remain DRAFT; approved = 0.**

## Import and preservation

- Inspected all five JSON files. The master groups questions under easy/medium/hard; after flattening, every record exactly equals the corresponding difficulty file. Imported the master once, not all four banks.
- Existing curriculum identity: className="11", subject="physics", chapter=3, title Motion in a Plane. Replaced TO_BE_MAPPED and adapted source field names to the existing schemaVersion=1 importer. Kept original IDs, prompt/options, answer indices, explanations, topics and difficulty labels unchanged for review traceability.
- Archive SHA-256: `e8e2dd9febd8b5e2ce7a69c5c6bb3b198ba82c19ff39ee655c10a4e60c43d071`.
- Existing importer dry run and --write used; incoming IDs do not collide. New file: content/mock-questions/11-physics-3-owner-draft.json.
- Snapshotted all seven pre-existing bank JSON files. Their SHA-256 values in the companion report protect every Chapter 1 and Chapter 2 record, including the 40 development samples. No pre-existing question bank was edited.
- No UI, engine, route, lecture, PDF, notes, authentication, AI, scoring or timer source is changed for this import. Test infrastructure is extended to cover Chapter 3.

## Review outcome

- Imported 10 Easy,20 Medium,30 Hard drafts, total60; **45 distinct records flagged** (overlapping concerns). All60 require qualified academic review.
- No numerical answer-key mismatch was found under the intended ideal models. This does not mean all statements are ready to publish: H012 has an ambiguous target direction with 60 m and 100 m both possible interpretations; H028 determines |ux| but does not specify the sign of ux.
- 13 Medium records appear Easy: 001,002,004,005,006,007,008,009,011,016,017,018,019.
- All30 Hard records need difficulty revision or explicit qualified justification. Most are direct identities, standard projectile formulas or elementary two/three-step calculations. H020 adds minimization, H016 an inclined surface, H022 radial/tangential decomposition, and H024 average-acceleration geometry; these are worthwhile moderate objectives, but none is established as the challenging multi-constraint Hard tier requested.
- Two manual repetition groups: M017/M018 numerical-template near-duplication; M010/H018 reuse identical trajectory data across levels. They affect four records; there are no exact normalized-stem or ID duplicates. Do not equate every shared formula with a duplicate.
- M020 and H025 introduce net radial force; H014 uses energy in the supplied explanation (a kinematic derivation is provided below). H021/H022 angular acceleration prerequisites need reviewer alignment with the chapter sequence.

| Difficulty |   A |   B |   C |   D |
| ---------- | --: | --: | --: | --: |
| Easy       |   3 |   3 |   2 |   2 |
| Medium     |   5 |   5 |   5 |   5 |
| Hard       |   7 |   7 |   8 |   8 |

Keys are already near-balanced. No option permutation or key change was necessary. After any corrections, check distinct options, numerical equivalence and solution/key consistency again.

## Diversity and notation

- Primary topic groups: vector algebra19; projectile motion25 (including relative projectiles); other planar relative motion3; circular motion13. Counts use primary objective, not overlapping labels.
- Missing/limited coverage for a future reviewed bank: arbitrary planar position/velocity functions, relative-motion feasibility, nonuniform river crossings, graphical/diagram reasoning, and genuinely constrained optimization. Do not add arbitrary complexity just to increase difficulty.
- Use one common stated model for projectile questions: constant specified gravity, negligible drag, fixed inertial axes and no surface interaction before the queried instant. Same-height range/flight formulas require launch/landing at the same height.
- Current renderer displays prompt/options/explanations as escaped plain text. Unicode î,ĵ,θ,π,²,° and sqrt()/superscript-style text are readable; this is not a typeset LaTeX renderer. These files contain no math delimiters requiring LaTeX. Content text-encoding/static-render tests do not replace visual mobile review.
- Review option plausibility: M003 correctly distinguishes A·B from A·(A+B); M014 distinguishes projection by |B| from |B|². H003 correctly excludes the negative branch via k>-4. H012 must remove its direction ambiguity before its distractor100 m is safely wrong. H028 must ask magnitude before treating +16 as a complete answer.

## Duplicate dispositions

- D01: GNO-PHY11-C03-M-017, GNO-PHY11-C03-M-018. Both are direct ac=4pi²r f² substitutions; period versus frequency is reciprocal input, not a different reasoning structure.
- D02: GNO-PHY11-C03-M-010, GNO-PHY11-C03-H-018. Identical u=30 m/s, theta=30°, g=10 scenario and height 10 m at t=2. H018 inverts the same quadratic and adds its other root. Not identical wording, but the same problem data/trajectory reappears.

Seven lexical candidates (token Jaccard >=0.50) are recorded in JSON. They share projectile wording but ask different observables, so they were not automatically called duplicates. The two groups above required manual mathematical/scenario comparison. No near-duplicate was identified against existing Chapter1/2 after this screen and concept review; this is not a claim of external originality verification.

## Question-by-question review

Correct answers below are the supplied keys, independently checked under the intended model. They are not academic approvals. Corrected wording is proposed; it has not silently overwritten the imported drafts. Replacement briefs require full fresh four-option statements, independent solutions and human review before substitution.

### GNO-PHY11-C03-E-001 — Easy

**Topic:** Vector basics

Which of the following quantities requires both magnitude and direction for its complete description?

A. Displacement
B. Distance
C. Mass
D. Temperature

**Supplied key:** A — Displacement

**Supplied explanation:** Displacement is a vector quantity, defined by magnitude and direction. The other listed quantities are scalars.

**Independent calculation:** Displacement is a vector; distance, mass and temperature are scalars.

**Findings:** No specific content flag found; suitable foundational question provisionally. Academic review still pending.

**Proposed correction:** No calculation/key change proposed.

**Original replacement/revision brief:** Retain provisionally after qualified review.

**Academic status:** draft, approval pending.

- [ ] Reviewer independently verifies all options, solution, units, physical interval and difficulty.
- [ ] Reviewer records name, date, decision and hash of the exact final reviewed record.

### GNO-PHY11-C03-E-002 — Easy

**Topic:** Unit vectors

What is the magnitude of the vector 0.6î + 0.8ĵ?

A. 0.2
B. 1
C. 1.4
D. 2

**Supplied key:** B — 1

**Supplied explanation:** Magnitude = sqrt(0.6² + 0.8²) = sqrt(0.36 + 0.64) = 1.

**Independent calculation:** sqrt(0.6²+0.8²)=sqrt(1)=1; the vector is dimensionless and of unit magnitude.

**Findings:** No specific content flag found; suitable foundational question provisionally. Academic review still pending.

**Proposed correction:** No calculation/key change proposed.

**Original replacement/revision brief:** Retain provisionally after qualified review.

**Academic status:** draft, approval pending.

- [ ] Reviewer independently verifies all options, solution, units, physical interval and difficulty.
- [ ] Reviewer records name, date, decision and hash of the exact final reviewed record.

### GNO-PHY11-C03-E-003 — Easy

**Topic:** Vector components

A displacement vector is 5î − 2ĵ metres. What is its x-component?

A. −2 m
B. −5 m
C. +5 m
D. +2 m

**Supplied key:** C — +5 m

**Supplied explanation:** The coefficient of î gives the x-component, +5 m.

**Independent calculation:** The x coefficient of 5i-2j m is +5 m, not the magnitude or the y component.

**Findings:** No specific content flag found; suitable foundational question provisionally. Academic review still pending.

**Proposed correction:** No calculation/key change proposed.

**Original replacement/revision brief:** Retain provisionally after qualified review.

**Academic status:** draft, approval pending.

- [ ] Reviewer independently verifies all options, solution, units, physical interval and difficulty.
- [ ] Reviewer records name, date, decision and hash of the exact final reviewed record.

### GNO-PHY11-C03-E-004 — Easy

**Topic:** Vector addition

Two vectors of magnitudes 4 N and 7 N point in the same direction. What is their resultant magnitude?

A. 3 N
B. sqrt(65) N
C. 28 N
D. 11 N

**Supplied key:** D — 11 N

**Supplied explanation:** For parallel vectors in the same direction, add magnitudes: 4 + 7 = 11 N.

**Independent calculation:** Collinear codirectional forces add: 4+7=11 N.

**Findings:** No specific content flag found; suitable foundational question provisionally. Academic review still pending.

**Proposed correction:** No calculation/key change proposed.

**Original replacement/revision brief:** Retain provisionally after qualified review.

**Academic status:** draft, approval pending.

- [ ] Reviewer independently verifies all options, solution, units, physical interval and difficulty.
- [ ] Reviewer records name, date, decision and hash of the exact final reviewed record.

### GNO-PHY11-C03-E-005 — Easy

**Topic:** Vector subtraction

A point shifts from (2 m, −1 m) to (2 m, 6 m). What is the displacement vector?

A. 7ĵ m
B. 7î m
C. 5ĵ m
D. −7ĵ m

**Supplied key:** A — 7ĵ m

**Supplied explanation:** Final position minus initial: (2−2)î + (6−(−1))ĵ = 7ĵ m.

**Independent calculation:** Final minus initial position gives (2-2,6-(-1))=(0,7) m.

**Findings:** No specific content flag found; suitable foundational question provisionally. Academic review still pending.

**Proposed correction:** No calculation/key change proposed.

**Original replacement/revision brief:** Retain provisionally after qualified review.

**Academic status:** draft, approval pending.

- [ ] Reviewer independently verifies all options, solution, units, physical interval and difficulty.
- [ ] Reviewer records name, date, decision and hash of the exact final reviewed record.

### GNO-PHY11-C03-E-006 — Easy

**Topic:** Projectile motion

For an ideal projectile moving only under gravity, in which direction does its acceleration act?

A. Along its velocity
B. Vertically downward
C. Vertically upward
D. Horizontally forward

**Supplied key:** B — Vertically downward

**Supplied explanation:** With air resistance neglected, gravitational acceleration remains vertically downward at all times.

**Independent calculation:** Under gravity alone, a=(0,-g) in upward-positive axes; velocity direction generally changes.

**Findings:** No specific content flag found; suitable foundational question provisionally. Academic review still pending.

**Proposed correction:** No calculation/key change proposed.

**Original replacement/revision brief:** Retain provisionally after qualified review.

**Academic status:** draft, approval pending.

- [ ] Reviewer independently verifies all options, solution, units, physical interval and difficulty.
- [ ] Reviewer records name, date, decision and hash of the exact final reviewed record.

### GNO-PHY11-C03-E-007 — Easy

**Topic:** Projectile at highest point

At the highest point of a non-vertical projectile, which velocity component is zero?

A. Horizontal component
B. Both components
C. Vertical component
D. Neither component

**Supplied key:** C — Vertical component

**Supplied explanation:** Gravity reduces the vertical component to zero at the highest point; horizontal velocity remains constant.

**Independent calculation:** At a nonvertical projectile apex vy=0 while vx remains nonzero, under the ideal constant-gravity model.

**Findings:** No specific content flag found; suitable foundational question provisionally. Academic review still pending.

**Proposed correction:** No calculation/key change proposed.

**Original replacement/revision brief:** Retain provisionally after qualified review.

**Academic status:** draft, approval pending.

- [ ] Reviewer independently verifies all options, solution, units, physical interval and difficulty.
- [ ] Reviewer records name, date, decision and hash of the exact final reviewed record.

### GNO-PHY11-C03-E-008 — Easy

**Topic:** Horizontal projection

A ball is launched horizontally at 9 m/s without air resistance. After 1 s, what is its horizontal velocity?

A. 0 m/s
B. 19 m/s
C. 4.5 m/s
D. 9 m/s

**Supplied key:** D — 9 m/s

**Supplied explanation:** There is no horizontal acceleration when air resistance is neglected, so vₓ stays at 9 m/s.

**Independent calculation:** ax=0 implies vx(t)=vx(0)=9 m/s, while airborne.

**Findings:** No specific content flag found; suitable foundational question provisionally. Academic review still pending.

**Proposed correction:** No calculation/key change proposed.

**Original replacement/revision brief:** Retain provisionally after qualified review.

**Academic status:** draft, approval pending.

- [ ] Reviewer independently verifies all options, solution, units, physical interval and difficulty.
- [ ] Reviewer records name, date, decision and hash of the exact final reviewed record.

### GNO-PHY11-C03-E-009 — Easy

**Topic:** Uniform circular motion

For circular motion at constant speed v and radius r, what is the centripetal acceleration?

A. v²/r
B. vr
C. r/v²
D. v/r²

**Supplied key:** A — v²/r

**Supplied explanation:** Centripetal acceleration magnitude for uniform circular motion is a_c = v²/r, directed toward the centre.

**Independent calculation:** Radial acceleration magnitude is v²/r with dimension (L²/T²)/L=L/T², directed inward.

**Findings:** No specific content flag found; suitable foundational question provisionally. Academic review still pending.

**Proposed correction:** No calculation/key change proposed.

**Original replacement/revision brief:** Retain provisionally after qualified review.

**Academic status:** draft, approval pending.

- [ ] Reviewer independently verifies all options, solution, units, physical interval and difficulty.
- [ ] Reviewer records name, date, decision and hash of the exact final reviewed record.

### GNO-PHY11-C03-E-010 — Easy

**Topic:** Angular speed

A wheel turns through 8 radians in 2 seconds at constant angular speed. Find its angular speed.

A. 16 rad/s
B. 4 rad/s
C. 6 rad/s
D. 0.25 rad/s

**Supplied key:** B — 4 rad/s

**Supplied explanation:** Angular speed ω = angular displacement/time = 8/2 = 4 rad/s.

**Independent calculation:** Constant angular speed = 8 rad / 2 s = 4 rad/s.

**Findings:** No specific content flag found; suitable foundational question provisionally. Academic review still pending.

**Proposed correction:** No calculation/key change proposed.

**Original replacement/revision brief:** Retain provisionally after qualified review.

**Academic status:** draft, approval pending.

- [ ] Reviewer independently verifies all options, solution, units, physical interval and difficulty.
- [ ] Reviewer records name, date, decision and hash of the exact final reviewed record.

### GNO-PHY11-C03-M-001 — Medium

**Topic:** Unit vector and magnitude

A force is 9î + 12ĵ N. What is the unit vector along this force?

A. (9î + 12ĵ)/12
B. (3î + 4ĵ)/5
C. (4î + 3ĵ)/5
D. (3î − 4ĵ)/5

**Supplied key:** B — (3î + 4ĵ)/5

**Supplied explanation:** Magnitude = sqrt(9²+12²)=15 N; divide each component by 15: (3î+4ĵ)/5.

**Independent calculation:** Force magnitude=sqrt(81+144)=15 N; normalize: (9/15,12/15)=(3/5,4/5). Alternative (4/5,3/5) has the wrong direction.

**Findings:** Difficulty: likely Easy direct formula/basic calculation rather than moderate Medium.

**Proposed correction:** No calculation/key change proposed.

**Original replacement/revision brief:** For a required resultant direction and specified magnitude, solve for an unknown second vector, then normalize it; avoid only normalizing a supplied vector.

**Academic status:** draft, approval pending.

- [ ] Reviewer independently verifies all options, solution, units, physical interval and difficulty.
- [ ] Reviewer records name, date, decision and hash of the exact final reviewed record.

### GNO-PHY11-C03-M-002 — Medium

**Topic:** Resultant of perpendicular vectors

Two displacements of 8 m east and 15 m north act successively. Find the net displacement magnitude.

A. 23 m
B. 7 m
C. 17 m
D. sqrt(161) m

**Supplied key:** C — 17 m

**Supplied explanation:** Perpendicular components combine by Pythagoras: sqrt(8²+15²)=sqrt(289)=17 m.

**Independent calculation:** Perpendicular displacement resultant=sqrt(8²+15²)=17 m; path length 23 m is different.

**Findings:** Difficulty: likely Easy direct formula/basic calculation rather than moderate Medium.

**Proposed correction:** No calculation/key change proposed.

**Original replacement/revision brief:** Use two measured successive displacements and a third constrained direction; infer the third magnitude needed to attain a specified resultant direction.

**Academic status:** draft, approval pending.

- [ ] Reviewer independently verifies all options, solution, units, physical interval and difficulty.
- [ ] Reviewer records name, date, decision and hash of the exact final reviewed record.

### GNO-PHY11-C03-M-003 — Medium

**Topic:** Vector dot product

Let A = 3î − 2ĵ, B = 4î + 5ĵ and C=A+B. Find A · C.

A. 2
B. 13
C. 28
D. 15

**Supplied key:** D — 15

**Supplied explanation:** First C=A+B=(7î+3ĵ). Thus A·C=3×7+(−2)×3=21−6=15. Equivalently A·C=|A|²+A·B=13+2=15.

**Independent calculation:** C=A+B=(7,3); A dot C=3(7)-2(3)=15. Direct A dot B=2 is a distractor, not the asked quantity.

**Findings:** No specific content flag found; suitable foundational question provisionally. Academic review still pending.

**Proposed correction:** No calculation/key change proposed.

**Original replacement/revision brief:** Retain provisionally after qualified review.

**Academic status:** draft, approval pending.

- [ ] Reviewer independently verifies all options, solution, units, physical interval and difficulty.
- [ ] Reviewer records name, date, decision and hash of the exact final reviewed record.

### GNO-PHY11-C03-M-004 — Medium

**Topic:** Orthogonal vectors

For what value of k are (kî + 2ĵ) and (3î − 6ĵ) perpendicular?

A. k = 4
B. k = −4
C. k = 2
D. k = −2

**Supplied key:** A — k = 4

**Supplied explanation:** Perpendicular vectors have zero dot product: 3k−12=0, hence k=4.

**Independent calculation:** (k,2) dot (3,-6)=3k-12=0 gives k=4; both vectors are nonzero.

**Findings:** Difficulty: likely Easy direct formula/basic calculation rather than moderate Medium.

**Proposed correction:** No calculation/key change proposed.

**Original replacement/revision brief:** Constrain an unknown vector to be perpendicular to one supplied vector and have a specified projection on a second; solve both components and check its magnitude.

**Academic status:** draft, approval pending.

- [ ] Reviewer independently verifies all options, solution, units, physical interval and difficulty.
- [ ] Reviewer records name, date, decision and hash of the exact final reviewed record.

### GNO-PHY11-C03-M-005 — Medium

**Topic:** Cross product magnitude

Two vectors of magnitudes 6 and 10 make a 30° angle. Find the magnitude of their cross product.

A. 60
B. 30
C. 15
D. 30sqrt(3)

**Supplied key:** B — 30

**Supplied explanation:** |A×B| = AB sinθ = 6×10×sin30° = 30.

**Independent calculation:** Cross-product magnitude=6(10)sin30°=30; sin rather than cos is required.

**Findings:** Difficulty: likely Easy direct formula/basic calculation rather than moderate Medium.

**Proposed correction:** No calculation/key change proposed.

**Original replacement/revision brief:** Use the cross-product magnitude together with the dot product to infer the included angle and eliminate the obtuse/acute ambiguity.

**Academic status:** draft, approval pending.

- [ ] Reviewer independently verifies all options, solution, units, physical interval and difficulty.
- [ ] Reviewer records name, date, decision and hash of the exact final reviewed record.

### GNO-PHY11-C03-M-006 — Medium

**Topic:** Projectile time of flight

A ball is projected at 25 m/s at 30° above the horizontal. With g = 10 m/s², find the time to return to the launch level.

A. 1.25 s
B. 5 s
C. 2.5 s
D. 4.33 s

**Supplied key:** C — 2.5 s

**Supplied explanation:** Vertical launch speed = 25 sin30°=12.5 m/s. Time of flight T=2u_y/g=25/10=2.5 s.

**Independent calculation:** uy=25sin30°=12.5 m/s; nonzero same-height return time=2uy/g=2.5 s.

**Findings:** Difficulty: likely Easy direct formula/basic calculation rather than moderate Medium.

**Proposed correction:** No calculation/key change proposed.

**Original replacement/revision brief:** Infer launch components from a specified apex time and horizontal distance to the apex, then find the range.

**Academic status:** draft, approval pending.

- [ ] Reviewer independently verifies all options, solution, units, physical interval and difficulty.
- [ ] Reviewer records name, date, decision and hash of the exact final reviewed record.

### GNO-PHY11-C03-M-007 — Medium

**Topic:** Projectile maximum height

A projectile is launched at 20 m/s at 30° above horizontal. With g = 10 m/s², find its maximum height above the launch point.

A. 10 m
B. 20 m
C. 2.5 m
D. 5 m

**Supplied key:** D — 5 m

**Supplied explanation:** u_y = 20 sin30° = 10 m/s; H = u_y²/(2g)=100/20=5 m.

**Independent calculation:** uy=20sin30°=10 m/s; maximum height=uy²/(2g)=5 m above launch.

**Findings:** Difficulty: likely Easy direct formula/basic calculation rather than moderate Medium.

**Proposed correction:** No calculation/key change proposed.

**Original replacement/revision brief:** Infer launch angle from measured range and maximum height, checking the permissible acute-angle domain.

**Academic status:** draft, approval pending.

- [ ] Reviewer independently verifies all options, solution, units, physical interval and difficulty.
- [ ] Reviewer records name, date, decision and hash of the exact final reviewed record.

### GNO-PHY11-C03-M-008 — Medium

**Topic:** Projectile range

A projectile is launched from level ground with speed 20 m/s at 45°. With g = 10 m/s², what is its horizontal range?

A. 40 m
B. 20 m
C. 20sqrt(2) m
D. 80 m

**Supplied key:** A — 40 m

**Supplied explanation:** R = u² sin(2θ)/g=400×sin90°/10=40 m.

**Independent calculation:** R=u²sin90°/g=400/10=40 m for same launch and landing height.

**Findings:** Difficulty: likely Easy direct formula/basic calculation rather than moderate Medium.

**Proposed correction:** No calculation/key change proposed.

**Original replacement/revision brief:** Give a launch from a raised platform with a specified impact height; solve fall time and horizontal range, rather than directly substituting the same-level formula.

**Academic status:** draft, approval pending.

- [ ] Reviewer independently verifies all options, solution, units, physical interval and difficulty.
- [ ] Reviewer records name, date, decision and hash of the exact final reviewed record.

### GNO-PHY11-C03-M-009 — Medium

**Topic:** Projectile horizontal motion

A projectile is fired at 20 m/s at 60° from horizontal. How far does it travel horizontally in 3 s (ignore air resistance)?

A. 60 m
B. 30 m
C. 30sqrt(3) m
D. 10 m

**Supplied key:** B — 30 m

**Supplied explanation:** Horizontal velocity is u cos60°=10 m/s. Horizontal displacement x=10×3=30 m.

**Independent calculation:** vx=20cos60°=10 m/s; x(3)=30 m, provided airborne for 3 s. With g=10 m/s² and same-level landing T=2sqrt(3)>3 s; the supplied statement does not fix g or a surface.

**Findings:** Difficulty: likely Easy direct formula/basic calculation rather than moderate Medium.; Flight interval is not established: specify level launch/landing, g=10 m/s² and no obstruction, or state that the projectile remains airborne for 3 s.

**Proposed correction:** Corrected stem: A projectile is launched from level ground at 20 m/s at 60° in vacuum with g=10 m/s² and no obstacles. Find its horizontal displacement at t=3 s. Answer remains 30 m; T=2sqrt(3)>3 s. Retain as Easy or replace for a Medium set.

**Original replacement/revision brief:** Use the corrected airborne statement above but add a measured velocity direction at a second time; infer launch components and determine horizontal displacement.

**Academic status:** draft, approval pending.

- [ ] Reviewer independently verifies all options, solution, units, physical interval and difficulty.
- [ ] Reviewer records name, date, decision and hash of the exact final reviewed record.

### GNO-PHY11-C03-M-010 — Medium

**Topic:** Projectile height at an instant

A particle is launched at 30 m/s at 30° above horizontal. With g=10 m/s², find its vertical displacement after 2 s.

A. 20 m
B. 30 m
C. 10 m
D. 0 m

**Supplied key:** C — 10 m

**Supplied explanation:** Initial vertical velocity=30 sin30°=15 m/s. y=u_y t−(g t²)/2=15×2−5×4=10 m.

**Independent calculation:** uy=30sin30°=15 m/s; y(2)=15(2)-5(4)=10 m. Same-level return time is 3 s, so t=2 is before return.

**Findings:** Repetition concern: D02

**Proposed correction:** No calculation/key change proposed.

**Original replacement/revision brief:** Replace this reused trajectory with an inverse two-component measurement: infer launch speed from known position at a specified time, and find its later apex height.

**Academic status:** draft, approval pending.

- [ ] Reviewer independently verifies all options, solution, units, physical interval and difficulty.
- [ ] Reviewer records name, date, decision and hash of the exact final reviewed record.

### GNO-PHY11-C03-M-011 — Medium

**Topic:** Horizontal projection time

A ball leaves a table horizontally and falls 45 m vertically. With g=10 m/s², how long is it in flight?

A. 4.5 s
B. sqrt(3) s
C. 9 s
D. 3 s

**Supplied key:** D — 3 s

**Supplied explanation:** Vertical motion begins with zero vertical velocity. 45=(1/2)×10×t² so t²=9 and t=3 s.

**Independent calculation:** 45=gt²/2=5t² gives positive t=3 s; the negative mathematical root is unphysical.

**Findings:** Difficulty: likely Easy direct formula/basic calculation rather than moderate Medium.

**Proposed correction:** No calculation/key change proposed.

**Original replacement/revision brief:** Give horizontal range and horizontal launch speed to infer flight time and drop height, then calculate impact velocity direction.

**Academic status:** draft, approval pending.

- [ ] Reviewer independently verifies all options, solution, units, physical interval and difficulty.
- [ ] Reviewer records name, date, decision and hash of the exact final reviewed record.

### GNO-PHY11-C03-M-012 — Medium

**Topic:** Horizontal projectile range

A stone leaves a 20 m high cliff horizontally at 12 m/s. With g=10 m/s², find its horizontal range.

A. 24 m
B. 12 m
C. 48 m
D. 20 m

**Supplied key:** A — 24 m

**Supplied explanation:** Time to fall = sqrt(2h/g)=sqrt(40/10)=2 s; horizontal range =12×2=24 m.

**Independent calculation:** Fall time=sqrt(2(20)/10)=2 s; x=12(2)=24 m.

**Findings:** No specific content flag found; suitable foundational question provisionally. Academic review still pending.

**Proposed correction:** No calculation/key change proposed.

**Original replacement/revision brief:** Retain provisionally after qualified review.

**Academic status:** draft, approval pending.

- [ ] Reviewer independently verifies all options, solution, units, physical interval and difficulty.
- [ ] Reviewer records name, date, decision and hash of the exact final reviewed record.

### GNO-PHY11-C03-M-013 — Medium

**Topic:** Horizontal projectile impact speed

A pebble is launched horizontally at 6 m/s from a height of 5 m. With g=10 m/s², find its speed just before impact.

A. 16 m/s
B. 2sqrt(34) m/s
C. 4sqrt(6) m/s
D. sqrt(34) m/s

**Supplied key:** B — 2sqrt(34) m/s

**Supplied explanation:** Vertical impact speed sqrt(2gh)=10 m/s; resultant speed sqrt(6²+10²)=sqrt136=2sqrt34 m/s.

**Independent calculation:** vy²=2gh=100 m²/s²; impact speed=sqrt(6²+100)=sqrt(136)=2sqrt(34) m/s.

**Findings:** No specific content flag found; suitable foundational question provisionally. Academic review still pending.

**Proposed correction:** No calculation/key change proposed.

**Original replacement/revision brief:** Retain provisionally after qualified review.

**Academic status:** draft, approval pending.

- [ ] Reviewer independently verifies all options, solution, units, physical interval and difficulty.
- [ ] Reviewer records name, date, decision and hash of the exact final reviewed record.

### GNO-PHY11-C03-M-014 — Medium

**Topic:** Vector projection

The vector A=5î+12ĵ makes some angle with B=3î+4ĵ. Find the scalar projection of A along B.

A. 13
B. 63/25
C. 63/5
D. 12

**Supplied key:** C — 63/5

**Supplied explanation:** The unit direction along B is (3î+4ĵ)/5. The scalar projection of A onto B is A·B/|B|=(5×3+12×4)/5=63/5.

**Independent calculation:** A dot B=15+48=63; |B|=5; scalar projection=63/5. Its magnitude is <=|A|=13 as required.

**Findings:** No specific content flag found; suitable foundational question provisionally. Academic review still pending.

**Proposed correction:** No calculation/key change proposed.

**Original replacement/revision brief:** Retain provisionally after qualified review.

**Academic status:** draft, approval pending.

- [ ] Reviewer independently verifies all options, solution, units, physical interval and difficulty.
- [ ] Reviewer records name, date, decision and hash of the exact final reviewed record.

### GNO-PHY11-C03-M-015 — Medium

**Topic:** Vector addition in components

Three planar displacements are A=4î−3ĵ, B=−2î+7ĵ and C=3î−8ĵ, in metres. Find the magnitude of their resultant.

A. sqrt(29) m
B. 5 m
C. 9 m
D. sqrt(41) m

**Supplied key:** D — sqrt(41) m

**Supplied explanation:** The total is (4−2+3)î+(−3+7−8)ĵ=5î−4ĵ m. Its magnitude is sqrt(5²+(−4)²)=sqrt41 m.

**Independent calculation:** Resultant components=(4-2+3,-3+7-8)=(5,-4) m; magnitude=sqrt(41) m.

**Findings:** No specific content flag found; suitable foundational question provisionally. Academic review still pending.

**Proposed correction:** No calculation/key change proposed.

**Original replacement/revision brief:** Retain provisionally after qualified review.

**Academic status:** draft, approval pending.

- [ ] Reviewer independently verifies all options, solution, units, physical interval and difficulty.
- [ ] Reviewer records name, date, decision and hash of the exact final reviewed record.

### GNO-PHY11-C03-M-016 — Medium

**Topic:** Angle and resultant

Two forces of magnitude 10 N each act with an angle of 120° between them. Find their resultant magnitude.

A. 10 N
B. 20 N
C. 10sqrt(3) N
D. 5 N

**Supplied key:** A — 10 N

**Supplied explanation:** R² = A²+B²+2AB cos120°=100+100−100=100, so R=10 N.

**Independent calculation:** R²=10²+10²+2(10)(10)cos120°=100 N²; R=10 N.

**Findings:** Difficulty: likely Easy direct formula/basic calculation rather than moderate Medium.

**Proposed correction:** No calculation/key change proposed.

**Original replacement/revision brief:** Use two unknown force magnitudes with fixed ratio and measured resultant direction to infer both magnitudes and included-angle feasibility.

**Academic status:** draft, approval pending.

- [ ] Reviewer independently verifies all options, solution, units, physical interval and difficulty.
- [ ] Reviewer records name, date, decision and hash of the exact final reviewed record.

### GNO-PHY11-C03-M-017 — Medium

**Topic:** Uniform circular motion acceleration

A particle makes one revolution every 2 s in a circle of radius 2 m. Find its centripetal acceleration.

A. π² m/s²
B. 2π² m/s²
C. 4π² m/s²
D. 2π m/s²

**Supplied key:** B — 2π² m/s²

**Supplied explanation:** Its angular speed is ω=2π/T=π rad/s. Thus a_c=ω²r=π²×2=2π² m/s².

**Independent calculation:** omega=2pi/2=pi rad/s; ac=omega²r=2pi² m/s².

**Findings:** Difficulty: likely Easy direct formula/basic calculation rather than moderate Medium.; Repetition concern: D01

**Proposed correction:** No calculation/key change proposed.

**Original replacement/revision brief:** Infer a circular orbit radius from measured speed and period, then compute radial acceleration; avoid another frequency-to-acceleration substitution.

**Academic status:** draft, approval pending.

- [ ] Reviewer independently verifies all options, solution, units, physical interval and difficulty.
- [ ] Reviewer records name, date, decision and hash of the exact final reviewed record.

### GNO-PHY11-C03-M-018 — Medium

**Topic:** Frequency and radial acceleration

A point on a rotor is 0.5 m from the axis. The rotor completes 3 revolutions each second. Find the centripetal acceleration of the point.

A. 6π² m/s²
B. 9π² m/s²
C. 18π² m/s²
D. 3π m/s²

**Supplied key:** C — 18π² m/s²

**Supplied explanation:** ω=2πf=6π rad/s. Thus a_c=ω²r=(6π)²×0.5=18π² m/s².

**Independent calculation:** f=3 Hz, omega=6pi rad/s; ac=0.5(6pi)²=18pi² m/s². Same numerical structure as M017.

**Findings:** Difficulty: likely Easy direct formula/basic calculation rather than moderate Medium.; Repetition concern: D01

**Proposed correction:** No calculation/key change proposed.

**Original replacement/revision brief:** Use two points of a rigid rotating disc with known radius difference and measured speed difference to infer angular speed and the inner point's radial acceleration.

**Academic status:** draft, approval pending.

- [ ] Reviewer independently verifies all options, solution, units, physical interval and difficulty.
- [ ] Reviewer records name, date, decision and hash of the exact final reviewed record.

### GNO-PHY11-C03-M-019 — Medium

**Topic:** Angular motion to linear speed

A disc of radius 0.4 m completes 10 revolutions in 5 s. Find the linear speed of a point on its rim.

A. 0.8π m/s
B. 4π m/s
C. 2π m/s
D. 1.6π m/s

**Supplied key:** D — 1.6π m/s

**Supplied explanation:** Frequency is f=10/5=2 Hz. Then ω=2πf=4π rad/s and tangential speed v=rω=0.4×4π=1.6π m/s.

**Independent calculation:** f=10/5=2 Hz; v=2pi r f=1.6pi m/s.

**Findings:** Difficulty: likely Easy direct formula/basic calculation rather than moderate Medium.

**Proposed correction:** No calculation/key change proposed.

**Original replacement/revision brief:** Specify a rim point's speed and radial acceleration, infer radius and period, and check the units of both recovered quantities.

**Academic status:** draft, approval pending.

- [ ] Reviewer independently verifies all options, solution, units, physical interval and difficulty.
- [ ] Reviewer records name, date, decision and hash of the exact final reviewed record.

### GNO-PHY11-C03-M-020 — Medium

**Topic:** Centripetal force

A 0.5 kg bead travels in a circle of radius 2 m and completes one full turn in 2 s. Find its centripetal force magnitude.

A. π² N
B. 2π² N
C. 0.5π² N
D. 4π² N

**Supplied key:** A — π² N

**Supplied explanation:** Angular speed ω=2π/T=π rad/s; radial force F=mω²r=0.5×π²×2=π² N.

**Independent calculation:** omega=pi rad/s, ac=2pi² m/s²; net radial force m ac=0.5(2pi²)=pi² N. Requires Newton's second law.

**Findings:** Centripetal force requires Newton's second law; confirm prerequisite placement. Same r=2 m,T=2 s scenario as M017, with mass added; do not count a new topic label as deep diversity.

**Proposed correction:** Keep as a moderate application only if Newton's second law is a permitted prerequisite; otherwise replace with a kinematic question about the direction of radial acceleration at two specified positions, using a distinct scenario.

**Original replacement/revision brief:** Retain provisionally after qualified review.

**Academic status:** draft, approval pending.

- [ ] Reviewer independently verifies all options, solution, units, physical interval and difficulty.
- [ ] Reviewer records name, date, decision and hash of the exact final reviewed record.

### GNO-PHY11-C03-H-001 — Hard

**Topic:** Vector geometry and constraints

Nonzero vectors A and B have magnitudes 5 and 7. Their resultant has magnitude sqrt(39). What is the angle between A and B?

A. 60°
B. 90°
C. 120°
D. 150°

**Supplied key:** C — 120°

**Supplied explanation:** |A+B|²=25+49+70cosθ=39, so cosθ=−35/70=−1/2. Hence θ=120°.

**Independent calculation:** R²=25+49+70cos(theta)=39 gives cos(theta)=-1/2 and principal included angle 120°.

**Findings:** Difficulty: routine or moderate application as written; not enough evidence of genuinely challenging Hard complexity. Qualified reviewer must justify retention or replace.

**Proposed correction:** No calculation/key change proposed.

**Original replacement/revision brief:** Infer two unknown vector magnitudes and their included angle using independent resultant, difference and projection constraints; specify sign branches and check feasibility.

**Academic status:** draft, approval pending.

- [ ] Reviewer independently verifies all options, solution, units, physical interval and difficulty.
- [ ] Reviewer records name, date, decision and hash of the exact final reviewed record.

### GNO-PHY11-C03-H-002 — Hard

**Topic:** Three-vector resultant

Three forces are 10 N along +x, 6 N at 120° to +x, and 6 N at 240° to +x. What is their resultant?

A. 10 N along +x
B. 4 N along −x
C. 16 N along +x
D. 4 N along +x

**Supplied key:** D — 4 N along +x

**Supplied explanation:** The y-components of the two 6 N forces cancel. Their combined x-component is 6cos120°+6cos240°=−6 N. Adding +10 N gives +4 N.

**Independent calculation:** The two 6 N forces have cancelling y components and x sum -6 N. Resultant=(4,0) N, hence +x.

**Findings:** Difficulty: routine or moderate application as written; not enough evidence of genuinely challenging Hard complexity. Qualified reviewer must justify retention or replace.

**Proposed correction:** No calculation/key change proposed.

**Original replacement/revision brief:** Determine an unknown force direction and magnitude required to keep the resultant on a prescribed ray while minimizing that magnitude; compare interior and boundary direction cases.

**Academic status:** draft, approval pending.

- [ ] Reviewer independently verifies all options, solution, units, physical interval and difficulty.
- [ ] Reviewer records name, date, decision and hash of the exact final reviewed record.

### GNO-PHY11-C03-H-003 — Hard

**Topic:** Vector magnitude and scalar constraints

A = 4î + 3ĵ and B = kî − 2ĵ. If |A+B| = 5 and k > −4, find k.

A. sqrt(24) − 4
B. −sqrt(24) − 4
C. 1
D. sqrt(26) − 4

**Supplied key:** A — sqrt(24) − 4

**Supplied explanation:** A+B=(4+k)î+ĵ. Hence (4+k)²+1=25, so 4+k=+sqrt24 because k>−4. Thus k=sqrt24−4.

**Independent calculation:** A+B=(4+k,1). Magnitude 5 means (4+k)²=24; k>-4 selects k=sqrt(24)-4. The other root violates the supplied constraint.

**Findings:** Difficulty: routine or moderate application as written; not enough evidence of genuinely challenging Hard complexity. Qualified reviewer must justify retention or replace.

**Proposed correction:** No calculation/key change proposed.

**Original replacement/revision brief:** Give an unknown vector with a fixed norm and prescribed projections on two nonorthogonal directions; determine all feasible vectors and identify incompatible measurements.

**Academic status:** draft, approval pending.

- [ ] Reviewer independently verifies all options, solution, units, physical interval and difficulty.
- [ ] Reviewer records name, date, decision and hash of the exact final reviewed record.

### GNO-PHY11-C03-H-004 — Hard

**Topic:** Vector dot product and angle

Vectors A and B satisfy |A|=4, |B|=6 and |A−B|=sqrt(28). Find A·B.

A. −12
B. 12
C. 24
D. 6

**Supplied key:** B — 12

**Supplied explanation:** |A−B|²=|A|²+|B|²−2A·B. So 28=16+36−2A·B, giving A·B=12.

**Independent calculation:** 28=4²+6²-2(A dot B), so A dot B=(52-28)/2=12.

**Findings:** Difficulty: routine or moderate application as written; not enough evidence of genuinely challenging Hard complexity. Qualified reviewer must justify retention or replace.

**Proposed correction:** No calculation/key change proposed.

**Original replacement/revision brief:** Use three pairwise vector-sum magnitudes to recover mutual dot products, then test whether the proposed planar geometry is realizable via the Gram determinant.

**Academic status:** draft, approval pending.

- [ ] Reviewer independently verifies all options, solution, units, physical interval and difficulty.
- [ ] Reviewer records name, date, decision and hash of the exact final reviewed record.

### GNO-PHY11-C03-H-005 — Hard

**Topic:** Vector algebra identities

Nonzero vectors A and B have A·B=12 and |A×B|=16. What is |A||B|?

A. 28
B. 4
C. 20
D. sqrt(112)

**Supplied key:** C — 20

**Supplied explanation:** (A·B)²+|A×B|²=|A|²|B|². Thus |A||B|=sqrt(144+256)=20.

**Independent calculation:** |A|²|B|²=(A dot B)²+|A cross B|²=12²+16²=400; the nonnegative product is 20.

**Findings:** Difficulty: routine or moderate application as written; not enough evidence of genuinely challenging Hard complexity. Qualified reviewer must justify retention or replace.

**Proposed correction:** No calculation/key change proposed.

**Original replacement/revision brief:** Combine a fixed vector product magnitude with a tunable component constraint; find the minimum possible resultant magnitude and prove that the bound is attained.

**Academic status:** draft, approval pending.

- [ ] Reviewer independently verifies all options, solution, units, physical interval and difficulty.
- [ ] Reviewer records name, date, decision and hash of the exact final reviewed record.

### GNO-PHY11-C03-H-006 — Hard

**Topic:** Vector relative motion

A boat points due north at 8 m/s relative to water, while the river flows east at 6 m/s. If the river is 200 m wide, how far downstream does the boat land?

A. 200 m
B. 250 m
C. 120 m
D. 150 m

**Supplied key:** D — 150 m

**Supplied explanation:** Northward component is 8 m/s so crossing time=200/8=25 s. Eastward drift=6×25=150 m.

**Independent calculation:** Northward speed 8 m/s crosses 200 m in 25 s; eastward current then causes drift 6(25)=150 m, assuming constant current and a straight east-west bank pair.

**Findings:** Difficulty: routine or moderate application as written; not enough evidence of genuinely challenging Hard complexity. Qualified reviewer must justify retention or replace.

**Proposed correction:** No calculation/key change proposed.

**Original replacement/revision brief:** Use a river current varying with distance from the bank and a fixed boat speed; compare least-time and zero-drift headings with a supplied current integral, including feasibility.

**Academic status:** draft, approval pending.

- [ ] Reviewer independently verifies all options, solution, units, physical interval and difficulty.
- [ ] Reviewer records name, date, decision and hash of the exact final reviewed record.

### GNO-PHY11-C03-H-007 — Hard

**Topic:** Relative velocity in two dimensions

Two aircraft have velocities v₁=30î+10ĵ m/s and v₂=6î−8ĵ m/s. Find the magnitude of aircraft 1 velocity relative to aircraft 2.

A. 30 m/s
B. 42 m/s
C. sqrt(468) m/s
D. 24 m/s

**Supplied key:** A — 30 m/s

**Supplied explanation:** Relative velocity v₁−v₂=24î+18ĵ m/s; its magnitude=sqrt(24²+18²)=30 m/s.

**Independent calculation:** Relative velocity=(30-6,10-(-8))=(24,18) m/s; magnitude=sqrt(576+324)=30 m/s.

**Findings:** Difficulty: routine or moderate application as written; not enough evidence of genuinely challenging Hard complexity. Qualified reviewer must justify retention or replace.

**Proposed correction:** No calculation/key change proposed.

**Original replacement/revision brief:** Given a moving observer and two timed bearing constraints, infer another object's planar velocity and determine its earliest entry into a safety circle.

**Academic status:** draft, approval pending.

- [ ] Reviewer independently verifies all options, solution, units, physical interval and difficulty.
- [ ] Reviewer records name, date, decision and hash of the exact final reviewed record.

### GNO-PHY11-C03-H-008 — Hard

**Topic:** Projectile constraints: time and height

A projectile passes through the same nonzero height at t=1 s and t=5 s after launch. With g=10 m/s², what was its initial vertical velocity?

A. 20 m/s
B. 30 m/s
C. 15 m/s
D. 60 m/s

**Supplied key:** B — 30 m/s

**Supplied explanation:** For y(t)=u_y t−5t², the two times at one height sum to 2u_y/g. Hence 1+5=2u_y/10, giving u_y=30 m/s.

**Independent calculation:** Equal heights at t1,t2 imply uy=g(t1+t2)/2=10(6)/2=30 m/s. Height then equals 25 m above launch, consistent with nonzero height.

**Findings:** Difficulty: routine or moderate application as written; not enough evidence of genuinely challenging Hard complexity. Qualified reviewer must justify retention or replace.

**Proposed correction:** No calculation/key change proposed.

**Original replacement/revision brief:** Measure two height crossings and the horizontal separation between them; infer both launch components and derive the range of obstacle heights that can be cleared.

**Academic status:** draft, approval pending.

- [ ] Reviewer independently verifies all options, solution, units, physical interval and difficulty.
- [ ] Reviewer records name, date, decision and hash of the exact final reviewed record.

### GNO-PHY11-C03-H-009 — Hard

**Topic:** Projectile apex from measured speed

A projectile leaves the ground at 25 m/s. Its speed at the highest point is 15 m/s. With g=10 m/s², find its maximum height.

A. 10 m
B. 15 m
C. 20 m
D. 25 m

**Supplied key:** C — 20 m

**Supplied explanation:** At the top speed equals u_x=15. Thus u_y²=25²−15²=400, and H=u_y²/(2g)=400/20=20 m.

**Independent calculation:** At apex horizontal speed=15 m/s. Initial uy²=25²-15²=400; max height=400/20=20 m.

**Findings:** Difficulty: routine or moderate application as written; not enough evidence of genuinely challenging Hard complexity. Qualified reviewer must justify retention or replace.

**Proposed correction:** No calculation/key change proposed.

**Original replacement/revision brief:** Add a finite-height wall at a given distance and infer the range of possible launch angles consistent with an apex-speed measurement; distinguish tangent and two-angle cases.

**Academic status:** draft, approval pending.

- [ ] Reviewer independently verifies all options, solution, units, physical interval and difficulty.
- [ ] Reviewer records name, date, decision and hash of the exact final reviewed record.

### GNO-PHY11-C03-H-010 — Hard

**Topic:** Projectile inverse launch angle

A projectile launched from ground at 20 m/s has horizontal range 20sqrt(3) m with g=10 m/s². Which pair of launch angles is possible?

A. 15° and 75°
B. 20° and 70°
C. 45° and 45°
D. 30° and 60°

**Supplied key:** D — 30° and 60°

**Supplied explanation:** R=(u²/g)sin2θ=40sin2θ. Hence sin2θ=sqrt3/2, giving 2θ=60° or 120° and θ=30° or 60°.

**Independent calculation:** R g/u²=(20sqrt(3))(10)/400=sqrt(3)/2=sin(2theta). With 0<theta<90°, roots are 30° and 60°. Both satisfy same-height range.

**Findings:** Difficulty: routine or moderate application as written; not enough evidence of genuinely challenging Hard complexity. Qualified reviewer must justify retention or replace.

**Proposed correction:** No calculation/key change proposed.

**Original replacement/revision brief:** Ask for the minimum launch speed that clears two different-height obstacles at specified distances; compare which constraint is active and check the resulting trajectory.

**Academic status:** draft, approval pending.

- [ ] Reviewer independently verifies all options, solution, units, physical interval and difficulty.
- [ ] Reviewer records name, date, decision and hash of the exact final reviewed record.

### GNO-PHY11-C03-H-011 — Hard

**Topic:** Projectile coordinate condition

A projectile launched from ground with speed 20 m/s at 45° passes a point at horizontal distance 20 m. Take g=10 m/s². Find its height there.

A. 10 m
B. 5 m
C. 15 m
D. 20 m

**Supplied key:** A — 10 m

**Supplied explanation:** Trajectory y=x tanθ−g x²/(2u² cos²θ). At θ=45°, y=20−(10×400)/(2×400×1/2)=20−10=10 m.

**Independent calculation:** vx=20/sqrt(2); at x=20, t=sqrt(2) s. y=(20/sqrt(2))sqrt(2)-5(2)=10 m; t precedes same-level landing.

**Findings:** Difficulty: routine or moderate application as written; not enough evidence of genuinely challenging Hard complexity. Qualified reviewer must justify retention or replace.

**Proposed correction:** No calculation/key change proposed.

**Original replacement/revision brief:** Infer unknown speed and angle from two nonzero measured trajectory points and determine whether a third obstacle is cleared with a stated margin.

**Academic status:** draft, approval pending.

- [ ] Reviewer independently verifies all options, solution, units, physical interval and difficulty.
- [ ] Reviewer records name, date, decision and hash of the exact final reviewed record.

### GNO-PHY11-C03-H-012 — Hard

**Topic:** Projectile moving target

A ball is fired horizontally at 20 m/s from a height of 80 m. At the same instant, a target on the ground begins moving away horizontally at 5 m/s from the point directly below the launch point. With g=10 m/s², what horizontal gap remains between them when the ball reaches the ground?

A. 40 m
B. 60 m
C. 80 m
D. 100 m

**Supplied key:** B — 60 m

**Supplied explanation:** Fall time sqrt(2h/g)=sqrt(160/10)=4 s. Ball moves 20×4=80 m and target moves 5×4=20 m, so horizontal separation is 60 m.

**Independent calculation:** Fall time=sqrt(160/10)=4 s; projectile x=80 m, target x=20 m; absolute horizontal gap=60 m, projectile ahead. Direction of target travel needs explicit +x.

**Findings:** Difficulty: routine or moderate application as written; not enough evidence of genuinely challenging Hard complexity. Qualified reviewer must justify retention or replace.; Define target direction as +x (same horizontal direction as launch); away from the point below the tower could mean either horizontal direction. Opposite travel would give 100 m, also a listed option.

**Proposed correction:** Corrected stem: Launch is along +x and the target moves at +5 m/s on the ground, starting at x=0. Ask for absolute horizontal separation at impact. Existing key 60 m remains correct. Difficulty is moderate, so a Hard replacement must add a nontrivial independent constraint.

**Original replacement/revision brief:** Use a target with an initial horizontal offset and a delayed start; find all feasible launch angles at fixed speed that intercept it on the ground, checking physical flight times.

**Academic status:** draft, approval pending.

- [ ] Reviewer independently verifies all options, solution, units, physical interval and difficulty.
- [ ] Reviewer records name, date, decision and hash of the exact final reviewed record.

### GNO-PHY11-C03-H-013 — Hard

**Topic:** Relative projectiles with common gravity

Two projectiles are launched simultaneously from the same point with velocities (10î+20ĵ) m/s and (−5î+10ĵ) m/s. Neglect air drag. What is their separation after 2 s?

A. 5sqrt(13) m
B. 20sqrt(13) m
C. 10sqrt(13) m
D. 30 m

**Supplied key:** C — 10sqrt(13) m

**Supplied explanation:** Both receive identical gravitational acceleration, so relative acceleration is zero. Relative initial velocity=(15î+10ĵ) m/s; after 2 s, relative displacement=(30î+20ĵ) m. Magnitude=sqrt(900+400)=10sqrt13 m.

**Independent calculation:** Relative acceleration cancels; separation at 2 s is |(15,10)2|=sqrt(30²+20²)=10sqrt(13) m, provided both remain in free flight for the full interval. Common gravity alone does not specify impact boundaries.

**Findings:** Difficulty: routine or moderate application as written; not enough evidence of genuinely challenging Hard complexity. Qualified reviewer must justify retention or replace.; Explicitly state both projectiles remain airborne for at least 2 s, or give gravity and sufficient common launch height. Ignore collisions with surfaces throughout.

**Proposed correction:** Corrected stem addition: Both are launched from the same point at height 100 m above flat ground; g=10 m/s² and no drag. Ask separation at t=2 s. Heights are then 120 m and 100 m, so both remain airborne; existing answer 10sqrt(13) m holds.

**Original replacement/revision brief:** Launch two projectiles at different times from separated points; find the minimum separation while both are airborne and explicitly enforce their overlapping flight interval.

**Academic status:** draft, approval pending.

- [ ] Reviewer independently verifies all options, solution, units, physical interval and difficulty.
- [ ] Reviewer records name, date, decision and hash of the exact final reviewed record.

### GNO-PHY11-C03-H-014 — Hard

**Topic:** Projectile speed at a specified height

A projectile is fired at 30 m/s from ground. Ignoring drag, what is its speed when it has risen 25 m above launch point? Take g=10 m/s²; assume it reaches this height.

A. 10 m/s
B. 25 m/s
C. sqrt(650) m/s
D. 20 m/s

**Supplied key:** D — 20 m/s

**Supplied explanation:** Conservation of energy gives v²=u²−2gh=900−500=400. Thus v=20 m/s, independent of the launch angle if the height is reached.

**Independent calculation:** From vx constant and vy²=uy²-2gh, total v²=u²-2gh=900-500=400, so v=20 m/s whenever that height is reached. Energy is an alternative, later-chapter derivation.

**Findings:** Difficulty: routine or moderate application as written; not enough evidence of genuinely challenging Hard complexity. Qualified reviewer must justify retention or replace.

**Proposed correction:** No calculation/key change proposed.

**Original replacement/revision brief:** Combine a prescribed speed at one height with a required velocity direction at a different height; infer launch components, root branches and the accessible part of the trajectory.

**Academic status:** draft, approval pending.

- [ ] Reviewer independently verifies all options, solution, units, physical interval and difficulty.
- [ ] Reviewer records name, date, decision and hash of the exact final reviewed record.

### GNO-PHY11-C03-H-015 — Hard

**Topic:** Projectile velocity perpendicularity

A projectile starts with velocity components 12 m/s horizontally and 16 m/s upward. With g=10 m/s², at what time is its velocity perpendicular to its initial velocity?

A. 2.5 s
B. 1.6 s
C. 2 s
D. 4 s

**Supplied key:** A — 2.5 s

**Supplied explanation:** v₀=(12,16), v(t)=(12,16−10t). Dot product zero gives 144+16(16−10t)=0 =>400−160t=0 => t=2.5 s. (Ideal ballistic trajectory may continue below launch level; this is kinematic continuation.)

**Independent calculation:** v0 dot v(t)=12²+16(16-10t)=400-160t; zero at 2.5 s. Height then 16(2.5)-5(2.5²)=8.75 m ABOVE launch; return time=3.2 s. The explanation's continuation caveat is unnecessary for these data.

**Findings:** Difficulty: routine or moderate application as written; not enough evidence of genuinely challenging Hard complexity. Qualified reviewer must justify retention or replace.; Remove distracting continuation-below-launch-level caveat: y(2.5)=8.75 m and the result is obtained before return to launch level.

**Proposed correction:** Corrected explanation: 400-160t=0 gives t=2.5 s; since y=8.75 m>0, this occurs during flight above launch level. No kinematic-continuation exception is needed.

**Original replacement/revision brief:** Find when velocity becomes perpendicular to the line of sight from a second elevated observer, with a finite ground boundary; solve and reject roots after impact.

**Academic status:** draft, approval pending.

- [ ] Reviewer independently verifies all options, solution, units, physical interval and difficulty.
- [ ] Reviewer records name, date, decision and hash of the exact final reviewed record.

### GNO-PHY11-C03-H-016 — Hard

**Topic:** Horizontal launch onto an inclined plane

A ball is projected horizontally from the origin at 10 m/s above an infinite plane sloping downward at 45° to the horizontal. Find the horizontal distance to impact, using g=10 m/s².

A. 10 m
B. 20 m
C. 10sqrt(2) m
D. 40 m

**Supplied key:** B — 20 m

**Supplied explanation:** Projectile path y=−g x²/(2u²)=−x²/20. The inclined plane is y=−x tan45°=−x. At impact x²/20=x, so nonzero x=20 m.

**Independent calculation:** For u=10, projectile y=-x²/20. Plane through origin at -45° has y=-x. Intersection roots x=0 and x=20 m; exclude launch contact and take first subsequent impact x=20 m.

**Findings:** Difficulty: routine or moderate application as written; not enough evidence of genuinely challenging Hard complexity. Qualified reviewer must justify retention or replace.; Say launch is from the origin ON the plane y=-x and ask for first subsequent contact (t>0). The phrase above a plane does not define its offset by itself.

**Proposed correction:** Corrected stem: From the origin on the infinite plane y=-x (metres), launch horizontally in +x at 10 m/s with g=10 m/s² downward. Find x at the first contact after launch, ignoring drag. Answer is 20 m at t=2 s.

**Original replacement/revision brief:** For a fixed-speed projectile launched above an inclined plane, maximize the range measured along the plane over the feasible launch-angle interval and check the plane-contact root.

**Academic status:** draft, approval pending.

- [ ] Reviewer independently verifies all options, solution, units, physical interval and difficulty.
- [ ] Reviewer records name, date, decision and hash of the exact final reviewed record.

### GNO-PHY11-C03-H-017 — Hard

**Topic:** Projectile fired above level ground

A projectile is launched from the top of a 45 m tower with horizontal speed 12 m/s and upward vertical speed 10 m/s. With g=10 m/s², find its horizontal travel until ground impact.

A. 12sqrt(10) m
B. 24 m
C. 12(1+sqrt(10)) m
D. 12(1+sqrt(5)) m

**Supplied key:** C — 12(1+sqrt(10)) m

**Supplied explanation:** Vertical position relative to ground is 45+10t−5t²=0, so t²−2t−9=0; positive root t=1+sqrt10. Horizontal travel =12t=12(1+sqrt10) m.

**Independent calculation:** Ground-contact equation 45+10t-5t²=0 gives t=1+sqrt(10) s, the other root negative. Range=12(1+sqrt(10)) m.

**Findings:** Difficulty: routine or moderate application as written; not enough evidence of genuinely challenging Hard complexity. Qualified reviewer must justify retention or replace.

**Proposed correction:** No calculation/key change proposed.

**Original replacement/revision brief:** Infer tower height and launch components from impact position and impact-velocity direction plus a third timed observation; establish whether the data yield a unique physical launch.

**Academic status:** draft, approval pending.

- [ ] Reviewer independently verifies all options, solution, units, physical interval and difficulty.
- [ ] Reviewer records name, date, decision and hash of the exact final reviewed record.

### GNO-PHY11-C03-H-018 — Hard

**Topic:** Projectile trajectory symmetry

A projectile is launched at 30 m/s and 30° above horizontal, with g=10 m/s². At which two times is it 10 m above its launch level?

A. 0.5 s and 2.5 s
B. 1 s and 3 s
C. 2 s and 3 s
D. 1 s and 2 s

**Supplied key:** D — 1 s and 2 s

**Supplied explanation:** Vertical motion y=15t−5t². At y=10: 5t²−15t+10=0 => t²−3t+2=(t−1)(t−2)=0. Thus t=1 s and 2 s.

**Independent calculation:** y=15t-5t²=10 gives (t-1)(t-2)=0, hence 1 and 2 s. Same launch scenario as M010.

**Findings:** Difficulty: routine or moderate application as written; not enough evidence of genuinely challenging Hard complexity. Qualified reviewer must justify retention or replace.; Repetition concern: D02

**Proposed correction:** No calculation/key change proposed.

**Original replacement/revision brief:** Use a moving horizontal observation level rather than reusing M010; infer launch components from two relative-height crossings and a measured horizontal separation.

**Academic status:** draft, approval pending.

- [ ] Reviewer independently verifies all options, solution, units, physical interval and difficulty.
- [ ] Reviewer records name, date, decision and hash of the exact final reviewed record.

### GNO-PHY11-C03-H-019 — Hard

**Topic:** Range from two angle constraints

A projectile with fixed launch speed has maximum possible level-ground range 100 m. What is its range at a 15° launch angle?

A. 50 m
B. 25 m
C. 100 m
D. 50sqrt(3) m

**Supplied key:** A — 50 m

**Supplied explanation:** Maximum range R_max=u²/g=100 m. At 15°, R=(u²/g)sin30°=100×1/2=50 m.

**Independent calculation:** Same-height maximum range=u²/g=100 m; R(15°)=100sin30°=50 m.

**Findings:** Difficulty: routine or moderate application as written; not enough evidence of genuinely challenging Hard complexity. Qualified reviewer must justify retention or replace.

**Proposed correction:** No calculation/key change proposed.

**Original replacement/revision brief:** Optimize launch angle for range on a sloping landing surface with a prescribed fixed speed; derive the angle and compare to the level-ground special case.

**Academic status:** draft, approval pending.

- [ ] Reviewer independently verifies all options, solution, units, physical interval and difficulty.
- [ ] Reviewer records name, date, decision and hash of the exact final reviewed record.

### GNO-PHY11-C03-H-020 — Hard

**Topic:** Minimum separation of two moving particles

At t=0, particle A is at (0,0) and moves with constant velocity (3î+4ĵ) m/s, while B is at (20,0) and moves with velocity (−1î+2ĵ) m/s. What is their minimum separation for t ≥ 0?

A. 10 m
B. 4sqrt(5) m
C. 2sqrt(5) m
D. 20 m

**Supplied key:** B — 4sqrt(5) m

**Supplied explanation:** Relative position B−A=(20−4t)î−2tĵ. Square separation D²=(20−4t)²+4t²=400−160t+20t². Min at t=4 s; D²=80; D=4sqrt5 m.

**Independent calculation:** B-A=(20-4t,-2t); squared separation=20(t-4)²+80. Since 4>=0, minimum is sqrt(80)=4sqrt(5) m at 4 s.

**Findings:** Difficulty: routine or moderate application as written; not enough evidence of genuinely challenging Hard complexity. Qualified reviewer must justify retention or replace.

**Proposed correction:** No calculation/key change proposed.

**Original replacement/revision brief:** Use two particles with different constant accelerations and a restricted observation interval; find every stationary separation time, compare boundaries and reject nonphysical roots.

**Academic status:** draft, approval pending.

- [ ] Reviewer independently verifies all options, solution, units, physical interval and difficulty.
- [ ] Reviewer records name, date, decision and hash of the exact final reviewed record.

### GNO-PHY11-C03-H-021 — Hard

**Topic:** Angular kinematics and centripetal acceleration

A wheel starts from rest with constant angular acceleration 2 rad/s². A point on its rim is 0.5 m from the axis. What is its centripetal acceleration after 4 s?

A. 8 m/s²
B. 16 m/s²
C. 32 m/s²
D. 64 m/s²

**Supplied key:** C — 32 m/s²

**Supplied explanation:** At t=4 s, angular speed ω=αt=8 rad/s. Radial acceleration is rω²=0.5×64=32 m/s².

**Independent calculation:** omega=alpha t=8 rad/s; ac=r omega²=0.5(64)=32 m/s². Tangential acceleration is also present but is NOT asked.

**Findings:** Difficulty: routine or moderate application as written; not enough evidence of genuinely challenging Hard complexity. Qualified reviewer must justify retention or replace.

**Proposed correction:** No calculation/key change proposed.

**Original replacement/revision brief:** Use a specified nonconstant angular acceleration and a limit on total acceleration; determine the earliest limit crossing after integrating angular speed and combining radial and tangential components.

**Academic status:** draft, approval pending.

- [ ] Reviewer independently verifies all options, solution, units, physical interval and difficulty.
- [ ] Reviewer records name, date, decision and hash of the exact final reviewed record.

### GNO-PHY11-C03-H-022 — Hard

**Topic:** Nonuniform circular motion total acceleration

A particle moves around a circle of radius 2 m. At one instant its angular speed is 3 rad/s and angular acceleration is 4 rad/s². Find the magnitude of total acceleration.

A. 26 m/s²
B. 18 m/s²
C. 8 m/s²
D. 2sqrt(97) m/s²

**Supplied key:** D — 2sqrt(97) m/s²

**Supplied explanation:** Radial acceleration rω²=2×9=18; tangential acceleration rα=2×4=8. Perpendicular contributions give |a|=sqrt(18²+8²)=sqrt388=2sqrt97 m/s².

**Independent calculation:** Radial acceleration=2(3²)=18 m/s² and tangential=2(4)=8 m/s²; orthogonal magnitude=sqrt(388)=2sqrt(97) m/s².

**Findings:** Difficulty: routine or moderate application as written; not enough evidence of genuinely challenging Hard complexity. Qualified reviewer must justify retention or replace.

**Proposed correction:** No calculation/key change proposed.

**Original replacement/revision brief:** Infer a time-dependent speed law from two total-acceleration observations on a known circle, then find the first time radial and tangential accelerations become equal.

**Academic status:** draft, approval pending.

- [ ] Reviewer independently verifies all options, solution, units, physical interval and difficulty.
- [ ] Reviewer records name, date, decision and hash of the exact final reviewed record.

### GNO-PHY11-C03-H-023 — Hard

**Topic:** Circular relative angular motion

Two runners start together and move around the same circular track in opposite directions at constant angular speeds π/6 and π/3 rad/s. When will they first meet again?

A. 4 s
B. 2 s
C. 6 s
D. 12 s

**Supplied key:** A — 4 s

**Supplied explanation:** Relative angular speed is π/6+π/3=π/2 rad/s. A complete relative turn is 2π, so t=2π/(π/2)=4 s.

**Independent calculation:** Opposite directions give relative angular speed pi/6+pi/3=pi/2 rad/s; first reunion after 2pi/(pi/2)=4 s.

**Findings:** Difficulty: routine or moderate application as written; not enough evidence of genuinely challenging Hard complexity. Qualified reviewer must justify retention or replace.

**Proposed correction:** No calculation/key change proposed.

**Original replacement/revision brief:** Give one runner an angular acceleration and a delayed start; count all reunions within a finite time, treating angular displacement modulo 2pi and checking direction changes.

**Academic status:** draft, approval pending.

- [ ] Reviewer independently verifies all options, solution, units, physical interval and difficulty.
- [ ] Reviewer records name, date, decision and hash of the exact final reviewed record.

### GNO-PHY11-C03-H-024 — Hard

**Topic:** Circular average acceleration

A body moves uniformly around a circle with speed 10 m/s and period 8 s. What is the magnitude of its average acceleration during one quarter of a revolution?

A. 10sqrt(2) m/s²
B. 5sqrt(2) m/s²
C. 5 m/s²
D. 0 m/s²

**Supplied key:** B — 5sqrt(2) m/s²

**Supplied explanation:** After one-quarter turn, velocity directions differ by 90°, so |Δv|=10sqrt2 m/s. Time=8/4=2 s. Average acceleration magnitude=5sqrt2 m/s².

**Independent calculation:** Quarter turn means velocity vectors differ by 90°; |delta v|=10sqrt(2) m/s. Elapsed time=8/4=2 s; average acceleration magnitude=5sqrt(2) m/s², distinct from instantaneous radial acceleration.

**Findings:** Difficulty: routine or moderate application as written; not enough evidence of genuinely challenging Hard complexity. Qualified reviewer must justify retention or replace.

**Proposed correction:** No calculation/key change proposed.

**Original replacement/revision brief:** Find the angular interval that maximizes the magnitude of average acceleration for a specified observation duration when angular speed varies linearly; use vector endpoint velocities, not average speed.

**Academic status:** draft, approval pending.

- [ ] Reviewer independently verifies all options, solution, units, physical interval and difficulty.
- [ ] Reviewer records name, date, decision and hash of the exact final reviewed record.

### GNO-PHY11-C03-H-025 — Hard

**Topic:** Circular speed ratio and force

Two equal-mass objects move in separate circles with radii r and 4r. If their angular speeds are ω and ω/2, what is the ratio of their centripetal forces F₁/F₂?

A. 4 : 1
B. 1 : 4
C. 1 : 1
D. 2 : 1

**Supplied key:** C — 1 : 1

**Supplied explanation:** Centripetal force mω²r. F₁=mω²r and F₂=m(ω/2)²(4r)=mω²r, so ratio is 1:1.

**Independent calculation:** F1=m omega²r, F2=m(omega/2)²(4r)=m omega²r; ratio=1:1. Radius and angular speed changes cancel exactly.

**Findings:** Difficulty: routine or moderate application as written; not enough evidence of genuinely challenging Hard complexity. Qualified reviewer must justify retention or replace.

**Proposed correction:** No calculation/key change proposed.

**Original replacement/revision brief:** Combine two radius-dependent speed laws and a prescribed total-acceleration ratio to infer unknown exponents, while distinguishing radial from tangential acceleration.

**Academic status:** draft, approval pending.

- [ ] Reviewer independently verifies all options, solution, units, physical interval and difficulty.
- [ ] Reviewer records name, date, decision and hash of the exact final reviewed record.

### GNO-PHY11-C03-H-026 — Hard

**Topic:** Period from radial acceleration

A point moves in a circle of radius 0.8 m with centripetal acceleration 5π² m/s². Find its time period.

A. 0.4 s
B. 1.6 s
C. 2π s
D. 0.8 s

**Supplied key:** D — 0.8 s

**Supplied explanation:** a_c=4π²r/T², so T²=(4π²×0.8)/(5π²)=0.64, giving T=0.8 s.

**Independent calculation:** T²=4pi²(0.8)/(5pi²)=0.64 s²; positive period T=0.8 s.

**Findings:** Difficulty: routine or moderate application as written; not enough evidence of genuinely challenging Hard complexity. Qualified reviewer must justify retention or replace.

**Proposed correction:** No calculation/key change proposed.

**Original replacement/revision brief:** Infer radius and nonuniform angular-motion parameters from a measured radial acceleration and two timed angular displacements, checking all admissible parameter roots.

**Academic status:** draft, approval pending.

- [ ] Reviewer independently verifies all options, solution, units, physical interval and difficulty.
- [ ] Reviewer records name, date, decision and hash of the exact final reviewed record.

### GNO-PHY11-C03-H-027 — Hard

**Topic:** Average velocity versus speed on circle

A particle completes three quarters of a circle of radius 14 m in 6 s at constant speed. Find the ratio of the magnitude of average velocity to average speed.

A. 2sqrt(2)/(3π)
B. 2/(3π)
C. sqrt(2)/π
D. 1/3

**Supplied key:** A — 2sqrt(2)/(3π)

**Supplied explanation:** Displacement magnitude between endpoints separated by 90° is 14sqrt2 m. Distance=3/4×2π×14=21π m. Ratio=14sqrt2/(21π)=2sqrt2/(3π).

**Independent calculation:** Endpoint chord=2r sin(3pi/4)=r sqrt(2); arc=3pi r/2. Ratio of average-velocity magnitude to average speed is chord/arc=2sqrt(2)/(3pi). Radius and elapsed time cancel.

**Findings:** Difficulty: routine or moderate application as written; not enough evidence of genuinely challenging Hard complexity. Qualified reviewer must justify retention or replace.

**Proposed correction:** No calculation/key change proposed.

**Original replacement/revision brief:** Compare the ratio of average-velocity magnitude to average speed over a variable-speed circular arc under a supplied speed-position law; derive the elapsed time and chord and enforce the accessible arc.

**Academic status:** draft, approval pending.

- [ ] Reviewer independently verifies all options, solution, units, physical interval and difficulty.
- [ ] Reviewer records name, date, decision and hash of the exact final reviewed record.

### GNO-PHY11-C03-H-028 — Hard

**Topic:** Projectile angle from velocity observations

A projectile is launched from level ground with initial speed 20 m/s and reaches its highest point 1.2 s later. If g=10 m/s², what is the horizontal component of its initial velocity?

A. 12 m/s
B. 16 m/s
C. 8 m/s
D. sqrt(544) m/s

**Supplied key:** B — 16 m/s

**Supplied explanation:** At the top, 0=u_y−gt, so u_y=10×1.2=12 m/s. Then u_x=sqrt(u²−u_y²)=sqrt(400−144)=16 m/s.

**Independent calculation:** uy=g t_apex=12 m/s; |ux|=sqrt(20²-12²)=16 m/s. Signed ux can be +16 OR -16 without a horizontal direction convention; ask for its magnitude.

**Findings:** Difficulty: routine or moderate application as written; not enough evidence of genuinely challenging Hard complexity. Qualified reviewer must justify retention or replace.; Ask for the magnitude of the horizontal component, or declare the positive launch direction. Speed and apex time alone determine |ux|, not its sign.

**Proposed correction:** Corrected stem: ...what is the MAGNITUDE of the horizontal component of its initial velocity? Answer remains 16 m/s; no unjustified positive-axis inference is required.

**Original replacement/revision brief:** Infer both initial velocity components from two measured velocity-direction angles at different times, then check whether a specified wall can be cleared before impact.

**Academic status:** draft, approval pending.

- [ ] Reviewer independently verifies all options, solution, units, physical interval and difficulty.
- [ ] Reviewer records name, date, decision and hash of the exact final reviewed record.

### GNO-PHY11-C03-H-029 — Hard

**Topic:** Projectile two-time horizontal separation

A projectile is launched from ground at 25 m/s and returns to the launch height after 3 s (g=10 m/s²). How far horizontally does it travel during the LAST 1 second of its flight?

A. 15 m
B. 25 m
C. 20 m
D. 10 m

**Supplied key:** C — 20 m

**Supplied explanation:** T=2u_y/g gives u_y=15 m/s. Since u=25, horizontal speed u_x=sqrt(625−225)=20 m/s. Horizontal speed is constant, so travel in the final second is 20 m.

**Independent calculation:** Flight time 3 s implies uy=15 m/s; |ux|=sqrt(25²-15²)=20 m/s; distance in final 1 s is 20 m, independent of which final-second interval is chosen while airborne.

**Findings:** Difficulty: routine or moderate application as written; not enough evidence of genuinely challenging Hard complexity. Qualified reviewer must justify retention or replace.

**Proposed correction:** No calculation/key change proposed.

**Original replacement/revision brief:** Use a projectile returning to a moving platform of known speed with a vertical launch offset; infer components from total relative range and flight time, then test a second interception constraint.

**Academic status:** draft, approval pending.

- [ ] Reviewer independently verifies all options, solution, units, physical interval and difficulty.
- [ ] Reviewer records name, date, decision and hash of the exact final reviewed record.

### GNO-PHY11-C03-H-030 — Hard

**Topic:** Vector resultant with opposite constraints

Two vectors of unequal magnitudes have resultant 13 when aligned and 5 when opposite. If they are then placed perpendicular, what is the resultant magnitude?

A. sqrt(119)
B. 12
C. sqrt(169)
D. sqrt(97)

**Supplied key:** D — sqrt(97)

**Supplied explanation:** Let magnitudes a>b. From a+b=13 and a−b=5, get a=9,b=4. Perpendicular resultant sqrt(a²+b²)=sqrt(81+16)=sqrt97.

**Independent calculation:** a+b=13 and a-b=5 give a=9,b=4 (or exchanged labels). Perpendicular resultant=sqrt(9²+4²)=sqrt(97).

**Findings:** Difficulty: routine or moderate application as written; not enough evidence of genuinely challenging Hard complexity. Qualified reviewer must justify retention or replace.

**Proposed correction:** No calculation/key change proposed.

**Original replacement/revision brief:** Recover two vector magnitudes from uncertain aligned/opposed resultant intervals, then derive tight bounds on a perpendicular resultant; prove simultaneous attainability of the bounds.

**Academic status:** draft, approval pending.

- [ ] Reviewer independently verifies all options, solution, units, physical interval and difficulty.
- [ ] Reviewer records name, date, decision and hash of the exact final reviewed record.

## Six configurations retained

| Difficulty | Questions | Minutes | Current Chapter 3 availability |
| ---------- | --------: | ------: | ------------------------------ |
| Easy       |        10 |      10 | Disabled:0 approved            |
| Medium     |        10 |      20 | Disabled:0 approved            |
| Medium     |        20 |      40 | Disabled:0 approved            |
| Hard       |        10 |      30 | Disabled:0 approved            |
| Hard       |        20 |      60 | Disabled:0 approved            |
| Hard       |        30 |      90 | Disabled:0 approved            |

Configuration choices remain difficulty-first and count-selectable among permitted sizes; counts are never used to infer difficulty, nor are other difficulties used to fill a short bank. Single MCQs retain +4/-1/0. These are GNOSIS practice timings.

## Before activation

1. Qualified Physics reviewer independently solves all60 and resolves the direction/flight-domain statements, duplicate groups, prerequisite issues and difficulty flags.
2. Write complete revised MCQs from the briefs where needed; keep four plausible distinct options and exactly one unambiguous key. Recalculate and check duplicates across all levels again. No drafts are automatically replaced or promoted.
3. Record reviewer identity/date and exact reviewed content hash with per-question approval decisions. Approval of a report or successful automated tests is not academic approval of all questions.
4. Only after actual academic approval and owner authorization, change the selected records to verified with a truthful review reference. Keep samples and unreviewed records excluded. Approved minimums are Easy10, Medium10/20, Hard10/20/30.
5. Rerun validators, tests and production build before activation. Push/deployment requires separate owner approval.

## Technical verification

- Existing JSON importer dry run and write: passed,60 drafts. Duplicate-ID replay rejected without writing another bank; JSON/CSV round-trip passed.
- Seven new Chapter3 tests passed, including independent calculations for all60 intended keys, all numerical distractors, explicit ambiguity proofs, duplicate checks, exact chapter mapping, preservation hashes and draft exclusion.
- Full unit/regression suite:70 passed,0 failed (includes existing mock/lecture/resource/progress and Chapter1/2 tests).
- TypeScript: `tsc --noEmit --incremental false` passed, including the extended API matrix test.
- Production: `next build --webpack` completed successfully.
- Two API integration tests passed against an isolated production preview: unapproved Chapter1/2/3 tests stay unavailable; existing resource/private endpoint/quiz/PDF checks passed.
- Additional live Chapter3 catalog assertion passed: HTTP200, drafts10/20/30,total60,approved0,all test sizes disabled.
- Ten API matrix tests passed on isolated private technical fixtures assigned to Chapter3, with approved technical Chapter1 controls present. For all six configurations, saved questions were checked for exact class11/Physics/chapter3/difficulty. Counts/timers, hidden keys, unique IDs, +4/-1/0, token/revision safety, refresh/resume, clearing, duplicate submission, expiry, malformed banks and empty banks passed. These are technical fixtures, not academic approvals.
- All seven pre-existing bank file hashes checked again after testing: unchanged. No real previous attempt store was used by QA servers.
- No configured lint command exists; Prettier formatting checks are separate from lint and academic validation.
- No visual browser/mobile review of the draft question content was performed. Plain-text React/encoding checks and the existing curriculum component regressions passed; these are not a claim of visual math-typesetting QA.
- No engine or UI source edits, push, deployment or real question activation. Test files and the availability/review documentation were updated for this import.
