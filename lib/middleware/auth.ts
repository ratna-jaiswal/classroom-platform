import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth';

export interface AuthenticatedRequest extends NextRequest {
  user?: {
    userId: string;
    email: string;
    role: 'student' | 'teacher' | 'admin';
  };
}

/**
 * Middleware to extract user information from request headers
 * This assumes the main middleware has already verified the token
 */
export function withAuth(handler: (req: AuthenticatedRequest) => Promise<NextResponse>) {
  return async (request: NextRequest) => {
    const userId = request.headers.get('x-user-id');
    const email = request.headers.get('x-user-email');
    const role = request.headers.get('x-user-role') as 'student' | 'teacher' | 'admin';

    if (!userId || !email || !role) {
      return NextResponse.json(
        {
          success: false,
          error: 'Authentication Error',
          message: 'Authentication required',
        },
        { status: 401 }
      );
    }

    // Add user info to the request object
    const authenticatedRequest = request as AuthenticatedRequest;
    authenticatedRequest.user = { userId, email, role };

    return handler(authenticatedRequest);
  };
}

/**
 * Middleware to check if user has student role
 */
export function withStudentAuth(handler: (req: AuthenticatedRequest) => Promise<NextResponse>) {
  return withAuth(async (request: AuthenticatedRequest) => {
    if (request.user?.role !== 'student') {
      return NextResponse.json(
        {
          success: false,
          error: 'Authorization Error',
          message: 'Student access required',
        },
        { status: 403 }
      );
    }

    return handler(request);
  });
}

/**
 * Middleware to check if user has teacher role
 */
export function withTeacherAuth(handler: (req: AuthenticatedRequest) => Promise<NextResponse>) {
  return withAuth(async (request: AuthenticatedRequest) => {
    if (request.user?.role !== 'teacher') {
      return NextResponse.json(
        {
          success: false,
          error: 'Authorization Error',
          message: 'Teacher access required',
        },
        { status: 403 }
      );
    }

    return handler(request);
  });
}

/**
 * Middleware to check if user has admin role
 */
export function withAdminAuth(handler: (req: AuthenticatedRequest) => Promise<NextResponse>) {
  return withAuth(async (request: AuthenticatedRequest) => {
    if (request.user?.role !== 'admin') {
      return NextResponse.json(
        {
          success: false,
          error: 'Authorization Error',
          message: 'Admin access required',
        },
        { status: 403 }
      );
    }

    return handler(request);
  });
}

/**
 * Middleware to check if user has teacher or admin role
 */
export function withTeacherOrAdminAuth(handler: (req: AuthenticatedRequest) => Promise<NextResponse>) {
  return withAuth(async (request: AuthenticatedRequest) => {
    if (request.user?.role !== 'teacher' && request.user?.role !== 'admin') {
      return NextResponse.json(
        {
          success: false,
          error: 'Authorization Error',
          message: 'Teacher or Admin access required',
        },
        { status: 403 }
      );
    }

    return handler(request);
  });
}

/**
 * Alternative token verification for API routes that need manual token checking
 */
export async function verifyAuthToken(request: NextRequest) {
  try {
    // Try to get token from cookies first, then Authorization header
    const token = request.cookies.get('auth-token')?.value || 
                  request.headers.get('Authorization')?.replace('Bearer ', '');

    if (!token) {
      return {
        success: false,
        error: 'Authentication Error',
        message: 'Access token is required',
        status: 401,
      };
    }

    // Verify the token
    const payload = verifyToken(token);
    if (!payload) {
      return {
        success: false,
        error: 'Authentication Error',
        message: 'Invalid or expired token',
        status: 401,
      };
    }

    return {
      success: true,
      user: {
        userId: payload.userId,
        email: payload.email,
        role: payload.role,
      },
    };
  } catch (error) {
    console.error('Token verification error:', error);
    return {
      success: false,
      error: 'Authentication Error',
      message: 'Token verification failed',
      status: 401,
    };
  }
}

/**
 * Role checking utility function
 */
export function hasRole(userRole: string, requiredRoles: string | string[]): boolean {
  const roles = Array.isArray(requiredRoles) ? requiredRoles : [requiredRoles];
  return roles.includes(userRole);
}

/**
 * Check if user has any of the admin privileges
 */
export function isAdmin(userRole: string): boolean {
  return userRole === 'admin';
}

/**
 * Check if user has teacher privileges (teacher or admin)
 */
export function isTeacherOrAdmin(userRole: string): boolean {
  return userRole === 'teacher' || userRole === 'admin';
}

/**
 * Check if user has student privileges
 */
export function isStudent(userRole: string): boolean {
  return userRole === 'student';
}