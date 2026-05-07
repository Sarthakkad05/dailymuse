import "server-only";
import { OpenAIEmbeddings } from "@langchain/openai";
import { ChatOpenAI } from "@langchain/openai";


export const embeddingModel = new OpenAIEmbeddings({
  model: "text-embedding-3-small", 
  apiKey: process.env.OPENAI_API_KEY!,
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

