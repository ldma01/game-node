import { tigerUncle } from "./index";

async function main() {
  await tigerUncle.init();
  await tigerUncle.run(); // stable main loop
}

main();
