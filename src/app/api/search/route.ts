import { NextResponse } from "next/server";
import { searchQuestions } from "@/lib/search";
import { searchParamsSchema } from "@/types/schemas";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const params = searchParamsSchema.parse(body);
    const results = searchQuestions(params);
    return NextResponse.json(results);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Search failed";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
