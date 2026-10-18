# Class 11 Physics — Chapter 4: Laws of Motion

Import and calculation/editorial review,2026-10-18. **All60 imports remain DRAFT; academically approved0; tests inactive.**

## Import, identity and preservation

- Master and the three difficulty files are deeply equal (60 unique records). Imported master once; manifest is metadata.
- Existing curriculum title is **Laws of Motion**, chapter identity className="11",subject="physics",chapter=4. Source title Newton's Laws of Motion maps to this existing chapter, never1/2/3.
- Adapted to existing schemaVersion1 and single-correct type, preserved source IDs/stems/options/keys/solutions/difficulty for traceable review, and forced draft status. Importer dry run then --write used. No existing record overwritten.
- New bank: content/mock-questions/11-physics-4-owner-draft.json. ZIP SHA256: `2cb9b31afced870dc714cd3dd3b95196eb019389e1e12c5ecb8a5426c4e94f06`.
- All eight pre-existing bank JSON files snapshotted; their SHA256 values are in companion JSON. Chapters1/2/3 and the earlier40 development samples are protected byte-for-byte.
- No engine/UI/homepage/dashboard/lecture/notes/PDF/authentication/AI routes or source edits. QA uses a separate attempt store; existing real attempts are not used by the preview.

## Findings

- **34 distinct imported records flagged** for overlapping classification, repetition or assumptions. All60 need human academic review.
- No arithmetic/key mismatch found under the intended models. However **M004 has two physically possible listed answers**: right sliding yields4 m/s², left sliding9 m/s². The question omits motion direction.
- M012,H001,H022,H026 also need motion/static-breakaway assumptions. Kinetic friction alone does not determine whether a resting block starts moving. Friction opposes relative slip, not necessarily applied force.
- H026: with right sliding the optimal angle arctan(0.5) is correct for maximum SIGNED acceleration, but that maximum is still negative (sqrt(20)-5≈-0.528 m/s²). Left sliding changes the optimum to0°. A corrected instantaneous right-sliding statement is supplied.
- M006 should define a signed fixed-direction force graph. Ideal pulley problems require massless inextensible ropes, smooth massless pulleys and maintained taut contact in the stated phase. H011 needs an explicit fixed-anchor/movable-pulley/fixed-pulley layout; the analytical topology used is described in its check.
- **10 Medium** likely Easy:002,003,005,006,008,009,010,015,017,020.
- **21 Hard** likely moderate/direct as written:001,002,005,006,007,008,009,010,012,013,014,015,017,019,020,021,022,024,027,029,030. H014 is answered by one vertical balance; H027 has a global-momentum one-equation shortcut.
- **Nine provisional Hard candidates:**003,004,011,016,018,023,025,026,028. They involve frame/constraint coupling, slipping tests, regime changes or optimization. These are provisional labels; H026 still needs its motion assumption fixed.
- One mirrored near-duplicate group: M002/M015 (apparent weight with opposite lift accelerations). No exact normalized-stem or ID duplicates detected. Other broad conceptual overlaps are not automatically duplicates.

| Difficulty |   A |   B |   C |   D |
| ---------- | --: | --: | --: | --: |
| Easy       |   3 |   3 |   2 |   2 |
| Medium     |   5 |   5 |   5 |   5 |
| Hard       |   7 |   7 |   8 |   8 |

The original keys are near-balanced; no answer permutation is necessary. Correct options were not changed to force balance. Recheck distributions after replacing content.

## Original proposed corrections (not imported)

A separate non-bank JSON contains **seven complete draft proposals**: five clarified source variants (M004,M012,H001,H022,H026) and two original replacement problems (H014,H027). They do not change the60 imported drafts, add to their count, approve anything or activate tests. Other difficulty flags have revision briefs below; those are not complete solved replacements.

### Proposal for GNO-PHY11-C04-M-004

A 4 kg block is already sliding RIGHT on a horizontal floor. A horizontal26 N force pulls RIGHT. With kinetic friction coefficient0.25 and g=10 m/s², find its instantaneous signed acceleration (right positive).

A. 4 m/s²
B. 6.5 m/s²
C. 9 m/s²
D. 2.5 m/s²

**Proposed key:** A.

Normal force N = mg = 40 N. Kinetic friction = 0.25 × 40 = 10 N. Net force = 26 − 10 = 16 N, so a = 16/4 = 4 m/s².

Status: draft, not imported, academic approval pending.

### Proposal for GNO-PHY11-C04-M-012

A 5 kg box is already sliding RIGHT on a floor and is pulled right by25 N at37° above horizontal. With sin37°=0.6,cos37°=0.8,mu_k=0.2 and g=10 m/s², find its horizontal acceleration. The box remains in contact with the floor.

A. 2.6 m/s²
B. 3.6 m/s²
C. 4.0 m/s²
D. 5.0 m/s²

**Proposed key:** A.

Upward component = 15 N, so N = 50 − 15 = 35 N. Friction = 0.2 × 35 = 7 N. Horizontal component = 20 N; net = 13 N, so a = 13/5 = 2.6 m/s².

Status: draft, not imported, academic approval pending.

### Proposal for GNO-PHY11-C04-H-001

Blocks A (4 kg) and B (6 kg) are already sliding RIGHT together in contact on a horizontal floor, with A to the left of B. A horizontal50 N force pushes A RIGHT. Kinetic friction coefficients are0.1 for A and0.3 for B; g=10 m/s². Find the compressive contact force on B.

A. 28.0 N
B. 16.8 N
C. 34.8 N
D. 50.0 N

**Proposed key:** C.

Friction forces are 0.1(4)(10)=4 N and 0.3(6)(10)=18 N. System acceleration = (50−4−18)/(4+6)=2.8 m/s². On B, contact −18 =6(2.8), so contact = 34.8 N.

Status: draft, not imported, academic approval pending.

### Proposal for GNO-PHY11-C04-H-022

A 4 kg block initially rests on a horizontal surface with mu_s=0.5,mu_k=0.25. A horizontal30 N force acts RIGHT for4 s and is then removed. With g=10 m/s², find the total distance travelled before it stops. Assume enough surface length.

A. 80 m
B. 40 m
C. 160 m
D. 120 m

**Proposed key:** D.

N=40 N; maximum static friction20 N<30 N, so rightward breakaway is guaranteed. Sliding friction10 N gives a=5 m/s² for4 s, v=20 m/s and path40 m. After removal, a=-2.5 m/s² until stop, adding400/5=80 m. Total120 m; it then remains at rest.

Status: draft, not imported, academic approval pending.

### Proposal for GNO-PHY11-C04-H-026

At a given instant a 5 kg crate is sliding RIGHT across a horizontal floor. A20 N force is directed to the right at adjustable angle theta in[0°,90°] above horizontal. With mu_k=0.5 and g=10 m/s², which angle maximizes its SIGNED horizontal acceleration (right positive) at that instant? The crate remains in contact.

A. 0°
B. 45°
C. arctan(2)
D. arctan(0.5)

**Proposed key:** D.

N=50-20sin(theta)>0 throughout the allowed domain. While sliding right, friction is left and a=4[cos(theta)+0.5sin(theta)]-5. Cauchy-Schwarz gives cos(theta)+0.5sin(theta)<=sqrt(1.25), with equality at tan(theta)=0.5. Thus the maximum signed acceleration occurs at arctan(0.5); it is sqrt(20)-5≈-0.528 m/s², still a deceleration. The question does not claim the crate accelerates rightward.

Status: draft, not imported, academic approval pending.

### Proposal for GNO-PHY11-C04-H-014

An 8 kg cart slides RIGHT on the horizontal floor of a lift accelerating upward at2 m/s². A2 kg bob hangs from the cart and remains at rest relative to it, with its string37° from vertical. A horizontal motor force F drives the cart; kinetic friction between cart and lift floor has coefficient0.1. Take g=10 m/s²,sin37°=0.6,cos37°=0.8; neglect all other horizontal forces. Find the pair (F,string tension).

A. (102 N,30 N)
B. (90 N,30 N)
C. (100 N,25 N)
D. (102 N,25 N)

**Proposed key:** A.

Effective vertical gravity is12 m/s² in the lift. Bob vertical balance gives Tcos37=2(12), so T=30 N. Horizontal bob balance gives ax=Tsin37/2=9 m/s². Floor normal on the cart is its own effective weight8(12) plus the bob downward string component Tcos37=24, so N=120 N and kinetic friction12 N left. The cart+bob system has total horizontal mass10 kg: F-12=10(9), hence F=102 N. Separate cart FBD F-12-18=8(9) confirms the result.

Status: draft, not imported, academic approval pending.

### Proposal for GNO-PHY11-C04-H-027

A 12 kg system is initially at rest on a frictionless horizontal track. It ejects a2 kg piece LEFT at10 m/s relative to the recoiling10 kg remnant immediately after that ejection. Later this10 kg remnant ejects a1 kg piece RIGHT at8 m/s relative to the final9 kg remnant immediately after the second ejection. Ejected pieces do not interact again. What is the final9 kg remnant ground-frame velocity?

A. 13/15 m/s RIGHT
B. 28/9 m/s RIGHT
C. 5/3 m/s RIGHT
D. 13/15 m/s LEFT

**Proposed key:** A.

Right positive. First ejection: u1=V1-10 and2u1+10V1=0, so12V1=20 and V1=5/3 m/s; u1=-25/3. Before second ejection the10 kg remnant momentum is50/3 kg m/s. Second ejection: u2=V2+8, and9V2+u2=50/3, so10V2=26/3 and V2=13/15 m/s RIGHT. Ejected second-piece ground velocity is133/15 m/s. Global final momentum:2(-25/3)+(133/15)+9(13/15)=0.

Status: draft, not imported, academic approval pending.

## Force-direction and units conventions

- Use an inertial ground frame, or explicitly include pseudo-force opposite frame acceleration in a translating non-inertial frame. N and tension must be nonnegative; a rope supports tension only.
- Distinguish friction on each body of a contact pair. Static friction adjusts up to mu_s N; kinetic friction magnitude mu_k N applies only during slip. A stop may lead to sticking rather than reverse motion.
- Stacked-block questions test sticking first, then apply kinetic forces separately. H004 lower block leads; H018 upper block leads. This change in applied body produces different friction requirements and is retained as a distinct problem, not automatically labelled a duplicate.
- H008 minimum force must belong to the full static interval; H028 has a positive normal even though the required static coefficient exceeds1 (not a contradiction). H026 remains in contact for the full allowed angle domain.
- Momentum conservation applies to the closed horizontal system with zero external horizontal impulse. Ejected-piece speeds in H027 are specified in ground frame, unlike the proposed replacement; H012 explicitly needs open-system exhaust momentum flux.
- No actual FBD images are present in the ZIP. The per-question checks give textual FBDs/equations, not an assertion that a missing diagram was visually reviewed. Reviewers may add checked diagrams separately.
- Numerical time-force laws use t in seconds with appropriately dimensioned coefficients. Unicode fractions, square roots and superscripts are currently displayed as plain text, not LaTeX. Vector directions and force units are checked below.

## Duplicate screening

Normalized exact-stem/ID scan spans the incoming bank and all prior chapters. Lexical triage uses Unicode word tokens, stop-word removal and Jaccard>=0.50; three candidates are recorded in JSON. E005 vs Chapter2 E003 asks a different unit; H018 vs H004 changes the driven body/slip threshold; H025 vs M013 adds an incline and non-inertial frame. None is an exact/semantic duplicate merely from wording. Manual review additionally flagged M002/M015 as a mirrored template. Related transfer skills in Chapter3 circular motion and Chapter4 force decomposition are retained, not counted automatically as duplicates.

## Question-by-question review

### GNO-PHY11-C04-E-001 — Easy

**Topic:** Inertia

