/**
 * Common API response types used across all endpoints
 */

// Base API response structure
export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
  errors?: Record<string, string[]>;
}

// Success response type
export interface SuccessResponse<T = any> extends ApiResponse<T> {
  success: true;
  data: T;
}

// Error response type
export interface ErrorResponse extends ApiResponse {
  success: false;
  error: string;
  errors?: Record<string, string[]>;
}

// Pagination metadata
export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

// Paginated response type
export interface PaginatedResponse<T> extends SuccessResponse<T[]> {
  meta: PaginationMeta;
}

/**
 * Authentication API types
 */

// Register request body
export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  role: 'student' | 'teacher' | 'admin';
}

// Login request body
export interface LoginRequest {
  email: string;
  password: string;
}

// Auth response data (after successful login/register)
export interface AuthResponse {
  user: {
    id: string;
    name: string;
    email: string;
    role: 'student' | 'teacher' | 'admin';
    isVerified: boolean;
    createdAt: string;
    updatedAt: string;
  };
  token: string;
}

/**
 * User API types
 */

// User profile data
export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'teacher' | 'admin';
  avatar?: string;
  bio?: string;
  phone?: string;
  dateOfBirth?: string;
  isVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

// Update profile request body
export interface UpdateProfileRequest {
  name?: string;
  avatar?: string;
  bio?: string;
  phone?: string;
  dateOfBirth?: string;
}

/**
 * Assignment API types (for future implementation)
 */

export interface Assignment {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  maxMarks: number;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateAssignmentRequest {
  title: string;
  description: string;
  dueDate: string;
  maxMarks: number;
}

/**
 * Class/Course API types (for future implementation)
 */

export interface Class {
  id: string;
  name: string;
  description: string;
  subject: string;
  teacher: UserProfile;
  students: UserProfile[];
  createdAt: string;
  updatedAt: string;
}

export interface CreateClassRequest {
  name: string;
  description: string;
  subject: string;
}

/**
 * Attendance API types (for future implementation)
 */

export interface AttendanceRecord {
  id: string;
  student: UserProfile;
  class: Class;
  date: string;
  status: 'present' | 'absent' | 'late';
  markedBy: UserProfile;
  createdAt: string;
}

export interface MarkAttendanceRequest {
  studentId: string;
  classId: string;
  date: string;
  status: 'present' | 'absent' | 'late';
}

/**
 * Common query parameters
 */

export interface PaginationQuery {
  page?: string;
  limit?: string;
}

export interface SearchQuery extends PaginationQuery {
  search?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

/**
 * File upload types
 */

export interface FileUploadResponse {
  filename: string;
  originalName: string;
  mimetype: string;
  size: number;
  url: string;
  uploadedAt: string;
}

/**
 * Validation error details
 */

export interface ValidationError {
  field: string;
  message: string;
  code: string;
}

/**
 * HTTP Status codes commonly used in the API
 */

export enum HttpStatus {
  OK = 200,
  CREATED = 201,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  CONFLICT = 409,
  UNPROCESSABLE_ENTITY = 422,
  INTERNAL_SERVER_ERROR = 500,
}

/**
 * JWT Token payload type
 */

export interface JWTPayload {
  userId: string;
  email: string;
  role: 'student' | 'teacher' | 'admin';
  iat: number;
  exp: number;
}