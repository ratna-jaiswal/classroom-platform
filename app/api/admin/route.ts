import { NextRequest, NextResponse } from 'next/server';
import { withAdminAuth } from '@/lib/middleware/auth';

export const POST = withAdminAuth(async (request) => {
  try {
    const body = await request.json();
    
    return NextResponse.json(
      {
        success: true,
        message: 'Admin action completed successfully',
        data: {
          action: body.action || 'default',
          adminUser: request.user?.email,
          timestamp: new Date().toISOString(),
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Admin action error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Server Error',
        message: 'Failed to process admin action',
      },
      { status: 500 }
    );
  }
});

export const GET = withAdminAuth(async (request) => {
  try {
    return NextResponse.json(
      {
        success: true,
        message: 'Admin dashboard data retrieved',
        data: {
          stats: {
            totalUsers: 150,
            totalTeachers: 25,
            totalStudents: 120,
            totalAdmins: 5,
          },
          recentActivity: [
            'New student registered',
            'Teacher created assignment',
            'Admin updated system settings',
          ],
          adminUser: {
            id: request.user?.userId,
            email: request.user?.email,
            role: request.user?.role,
          },
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Admin dashboard error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Server Error',
        message: 'Failed to retrieve admin dashboard data',
      },
      { status: 500 }
    );
  }
});