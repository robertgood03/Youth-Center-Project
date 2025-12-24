import { neon } from '@neondatabase/serverless';

// Initialize Neon database connection
// This uses the Neon serverless driver which is optimized for edge functions
let db = null;

export const getDatabase = () => {
  if (!db) {
    const databaseUrl = import.meta.env.VITE_DATABASE_URL || process.env.DATABASE_URL;
    
    if (!databaseUrl) {
      throw new Error('DATABASE_URL is not defined. Please set it in your environment variables.');
    }
    
    db = neon(databaseUrl);
  }
  
  return db;
};

// Example query function
export const executeQuery = async (query, params = []) => {
  try {
    const sql = getDatabase();
    const result = await sql(query, params);
    return result;
  } catch (error) {
    console.error('Database query error:', error);
    throw error;
  }
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

export default { getDatabase, executeQuery, getAllUsers, createUser };
