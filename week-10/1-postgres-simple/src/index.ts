import { Client } from "pg";
import "dotenv/config";

export const client = new Client({
  connectionString: process.env.DB_URL,
});
