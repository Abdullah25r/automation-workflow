import { Pool } from "pg";
import env from 'dotenv'
env.config()

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl:{
        rejectUnauthorized: false
    }
})

pool.connect()
  .then(() => console.log("✅ Connected to Neon PostgreSQL"))
  .catch((err) => console.error("❌ Connection error", err.stack));

module.exports = pool;