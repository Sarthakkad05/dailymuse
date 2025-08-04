
import { GoogleGenerativeAI } from "@google/generative-ai"

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY!)



export const getGeminiInsight = async (content: string): Promise<string> => {
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-001" })

  const prompt = `
  You are a personal growth and wellness assistant , try to be more personal and empathetic. Here are recent journal entry:
  
${content}
  
  Generate:
  - A personalized insight
  - 1 small actionable tasks for today
  - 1 motivational quote
  - 1 reflective question

  `

  const result = await model.generateContent(prompt)
  const response = await result.response
  const text = response.text()

  return text
}


