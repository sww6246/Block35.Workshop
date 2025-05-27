import dotenv from "dotenv";
dotenv.config();

console.log("🔍 DATABASE_URL from env:", process.env.DATABASE_URL);

import pg from "pg";
const db = new pg.Client({ connectionString: process.env.DATABASE_URL });

export default db;