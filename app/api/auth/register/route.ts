import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import User from '@/models/User';
import { registerSchema } from '@/lib/validations/auth';
import { generateToken, cookieConfig } from '@/lib/auth';
import { 
  createdResponse, 
  conflictResponse, 
  withErrorHandling 
} from '@/lib/response';

export const POST = withErrorHandling(async (request: NextRequest) => {
  // Parse request body
  const body = await request.json();
  
  // Validate input data
  const validatedData = registerSchema.parse(body);
  
  // Connect to database
  await connectToDatabase();
  
  // Check if user already exists
  const existingUser = await User.findOne({ email: validatedData.email.toLowerCase() });
  if (existingUser) {
    return conflictResponse('User', 'email');
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
  
  // Create response data
  const responseData = {
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      isVerified: user.isEmailVerified,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    },
    token,
  };
  
  // Create response
  const response = createdResponse(responseData, 'User registered successfully');
  
  // Set secure HTTP-only cookie
  response.cookies.set('auth-token', token, cookieConfig);
  
  return response;
});
