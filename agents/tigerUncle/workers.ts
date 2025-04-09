import { GameWorker } from "@virtuals-protocol/game";
import { customEchoFunction, webSearchFunction } from "./functions"; // ✅ Import both

export const defaultWorker = new GameWorker({
  id: "tigerUncle-main-worker",
  name: "Tiger Uncle Core Worker",        // ✅ required
  description: "Main event loop for Tiger Uncle’s insight and tasks.", // ✅ required
  functions: [
    customEchoFunction,
    webSearchFunction
  ],
  getEnvironment: async () => {
    const query = "taoism and AI";
  
    console.log("[Worker] Auto-triggering webSearch on startup...");
  
    const result = await webSearchFunction.execute({ query });
  
    console.log("[Worker] Search Result:");
    console.log(result);
  
    return {
      time: new Date().toISOString()
    };
  }
  
  });
