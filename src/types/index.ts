export type Difficulty = "Easy" | "Medium" | "Hard";

export type Category =
  | "Arrays & Hashing"
  | "Two Pointers"
  | "Sliding Window"
  | "Stack & Queue"
  | "Binary Search"
  | "Linked List"
  | "Trees & Graphs"
  | "Dynamic Programming"
  | "Greedy"
  | "Backtracking"
  | "Heap / Priority Queue"
  | "Math & Bit Manipulation";

export const CATEGORIES: Category[] = [
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
];

export interface QuestionSeed {
  id: string;
  title: string;
  category: Category;
  keywords: string[];
  difficulty: Difficulty;
  slug: string;
}

export interface QuizExample {
  input: string;
  output: string;
  explanation?: string;
}

export interface TestCase {
  input: string;
  expected: string;
  hidden: boolean;
}

export interface Quiz {
  id: string;
  title: string;
  category: Category;
  difficulty: Difficulty;
  description: string;
  examples: QuizExample[];
  constraints: string[];
  starterCode: string;
  testCases: TestCase[];
  solutionOutline?: string;
}

export interface TestResult {
  index: number;
  passed: boolean;
  input: string;
  expected: string;
  actual?: string;
  error?: string;
  hidden: boolean;
}

export interface RunResult {
  passed: boolean;
  results: TestResult[];
  runtimeMs?: number;
}

export interface SearchParams {
  keywords?: string;
  category?: Category | null;
  difficulty?: Difficulty;
  limit?: number;
}

export interface GenerateQuizParams {
  keywords?: string;
  category?: Category | null;
  difficulty?: Difficulty;
  excludeIds?: string[];
}

export interface RunCodeParams {
  code: string;
  language: string;
  testCases: TestCase[];
}
