import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import User from '@/models/User';
import { verifyToken } from '@/lib/auth';
import { updateProfileSchema } from '@/lib/validations/auth';
import { ZodError } from 'zod';

export async function PUT(request: NextRequest) {
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

    // Parse and validate request body
    const body = await request.json();
    const validatedData = updateProfileSchema.parse(body);

    // Connect to database
    await connectToDatabase();

    // Find user by ID
    const user = await User.findById(payload.userId);

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

    // Update user fields
    if (validatedData.name) {
      user.name = validatedData.name;
    }

    if (validatedData.profile) {
      // Initialize profile if it doesn't exist
      if (!user.profile) {
        user.profile = {};
      }

      // Update profile fields
      if (validatedData.profile.avatar !== undefined) {
        user.profile.avatar = validatedData.profile.avatar;
      }
      
      if (validatedData.profile.bio !== undefined) {
        user.profile.bio = validatedData.profile.bio;
      }
      
      if (validatedData.profile.phone !== undefined) {
        user.profile.phone = validatedData.profile.phone;
      }
      
      if (validatedData.profile.dateOfBirth !== undefined) {
        user.profile.dateOfBirth = validatedData.profile.dateOfBirth ? new Date(validatedData.profile.dateOfBirth) : undefined;
      }
      
      if (validatedData.profile.address !== undefined) {
        user.profile.address = validatedData.profile.address;
      }
    }

    // Save the updated user
    await user.save();

    // Return updated user profile (excluding password)
    const updatedUser = await User.findById(user._id).select('-password');

    return NextResponse.json(
      {
        success: true,
        message: 'Profile updated successfully',
        data: {
          user: {
            id: updatedUser!._id,
            name: updatedUser!.name,
            email: updatedUser!.email,
            role: updatedUser!.role,
            profile: updatedUser!.profile || {
              avatar: null,
              bio: '',
              phone: null,
              dateOfBirth: null,
              address: '',
            },
            isEmailVerified: updatedUser!.isEmailVerified,
            createdAt: updatedUser!.createdAt,
            updatedAt: updatedUser!.updatedAt,
          },
        },
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Update profile error:', error);

    // Handle validation errors
    if (error instanceof ZodError) {
      return NextResponse.json(
        {
          success: false,
          error: 'Validation Error',
          details: error.errors.map(err => ({
            field: err.path.join('.'),
            message: err.message,
          })),
        },
        { status: 400 }
      );
    }

    // Handle other errors
    return NextResponse.json(
      {
        success: false,
        error: 'Server Error',
        message: 'Failed to update profile',
      },
      { status: 500 }
    );
  }
}