A hockey puck moves at constant velocity on a perfectly frictionless horizontal surface. What is the net horizontal force on it?

A. 0 N
B. Equal to its weight
C. Equal to its momentum per second
D. A force along its velocity

**Supplied key:** A — 0 N

**Supplied explanation:** Constant velocity means zero acceleration. By Newton's second law, net horizontal force = mass × 0 = 0 N.

**Independent answer/FBD check:** In an inertial frame, constant velocity gives ax=0, hence net horizontal force0 N. Vertical weight/normal cancel separately.

**Findings:** No specific content flag found. Difficulty fit is provisional; qualified review remains pending.

**Proposed revision:** Retain only after independent academic review.

**Academic approval:** pending; status remains draft.

- [ ] Reviewer independently solves the question and checks all four options, force directions, units, assumptions and physical regime.
- [ ] Reviewer records name/date/decision and hash of the exact final approved content.

### GNO-PHY11-C04-E-002 — Easy

**Topic:** Newton's second law

A net horizontal force of 18 N acts on a 6 kg trolley on a smooth track. What is its acceleration?

A. 108 m/s²
B. 3 m/s²
C. 12 m/s²
D. 0.33 m/s²

**Supplied key:** B — 3 m/s²

**Supplied explanation:** Using F = ma, acceleration a = 18/6 = 3 m/s².

**Independent answer/FBD check:** Along the smooth track, resultant force=ma, so a=18/6=3 m/s² in the force direction.

**Findings:** No specific content flag found. Difficulty fit is provisional; qualified review remains pending.

**Proposed revision:** Retain only after independent academic review.

**Academic approval:** pending; status remains draft.

- [ ] Reviewer independently solves the question and checks all four options, force directions, units, assumptions and physical regime.
- [ ] Reviewer records name/date/decision and hash of the exact final approved content.

### GNO-PHY11-C04-E-003 — Easy

**Topic:** Newton's third law

When a swimmer pushes water backwards, which force helps the swimmer move forwards?

A. The swimmer pushes themselves forwards
B. The swimmer's weight decreases
C. The water pushes the swimmer forwards
D. The water exerts no force

**Supplied key:** C — The water pushes the swimmer forwards

**Supplied explanation:** The swimmer pushes water backwards, while the water exerts an equal and opposite forward force on the swimmer. The two forces act on different objects.

**Independent answer/FBD check:** The backward force exerted by the swimmer on water has a forward reaction exerted by water ON the swimmer. They act on different bodies, so do not cancel on the swimmer's FBD.

**Findings:** No specific content flag found. Difficulty fit is provisional; qualified review remains pending.

**Proposed revision:** Retain only after independent academic review.

**Academic approval:** pending; status remains draft.

- [ ] Reviewer independently solves the question and checks all four options, force directions, units, assumptions and physical regime.
- [ ] Reviewer records name/date/decision and hash of the exact final approved content.

### GNO-PHY11-C04-E-004 — Easy

**Topic:** Momentum

A 5 kg object moves horizontally at 4 m/s. Find the magnitude of its linear momentum.

A. 1.25 kg·m/s
B. 9 kg·m/s
C. 80 kg·m/s
D. 20 kg·m/s

**Supplied key:** D — 20 kg·m/s

**Supplied explanation:** Linear momentum p = mv. Substituting m = 5 kg and v = 4 m/s gives p = 20 kg·m/s.

**Independent answer/FBD check:** Momentum magnitude=mv=5(4)=20 kg m/s; momentum is not kinetic energy.

**Findings:** No specific content flag found. Difficulty fit is provisional; qualified review remains pending.

**Proposed revision:** Retain only after independent academic review.

**Academic approval:** pending; status remains draft.

- [ ] Reviewer independently solves the question and checks all four options, force directions, units, assumptions and physical regime.
- [ ] Reviewer records name/date/decision and hash of the exact final approved content.

### GNO-PHY11-C04-E-005 — Easy

**Topic:** Impulse

What is the SI unit of impulse?

A. N·s
B. N/s
C. kg/s
D. J/s

**Supplied key:** A — N·s

**Supplied explanation:** Impulse equals force multiplied by the time interval, J = F Δt. Its SI unit is newton-second (N·s), also equivalent to kg·m/s.

**Independent answer/FBD check:** Impulse is integral F dt and has dimensions M L/T, SI unit N s=kg m/s. No other listed unit is equivalent.

**Findings:** No specific content flag found. Difficulty fit is provisional; qualified review remains pending.

**Proposed revision:** Retain only after independent academic review.

**Academic approval:** pending; status remains draft.

- [ ] Reviewer independently solves the question and checks all four options, force directions, units, assumptions and physical regime.
- [ ] Reviewer records name/date/decision and hash of the exact final approved content.

### GNO-PHY11-C04-E-006 — Easy

**Topic:** Weight

What is the weight of a 3 kg object near Earth's surface if g = 10 m/s²?

A. 0.3 N
B. 30 N
C. 13 N
D. 300 N

**Supplied key:** B — 30 N

**Supplied explanation:** The gravitational force is W = mg = 3 × 10 = 30 N, acting vertically downwards.

**Independent answer/FBD check:** Weight=mg=3(10)=30 N downward, not mass in kg.

**Findings:** No specific content flag found. Difficulty fit is provisional; qualified review remains pending.

**Proposed revision:** Retain only after independent academic review.

**Academic approval:** pending; status remains draft.

- [ ] Reviewer independently solves the question and checks all four options, force directions, units, assumptions and physical regime.
- [ ] Reviewer records name/date/decision and hash of the exact final approved content.

### GNO-PHY11-C04-E-007 — Easy

**Topic:** Normal reaction

A 2 kg book rests on a level desk and no other vertical forces act. If g = 10 m/s², what is the desk's normal force on the book?

A. 20 N downwards
B. 2 N upwards
C. 20 N upwards
D. 0 N

**Supplied key:** C — 20 N upwards

**Supplied explanation:** At vertical equilibrium the upward normal force balances the book's downward weight mg = 20 N.

**Independent answer/FBD check:** FBD: N up, mg=20 N down. Vertical equilibrium gives N=20 N upward.

**Findings:** No specific content flag found. Difficulty fit is provisional; qualified review remains pending.

**Proposed revision:** Retain only after independent academic review.

**Academic approval:** pending; status remains draft.

- [ ] Reviewer independently solves the question and checks all four options, force directions, units, assumptions and physical regime.
- [ ] Reviewer records name/date/decision and hash of the exact final approved content.

### GNO-PHY11-C04-E-008 — Easy

**Topic:** Newton's first law

An object initially at rest remains at rest when which condition is satisfied?

A. Its mass is zero
B. Its weight is always zero
C. Its speed is increasing
D. The net external force is zero

**Supplied key:** D — The net external force is zero

**Supplied explanation:** Newton's first law states that an object at rest stays at rest if the resultant external force on it is zero.

**Independent answer/FBD check:** In an inertial frame, if net external force remains zero throughout the interval, acceleration remains zero and initial rest persists.

**Findings:** No specific content flag found. Difficulty fit is provisional; qualified review remains pending.

**Proposed revision:** Retain only after independent academic review.

**Academic approval:** pending; status remains draft.

- [ ] Reviewer independently solves the question and checks all four options, force directions, units, assumptions and physical regime.
- [ ] Reviewer records name/date/decision and hash of the exact final approved content.

### GNO-PHY11-C04-E-009 — Easy

**Topic:** Free-body diagrams

In a free-body diagram of a block sliding on a rough horizontal floor, which force acts opposite its relative sliding motion?

A. Kinetic friction
B. Weight
C. Normal reaction
D. Gravitational attraction of the Moon

**Supplied key:** A — Kinetic friction

**Supplied explanation:** Kinetic friction acts tangentially along the surface, opposing relative sliding. Weight and normal reaction act vertically.

**Independent answer/FBD check:** Kinetic friction on the block is tangent to the floor and opposite the block-floor relative slip, not necessarily opposite a chosen lab-frame velocity for every moving surface.

**Findings:** No specific content flag found. Difficulty fit is provisional; qualified review remains pending.

**Proposed revision:** Retain only after independent academic review.

**Academic approval:** pending; status remains draft.

- [ ] Reviewer independently solves the question and checks all four options, force directions, units, assumptions and physical regime.
- [ ] Reviewer records name/date/decision and hash of the exact final approved content.

### GNO-PHY11-C04-E-010 — Easy

**Topic:** Balanced forces

A 9 N force acts to the right on a box. What single horizontal force will keep the net horizontal force zero?

A. 9 N to the right
B. 9 N to the left
C. 18 N to the right
D. 0 N

**Supplied key:** B — 9 N to the left

**Supplied explanation:** The horizontal forces must cancel: +9 N − 9 N = 0 N, so an equal force to the left is required.

**Independent answer/FBD check:** Take right positive. Balance requires 9+F=0, so the added force is9 N left.

**Findings:** No specific content flag found. Difficulty fit is provisional; qualified review remains pending.

**Proposed revision:** Retain only after independent academic review.

**Academic approval:** pending; status remains draft.

- [ ] Reviewer independently solves the question and checks all four options, force directions, units, assumptions and physical regime.
- [ ] Reviewer records name/date/decision and hash of the exact final approved content.

### GNO-PHY11-C04-M-001 — Medium

**Topic:** Contact force between blocks

Two blocks of 2 kg and 5 kg touch on a smooth table. A 28 N force pushes the 2 kg block towards the 5 kg block. What contact force acts on the 5 kg block?

A. 8 N
B. 20 N
C. 12 N
D. 28 N

**Supplied key:** B — 20 N

**Supplied explanation:** The system acceleration is 28/(2 + 5) = 4 m/s². The only horizontal force on the 5 kg block is contact force, so N = 5 × 4 = 20 N.

**Independent answer/FBD check:** System FBD: only external horizontal28 N, total mass7 kg =>a=4. On the5 kg block, contact is its only horizontal force, so C=5a=20 N.

**Findings:** No specific content flag found. Difficulty fit is provisional; qualified review remains pending.

**Proposed revision:** Retain only after independent academic review.

**Academic approval:** pending; status remains draft.

- [ ] Reviewer independently solves the question and checks all four options, force directions, units, assumptions and physical regime.
- [ ] Reviewer records name/date/decision and hash of the exact final approved content.

### GNO-PHY11-C04-M-002 — Medium

**Topic:** Elevator apparent weight

A 4 kg suitcase rests on the floor of a lift accelerating upwards at 3 m/s². Take g = 10 m/s². Find the floor's normal reaction.

A. 28 N
B. 40 N
C. 52 N
D. 12 N

**Supplied key:** C — 52 N

**Supplied explanation:** For upward acceleration N − mg = ma. Thus N = 4(10 + 3) = 52 N.

**Independent answer/FBD check:** FBD: N up and40 N weight down, acceleration3 m/s² up. N-40=4(3), hence N=52 N.

**Findings:** Difficulty: likely Easy/direct basic calculation rather than moderate Medium.; Mirrored numerical-template repetition: D01

**Proposed revision:** Infer a lift's unknown acceleration from two successive scale readings and a known change in carried mass, checking continued floor contact.

**Academic approval:** pending; status remains draft.

- [ ] Reviewer independently solves the question and checks all four options, force directions, units, assumptions and physical regime.
- [ ] Reviewer records name/date/decision and hash of the exact final approved content.

### GNO-PHY11-C04-M-003 — Medium

**Topic:** Smooth inclined plane

A 6 kg block slides freely down a smooth incline inclined at 30° to the horizontal. Take g = 10 m/s². Find its acceleration down the slope.

A. 10 m/s²
B. 3 m/s²
C. 8.66 m/s²
D. 5 m/s²

**Supplied key:** D — 5 m/s²

