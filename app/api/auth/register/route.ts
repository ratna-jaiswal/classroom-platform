import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import User from '@/models/User';
import { registerSchema } from '@/lib/validations/auth';
import { generateToken, cookieConfig } from '@/lib/auth';
import { ZodError } from 'zod';

export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const body = await request.json();
    
    // Validate input data
    const validatedData = registerSchema.parse(body);
    
    // Connect to database
    await connectToDatabase();
    
    // Check if user already exists
    const existingUser = await User.findByEmail(validatedData.email);
    if (existingUser) {
      return NextResponse.json(
        {
          success: false,
          error: 'Validation Error',
          message: 'User with this email already exists',
        },
        { status: 400 }
      );
    }
    
    // Create new user
    const user = new User({
      name: validatedData.name,
      email: validatedData.email,
      password: validatedData.password,
      role: validatedData.role,
    });
    
    await user.save();
    
    // Generate JWT token
    const token = generateToken(user);
    
    // Create response
    const response = NextResponse.json(
      {
        success: true,
        message: 'User registered successfully',
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          isEmailVerified: user.isEmailVerified,
          createdAt: user.createdAt,
        },
      },
      { status: 201 }
    );
    
    // Set secure HTTP-only cookie
    response.cookies.set('auth-token', token, cookieConfig);
    
    return response;
    
  } catch (error) {
    console.error('Registration error:', error);
    
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
    
    // Handle MongoDB duplicate key error
    if ((error as any).code === 11000) {
      return NextResponse.json(
        {
          success: false,
          error: 'Validation Error',
          message: 'User with this email already exists',
        },
        { status: 400 }
      );
    }
    
    // Handle other errors
    return NextResponse.json(
      {
        success: false,
        error: 'Server Error',
        message: 'Something went wrong during registration',
      },
      { status: 500 }
    );
  }
}
