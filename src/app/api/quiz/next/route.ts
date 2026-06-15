import { NextResponse } from "next/server";
import { getNextQuiz } from "@/lib/agent";
import { generateQuizParamsSchema } from "@/types/schemas";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const params = generateQuizParamsSchema.parse(body);
    const quiz = await getNextQuiz(params);
    return NextResponse.json(quiz);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Next quiz failed";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
