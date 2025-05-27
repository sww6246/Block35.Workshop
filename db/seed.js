import db from "#db/client";
import fs from "fs/promises";
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";

// Fix path resolution for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Resolve path to schema.sql correctly
const schemaPath = resolve(__dirname, "./schema.sql");

console.log("🔍 DATABASE_URL from env:", process.env.DATABASE_URL);

await db.connect();

// Read and execute schema.sql
const schema = await fs.readFile(schemaPath, "utf8");
await db.query(schema);

// Seed data
await seedEmployees();
await db.end();

console.log("🌱 Database seeded.");

async function seedEmployees() {
  const employees = Array.from({ length: 10 }, (_, i) => ({
    name: `Employee ${i + 1}`,
    birthday: `1990-01-${String(i + 1).padStart(2, '0')}`,
    salary: 50000 + i * 1000,
  }));

  for (const employee of employees) {
    await db.query(
      `INSERT INTO employees (name, birthday, salary)
       VALUES ($1, $2, $3)`,
      [employee.name, employee.birthday, employee.salary]
    );
  }
}
