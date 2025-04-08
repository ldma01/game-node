import { TigerUncleAgent } from "./TigerUncleAgent";

export const tigerUncle = new TigerUncleAgent(process.env.GAME_API_KEY!);

export async function runTigerUncle() {
  await tigerUncle.init();
  console.log("[Tiger Uncle] BaseAgent with runTool is active");
  await tigerUncle.run();
}

// ✅ Export type explicitly (outside function!)
export type { TigerUncleAgent };
