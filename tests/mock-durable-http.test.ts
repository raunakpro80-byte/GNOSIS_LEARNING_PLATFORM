// Isolated production HTTP flow with a private Supabase protocol fixture.
// This tests the real adapter/auth/routes, not a live Supabase project or its RLS.
import { test } from "node:test";
import assert from "node:assert/strict";
import { createServer } from "node:http";
import { once } from "node:events";
import { spawn } from "node:child_process";
import { mkdir, writeFile, readFile } from "node:fs/promises";
import path from "node:path";
import { randomUUID } from "node:crypto";
import { readMockBank } from "../lib/mock-bank";
import { mockQuestionHash, reviewChecks } from "../lib/mock-review";
import type { MockAttempt, PublicMockAttempt } from "../lib/mock-types";

const owner = "11111111-1111-4111-8111-111111111111",
  other = "22222222-2222-4222-8222-222222222222";
test(
  "production routes: owner review, durable guest attempts, six configurations, CAS, expiry and unavailable DB",
  { timeout: 180000 },
  async (t) => {
    const directory = path.resolve("tmp", `mock-owner-qa-${randomUUID()}`);
    await mkdir(path.join(directory, "banks"), { recursive: true });
    const bank = (await readMockBank()).filter(
      (q) =>
        q.chapter === 1 &&
        q.className === "11" &&
        q.subject === "physics" &&
        !q.developmentSample,
    );
    await writeFile(
      path.join(directory, "banks/fixture.json"),
      JSON.stringify({ schemaVersion: 1, questions: bank }),
    );
    const attempts = new Map<
      string,
      { version: number; payload: MockAttempt }
    >();
    const reviews = new Map<string, Record<string, unknown>>(),
      audit: unknown[] = [];
    let databaseUnavailable = false;
    const backend = createServer(async (req, res) => {
      try {
        const url = new URL(req.url!, "http://fixture"),
          auth = req.headers.authorization;
        res.setHeader("Content-Type", "application/json");
        function send(status: number, body: unknown) {
          res.statusCode = status;
          res.end(JSON.stringify(body));
        }
        if (url.pathname === "/auth/v1/user") {
          if (
            auth !== "Bearer owner-fixture" &&
            auth !== "Bearer other-fixture"
          )
            return send(401, { message: "Invalid token" });
          return send(200, {
            id: auth === "Bearer owner-fixture" ? owner : other,
            aud: "authenticated",
            role: "authenticated",
            email: "fixture@example.invalid",
          });
        }
        if (
          auth !== "Bearer service-fixture" ||
          req.headers.apikey !== "service-fixture"
        )
          return send(403, { message: "Private tables" });
        if (databaseUnavailable)
          return send(503, { message: "Fixture database offline" });
        let raw = "";
        for await (const chunk of req) raw += chunk;
        const body = raw ? JSON.parse(raw) : null;
        if (url.pathname === "/rest/v1/mock_question_reviews")
          return send(200, [...reviews.values()]);
        if (url.pathname === "/rest/v1/rpc/record_mock_review") {
          const prior = reviews.get(body.p_question_id),
            version = Number(prior?.version ?? 0);
          if (version !== body.p_expected_version)
            return send(409, { code: "40001", message: "Review changed" });
          const row = {
            question_id: body.p_question_id,
            content_hash: body.p_content_hash,
            decision: body.p_decision,
            version: version + 1,
            reviewer_id: body.p_reviewer_id,
            reviewed_at: new Date().toISOString(),
            notes: body.p_notes,
          };
          reviews.set(body.p_question_id, row);
          audit.push({ ...row, checklist: body.p_checklist });
          return send(200, null);
        }
        if (url.pathname === "/rest/v1/mock_attempts") {
          const id = url.searchParams.get("id")?.replace(/^eq\./, "");
          if (req.method === "POST") {
            assert.ok(!attempts.has(body.id));
            attempts.set(body.id, structuredClone(body));
            return send(201, null);
          }
          if (req.method === "GET") {
            const row = attempts.get(id!);
            return send(200, row ? [structuredClone(row)] : []);
          }
          if (req.method === "PATCH") {
            const row = attempts.get(id!),
              expected = Number(
                url.searchParams.get("version")?.replace(/^eq\./, ""),
              );
            if (!row || row.version !== expected) return send(200, []);
            attempts.set(id!, structuredClone(body));
            return send(200, [{ id }]);
          }
        }
        send(404, { message: "Unknown fixture endpoint" });
      } catch (error) {
        res.statusCode = 500;
        res.end(JSON.stringify({ message: String(error) }));
      }
    });
    backend.listen(0, "127.0.0.1");
    await once(backend, "listening");
    const dbPort = (backend.address() as { port: number }).port;
    const portProbe = createServer();
    portProbe.listen(0, "127.0.0.1");
    await once(portProbe, "listening");
    const appPort = (portProbe.address() as { port: number }).port;
    await new Promise<void>((resolve) => portProbe.close(() => resolve()));
    const child = spawn(
      process.execPath,
      [
        "node_modules/next/dist/bin/next",
        "start",
        "-H",
        "127.0.0.1",
        "-p",
        String(appPort),
      ],
      {
        cwd: process.cwd(),
        windowsHide: true,
        env: {
          ...process.env,
          NODE_ENV: "production",
          VERCEL: "1",
          GNOSIS_MOCK_BANK_DIR: path.join(directory, "banks"),
          GNOSIS_MOCK_OWNER_ID: owner,
          NEXT_PUBLIC_SUPABASE_URL: `http://127.0.0.1:${dbPort}`,
          NEXT_PUBLIC_SUPABASE_ANON_KEY: "anon-fixture",
          SUPABASE_SERVICE_ROLE_KEY: "service-fixture",
        },
        stdio: ["ignore", "pipe", "pipe"],
      },
    );
    let log = "";
    child.stdout.on("data", (chunk) => (log += chunk));
    child.stderr.on("data", (chunk) => (log += chunk));
    const base = `http://127.0.0.1:${appPort}`,
      reviewPath = "/api/mock-tests/review";
    const call = (
      route: string,
      method = "GET",
      body?: unknown,
      token?: string,
    ) =>
      fetch(base + route, {
        method,
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: body === undefined ? undefined : JSON.stringify(body),
      });
    const decision = (q = bank[0], changes = {}) => ({
      questionId: q.id,
      contentHash: mockQuestionHash(q),
      expectedVersion: 0,
      decision: "approved",
      academicReviewed: true,
      checks: Object.fromEntries(reviewChecks.map((key) => [key, true])),
      notes: "Private isolated fixture review; no real question approved.",
      ...changes,
    });
    try {
      let ready = false;
      for (let tries = 0; tries < 100; tries++) {
        if (child.exitCode !== null) throw new Error(log);
        try {
          await fetch(base + reviewPath);
          ready = true;
          break;
        } catch {
          await new Promise((resolve) => setTimeout(resolve, 150));
        }
      }
      assert.ok(ready, log);
      await t.test(
        "unauthenticated/forged/nonowner requests never receive drafts",
        async () => {
          for (const token of [undefined, "fake-token", "other-fixture"]) {
            const response = await call(reviewPath, "GET", undefined, token);
            assert.equal(
              response.status,
              token === "other-fixture" ? 403 : 401,
            );
            assert.ok(
              !JSON.stringify(await response.json()).includes(bank[0].prompt),
            );
            assert.match(response.headers.get("cache-control")!, /no-store/);
          }
          assert.equal(
            (await call(reviewPath, "POST", decision(), "other-fixture"))
              .status,
            403,
          );
          const forged = await fetch(base + reviewPath, {
            headers: { "x-gnosis-owner": owner },
          });
          assert.equal(forged.status, 401);
        },
      );
      await t.test(
        "owner preview includes solutions and reports, but review requires checklist and exact content",
        async () => {
          const response = await call(
            reviewPath + "?chapter=1",
            "GET",
            undefined,
            "owner-fixture",
          );
          assert.equal(response.status, 200);
          const data = await response.json();
          assert.equal(data.total, 90);
          assert.equal(data.items.length, 20);
          assert.ok(data.items[0].question.explanation);
          assert.ok(data.items[0].findings);
          assert.match(
            response.headers.get("cache-control")!,
            /private, no-store/,
          );
          assert.equal(
            (
              await call(
                reviewPath,
                "POST",
                decision(bank[0], { academicReviewed: false }),
                "owner-fixture",
              )
            ).status,
            400,
          );
          assert.equal(
            (
              await call(
                reviewPath,
                "POST",
                decision(bank[0], { contentHash: "0".repeat(64) }),
                "owner-fixture",
              )
            ).status,
            409,
          );
          assert.equal(reviews.size, 0);
        },
      );
      const selections = [
        ...bank.filter((q) => q.difficulty === "easy").slice(0, 10),
        ...bank.filter((q) => q.difficulty === "medium"),
        ...bank.filter((q) => q.difficulty === "hard"),
      ];
      await t.test(
        "only fixture owner approvals unlock exact difficulty sizes; audit and review CAS",
        async () => {
          for (const q of selections)
            assert.equal(
              (await call(reviewPath, "POST", decision(q), "owner-fixture"))
                .status,
              200,
            );
          assert.equal(reviews.size, 60);
          assert.equal(audit.length, 60);
          assert.equal(
            (
              await call(
                reviewPath,
                "POST",
                decision(selections[0]),
                "owner-fixture",
              )
            ).status,
            409,
          );
          const response = await call(
            "/api/mock-tests?className=11&subject=physics&chapter=1",
          );
          assert.equal(response.status, 200);
          const catalog = await response.json();
          assert.deepEqual(catalog.sizes, {
            easy: [10],
            medium: [10, 20],
            hard: [10, 20, 30],
          });
          assert.equal(catalog.storage, "supabase");
          const publicPage = await (
            await call("/mock-tests/class-11/physics/chapter-1")
          ).text();
          assert.ok(!publicPage.includes('"correct"'));
          assert.ok(!publicPage.includes('"explanation"'));
        },
      );
      const created: { token: string; attempt: PublicMockAttempt }[] = [];
      await t.test(
        "six timers, exclusive pools, no repeated questions and no active answer leakage",
        async () => {
          for (const [difficulty, count, minutes] of [
            ["easy", 10, 10],
            ["medium", 10, 20],
            ["medium", 20, 40],
            ["hard", 10, 30],
            ["hard", 20, 60],
            ["hard", 30, 90],
          ] as const) {
            const response = await call("/api/mock-tests", "POST", {
              className: "11",
              subject: "physics",
              chapter: 1,
              difficulty,
              count,
            });
            assert.equal(response.status, 200);
            const data = await response.json();
            created.push(data);
            const a = data.attempt as PublicMockAttempt;
            assert.equal(a.storage, "supabase");
            assert.equal(a.questions.length, count);
            assert.equal(a.expiresAt - a.startedAt, minutes * 60000);
            assert.equal(new Set(a.questions.map((q) => q.id)).size, count);
            assert.ok(
              a.questions.every(
                (q) =>
                  q.difficulty === difficulty &&
                  selections.some((real) => real.id === q.id),
              ),
            );
            assert.ok(!JSON.stringify(a).includes('"correct"'));
            assert.ok(!JSON.stringify(a).includes('"explanation"'));
            assert.ok(!JSON.stringify(a).includes('"tokenHash"'));
          }
          assert.equal(
            (
              await call("/api/mock-tests", "POST", {
                className: "11",
                subject: "physics",
                chapter: 1,
                difficulty: "easy",
                count: 20,
              })
            ).status,
            400,
          );
        },
      );
      await t.test(
        "guest saves resume through independent adapter instances; capability required; server scores +4/-1/0",
        async () => {
          const { token, attempt } = created[0],
            route = `/api/mock-tests/${attempt.id}`,
            stored = attempts.get(attempt.id)!.payload;
          assert.equal((await call(route)).status, 401);
          assert.equal(
            (
              await call(
                route,
                "GET",
                undefined,
                `${attempt.id}.${"x".repeat(43)}`,
              )
            ).status,
            401,
          );
          const [first, second] = stored.questions,
            answers = {
              [first.id]: first.correct,
              [second.id]: ((second.correct as number) + 1) % 4,
            };
          const saved = await call(
            route,
            "PATCH",
            { revision: 0, answers },
            token,
          );
          assert.equal(saved.status, 200);
          assert.deepEqual((await saved.json()).answers, answers);
          // New requests use a new adapter/client; all state comes from the DB fixture.
          const resumed = await (
            await call(route, "GET", undefined, token)
          ).json();
          assert.equal(resumed.revision, 1);
          assert.deepEqual(resumed.answers, answers);
          const resultResponse = await call(
            route,
            "POST",
            { revision: 1, answers },
            token,
          );
          assert.equal(resultResponse.status, 200);
          const result = (await resultResponse.json()).result;
          assert.equal(result.marksObtained, 3);
          assert.equal(result.correct, 1);
          assert.equal(result.wrong, 1);
          assert.equal(result.unattempted, 8);
          assert.equal(result.accuracy, 50);
          assert.ok(
            result.items.every((q: { explanation: string }) => q.explanation),
          );
          const duplicate = await (
            await call(route, "POST", { revision: 0, answers: {} }, token)
          ).json();
          assert.deepEqual(duplicate.result, result);
        },
      );
      await t.test(
        "concurrent writes reject stale revisions; expiry grades saved answers exactly once",
        async () => {
          const { attempt, token } = created[1],
            route = `/api/mock-tests/${attempt.id}`,
            stored = attempts.get(attempt.id)!.payload,
            q = stored.questions[0],
            answers = { [q.id]: q.correct };
          const simultaneous = await Promise.all([
            call(route, "PATCH", { revision: 0, answers }, token),
            call(route, "PATCH", { revision: 0, answers: {} }, token),
          ]);
          assert.deepEqual(
            simultaneous.map((r) => r.status).sort(),
            [200, 409],
          );
          const row = attempts.get(attempt.id)!;
          row.payload.answers = answers;
          row.payload.expiresAt = Date.now() - 1000;
          const expired = await (
            await call(route, "GET", undefined, token)
          ).json();
          assert.equal(expired.result.reason, "expired");
          assert.equal(expired.result.marksObtained, 4);
          const again = await (
            await call(route, "POST", { revision: 0, answers: {} }, token)
          ).json();
          assert.deepEqual(again.result, expired.result);
        },
      );
      await t.test(
        "database outage fails closed, never falls back to ephemeral files",
        async () => {
          databaseUnavailable = true;
          const response = await call("/api/mock-tests", "POST", {
            className: "11",
            subject: "physics",
            chapter: 1,
            difficulty: "easy",
            count: 10,
          });
          assert.equal(response.status, 503);
          assert.equal(
            (
              await call(
                `/api/mock-tests/${created[2].attempt.id}`,
                "GET",
                undefined,
                created[2].token,
              )
            ).status,
            503,
          );
          assert.equal(
            (await call(reviewPath, "GET", undefined, "owner-fixture")).status,
            503,
          );
          databaseUnavailable = false;
        },
      );
      assert.equal(
        await readFile(path.join(directory, "banks/fixture.json"), "utf8"),
        JSON.stringify({ schemaVersion: 1, questions: bank }),
      );
    } finally {
      child.kill();
      await new Promise<void>((resolve) => {
        if (child.exitCode !== null) resolve();
        else {
          child.once("exit", () => resolve());
          setTimeout(resolve, 5000).unref();
        }
      });
      backend.closeAllConnections();
      await new Promise<void>((resolve) => backend.close(() => resolve()));
      await writeFile(path.join(directory, "server.log"), log);
    }
  },
);
