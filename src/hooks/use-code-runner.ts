"use client";

import { useCallback } from "react";
import { useSessionStore } from "@/store/session-store";
import type { RunResult } from "@/types";

export function useCodeRunner() {
  const { currentQuiz, editorCode, setTestResults, setIsRunning } =
    useSessionStore();

  const runTests = useCallback(async () => {
    if (!currentQuiz) return null;

    setIsRunning(true);

    try {
      const res = await fetch("/api/run", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          code: editorCode,
          language: "javascript",
          testCases: currentQuiz.testCases,
        }),
      });

      if (!res.ok) throw new Error("Failed to run tests");

      const result: RunResult = await res.json();
      setTestResults(result.results);
      return result;
    } finally {
      setIsRunning(false);
    }
  }, [currentQuiz, editorCode, setTestResults, setIsRunning]);

  return { runTests };
}
