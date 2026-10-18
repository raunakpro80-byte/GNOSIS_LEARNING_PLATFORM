import {
  mkdir,
  open,
  readFile,
  rename,
  rmdir,
  stat,
  unlink,
} from "node:fs/promises";
import path from "node:path";
import { randomUUID } from "node:crypto";
import type { MockAttempt } from "./mock-types";
export interface MockAttemptStore {
  create(attempt: MockAttempt): Promise<void>;
  transaction<T>(
    id: string,
    operation: (attempt: MockAttempt) => T | Promise<T>,
  ): Promise<T>;
}
// Local adapter only. A future database adapter must keep each transaction atomic.
export class FileMockAttemptStore implements MockAttemptStore {
  constructor(
    public directory = path.resolve(
      process.env.GNOSIS_MOCK_DATA_DIR || ".gnosis-mock-data",
    ),
  ) {}
  private filename(id: string) {
    if (
      !/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
        id,
      )
    )
      throw new Error("Invalid attempt ID.");
    return path.join(this.directory, `${id}.json`);
  }
  private async locked<T>(id: string, run: (filename: string) => Promise<T>) {
    const filename = this.filename(id);
    await mkdir(this.directory, { recursive: true, mode: 0o700 });
    const lock = `${filename}.lock`;
    let acquired = false;
    for (let tries = 0; tries < 150; tries++) {
      try {
        await mkdir(lock);
        acquired = true;
        break;
      } catch (error) {
        if ((error as NodeJS.ErrnoException).code !== "EEXIST") throw error;
        // Only an empty, abandoned lock directory can be reclaimed.
        const info = await stat(lock).catch(() => null);
        if (info && Date.now() - info.mtimeMs > 120000)
          await rmdir(lock).catch(() => {});
        await new Promise((resolve) => setTimeout(resolve, 20));
      }
    }
    if (!acquired)
      throw new Error("Another request is saving this test. Try again.");
    try {
      return await run(filename);
    } finally {
      await rmdir(lock);
    }
  }
  private async write(filename: string, attempt: MockAttempt) {
    const temp = `${filename}.${randomUUID()}.tmp`;
    const handle = await open(temp, "wx", 0o600);
    try {
      await handle.writeFile(JSON.stringify(attempt));
      await handle.sync();
    } finally {
      await handle.close();
    }
    try {
      await rename(temp, filename);
    } finally {
      await unlink(temp).catch(() => {});
    }
  }
  async create(attempt: MockAttempt) {
    await this.locked(attempt.id, async (filename) => {
      try {
        await stat(filename);
        throw new Error("Attempt already exists.");
      } catch (error) {
        if ((error as NodeJS.ErrnoException).code !== "ENOENT") throw error;
      }
      await this.write(filename, attempt);
    });
  }
  async transaction<T>(
    id: string,
    operation: (attempt: MockAttempt) => T | Promise<T>,
  ): Promise<T> {
    return this.locked(id, async (filename) => {
      const attempt = JSON.parse(
        await readFile(filename, "utf8"),
      ) as MockAttempt;
      if (attempt.schemaVersion !== 1 || attempt.id !== id)
        throw new Error("Stored attempt is not readable.");
      const before = JSON.stringify(attempt);
      const result = await operation(attempt);
      if (JSON.stringify(attempt) !== before)
        await this.write(filename, attempt);
      return result;
    });
  }
}
