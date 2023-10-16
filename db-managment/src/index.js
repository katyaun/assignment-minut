import { up as firstMigration } from "./migrations/001_update-users-with-active-flag.js";

async function runMigrations() {
  await firstMigration();
}

async function main() {
  try {
    await runMigrations();
    console.log("Migrations completed successfully.");
  } catch (error) {
    console.error("Error running migrations", error);
  }
}

main();
