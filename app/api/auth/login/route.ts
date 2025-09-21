import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import User from '@/models/User';
import { loginSchema } from '@/lib/validations/auth';
import { generateToken, cookieConfig } from '@/lib/auth';
import { 
  successResponse, 
  unauthorizedResponse, 
  withErrorHandling 
} from '@/lib/response';

export const POST = withErrorHandling(async (request: NextRequest) => {
  // Parse request body
  const body = await request.json();
  
  // Validate input data
  const validatedData = loginSchema.parse(body);
  
  // Connect to database
  await connectToDatabase();
  
  // Find user by email and include password field
  const user = await User.findOne({ email: validatedData.email }).select('+password');
  
  if (!user) {
    return unauthorizedResponse('Invalid email or password');
  }
  
  // Check password
  const isPasswordValid = await user.comparePassword(validatedData.password);
  
  if (!isPasswordValid) {
    return unauthorizedResponse('Invalid email or password');
  }
  
  // Generate JWT token
  const token = generateToken(user);
  
  // Create response data
  const responseData = {
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      isVerified: user.isEmailVerified,
      profile: user.profile,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    },
    token,
  };
  
  // Create response
  const response = successResponse(responseData, 'Login successful');
  
  // Set secure HTTP-only cookie
  response.cookies.set('auth-token', token, cookieConfig);
  
  return response;
});
