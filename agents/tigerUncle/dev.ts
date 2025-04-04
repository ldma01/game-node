import { tigerUncle } from "./index";

async function main() {
  await tigerUncle.init();
  await tigerUncle.run(15, { verbose: true }); // runs every 15s
}

main();
