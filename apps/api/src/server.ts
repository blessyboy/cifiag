import { createApp } from "./app.js";
import { config } from "./config.js";
import { connectDatabase, disconnectDatabase } from "./db.js";
import { seedDatabase } from "./seed/seed.js";

async function main() {
  const ephemeral = await connectDatabase(config.MONGODB_URI);
  if (ephemeral) {
    await seedDatabase();
    console.log("Using in-memory MongoDB with development seed data (changes are lost on restart).");
  }

  const server = createApp().listen(config.PORT, () => {
    console.log(`CIFIAG API listening on http://localhost:${config.PORT}/api/v1`);
  });

  const shutdown = async (signal: string) => {
    console.log(`${signal} received, shutting down`);
    server.close();
    await disconnectDatabase();
    process.exit(0);
  };
  process.on("SIGINT", () => void shutdown("SIGINT"));
  process.on("SIGTERM", () => void shutdown("SIGTERM"));
}

main().catch((err) => {
  console.error("Failed to start API", err);
  process.exit(1);
});
