"use client";

import { useCallback, useEffect, useState } from "react";
import { useSessionStore } from "@/store/session-store";
import { useQuizActions } from "@/hooks";

export function SearchBar() {
  const keywords = useSessionStore((s) => s.keywords);
  const setKeywords = useSessionStore((s) => s.setKeywords);
  const { generateQuiz } = useQuizActions();
  const [localValue, setLocalValue] = useState(keywords);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (localValue !== keywords) {
        setKeywords(localValue);
      }
    }, 300);
    return () => clearTimeout(timer);
  }, [localValue, keywords, setKeywords]);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      setKeywords(localValue);
      generateQuiz({ keywords: localValue });
    },
    [localValue, setKeywords, generateQuiz],
  );

  return (
    <form onSubmit={handleSubmit} className="flex-1 max-w-md">
      <input
        type="search"
        value={localValue}
        onChange={(e) => setLocalValue(e.target.value)}
        placeholder="Search algorithms…"
        className="w-full rounded-md border border-[var(--border)] bg-[var(--background)] px-3 py-1.5 text-sm outline-none focus:border-[var(--accent)]"
      />
    </form>
  );
}
