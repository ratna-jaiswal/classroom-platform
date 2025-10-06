import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import User from '@/models/User';
import { verifyToken } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    // Get token from cookies or Authorization header
    const token = request.cookies.get('auth-token')?.value || 
                  request.headers.get('Authorization')?.replace('Bearer ', '');

    if (!token) {
      return NextResponse.json(
        {
          success: false,
          error: 'Authentication Error',
          message: 'Access token is required',
        },
        { status: 401 }
      );
    }

    // Verify the token
    const payload = verifyToken(token);
    if (!payload) {
      return NextResponse.json(
        {
          success: false,
          error: 'Authentication Error',
          message: 'Invalid or expired token',
        },
        { status: 401 }
      );
    }

    // Connect to database
    await connectToDatabase();

    // Find user by ID and exclude password
    const user = await User.findById(payload.userId).select('-password');

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          error: 'Not Found',
          message: 'User not found',
        },
        { status: 404 }
      );
    }

    // Return user profile
    return NextResponse.json(
      {
        success: true,
        message: 'User profile retrieved successfully',
        data: {
          user: {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            profile: user.profile || {
              avatar: null,
              bio: '',
              phone: null,
              dateOfBirth: null,
              address: '',
            },
            isEmailVerified: user.isEmailVerified,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
          },
        },
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Get user profile error:', error);

    return NextResponse.json(
      {
        success: false,
        error: 'Server Error',
        message: 'Failed to retrieve user profile',
      },
      { status: 500 }
    );
  }
}