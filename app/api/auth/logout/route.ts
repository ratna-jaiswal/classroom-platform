import { NextResponse } from 'next/server';
import { successResponse, withErrorHandling } from '@/lib/response';

export const POST = withErrorHandling(async () => {
  // Create response
  const response = successResponse(null, 'Logged out successfully');
  
  // Clear the auth cookie
  response.cookies.set('auth-token', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    expires: new Date(0), // Set to past date to delete
    path: '/',
  });
  
  return response;
});
