import { parseMockBank } from "./mock-schema";
export const mockCsvColumns = [
  "id",
  "className",
  "subject",
  "chapter",
  "topic",
  "type",
  "difficulty",
  "prompt",
  "options",
  "correct",
  "tolerance",
  "explanation",
  "sourceKind",
  "sourceLabel",
  "sourceReference",
  "verificationStatus",
  "verificationMethod",
];
export function parseCsv(text: string) {
  const rows: string[][] = [];
  let row: string[] = [],
    cell = "",
    quoted = false,
    closed = false;
  text = text.replace(/^\uFEFF/, "");
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (quoted) {
      if (ch === '"' && text[i + 1] === '"') {
        cell += '"';
        i++;
      } else if (ch === '"') {
        quoted = false;
        closed = true;
      } else cell += ch;
    } else if (ch === '"') {
      if (cell || closed) throw new Error("Unexpected quote in CSV.");
      quoted = true;
    } else if (ch === ",") {
      row.push(cell);
      cell = "";
      closed = false;
    } else if (ch === "\n" || ch === "\r") {
      if (ch === "\r" && text[i + 1] === "\n") i++;
      row.push(cell);
      if (row.some((x) => x.trim())) rows.push(row);
      row = [];
      cell = "";
      closed = false;
    } else {
      if (closed) throw new Error("Characters after a closing CSV quote.");
      cell += ch;
    }
  }
  if (quoted) throw new Error("Unclosed CSV quote.");
  if (cell || row.length || closed) {
    row.push(cell);
    if (row.some((x) => x.trim())) rows.push(row);
  }
  return rows;
}
export function importMockText(text: string, format: "json" | "csv") {
  if (Buffer.byteLength(text, "utf8") > 5 * 1024 * 1024)
    throw new Error("Import limit is 5 MB.");
  if (format === "json")
    return parseMockBank(JSON.parse(text.replace(/^\uFEFF/, "")));
  const [headers, ...rows] = parseCsv(text);
  if (
    !headers ||
    headers.length !== mockCsvColumns.length ||
    new Set(headers).size !== headers.length ||
    headers.some((x) => !mockCsvColumns.includes(x))
  )
    throw new Error("CSV headers must match the documented question columns.");
  const questions = rows.map((cells, index) => {
    if (cells.length !== headers.length)
      throw new Error(`CSV row ${index + 2} has the wrong number of columns.`);
    const r = Object.fromEntries(headers.map((h, i) => [h, cells[i]]));
    return {
      id: r.id,
      className: r.className,
      subject: r.subject,
      chapter: Number(r.chapter),
      topic: r.topic,
      type: r.type,
      difficulty: r.difficulty,
      prompt: r.prompt,
      ...(r.options ? { options: JSON.parse(r.options) } : {}),
      correct: JSON.parse(r.correct),
      ...(r.tolerance ? { tolerance: Number(r.tolerance) } : {}),
      explanation: r.explanation,
      source: {
        kind: r.sourceKind,
        label: r.sourceLabel,
        ...(r.sourceReference ? { reference: r.sourceReference } : {}),
      },
      verification: {
        status: r.verificationStatus,
        method: r.verificationMethod,
      },
    };
  });
  return parseMockBank({ schemaVersion: 1, questions });
}
