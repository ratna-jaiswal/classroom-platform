/**
 * Export all type definitions from the types directory
 * This provides a centralized import point for all type definitions
 */

// API types
export * from './api';

// Database model types
export * from './models';

// Additional utility types
export interface RequestWithUser extends Request {
  user?: {
    userId: string;
    email: string;
    role: 'student' | 'teacher' | 'admin';
  };
}

// Environment variables type
export interface EnvironmentVariables {
  // Database
  MONGODB_URI: string;
  
  // JWT
  JWT_SECRET: string;
  JWT_EXPIRES_IN: string;
  
  // Node environment
  NODE_ENV: 'development' | 'production' | 'test';
  
  // Server
  PORT: string;
  
  // Email service (optional)
  EMAIL_FROM?: string;
  EMAIL_SERVICE?: string;
  EMAIL_USER?: string;
  EMAIL_PASS?: string;
  
  // File upload (optional)
  UPLOAD_PATH?: string;
  MAX_FILE_SIZE?: string;
  
  // Security
  BCRYPT_ROUNDS?: string;
  RATE_LIMIT_WINDOW?: string;
  RATE_LIMIT_MAX?: string;
  
  // Logging
  LOG_LEVEL?: string;
  
  // Third-party services (optional)
  GOOGLE_CLIENT_ID?: string;
  GOOGLE_CLIENT_SECRET?: string;
  AWS_BUCKET_NAME?: string;
  AWS_REGION?: string;
  AWS_ACCESS_KEY_ID?: string;
  AWS_SECRET_ACCESS_KEY?: string;
}

// Custom error types
export class AppError extends Error {
  statusCode: number;
  isOperational: boolean;
  
  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;
    
    Error.captureStackTrace(this, this.constructor);
  }
}

export class ValidationError extends AppError {
  errors: Record<string, string[]>;
  
  constructor(message: string, errors: Record<string, string[]>) {
    super(message, 422);
    this.errors = errors;
  }
}

export class AuthenticationError extends AppError {
  constructor(message: string = 'Authentication failed') {
    super(message, 401);
  }
}

export class AuthorizationError extends AppError {
  constructor(message: string = 'Access denied') {
    super(message, 403);
  }
}

export class NotFoundError extends AppError {
  constructor(message: string = 'Resource not found') {
    super(message, 404);
  }
}

export class ConflictError extends AppError {
  constructor(message: string = 'Resource already exists') {
    super(message, 409);
  }
}