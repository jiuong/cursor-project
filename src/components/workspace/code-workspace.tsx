"use client";

import dynamic from "next/dynamic";
import { useSessionStore } from "@/store/session-store";
import { useCodeRunner } from "@/hooks";
import { TestResults } from "./test-results";

const MonacoEditor = dynamic(() => import("./monaco-editor"), {
  ssr: false,
  loading: () => (
    <div className="flex flex-1 items-center justify-center text-sm text-neutral-500">
      Loading editor…
    </div>
  ),
});

export function CodeWorkspace() {
  const quiz = useSessionStore((s) => s.currentQuiz);
  const isRunning = useSessionStore((s) => s.isRunning);
  const { runTests } = useCodeRunner();

  if (!quiz) {
    return (
      <div className="flex flex-1 items-center justify-center text-sm text-neutral-500">
        Code workspace will appear here once a quiz is loaded.
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col">
      <div className="flex shrink-0 items-center justify-between border-b border-[var(--border)] px-4 py-2">
        <span className="text-xs text-neutral-500">JavaScript</span>
        <button
          type="button"
          onClick={() => runTests()}
          disabled={isRunning}
          className="rounded-md bg-[var(--success)] px-4 py-1 text-sm font-medium text-white transition-opacity hover:opacity-90 disabled:opacity-50"
        >
          {isRunning ? "Running…" : "Run Tests"}
        </button>
      </div>

      <div className="flex-1 overflow-hidden">
        <MonacoEditor />
      </div>

      <TestResults />
    </div>
  );
}
