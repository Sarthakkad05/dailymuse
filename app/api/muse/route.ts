import "server-only";
import { NextResponse } from "next/server";
import { embeddingModel } from "@/lib/langchain/models";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { museModel } from "@/lib/langchain/models";

export async function POST(req: Request) {
  try {
    const { message, userId } = await req.json();

    if (!message || !userId) {
      return NextResponse.json(
        { error: "Missing data" },
        { status: 400 }
      );
    }

    const queryEmbedding = await embeddingModel.embedQuery(message);

    const { data: memories, error } =
      await supabaseAdmin.rpc("match_journal_memory", {
        query_embedding: queryEmbedding,
        match_count: 5,
        user_id: userId,
      });

    if (error) throw error;

    const memoryText = memories?.length
      ? memories
          .map(
            (m: any, i: number) =>
              `${i + 1}. ${m.short_summary}`
          )
          .join("\n")
      : "No relevant past journals found.";

      const prompt = `
      You are Muse — a calm, thoughtful, and emotionally supportive journaling companion.
      
      Tone & behavior:
      - Warm, human, and empathetic
      - Encouraging but never preachy
      - No diagnosis
      - No medical advice
      
      CONTENT STYLE (VERY IMPORTANT):
      - Respond in clean, well-formatted Markdown
      - Start with ONE clear **bold title**
      - Use **bold subtitles** for sections or steps
      - Highlight important ideas using **bold emphasis**
      - Use numbered lists when giving guidance
      - Keep paragraphs short (2–3 lines max)
      - Avoid walls of text
      - The response should feel rich, thoughtful, and complete — not brief
      
      STRUCTURE TO FOLLOW:
      1. **Bold title**
      2. Short empathetic introduction (2–3 lines)
      3. Numbered steps with **bold subtitles**
      4. Occasional reflective questions (not yes/no)
      5. A gentle, encouraging closing paragraph
      
      Relevant past journal summaries (context only):
      ${memoryText}
      
      User message:
      "${message}"
      
      Respond kindly, personally, and with emotional depth.
      `;
      
      

    const response = await museModel.invoke(prompt);

    return NextResponse.json({
      reply: response.content.toString(),
    });

  } catch (err) {
    console.error("Muse error:", err);
    return NextResponse.json(
      { error: "Muse failed" },
      { status: 500 }
    );
  }
}
