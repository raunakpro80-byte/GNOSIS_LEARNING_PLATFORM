import { before, test } from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { importMockText } from "../lib/mock-import";
import type { Difficulty, MockQuestion } from "../lib/mock-types";

const levels = ["easy", "medium", "hard"] as const;
let bank: Record<Difficulty, MockQuestion[]>;
before(async () => {
  const root =
    process.env.GNOSIS_CURATED_REVIEW_DIR || "content/mock-questions";
  bank = Object.fromEntries(
    await Promise.all(
      levels.map(async (l) => [
        l,
        importMockText(
          await readFile(path.join(root, `11-physics-1-zip-${l}.json`), "utf8"),
          "json",
        ),
      ]),
    ),
  ) as typeof bank;
});
const q = (l: Difficulty, n: number) => bank[l][n - 1];
function only(l: Difficulty, n: number, predicate: (s: string) => boolean) {
  const item = q(l, n);
  const matches = item.options!.flatMap((s, i) => (predicate(s) ? [i] : []));
  assert.deepEqual(matches, [item.correct], item.id);
}
const answer = (l: Difficulty, n: number, s: string) =>
  only(l, n, (o) => o === s);
function numeric(s: string): number {
  s = s.trim().replaceAll(" ", "");
  const science = /^([+-]?[\d.]+)×10\^([+-]?\d+)/.exec(s);
  if (science) return Number(science[1]) * 10 ** Number(science[2]);
  if (/^10\^/.test(s)) return 10 ** Number(s.slice(3));
  const frac = /^([+-]?[\d.]+)\/([\d.]+)/.exec(s);
  if (frac) return Number(frac[1]) / Number(frac[2]);
  return Number.parseFloat(s);
}
const close = (a: number, b: number, tol = 1e-8) =>
  Math.abs(a - b) <= tol * Math.max(1, Math.abs(b));
const num = (l: Difficulty, n: number, x: number, tol = 1e-8) =>
  only(l, n, (s) => close(numeric(s), x, tol));
type Dim = number[];
const M = [1, 0, 0, 0],
  L = [0, 1, 0, 0],
  T = [0, 0, 1, 0],
  I = [0, 0, 0, 1],
  zero = [0, 0, 0, 0];
const mul = (...a: Dim[]) =>
  [0, 1, 2, 3].map((i) => a.reduce((s, d) => s + d[i], 0));
const power = (a: Dim, n: number) => a.map((v) => v * n);
const div = (a: Dim, b: Dim) => mul(a, power(b, -1));
const same = (a: Dim, b: Dim) => a.every((v, i) => close(v, b[i]));
const V = div(L, T),
  F = mul(M, L, power(T, -2)),
  E = mul(F, L),
  P = div(E, T),
  rho = div(M, power(L, 3)),
  eta = mul(F, power(L, -2), T),
  G = mul(power(M, -1), power(L, 3), power(T, -2)),
  H = mul(E, T);
function dims(s: string): Dim {
  if (s === "Dimensionless") return [...zero];
  const raw = s.replaceAll("[", "").replaceAll("]", "").replaceAll(" ", "");
  let consumed = "";
  const out = [0, 0, 0, 0];
  for (const m of raw.matchAll(/([MLTI])(?:\^(-?\d+))?/g)) {
    consumed += m[0];
    out["MLTI".indexOf(m[1])] += Number(m[2] ?? 1);
  }
  assert.equal(consumed, raw);
  return out;
}
const dim = (l: Difficulty, n: number, d: Dim) =>
  only(l, n, (s) => same(dims(s), d));
