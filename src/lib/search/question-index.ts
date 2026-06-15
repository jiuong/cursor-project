import Fuse from "fuse.js";
import { questionBank } from "@/data/question-bank";
import type { Category, QuestionSeed, SearchParams } from "@/types";

const fuse = new Fuse(questionBank, {
  keys: ["title", "keywords", "slug", "category"],
  threshold: 0.4,
  includeScore: true,
});

export function searchQuestions(params: SearchParams): QuestionSeed[] {
  const { keywords, category, difficulty, limit = 10 } = params;

  let results: QuestionSeed[];

  if (keywords?.trim()) {
    const fuseResults = fuse.search(keywords.trim());
    results = fuseResults.map((r) => r.item);
  } else {
    results = [...questionBank];
  }

  if (category) {
    results = results.filter((q) => q.category === category);
  }

  if (difficulty) {
    results = results.filter((q) => q.difficulty === difficulty);
  }

  return results.slice(0, limit);
}

export function getCandidatesForQuiz(
  keywords?: string,
  category?: Category | null,
  excludeIds: string[] = [],
): QuestionSeed[] {
  const candidates = searchQuestions({
    keywords,
    category,
    limit: 10,
  });

  return candidates.filter((q) => !excludeIds.includes(q.id));
}
