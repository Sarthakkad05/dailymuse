import "server-only";
import { NextResponse } from "next/server";
import { museModel } from "@/lib/langchain/models";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { buildReflectionContext } from "@/lib/functions/reflect";
import { reflectiveOpeningSystemPrompt, buildReflectiveOpeningUserPrompt} from "@/lib/prompts/prompt";

export async function POST(req: Request) {
  try {
    const { userId } = await req.json();

    if (!userId) {
      return NextResponse.json(
        { error: "Missing userId" },
        { status: 400 }
      );
    }
    const N_DAYS = 3;

    const cutoffDate = new Date(
      Date.now() - N_DAYS * 24 * 60 * 60 * 1000
    ).toISOString();
    
    const { data: journalIds, error: journalError } = await supabaseAdmin
      .from("Journal")
      .select("id")
      .eq("user_id", userId);
    
    if (journalError) throw journalError;
    
    const ids = journalIds.map((j) => j.id);
    
    const { data, error } = await supabaseAdmin
      .from("Journal_insights")
      .select(
        "primary_emotion, secondary_emotions, trigger, severity, short_summary, created_at"
      )
      .in("journal_id", ids)
      .gte("created_at", cutoffDate)
      .order("created_at", { ascending: false });
    
    if (error) throw error;

    const reflectionContext = buildReflectionContext(data);

    const systemPrompt = reflectiveOpeningSystemPrompt;
    const userPrompt = buildReflectiveOpeningUserPrompt(reflectionContext);


    const response = await museModel.invoke([
      { role: "system", content: systemPrompt },
      { role: "user", content: userPrompt },
    ]);

    return NextResponse.json({
      message: response.content.toString().trim(),
    });

  } catch (error) {
    console.error("Reflective route error:", error);

    return NextResponse.json({
      message:
        "Let’s take a moment to settle in and notice what’s quietly present.",
    });
  }
}
