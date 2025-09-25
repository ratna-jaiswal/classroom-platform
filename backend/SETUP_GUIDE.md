# Backend Development Setup Guide

This guide helps contributors set up their development environment for building the SikshaLink backend.

## 🚀 Quick Start

The authentication system is already implemented! To get started:

1. **Clone and install dependencies:**
   ```bash
   git clone https://github.com/ratna-jaiswal/classroom-platform.git
   cd classroom-platform
   pnpm install
   ```

2. **Set up environment variables:**
   Create `.env.local` in the root directory:
   ```env
   MONGODB_URI=mongodb://localhost:27017/classroom-platform
   JWT_SECRET=your-super-secret-jwt-key-here
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your-nextauth-secret-here
   ```

3. **Start MongoDB:**
   ```bash
   # Windows
   net start MongoDB
   
   # macOS
   brew services start mongodb-community
   
   # Linux
   sudo systemctl start mongod
   ```

4. **Run the development server:**
   ```bash
   pnpm dev
   ```

5. **Test the API:**
   - Server runs on `http://localhost:3000`
   - API endpoints available at `/api/*`
   - Authentication system fully functional

## ✅ Current Implementation Status

### Completed Features
- **Authentication System**: Registration, login, logout with JWT
- **Database Integration**: MongoDB with Mongoose ODM
- **User Management**: User model with role-based access (student/teacher)
- **Security**: Password hashing, HTTP-only cookies, input validation
- **TypeScript**: Full type safety across the application
- **API Documentation**: Comprehensive endpoint documentation

### API Endpoints Available
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User authentication
- `POST /api/auth/logout` - User logout
- `GET /api/users/me` - Get current user profile

## Prerequisites

- Node.js v18+ installed
- pnpm v8+ installed
- MongoDB (local or Atlas)
- Git

## Current Tech Stack

✅ **Framework**: Next.js 15.2.4 with API Routes
✅ **Database**: MongoDB with Mongoose ODM
✅ **Authentication**: JWT with HTTP-only cookies
4. **Validation**: Zod or Joi
5. **Testing**: Jest + Supertest

## Getting Started with Express.js

### Step 1: Setup Basic Structure

Create the following directory structure inside the `backend` directory:

```
backend/
├── src/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── utils/
│   └── app.js
├── tests/
├── .env.example
└── package.json
```

### Step 2: Initialize the Project

```bash
cd backend
pnpm init
```

### Step 3: Install Core Dependencies

```bash
pnpm add express mongoose dotenv cors helmet jsonwebtoken bcryptjs
pnpm add -D nodemon jest supertest
```

### Step 4: Create Configuration

Create `config/database.js`:

```js
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
```

### Step 5: Setup Express App

Create `app.js`:

```js
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const connectDB = require('./config/database');
const dotenv = require('dotenv');

// Load env vars
dotenv.config();

// Connect to database
connectDB();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(helmet());

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/users', require('./routes/users'));
app.use('/api/assignments', require('./routes/assignments'));
// Add more routes as needed

// Error handler
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    status: 'error',
    message: err.message || 'Internal Server Error',
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = app;
```

## Getting Started with Next.js API Routes

### Step 1: Create API Structure

If you're using the existing Next.js frontend, create the following structure:

```
app/
├── api/
│   ├── auth/
│   │   └── [...nextauth]/
│   │       └── route.ts
│   ├── users/
│   │   └── route.ts
│   └── assignments/
│       └── route.ts
```

### Step 2: Configure Database Connection

Create `lib/db.ts`:

```typescript
import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable');
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      return mongoose;
    });
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

export default dbConnect;
```

### Step 3: Create API Routes

Example for a basic Next.js API route (`app/api/assignments/route.ts`):

```typescript
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Assignment from '@/models/Assignment';

export async function GET() {
  try {
    await dbConnect();
    const assignments = await Assignment.find({});
    
    return NextResponse.json({ 
      success: true, 
      data: assignments 
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    await dbConnect();
    
    const assignment = await Assignment.create(body);
    
    return NextResponse.json(
      { success: true, data: assignment },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 400 }
    );
  }
}
```

## Testing

### Setting Up Jest

Create a `jest.config.js` file:

```js
module.exports = {
  testEnvironment: 'node',
  testMatch: ['**/__tests__/**/*.js', '**/?(*.)+(spec|test).js'],
  verbose: true,
  forceExit: true,
  clearMocks: true,
  resetMocks: true,
  restoreMocks: true
};
```

### Writing Tests

Example test file (`tests/assignments.test.js`):

```js
const request = require('supertest');
const app = require('../src/app');
const mongoose = require('mongoose');

beforeAll(async () => {
  // Connect to test database
  await mongoose.connect(process.env.TEST_MONGO_URI);
});

afterAll(async () => {
  // Disconnect from test database
  await mongoose.connection.close();
});

describe('Assignment API', () => {
  it('should create a new assignment', async () => {
    const res = await request(app)
      .post('/api/assignments')
      .send({
        title: 'Test Assignment',
        description: 'Test Description',
        dueDate: '2025-12-31'
      });
    
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('data');
  });
  
  it('should get all assignments', async () => {
    const res = await request(app).get('/api/assignments');
    
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body.data)).toBeTruthy();
  });
});
```

## Additional Resources

- [Express.js Documentation](https://expressjs.com/)
- [Mongoose Documentation](https://mongoosejs.com/docs/)
- [Prisma Documentation](https://www.prisma.io/docs/)
- [Next.js API Routes Documentation](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)
- [JWT Documentation](https://jwt.io/introduction)
- [Jest Documentation](https://jestjs.io/docs/getting-started)

## Need Help?

If you have questions or need help with the backend setup, please:
1. Check existing issues on GitHub
2. Join our Discord server for real-time help
3. Ask in the comments of your assigned issue

Happy coding!
