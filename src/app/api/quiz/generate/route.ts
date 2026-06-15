import { NextResponse } from "next/server";
import { generateQuiz } from "@/lib/agent";
import { generateQuizParamsSchema } from "@/types/schemas";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const params = generateQuizParamsSchema.parse(body);
    const quiz = await generateQuiz(params);
    return NextResponse.json(quiz);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Quiz generation failed";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
