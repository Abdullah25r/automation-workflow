// utils/pool.js
import { Pool } from "pg";
import dotenv from 'dotenv'; // Correct import for dotenv
dotenv.config(); // Load environment variables from .env file

// Ensure your DATABASE_URL is correctly set in your .env file
// Example: DATABASE_URL="postgresql://user:password@ep-random-string-12345.us-east-2.aws.neon.tech/dbname?sslmode=require"
const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  console.error('DATABASE_URL environment variable is not set. Please set it in your .env file.');
  // Using process.exit(1) to stop the application if a critical config is missing
  process.exit(1);
}

export const pool = new Pool({
  connectionString: connectionString,
  ssl: {
    // This is crucial for Neon and other cloud providers
    // It allows the application to connect to the database over SSL
    // without requiring a specific certificate file (which is often overkill for simple apps).
    // Ensure your cloud provider supports this or provide a CA certificate if needed.
    rejectUnauthorized: false
  },
  // --- IMPORTANT: Connection Pool Configuration for Serverless DBs ---
  // max: The maximum number of clients (connections) the pool should contain.
  //      Adjust based on your application's concurrency needs. 10-20 is a common starting point.
  max: 10,
  // idleTimeoutMillis: How long a client is allowed to remain idle in the pool before being closed.
  //                    Neon's default idle timeout is often 5 minutes (300000 ms).
  //                    Set this *lower* than Neon's timeout to ensure your pool closes idle connections
  //                    before Neon does, preventing stale connections.
  idleTimeoutMillis: 20000, // 20 seconds (should be less than Neon's idle timeout)
  // connectionTimeoutMillis: How long to wait for a new client connection to be established.
  connectionTimeoutMillis: 10000, // 10 seconds
});

// Optional: Add logging to see pool events (useful for debugging)
pool.on('connect', client => {
  console.log('✅ Database client connected to pool.');
});

pool.on('acquire', client => {
  console.log('✨ Database client acquired from pool.');
});

pool.on('remove', client => {
  console.log('🗑️ Database client removed from pool.');
});

pool.on('error', (err, client) => {
  console.error('❌ Unexpected error on idle client in pool', err);
  // You might want to implement more robust error handling here,
  // such as attempting to re-establish connections or notify admins.
});

// Test the connection when the application starts
pool.query('SELECT 1 + 1 AS solution')
  .then(res => {
    console.log('🚀 Database connected successfully. Solution: ', res.rows[0].solution);
  })
  .catch(err => {
    console.error('🔥 Initial database connection test failed:', err.message);
    process.exit(1); // Exit if initial connection fails
  });

// Graceful shutdown: Close the pool when the application exits
process.on('SIGINT', () => {
  pool.end(() => {
    console.log('👋 Database pool has ended. Application shutting down.');
    process.exit(0);
  });
});

