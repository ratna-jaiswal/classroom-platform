import { NextRequest, NextResponse } from 'next/server';
import { withStudentAuth } from '@/lib/middleware/auth';

export const GET = withStudentAuth(async (request) => {
  try {
    return NextResponse.json(
      {
        success: true,
        message: 'Student dashboard data retrieved',
        data: {
          student: {
            id: request.user?.userId,
            email: request.user?.email,
            role: request.user?.role,
          },
          enrolledClasses: [
            { id: 1, name: 'Mathematics 101', teacher: 'Dr. Smith', schedule: 'Mon, Wed, Fri 10:00 AM' },
            { id: 2, name: 'Physics 201', teacher: 'Prof. Johnson', schedule: 'Tue, Thu 2:00 PM' },
          ],
          assignments: [
            { id: 1, title: 'Algebra Homework', subject: 'Mathematics 101', dueDate: '2025-09-25', status: 'pending' },
            { id: 2, title: 'Newton Laws Quiz', subject: 'Physics 201', dueDate: '2025-09-28', status: 'submitted' },
          ],
          upcomingClasses: [
            { time: '10:00 AM', subject: 'Mathematics 101', room: 'A-101', type: 'lecture' },
            { time: '2:00 PM', subject: 'Physics 201', room: 'B-205', type: 'lab' },
          ],
          grades: [
            { subject: 'Mathematics 101', grade: 'A-', percentage: 92 },
            { subject: 'Physics 201', grade: 'B+', percentage: 87 },
          ],
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Student dashboard error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Server Error',
        message: 'Failed to retrieve student dashboard data',
      },
      { status: 500 }
    );
  }
});

export const POST = withStudentAuth(async (request) => {
  try {
    const body = await request.json();
    
    return NextResponse.json(
      {
        success: true,
        message: 'Student action completed successfully',
        data: {
          action: body.action || 'default',
          studentUser: request.user?.email,
          timestamp: new Date().toISOString(),
          details: body,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Student action error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Server Error',
        message: 'Failed to process student action',
      },
      { status: 500 }
    );
  }
});