import type { GenerateQuizParams, Quiz } from "@/types";
import { getCandidatesForQuiz } from "@/lib/search/question-index";
import { generateQuizWithLlm } from "@/lib/llm";

export async function generateQuiz(params: GenerateQuizParams): Promise<Quiz> {
  const candidates = getCandidatesForQuiz(
    params.keywords,
    params.category,
    params.excludeIds ?? [],
  );

  if (candidates.length === 0) {
    throw new Error("No matching questions found for the current filters.");
  }

  const seed = candidates[0];
  return generateQuizWithLlm(seed, params);
}

export async function getNextQuiz(params: GenerateQuizParams): Promise<Quiz> {
  return generateQuiz(params);
}
