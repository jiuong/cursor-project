import type { Category, Difficulty, QuestionSeed } from "@/types";

export const questionBank: QuestionSeed[] = [
  {
    id: "two-sum",
    title: "Two Sum",
    category: "Arrays & Hashing",
    keywords: ["array", "hash map", "complement", "target"],
    difficulty: "Easy",
    slug: "two-sum",
  },
  {
    id: "valid-parentheses",
    title: "Valid Parentheses",
    category: "Stack & Queue",
    keywords: ["stack", "brackets", "parentheses", "matching"],
    difficulty: "Easy",
    slug: "valid-parentheses",
  },
  {
    id: "binary-search",
    title: "Binary Search",
    category: "Binary Search",
    keywords: ["sorted", "divide", "log n", "search"],
    difficulty: "Easy",
    slug: "binary-search",
  },
  {
    id: "reverse-linked-list",
    title: "Reverse Linked List",
    category: "Linked List",
    keywords: ["linked list", "pointer", "reverse", "iterative"],
    difficulty: "Easy",
    slug: "reverse-linked-list",
  },
  {
    id: "max-subarray",
    title: "Maximum Subarray",
    category: "Dynamic Programming",
    keywords: ["kadane", "subarray", "sum", "dp"],
    difficulty: "Medium",
    slug: "maximum-subarray",
  },
  {
    id: "longest-substring",
    title: "Longest Substring Without Repeating Characters",
    category: "Sliding Window",
    keywords: ["sliding window", "substring", "unique", "hash set"],
    difficulty: "Medium",
    slug: "longest-substring-without-repeating-characters",
  },
  {
    id: "merge-intervals",
    title: "Merge Intervals",
    category: "Greedy",
    keywords: ["intervals", "merge", "sort", "overlap"],
    difficulty: "Medium",
    slug: "merge-intervals",
  },
  {
    id: "number-of-islands",
    title: "Number of Islands",
    category: "Trees & Graphs",
    keywords: ["grid", "dfs", "bfs", "connected components"],
    difficulty: "Medium",
    slug: "number-of-islands",
  },
];

export function getQuestionById(id: string): QuestionSeed | undefined {
  return questionBank.find((q) => q.id === id);
}

export function getQuestionsByCategory(category: Category): QuestionSeed[] {
  return questionBank.filter((q) => q.category === category);
}

export function getQuestionsByDifficulty(difficulty: Difficulty): QuestionSeed[] {
  return questionBank.filter((q) => q.difficulty === difficulty);
}
