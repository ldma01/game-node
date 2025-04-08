import { GameAgent } from "@virtuals-protocol/game";
import type { GameAgentConfig } from "@virtuals-protocol/game";

// 🐯 Extend GameAgent with our custom tool runner
export class BaseAgent extends GameAgent {
  constructor(apiKey: string, config: GameAgentConfig) {
    super(apiKey, config);

    // ✅ Ensure tools are accessible for runTool()
    this.tools = config.tools ?? [];
  }

  async runTool(toolName: string, input: any) {
    console.log("[runTool] Looking for tool:", toolName);
    console.log("[runTool] Available tools:", this.tools);
    console.log("[runTool] Agent keys:", Object.keys(this));
  
    const tool = this.tools.find((t) => t.name === toolName);
  
    if (!tool || typeof tool.executable !== "function") {
      throw new Error(`Tool "${toolName}" not found or not executable`);
    }
    console.log("[runTool] Full tool:", JSON.stringify(tool, null, 2));
    console.log("[runTool] typeof tool.execute:", typeof (tool as any).execute);
    
    return await tool.execute(input);
  }
  
  
  
}
