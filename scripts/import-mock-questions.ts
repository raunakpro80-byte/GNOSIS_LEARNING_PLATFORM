import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { randomUUID } from "node:crypto";
import { importMockText } from "../lib/mock-import";
import { mockBankDirectory, readMockBank } from "../lib/mock-bank";
async function main() {
  const args = process.argv.slice(2),
    inputIndex = args.indexOf("--input");
  if (
    inputIndex < 0 ||
    !args[inputIndex + 1] ||
    args.some(
      (arg, i) => i !== inputIndex + 1 && !["--input", "--write"].includes(arg),
    )
  )
    throw new Error(
      "Usage: pnpm import:mock --input path/to/questions.json|csv [--write]",
    );
  const file = path.resolve(args[inputIndex + 1]),
    extension = path.extname(file).toLowerCase();
  if (![".json", ".csv"].includes(extension))
    throw new Error("Use a JSON or CSV file.");
  const incoming = importMockText(
    await readFile(file, "utf8"),
    extension === ".csv" ? "csv" : "json",
  );
  const existing = new Set((await readMockBank()).map((q) => q.id));
  if (incoming.some((q) => existing.has(q.id)))
    throw new Error(
      "An imported question ID already exists. No files were changed.",
    );
  console.log(
    `Validated ${incoming.length} questions (${incoming.filter((q) => q.verification.status === "verified").length} verified).`,
  );
  if (!args.includes("--write")) {
    console.log(
      "Dry run only. Review the content and use --write to import. No files changed.",
    );
    return;
  }
  const destination = path.join(
    mockBankDirectory(),
    `imported-${Date.now()}-${randomUUID()}.json`,
  );
  await writeFile(
    destination,
    JSON.stringify({ schemaVersion: 1, questions: incoming }, null, 2) + "\n",
    { flag: "wx" },
  );
  console.log(
    `Imported to ${destination}. Draft questions remain unavailable to students.`,
  );
}
main().catch((error) => {
  console.error(error instanceof Error ? error.message : "Import failed.");
  process.exitCode = 1;
});
