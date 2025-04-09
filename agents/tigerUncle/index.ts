import { TigerUncleAgent } from "./TigerUncleAgent";

export const tigerUncle = new TigerUncleAgent(process.env.GAME_API_KEY!);

export async function runTigerUncle() {
  
  await tigerUncle.run();              // ✅ Start runtime loop
}
