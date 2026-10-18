"use client";
import { useEffect, useRef, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Minus,
  Plus,
  ExternalLink,
} from "lucide-react";
export default function PdfReader({
  url,
  targetPage = 1,
  requestId = 0,
}: {
  url: string;
  targetPage?: number;
  requestId?: number;
}) {
  const canvas = useRef<HTMLCanvasElement>(null);
  const [page, setPage] = useState(targetPage);
  const [pages, setPages] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [retry, setRetry] = useState(0);
  const documentRef = useRef<import("pdfjs-dist").PDFDocumentProxy | null>(
    null,
  );
  useEffect(() => {
    setPage(targetPage);
  }, [targetPage, requestId]);
  useEffect(() => {
    let gone = false;
    let doc: import("pdfjs-dist").PDFDocumentProxy | null = null;
    let task: import("pdfjs-dist").PDFDocumentLoadingTask | null = null;
    setLoading(true);
    setError("");
    import("pdfjs-dist")
      .then(async (pdf) => {
        pdf.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";
        task = pdf.getDocument({ url });
        doc = await task.promise;
        if (gone) {
          await doc.destroy();
          return;
        }
        documentRef.current = doc;
        setPages(doc.numPages);
        setPage((p) => Math.min(p, doc!.numPages));
        setLoading(false);
      })
      .catch(() => {
        if (!gone) {
          setError(
            "Could not load this PDF. Retry, or open the file directly.",
          );
          setLoading(false);
        }
      });
    return () => {
      gone = true;
      documentRef.current = null;
      void task?.destroy();
    };
  }, [url, retry]);
  useEffect(() => {
    if (loading || !documentRef.current) return;
    let cancelled = false;
    let render: import("pdfjs-dist").RenderTask | null = null;
    setError("");
    documentRef.current
      .getPage(page)
      .then((p) => {
        if (cancelled || !canvas.current) return;
        const viewport = p.getViewport({ scale: 1.2 * zoom });
        const el = canvas.current;
        el.width = viewport.width;
        el.height = viewport.height;
        render = p.render({ canvas: el, viewport });
        return render.promise;
      })
      .catch((e) => {
        if (!cancelled && e.name !== "RenderingCancelledException")
          setError(
            "Could not render this page. Try another page or open the PDF.",
          );
      });
    return () => {
      cancelled = true;
      render?.cancel();
    };
  }, [page, zoom, loading, url]);
  return (
    <div className="pdf-reader">
      <div className="pdf-tools">
        <button
          aria-label="Previous PDF page"
          disabled={page <= 1}
          onClick={() => setPage((p) => p - 1)}
        >
          <ChevronLeft size={16} />
        </button>
        <label>
          Page{" "}
          <input
            aria-label="PDF page number"
            type="number"
            min="1"
            max={pages || 1}
            value={page}
            onChange={(e) =>
              setPage(
                Math.min(pages || 1, Math.max(1, Number(e.target.value) || 1)),
              )
            }
          />{" "}
          / {pages || "–"}
        </label>
        <button
          aria-label="Next PDF page"
          disabled={page >= pages}
          onClick={() => setPage((p) => p + 1)}
        >
          <ChevronRight size={16} />
        </button>
        <button
          aria-label="Zoom out"
          disabled={zoom <= 0.6}
          onClick={() => setZoom((z) => Math.max(0.6, z - 0.2))}
        >
          <Minus size={15} />
        </button>
        <span>{Math.round(zoom * 100)}%</span>
        <button
          aria-label="Zoom in"
          disabled={zoom >= 2}
          onClick={() => setZoom((z) => Math.min(2, z + 0.2))}
        >
          <Plus size={15} />
        </button>
      </div>
      {loading && <p role="status">Loading PDF…</p>}
      {error && (
        <div className="notice error">
          {error}
          <button onClick={() => setRetry((r) => r + 1)}>Retry PDF</button>
        </div>
      )}
      <div className="pdf-canvas">
        <canvas
          ref={canvas}
          style={{ width: `${zoom * 100}%`, maxWidth: "none" }}
          aria-label={`PDF page ${page}`}
        />
      </div>
      <a
        className="small external"
        href={`${url}#page=${page}`}
        target="_blank"
        rel="noreferrer"
      >
        Open PDF <ExternalLink size={13} />
      </a>
    </div>
  );
}
