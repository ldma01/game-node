declare module "@virtuals-protocol/game" {
  export class GameAgent {
    constructor(apiKey: string, config: GameAgentConfig);
    tools?: any[];
    runOnce?: () => Promise<void>;
    runTool?: (toolName: string, input: any) => Promise<any>;
  }

  export interface GameAgentConfig {
    name: string;
    goal: string;
    description: string;
    tools?: any[];
    workers?: any[];
    getAgentState?: () => Promise<any>;
  }
}
