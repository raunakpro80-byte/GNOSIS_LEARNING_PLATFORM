import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { readMockBank } from "../lib/mock-bank";
import { parseMockBank } from "../lib/mock-schema";
import type { MockQuestion } from "../lib/mock-types";

async function main() {
  const args = process.argv.slice(2);
  if (args.length !== 2 || args[0] !== "--directory")
    throw new Error("Use --directory tmp/a-new-private-qa-directory");
  const directory = path.resolve(args[1]);
  const allowed = path.resolve("tmp") + path.sep;
  if (!directory.startsWith(allowed))
    throw new Error(
      "QA files must stay inside this project's ignored tmp directory.",
    );
  // Refuse to overwrite any previous QA data.
  await mkdir(directory);
  await mkdir(path.join(directory, "banks"));
  await mkdir(path.join(directory, "attempts"));
  const fixtures: MockQuestion[] = (
    ["easy", "medium", "hard"] as const
  ).flatMap((difficulty) =>
    Array.from({ length: 40 }, (_, index) => {
      const correct = index % 4;
      const options = [
        "Correct",
        "Distractor B",
        "Distractor C",
        "Distractor D",
      ];
      [options[0], options[correct]] = [options[correct], options[0]];
      return {
        id: `qa-${difficulty}-${String(index).padStart(2, "0")}`,
        className: "11" as const,
        subject: "physics" as const,
        chapter: 1,
        topic: "Technical QA fixtures",
        type: "single" as const,
        difficulty,
        prompt: `Technical QA fixture ${difficulty} ${index}: choose the option labelled Correct. Not an academic question. Notation probe: F = ma; [a] = L T^-2; ρ = m/V; Δx = 2 × 10^-3 m.`,
        options,
        correct,
        explanation:
          "This technical fixture checks option mapping and server scoring only. It is not an academic solution or a reviewed difficulty example.",
        source: {
          kind: "original" as const,
          label: "Synthetic technical QA fixture; not student content",
        },
        verification: {
          status: "verified" as const,
          method: "Deterministic technical fixture only; no academic approval.",
        },
        // Only in this ignored fixture directory: simulate approval to exercise the production gate.
        developmentSample: false,
      };
    }),
  );
  const bank = {
    schemaVersion: 1,
    questions: [...(await readMockBank()), ...fixtures],
  };
  parseMockBank(bank);
  await writeFile(
    path.join(directory, "banks", "qa-bank.json"),
    JSON.stringify(bank),
    { flag: "wx", mode: 0o600 },
  );
  console.log(
    `Prepared isolated QA data in ${directory}. Real bank files were not changed. Use only an isolated local QA server. These simulated approvals are not academic content.`,
  );
}
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
