import { config, isProduction } from "../config.js";
import { connectDatabase, disconnectDatabase } from "../db.js";
import { databaseIsEmpty, seedDatabase } from "./seed.js";

/** `npm run seed`: loads development content into the database at MONGODB_URI. */
async function main() {
  if (isProduction) throw new Error("Refusing to load development seed content in production.");
  if (!config.MONGODB_URI) {
    throw new Error("Set MONGODB_URI to seed a persistent database. Without it, `npm run dev` already seeds an in-memory one.");
  }
  await connectDatabase(config.MONGODB_URI);
  try {
    if (!(await databaseIsEmpty())) {
      throw new Error("Database already contains content; seeding skipped to avoid overwriting it.");
    }
    await seedDatabase();
    console.log("Seed content loaded.");
  } finally {
    await disconnectDatabase();
  }
}

main().catch((err) => {
  console.error(err instanceof Error ? err.message : err);
  process.exit(1);
});
