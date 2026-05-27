import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Fetch entries count
    const { count: entriesCount, error: countError } = await supabase
      .from("Journal")
      .select("*", { count: 'exact', head: true })
      .eq("user_id", user.id);

    if (countError) {
      console.error("Count error:", countError);
    }

    // Fetch dates for streak calculation
    const { data: datesData, error: datesError } = await supabase
      .from("Journal")
      .select("created_at")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    let streak = 0;
    if (!datesError && datesData && datesData.length > 0) {
      const uniqueDates = Array.from(new Set(datesData.map(d => {
        const date = new Date(d.created_at);
        return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
      })));

      const today = new Date();
      const todayStr = `${today.getFullYear()}-${today.getMonth()}-${today.getDate()}`;
      
      const yesterday = new Date(today);
      yesterday.setDate(yesterday.getDate() - 1);
      const yesterdayStr = `${yesterday.getFullYear()}-${yesterday.getMonth()}-${yesterday.getDate()}`;

      let currentDateStr = todayStr;
      if (!uniqueDates.includes(todayStr) && uniqueDates.includes(yesterdayStr)) {
          currentDateStr = yesterdayStr;
      }
      
      if (uniqueDates.includes(currentDateStr)) {
          let currentStreak = 0;
          const checkDate = new Date();
          if (currentDateStr === yesterdayStr) {
              checkDate.setDate(checkDate.getDate() - 1);
          }
          
          while (true) {
              const checkStr = `${checkDate.getFullYear()}-${checkDate.getMonth()}-${checkDate.getDate()}`;
              if (uniqueDates.includes(checkStr)) {
                  currentStreak++;
                  checkDate.setDate(checkDate.getDate() - 1);
              } else {
                  break;
              }
          }
          streak = currentStreak;
      }
    }

    // Fetch latest insight
    const { data: insightData } = await supabase
      .from("Journal")
      .select("ai_insight")
      .eq("user_id", user.id)
      .not("ai_insight", "is", null)
      .order("created_at", { ascending: false })
      .limit(1)
      .single();

    const latestInsight = insightData?.ai_insight || "Write your first entry to get an AI insight on your mood and patterns.";

    // Fetch most recent entry
    const { data: recentEntryData } = await supabase
      .from("Journal")
      .select("content, created_at")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })
      .limit(1)
      .single();

    return NextResponse.json({
      entriesCount: entriesCount || 0,
      streak,
      latestInsight,
      recentEntry: recentEntryData || null
    });
  } catch (error) {
    console.error("Dashboard API Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
