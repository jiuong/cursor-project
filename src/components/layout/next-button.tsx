"use client";

import { useQuizActions } from "@/hooks";
import { useSessionStore } from "@/store/session-store";

export function NextButton() {
  const { nextQuiz } = useQuizActions();
  const isGenerating = useSessionStore((s) => s.isGenerating);

  return (
    <button
      type="button"
      onClick={() => nextQuiz()}
      disabled={isGenerating}
      className="rounded-md bg-[var(--accent)] px-4 py-1.5 text-sm font-medium text-white transition-opacity hover:opacity-90 disabled:opacity-50"
    >
      {isGenerating ? "Loading…" : "Next"}
    </button>
  );
}
