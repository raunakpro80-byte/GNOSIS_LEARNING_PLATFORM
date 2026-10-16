import { createClient } from "@supabase/supabase-js";
import { seed } from "../lib/seed";
async function main() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL,
    key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key)
    throw new Error("Load .env.local and configure Supabase before seeding.");
  const db = createClient(url, key, { auth: { persistSession: false } });
  for (const [table, row, options] of [
    ["subjects", { name: seed.subject }, { onConflict: "name" }],
    [
      "chapters",
      { subject: seed.subject, name: seed.chapter },
      { onConflict: "subject,name" },
    ],
    [
      "lessons",
      {
        id: seed.id,
        subject: seed.subject,
        chapter: seed.chapter,
        status: seed.status,
        payload: seed,
      },
      { onConflict: "id" },
    ],
  ] as const) {
    const { error } = await db.from(table).upsert(row, options);
    if (error) throw new Error(`${table}: ${error.message}`);
  }
  console.log(
    "Seeded original Ohm’s Law demo content. No learning history or user metrics added.",
  );
}
main().catch((e) => {
  console.error(e.message);
  process.exitCode = 1;
});
