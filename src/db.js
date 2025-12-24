import { neon } from '@neondatabase/serverless';

/**
 * Database Helper Module for Server-Side Use Only
 * 
 * ⚠️ IMPORTANT: This module is designed for server-side environments only!
 * 
 * The Neon serverless driver is meant for use in:
 * - Vercel Serverless Functions (api/ directory)
 * - Vercel Edge Functions
 * - Node.js backend servers
 * 
 * ❌ DO NOT import this module in client-side React components!
 * 
 * The browser cannot establish direct database connections, and doing so
 * would expose your database credentials to anyone inspecting the browser's
 * JavaScript code.
 * 
 * ✅ Correct Usage: Create API routes (e.g., api/users.js) that use these
 * functions, then call those API endpoints from your React components.
 * 
 * Example API Route (api/users.js):
 * ```javascript
 * import { getAllUsers } from '../src/db';
 * 
 * export default async function handler(req, res) {
 *   const users = await getAllUsers();
 *   res.json(users);
 * }
 * ```
 * 
 * Example Client Usage (React component):
 * ```javascript
 * const response = await fetch('/api/users');
 * const users = await response.json();
 * ```
 */

// Initialize Neon database connection
// This uses the Neon serverless driver which is optimized for edge functions
let db = null;

export const getDatabase = () => {
  if (!db) {
    const databaseUrl = process.env.DATABASE_URL;
    
    if (!databaseUrl) {
      throw new Error('DATABASE_URL is not defined. Please set it in your environment variables.');
    }
    
    db = neon(databaseUrl);
  }
  
  return db;
};

// Example: Fetch all users
export const getAllUsers = async () => {
  const sql = getDatabase();
  const users = await sql`SELECT * FROM users`;
  return users;
};

// Example: Create a user
export const createUser = async (name, email) => {
  const sql = getDatabase();
  const result = await sql`
    INSERT INTO users (name, email, created_at)
    VALUES (${name}, ${email}, NOW())
    RETURNING *
  `;
  return result[0];
};
