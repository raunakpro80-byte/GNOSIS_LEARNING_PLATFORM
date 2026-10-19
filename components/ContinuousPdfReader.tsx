"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import type { PDFDocumentProxy, RenderTask } from "pdfjs-dist";
import {
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Minus,
  Plus,
} from "lucide-react";

function PdfPage({
  document,
  number,
  root,
  width,
  zoom,
}: {
  document: PDFDocumentProxy;
  number: number;
  root: HTMLDivElement;
  width: number;
  zoom: number;
}) {
  const holder = useRef<HTMLElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const [nearby, setNearby] = useState(false);
  const [ratio, setRatio] = useState(1 / Math.SQRT2);
  const [error, setError] = useState(false);
  const [ready, setReady] = useState(false);
  const [retry, setRetry] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setNearby(entry.isIntersecting),
      {
        root,
        rootMargin: "800px 0px",
      },
    );
    if (holder.current) observer.observe(holder.current);
    return () => observer.disconnect();
  }, [root]);

  useEffect(() => {
    if (!nearby || !canvas.current || !width) return;
    let cancelled = false;
    let render: RenderTask | undefined;
    setReady(false);
    setError(false);
    document
      .getPage(number)
      .then(async (page) => {
        if (cancelled || !canvas.current) return;
        const base = page.getViewport({ scale: 1 });
        setRatio(base.width / base.height);
        const density = Math.min(window.devicePixelRatio || 1, 2);
        const viewport = page.getViewport({
          scale: (width * zoom * density) / base.width,
        });
        const element = canvas.current;
        element.width = Math.ceil(viewport.width);
        element.height = Math.ceil(viewport.height);
        render = page.render({ canvas: element, viewport });
        await render.promise;
        if (!cancelled) setReady(true);
      })
      .catch((error: unknown) => {
        if (
          !cancelled &&
          !(
            error instanceof Error &&
            error.name === "RenderingCancelledException"
          )
        )
          setError(true);
      });
    return () => {
      cancelled = true;
      render?.cancel();
    };
  }, [document, number, nearby, width, zoom, retry]);

  return (
    <figure
      ref={holder}
      className="pdf-scroll-page"
      data-pdf-page={number}
      style={{ width: `${zoom * 100}%`, aspectRatio: ratio }}
      aria-label={`PDF page ${number}`}
    >
      {nearby && (
        <canvas
          ref={canvas}
          aria-label={`PDF page ${number} content`}
          style={{ visibility: ready ? "visible" : "hidden" }}
        />
      )}
      {(!nearby || !ready) && (
        <div className="pdf-page-placeholder">
          {error ? (
            <>
              <p>Could not render page {number}.</p>
              <button onClick={() => setRetry((value) => value + 1)}>
                Retry page
              </button>
            </>
          ) : (
            <span>
              Page {number}
              {nearby ? " · Loading…" : ""}
            </span>
          )}
        </div>
      )}
      <figcaption>Page {number}</figcaption>
    </figure>
  );
}

export default function ContinuousPdfReader({ url }: { url: string }) {
  const readingPage = useRef(1);
  const [document, setDocument] = useState<PDFDocumentProxy | null>(null);
  const [root, setRoot] = useState<HTMLDivElement | null>(null);
  const [page, setPage] = useState(1);
  const [zoom, setZoom] = useState(1);
  const [width, setWidth] = useState(0);
  const [error, setError] = useState(false);
  const [retry, setRetry] = useState(0);

  useEffect(() => {
    let gone = false;
    let task: ReturnType<typeof import("pdfjs-dist").getDocument> | undefined;
    setDocument(null);
    setError(false);
    setPage(1);
    readingPage.current = 1;
    import("pdfjs-dist")
      .then(async (pdf) => {
        if (gone) return;
        pdf.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";
        task = pdf.getDocument({ url });
        const loaded = await task.promise;
        if (!gone) setDocument(loaded);
      })
      .catch(() => {
        if (!gone) setError(true);
      });
    return () => {
      gone = true;
      void task?.destroy();
    };
  }, [url, retry]);

  useEffect(() => {
    if (!root) return;
    const measure = () => setWidth(Math.max(0, root.clientWidth - 24));
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(root);
    return () => observer.disconnect();
  }, [root]);

  useLayoutEffect(() => {
    jump(readingPage.current);
  }, [zoom, width, document, root]);

  function jump(value: number) {
    if (!root || !document) return;
    const next = Math.max(1, Math.min(document.numPages, value || 1));
    const element = root.querySelector<HTMLElement>(
      `[data-pdf-page="${next}"]`,
    );
    if (element)
      root.scrollTo({
        top:
          root.scrollTop +
          element.getBoundingClientRect().top -
          root.getBoundingClientRect().top -
          12,
      });
    setPage(next);
    readingPage.current = next;
  }

  function updatePage() {
    if (!root) return;
    const top = root.getBoundingClientRect().top + 12;
    const visible = Array.from(
      root.querySelectorAll<HTMLElement>("[data-pdf-page]"),
    ).find((element) => element.getBoundingClientRect().bottom > top + 24);
    if (visible) {
      const next = Number(visible.dataset.pdfPage);
      readingPage.current = next;
      setPage(next);
    }
  }

  return (
    <div className="pdf-reader pdf-continuous">
      <p className="pdf-scroll-hint">
        Scroll or swipe up to keep reading. No page-by-page clicking needed.
      </p>
      <div className="pdf-tools" role="group" aria-label="PDF reading controls">
        <button
          aria-label="Previous PDF page"
          disabled={!document || page <= 1}
          onClick={() => jump(page - 1)}
        >
          <ChevronLeft size={16} />
        </button>
        <label>
          Page{" "}
          <input
            aria-label="PDF page number"
            type="number"
            min={1}
            max={document?.numPages || 1}
            value={page}
            disabled={!document}
            onChange={(event) => jump(Number(event.target.value))}
          />{" "}
          / {document?.numPages || "–"}
        </label>
        <button
          aria-label="Next PDF page"
          disabled={!document || page >= document.numPages}
          onClick={() => jump(page + 1)}
        >
          <ChevronRight size={16} />
        </button>
        <button
          aria-label="Zoom out"
          disabled={zoom <= 0.6}
          onClick={() =>
            setZoom((value) =>
              Math.max(0.6, Math.round((value - 0.2) * 10) / 10),
            )
          }
        >
          <Minus size={15} />
        </button>
        <span>{Math.round(zoom * 100)}%</span>
        <button
          aria-label="Zoom in"
          disabled={zoom >= 2}
          onClick={() =>
            setZoom((value) => Math.min(2, Math.round((value + 0.2) * 10) / 10))
          }
        >
          <Plus size={15} />
        </button>
      </div>
      {!document && !error && <p role="status">Loading PDF…</p>}
      {error && (
        <div className="notice error" role="alert">
          Could not load this PDF.{" "}
          <button onClick={() => setRetry((value) => value + 1)}>
            Retry PDF
          </button>{" "}
          or open the original file below.
        </div>
      )}
      <div
        ref={setRoot}
        className="pdf-scroll-pages"
        role="region"
        aria-label="Scrollable PDF pages"
        tabIndex={0}
        onScroll={updatePage}
      >
        {document &&
          root &&
          Array.from({ length: document.numPages }, (_, index) => (
            <PdfPage
              key={index}
              document={document}
              number={index + 1}
              root={root}
              width={width}
              zoom={zoom}
            />
          ))}
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
