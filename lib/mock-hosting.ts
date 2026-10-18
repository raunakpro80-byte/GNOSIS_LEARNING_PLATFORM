import { mockDatabaseConfigured } from "./mock-database";
export function mockAttemptStorageIssue(
  environment: Readonly<Record<string, string | undefined>> = process.env,
) {
  return environment.VERCEL && !mockDatabaseConfigured(environment)
    ? "Mock test attempts are unavailable on this host until durable server storage is configured. Chapter pages remain available."
    : null;
}
