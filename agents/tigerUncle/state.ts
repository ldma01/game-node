import fs from "fs/promises";
import path from "path";

const statePath = path.resolve(__dirname, "data/state.json");

export const getAgentState = async () => {
  try {
    const data = await fs.readFile(statePath, "utf-8");
    return JSON.parse(data);
  } catch (err) {
    console.error("[Tiger Uncle] Failed to load memory:", err);
    return {
      presence: "Silent",
      garden: [],
      wisdom: "..."
    };
  }
};
