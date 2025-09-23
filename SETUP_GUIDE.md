# 🚀 SikshaLink Setup Guide

Complete guide to set up SikshaLink Classroom Platform for development.

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

### Required Software
- **Node.js** (v18.0.0 or later) - [Download](https://nodejs.org/)
- **pnpm** (v8.0.0 or later) - [Install Guide](https://pnpm.io/installation)
- **MongoDB** (v4.4 or later) - Choose one option:
  - [MongoDB Community Server](https://www.mongodb.com/try/download/community) (Local)
  - [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) (Cloud)
- **Git** - [Download](https://git-scm.com/)

### Recommended Tools
- **VS Code** - [Download](https://code.visualstudio.com/)
- **MongoDB Compass** - [Download](https://www.mongodb.com/products/compass)
- **Postman** or **Thunder Client** - For API testing

## 🛠️ Installation Steps

### 1. Clone the Repository

```bash
# Clone the repository
git clone https://github.com/ratna-jaiswal/classroom-platform.git
cd classroom-platform

# Or if you forked it
git clone https://github.com/YOUR_USERNAME/classroom-platform.git
cd classroom-platform
```

### 2. Install Dependencies

```bash
# Install all dependencies
pnpm install

# Verify installation
pnpm --version
node --version
```

### 3. Database Setup

#### Option A: Local MongoDB

1. **Install MongoDB Community Server**
   - Download from [MongoDB Download Center](https://www.mongodb.com/try/download/community)
   - Follow installation instructions for your OS

2. **Start MongoDB Service**
   ```bash
   # Windows (as Administrator)
   net start MongoDB

   # macOS (with Homebrew)
   brew services start mongodb-community

   # Linux (Ubuntu/Debian)
   sudo systemctl start mongod
   sudo systemctl enable mongod
   ```

3. **Verify MongoDB is Running**
   ```bash
   # Connect to MongoDB shell
   mongosh
   # Should connect successfully
   ```

#### Option B: MongoDB Atlas (Cloud)

1. **Create Account**
   - Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
   - Sign up for a free account

2. **Create Cluster**
   - Create a new cluster (Free tier is sufficient)
   - Wait for cluster to be provisioned

3. **Configure Access**
   - Add your IP address to IP Access List
   - Create a database user with read/write permissions

4. **Get Connection String**
   - Click "Connect" → "Connect your application"
   - Copy the connection string

### 4. Environment Configuration

1. **Copy Environment Template**
   ```bash
   cp .env.example .env.local
   ```

2. **Edit .env.local**
   ```bash
   # Database Configuration
   MONGODB_URI=mongodb://localhost:27017/sikshalink
   # Or for MongoDB Atlas:
   # MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/sikshalink

   # JWT Configuration - IMPORTANT: Change in production!
   JWT_SECRET=your-super-secret-jwt-key-here-minimum-32-characters-long
   JWT_EXPIRES_IN=7d

   # App Configuration
   NODE_ENV=development
   ```

3. **Generate Secure JWT Secret**
   ```bash
   # Option 1: Using Node.js
   node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

   # Option 2: Using OpenSSL
   openssl rand -base64 32

   # Option 3: Online Generator
   # Visit: https://generate-secret.vercel.app/32
   ```

### 5. Start Development Server

```bash
# Start the development server
pnpm dev

# Server should start on http://localhost:3000
```

## 🧪 Testing the Setup

### 1. Verify Frontend
- Open [http://localhost:3000](http://localhost:3000)
- You should see the SikshaLink homepage

### 2. Test API Endpoints

#### Register a New User
```bash
curl -X POST "http://localhost:3000/api/auth/register" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "password": "TestPassword123",
    "role": "student"
  }'
```

#### Login User
```bash
curl -X POST "http://localhost:3000/api/auth/login" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "TestPassword123"
  }'
```

#### Get User Profile (after login)
```bash
curl -X GET "http://localhost:3000/api/users/me" \
  -H "Cookie: token=YOUR_JWT_TOKEN_FROM_LOGIN"
```

### 3. Database Verification

#### Using MongoDB Compass
1. Connect to your MongoDB instance
2. Look for `sikshalink` database
3. Check `users` collection for the test user

#### Using MongoDB Shell
```bash
mongosh
use sikshalink
db.users.find().pretty()
```

## 🚨 Troubleshooting

### Common Issues

#### 1. MongoDB Connection Failed
```
Error: connect ECONNREFUSED 127.0.0.1:27017
```
**Solution:**
- Ensure MongoDB service is running
- Check if port 27017 is available
- Verify MONGODB_URI in .env.local

#### 2. JWT Secret Error
```
Error: JWT secret is required
```
**Solution:**
- Ensure JWT_SECRET is set in .env.local
- JWT_SECRET must be at least 32 characters

#### 3. Port Already in Use
```
Error: Port 3000 is already in use
```
**Solution:**
```bash
# Find process using port 3000
lsof -i :3000  # macOS/Linux
netstat -ano | findstr :3000  # Windows

# Kill the process or use different port
pnpm dev -- -p 3001
```

#### 4. Module Not Found Errors
```
Error: Cannot find module 'mongoose'
```
**Solution:**
```bash
# Clear node_modules and reinstall
rm -rf node_modules pnpm-lock.yaml
pnpm install
```

#### 5. TypeScript Errors
```
Error: Type 'any' is not assignable
```
**Solution:**
```bash
# Restart TypeScript server in VS Code
# Cmd/Ctrl + Shift + P → "TypeScript: Restart TS Server"

# Or run type check
pnpm run type-check
```

### Getting Help

If you encounter issues:

1. **Check the logs** - Look at terminal output for error messages
2. **Check browser console** - For frontend issues
3. **Verify environment variables** - Ensure all required vars are set
4. **Check database connection** - Use MongoDB Compass or shell
5. **Restart services** - Stop and restart both MongoDB and Next.js

## 📚 Next Steps

After successful setup:

1. **Explore the API** - Check [docs/API.md](docs/API.md) for complete API documentation
2. **Understand the codebase** - Read through the project structure
3. **Make your first contribution** - Check [CONTRIBUTING.md](CONTRIBUTING.md)
4. **Join the community** - Connect with other contributors

## 🔧 Development Tools

### Recommended VS Code Extensions
```json
{
  "recommendations": [
    "bradlc.vscode-tailwindcss",
    "esbenp.prettier-vscode",
    "ms-vscode.vscode-typescript-next",
    "mongodb.mongodb-vscode",
    "ms-vscode.vscode-json",
    "streetsidesoftware.code-spell-checker"
  ]
}
```

### Useful Commands
```bash
# Development
pnpm dev              # Start development server
pnpm build            # Build for production
pnpm start            # Start production server
pnpm lint             # Run ESLint
pnpm type-check       # Check TypeScript types

# Database
mongosh               # MongoDB shell
mongodump             # Backup database
mongorestore          # Restore database

# Git
git status            # Check file changes
git add .             # Stage all changes
git commit -m "msg"   # Commit changes
git push              # Push to remote
```

## 🎯 Ready to Contribute!

Your development environment is now ready! 

- ✅ Dependencies installed
- ✅ Database connected
- ✅ Environment configured
- ✅ API endpoints working
- ✅ Development server running

Check out the [Contributing Guidelines](CONTRIBUTING.md) to start making your first contribution to SikshaLink! 🚀