"use client";

import { useSessionStore } from "@/store/session-store";

export function QuestionPanel() {
  const quiz = useSessionStore((s) => s.currentQuiz);
  const isGenerating = useSessionStore((s) => s.isGenerating);

  if (isGenerating) {
    return (
      <div className="flex h-full items-center justify-center p-8 text-sm text-neutral-500">
        Generating quiz…
      </div>
    );
  }

  if (!quiz) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-2 p-8 text-center">
        <p className="text-sm text-neutral-400">
          Search for a topic or select a category to get started.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      <header>
        <div className="mb-1 flex items-center gap-2">
          <span className="rounded px-2 py-0.5 text-xs font-medium bg-neutral-800 text-neutral-300">
            {quiz.difficulty}
          </span>
          <span className="text-xs text-neutral-500">{quiz.category}</span>
        </div>
        <h2 className="text-xl font-semibold">{quiz.title}</h2>
      </header>

      <section>
        <p className="whitespace-pre-wrap text-sm leading-relaxed text-neutral-300">
          {quiz.description}
        </p>
      </section>

      {quiz.examples.length > 0 && (
        <section>
          <h3 className="mb-3 text-sm font-medium">Examples</h3>
          <div className="space-y-4">
            {quiz.examples.map((ex, i) => (
              <div
                key={i}
                className="rounded-md border border-[var(--border)] bg-[var(--background)] p-4 text-sm"
              >
                <p>
                  <span className="text-neutral-500">Input: </span>
                  {ex.input}
                </p>
                <p className="mt-1">
                  <span className="text-neutral-500">Output: </span>
                  {ex.output}
                </p>
                {ex.explanation && (
                  <p className="mt-2 text-neutral-400">{ex.explanation}</p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {quiz.constraints.length > 0 && (
        <section>
          <h3 className="mb-2 text-sm font-medium">Constraints</h3>
          <ul className="list-inside list-disc space-y-1 text-sm text-neutral-400">
            {quiz.constraints.map((c, i) => (
              <li key={i}>{c}</li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
