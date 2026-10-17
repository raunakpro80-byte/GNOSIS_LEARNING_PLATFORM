"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { api, supabase } from "@/lib/client";
import { emptyState, type LearningState } from "@/lib/types";
import { stateSchema } from "@/lib/schema";
import { recordStudyActions } from "@/lib/streak";
import { normalizeProfile } from "@/lib/curriculum";
const KEY = "gnosis:demo:v1";
export function useLearning() {
  const [state, setState] = useState<LearningState>(emptyState);
  const [ready, setReady] = useState(false);
  const [user, setUser] = useState<string | null>(null);
  const [status, setStatus] = useState("Loading…");
  const [revision, setRevision] = useState(0);
  const current = useRef(state);
  const owner = useRef<string | null>(null);
  const loaded = useRef(false);
  const generation = useRef(0);
  useEffect(() => {
    let alive = true;
    async function load(id: string | null) {
      const g = ++generation.current;
      loaded.current = false;
      setReady(false);
      owner.current = id;
      setUser(id);
      try {
        const raw = id
          ? await api("/api/state")
          : JSON.parse(localStorage.getItem(KEY) ?? "null");
        const next = raw ? stateSchema.parse(raw) : emptyState();
        next.profile = normalizeProfile(next.profile);
        if (alive && g === generation.current) {
          current.current = next;
          setState(next);
          loaded.current = true;
          setReady(true);
          setStatus(id ? "Cloud saved" : "Saved on this device");
        }
      } catch (e) {
        if (alive && g === generation.current) {
          setStatus(e instanceof Error ? e.message : "Could not load");
          setReady(false);
        }
      }
    }
    const sb = supabase();
    if (sb) {
      sb.auth
        .getSession()
        .then(({ data }) => load(data.session?.user.id ?? null));
      const { data } = sb.auth.onAuthStateChange((event, session) => {
        if (event === "SIGNED_IN" || event === "SIGNED_OUT")
          setTimeout(() => {
            if (owner.current !== (session?.user.id ?? null))
              void load(session?.user.id ?? null);
          }, 0);
      });
      return () => {
        alive = false;
        data.subscription.unsubscribe();
      };
    }
    void load(null);
    return () => {
      alive = false;
    };
  }, []);
  const update = useCallback((fn: (s: LearningState) => LearningState) => {
    if (!loaded.current) return;
    const next = recordStudyActions(current.current, fn(current.current));
    if (next === current.current) return;
    next.profile = normalizeProfile(next.profile);
    current.current = next;
    setState(next);
    setStatus("Saving…");
    setRevision((r) => r + 1);
  }, []);
  const pending = useRef<Promise<void>>(Promise.resolve());
  const save = useCallback(async () => {
    if (!loaded.current) return;
    const id = owner.current;
    const snapshot = current.current;
    const g = generation.current;
    const write = async () => {
      if (g !== generation.current) return;
      try {
        if (id)
          await api("/api/state", {
            method: "PUT",
            headers: { "x-gnosis-owner": id },
            body: JSON.stringify(snapshot),
            keepalive: true,
          });
        else localStorage.setItem(KEY, JSON.stringify(snapshot));
        if (id === owner.current && snapshot === current.current)
          setStatus(id ? "Cloud saved" : "Saved on this device");
      } catch (e) {
        if (id === owner.current)
          setStatus(e instanceof Error ? e.message : "Could not save");
      }
    };
    pending.current = pending.current.then(write, write);
    await pending.current;
  }, []);
  useEffect(() => {
    if (!ready || !revision) return;
    const timer = setTimeout(() => void save(), 600);
    return () => clearTimeout(timer);
  }, [state, ready, revision, save]);
  useEffect(() => {
    const flush = () => {
      if (document.visibilityState === "hidden")
        queueMicrotask(() => void save());
    };
    const leave = () => queueMicrotask(() => void save());
    document.addEventListener("visibilitychange", flush);
    window.addEventListener("pagehide", leave);
    return () => {
      document.removeEventListener("visibilitychange", flush);
      window.removeEventListener("pagehide", leave);
    };
  }, [save]);
  return { state, update, ready, user, status, save };
}
