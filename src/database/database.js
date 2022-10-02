import pkg from "pg";
import dotenv from "dotenv";
dotenv.config();

const { Pool } = pkg;
const connectionString = process.env.DATABASE_URL;

const connection = new Pool({
  connectionString,
});

export { connection };
