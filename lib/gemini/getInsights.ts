"use server"
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY!);

export const getGeminiInsight = async (content: string): Promise<string> => {
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-001" });

  const prompt = `
You're a personal growth and emotional wellness assistant. A user has just shared the following journal entry:

"""
${content}
"""

Based on this, generate a short but meaningful response that includes:
1. **Personalized Insight** — Reflect empathetically on the user's mindset or emotions. Help them see a meaningful perspective or pattern in what they've written. Keep it warm and personal (4–6 sentences).
3. **Detect mood** — According to the user's journal entry, detect the mood of the user.
2. **One Small Actionable Task** — Suggest a clear, simple action the user can take today to support their well-being or growth. Make it feel doable and tailored to their state of mind.
3. **Motivational Quote** — Share a quote that aligns with their current mindset or challenge. Keep it short and inspiring.

Keep the total output concise, around 120–180 words. Be emotionally supportive but never generic or robotic.
Use labels for each section like this:
- **Personalized Insight:**
- **Small Actionable Task:**
- **Motivational Quote:**
`;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();

  return text.trim();
};
