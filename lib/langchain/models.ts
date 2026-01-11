import "server-only";
import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import { ChatOpenAI } from "@langchain/openai";


export const embeddingModel = new GoogleGenerativeAIEmbeddings({
  model: "text-embedding-004",
  apiKey: process.env.GOOGLE_API_KEY!,
});

export const insightsModel = new ChatOpenAI({
  model: "gpt-4o-mini",
  temperature: 0.2,
  apiKey: process.env.OPENAI_API_KEY!,
});

export const museModel = new ChatOpenAI({
  model: "gpt-4o-mini",
  temperature: 0.4,
  apiKey: process.env.OPENAI_API_KEY!,
});

