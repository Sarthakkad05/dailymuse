import "server-only";
import { NextResponse } from "next/server";
import { StructuredOutputParser } from "@langchain/core/output_parsers";
import { z } from "zod";
import { embeddingModel } from "@/lib/langchain/models";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { insightsModel } from "@/lib/langchain/models";

const extractSchema = z.object({
  primary_emotion: z.string(),
  secondary_emotions: z.array(z.string()),
  trigger: z.string().nullable(),
  severity: z.number().min(1).max(10),
  short_summary: z.string().max(200),
});

const extractParser =
  StructuredOutputParser.fromZodSchema(extractSchema);

export async function POST(req: Request) {
  try {
    const { journalText, userId } = await req.json();

    if (!journalText || journalText.length < 10) {
      return NextResponse.json(
        { error: "Journal too short" },
        { status: 400 }
      );
    }

    if (!userId) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { data: journal, error } = await supabaseAdmin
      .from("Journal")
      .insert({
        content: journalText,
        user_id: userId, 
      })
      .select()
      .single();

    if (error) throw error;

    const insightPrompt = `
        You are DailyMuse, a calm and supportive journaling companion.
        Write a gentle reflective insight.
        No diagnosis. No medical advice.

        Journal:
        """
        ${journalText}
        """
      `;

    const insightResponse = await insightsModel.invoke(insightPrompt);
    const insightText = insightResponse.content.toString();

    await supabaseAdmin
      .from("Journal")
      .update({ ai_insight: insightText })
      .eq("id", journal.id);

    process.nextTick(async () => {
      try {
        const extractionPrompt = `
            You extract structured emotional data.

            ${extractParser.getFormatInstructions()}

            Journal:
            """
            ${journalText}
            """
          `;

        const extractionResponse = await insightsModel.invoke(extractionPrompt);
        const extracted = await extractParser.parse(
          extractionResponse.content as string
        );

        await supabaseAdmin
          .from("Journal_insights")
          .insert({
            journal_id: journal.id,
            primary_emotion: extracted.primary_emotion,
            secondary_emotions: extracted.secondary_emotions,
            trigger: extracted.trigger,
            severity: extracted.severity,
            short_summary: extracted.short_summary,
          });

        const embedding = await embeddingModel.embedQuery(
          extracted.short_summary
        );

        await supabaseAdmin
          .from("journal_memory")
          .insert({
            journal_id: journal.id,
            user_id: userId,
            embedding,
          });

      } catch (bgErr) {
        console.error("Background job failed:", bgErr);
      }
    });

    return NextResponse.json({
      insight: insightText,
    });

  } catch (err) {
    console.error("Journal API error:", err);
    return NextResponse.json(
      { error: "Failed to save journal" },
      { status: 500 }
    );
  }
}

export async function PUT(req: Request) {
  try {
    const { journalText, userId, journalId } = await req.json();

    if (!journalText || journalText.length < 10) {
      return NextResponse.json(
        { error: "Journal too short" },
        { status: 400 }
      );
    }

    if (!userId || !journalId) {
      return NextResponse.json(
        { error: "Unauthorized or missing journal ID" },
        { status: 401 }
      );
    }

    const { data: journal, error } = await supabaseAdmin
      .from("Journal")
      .update({
        content: journalText,
      })
      .eq("id", journalId)
      .eq("user_id", userId)
      .select()
      .single();

    if (error) throw error;

    const insightPrompt = `
        You are DailyMuse, a calm and supportive journaling companion.
        Write a gentle reflective insight.
        No diagnosis. No medical advice.

        Journal:
        """
        ${journalText}
        """
      `;

    const insightResponse = await insightsModel.invoke(insightPrompt);
    const insightText = insightResponse.content.toString();

    await supabaseAdmin
      .from("Journal")
      .update({ ai_insight: insightText })
      .eq("id", journal.id);

    process.nextTick(async () => {
      try {
        const extractionPrompt = `
            You extract structured emotional data.

            ${extractParser.getFormatInstructions()}

            Journal:
            """
            ${journalText}
            """
          `;

        const extractionResponse = await insightsModel.invoke(extractionPrompt);
        const extracted = await extractParser.parse(
          extractionResponse.content as string
        );

        // Update insights
        await supabaseAdmin
          .from("Journal_insights")
          .update({
            primary_emotion: extracted.primary_emotion,
            secondary_emotions: extracted.secondary_emotions,
            trigger: extracted.trigger,
            severity: extracted.severity,
            short_summary: extracted.short_summary,
          })
          .eq("journal_id", journal.id);

        const embedding = await embeddingModel.embedQuery(
          extracted.short_summary
        );

        // Update memory
        await supabaseAdmin
          .from("journal_memory")
          .update({
            embedding,
          })
          .eq("journal_id", journal.id);

      } catch (bgErr) {
        console.error("Background job failed:", bgErr);
      }
    });

    return NextResponse.json({
      insight: insightText,
    });

  } catch (err) {
    console.error("Journal PUT API error:", err);
    return NextResponse.json(
      { error: "Failed to update journal" },
      { status: 500 }
    );
  }
}
