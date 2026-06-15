"use client";

import { useCallback } from "react";
import { useSessionStore } from "@/store/session-store";
import type { GenerateQuizParams, Quiz } from "@/types";

export function useQuizActions() {
  const {
    keywords,
    category,
    seenQuizIds,
    setCurrentQuiz,
    addSeenQuizId,
    setEditorCode,
    setTestResults,
    setIsGenerating,
  } = useSessionStore();

  const generateQuiz = useCallback(
    async (params?: Partial<GenerateQuizParams>) => {
      setIsGenerating(true);
      setTestResults([]);

      try {
        const res = await fetch("/api/quiz/generate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            keywords: params?.keywords ?? keywords,
            category: params?.category ?? category,
            difficulty: params?.difficulty,
            excludeIds: params?.excludeIds ?? seenQuizIds,
          }),
        });

        if (!res.ok) throw new Error("Failed to generate quiz");

        const quiz: Quiz = await res.json();
        setCurrentQuiz(quiz);
        addSeenQuizId(quiz.id);
        setEditorCode(quiz.starterCode);
        return quiz;
      } finally {
        setIsGenerating(false);
      }
    },
    [
      keywords,
      category,
      seenQuizIds,
      setCurrentQuiz,
      addSeenQuizId,
      setEditorCode,
      setTestResults,
      setIsGenerating,
    ],
  );

  const nextQuiz = useCallback(async () => {
    return generateQuiz({ excludeIds: seenQuizIds });
  }, [generateQuiz, seenQuizIds]);

  return { generateQuiz, nextQuiz };
}
