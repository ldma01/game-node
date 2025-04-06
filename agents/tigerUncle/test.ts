import { webSearchFunction } from "./functions";

async function main() {
  const result = await webSearchFunction.executable({
    query: "Taoism and artificial intelligence"
  });

  console.log("[Web Search Result]", result.feedback);
}

main();
