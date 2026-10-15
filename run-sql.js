const { Client } = require("pg");
const fs = require("fs");
const path = require("path");

// Parse connection URL directly from your .env configuration file
require("dotenv").config();

async function run() {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    console.error("❌ Error: DATABASE_URL not found in .env file.");
    process.exit(1);
  }

  console.log("⏳ Connecting to PostgreSQL node instance...");
  const client = new Client({ connectionString });
  await client.connect();

  try {
    console.log("📖 Reading schema.sql asset script...");
    const sqlPath = path.join(__dirname, "schema.sql");
    const sql = fs.readFileSync(sqlPath, "utf8");

    console.log("⚡ Executing structural table migrations directly...");
    await client.query(sql);
    console.log("🚀 SUCCESS! Every single database table has been created perfectly.");
  } catch (err) {
    console.error("❌ Execution Error:", err.message);
  } finally {
    await client.end();
  }
}

run();
