import "server-only";
import { NextResponse } from "next/server";
import { museModel } from "@/lib/langchain/models";

export async function POST() {
  try {
    const prompt = `
You are a compassionate journaling coach.

Create a motivating and emotionally supportive message for someone about to begin reflecting.

Rules:
- Include EXACTLY ONE open-ended reflective question
- Avoid the words "journal", "write", or "writing"
- Do NOT ask yes/no questions
- Tone: warm, gentle, human, supportive
- Max 3 sentences total
- Single question only
`;

    const response = await museModel.invoke([
      {
        role: "system",
        content: "You help people reflect with kindness and clarity.",
      },
      {
        role: "user",
        content: prompt,
      },
    ]);

    return NextResponse.json({
      message: response.content.toString().trim(),
    });

  } catch (error) {
    console.error("Reflective route error:", error);
    return NextResponse.json({
      message:
        "What’s one small moment today that quietly influenced how you’re feeling right now?",
    });
  }
}
