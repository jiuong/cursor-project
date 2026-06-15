import type { EvaluationResult, Quiz, TestResult } from "@/types";
import { evaluationResultSchema } from "@/types/schemas";
import { chatCompletion, parseJsonResponse } from "./client";
import { buildAnswerEvaluationPrompt } from "./prompts";

export async function evaluateAnswerWithLlm(
  quiz: Quiz,
  code: string,
  testResults: TestResult[],
): Promise<EvaluationResult> {
  const { system, user } = buildAnswerEvaluationPrompt(quiz, code, testResults);

  const content = await chatCompletion(
    [
      { role: "system", content: system },
      { role: "user", content: user },
    ],
    { jsonMode: true },
  );

  const parsed = parseJsonResponse<Record<string, unknown>>(content);
  const evaluation = evaluationResultSchema.parse(parsed);

  return {
    ...evaluation,
    testResults,
  };
}
