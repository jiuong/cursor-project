import { NextResponse } from "next/server";
import { runCode } from "@/lib/runner";
import { runCodeParamsSchema } from "@/types/schemas";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const params = runCodeParamsSchema.parse(body);
    const result = await runCode(params);
    return NextResponse.json(result);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Code execution failed";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
