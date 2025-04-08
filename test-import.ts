import { GameFunction } from "@virtuals-protocol/game";

const fn = new GameFunction({
  name: "testTool",
  description: "Just testing...",
  inputSchema: { }, // intentionally empty
  execute: async () => ({ result: "ok" })
});

