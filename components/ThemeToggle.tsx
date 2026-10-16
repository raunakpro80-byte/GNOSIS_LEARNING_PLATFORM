"use client";
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
export default function ThemeToggle() {
  const [dark, setDark] = useState(false);
  const [message, setMessage] = useState("");
  useEffect(() => {
    setDark(document.documentElement.dataset.theme === "dark");
    const sync = (event: StorageEvent) => {
      if (event.key === "gnosis:theme") {
        const value = event.newValue === "dark";
        document.documentElement.dataset.theme = value ? "dark" : "light";
        setDark(value);
      }
    };
    window.addEventListener("storage", sync);
    return () => window.removeEventListener("storage", sync);
  }, []);
  return (
    <div className="theme-control">
      <button
        type="button"
        className="theme-toggle"
        aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
        aria-pressed={dark}
        onClick={() => {
          const next = !dark;
          document.documentElement.dataset.theme = next ? "dark" : "light";
          setDark(next);
          try {
            localStorage.setItem("gnosis:theme", next ? "dark" : "light");
            setMessage("");
          } catch {
            setMessage(
              "Theme changed for this visit. Browser storage is unavailable.",
            );
          }
        }}
      >
        {dark ? <Sun size={17} /> : <Moon size={17} />}
        <span>{dark ? "Light mode" : "Dark mode"}</span>
      </button>
      {message && (
        <span className="theme-message" role="status">
          {message}
        </span>
      )}
    </div>
  );
}
