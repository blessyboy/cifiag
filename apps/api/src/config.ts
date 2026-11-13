import { z } from "zod";

// Load the repository-level .env when present (Node >= 20.12).
for (const file of ["../../.env", ".env"]) {
  try {
    process.loadEnvFile(file);
    break;
  } catch {
    // File absent: rely on the real environment.
  }
}

const schema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  PORT: z.coerce.number().int().positive().default(4000),
  MONGODB_URI: z.string().optional().transform((v) => (v ? v : undefined)),
  DEV_ALLOWED_ORIGINS: z
    .string()
    .optional()
    .transform((v) => (v ? v.split(",").map((s) => s.trim()).filter(Boolean) : [])),
});

const parsed = schema.safeParse(process.env);
if (!parsed.success) {
  console.error("Invalid environment configuration", parsed.error.flatten().fieldErrors);
  process.exit(1);
}

export const config = parsed.data;

if (config.NODE_ENV === "production" && !config.MONGODB_URI) {
  console.error("MONGODB_URI is required in production");
  process.exit(1);
}

export const isProduction = config.NODE_ENV === "production";
