import * as dotenv from "dotenv";
dotenv.config(); // ✅ Load .env file when run via tsx

import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function searchWeb(query: string): Promise<string> {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo", // or process.env.OPENAI_MODEL
      messages: [
        {
          role: "system",
          content: "You are a search engine. Given a query, return the most relevant web-style result summary like a search snippet. Be concise."
        },
        {
          role: "user",
          content: query
        }
      ],
      temperature: 0.7,
    });

    return completion.choices[0].message.content ?? "No response.";
  } catch (err) {
    console.error("[GPT Web Search Error]", err);
    return "Search failed.";
  }
}
