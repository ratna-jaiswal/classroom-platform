// @ts-ignore
import { describe, it, expect, jest, beforeEach } from 'jest';
import { NextRequest } from 'next/server';
import { 
  withAuth, 
  withStudentAuth, 
  withTeacherAuth, 
  withAdminAuth,
  verifyAuthToken,
  hasRole,
  isAdmin,
  isTeacherOrAdmin,
  isStudent
} from '../lib/middleware/auth';

// Mock the auth utilities
jest.mock('../lib/auth', () => ({
  verifyToken: jest.fn(),
}));

describe('Authentication Middleware', () => {
  let mockRequest: Partial<NextRequest>;
  let mockHandler: jest.MockedFunction<any>;

  beforeEach(() => {
    mockRequest = {
      headers: new Headers(),
      cookies: {
        get: jest.fn(),
      } as any,
    };
    mockHandler = jest.fn();
    jest.clearAllMocks();
  });

  describe('withAuth middleware', () => {
    it('should authenticate user with valid headers', async () => {
      // Setup valid user headers
      mockRequest.headers?.set('x-user-id', 'user123');
      mockRequest.headers?.set('x-user-email', 'test@example.com');
      mockRequest.headers?.set('x-user-role', 'student');

      const middleware = withAuth(mockHandler);
      await middleware(mockRequest as NextRequest);

      expect(mockHandler).toHaveBeenCalledWith(
        expect.objectContaining({
          user: {
            userId: 'user123',
            email: 'test@example.com',
            role: 'student',
          },
        })
      );
    });

    it('should return 401 when user headers are missing', async () => {
      const middleware = withAuth(mockHandler);
      const response = await middleware(mockRequest as NextRequest);

      expect(response.status).toBe(401);
      expect(mockHandler).not.toHaveBeenCalled();
    });
  });

  describe('withStudentAuth middleware', () => {
    it('should allow access for student role', async () => {
      mockRequest.headers?.set('x-user-id', 'user123');
      mockRequest.headers?.set('x-user-email', 'student@example.com');
      mockRequest.headers?.set('x-user-role', 'student');

      const middleware = withStudentAuth(mockHandler);
      await middleware(mockRequest as NextRequest);

      expect(mockHandler).toHaveBeenCalled();
    });

    it('should deny access for non-student role', async () => {
      mockRequest.headers?.set('x-user-id', 'user123');
      mockRequest.headers?.set('x-user-email', 'teacher@example.com');
      mockRequest.headers?.set('x-user-role', 'teacher');

      const middleware = withStudentAuth(mockHandler);
      const response = await middleware(mockRequest as NextRequest);

      expect(response.status).toBe(403);
      expect(mockHandler).not.toHaveBeenCalled();
    });
  });

  describe('withTeacherAuth middleware', () => {
    it('should allow access for teacher role', async () => {
      mockRequest.headers?.set('x-user-id', 'user123');
      mockRequest.headers?.set('x-user-email', 'teacher@example.com');
      mockRequest.headers?.set('x-user-role', 'teacher');

      const middleware = withTeacherAuth(mockHandler);
      await middleware(mockRequest as NextRequest);

      expect(mockHandler).toHaveBeenCalled();
    });

    it('should deny access for non-teacher role', async () => {
      mockRequest.headers?.set('x-user-id', 'user123');
      mockRequest.headers?.set('x-user-email', 'student@example.com');
      mockRequest.headers?.set('x-user-role', 'student');

      const middleware = withTeacherAuth(mockHandler);
      const response = await middleware(mockRequest as NextRequest);

      expect(response.status).toBe(403);
      expect(mockHandler).not.toHaveBeenCalled();
    });
  });

  describe('withAdminAuth middleware', () => {
    it('should allow access for admin role', async () => {
      mockRequest.headers?.set('x-user-id', 'user123');
      mockRequest.headers?.set('x-user-email', 'admin@example.com');
      mockRequest.headers?.set('x-user-role', 'admin');

      const middleware = withAdminAuth(mockHandler);
      await middleware(mockRequest as NextRequest);

      expect(mockHandler).toHaveBeenCalled();
    });

    it('should deny access for non-admin role', async () => {
      mockRequest.headers?.set('x-user-id', 'user123');
      mockRequest.headers?.set('x-user-email', 'student@example.com');
      mockRequest.headers?.set('x-user-role', 'student');

      const middleware = withAdminAuth(mockHandler);
      const response = await middleware(mockRequest as NextRequest);

      expect(response.status).toBe(403);
      expect(mockHandler).not.toHaveBeenCalled();
    });
  });

  describe('verifyAuthToken function', () => {
    const { verifyToken } = require('../lib/auth');

    it('should return success for valid token', async () => {
      const mockPayload = {
        userId: 'user123',
        email: 'test@example.com',
        role: 'student',
      };

      (verifyToken as jest.MockedFunction<any>).mockReturnValue(mockPayload);
      (mockRequest.cookies?.get as jest.MockedFunction<any>).mockReturnValue({ value: 'valid-token' });

      const result = await verifyAuthToken(mockRequest as NextRequest);

      expect(result.success).toBe(true);
      expect(result.user).toEqual(mockPayload);
    });

    it('should return error when no token provided', async () => {
      (mockRequest.cookies?.get as jest.MockedFunction<any>).mockReturnValue(undefined);

      const result = await verifyAuthToken(mockRequest as NextRequest);

      expect(result.success).toBe(false);
      expect(result.status).toBe(401);
      expect(result.message).toBe('Access token is required');
    });

    it('should return error for invalid token', async () => {
      (verifyToken as jest.MockedFunction<any>).mockReturnValue(null);
      (mockRequest.cookies?.get as jest.MockedFunction<any>).mockReturnValue({ value: 'invalid-token' });

      const result = await verifyAuthToken(mockRequest as NextRequest);

      expect(result.success).toBe(false);
      expect(result.status).toBe(401);
      expect(result.message).toBe('Invalid or expired token');
    });
  });

  describe('Role utility functions', () => {
    describe('hasRole', () => {
      it('should return true when user has required role', () => {
        expect(hasRole('admin', 'admin')).toBe(true);
        expect(hasRole('teacher', ['teacher', 'admin'])).toBe(true);
      });

      it('should return false when user does not have required role', () => {
        expect(hasRole('student', 'admin')).toBe(false);
        expect(hasRole('student', ['teacher', 'admin'])).toBe(false);
      });
    });

    describe('isAdmin', () => {
      it('should return true for admin role', () => {
        expect(isAdmin('admin')).toBe(true);
      });

      it('should return false for non-admin roles', () => {
        expect(isAdmin('teacher')).toBe(false);
        expect(isAdmin('student')).toBe(false);
      });
    });

    describe('isTeacherOrAdmin', () => {
      it('should return true for teacher and admin roles', () => {
        expect(isTeacherOrAdmin('teacher')).toBe(true);
        expect(isTeacherOrAdmin('admin')).toBe(true);
      });

      it('should return false for student role', () => {
        expect(isTeacherOrAdmin('student')).toBe(false);
      });
    });

    describe('isStudent', () => {
      it('should return true for student role', () => {
        expect(isStudent('student')).toBe(true);
      });

      it('should return false for non-student roles', () => {
        expect(isStudent('teacher')).toBe(false);
        expect(isStudent('admin')).toBe(false);
      });
    });
  });
});