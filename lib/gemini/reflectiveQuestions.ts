import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY!);

export const reflectiveQuestions = async (): Promise<string> => {
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-001" });

        const prompt = `
      You're a compassionate journaling coach. Create a **motivating and emotionally supportive** message for someone about to begin journaling.
      
      Output should include:
      - Then, **1 open-ended reflective question** that helps the user become more self-aware, mindful, or emotionally connected.
      
      Guidelines:
      - Avoid the words "journal", "write", or "writing".
      - Do NOT ask yes/no questions.
      - Make it personal, human, and heartful — like a gentle nudge from a caring friend.
      - Keep the total response under 3 sentences.
      - The question should be simple and easy to understand.
      - single question
      
      `;
      
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
      
        return text.trim();
    } catch (error: any) {
        console.error("Error fetching reflective question:", error.message)
        return "What's one thing you're grateful for right now?"
      }

};
