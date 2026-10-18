"use client";
import { useEffect, useRef, useState } from "react";
import { Copy } from "lucide-react";
import { publicMockShareUrl } from "@/lib/public-mock-routes";

export default function ShareMockTest({ chapter }: { chapter: number }) {
  const [message, setMessage] = useState("");
  const [fallbackUrl, setFallbackUrl] = useState("");
  const [busy, setBusy] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
    },
    [],
  );
  async function share() {
    setBusy(true);
    if (timer.current) clearTimeout(timer.current);
    try {
      // Share only the canonical chapter page, never a guest attempt capability.
      const url = publicMockShareUrl(window.location.origin, chapter);
      try {
        await navigator.clipboard.writeText(url);
        setFallbackUrl(url);
        setMessage("Test link copied.");
        timer.current = setTimeout(() => setMessage(""), 3000);
      } catch {
        setFallbackUrl(url);
        setMessage("Copy the test link below.");
      }
    } finally {
      setBusy(false);
    }
  }
  return (
    <div>
      <button
        className="subtle-button"
        type="button"
        disabled={busy}
        onClick={share}
      >
        <Copy size={16} /> {busy ? "Copying…" : "Share Test"}
      </button>
      <p role="status" aria-live="polite" className="mock-storage-note">
        {message}
      </p>
      {fallbackUrl && (
        <label>
          Public test link
          <input
            readOnly
            value={fallbackUrl}
            onFocus={(event) => event.currentTarget.select()}
          />
        </label>
      )}
    </div>
  );
}
