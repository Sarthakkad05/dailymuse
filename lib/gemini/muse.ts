import { GoogleGenerativeAI } from "@google/generative-ai"
import { createClient } from "@/lib/supabase/client"

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY!)

export const getMuseReply = async (userMessage: string, userId: string): Promise<string> => {
  const supabase = createClient()


  const { data: { session } } = await supabase.auth.getSession()
  
  if (!session?.user) {
    throw new Error("User not authenticated")
  }

  // Fetch latest 5 journal entries for the user
  const { data: journals, error } = await supabase
    .from("Journal")
    .select("content")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
    .limit(5)

  if (error) {
    console.error("Error fetching journals:", error)
    return "Sorry, I couldn’t access your past entries. Try again later."
  }

  const recentJournals = journals?.map(j => `- ${j.content}`).join("\n") || "None"

  const context = `
You are Muse, a supportive mental health companion and journaling assistant.
Here are the user's 5 most recent journal entries:\n${recentJournals}

The user says: "${userMessage}"

Respond warmly and reflectively. Offer gentle suggestions if relevant. Avoid repeating what the user wrote.
`

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-001" })
    const result = await model.generateContent(context)
    const response = result.response
    return response.text().trim()
  } catch (err) {
    console.error("Muse reply error:", err)
    return "I'm having trouble thinking clearly right now. Try again in a few minutes."
  }
}
