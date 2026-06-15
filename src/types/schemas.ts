import { z } from "zod";

export const categorySchema = z.enum([
  "Arrays & Hashing",
  "Two Pointers",
  "Sliding Window",
  "Stack & Queue",
  "Binary Search",
  "Linked List",
  "Trees & Graphs",
  "Dynamic Programming",
  "Greedy",
  "Backtracking",
  "Heap / Priority Queue",
  "Math & Bit Manipulation",
]);

export const difficultySchema = z.enum(["Easy", "Medium", "Hard"]);

export const quizExampleSchema = z.object({
  input: z.string(),
  output: z.string(),
  explanation: z.string().optional(),
});

export const testCaseSchema = z.object({
  input: z.string(),
  expected: z.string(),
  hidden: z.boolean(),
});

export const quizSchema = z.object({
  id: z.string(),
  title: z.string(),
  category: categorySchema,
  difficulty: difficultySchema,
  description: z.string(),
  examples: z.array(quizExampleSchema),
  constraints: z.array(z.string()),
  starterCode: z.string(),
  testCases: z.array(testCaseSchema),
  solutionOutline: z.string().optional(),
});

export const searchParamsSchema = z.object({
  keywords: z.string().optional(),
  category: categorySchema.nullable().optional(),
  difficulty: difficultySchema.optional(),
  limit: z.number().int().positive().optional(),
});

export const generateQuizParamsSchema = z.object({
  keywords: z.string().optional(),
  category: categorySchema.nullable().optional(),
  difficulty: difficultySchema.optional(),
  excludeIds: z.array(z.string()).optional(),
});

export const runCodeParamsSchema = z.object({
  code: z.string(),
  language: z.string(),
  testCases: z.array(testCaseSchema),
});
