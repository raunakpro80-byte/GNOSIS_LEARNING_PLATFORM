import { identity, failure, HttpError, limit } from "@/lib/server";
import { parseTranscript, transcriptGaps } from "@/lib/learning";
export const runtime = "nodejs";
export async function POST(request: Request) {
  try {
    const { db, userId } = await identity(request, true);
    limit(`upload:${userId}`, 10);
    if (Number(request.headers.get("content-length")) > 11000000)
      throw new HttpError(413, "Maximum upload size is 10 MB.");
    const form = await request.formData();
    const file = form.get("file");
    if (!(file instanceof File) || file.size > 10000000 || file.size === 0)
      throw new HttpError(400, "Choose a nonempty file up to 10 MB.");
    const ext = file.name.split(".").at(-1)?.toLowerCase();
    if (["vtt", "srt", "json"].includes(ext ?? "")) {
      const segments = parseTranscript(await file.text());
      return Response.json({
        segments,
        gaps: transcriptGaps(segments),
        message:
          "Parsed; confirm mapping against the actual video before enabling synchronization.",
      });
    }
    if (ext !== "pdf")
      throw new HttpError(400, "Supported types: PDF, VTT, SRT, JSON.");
    const bytes = new Uint8Array(await file.arrayBuffer());
    if (new TextDecoder().decode(bytes.slice(0, 5)) !== "%PDF-")
      throw new HttpError(400, "Invalid PDF header.");
    const { getDocument } = await import("pdfjs-dist/legacy/build/pdf.mjs");
    const doc = await getDocument({ data: bytes.slice(), useSystemFonts: true })
      .promise;
    if (doc.numPages > 150) {
      await doc.destroy();
      throw new HttpError(
        400,
        "Split the PDF into chapters of up to 150 pages.",
      );
    }
    const excerpts = [];
    for (let page = 1; page <= doc.numPages; page++) {
      const p = await doc.getPage(page);
      const content = await p.getTextContent();
      const text = content.items
        .map((i) => ("str" in i ? i.str : ""))
        .join(" ")
        .trim();
      if (text)
        excerpts.push({ id: `pdf-${page}`, page, text: text.slice(0, 15000) });
    }
    await doc.destroy();
    if (!excerpts.length)
      throw new HttpError(
        422,
        "No readable text found. Run OCR on this PDF, then upload the searchable version.",
      );
    const path = `${userId}/${crypto.randomUUID()}.pdf`;
    const { error } = await db.storage
      .from("lesson-documents")
      .upload(path, bytes, { contentType: "application/pdf", upsert: false });
    if (error)
      throw new HttpError(
        503,
        "Upload failed. Check the private lesson-documents bucket and storage policies.",
      );
    return Response.json({ pdfUrl: `storage:${path}`, excerpts });
  } catch (e) {
    return failure(e);
  }
}
