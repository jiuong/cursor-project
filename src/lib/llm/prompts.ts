import type { QuestionSeed, Quiz, TestResult } from "@/types";

export function buildQuizGenerationPrompt(
  seed: QuestionSeed,
  keywords?: string,
  category?: string | null,
): ChatPromptPair {
  const system = `You are an expert algorithm instructor. Generate coding quiz problems as strict JSON.
Return ONLY a JSON object with these fields:
- id (string, use seed id)
- title (string)
- category (string, one of the standard DSA categories)
- difficulty ("Easy" | "Medium" | "Hard")
- description (string, clear problem statement in markdown-friendly plain text)
- examples (array of { input, output, explanation? })
- constraints (string array)
- starterCode (JavaScript function stub)
- testCases (array of { input, expected, hidden } — input/expected as JSON strings)
- solutionOutline (optional string, high-level approach without full code)

Test case inputs must be valid JSON strings the runner can parse, e.g. "[[2,7,11,15], 9]".
Starter code must define a named function matching the problem (e.g. twoSum, solution).`;

  const user = `Create an algorithm quiz based on this seed:
- id: ${seed.id}
- title: ${seed.title}
- category: ${category || seed.category}
- difficulty: ${seed.difficulty}
- keywords: ${seed.keywords.join(", ")}
${keywords ? `- user search keywords: ${keywords}` : ""}

Vary wording slightly from classic LeetCode versions while keeping the same core algorithm.`;

  return { system, user };
}

export function buildAnswerEvaluationPrompt(
  quiz: Quiz,
  code: string,
  testResults: TestResult[],
): ChatPromptPair {
  const system = `You are an expert coding interviewer evaluating a JavaScript solution.
Return ONLY a JSON object with:
- passed (boolean, true if the solution is correct and reasonably implemented)
- score (number 0-100)
- feedback (string, concise overall assessment)
- strengths (string array)
- improvements (string array)
- correctnessNotes (string, explain test pass/fail and algorithm correctness)`;

  const user = `Evaluate this submission.

## Problem
Title: ${quiz.title}
Category: ${quiz.category}
Difficulty: ${quiz.difficulty}

${quiz.description}

## Constraints
${quiz.constraints.map((c) => `- ${c}`).join("\n")}

## User Code
\`\`\`javascript
${code}
\`\`\`

## Automated Test Results
${testResults
  .map(
    (r) =>
      `Case ${r.index + 1}: ${r.passed ? "PASS" : "FAIL"} | input=${r.input} | expected=${r.expected}${r.actual ? ` | actual=${r.actual}` : ""}${r.error ? ` | error=${r.error}` : ""}`,
  )
  .join("\n")}`;

  return { system, user };
}

interface ChatPromptPair {
  system: string;
  user: string;
}
