import { GameFunction } from "@virtuals-protocol/game";
import { z } from "zod";
import * as dotenv from "dotenv";
dotenv.config();

import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const webSearchFunction = new GameFunction({
  name: "webSearch",
  description: "Uses OpenAI to simulate a search engine response to a query.",
  inputSchema: z.object({
    query: z.string().describe("What you're searching for.")
  }),
  execute: async ({ query }) => {
    console.log("[WebSearch] Running execute with query:", query);  // ✅ DEBUG LOG

    try {
      const completion = await openai.chat.completions.create({
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content: "You are a poetic web search engine. Return a relevant, elegant summary of the top result for the query."
          },
          {
            role: "user",
            content: query
          }
        ],
        temperature: 0.7
      });

      return {
        feedback: `🌿 Web Insight: ${completion.choices[0].message.content}`
      };
    } catch (err) {
      console.error("[Web Search Error]", err);
      return {
        feedback: "Search failed."
      };
    }
  }
});