**Supplied explanation:** On a smooth plane the down-slope force is mg sin30°. Hence a = g sin30° = 10 × 1/2 = 5 m/s².

**Independent answer/FBD check:** FBD: weight component mg sin30° down the slope, N perpendicular, no friction. a=g sin30°=5 m/s²; N=mg cos30°.

**Findings:** Difficulty: likely Easy/direct basic calculation rather than moderate Medium.

**Proposed revision:** Infer an unknown incline angle from two measured acceleration components, then recover the normal reaction with a consistent FBD.

**Academic approval:** pending; status remains draft.

- [ ] Reviewer independently solves the question and checks all four options, force directions, units, assumptions and physical regime.
- [ ] Reviewer records name/date/decision and hash of the exact final approved content.

### GNO-PHY11-C04-M-004 — Medium

**Topic:** Kinetic friction

A 4 kg block on a horizontal floor has coefficient of kinetic friction 0.25. It is pulled horizontally by 26 N. Take g = 10 m/s². Find its acceleration.

A. 4 m/s²
B. 6.5 m/s²
C. 9 m/s²
D. 2.5 m/s²

**Supplied key:** A — 4 m/s²

**Supplied explanation:** Normal force N = mg = 40 N. Kinetic friction = 0.25 × 40 = 10 N. Net force = 26 − 10 = 16 N, so a = 16/4 = 4 m/s².

**Independent answer/FBD check:** If sliding RIGHT, N=40 N and friction10 N LEFT; a=(26-10)/4=4 m/s². If sliding LEFT, friction points right and a=(26+10)/4=9 m/s², also a listed option. Initial sliding direction is missing.

**Findings:** Missing initial sliding direction/static breakaway. Both4 m/s² (right sliding) and9 m/s² (left sliding) are listed and possible.

**Proposed revision:** Complete draft proposal above and in the corrections JSON. Retain only after independent academic review.

**Academic approval:** pending; status remains draft.

- [ ] Reviewer independently solves the question and checks all four options, force directions, units, assumptions and physical regime.
- [ ] Reviewer records name/date/decision and hash of the exact final approved content.

### GNO-PHY11-C04-M-005 — Medium

**Topic:** Momentum reversal

A 0.25 kg ball moving east at 14 m/s rebounds west at 6 m/s. What is the magnitude of its change in momentum?

A. 2 kg·m/s
B. 5 kg·m/s
C. 3.5 kg·m/s
D. 20 kg·m/s

**Supplied key:** B — 5 kg·m/s

**Supplied explanation:** Take east positive: Δp = m(v − u) = 0.25(−6 − 14) = −5 kg·m/s. The magnitude is 5 kg·m/s.

**Independent answer/FBD check:** Take east positive: delta p=0.25(-6-14)=-5 kg m/s; magnitude5 kg m/s. Reversal requires adding speed magnitudes before multiplying mass.

**Findings:** Difficulty: likely Easy/direct basic calculation rather than moderate Medium.

**Proposed revision:** Give a measured two-stage signed impulse history and one intermediate velocity; infer a reversal time and the final momentum.

**Academic approval:** pending; status remains draft.

- [ ] Reviewer independently solves the question and checks all four options, force directions, units, assumptions and physical regime.
- [ ] Reviewer records name/date/decision and hash of the exact final approved content.

### GNO-PHY11-C04-M-006 — Medium

**Topic:** Impulse from a graph

A force increases uniformly from 0 N to 16 N during the first 3 s and then falls linearly to 0 N at 5 s. What is the total impulse?

A. 16 N·s
B. 24 N·s
C. 40 N·s
D. 80 N·s

**Supplied key:** C — 40 N·s

**Supplied explanation:** Impulse is area under the force–time graph. The triangle has base 5 s and height 16 N, so J = (1/2) × 5 × 16 = 40 N·s.

**Independent answer/FBD check:** For a fixed-direction force represented by a signed force-time graph, impulse=triangular area=5(16)/2=40 N s. A force-magnitude graph without direction is insufficient for vector impulse.

**Findings:** Difficulty: likely Easy/direct basic calculation rather than moderate Medium.; State that the signed force-time graph represents a fixed horizontal direction; magnitude alone does not define vector impulse.

**Proposed revision:** For a fixed horizontal direction, give a positive triangle followed by a negative pulse and ask the first zero-velocity time, not only total triangle area.

**Academic approval:** pending; status remains draft.

- [ ] Reviewer independently solves the question and checks all four options, force directions, units, assumptions and physical regime.
- [ ] Reviewer records name/date/decision and hash of the exact final approved content.

### GNO-PHY11-C04-M-007 — Medium

**Topic:** Atwood machine

In an ideal Atwood machine, masses 7 kg and 3 kg hang on opposite sides of a light pulley. Take g = 10 m/s². Find the magnitude of acceleration.

A. 2 m/s²
B. 10 m/s²
C. 7 m/s²
D. 4 m/s²

**Supplied key:** D — 4 m/s²

**Supplied explanation:** Net driving force is (7 − 3)g = 40 N, and total mass is 10 kg. Therefore a = 40/10 = 4 m/s².

**Independent answer/FBD check:** Ideal Atwood FBDs:70-T=7a and T-30=3a. Add to obtain40=10a =>a=4 m/s²; tension42 N remains positive.

**Findings:** No specific content flag found. Difficulty fit is provisional; qualified review remains pending.

**Proposed revision:** Retain only after independent academic review.

**Academic approval:** pending; status remains draft.

- [ ] Reviewer independently solves the question and checks all four options, force directions, units, assumptions and physical regime.
- [ ] Reviewer records name/date/decision and hash of the exact final approved content.

### GNO-PHY11-C04-M-008 — Medium

**Topic:** Vertical tension

A 3 kg lamp is lifted vertically with an upward acceleration of 2 m/s² by a light string. Take g = 10 m/s². What is the string tension?

A. 36 N
B. 24 N
C. 30 N
D. 6 N

**Supplied key:** A — 36 N

**Supplied explanation:** T − mg = ma, so tension T = m(g + a) = 3(10 + 2) = 36 N.

**Independent answer/FBD check:** FBD: T upward,30 N downward, acceleration2 upward. T-30=3(2) =>T=36 N.

**Findings:** Difficulty: likely Easy/direct basic calculation rather than moderate Medium.

**Proposed revision:** Specify an accelerating lift carrying a lamp with a light string; infer lamp tension in the ground frame from lift motion and a relative lamp acceleration.

**Academic approval:** pending; status remains draft.

- [ ] Reviewer independently solves the question and checks all four options, force directions, units, assumptions and physical regime.
- [ ] Reviewer records name/date/decision and hash of the exact final approved content.

### GNO-PHY11-C04-M-009 — Medium

**Topic:** Inclined pull on a smooth surface

A 5 kg cart is pulled by a 30 N force at 60° above the horizontal along a smooth track. Assuming it stays in contact with the track, find its horizontal acceleration.

A. 6 m/s²
B. 3 m/s²
C. 5.2 m/s²
D. 1.5 m/s²

**Supplied key:** B — 3 m/s²

**Supplied explanation:** Only the horizontal component accelerates the cart: F_x = 30 cos60° = 15 N. Thus a = 15/5 = 3 m/s².

**Independent answer/FBD check:** Horizontal component=30cos60°=15 N; smooth-track acceleration=15/5=3 m/s². Vertical contact is assumed by the stem; N=mg-30sin60° must be nonnegative.

**Findings:** Difficulty: likely Easy/direct basic calculation rather than moderate Medium.

**Proposed revision:** Use an angled pull with known kinetic friction and a specified sliding direction; infer the angle from a measured normal force before finding horizontal acceleration.

**Academic approval:** pending; status remains draft.

- [ ] Reviewer independently solves the question and checks all four options, force directions, units, assumptions and physical regime.
- [ ] Reviewer records name/date/decision and hash of the exact final approved content.

### GNO-PHY11-C04-M-010 — Medium

**Topic:** System momentum

A 3 kg cart moves east at 5 m/s while a 2 kg cart moves west at 4 m/s. What is the total momentum of the two-cart system?

A. 23 kg·m/s east
B. 7 kg·m/s west
C. 7 kg·m/s east
D. 0 kg·m/s

**Supplied key:** C — 7 kg·m/s east

**Supplied explanation:** Choose east positive. Total momentum = 3 × 5 + 2 × (−4) = 15 − 8 = +7 kg·m/s, i.e. east.

**Independent answer/FBD check:** Signed momentum=3(5)+2(-4)=+7 kg m/s; positive means east, not total scalar momentum magnitude23.

**Findings:** Difficulty: likely Easy/direct basic calculation rather than moderate Medium.

**Proposed revision:** Use two unknown signed cart velocities with a measured system momentum and a relative-speed constraint; solve both and check directions.

**Academic approval:** pending; status remains draft.

- [ ] Reviewer independently solves the question and checks all four options, force directions, units, assumptions and physical regime.
- [ ] Reviewer records name/date/decision and hash of the exact final approved content.

### GNO-PHY11-C04-M-011 — Medium

**Topic:** Braking force

A 1200 kg car moving at 25 m/s slows uniformly to 10 m/s in 5 s. Find the net braking force along the line of motion.

A. 1800 N opposite the motion
B. 6000 N opposite the motion
C. 3600 N along the motion
D. 3600 N opposite the motion

**Supplied key:** D — 3600 N opposite the motion

**Supplied explanation:** Acceleration is (10 − 25)/5 = −3 m/s². Therefore F_net = ma = 1200 × (−3) = −3600 N.

**Independent answer/FBD check:** Take positive along initial motion: a=(10-25)/5=-3 m/s²; net force=1200(-3)=-3600 N, opposite motion. Both endpoint speeds are positive.

**Findings:** No specific content flag found. Difficulty fit is provisional; qualified review remains pending.

**Proposed revision:** Retain only after independent academic review.

**Academic approval:** pending; status remains draft.

- [ ] Reviewer independently solves the question and checks all four options, force directions, units, assumptions and physical regime.
- [ ] Reviewer records name/date/decision and hash of the exact final approved content.

### GNO-PHY11-C04-M-012 — Medium

**Topic:** Pull with friction and changed normal

A 5 kg box on a floor is pulled by 25 N at 37° above horizontal. With sin37° = 0.6, cos37° = 0.8, μ_k = 0.2 and g = 10 m/s², find horizontal acceleration.

A. 2.6 m/s²
B. 3.6 m/s²
C. 4.0 m/s²
D. 5.0 m/s²

**Supplied key:** A — 2.6 m/s²

**Supplied explanation:** Upward component = 15 N, so N = 50 − 15 = 35 N. Friction = 0.2 × 35 = 7 N. Horizontal component = 20 N; net = 13 N, so a = 13/5 = 2.6 m/s².

**Independent answer/FBD check:** If sliding right, vertical balance N=50-25(0.6)=35 N. Friction7 N left; horizontal applied20 N; a=(20-7)/5=2.6 m/s². Sliding left instead gives5.4 m/s²; at rest a static coefficient is needed.

**Findings:** Specify existing RIGHT sliding or provide a static coefficient ensuring breakaway; kinetic friction direction is otherwise undetermined.

**Proposed revision:** Complete draft proposal above and in the corrections JSON. Retain only after independent academic review.

**Academic approval:** pending; status remains draft.

- [ ] Reviewer independently solves the question and checks all four options, force directions, units, assumptions and physical regime.
- [ ] Reviewer records name/date/decision and hash of the exact final approved content.

### GNO-PHY11-C04-M-013 — Medium

**Topic:** Table and hanging mass

A 3 kg block on a smooth table is attached over a light pulley to a hanging 2 kg mass. Take g = 10 m/s². What is the tension in the string?

A. 8 N
B. 12 N
C. 20 N
D. 18 N

