"use client";

import { useCallback } from "react";
import { useSessionStore } from "@/store/session-store";
import type { RunResult } from "@/types";

export function useCodeRunner() {
  const { currentQuiz, editorCode, setTestResults, setEvaluation, setIsRunning } =
    useSessionStore();

  const runTests = useCallback(async () => {
    if (!currentQuiz) return null;

    setIsRunning(true);
    setEvaluation(null);

    try {
      const res = await fetch("/api/run", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          code: editorCode,
          language: "javascript",
          testCases: currentQuiz.testCases,
          quiz: currentQuiz,
        }),
      });

      if (!res.ok) throw new Error("Failed to run tests");

      const result: RunResult = await res.json();
      setTestResults(result.results);
      setEvaluation(result.evaluation ?? null);
      return result;
    } finally {
      setIsRunning(false);
    }
  }, [currentQuiz, editorCode, setTestResults, setEvaluation, setIsRunning]);

  return { runTests };
}
