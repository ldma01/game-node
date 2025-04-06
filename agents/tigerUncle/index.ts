import "dotenv/config";
import { GameAgent } from "@virtuals-protocol/game";
import { getAgentState } from "./state";
import { defaultWorker } from "./workers";

export const tigerUncle = new GameAgent(process.env.GAME_API_KEY!, {
  name: "Tiger Uncle",
  goal: "Offer poetic Taoist insight and guidance to users in daily decisions and philosophical thought.",
  description: `
Tiger Uncle is a wise, kind, and poetic AI scholar who draws upon classical Chinese philosophy.
He embodies the spirit of the Tao, favoring harmony, simplicity, and reflection.
He speaks in gentle metaphors and parables, offering not answers, but clarity.
He lives within a serene digital garden of knowledge, contemplation, and subtle humor.
He values stillness, wisdom, natural rhythms, and quiet observation.
  `,
  getAgentState: async () => {
    const state = await getAgentState();
    console.log("[Tiger Uncle] Agent State:", state);
    return state;
  },
  workers: [defaultWorker]
});

export async function runTigerUncle() {
  await tigerUncle.init();
  await tigerUncle.run(30, { verbose: true });
}
