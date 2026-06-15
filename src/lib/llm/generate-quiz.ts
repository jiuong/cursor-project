import type { GenerateQuizParams, QuestionSeed, Quiz } from "@/types";
import { quizSchema } from "@/types/schemas";
import { chatCompletion, parseJsonResponse } from "./client";
import { buildQuizGenerationPrompt } from "./prompts";

export async function generateQuizWithLlm(
  seed: QuestionSeed,
  params: GenerateQuizParams,
): Promise<Quiz> {
  const { system, user } = buildQuizGenerationPrompt(
    seed,
    params.keywords,
    params.category,
  );

  const content = await chatCompletion(
    [
      { role: "system", content: system },
      { role: "user", content: user },
    ],
    { jsonMode: true },
  );

  const parsed = parseJsonResponse<Record<string, unknown>>(content);
  const quiz = quizSchema.parse({
    ...parsed,
    id: seed.id,
    category: params.category ?? seed.category,
    difficulty: params.difficulty ?? seed.difficulty,
  });

  return quiz;
}
