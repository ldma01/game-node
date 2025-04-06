import {
    GameFunction,
    ExecutableGameFunctionResponse,
    ExecutableGameFunctionStatus,
  } from "@virtuals-protocol/game";
  
  export const customEchoFunction = new GameFunction({
    name: "echo_poetry",
    description: "Echoes back a poetic line",
    args: [{ name: "line", type: "string", description: "Poetic line to reflect" }] as const,
    executable: async (args) => {
      return new ExecutableGameFunctionResponse(
        ExecutableGameFunctionStatus.Done,
        `🌿 Echo: "${args.line}"`
      );
    },
  });

  import { searchWeb } from "./plugins/web-search";

export const webSearchFunction = new GameFunction({
  name: "web_search",
  description: "Searches the web for information related to a query.",
  args: [{ name: "query", type: "string" }] as const,
  executable: async ({ query }) => {
    const result = await searchWeb(query);
    return new ExecutableGameFunctionResponse(
      ExecutableGameFunctionStatus.Done,
      `📡 Web Insight: ${result}`
    );
  }
});
