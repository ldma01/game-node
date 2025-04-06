import { GameWorker } from "@virtuals-protocol/game";
import { customEchoFunction, webSearchFunction } from "./functions"; // ✅ Import both

export const defaultWorker = new GameWorker({
  id: "tigerUncle-main-worker",
  functions: [
    customEchoFunction,
    webSearchFunction  // ✅ Register new tool here
  ],
  getEnvironment: async () => ({
    time: new Date().toISOString()
  }),
});
