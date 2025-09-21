import { NextResponse } from 'next/server';
import { ZodError } from 'zod';
import { 
  ApiResponse, 
  ErrorResponse, 
  SuccessResponse,
  ValidationError,
  AppError,
  HttpStatus 
} from './types';

/**
 * Standard success response utility
 */
export function successResponse<T>(
  data: T, 
  message: string = 'Operation successful', 
  status: number = 200
): NextResponse<SuccessResponse<T>> {
  return NextResponse.json(
    {
      success: true,
      message,
      data
    },
    { status }
  );
}

/**
 * Standard error response utility
 */
export function errorResponse(
  message: string, 
  status: number = 500, 
  error?: string,
  errors?: Record<string, string[]>
): NextResponse<ErrorResponse> {
  return NextResponse.json(
    {
      success: false,
      message,
      error: error || message,
      ...(errors && { errors })
    },
    { status }
  );
}

/**
 * Validation error response utility for Zod errors
 */
export function validationErrorResponse(
  zodError: ZodError
): NextResponse<ErrorResponse> {
  const errors: Record<string, string[]> = {};
  
  zodError.errors.forEach((err) => {
    const path = err.path.join('.');
    if (!errors[path]) {
      errors[path] = [];
    }
    errors[path].push(err.message);
  });

  return NextResponse.json(
    {
      success: false,
      message: 'Validation failed',
      error: 'Please check the provided data and try again',
      errors
    },
    { status: HttpStatus.UNPROCESSABLE_ENTITY }
  );
}

/**
 * Not found error response
 */
export function notFoundResponse(
  resource: string = 'Resource'
): NextResponse<ErrorResponse> {
  return errorResponse(
    `${resource} not found`,
    HttpStatus.NOT_FOUND,
    `The requested ${resource.toLowerCase()} could not be found`
  );
}

/**
 * Unauthorized error response
 */
export function unauthorizedResponse(
  message: string = 'Authentication required'
): NextResponse<ErrorResponse> {
  return errorResponse(
    message,
    HttpStatus.UNAUTHORIZED,
    'Please provide valid authentication credentials'
  );
}

/**
 * Forbidden error response
 */
export function forbiddenResponse(
  message: string = 'Access denied'
): NextResponse<ErrorResponse> {
  return errorResponse(
    message,
    HttpStatus.FORBIDDEN,
    'You do not have permission to access this resource'
  );
}

/**
 * Conflict error response
 */
export function conflictResponse(
  resource: string,
  identifier: string = 'identifier'
): NextResponse<ErrorResponse> {
  return errorResponse(
    `${resource} already exists`,
    HttpStatus.CONFLICT,
    `A ${resource.toLowerCase()} with this ${identifier} already exists`
  );
}

/**
 * Internal server error response
 */
export function internalServerErrorResponse(
  message: string = 'Internal server error',
  error?: string
): NextResponse<ErrorResponse> {
  return errorResponse(
    message,
    HttpStatus.INTERNAL_SERVER_ERROR,
    error || 'An unexpected error occurred. Please try again later.'
  );
}

/**
 * Bad request error response
 */
export function badRequestResponse(
  message: string = 'Bad request',
  error?: string
): NextResponse<ErrorResponse> {
  return errorResponse(
    message,
    HttpStatus.BAD_REQUEST,
    error || 'The request could not be processed due to invalid data'
  );
}

/**
 * Generic error handler that converts different error types to standardized responses
 */
export function handleError(error: unknown): NextResponse<ErrorResponse> {
  console.error('API Error:', error);

  // Handle Zod validation errors
  if (error instanceof ZodError) {
    return validationErrorResponse(error);
  }

  // Handle custom app errors
  if (error instanceof AppError) {
    return errorResponse(error.message, error.statusCode, error.message);
  }

  // Handle validation errors with field details
  if (error instanceof ValidationError) {
    return NextResponse.json(
      {
        success: false,
        message: error.message,
        error: error.message,
        errors: error.errors
      },
      { status: error.statusCode }
    );
  }

  // Handle MongoDB duplicate key errors (11000)
  if (error instanceof Error && 'code' in error && (error as any).code === 11000) {
    const field = Object.keys((error as any).keyPattern || {})[0] || 'field';
    return conflictResponse('Resource', field);
  }

  // Handle generic errors
  if (error instanceof Error) {
    // Don't expose internal error messages in production
    const message = process.env.NODE_ENV === 'development' 
      ? error.message 
      : 'An unexpected error occurred';
    
    return internalServerErrorResponse('Internal server error', message);
  }

  // Handle unknown errors
  return internalServerErrorResponse();
}

/**
 * Async error handler wrapper for API routes
 */
export function withErrorHandling<T extends any[], R>(
  handler: (...args: T) => Promise<NextResponse<any>>
) {
  return async (...args: T): Promise<NextResponse<any>> => {
    try {
      return await handler(...args);
    } catch (error) {
      return handleError(error);
    }
  };
}

/**
 * Rate limit error response
 */
export function rateLimitResponse(
  retryAfter?: number
): NextResponse<ErrorResponse> {
  const response = errorResponse(
    'Too many requests',
    429,
    'Rate limit exceeded. Please try again later.'
  );

  if (retryAfter) {
    response.headers.set('Retry-After', retryAfter.toString());
  }

  return response;
}

/**
 * Method not allowed error response
 */
export function methodNotAllowedResponse(
  allowedMethods: string[]
): NextResponse<ErrorResponse> {
  const response = errorResponse(
    'Method not allowed',
    HttpStatus.NOT_FOUND,
    `This endpoint only supports: ${allowedMethods.join(', ')}`
  );

  response.headers.set('Allow', allowedMethods.join(', '));
  return response;
}

/**
 * Created response for successful resource creation
 */
export function createdResponse<T>(
  data: T,
  message: string = 'Resource created successfully'
): NextResponse<SuccessResponse<T>> {
  return successResponse(data, message, HttpStatus.CREATED);
}

/**
 * No content response for successful operations with no return data
 */
export function noContentResponse(): NextResponse {
  return new NextResponse(null, { status: 204 });
}

/**
 * Accepted response for asynchronous operations
 */
export function acceptedResponse<T>(
  data?: T,
  message: string = 'Request accepted for processing'
): NextResponse<SuccessResponse<T> | { success: boolean; message: string }> {
  return NextResponse.json(
    {
      success: true,
      message,
      ...(data && { data })
    },
    { status: 202 }
  );
}