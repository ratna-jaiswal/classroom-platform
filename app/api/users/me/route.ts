import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import User from '@/models/User';
import { updateProfileSchema } from '@/lib/validations/auth';
import { authenticateToken } from '@/lib/auth';
import { 
  successResponse, 
  unauthorizedResponse, 
  notFoundResponse, 
  withErrorHandling 
} from '@/lib/response';

// GET /api/users/me - Get current user profile
export const GET = withErrorHandling(async (request: NextRequest) => {
  // Authenticate user
  const payload = await authenticateToken(request);
  
  if (!payload) {
    return unauthorizedResponse('Access token is missing or invalid');
  }
  
  // Connect to database
  await connectToDatabase();
  
  // Find user by ID
  const user = await User.findById(payload.userId);
  
  if (!user) {
    return notFoundResponse('User');
  }
  
  const userData = {
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    profile: user.profile,
    isVerified: user.isEmailVerified,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
  
  return successResponse(userData, 'Profile retrieved successfully');
});

// PUT /api/users/me - Update current user profile
export const PUT = withErrorHandling(async (request: NextRequest) => {
  // Authenticate user
  const payload = await authenticateToken(request);
  
  if (!payload) {
    return unauthorizedResponse('Access token is missing or invalid');
  }
  
  // Parse request body
  const body = await request.json();
  
  // Validate input data
  const validatedData = updateProfileSchema.parse(body);
  
  // Connect to database
  await connectToDatabase();
  
  // Find and update user
  const updateFields: any = {};
  
  if (validatedData.name) {
    updateFields.name = validatedData.name;
  }
  
  if (validatedData.profile) {
    // Update individual profile fields
    Object.keys(validatedData.profile).forEach(key => {
      updateFields[`profile.${key}`] = (validatedData.profile as any)[key];
    });
  }
  
  const user = await User.findByIdAndUpdate(
    payload.userId,
    { $set: updateFields },
    { new: true, runValidators: true }
  );
  
  if (!user) {
    return notFoundResponse('User');
  }
  
  const userData = {
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    profile: user.profile,
    isVerified: user.isEmailVerified,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
  
  return successResponse(userData, 'Profile updated successfully');
});
