import express from "express";
import { tigerUncle } from "./index";

const app = express();
const PORT = 3000;

app.use(express.json());

// 🧠 GET agent state
app.get("/api/state", async (_req, res) => {
  const state = await tigerUncle.getAgentState();
  res.json(state);
});

// 🌐 Web search tool — FIXED name to "webSearch"
app.get("/api/search", async (req, res) => {
  const query = req.query.q as string;

  if (!query) {
    return res.status(400).json({ error: "Missing query ?q=" });
  }

  try {
    const result = await tigerUncle.runTool("webSearch", { query });
    res.json({ result });
  } catch (err: any) {
    console.error("[/api/search] Error:", err.message);
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, async () => {
  console.log(`[Tiger Uncle API] Listening at http://localhost:${PORT}`);
});
