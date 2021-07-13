import { main } from "./src/main.js";

const PROGRAM_START_TIME = Date.now();

main().then(() => {
    console.log(`Execution Time: ${(Date.now() - PROGRAM_START_TIME).toFixed(2)}ms`);
});
