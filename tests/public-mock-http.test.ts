import { test } from "node:test";
import assert from "node:assert/strict";
import {
  publicMockChapterPath,
  publicPhysicsMockPath,
} from "../lib/public-mock-routes";
const base = process.env.TEST_BASE_URL ?? "http://localhost:3000";
test("public mock index and chapters resolve directly for a fresh guest and refresh, with no answers in SSR", async () => {
  for (const route of [
    publicPhysicsMockPath,
    ...[1, 2, 3, 4].map(publicMockChapterPath),
  ]) {
    for (let refresh = 0; refresh < 2; refresh++) {
      const response = await fetch(base + route, {
        redirect: "manual",
        headers: {
          "User-Agent": refresh
            ? "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) Mobile GNOSIS QA"
            : "GNOSIS fresh guest QA",
        },
      });
      assert.equal(response.status, 200, route);
      assert.equal(response.headers.get("location"), null);
      const html = await response.text();
      assert.ok(html.includes("Class 11"));
      assert.ok(html.includes("Questions awaiting academic approval"));
      assert.ok(!html.includes("GNO-PHY11-"));
      assert.ok(!html.includes("phy11-units-dimensions-"));
      if (route !== publicPhysicsMockPath) {
        assert.ok(html.includes("Share Test"));
        assert.ok(html.includes("chapter-mock-test"));
      }
    }
  }
  const invalid = await fetch(base + publicPhysicsMockPath + "/chapter-5");
  assert.equal(invalid.status, 404);
});
