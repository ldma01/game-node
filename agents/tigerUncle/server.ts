import express from "express";
import { tigerUncle } from "./index";

const app = express();
const port = 3000;

app.use(express.json());

// ✅ Optional: health/status endpoint
app.get("/", (_, res) => {
  res.send("🐅 Tiger Uncle is running");
});

app.listen(port, () => {
  console.log(`[Tiger Uncle API] Listening at http://localhost:${port}`);
});

// ✅ Let the agent initialize and control its full lifecycle
tigerUncle.run();

