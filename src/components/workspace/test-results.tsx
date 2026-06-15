"use client";

import { useSessionStore } from "@/store/session-store";

export function TestResults() {
  const results = useSessionStore((s) => s.testResults);
  const evaluation = useSessionStore((s) => s.evaluation);

  if (results.length === 0 && !evaluation) return null;

  const passed = results.filter((r) => r.passed).length;

  return (
    <div className="shrink-0 border-t border-[var(--border)] bg-[var(--panel-bg)]">
      <div className="flex items-center gap-3 px-4 py-2 text-sm">
        {results.length > 0 && (
          <span
            className={
              passed === results.length ? "text-[var(--success)]" : "text-[var(--danger)]"
            }
          >
            {passed}/{results.length} tests passed
          </span>
        )}
        {evaluation && (
          <span className={evaluation.passed ? "text-[var(--success)]" : "text-[var(--danger)]"}>
            LLM score: {evaluation.score}/100
          </span>
        )}
      </div>

      {evaluation && (
        <div className="space-y-2 border-b border-[var(--border)] px-4 pb-3 text-xs">
          <p className="text-neutral-300">{evaluation.feedback}</p>
          {evaluation.strengths.length > 0 && (
            <div>
              <p className="font-medium text-neutral-400">Strengths</p>
              <ul className="mt-1 list-inside list-disc text-neutral-400">
                {evaluation.strengths.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          )}
          {evaluation.improvements.length > 0 && (
            <div>
              <p className="font-medium text-neutral-400">Improvements</p>
              <ul className="mt-1 list-inside list-disc text-neutral-400">
                {evaluation.improvements.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          )}
          <p className="text-neutral-500">{evaluation.correctnessNotes}</p>
        </div>
      )}

      {results.length > 0 && (
        <div className="max-h-40 overflow-y-auto px-4 pb-3 pt-2">
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
      )}
    </div>
  );
}
