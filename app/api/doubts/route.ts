import { NextRequest, NextResponse } from 'next/server';
import { Doubt } from '@/models/Doubt';

// In a real application, you would use a database
// For demo purposes, we'll simulate with some initial data
const getDoubtsFromStorage = (): Doubt[] => {
  // This would normally come from a database
  // For demo purposes, return some sample data
  const sampleDoubts: Doubt[] = [
    {
      _id: '1',
      title: 'Integration by Parts Problem',
      description: "I'm having trouble understanding when to use integration by parts vs substitution method.",
      author: { id: '1', name: 'John Doe' },
      subject: 'mathematics',
      topic: 'Calculus',
      mentionedFaculty: 'Prof. Smith',
      likes: 5,
      replies: 3,
      status: 'Open',
      createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
      updatedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    },
    {
      _id: '2',
      title: 'Organic Chemistry Reaction Mechanism',
      description: 'Can someone explain the mechanism for SN1 and SN2 reactions with examples?',
      author: { id: '2', name: 'Jane Smith' },
      subject: 'chemistry',
      topic: 'Organic Chemistry',
      mentionedFaculty: 'Prof. Johnson',
      likes: 8,
      replies: 6,
      status: 'Answered',
      createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(), // 4 hours ago
      updatedAt: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
    },
    {
      _id: '3',
      title: 'Newton\'s Laws Application',
      description: 'How do I solve problems involving multiple forces acting on an object?',
      author: { id: '3', name: 'Mike Wilson' },
      subject: 'physics',
      topic: 'Mechanics',
      mentionedFaculty: '',
      likes: 3,
      replies: 2,
      status: 'Open',
      createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
      updatedAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    },
  ];
  
  return sampleDoubts;
};

// GET - Fetch all doubts
export async function GET() {
  try {
    const doubts = getDoubtsFromStorage();
    
    return NextResponse.json({
      success: true,
      data: doubts,
    });
  } catch (error) {
    console.error('Error fetching doubts:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to fetch doubts',
      },
      { status: 500 }
    );
  }
}

// POST - Create a new doubt
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, description, subject, topic, mentionedFaculty, author } = body;
    
    // Validate required fields
    if (!title || !description || !subject || !author) {
      return NextResponse.json(
        {
          success: false,
          message: 'Title, description, subject, and author are required',
        },
        { status: 400 }
      );
    }
    
    // Create new doubt
    const newDoubt: Doubt = {
      _id: Date.now().toString(),
      title,
      description,
      subject,
      topic: topic || '',
      mentionedFaculty: mentionedFaculty || '',
      author,
      likes: 0,
      replies: 0,
      status: 'Open',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    return NextResponse.json(
      {
        success: true,
        message: 'Doubt created successfully',
        data: newDoubt,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating doubt:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to create doubt',
      },
      { status: 500 }
    );
  }
}