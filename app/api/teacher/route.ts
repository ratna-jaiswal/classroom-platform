import { NextRequest, NextResponse } from 'next/server';
import { withTeacherAuth } from '@/lib/middleware/auth';

export const GET = withTeacherAuth(async (request) => {
  try {
    return NextResponse.json(
      {
        success: true,
        message: 'Teacher dashboard data retrieved',
        data: {
          teacher: {
            id: request.user?.userId,
            email: request.user?.email,
            role: request.user?.role,
          },
          classes: [
            { id: 1, name: 'Mathematics 101', students: 30 },
            { id: 2, name: 'Physics 201', students: 25 },
          ],
          assignments: [
            { id: 1, title: 'Algebra Homework', dueDate: '2025-09-25', submissions: 28 },
            { id: 2, title: 'Newton Laws Quiz', dueDate: '2025-09-28', submissions: 20 },
          ],
          upcomingClasses: [
            { time: '10:00 AM', subject: 'Mathematics 101', room: 'A-101' },
            { time: '2:00 PM', subject: 'Physics 201', room: 'B-205' },
          ],
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Teacher dashboard error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Server Error',
        message: 'Failed to retrieve teacher dashboard data',
      },
      { status: 500 }
    );
  }
});

export const POST = withTeacherAuth(async (request) => {
  try {
    const body = await request.json();
    
    return NextResponse.json(
      {
        success: true,
        message: 'Teacher action completed successfully',
        data: {
          action: body.action || 'default',
          teacherUser: request.user?.email,
          timestamp: new Date().toISOString(),
          details: body,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Teacher action error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Server Error',
        message: 'Failed to process teacher action',
      },
      { status: 500 }
    );
  }
});