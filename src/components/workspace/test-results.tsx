"use client";

import { useSessionStore } from "@/store/session-store";

export function TestResults() {
  const results = useSessionStore((s) => s.testResults);

  if (results.length === 0) return null;

  const passed = results.filter((r) => r.passed).length;

  return (
    <div className="shrink-0 border-t border-[var(--border)] bg-[var(--panel-bg)]">
      <div className="flex items-center gap-2 px-4 py-2 text-sm">
        <span
          className={
            passed === results.length ? "text-[var(--success)]" : "text-[var(--danger)]"
          }
        >
          {passed}/{results.length} passed
        </span>
      </div>
      <div className="max-h-40 overflow-y-auto px-4 pb-3">
        {results.map((r) => (
          <div
            key={r.index}
            className="mb-2 rounded border border-[var(--border)] p-2 text-xs"
          >
            <div className="flex items-center gap-2">
              <span
                className={
                  r.passed ? "text-[var(--success)]" : "text-[var(--danger)]"
                }
              >
                {r.passed ? "PASS" : "FAIL"}
              </span>
              <span className="text-neutral-500">
                Case {r.index + 1}
                {r.hidden ? " (hidden)" : ""}
              </span>
            </div>
            {!r.passed && !r.hidden && (
              <div className="mt-1 space-y-0.5 text-neutral-400">
                <p>Expected: {r.expected}</p>
                {r.actual && <p>Got: {r.actual}</p>}
                {r.error && <p>Error: {r.error}</p>}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
