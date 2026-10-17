"use client";
import { useEffect, useRef, useState } from "react";
import { Play, ExternalLink, VideoOff } from "lucide-react";
import { clock } from "@/lib/learning";
type Player = {
  getCurrentTime: () => number;
  getPlayerState: () => number;
  seekTo: (t: number, a: boolean) => void;
  destroy: () => void;
};
declare global {
  interface Window {
    YT?: {
      Player: new (el: HTMLElement, options: Record<string, unknown>) => Player;
    };
    onYouTubeIframeAPIReady?: () => void;
  }
}
let apiPromise: Promise<void> | null = null;
function loadYouTube() {
  if (window.YT?.Player) return Promise.resolve();
  return (apiPromise ??= new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      apiPromise = null;
      reject(new Error("YouTube could not load."));
    }, 15000);
    const previous = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      previous?.();
      clearTimeout(timer);
      resolve();
    };
    const script = document.createElement("script");
    script.src = "https://www.youtube.com/iframe_api";
    script.onerror = () => {
      clearTimeout(timer);
      apiPromise = null;
      reject(new Error("YouTube connection failed."));
    };
    document.head.appendChild(script);
  }));
}
export default function Video({
  videoId,
  initial,
  seek,
  onTime,
  onStudySecond,
}: {
  videoId: string | null;
  initial: number;
  seek: { time: number; nonce: number } | null;
  onTime: (t: number) => void;
  onStudySecond?: () => void;
}) {
  const mount = useRef<HTMLDivElement>(null);
  const player = useRef<Player | null>(null);
  const callback = useRef(onTime);
  const studyCallback = useRef(onStudySecond);
  studyCallback.current = onStudySecond;
  const start = useRef(initial);
  const [error, setError] = useState("");
  const [started, setStarted] = useState(false);
  const [retry, setRetry] = useState(0);
  callback.current = onTime;
  useEffect(() => {
    if (!videoId || !started) return;
    let gone = false;
    let timer: ReturnType<typeof setInterval> | null = null;
    const target = document.createElement("div");
    mount.current?.appendChild(target);
    setError("");
    loadYouTube()
      .then(() => {
        if (gone || !window.YT) return;
        player.current = new window.YT.Player(target, {
          videoId,
          host: "https://www.youtube-nocookie.com",
          playerVars: {
            origin: location.origin,
            playsinline: 1,
            rel: 0,
            start: Math.max(0, Math.floor(start.current)),
          },
          events: {
            onReady: () => {
              player.current?.seekTo(start.current, true);
              timer = setInterval(() => {
                const p = player.current;
                if (p && p.getPlayerState() === 1) {
                  callback.current(p.getCurrentTime());
                  if (document.visibilityState === "visible")
                    studyCallback.current?.();
                }
              }, 1000);
            },
            onStateChange: () => {
              const p = player.current;
              if (p) callback.current(p.getCurrentTime());
            },
            onError: () =>
              setError(
                "This video cannot be embedded here. Continue with lesson notes, or open it on YouTube.",
              ),
          },
        });
      })
      .catch((e) => {
        if (!gone) setError(e.message);
      });
    return () => {
      gone = true;
      if (timer) clearInterval(timer);
      if (player.current) {
        callback.current(player.current.getCurrentTime() || 0);
        player.current.destroy();
        player.current = null;
      }
      target.remove();
    };
  }, [videoId, started, retry]);
  useEffect(() => {
    if (!seek) return;
    start.current = seek.time;
    player.current?.seekTo(seek.time, true);
    callback.current(seek.time);
  }, [seek]);
  if (!videoId)
    return (
      <div className="video-placeholder">
        <span className="eyebrow light">CURRENT ELECTRICITY · LESSON 01</span>
        <div className="circuit">
          <svg
            viewBox="0 0 440 170"
            role="img"
            aria-label="Circuit with a battery and a resistor"
          >
            <path d="M80 85V35H200l10-12 12 24 12-24 12 24 12-12h105v100H80V95" />
            <path d="M66 85h28M72 95h16" />
            <text x="300" y="75">
              R
            </text>
            <text x="48" y="125">
              V
            </text>
            <text x="160" y="122">
              I →
            </text>
          </svg>
        </div>
        <h2>
          Small equation.
          <br />
          Big understanding.
        </h2>
        <p className="light">
          No lesson video supplied yet. Start with the original notes below.
        </p>
        <span className="video-label">
          <VideoOff size={15} /> Topic-based demo · no timestamp mapping
        </span>
      </div>
    );
  return (
    <div>
      <div className="video-frame">
        {!started ? (
          <button className="video-cover" onClick={() => setStarted(true)}>
            <Play size={42} />
            <strong>Watch the lesson</strong>
            <span>Resume at {clock(initial)} · Loads YouTube</span>
          </button>
        ) : (
          <div ref={mount} />
        )}
      </div>
      {error && (
        <div className="notice error">
          {error}{" "}
          <button onClick={() => setRetry((r) => r + 1)}>Retry player</button>
        </div>
      )}
      <a
        className="small external"
        href={`https://www.youtube.com/watch?v=${videoId}${initial > 0 ? `&t=${Math.floor(initial)}s` : ""}`}
        target="_blank"
        rel="noreferrer"
      >
        Open on YouTube <ExternalLink size={13} />
      </a>
    </div>
  );
}
