import mongoose from "mongoose";
import type { MongoMemoryServer } from "mongodb-memory-server";

let memoryServer: MongoMemoryServer | undefined;

/**
 * Connects to MongoDB. Without a URI (development and tests only) an in-memory
 * server is started, so contributors need no local database install.
 * Returns true when an ephemeral database was started.
 */
export async function connectDatabase(uri?: string): Promise<boolean> {
  mongoose.set("strictQuery", true);
  let ephemeral = false;
  if (!uri) {
    const { MongoMemoryServer } = await import("mongodb-memory-server");
    // Generous timeout: antivirus scanning can slow the first launch on Windows.
    memoryServer = await MongoMemoryServer.create({ instance: { launchTimeout: 60_000 } });
    uri = memoryServer.getUri("cifiag");
    ephemeral = true;
  }
  await mongoose.connect(uri);
  await mongoose.connection.syncIndexes();
  return ephemeral;
}

export async function disconnectDatabase(): Promise<void> {
  await mongoose.disconnect();
  if (memoryServer) {
    await memoryServer.stop();
    memoryServer = undefined;
  }
}

export function databaseIsReady(): boolean {
  return mongoose.connection.readyState === 1;
}
