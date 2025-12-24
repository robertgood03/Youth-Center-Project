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

⚠️ **Important: Server-Side Only**

The database connection in `src/db.js` is designed for **server-side use only** (Vercel serverless functions, Edge functions, or Node.js backend). Never import database functions directly into client-side React components, as this would expose your database credentials.

#### Architecture: API Routes → Database

For a Vite React project, follow this pattern:

**Step 1: Create API Routes (Vercel Serverless Functions)**

Create an `api/` directory in your project root, then add serverless function files:

```javascript
// api/users.js - Serverless function to fetch users
import { getAllUsers } from '../src/db';

export default async function handler(req, res) {
  try {
    const users = await getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
}
```

```javascript
// api/create-user.js - Serverless function to create a user
import { createUser } from '../src/db';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { name, email } = req.body;
    const newUser = await createUser(name, email);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create user' });
  }
}
```

**Step 2: Call API Routes from React Components**

```javascript
// In your React component
import { useState, useEffect } from 'react';

function UserList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // ✅ Correct: Call the API route, not the database directly
    fetch('/api/users')
      .then(res => res.json())
      .then(data => setUsers(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      {users.map(user => (
        <div key={user.id}>{user.name}</div>
      ))}
    </div>
  );
}
```

**Alternative: Using Express or Other Backend Framework**

If you prefer a traditional backend setup instead of Vercel serverless functions, you can:
1. Create an Express server in a separate directory or repository
2. Set up REST API endpoints that use `src/db.js` functions
3. Deploy the backend separately
4. Configure CORS and have your React frontend call the backend API

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
