import { getQuestionById } from "@/data/question-bank";
import type { GenerateQuizParams, Quiz } from "@/types";
import { getCandidatesForQuiz } from "@/lib/search/question-index";

function buildQuizFromSeed(seedId: string): Quiz | null {
  const seed = getQuestionById(seedId);
  if (!seed) return null;

  // Placeholder quiz — Phase 3 will replace with AI generation
  const quizTemplates: Record<string, Partial<Quiz>> = {
    "two-sum": {
      description:
        "Given an array of integers `nums` and an integer `target`, return indices of the two numbers such that they add up to `target`.",
      examples: [
        {
          input: "nums = [2,7,11,15], target = 9",
          output: "[0,1]",
          explanation: "Because nums[0] + nums[1] == 9, we return [0, 1].",
        },
      ],
      constraints: [
        "2 <= nums.length <= 10^4",
        "-10^9 <= nums[i] <= 10^9",
        "Only one valid answer exists.",
      ],
      starterCode: `function twoSum(nums, target) {
  // Write your code here
}`,
      testCases: [
        { input: "[[2,7,11,15], 9]", expected: "[0,1]", hidden: false },
        { input: "[[3,2,4], 6]", expected: "[1,2]", hidden: false },
        { input: "[[3,3], 6]", expected: "[0,1]", hidden: true },
      ],
    },
  };

  const template = quizTemplates[seedId] ?? {
    description: `Solve the "${seed.title}" problem.`,
    examples: [],
    constraints: [],
    starterCode: `function solution(input) {
  // Write your code here
}`,
    testCases: [],
  };

  return {
    id: seed.id,
    title: seed.title,
    category: seed.category,
    difficulty: seed.difficulty,
    description: template.description ?? "",
    examples: template.examples ?? [],
    constraints: template.constraints ?? [],
    starterCode: template.starterCode ?? "",
    testCases: template.testCases ?? [],
  };
}

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
  const quiz = buildQuizFromSeed(seed.id);

  if (!quiz) {
    throw new Error(`Failed to build quiz from seed: ${seed.id}`);
  }

  return quiz;
}

export async function getNextQuiz(params: GenerateQuizParams): Promise<Quiz> {
  return generateQuiz(params);
}
