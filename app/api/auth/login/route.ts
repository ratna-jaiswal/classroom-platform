import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import User from '@/models/User';
import { loginSchema } from '@/lib/validations/auth';
import { generateToken, cookieConfig } from '@/lib/auth';
import { ZodError } from 'zod';

export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const body = await request.json();
    
    // Validate input data
    const validatedData = loginSchema.parse(body);
    
    // Connect to database
    await connectToDatabase();
    
    // Find user by email and include password field
    const user = await User.findOne({ email: validatedData.email }).select('+password');
    
    if (!user) {
      return NextResponse.json(
        {
          success: false,
          error: 'Authentication Error',
          message: 'Invalid email or password',
        },
        { status: 401 }
      );
    }
    
    // Check password
    const isPasswordValid = await user.comparePassword(validatedData.password);
    
    if (!isPasswordValid) {
      return NextResponse.json(
        {
          success: false,
          error: 'Authentication Error',
          message: 'Invalid email or password',
        },
        { status: 401 }
      );
    }
    
    // Generate JWT token
    const token = generateToken(user);
    
    // Create response
    const response = NextResponse.json(
      {
        success: true,
        message: 'Login successful',
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          isEmailVerified: user.isEmailVerified,
          profile: user.profile,
          createdAt: user.createdAt,
        },
      },
      { status: 200 }
    );
    
    // Set secure HTTP-only cookie
    response.cookies.set('auth-token', token, cookieConfig);
    
    return response;
    
  } catch (error) {
    console.error('Login error:', error);
    
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
        message: 'Something went wrong during login',
      },
      { status: 500 }
    );
  }
}
