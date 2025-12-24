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

The database connection is set up in `src/db.js`. Example usage:

```javascript
import { getAllUsers, createUser } from './db';

// Fetch users
const users = await getAllUsers();

// Create a user
const newUser = await createUser('John Doe', 'john@example.com');
```

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
