import dotenv from "dotenv";
import { z } from "zod";
import path from "path";

dotenv.config({ path: path.join(__dirname, ".env") });

const envSchema = z.object({
	SPREADSHEET_ID: z.string().min(1),
	NODE_ENV: z.union([z.literal("development"), z.literal("testing"), z.literal("production")]).default("development"),

	GOOGLE_CREDENTIALS_CLIENT_EMAIL: z.string().min(1),
	GOOGLE_CREDENTIALS_PRIVATE_KEY: z.string().min(1),
});

const env = envSchema.parse(process.env);

export default env;