**Supplied key:** B — 12 N

**Supplied explanation:** The acceleration is (2 × 10)/(3 + 2) = 4 m/s². The 3 kg block is pulled by tension alone, so T = 3 × 4 = 12 N.

**Independent answer/FBD check:** Ideal taut rope gives shared a:20=(3+2)a =>a=4 m/s². Table block has T=3a=12 N; hanging block20-T=2a agrees.

**Findings:** No specific content flag found. Difficulty fit is provisional; qualified review remains pending.

**Proposed revision:** Retain only after independent academic review.

**Academic approval:** pending; status remains draft.

- [ ] Reviewer independently solves the question and checks all four options, force directions, units, assumptions and physical regime.
- [ ] Reviewer records name/date/decision and hash of the exact final approved content.

### GNO-PHY11-C04-M-014 — Medium

**Topic:** Time-varying force and impulse

A 2 kg trolley is initially at rest. A net force F(t) = (4 + 2t) N acts along its track from t = 0 to t = 3 s. What is its final speed?

A. 7.5 m/s
B. 9 m/s
C. 10.5 m/s
D. 21 m/s

**Supplied key:** C — 10.5 m/s

**Supplied explanation:** Impulse J = ∫₀³ (4 + 2t)dt = [4t + t²]₀³ = 12 + 9 = 21 N·s. Δv = J/m = 21/2 = 10.5 m/s.

**Independent answer/FBD check:** Force is net and fixed along the track: J=integral0..3(4+2t)dt=12+9=21 N s. Initial rest gives v=J/2=10.5 m/s.

**Findings:** No specific content flag found. Difficulty fit is provisional; qualified review remains pending.

**Proposed revision:** Retain only after independent academic review.

**Academic approval:** pending; status remains draft.

- [ ] Reviewer independently solves the question and checks all four options, force directions, units, assumptions and physical regime.
- [ ] Reviewer records name/date/decision and hash of the exact final approved content.

### GNO-PHY11-C04-M-015 — Medium

**Topic:** Elevator moving down

A 60 kg person is standing on a scale in a lift accelerating downwards at 2 m/s². Take g = 10 m/s². What reading (normal force) does the scale show?

A. 600 N
B. 720 N
C. 120 N
D. 480 N

**Supplied key:** D — 480 N

**Supplied explanation:** N = m(g − a) for downward lift acceleration. Thus N = 60(10 − 2) = 480 N.

**Independent answer/FBD check:** FBD upward N and downward600 N, downward a=2: N-600=60(-2) =>N=480 N, positive so contact persists.

**Findings:** Difficulty: likely Easy/direct basic calculation rather than moderate Medium.; Mirrored numerical-template repetition: D01

**Proposed revision:** Replace the mirrored elevator calculation with a lift carrying an accelerating hanging load: infer both floor reaction and string tension using separate FBDs.

**Academic approval:** pending; status remains draft.

- [ ] Reviewer independently solves the question and checks all four options, force directions, units, assumptions and physical regime.
- [ ] Reviewer records name/date/decision and hash of the exact final approved content.

### GNO-PHY11-C04-M-016 — Medium

**Topic:** Friction on a rough incline

A block slides down a 30° rough incline with kinetic friction coefficient 0.2. Take g = 10 m/s² and cos30° = √3/2. Find its downhill acceleration.

A. (5 − √3) m/s²
B. (5 + √3) m/s²
C. 5 m/s²
D. (10 − √3) m/s²

**Supplied key:** A — (5 − √3) m/s²

**Supplied explanation:** Along the incline a = g(sin30° − μ_k cos30°) = 10(1/2 − 0.2 × √3/2) = 5 − √3 m/s².

**Independent answer/FBD check:** Block is explicitly sliding down, so friction is UP slope: N=mg cos30°, a=g(sin30°-0.2cos30°)=5-sqrt(3) m/s² downhill, positive.

**Findings:** No specific content flag found. Difficulty fit is provisional; qualified review remains pending.

**Proposed revision:** Retain only after independent academic review.

**Academic approval:** pending; status remains draft.

- [ ] Reviewer independently solves the question and checks all four options, force directions, units, assumptions and physical regime.
- [ ] Reviewer records name/date/decision and hash of the exact final approved content.

### GNO-PHY11-C04-M-017 — Medium

**Topic:** Average impact force

A 0.15 kg stationary ball is brought to 24 m/s by an impact lasting 0.03 s. What was the magnitude of the average net force?

A. 80 N
B. 120 N
C. 180 N
D. 12 N

**Supplied key:** B — 120 N

**Supplied explanation:** Impulse magnitude Δp = 0.15 × 24 = 3.6 N·s. Average force = 3.6/0.03 = 120 N.

**Independent answer/FBD check:** Average NET force magnitude=delta p/delta t=0.15(24)/0.03=120 N. Net impulse, not just one contact force, is specified.

**Findings:** Difficulty: likely Easy/direct basic calculation rather than moderate Medium.

**Proposed revision:** Use a pulse with a measured peak and asymmetric rise/fall times; infer pulse duration from a rebound momentum constraint and calculate average net force.

**Academic approval:** pending; status remains draft.

- [ ] Reviewer independently solves the question and checks all four options, force directions, units, assumptions and physical regime.
- [ ] Reviewer records name/date/decision and hash of the exact final approved content.

### GNO-PHY11-C04-M-018 — Medium

**Topic:** Equilibrium of two angled strings

A small 20 N weight hangs at rest from two strings. One string makes 30° above the horizontal to the left; the other makes 60° above the horizontal to the right. What is the tension in the 30° string?

A. 20 N
B. 10√3 N
C. 10 N
D. 20√3 N

**Supplied key:** C — 10 N

**Supplied explanation:** Horizontal equilibrium: T30 cos30° = T60 cos60°, so T60 = √3 T30. Vertical equilibrium: (T30/2)+(√3/2)(√3 T30) = 20, giving 2T30 =20 and T30 =10 N.

**Independent answer/FBD check:** Horizontal balance T30 cos30=T60 cos60 gives T60=sqrt(3)T30. Vertical balance gives0.5T30+(sqrt(3)/2)(sqrt(3)T30)=20 =>T30=10 N. Both tensions positive.

**Findings:** No specific content flag found. Difficulty fit is provisional; qualified review remains pending.

**Proposed revision:** Retain only after independent academic review.

**Academic approval:** pending; status remains draft.

- [ ] Reviewer independently solves the question and checks all four options, force directions, units, assumptions and physical regime.
- [ ] Reviewer records name/date/decision and hash of the exact final approved content.

### GNO-PHY11-C04-M-019 — Medium

**Topic:** Perpendicular forces

Perpendicular horizontal forces of 12 N east and 16 N north act on a 5 kg object on a smooth surface. What is the magnitude of its acceleration?

A. 5.6 m/s²
B. 2.4 m/s²
C. 20 m/s²
D. 4 m/s²

**Supplied key:** D — 4 m/s²

**Supplied explanation:** The resultant is √(12² + 16²) = 20 N. Therefore acceleration magnitude is F/m = 20/5 = 4 m/s².

**Independent answer/FBD check:** Perpendicular force resultant=hypot(12,16)=20 N; a=20/5=4 m/s². Direction is atan(16/12) north of east though only magnitude asked.

**Findings:** No specific content flag found. Difficulty fit is provisional; qualified review remains pending.

**Proposed revision:** Retain only after independent academic review.

**Academic approval:** pending; status remains draft.

- [ ] Reviewer independently solves the question and checks all four options, force directions, units, assumptions and physical regime.
- [ ] Reviewer records name/date/decision and hash of the exact final approved content.

### GNO-PHY11-C04-M-020 — Medium

**Topic:** Coefficient of static friction

A 2 kg wooden block on a level floor just begins to slip when a horizontal force of 8 N is applied. Take g = 10 m/s². Find the coefficient of limiting static friction.

A. 0.4
B. 0.8
C. 0.2
D. 4.0

**Supplied key:** A — 0.4

**Supplied explanation:** At impending slip, applied force = μ_s N and N = mg = 20 N. Therefore μ_s = 8/20 = 0.4.

**Independent answer/FBD check:** At impending slip N=20 N and fs,max=8 N, so mu_s=8/20=0.4. Static friction below the threshold is not always mu_s N.

**Findings:** Difficulty: likely Easy/direct basic calculation rather than moderate Medium.

**Proposed revision:** Measure impending-slip forces for horizontal and oblique pulls to infer both block mass and static coefficient, checking normal contact.

**Academic approval:** pending; status remains draft.

- [ ] Reviewer independently solves the question and checks all four options, force directions, units, assumptions and physical regime.
- [ ] Reviewer records name/date/decision and hash of the exact final approved content.

### GNO-PHY11-C04-H-001 — Hard

**Topic:** Unequal friction and contact force

A 4 kg block A pushes a 6 kg block B to the right on a rough floor. A horizontal 50 N force acts on A. The kinetic friction coefficients are 0.1 for A and 0.3 for B. With g = 10 m/s², find the contact force exerted by A on B.

A. 28.0 N
B. 16.8 N
C. 34.8 N
D. 50.0 N

**Supplied key:** C — 34.8 N

**Supplied explanation:** Friction forces are 0.1(4)(10)=4 N and 0.3(6)(10)=18 N. System acceleration = (50−4−18)/(4+6)=2.8 m/s². On B, contact −18 =6(2.8), so contact = 34.8 N.

**Independent answer/FBD check:** For both blocks sliding RIGHT, friction is4 N left on A and18 N left on B. Whole-system a=(50-4-18)/10=2.8. B FBD: C-18=6a =>C=34.8 N. Contact stays compressive. Sliding direction should be explicit.

**Findings:** Difficulty: likely Medium (H014 especially direct); requires substantive revision or qualified justification for Hard.; Make both blocks already sliding RIGHT explicit so both kinetic friction forces point left.

**Proposed revision:** Complete draft proposal above and in the corrections JSON. Add an unknown angle-dependent push and compare loss-of-contact and slipping thresholds before calculating contact force in the physical regime.

**Academic approval:** pending; status remains draft.

- [ ] Reviewer independently solves the question and checks all four options, force directions, units, assumptions and physical regime.
- [ ] Reviewer records name/date/decision and hash of the exact final approved content.

### GNO-PHY11-C04-H-002 — Hard

**Topic:** Connected rough incline and hanging mass

A 4 kg block on a 30° incline (coefficient of kinetic friction 0.1) is joined by a light rope over a pulley to a hanging 4 kg block. The hanging block moves downward. Take g = 10 m/s². What is the string tension?

A. (30 − √3) N
B. (20 + 2√3) N
C. 40 N
D. (30 + √3) N

**Supplied key:** D — (30 + √3) N

**Supplied explanation:** The inclined block opposes upward motion with mg sin30° =20 N plus friction μmg cos30° =2√3 N. Net driving force =40−20−2√3, hence a=(20−2√3)/8=(10−√3)/4 m/s². On the hanging block, 40−T=4a, giving T=40−(10−√3)=30+√3 N.

**Independent answer/FBD check:** Inclined block moves UP: gravity component20 N and friction2sqrt(3) N point down. Whole-system drive=40-20-2sqrt(3); a=(10-sqrt(3))/4. Hanging FBD40-T=4a gives T=30+sqrt(3) N. a and N are positive.

**Findings:** Difficulty: likely Medium (H014 especially direct); requires substantive revision or qualified justification for Hard.

**Proposed revision:** Determine the full hanging-mass interval permitting static equilibrium on a rough incline, then derive acceleration/tension on each side with kinetic friction and consistent signs.

**Academic approval:** pending; status remains draft.

- [ ] Reviewer independently solves the question and checks all four options, force directions, units, assumptions and physical regime.
- [ ] Reviewer records name/date/decision and hash of the exact final approved content.

### GNO-PHY11-C04-H-003 — Hard

**Topic:** Atwood system in an accelerating elevator

An ideal Atwood machine with masses 6 kg and 4 kg is fully inside a lift accelerating upward at 2 m/s². Taking g = 10 m/s², what tension does the string carry?

A. 57.6 N
B. 48 N
C. 60 N
D. 67.2 N

**Supplied key:** A — 57.6 N

**Supplied explanation:** In the lift frame the effective gravity is g+a_lift=12 m/s² downward. Ideal Atwood tension = 2m₁m₂ g_eff/(m₁+m₂) = 2×6×4×12/10 =57.6 N.

**Independent answer/FBD check:** Lift frame has effective gravity12 m/s² downward. Equations72-T=6arel, T-48=4arel give arel=2.4 m/s² and T=57.6 N. Includes downward pseudo-force, not upward.

**Findings:** No specific content flag found. Difficulty fit is provisional; qualified review remains pending.

**Proposed revision:** Retain only after independent academic review.

**Academic approval:** pending; status remains draft.

- [ ] Reviewer independently solves the question and checks all four options, force directions, units, assumptions and physical regime.
- [ ] Reviewer records name/date/decision and hash of the exact final approved content.

### GNO-PHY11-C04-H-004 — Hard

**Topic:** Relative motion of stacked blocks

A 3 kg upper block rests on a 7 kg lower block on a smooth floor. A horizontal 70 N force suddenly pulls the lower block. The coefficients between blocks are μ_s = 0.4 and μ_k = 0.3; take g = 10 m/s². Assuming a long lower surface, what relative displacement occurs in the first 2 s?

A. 40/7 m
B. 80/7 m
C. 20/7 m
D. 14 m

**Supplied key:** B — 80/7 m

**Supplied explanation:** If stuck, acceleration would be 70/10=7 m/s², requiring upper friction 3×7=21 N > μ_s mg=12 N, so slipping occurs. Kinetic friction=0.3×3×10=9 N. Upper acceleration=9/3=3; lower acceleration=(70−9)/7=61/7. Relative acceleration=40/7 m/s². Relative displacement in 2 s = (1/2)(40/7)(2²)=80/7 m.

**Independent answer/FBD check:** Sticking trial a=70/10=7 requires upper friction21 N>static limit12. Slip follows: kinetic friction9 N right on upper and9 N left on lower. atop=3,abottom=61/7; relative acceleration40/7; from zero relative velocity relative displacement=0.5(40/7)(2²)=80/7 m, lower ahead. Long overlap specified.

**Findings:** No specific content flag found. Difficulty fit is provisional; qualified review remains pending.

**Proposed revision:** Retain only after independent academic review.

**Academic approval:** pending; status remains draft.

- [ ] Reviewer independently solves the question and checks all four options, force directions, units, assumptions and physical regime.
- [ ] Reviewer records name/date/decision and hash of the exact final approved content.

### GNO-PHY11-C04-H-005 — Hard

**Topic:** Time-dependent net force and displacement

A 2 kg particle moves on a straight frictionless track with initial velocity 1 m/s. Its net force is F(t) = (4t − 2) N for 0 ≤ t ≤ 3 s. What is its displacement over these 3 s?

A. 6 m
B. 9 m
C. 7.5 m
D. 10.5 m

**Supplied key:** C — 7.5 m

**Supplied explanation:** Acceleration = F/m=2t−1. Velocity is v(t)=1+∫₀ᵗ(2τ−1)dτ=1+t²−t, which stays positive. Displacement = ∫₀³(1+t²−t)dt = [t+t³/3−t²/2]₀³ =3+9−4.5=7.5 m.

**Independent answer/FBD check:** a=2t-1; integrate with v0=1 to v=1+t²-t=(t-0.5)²+0.75>0. Displacement integral0..3v dt=3+9-4.5=7.5 m. Force changes sign but velocity does not reverse.

**Findings:** Difficulty: likely Medium (H014 especially direct); requires substantive revision or qualified justification for Hard.

**Proposed revision:** Infer two parameters of a signed force law from timed velocity/displacement measurements, then calculate total path across all velocity roots.

**Academic approval:** pending; status remains draft.

- [ ] Reviewer independently solves the question and checks all four options, force directions, units, assumptions and physical regime.
- [ ] Reviewer records name/date/decision and hash of the exact final approved content.

### GNO-PHY11-C04-H-006 — Hard

**Topic:** Multi-stage force pulse

A 2 kg cart starts from rest on a smooth straight track. A 10 N force to the right acts for 2 s, immediately followed by a 5 N force to the left for 4 s. What is the total displacement during the 6 s?

A. 0 m
B. 20 m to the right
C. 50 m to the right
D. 30 m to the right

**Supplied key:** D — 30 m to the right

**Supplied explanation:** First interval: a₁=5 m/s², v₂=10 m/s, s₁=(1/2)5(2²)=10 m. Second interval: a₂=−2.5 m/s², s₂=10(4)+(1/2)(−2.5)(4²)=40−20=20 m. Total displacement=30 m right, though final velocity is zero.

**Independent answer/FBD check:** First phase a=5, v2=10,s1=10. Second phase a=-2.5 for4 s, v6=0 and s2=10(4)-1.25(16)=20. Total displacement30 m right, no negative-velocity segment.

**Findings:** Difficulty: likely Medium (H014 especially direct); requires substantive revision or qualified justification for Hard.

**Proposed revision:** Design two force-pulse durations under a fixed impulse budget and travel constraint; solve all feasible pulse sequences and test stopping/reversal conditions.

**Academic approval:** pending; status remains draft.

- [ ] Reviewer independently solves the question and checks all four options, force directions, units, assumptions and physical regime.
- [ ] Reviewer records name/date/decision and hash of the exact final approved content.

### GNO-PHY11-C04-H-007 — Hard

**Topic:** Accelerating wedge equilibrium

A small block remains at rest relative to a smooth wedge whose incline rises to the right at 30°. In which horizontal direction, and with what magnitude, must the wedge accelerate? Take g = 10 m/s².

A. Left at 10/√3 m/s²
B. Right at 10/√3 m/s²
C. Left at 5 m/s²
D. Right at 5√3 m/s²

**Supplied key:** A — Left at 10/√3 m/s²

**Supplied explanation:** For a wedge accelerating left, the pseudo-force on the block acts right, up the incline. For relative equilibrium ma cosθ=mg sinθ, so a=g tanθ=10 tan30°=10/√3 m/s² left. Acceleration to the right would add to down-slope gravity.

**Independent answer/FBD check:** Slope rises right. Wedge acceleration left produces pseudo-force right; upslope pseudo-component ma cos30 balances mg sin30. Thus a=g tan30=10/sqrt(3) m/s² LEFT. In inertial frame N cos30=mg and N sin30=ma confirm direction.

**Findings:** Difficulty: likely Medium (H014 especially direct); requires substantive revision or qualified justification for Hard.

**Proposed revision:** Find the interval of wedge accelerations that permits a block to remain at rest with static friction, checking normal positivity and both impending-slip directions.

**Academic approval:** pending; status remains draft.

- [ ] Reviewer independently solves the question and checks all four options, force directions, units, assumptions and physical regime.
- [ ] Reviewer records name/date/decision and hash of the exact final approved content.

### GNO-PHY11-C04-H-008 — Hard

**Topic:** Limiting friction against a vertical wall

A 5 kg block is held against a rough vertical wall by a force F directed 30° above the horizontal towards the wall. The coefficient of static friction is 0.4 and g = 10 m/s². Find the minimum F that prevents the block from slipping down.

A. 100/(1 − 0.4√3) N
B. 100/(1 + 0.4√3) N
C. 125 N
D. 50 N

**Supplied key:** B — 100/(1 + 0.4√3) N

**Supplied explanation:** At limiting downward slip the wall friction acts upward. The normal force is F cos30° and upward balance gives F sin30° + μ_s F cos30°=mg=50. Therefore F[1/2+0.4√3/2]=50, so F=100/(1+0.4√3) N.

**Independent answer/FBD check:** At lower equilibrium threshold, f is up. Horizontal balance N=Fcos30, vertical Fsin30+mu_s N=50. Fmin=100/(1+0.4sqrt(3)) N. Check full static range: F also <=100/(1-0.4sqrt(3)) N; the requested minimum satisfies both bounds.

**Findings:** Difficulty: likely Medium (H014 especially direct); requires substantive revision or qualified justification for Hard.

**Proposed revision:** Find the full allowed force interval for static equilibrium against the wall, then optimize the angle for minimum force with a stated normal/contact constraint.

**Academic approval:** pending; status remains draft.

- [ ] Reviewer independently solves the question and checks all four options, force directions, units, assumptions and physical regime.
- [ ] Reviewer records name/date/decision and hash of the exact final approved content.

### GNO-PHY11-C04-H-009 — Hard

**Topic:** Wall friction with oblique force

An 8 kg block is sliding down a vertical rough wall while a 100 N force presses it toward the wall at 30° above horizontal. If μ_k = 0.25 and g = 10 m/s², find its downward acceleration.

A. (30 + 12.5√3)/8 m/s²
B. (80 − 50√3)/8 m/s²
C. (30 − 12.5√3)/8 m/s²
D. (50 − 12.5√3)/8 m/s²

**Supplied key:** C — (30 − 12.5√3)/8 m/s²

**Supplied explanation:** The applied force has upward component 100 sin30°=50 N and normal component N=100 cos30°=50√3 N. Since the block slides down, friction μ_k N=12.5√3 N acts up. Net downward force =80−50−12.5√3=30−12.5√3 N, so a=(30−12.5√3)/8 m/s².

**Independent answer/FBD check:** Sliding down =>friction UP. Applied upward component50 N; N=50sqrt(3) N; friction12.5sqrt(3) N up; net down=80-50-12.5sqrt(3). Divide by8 for a=(30-12.5sqrt(3))/8 m/s²>0.

**Findings:** Difficulty: likely Medium (H014 especially direct); requires substantive revision or qualified justification for Hard.

**Proposed revision:** Use a time-varying oblique wall force to identify when a downward-sliding block stops and whether it subsequently sticks or slides upward, with both friction coefficients supplied.

**Academic approval:** pending; status remains draft.

- [ ] Reviewer independently solves the question and checks all four options, force directions, units, assumptions and physical regime.
- [ ] Reviewer records name/date/decision and hash of the exact final approved content.

### GNO-PHY11-C04-H-010 — Hard

**Topic:** Two inclined planes with a pulley

A 2 kg block on a frictionless 30° incline is connected by a light rope over a pulley to a 5 kg block on a frictionless 60° incline. The 5 kg block slides down its slope. Take g = 10 m/s². Find the acceleration magnitude.

A. (25√3 + 10)/7 m/s²
B. (10√3 − 25)/7 m/s²
C. (25√3 − 10)/3 m/s²
D. (25√3 − 10)/7 m/s²

**Supplied key:** D — (25√3 − 10)/7 m/s²

**Supplied explanation:** Gravity components along the string are 5×10 sin60°=25√3 N and 2×10 sin30°=10 N. The driving difference is 25√3−10 N, over total mass 2+5=7 kg, giving a=(25√3−10)/7 m/s².

**Independent answer/FBD check:** Both slopes smooth. Opposed string-direction gravity components25sqrt(3) and10 N; shared a=(25sqrt(3)-10)/(2+5) m/s². Positive value agrees with5 kg descending. T=10+2a>0.

**Findings:** Difficulty: likely Medium (H014 especially direct); requires substantive revision or qualified justification for Hard.

**Proposed revision:** Allow one rough incline and a variable inclination on the other; determine critical angle regimes and the physically valid acceleration/tension after release.

**Academic approval:** pending; status remains draft.

- [ ] Reviewer independently solves the question and checks all four options, force directions, units, assumptions and physical regime.
- [ ] Reviewer records name/date/decision and hash of the exact final approved content.

### GNO-PHY11-C04-H-011 — Hard

**Topic:** Moving pulley constraint

A 6 kg load hangs from an ideal movable pulley supported by two segments of a light rope. The free rope end carries a hanging 2 kg mass through a fixed pulley. Release the system from rest; take g = 10 m/s². What is the downward acceleration of the 6 kg load?

A. 10/7 m/s²
B. 20/7 m/s²
C. 10/3 m/s²
D. 0 m/s²

**Supplied key:** A — 10/7 m/s²

**Supplied explanation:** If the load moves down with acceleration a, the 2 kg free-end mass moves up with acceleration 2a. For the 2 kg mass, T−20=2(2a), or T=20+4a. For the load, 60−2T=6a. Thus 60−40−8a=6a; 20=14a; a=10/7 m/s² down.

**Independent answer/FBD check:** Standard topology: one rope end fixed overhead, rope under the load's movable pulley then over a fixed pulley to2 kg. Rope length gives a_free=-2a_load. FBDs:60-2T=6a, T-20=2(2a), hence a=20/(6+8)=10/7 m/s² downward. State topology explicitly or supply a checked diagram.

**Findings:** No specific content flag found. Difficulty fit is provisional; qualified review remains pending.

**Proposed revision:** Retain only after independent academic review.

**Academic approval:** pending; status remains draft.

- [ ] Reviewer independently solves the question and checks all four options, force directions, units, assumptions and physical regime.
- [ ] Reviewer records name/date/decision and hash of the exact final approved content.

### GNO-PHY11-C04-H-012 — Hard

**Topic:** Rocket with changing mass

A vertical rocket has mass m(t) = (1000 − 20t) kg during a burn. It ejects exhaust downward at 500 m/s relative to the rocket, losing 20 kg/s. Neglect air resistance and use g = 10 m/s². Find its instantaneous upward acceleration at t = 20 s.

A. 10/3 m/s²
B. 20/3 m/s²
C. 50/3 m/s²
D. 10 m/s²

**Supplied key:** B — 20/3 m/s²

**Supplied explanation:** At t=20 s its mass is 1000−400=600 kg. Upward thrust is mass flow × relative exhaust speed =20×500=10,000 N. Weight=600×10=6,000 N. Net upward acceleration=(10,000−6,000)/600=20/3 m/s².

**Independent answer/FBD check:** Open-system momentum flux gives thrust q urel=20(500)=10000 N up. At t20,m=600 kg, weight6000 N down, so a=(10000-6000)/600=20/3 m/s² up. Do not use constant-mass d(mv)/dt without the exhaust flux. Positive mass domain t<50 s includes t20.

**Findings:** Difficulty: likely Medium (H014 especially direct); requires substantive revision or qualified justification for Hard.

**Proposed revision:** Infer exhaust flow rate from two acceleration measurements at separate times, checking the variable-mass domain and recovering the launch mass without treating it as a closed system.

**Academic approval:** pending; status remains draft.

- [ ] Reviewer independently solves the question and checks all four options, force directions, units, assumptions and physical regime.
- [ ] Reviewer records name/date/decision and hash of the exact final approved content.

### GNO-PHY11-C04-H-013 — Hard

**Topic:** Recoil with relative launch speed

A 9 kg launcher and a 1 kg projectile are initially at rest on a smooth track. The projectile is fired to the right at 30 m/s RELATIVE TO the recoiling launcher. Find the launcher's ground-frame velocity.

A. 30 m/s to the left
B. 10/3 m/s to the left
C. 3 m/s to the left
D. 3 m/s to the right

**Supplied key:** C — 3 m/s to the left

**Supplied explanation:** Let the launcher velocity be V (right positive) and projectile velocity u. Conservation of momentum: 9V+u=0. Relative speed u−V=30, so u=30+V. Therefore 10V+30=0, giving V=−3 m/s.

**Independent answer/FBD check:** With right positive,9V+u=0 and u-V=30. Thus10V=-30 =>V=-3 m/s, launcher left, projectile ground speed27 m/s right. Relative and ground speeds differ.

**Findings:** Difficulty: likely Medium (H014 especially direct); requires substantive revision or qualified justification for Hard.

**Proposed revision:** Use two sequential relative-frame ejections with different directions and a final speed constraint; solve the unknown ejection parameter and check momentum after each separation.

**Academic approval:** pending; status remains draft.

- [ ] Reviewer independently solves the question and checks all four options, force directions, units, assumptions and physical regime.
- [ ] Reviewer records name/date/decision and hash of the exact final approved content.

### GNO-PHY11-C04-H-014 — Hard

**Topic:** Accelerating vehicle pendulum

A 2 kg pendulum bob hangs motionless relative to a vehicle accelerating horizontally. The string makes an angle of 37° with the vertical, with sin37°=0.6 and cos37°=0.8. Take g=10 m/s². What is the string tension?

A. 20 N
B. 16 N
C. 32 N
D. 25 N

**Supplied key:** D — 25 N

**Supplied explanation:** Vertical balance requires T cos37°=mg=20 N. Thus T=20/0.8=25 N. The horizontal force T sin37°=15 N supplies horizontal acceleration 7.5 m/s².

**Independent answer/FBD check:** Bob shares horizontal vehicle acceleration but zero vertical acceleration: Tcos37=20 =>T=25 N. Tsin37=15 N =>ax=7.5 m/s². Correct, but vertical balance alone answers it.

**Findings:** Difficulty: likely Medium (H014 especially direct); requires substantive revision or qualified justification for Hard.

**Proposed revision:** Complete draft proposal above and in the corrections JSON. A complete original cart/pendulum/lift/friction replacement is provided in the proposed-corrections JSON and below; it requires effective gravity, bob equilibrium, floor reaction and horizontal system balance.

**Academic approval:** pending; status remains draft.

- [ ] Reviewer independently solves the question and checks all four options, force directions, units, assumptions and physical regime.
- [ ] Reviewer records name/date/decision and hash of the exact final approved content.

### GNO-PHY11-C04-H-015 — Hard

**Topic:** Stopping on an uphill rough incline

A block enters a rough 30° incline moving UP at 20 m/s. With μ_k=0.25, g=10 m/s², and negligible air resistance, how far uphill does it travel before stopping?

A. 80/(2 + 0.5√3) m
B. 40/(2 − 0.5√3) m
C. 40/(2 + 0.5√3) m
D. 80/(2 − 0.5√3) m

**Supplied key:** A — 80/(2 + 0.5√3) m

**Supplied explanation:** Both gravity and kinetic friction decelerate upward motion: a=g(sin30°+μ cos30°)=10(1/2+√3/8)=5+1.25√3 m/s². From 0=u²−2as, s=400/[2(5+1.25√3)]=80/(2+0.5√3) m ≈27.91 m.

**Independent answer/FBD check:** During uphill slide gravity and friction both point down: deceleration magnitude10(0.5+0.25sqrt(3)/2)=5+1.25sqrt(3). First stopping distance400/[2(5+1.25sqrt(3))]=80/(2+0.5sqrt(3)) m, about27.91. Subsequent sliding is irrelevant to first stop.

**Findings:** Difficulty: likely Medium (H014 especially direct); requires substantive revision or qualified justification for Hard.

**Proposed revision:** After uphill stopping, determine whether the block sticks or slides back down using mu_s, then compute its return time and speed using mu_k with reversed friction.

**Academic approval:** pending; status remains draft.

- [ ] Reviewer independently solves the question and checks all four options, force directions, units, assumptions and physical regime.
- [ ] Reviewer records name/date/decision and hash of the exact final approved content.

### GNO-PHY11-C04-H-016 — Hard

**Topic:** Static-to-kinetic friction with time-varying pull

A 4 kg block starts at rest on a rough horizontal floor. The horizontal pull increases as F(t) = (10 + 4t) N. The friction coefficients are μ_s=0.5 and μ_k=0.25, and g=10 m/s². Find its speed at t=4 s, assuming it begins sliding when the threshold is exceeded.

A. 4 m/s
B. 39/8 m/s
C. 25/8 m/s
D. 8 m/s

**Supplied key:** B — 39/8 m/s

**Supplied explanation:** Maximum static friction=0.5×4×10=20 N; motion begins at 10+4t=20, so t=2.5 s. Once sliding, kinetic friction=0.25×40=10 N and acceleration=[10+4t−10]/4=t m/s². Therefore v(4)=∫₂.₅⁴ t dt=(16−6.25)/2=39/8 m/s.

**Independent answer/FBD check:** Before motion, fs adjusts to F up to20 N; threshold time(20-10)/4=2.5 s. After threshold, kinetic friction10 N left and a=[10+4t-10]/4=t m/s². Integral2.5..4 t dt=(16-6.25)/2=39/8 m/s. It is wrong to integrate kinetic friction from t0.

**Findings:** No specific content flag found. Difficulty fit is provisional; qualified review remains pending.

**Proposed revision:** Retain only after independent academic review.

**Academic approval:** pending; status remains draft.

- [ ] Reviewer independently solves the question and checks all four options, force directions, units, assumptions and physical regime.
- [ ] Reviewer records name/date/decision and hash of the exact final approved content.

### GNO-PHY11-C04-H-017 — Hard

**Topic:** Three-block pulley with unequal friction

Two blocks of masses 2 kg and 4 kg lie in a row on a horizontal surface and are connected by one light string. The 4 kg block is connected by a second light string over a pulley to a 6 kg hanging mass. The coefficients of kinetic friction with the floor are 0.2 and 0.3 respectively. Take g=10 m/s²; the hanging mass moves down. Find the tension between the two table blocks.

A. 22/3 N
B. 16 N
C. 34/3 N
D. 44/3 N

**Supplied key:** C — 34/3 N

**Supplied explanation:** Friction on 2 kg is 0.2×2×10=4 N, and on 4 kg it is 0.3×4×10=12 N. Net driving force on all masses=60−4−12=44 N, total mass=12 kg, giving a=11/3 m/s². For the 2 kg block, T−4=2a, hence T=4+22/3=34/3 N.

**Independent answer/FBD check:** Table frictions4 and12 N oppose table motion. Whole-system drive60-16=44 N over12 kg gives a=11/3. Leftmost2 kg FBD T1-4=2a =>T1=34/3 N. Other string tension=60-6a=38 N; middle FBD38-T1-12=4a checks.

**Findings:** Difficulty: likely Medium (H014 especially direct); requires substantive revision or qualified justification for Hard.

**Proposed revision:** Include a movable-pulley connection so the three masses have unequal acceleration magnitudes; derive the constraint and solve both tensions rather than using a single total-mass shortcut.

**Academic approval:** pending; status remains draft.

- [ ] Reviewer independently solves the question and checks all four options, force directions, units, assumptions and physical regime.
- [ ] Reviewer records name/date/decision and hash of the exact final approved content.

### GNO-PHY11-C04-H-018 — Hard

**Topic:** Pulling the top block causes slipping

A 2 kg block sits on a 5 kg block on a smooth floor. The blocks have coefficients μ_s=0.5, μ_k=0.2 at their interface. A horizontal 20 N force suddenly pulls the UPPER block. Starting from rest and allowing sufficient overlap, find the relative displacement between the blocks after 1 s. Take g=10 m/s².

A. 1.8 m
B. 7.2 m
C. 0 m
D. 3.6 m

**Supplied key:** D — 3.6 m

**Supplied explanation:** If locked, a=20/7, requiring friction on lower block 5(20/7)>10 N=max static friction; thus they slip. Kinetic friction is 0.2×2×10=4 N. Upper acceleration=(20−4)/2=8; lower acceleration=4/5=0.8 m/s². Relative displacement=(1/2)(8−0.8)(1²)=3.6 m.

**Independent answer/FBD check:** Sticking trial a=20/7 requires friction on lower5a=100/7>static max10. Kinetic friction4 N points LEFT on upper and RIGHT on lower. atop=(20-4)/2=8,abottom=4/5=0.8; relative displacement0.5(7.2)(1²)=3.6 m, upper ahead. Sufficient overlap specified.

**Findings:** No specific content flag found. Difficulty fit is provisional; qualified review remains pending.

**Proposed revision:** Retain only after independent academic review.

**Academic approval:** pending; status remains draft.

- [ ] Reviewer independently solves the question and checks all four options, force directions, units, assumptions and physical regime.
- [ ] Reviewer records name/date/decision and hash of the exact final approved content.

### GNO-PHY11-C04-H-019 — Hard

**Topic:** Tangential and radial friction on a turntable

A coin lies 2 m from the axis of a horizontal rotating platform. At some instant the angular speed is 1 rad/s and the angular acceleration is 1 rad/s². With g=10 m/s², what is the minimum coefficient of static friction needed to prevent slipping at that instant?

A. √2/5
B. 1/5
C. 2/5
D. √2/10

**Supplied key:** A — √2/5

**Supplied explanation:** Tangential acceleration =rα=2 m/s²; radial acceleration =rω²=2 m/s². They are perpendicular, giving total required friction acceleration √(2²+2²)=2√2 m/s². The limiting static friction can provide μ_s g, so μ_s≥(2√2)/10=√2/5.

**Independent answer/FBD check:** No slip: friction alone supplies both inward r omega²=2 and tangential r alpha=2 m/s². Perpendicular resultant2sqrt(2); N=mg, so mu_min=(2sqrt(2))/10=sqrt(2)/5. Do not add component magnitudes linearly.

**Findings:** Difficulty: likely Medium (H014 especially direct); requires substantive revision or qualified justification for Hard.

**Proposed revision:** Use a specified increasing angular-speed law and a measured static coefficient to find the first slipping time, combining time-dependent radial and tangential demands and checking normal contact.

**Academic approval:** pending; status remains draft.

- [ ] Reviewer independently solves the question and checks all four options, force directions, units, assumptions and physical regime.
- [ ] Reviewer records name/date/decision and hash of the exact final approved content.

### GNO-PHY11-C04-H-020 — Hard

**Topic:** Net force in non-uniform circular motion

A 5 kg particle follows a circle of radius 10 m. At one instant its speed is 6 m/s and its tangential acceleration is 2 m/s². Find the magnitude of the net force at that instant.

A. 18 N
B. 2√106 N
C. 10 N
D. 26 N

**Supplied key:** B — 2√106 N

**Supplied explanation:** Radial acceleration is v²/r=36/10=3.6 m/s²; tangential acceleration is 2 m/s². Their vector resultant has magnitude √(3.6²+2²)=√16.96=(2√106)/5 m/s². Multiply by m=5 kg to obtain net force 2√106 N ≈20.59 N.

**Independent answer/FBD check:** Radial acceleration36/10=3.6 and tangential2 m/s² are perpendicular. Net force magnitude5sqrt(3.6²+2²)=sqrt(18²+10²)=2sqrt(106) N, about20.59.

**Findings:** Difficulty: likely Medium (H014 especially direct); requires substantive revision or qualified justification for Hard.

**Proposed revision:** Use a time-dependent tangential drive with a maximum friction bound; integrate speed, combine radial/tangential demand and determine earliest slipping time.

**Academic approval:** pending; status remains draft.

- [ ] Reviewer independently solves the question and checks all four options, force directions, units, assumptions and physical regime.
- [ ] Reviewer records name/date/decision and hash of the exact final approved content.

### GNO-PHY11-C04-H-021 — Hard

**Topic:** Horizontal support of a block on an incline

A 3 kg block is held stationary on a smooth fixed incline angled 37° above horizontal by a horizontal push directed towards the uphill side. With sin37°=0.6, cos37°=0.8 and g=10 m/s², what is the normal reaction of the incline?

A. 24 N
B. 30 N
C. 37.5 N
D. 22.5 N

**Supplied key:** C — 37.5 N

**Supplied explanation:** Along incline the horizontal push P contributes P cosθ uphill, balancing mg sinθ, so P=mg tanθ=30(0.6/0.8)=22.5 N. Normal force is N=mg cosθ+P sinθ=30(0.8)+22.5(0.6)=24+13.5=37.5 N.

**Independent answer/FBD check:** Push is uphill horizontally. Along slope Pcos37=mg sin37 gives P=22.5 N. Into-plane component Psin37 increases normal: N=30(0.8)+22.5(0.6)=37.5 N. N is not just mg cos37.

**Findings:** Difficulty: likely Medium (H014 especially direct); requires substantive revision or qualified justification for Hard.

**Proposed revision:** Determine the minimum horizontal push for equilibrium on a rough incline, then the upper push limit for impending upward slip while checking contact.

**Academic approval:** pending; status remains draft.

- [ ] Reviewer independently solves the question and checks all four options, force directions, units, assumptions and physical regime.
- [ ] Reviewer records name/date/decision and hash of the exact final approved content.

### GNO-PHY11-C04-H-022 — Hard

**Topic:** Powered motion followed by friction-only stopping

A 4 kg block starts from rest on a horizontal surface with kinetic friction coefficient 0.25. A horizontal 30 N force acts for 4 s, then is removed. Take g=10 m/s². How far does the block travel in total before coming to rest?

A. 80 m
B. 40 m
C. 160 m
D. 120 m

**Supplied key:** D — 120 m

**Supplied explanation:** Friction=0.25×4×10=10 N. While pushed, net=20 N, a=5 m/s²; in 4 s speed reaches 20 m/s and distance is (1/2)×5×4²=40 m. Afterwards, friction decelerates at 10/4=2.5 m/s² and stopping distance is v²/(2a)=400/5=80 m. Total=120 m.

**Independent answer/FBD check:** Provided motion starts and remains right during the push, N=40, fk=10, a1=5. After4 s,v=20,s1=40. After removal a2=-2.5, additional stop distance400/5=80; total120 m. Starting from rest needs static-breakaway assurance, missing from the source.

**Findings:** Difficulty: likely Medium (H014 especially direct); requires substantive revision or qualified justification for Hard.; A coefficient of kinetic friction alone does not guarantee a block initially at rest starts moving; specify a sufficient static-breakaway condition.

**Proposed revision:** Complete draft proposal above and in the corrections JSON. Give finite push duration as an unknown and a fixed route length, then determine whether the block stops within the route under a stated static/kinetic model; compare all force-on/force-off cases.

**Academic approval:** pending; status remains draft.

- [ ] Reviewer independently solves the question and checks all four options, force directions, units, assumptions and physical regime.
- [ ] Reviewer records name/date/decision and hash of the exact final approved content.

### GNO-PHY11-C04-H-023 — Hard

**Topic:** Hanging mass hits the ground mid-motion

A 3 kg block on a horizontal table (μ_k=0.2) is joined over a pulley to a hanging 5 kg mass. Initially both are at rest; the hanging mass descends exactly 2 m before hitting the floor, after which the rope goes slack. Take g=10 m/s². How much farther does the table block travel AFTER the hanging mass lands?

A. 5.5 m
B. 2.75 m
C. 11 m
D. 4 m

**Supplied key:** A — 5.5 m

**Supplied explanation:** While connected, driving force=5g−μ_k(3g)=50−6=44 N, total mass=8 kg, a=5.5 m/s². After moving 2 m, v²=2as=22 m²/s². Once the hanging mass stops, the table block is slowed only by friction with deceleration μ_k g=2 m/s²; further stopping distance=v²/(2×2)=22/4=5.5 m.

**Independent answer/FBD check:** Descent is stipulated. During taut-rope motion drive50-6=44 N over8 kg =>a=5.5. Over2 m,v²=22. On ground contact rope goes slack as specified; table block then decelerates at2 m/s² and extra distance22/4=5.5 m. No tension should be retained after impact.

**Findings:** No specific content flag found. Difficulty fit is provisional; qualified review remains pending.

**Proposed revision:** Retain only after independent academic review.

**Academic approval:** pending; status remains draft.

- [ ] Reviewer independently solves the question and checks all four options, force directions, units, assumptions and physical regime.
- [ ] Reviewer records name/date/decision and hash of the exact final approved content.

### GNO-PHY11-C04-H-024 — Hard

**Topic:** Two-stage Atwood motion after a rope breaks

An ideal Atwood machine has masses 4 kg and 6 kg. Starting from rest, the 6 kg mass falls 1 m; exactly then the connecting string breaks. Neglect air drag and take g=10 m/s². How much additional HEIGHT does the 4 kg mass gain after the break?

A. 0.4 m
B. 0.2 m
C. 1 m
D. 2 m

**Supplied key:** B — 0.2 m

**Supplied explanation:** Before the break a=[(6−4)/(6+4)]g=2 m/s². After the 6 kg mass descends 1 m, speed squared is v²=2as=4 m²/s², and the 4 kg mass is moving upward. After the string breaks it decelerates at g, so extra rise=v²/(2g)=4/20=0.2 m.

**Independent answer/FBD check:** Before break Atwood a=(6-4)10/10=2 m/s². After1 m,v²=4; smaller mass moves upward. After break T=0 and gravity downward; extra rise=v²/(2g)=0.2 m. Not total rise1.2 m.

**Findings:** Difficulty: likely Medium (H014 especially direct); requires substantive revision or qualified justification for Hard.

**Proposed revision:** Specify a height ceiling for the ascending mass and a delayed rope break; derive the allowable break-time interval avoiding impact and compare pre/post-break root domains.

**Academic approval:** pending; status remains draft.

- [ ] Reviewer independently solves the question and checks all four options, force directions, units, assumptions and physical regime.
- [ ] Reviewer records name/date/decision and hash of the exact final approved content.

### GNO-PHY11-C04-H-025 — Hard

**Topic:** Inclined system in upward accelerating lift

Inside a lift accelerating upward at 3 m/s², a 2 kg block lies on a smooth 30° incline and is connected over a pulley to a freely hanging 3 kg mass. Take g=10 m/s². The hanging mass moves down relative to the lift. Find string tension.

A. 13 N
B. 18.2 N
C. 23.4 N
D. 39 N

**Supplied key:** C — 23.4 N

**Supplied explanation:** In the lift frame effective gravity is g_eff=13 m/s². Net driving force=3×13−2×13 sin30°=39−13=26 N, total mass 5 kg, so a=5.2 m/s². For the inclined block, T−2×13×1/2=2a, giving T=13+10.4=23.4 N.

**Independent answer/FBD check:** Lift-frame effective g13. Hanging drive39 minus incline component13 =>system a=26/5=5.2 relative to lift. Inclined FBD T-13=2a gives T=23.4 N. Hanging39-T=3a agrees. Shared acceleration is relative to the lift.

**Findings:** No specific content flag found. Difficulty fit is provisional; qualified review remains pending.

**Proposed revision:** Retain only after independent academic review.

**Academic approval:** pending; status remains draft.

- [ ] Reviewer independently solves the question and checks all four options, force directions, units, assumptions and physical regime.
- [ ] Reviewer records name/date/decision and hash of the exact final approved content.

### GNO-PHY11-C04-H-026 — Hard

**Topic:** Optimal pulling angle with kinetic friction

A 5 kg crate is pulled by a force of fixed magnitude 20 N at an adjustable angle θ above a rough horizontal floor. The kinetic friction coefficient is 0.5, g=10 m/s², and the crate stays in contact with the floor. Which θ gives the GREATEST horizontal acceleration?

A. 0°
B. 45°
C. arctan(2)
D. arctan(0.5)

**Supplied key:** D — arctan(0.5)

**Supplied explanation:** The horizontal net force is F cosθ−μ_k(mg−F sinθ)=F(cosθ+μ_k sinθ)−μ_kmg. The factor cosθ+μ_k sinθ is maximum when tanθ=μ_k=0.5. The normal force remains positive for this angle, so θ=arctan(0.5).

**Independent answer/FBD check:** For RIGHT sliding and theta in[0,90°], a=[20(cos theta+0.5sin theta)-25]/5. Maximum at tan theta=0.5; N=50-20sin theta>0. Maximum a=4sqrt(1.25)-5=sqrt(20)-5≈-0.528 m/s², so it still slows a right-moving crate. For LEFT sliding, friction reverses and maximum occurs at theta0 instead. Initial rest additionally requires mu_s. Source needs signed-acceleration/sliding-direction wording.

**Findings:** Specify existing RIGHT sliding and a signed horizontal acceleration; all right-sliding accelerations are negative for supplied numbers. Left sliding changes the optimizing angle.

**Proposed revision:** Complete draft proposal above and in the corrections JSON. Retain only after independent academic review.

**Academic approval:** pending; status remains draft.

- [ ] Reviewer independently solves the question and checks all four options, force directions, units, assumptions and physical regime.
- [ ] Reviewer records name/date/decision and hash of the exact final approved content.

### GNO-PHY11-C04-H-027 — Hard

**Topic:** Sequential recoil from two ejections

A 12 kg system is initially at rest on a frictionless track. It first ejects a 2 kg piece LEFT at 10 m/s in the ground frame. Later the remaining 10 kg system ejects a 1 kg piece LEFT at 8 m/s in the ground frame. What is the final ground-frame speed of the remaining 9 kg system?

A. 28/9 m/s to the right
B. 2 m/s to the right
C. 20/9 m/s to the right
D. 28/9 m/s to the left

**Supplied key:** A — 28/9 m/s to the right

**Supplied explanation:** First ejection: 2(−10)+10v₁=0, so v₁=2 m/s right. Just before second ejection momentum of the 10 kg body is 20 kg·m/s. After second ejection, 1(−8)+9v₂=20, so 9v₂=28 and v₂=28/9 m/s right.

**Independent answer/FBD check:** First ejection ground momentum gives2(-10)+10v1=0 =>v1=2 right. Second:10(2)=1(-8)+9v2 =>v2=28/9 right. Global final momentum also gives9v2-20-8=0. Sequential wording alone does not prevent a one-equation shortcut.

**Findings:** Difficulty: likely Medium (H014 especially direct); requires substantive revision or qualified justification for Hard.

**Proposed revision:** Complete draft proposal above and in the corrections JSON. A complete original two-ejection replacement using speeds relative to the recoiling remnant is provided in the proposed-corrections JSON and below; solve frame transformations separately at each ejection.

**Academic approval:** pending; status remains draft.

- [ ] Reviewer independently solves the question and checks all four options, force directions, units, assumptions and physical regime.
- [ ] Reviewer records name/date/decision and hash of the exact final approved content.

### GNO-PHY11-C04-H-028 — Hard

**Topic:** Friction requirement on an accelerating inclined truck bed

A block must remain stationary relative to a truck bed tilted 30° ABOVE the horizontal in the forward direction. The truck accelerates FORWARD at 6 m/s². Take g=10 m/s². What minimum static friction coefficient is required?

A. (5 − 3√3)/(5√3 + 3)
B. (5 + 3√3)/(5√3 − 3)
C. (5 + 3√3)/(5√3 + 3)
D. (5√3 − 3)/(5 + 3√3)

**Supplied key:** B — (5 + 3√3)/(5√3 − 3)

**Supplied explanation:** In the accelerating truck frame pseudo-force acts backward. It has down-slope component ma cos30°; gravity has down-slope component mg sin30°. Thus required friction/m=5+3√3. The normal force/m=g cos30°−a sin30°=5√3−3>0. At the static limit μ_min=(5+3√3)/(5√3−3)≈1.80.

**Independent answer/FBD check:** Truck frame pseudo-force BACKWARD and gravity both project down the slope: required f/m=6cos30+10sin30=3sqrt(3)+5. Normal N/m=10cos30-6sin30=5sqrt(3)-3>0. Therefore mu_min=(5+3sqrt(3))/(5sqrt(3)-3)≈1.80, up-slope friction. Inertial-frame component equations give the same result.

**Findings:** No specific content flag found. Difficulty fit is provisional; qualified review remains pending.

**Proposed revision:** Retain only after independent academic review.

**Academic approval:** pending; status remains draft.

- [ ] Reviewer independently solves the question and checks all four options, force directions, units, assumptions and physical regime.
- [ ] Reviewer records name/date/decision and hash of the exact final approved content.

### GNO-PHY11-C04-H-029 — Hard

**Topic:** Two objects push apart on frictionless ice

Two skaters of masses 40 kg and 60 kg start at rest next to each other on frictionless ice. They push one another with an equal and opposite constant horizontal force of 60 N for 0.5 s, then coast without further force for 2.0 s. How far apart are they at the end?

A. 2.5 m
B. 0.3125 m
C. 2.8125 m
D. 3.125 m

**Supplied key:** C — 2.8125 m

**Supplied explanation:** During the push each skater accelerates in opposite directions: a₁=60/40=1.5, a₂=60/60=1 m/s². Separation gained during 0.5 s is (1/2)(1.5+1)(0.5²)=0.3125 m. Their speeds then are 0.75 and 0.5 m/s. During 2 s coasting they gain (0.75+0.5)×2=2.5 m more. Total separation=2.8125 m.

**Independent answer/FBD check:** Push phase accelerations opposite:1.5 and1 m/s². Separation during0.5 s=0.5(2.5)(0.5²)=0.3125. Then relative coast speed0.75+0.5=1.25 m/s adds2.5 m in2 s. Total2.8125 m; final momenta30 and-30 cancel.

**Findings:** Difficulty: likely Medium (H014 especially direct); requires substantive revision or qualified justification for Hard.

**Proposed revision:** Use unequal push durations with a specified third external impulse on one skater; infer both trajectories and the first reunion or minimum separation after the interaction ends.

**Academic approval:** pending; status remains draft.

- [ ] Reviewer independently solves the question and checks all four options, force directions, units, assumptions and physical regime.
- [ ] Reviewer records name/date/decision and hash of the exact final approved content.

### GNO-PHY11-C04-H-030 — Hard

**Topic:** Friction changes direction after a stop

A 2 kg block initially slides LEFT at 10 m/s on a level rough surface while a constant horizontal 5 N force acts RIGHT. The coefficients are μ_k=0.25 and μ_s=0.4; take g=10 m/s². What total distance does the block travel during the next 5 s?

A. 20 m
B. 15 m
C. 25 m
D. 10 m

**Supplied key:** D — 10 m

**Supplied explanation:** While it slides left, kinetic friction acts right with magnitude μ_k mg=0.25×2×10=5 N. Along with the applied 5 N right, net right force=10 N, so deceleration of leftward motion is 5 m/s². The block stops after 10/5=2 s, travelling 10²/(2×5)=10 m left. Once stopped, maximum static friction=0.4×20=8 N can balance the 5 N right pull, so it remains at rest for the remaining 3 s. Total distance=10 m.

**Independent answer/FBD check:** Initial LEFT slip means kinetic friction5 N RIGHT, adding applied5 N right =>a=5 right. Stop at2 s after10 m path. At rest, maximum static friction8 N exceeds applied5 N, so friction becomes5 N LEFT and motion stays stopped for3 s. Total10 m. Title should say friction switches from right kinetic to left static; no reverse sliding occurs.

**Findings:** Difficulty: likely Medium (H014 especially direct); requires substantive revision or qualified justification for Hard.

**Proposed revision:** Let the rightward applied force increase after the first stop; calculate the sticking interval and subsequent breakaway/reversed sliding, explicitly changing friction regimes.

**Academic approval:** pending; status remains draft.

- [ ] Reviewer independently solves the question and checks all four options, force directions, units, assumptions and physical regime.
- [ ] Reviewer records name/date/decision and hash of the exact final approved content.

## Six configurations preserved

| Difficulty | Questions | Minutes | Actual Chapter4 availability |
| ---------- | --------: | ------: | ---------------------------- |
| Easy       |        10 |      10 | Disabled:0 approved          |
| Medium     |        10 |      20 | Disabled:0 approved          |
| Medium     |        20 |      40 | Disabled:0 approved          |
| Hard       |        10 |      30 | Disabled:0 approved          |
| Hard       |        20 |      60 | Disabled:0 approved          |
| Hard       |        30 |      90 | Disabled:0 approved          |

Counts are enabled only with enough academically approved nonsample questions in this exact chapter/difficulty. No cross-level filling; +4/-1/0 remains unchanged. Timings are GNOSIS practice timings.

## Required before publication

1. A qualified Physics reviewer independently checks all60, approves or revises the provisional difficulties and resolves the friction assumptions/duplicate group.
2. Review the seven full proposed revisions; write and solve complete four-option replacements for other flagged questions when necessary. They remain outside the bank until explicitly accepted. Preserve unrelated records and approved content.
3. Check all physical domains, distractors and answer-key mappings again after revision. Record reviewer identity,date,exact record hash and per-question decision. Automated arithmetic checks do not equal academic review.
4. Only after actual qualified academic approval AND explicit owner authorization may selected exact records become verified. Keep unreviewed/demonstration records excluded. Revalidate minimum approved counts for the six sizes.
5. Rerun schema/answer/duplicate/unit/API/TypeScript/build checks. Push/deployment require separate owner approval.

## Technical verification

- JSON/native schema and existing importer dry run/write passed for60 drafts. Duplicate-ID replay was rejected without a second import. All7 separate proposed corrections validate as native drafts and remain outside the imported bank.
- Eight new Chapter4 tests passed: independent intended-answer calculations and numerical distractor checks for all60, friction ambiguity counterexamples, physical-domain checks, per-record review coverage, duplicate/preservation checks, proposal math, draft exclusion and six timer/scoring pairs. The eight passed again after correcting the provenance labels on the two assistant-authored replacements.
- Full unit/regression suite:78 passed,0 failed, including Chapters1/2/3, existing mock engine/resource/progress checks and new Chapter4 tests.
- TypeScript: `tsc --noEmit --incremental false` passed. Production: `next build --webpack` completed successfully.
- Two API integration tests passed on an isolated local production preview: actual unapproved Chapters1/2/3/4 remain unavailable; existing content/private endpoint/quiz/PDF checks passed. All six supported configurations were tested per chapter; global obsolete size rejection was tested once to remain within the existing start-rate limit.
- Additional actual Chapter4 catalog assertion passed: HTTP200,60 drafts (10/20/30),0 approved and no enabled sizes.
- Ten API matrix tests passed with PRIVATE technical Chapter4 fixtures plus Chapter1 isolation controls: all six timer/count pairs, exact class/subject/chapter/difficulty of saved questions, unique selections, hidden keys, +4/-1/0, tokens, clearing/saving/resume, stale revisions, concurrent duplicate submissions, expiry and malformed/empty banks. No real record was academically approved by these simulations.
- All eight pre-existing bank SHA256 values checked again after testing: unchanged. Preview/QA used isolated attempt directories; existing real attempts were not used.
- Prettier checks passed on task files. No lint script/linter is configured, so no lint result is claimed.
- No visual FBD/browser/mobile review was performed. Analytical force directions and text checks are not visual diagram QA or qualified academic approval.
- No UI/engine source changes, activation, GitHub push or deployment. Only the new draft bank, review/correction artifacts, availability report, test files and test command were updated for this task.