// Independent row reduction, also used to detect an invalid dimensional basis.
function reduce(columns: Dim[], target?: Dim) {
  const rows = [0, 1, 2, 3].map((i) => [
    ...columns.map((c) => c[i]),
    ...(target ? [target[i]] : []),
  ]);
  let r = 0;
  const pivots: number[] = [];
  for (let c = 0; c < columns.length; c++) {
    const pivot = rows.findIndex(
      (row, i) => i >= r && Math.abs(row[c]) > 1e-10,
    );
    if (pivot < 0) continue;
    [rows[r], rows[pivot]] = [rows[pivot], rows[r]];
    const v = rows[r][c];
    rows[r] = rows[r].map((x) => x / v);
    for (let i = 0; i < rows.length; i++)
      if (i !== r) {
        const f = rows[i][c];
        rows[i] = rows[i].map((x, j) => x - f * rows[r][j]);
      }
    pivots.push(c);
    r++;
  }
  return { rows, pivots, rank: r };
}
function solve(columns: Dim[], target: Dim) {
  const { rows, pivots, rank } = reduce(columns, target);
  assert.equal(rank, columns.length);
  const x = Array(columns.length).fill(0);
  pivots.forEach((c, i) => (x[c] = rows[i].at(-1)!));
  assert.ok(same(mul(...columns.map((c, i) => power(c, x[i]))), target));
  return x as number[];
}
function derivative(f: (x: number[]) => number, x: number[], i: number) {
  const h = 1e-5 * Math.max(1, Math.abs(x[i]));
  const a = [...x],
    b = [...x];
  a[i] += h;
  b[i] -= h;
  return (f(a) - f(b)) / (2 * h);
}
function bound(f: (x: number[]) => number, x: number[], u: number[]) {
  return x.reduce((s, _, i) => s + Math.abs(derivative(f, x, i)) * u[i], 0);
}
function standard(f: (x: number[]) => number, x: number[], u: number[]) {
  return Math.sqrt(
    x.reduce((s, _, i) => s + (derivative(f, x, i) * u[i]) ** 2, 0),
  );
}
function pair(s: string) {
  const m = /\(([\d.]+)±([\d.]+)\)/.exec(s);
  return m ? [Number(m[1]), Number(m[2])] : [NaN, NaN];
}

