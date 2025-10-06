import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI || '';

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

/**
 * Global variable to cache the mongoose connection in serverless environments
 * This prevents creating multiple connections during development with hot reloads
 */
let cached = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null };
}

/**
 * MongoDB connection configuration with optimized settings
 */
const mongooseOptions = {
  // Connection pooling settings for production
  maxPoolSize: 10, // Maximum number of connections in the pool
  serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
  socketTimeoutMS: 45000, // Close connections after 45 seconds of inactivity
  family: 4, // Use IPv4, skip trying IPv6
  
  // Buffer settings
  bufferCommands: false, // Disable mongoose buffering
  // bufferMaxEntries: 0, // Disable mongoose buffering
  
  // Connection behavior
  connectTimeoutMS: 10000, // Give up initial connection after 10 seconds
  heartbeatFrequencyMS: 10000, // Send a ping to check if server is alive every 10 seconds
  
  // Retry settings
  retryWrites: true, // Retry failed writes
  retryReads: true, // Retry failed reads
};

/**
 * Establishes a connection to MongoDB with optimized configuration
 * Implements connection caching to prevent multiple connections in serverless environments
 * 
 * @returns {Promise<typeof mongoose>} The cached mongoose connection
 */
export async function connectToDatabase() {
  // Return existing connection if available
  if (cached.conn) {
    return cached.conn;
  }

  // Create new connection promise if one doesn't exist
  if (!cached.promise) {
    console.log('🔄 Connecting to MongoDB...');
    
    cached.promise = mongoose.connect(MONGODB_URI, mongooseOptions)
      .then((mongoose: typeof import('mongoose')) => {
        console.log('✅ Successfully connected to MongoDB');
        console.log(`📊 Database: ${mongoose.connection.name}`);
        console.log(`🌐 Host: ${mongoose.connection.host}:${mongoose.connection.port}`);
        
        // Set up connection event listeners
        mongoose.connection.on('error', (error: Error) => {
          console.error('❌ MongoDB connection error:', error);
        });
        
        mongoose.connection.on('disconnected', () => {
          console.warn('⚠️ MongoDB disconnected');
        });
        
        mongoose.connection.on('reconnected', () => {
          console.log('🔄 MongoDB reconnected');
        });
        
        return mongoose;
      })
      .catch((error: Error) => {
        console.error('❌ Failed to connect to MongoDB:', error);
        throw error;
      });
  }

  try {
    cached.conn = await cached.promise;
  } catch (error: any) {
    cached.promise = null;
    console.error('❌ MongoDB connection failed:', error);
    throw error;
  }

  return cached.conn;
}

/**
 * Gracefully disconnect from MongoDB
 * Useful for cleanup in testing environments
 */
export async function disconnectFromDatabase() {
  if (cached.conn) {
    await mongoose.disconnect();
    cached.conn = null;
    cached.promise = null;
    console.log('👋 Disconnected from MongoDB');
  }
}

export default connectToDatabase;
