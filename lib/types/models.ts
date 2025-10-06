/**
 * Database model types
 * These types represent the structure of documents in MongoDB collections
 */

import { Document } from 'mongoose';

/**
 * User document type for MongoDB
 */
export interface IUser extends Document {
  _id: string;
  name: string;
  email: string;
  password: string;
  role: 'student' | 'teacher' | 'admin';
  avatar?: string;
  bio?: string;
  phone?: string;
  dateOfBirth?: Date;
  isVerified: boolean;
  resetPasswordToken?: string;
  resetPasswordExpires?: Date;
  emailVerificationToken?: string;
  emailVerificationExpires?: Date;
  lastLoginAt?: Date;
  createdAt: Date;
  updatedAt: Date;
  
  // Instance methods
  comparePassword(candidatePassword: string): Promise<boolean>;
  generatePasswordResetToken(): string;
  generateEmailVerificationToken(): string;
}

/**
 * Assignment document type for MongoDB (for future implementation)
 */
export interface IAssignment extends Document {
  _id: string;
  title: string;
  description: string;
  instructions?: string;
  dueDate: Date;
  maxMarks: number;
  attachments?: string[];
  createdBy: string; // User ID
  class: string; // Class ID
  isPublished: boolean;
  submissionsAllowed: boolean;
  lateSubmissionAllowed: boolean;
  lateSubmissionPenalty?: number;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Assignment submission document type (for future implementation)
 */
export interface IAssignmentSubmission extends Document {
  _id: string;
  assignment: string; // Assignment ID
  student: string; // User ID
  content: string;
  attachments?: string[];
  submittedAt: Date;
  isLate: boolean;
  marks?: number;
  feedback?: string;
  gradedBy?: string; // User ID
  gradedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Class/Course document type (for future implementation)
 */
export interface IClass extends Document {
  _id: string;
  name: string;
  description: string;
  subject: string;
  code: string; // Unique class code
  teacher: string; // User ID
  students: string[]; // Array of User IDs
  schedule?: {
    day: 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday';
    startTime: string;
    endTime: string;
  }[];
  isActive: boolean;
  maxStudents?: number;
  academicYear: string;
  semester: string;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Attendance record document type (for future implementation)
 */
export interface IAttendance extends Document {
  _id: string;
  student: string; // User ID
  class: string; // Class ID
  date: Date;
  status: 'present' | 'absent' | 'late' | 'excused';
  markedBy: string; // User ID
  remarks?: string;
  markedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Live class session document type (for future implementation)
 */
export interface ILiveSession extends Document {
  _id: string;
  title: string;
  description?: string;
  class: string; // Class ID
  teacher: string; // User ID
  scheduledAt: Date;
  startedAt?: Date;
  endedAt?: Date;
  status: 'scheduled' | 'live' | 'ended' | 'cancelled';
  meetingUrl?: string;
  recordingUrl?: string;
  attendees: {
    student: string; // User ID
    joinedAt?: Date;
    leftAt?: Date;
    duration?: number; // in minutes
  }[];
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Notification document type (for future implementation)
 */
export interface INotification extends Document {
  _id: string;
  title: string;
  message: string;
  type: 'announcement' | 'assignment' | 'grade' | 'attendance' | 'class' | 'system';
  recipient: string; // User ID
  sender?: string; // User ID
  relatedModel?: 'Assignment' | 'Class' | 'LiveSession';
  relatedDocument?: string; // Document ID
  isRead: boolean;
  readAt?: Date;
  priority: 'low' | 'medium' | 'high';
  expiresAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Fee record document type (for future implementation)
 */
export interface IFeeRecord extends Document {
  _id: string;
  student: string; // User ID
  academicYear: string;
  semester: string;
  totalAmount: number;
  paidAmount: number;
  pendingAmount: number;
  dueDate: Date;
  status: 'pending' | 'partial' | 'paid' | 'overdue';
  transactions: {
    amount: number;
    paymentMethod: 'cash' | 'card' | 'bank_transfer' | 'online' | 'upi';
    transactionId?: string;
    paidAt: Date;
    receivedBy: string; // User ID
  }[];
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Resource/Study material document type (for future implementation)
 */
export interface IResource extends Document {
  _id: string;
  title: string;
  description?: string;
  type: 'document' | 'video' | 'audio' | 'image' | 'link' | 'presentation';
  fileUrl: string;
  fileName?: string;
  fileSize?: number;
  class?: string; // Class ID (optional, for class-specific resources)
  subject?: string;
  tags: string[];
  uploadedBy: string; // User ID
  accessLevel: 'public' | 'class' | 'teacher' | 'admin';
  downloadCount: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Doubt/Query document type (for future implementation)
 */
export interface IDoubt extends Document {
  _id: string;
  title: string;
  description: string;
  subject: string;
  class?: string; // Class ID
  askedBy: string; // User ID
  assignedTo?: string; // Teacher User ID
  status: 'open' | 'in_progress' | 'resolved' | 'closed';
  priority: 'low' | 'medium' | 'high';
  tags: string[];
  attachments?: string[];
  responses: {
    message: string;
    respondedBy: string; // User ID
    attachments?: string[];
    isResolution: boolean;
    respondedAt: Date;
  }[];
  resolvedAt?: Date;
  resolvedBy?: string; // User ID
  rating?: number; // 1-5 star rating for resolution quality
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Common enum types used across models
 */

export type UserRole = 'student' | 'teacher' | 'admin';
export type AttendanceStatus = 'present' | 'absent' | 'late' | 'excused';
export type LiveSessionStatus = 'scheduled' | 'live' | 'ended' | 'cancelled';
export type NotificationType = 'announcement' | 'assignment' | 'grade' | 'attendance' | 'class' | 'system';
export type NotificationPriority = 'low' | 'medium' | 'high';
export type FeeStatus = 'pending' | 'partial' | 'paid' | 'overdue';
export type PaymentMethod = 'cash' | 'card' | 'bank_transfer' | 'online' | 'upi';
export type ResourceType = 'document' | 'video' | 'audio' | 'image' | 'link' | 'presentation';
export type AccessLevel = 'public' | 'class' | 'teacher' | 'admin';
export type DoubtStatus = 'open' | 'in_progress' | 'resolved' | 'closed';
export type Priority = 'low' | 'medium' | 'high';
export type DayOfWeek = 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday';