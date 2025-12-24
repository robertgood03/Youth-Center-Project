# Vercel and Neon Database Setup

This project is configured for deployment on Vercel with Neon PostgreSQL database.

## Setup Instructions

### 1. Create a Neon Database

1. Go to [Neon Console](https://console.neon.tech)
2. Sign up or log in
3. Click "Create Project"
4. Copy your connection string (it looks like: `postgresql://username:password@ep-xxxxx.region.aws.neon.tech/neondb`)

### 2. Set Up Environment Variables Locally

1. Copy the example environment file:
   ```bash
   cp .env.example .env.local
   ```

2. Add your Neon database URL to `.env.local`:
   ```
   DATABASE_URL=your_neon_connection_string_here
   ```

### 3. Deploy to Vercel

#### Option A: Using Vercel CLI (Recommended)

1. Install Vercel CLI:
   ```bash
   npm install -g vercel
   ```

2. Login to Vercel:
   ```bash
   vercel login
   ```

3. Deploy:
   ```bash
   vercel
   ```

4. Add environment variables:
   ```bash
   vercel env add DATABASE_URL
   ```
   (Paste your Neon connection string when prompted)

#### Option B: Using Vercel Dashboard

1. Go to [Vercel Dashboard](https://vercel.com)
2. Click "Add New Project"
3. Import your GitHub repository: `robertgood03/Youth-Center-Project`
4. Add environment variable:
   - Key: `DATABASE_URL`
   - Value: Your Neon connection string
5. Click "Deploy"

### 4. Using the Database

**Important Architecture Note:** Since this is a Vite React application that runs in the browser, you cannot import database functions directly into your React components. Database operations must happen server-side to protect your credentials and ensure security.

#### Option A: Using Vercel Serverless Functions (Recommended)

Create API routes in the `api/` directory at the root of your project. Vercel will automatically deploy these as serverless functions.

**Example API Route** (`api/users.js`):
```javascript
import { neon } from '@neondatabase/serverless';

export default async function handler(req, res) {
  const sql = neon(process.env.DATABASE_URL);
  
  if (req.method === 'GET') {
    // Fetch all users
    const users = await sql`SELECT * FROM users`;
    return res.status(200).json(users);
  } 
  
  if (req.method === 'POST') {
    // Create a user
    const { name, email } = req.body;
    const result = await sql`
      INSERT INTO users (name, email, created_at)
      VALUES (${name}, ${email}, NOW())
      RETURNING *
    `;
    return res.status(201).json(result[0]);
  }
  
  return res.status(405).json({ error: 'Method not allowed' });
}
```

**Using the API from React components:**
```javascript
// In your React component
const fetchUsers = async () => {
  const response = await fetch('/api/users');
  const users = await response.json();
  return users;
};

const createUser = async (name, email) => {
  const response = await fetch('/api/users', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email })
  });
  const newUser = await response.json();
  return newUser;
};
```

#### Option B: Using a Backend Framework

Alternatively, you can set up a separate backend server (Express, Fastify, etc.) and deploy it separately, then configure your React app to call that backend's API endpoints.
### 5. Create Database Tables

Connect to your Neon database and create tables. Example:

```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);
```

You can run SQL queries in the Neon Console SQL Editor.

## Environment Variables

- `DATABASE_URL` - Your Neon PostgreSQL connection string (required)

## Notes

- Never commit `.env.local` or `.env` files to Git
- The Neon serverless driver is optimized for edge functions and Vercel
- For production, always use environment variables in Vercel dashboard
- **Database operations must run server-side:** Create API routes (Vercel serverless functions) to handle database queries. Never expose database credentials or execute queries directly from React components running in the browser
