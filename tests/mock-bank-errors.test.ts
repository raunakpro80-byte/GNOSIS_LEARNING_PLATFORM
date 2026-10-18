import { test } from "node:test";
import assert from "node:assert/strict";
import { mkdtemp, writeFile, rm } from "node:fs/promises";
import path from "node:path";
import os from "node:os";
import { readMockBank, MockBankUnavailableError } from "../lib/mock-bank";
test("invalid or missing banks report a safe unavailable error without publishing partial content", async () => {
  const prefix = path.join(os.tmpdir(), "gnosis-bank-errors-");
  const directory = await mkdtemp(prefix),
    original = process.env.GNOSIS_MOCK_BANK_DIR;
  try {
    process.env.GNOSIS_MOCK_BANK_DIR = directory;
    for (const bad of [
      "{broken",
      JSON.stringify({ schemaVersion: 1, questions: [] }),
    ]) {
      await writeFile(path.join(directory, "bad.json"), bad);
      await assert.rejects(
        readMockBank(),
        (error: unknown) =>
          error instanceof MockBankUnavailableError &&
          /temporarily unavailable/.test(error.message) &&
          !error.message.includes(directory),
      );
    }
    process.env.GNOSIS_MOCK_BANK_DIR = path.join(directory, "missing");
    await assert.rejects(readMockBank(), MockBankUnavailableError);
  } finally {
    if (original === undefined) delete process.env.GNOSIS_MOCK_BANK_DIR;
    else process.env.GNOSIS_MOCK_BANK_DIR = original;
    if (!path.resolve(directory).startsWith(path.resolve(prefix)))
      throw new Error("Unsafe QA cleanup path");
    await rm(directory, { recursive: true });
  }
});