test("Curated Easy: all 10 answers and mutually exclusive distractors rechecked", () => {
  num("easy", 1, 10 ** (6 - -3));
  answer("easy", 2, "Candela");
  answer(
    "easy",
    3,
    "The smallest change in the measured quantity that one scale division represents.",
  );
  answer(
    "easy",
    4,
    "View along a line perpendicular to the scale through the pointer.",
  );
  assert.equal(4 / 16, 0.25);
  assert.ok(4 / 16 < 4 / 4);
  answer(
    "easy",
    5,
    "It decreases; a fixed calibration bias would not be removed by averaging.",
  );
  only("easy", 6, (s) => {
    const coefficient = s.split(" × ")[0];
    return (
      coefficient.replace(".", "").replace(/^0+/, "").length === 3 &&
      close(numeric(s), 1500)
    );
  });
  for (const offset of [-3, 0, 5])
    assert.ok(close(120.4 - offset - (20.4 - offset), 100));
  num("easy", 7, 120.4 - 20.4);
  answer(
    "easy",
    8,
    "Absolute uncertainty has units of mm; relative uncertainty is dimensionless.",
  );
  answer("easy", 9, Number(0.9996).toPrecision(3) + " m");
  dim("easy", 10, power(L, 2));
});
test("Curated Medium 1–10: every option checked against independently derived results", () => {
  dim("medium", 1, div(div(F, T), mul(F, T)));
  const [a, b, c] = solve([rho, V, power(L, 2)], P);
  num("medium", 2, 2 * a + b - c);
  const [pa, pb] = solve([L, div(L, power(T, 2))], T);
  const ratio = 9 ** pa * 0.5 ** pb;
  const candidates: Record<string, number> = {
    "3 sqrt(2)": 3 * Math.sqrt(2),
    "3/sqrt(2)": 3 / Math.sqrt(2),
    "9/2": 4.5,
    "6": 6,
  };
  only("medium", 3, (s) => close(candidates[s], ratio));
  num("medium", 4, 12 + 7 * (1 - 19 / 20) - 0.1);
  num("medium", 5, (24 * 1e-3) / 2e-2 ** 3);
  answer("medium", 6, ((12.34 + 0.6) / 1.2).toPrecision(3));
  const speed = ([x2, x1, t]: number[]) => (x2 - x1) / t;
  num("medium", 7, bound(speed, [20, 5, 3], [0.2, 0.1, 0.03]), 1e-7);
  num("medium", 8, (18 * 1000) / 3600 / (5 / 2));
  num("medium", 9, 0.012 / (2 * 0.03));
  num("medium", 10, (0.6 * 0.002) / (0.2 * 0.3));
  assert.ok(same(div(mul(F, L), mul(power(L, 2), V)), eta));
});
test("Curated Medium 11–20: conversions, sensitivities, phase and calibration rechecked", () => {
  num("medium", 11, 100 * (1.2 / 40 + (3 * 0.02) / 2));
  const inferredG = div(mul(F, power(L, 2)), power(M, 2));
  assert.ok(same(inferredG, G));
  num("medium", 12, 1 / (2 ** -1 * 3 ** 3 * 0.5 ** -2));
  num("medium", 13, (100 * 0.5) / (25.0 + 273.15), 0.0005);
  num("medium", 14, (6e-3 * 5 * 60) / 1.6e-19, 1e-12);
  dim("medium", 15, div(power(T, -2), power(L, -1)));
  const fn = ([l, t1, t2]: number[]) => (l * l) / (t1 + t2);
  num(
    "medium",
    16,
    (100 * bound(fn, [10, 2, 3], [0.1, 0.02, 0.04])) / fn([10, 2, 3]),
    1e-7,
  );
  num("medium", 17, (250 * (1000 * 100)) / 100);
  const gain = (24.5 - 12.5) / (20 - 10),
    offset = 12.5 - gain * 10;
  num("medium", 18, (18.5 - offset) / gain);
  assert.ok(same(div(E, mul(F, L)), zero));
  num("medium", 19, 0.3 / (2 * 0.05));
  const theta = ([arc, r]: number[]) => arc / r;
  num("medium", 20, bound(theta, [12, 30], [0.1, 0.3]), 5e-6);
});
test("Curated Hard 1–6: completeness, matrix rank, fractional exponents and perturbation", () => {
  const gravity = div(L, power(T, 2));
  assert.ok(same(power(div(L, gravity), 0.5), T));
  assert.ok(same(div(L, L), zero));
  answer("hard", 1, "T = sqrt(L/g) Φ(A/L)");
  const surface = div(F, L);
  assert.ok(same(div(surface, mul(rho, gravity, power(L, 2))), zero));
  answer("hard", 2, "h = r Φ(S/(ρ g r^2))");
  const target = div(F, power(V, 7 / 5));
  const exponents = solve([rho, eta, L], target);
  only("hard", 3, (s) => {
    const match = /^\(([^)]+)\); F2\/F1=(.+)$/.exec(s)!;
    const parts = match[1].split(",").map(numeric);
    const ratio = match[2] === "2^(7/5)" ? 2 ** (7 / 5) : numeric(match[2]);
    const predicted =
      (2 ** -3) ** exponents[0] * (2 ** -2) ** exponents[1] * 2 ** exponents[2];
    return (
      parts.every((v, i) => close(v, exponents[i])) && close(ratio, predicted)
    );
  });
  const planck = solve([G, H, V], T);
  assert.ok(planck.every((v, i) => close(v, [0.5, 0.5, -2.5][i])));
  for (const e of [0.001, 0.002])
    assert.ok(close((Math.sqrt((1 + e) * (1 - e)) - 1) / e ** 2, -0.5, 2e-6));
  answer("hard", 4, "sqrt(G h/c^5); change = -ε^2/2");
  const powers = solve([F, rho, V], E);
  num("hard", 5, 12 / (8 ** powers[0] * 2 ** powers[1] * 4 ** powers[2]));
  const momentum = mul(M, V);
  assert.equal(reduce([E, momentum, M]).rank, 2);
  assert.equal(reduce([E, momentum, M, T]).rank, 3);
  assert.ok(same(div(mul(E, M), power(momentum, 2)), zero));
  answer(
    "hard",
    6,
    "No; E m/p^2 is dimensionless, and all three quantities depend on L and T only through L/T.",
  );
});
test("Curated Hard 7–13: primitive-input bounds, optimization, exact intervals and common offsets", () => {
  const r = ([x, y]: number[]) => (x - y) / (x + y);
  num("hard", 7, bound(r, [10, 8], [0.1, 0.1]), 1e-7);
  const density = ([m, R, r]: number[]) =>
    (3 * m) / (4 * Math.PI * (R ** 3 - r ** 3));
  const central = [100, 10, 9.9];
  num(
    "hard",
    8,
    (100 * bound(density, central, [1, 0.001, 0.001])) / density(central),
    5e-5,
  );
  const accel = ([x1, x2, t]: number[]) => (x2 - 2 * x1) / t ** 2;
  const ax = [5, 22, 1];
  const au = bound(accel, ax, [0.02, 0.02, 0.005]);
  only("hard", 9, (s) => {
    const [a, u] = pair(s);
    return close(a, accel(ax)) && close(u, au, 1e-7);
  });
  const error = (tx: number) => 8 / Math.sqrt(tx) + 1 / Math.sqrt(100 - tx);
  const optimum = (100 * 8 ** (2 / 3)) / (1 + 8 ** (2 / 3));
  assert.ok(close(optimum, 80));
  for (const time of [1, 20, 50, 79, 81, 90, 99])
    assert.ok(error(time) > error(optimum));
  only("hard", 10, (s) => {
    const m = /tx=(\d+) s, ty=(\d+) s; minimum about ([\d.]+)%/.exec(s)!;
    return (
      close(+m[1], optimum) &&
      close(+m[2], 100 - optimum) &&
      close(+m[3], error(optimum), 0.0005)
    );
  });
  const wave = ([f, l, m, dl]: number[]) => l * Math.sqrt(f / (m * dl));
  const wx = [1, 1, 1, 1];
  num(
    "hard",
    11,
    (100 * bound(wave, wx, [0.01, 0.005, 0.01, 0.02])) / wave(wx),
    1e-7,
  );
  const maxDown = 100 * (1 - Math.sqrt((9.9 - 9.1) / (10 - 9)));
  const maxUp = 100 * (Math.sqrt((10.1 - 8.9) / (10 - 9)) - 1);
  assert.ok(maxDown > maxUp);
  only("hard", 12, (s) => {
    const p = /([\d.]+)%/.exec(s)!;
    return s.includes("lower-speed") && close(+p[1], maxDown, 0.0005);
  });
  const section = (offset: number) => (10 + offset) ** 2 - (9 + offset) ** 2;
  const fraction = Math.abs(section(0.02) / section(0) - 1) * 100;
  only("hard", 13, (s) => {
    const m = /([\d.]+)%/.exec(s)!;
    return close(+m[1], fraction, 0.002);
  });
});
test("Curated Hard 14–20: coefficient units, charge scale, inverse units and stable evaluation", () => {
  const A = L,
    B = power(T, -1),
    C = mul(L, power(T, -0.5));
  assert.ok(same(div(power(C, 2), mul(power(A, 2), B)), zero));
  assert.ok(close((1 / Math.sqrt(1000)) ** 2 / (1 / 1000), 1));
  answer(
    "hard",
    14,
    "B_ms=B_s/1000; C_ms=C_s/sqrt(1000); C^2/(A^2 B) is dimensionless and invariant.",
  );
  const charge = mul(I, T),
    eps = div(power(charge, 2), mul(F, power(L, 2)));
  const powers = solve([eps, M, L, charge], T);
  assert.ok(powers.every((v, i) => close(v, [0.5, 0.5, 1.5, -1][i])));
  num("hard", 15, 8 ** powers[1] * 0.5 ** powers[2] * 2 ** powers[3]);
  assert.ok(same(div(E, H), power(T, -1)));
  assert.ok(same(div(mul(G, power(E, 2)), mul(H, power(V, 5))), zero));
  answer("hard", 16, "f=(E/h) Φ(G E^2/(h c^5))");
  // Unit observations independently solved as a linear system rather than reading a stored key.
  const [a, b, c] = solve(
    [
      [1, 0, 1, 0],
      [1, 1, 0, 0],
      [0, 1, 1, 0],
    ],
    [3, 0, -1, 0],
  );
  assert.equal(a + c, -1);
  const scale = 3 ** a * 0.5 ** b * 2 ** c;
  only(
    "hard",
    17,
    (s) =>
      s.startsWith("[M L^2 T^-2]") &&
      close(numeric(s.split("ratio ")[1]), 1 / scale),
  );
  const g = (4 * Math.PI ** 2 * (2.1 - 0.9)) / (3 ** 2 - 2 ** 2),
    delta = (2 ** 2 * g) / (4 * Math.PI ** 2) - 0.9;
  only("hard", 18, (s) => {
    const m = /\(([\d.]+)π\^2 m\/s\^2, ([+-]?[\d.]+) m\)/.exec(s)!;
    const estimate = ([t1, t2]: number[]) =>
      (4 * Math.PI ** 2 * (2.1 - 0.9)) / (t2 ** 2 - t1 ** 2);
    const percentage =
      (100 * bound(estimate, [2, 3], [0.01, 0.01])) / estimate([2, 3]);
    const stated = /δg\/g≈([\d.]+)%/.exec(s)!;
    return (
      close(+m[1] * Math.PI ** 2, g) &&
      close(+m[2], delta) &&
      close(+stated[1], percentage, 1e-7)
    );
  });
  for (const mu of [0.9, 1.03, 1.2]) {
    const lam = 1.02;
    const corrected = mu * (1 / (mu / lam));
    assert.ok(close(corrected / lam ** 2, 1 / lam));
  }
  const ratios: Record<string, number> = {
    "50/51": 50 / 51,
    "1": 1,
    "1/(1.02)^2": 1 / 1.02 ** 2,
    "1.02": 1.02,
  };
  only("hard", 19, (s) => close(ratios[s], 1 / 1.02));
  for (const area of [1e-3, 0.1, 2]) {
    const radius = 3;
    const stable =
      area / (Math.PI * (Math.sqrt(radius ** 2 + area / Math.PI) + radius));
    assert.ok(
      close(Math.PI * ((radius + stable) ** 2 - radius ** 2), area, 1e-10),
    );
  }
  answer("hard", 20, "t=A/[π(sqrt(R^2+A/π)+R)]; t≈A/(2πR)");
});
test("Curated Hard 21–26: standard versus bounded errors, fit covariance and constrained minima", () => {
  const rel = (n: number) => (2 * Math.sqrt(0.2 ** 2 / n + 0.04 ** 2)) / 10;
  let count = 1;
  while (rel(count) > 0.01) count++;
  num("hard", 21, count);
  assert.ok(rel(count - 1) > 0.01);
  const n = Math.log(8) / Math.log(2);
  const prediction = ([y, x, x0]: number[]) => y * (x / x0) ** n;
  const ux = standard(prediction, [1, 2, 1], [0.02, 0.02, 0.02]);
  const expected = (100 * ux) / prediction([1, 2, 1]);
  only("hard", 22, (s) => {
    const root = /sqrt\((\d+)\)%/.exec(s);
    return close(root ? Math.sqrt(+root[1]) : numeric(s), expected, 1e-7);
  });
  const av = 2,
    bv = 162,
    v = (bv / av) ** 0.25,
    min = av * v * v + bv / v ** 2;
  only("hard", 23, (s) => {
    const m = /v=([\d.]+) m\/s; E_min=([\d.]+) J/.exec(s)!;
    return close(+m[1], v) && close(+m[2], min);
  });
  const cot = (x: number) => 1 / Math.tan(x);
  const range = ([a, b]: number[]) => 10 / (cot(a) - cot(b));
  const x = [(30 * Math.PI) / 180, (31 * Math.PI) / 180],
    u = [(0.01 * Math.PI) / 180, (0.01 * Math.PI) / 180];
  num("hard", 24, (100 * bound(range, x, u)) / range(x), 0.001);
  const crossover = ([f1, f2]: number[]) => (4 * f1 - f2) / (f2 - 2 * f1);
  const f = [3, 8];
  only("hard", 25, (s) => {
    const [a, u] = pair(s);
    return (
      close(a, crossover(f)) &&
      close(u, bound(crossover, f, [0.03, 0.08]), 1e-7)
    );
  });
  const corr = (2 ** 2 - 2 ** 2 - 2 ** 2) / (2 * 2 * 2),
    std = Math.sqrt(2 ** 2 + 2 ** 2 - 2 * corr * 2 * 2);
  assert.ok(corr >= -1 && corr <= 1);
  only("hard", 26, (s) => {
    const m = /ρ_xy=([^;]+); u_rel\(x\/y\)=(.+)%/.exec(s)!;
    const root = /sqrt\((\d+)\)/.exec(m[2]);
    return (
      close(numeric(m[1]), corr) &&
      close(root ? Math.sqrt(+root[1]) : numeric(m[2]), std)
    );
  });
});
test("Curated Hard 27–30: combined physical scaling, fitted-input cancellation and logarithmic uncertainty", () => {
  const modulus = div(F, power(L, 2));
  assert.ok(same(mul(modulus, power(L, 0.5), power(L, 1.5)), F));
  const integrationPower = 1.5 + 1;
  const massExponent = 1 / integrationPower,
    radiusExponent = -0.5 / integrationPower;
  num("hard", 27, 32 ** massExponent * 32 ** radiusExponent);
  assert.ok(
    same(
      mul(power(M, 0.4), power(V, -0.2), power(modulus, -0.4), power(L, -0.2)),
      T,
    ),
  );
  const tauExponent = -2 + 3 * 0.5 - 1;
  const ratios: Record<string, number> = {
    "It is multiplied by 1/(2 sqrt(2)).": 1 / (2 * Math.sqrt(2)),
    "It is multiplied by 1/sqrt(2).": 1 / Math.sqrt(2),
    "It is multiplied by sqrt(2).": Math.sqrt(2),
    "It is multiplied by 2 sqrt(2).": 2 * Math.sqrt(2),
  };
  only("hard", 28, (s) => close(ratios[s], 2 ** tauExponent));
  for (const mirror of [1.1, 1.4, 1.8]) {
    const fa = 1,
      lambda = 0.2,
      rate = 3;
    const reflectivity = mirror / fa - 1;
    assert.ok(
      close(
        (mirror * lambda) / (rate * (1 + reflectivity)),
        (fa * lambda) / rate,
      ),
    );
  }
  num("hard", 29, 1 + 0.5 + 2);
  assert.ok(same(div(mul(F, L), power(T, -1)), H));
  const fit = ([x1, x2, y1, y2]: number[]) =>
    Math.log(y2 / y1) / Math.log(x2 / x1);
  const values = [1, 4, 1, 8],
    sigma = values.map((v) => 0.01 * v),
    std = standard(fit, values, sigma);
  assert.ok(close(fit([1.05, 4.2, 0.95, 7.6]), fit(values)));
  only("hard", 30, (s) => {
    const m = /n=([\d.]+); u\(n\)≈([\d.]+)/.exec(s)!;
    return close(+m[1], fit(values)) && close(+m[2], std, 1e-5);
  });
});
test("Curated keys: shuffled options preserve correct-answer identity with balanced positions", async () => {
  const review = JSON.parse(
    await readFile("docs/question-banks/11-physics-1-curation.json", "utf8"),
  );
  for (const l of levels) {
    const counts = [0, 0, 0, 0];
    for (const item of bank[l]) {
      const record = review.questions.find(
        (r: { id: string }) => r.id === item.id,
      );
      assert.equal(
        item.options![item.correct as number],
        record.correctAnswerText,
      );
      assert.equal(item.verification.status, "draft");
      assert.equal(item.options!.length, 4);
      assert.equal(new Set(item.options).size, 4);
      counts[item.correct as number]++;
      assert.ok(!/option [ABCD]|answer [ABCD]/i.test(item.explanation));
    }
    assert.deepEqual(
      counts,
      l === "hard"
        ? [8, 8, 7, 7]
        : l === "medium"
          ? [5, 5, 5, 5]
          : [3, 3, 2, 2],
    );
  }
});
