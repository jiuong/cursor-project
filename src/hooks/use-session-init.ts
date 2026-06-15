"use client";

import { useEffect, useRef } from "react";
import { useSessionStore } from "@/store/session-store";

const SESSION_STORAGE_KEYS = [
  "coding-practice-keywords",
  "coding-practice-category",
  "coding-practice-seen-ids",
];

/**
 * Resets all session state on page mount (Req #6).
 * Clears Zustand store, sessionStorage, and aborts in-flight requests.
 */
export function useSessionInit() {
  const resetSession = useSessionStore((s) => s.resetSession);
  const abortControllerRef = useRef<AbortController | null>(null);

  useEffect(() => {
    resetSession();

    for (const key of SESSION_STORAGE_KEYS) {
      sessionStorage.removeItem(key);
    }

    abortControllerRef.current = new AbortController();

    return () => {
      abortControllerRef.current?.abort();
      abortControllerRef.current = null;
    };
  }, [resetSession]);

  return {
    getSignal: () => abortControllerRef.current?.signal,
  };
}
