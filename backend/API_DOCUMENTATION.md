# API Documentation

This document outlines the planned API structure for SikshaLink. As backend implementation progresses, this documentation will be updated with actual endpoints, request/response formats, and examples.

## Base URL

All API endpoints are prefixed with `/api/v1`.

## Authentication

### Register User

- **URL**: `/api/v1/auth/register`
- **Method**: `POST`
- **Auth Required**: No
- **Description**: Register a new user

**Request Body**:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepassword123",
  "role": "student"
}
```

**Success Response**:
- **Code**: `201 CREATED`
- **Content**: 
```json
{
  "success": true,
  "token": "jwt-token-here",
  "user": {
    "id": "user-id",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "student"
  }
}
```

### Login User

- **URL**: `/api/v1/auth/login`
- **Method**: `POST`
- **Auth Required**: No
- **Description**: Authenticate a user

**Request Body**:
```json
{
  "email": "john@example.com",
  "password": "securepassword123"
}
```

**Success Response**:
- **Code**: `200 OK`
- **Content**: 
```json
{
  "success": true,
  "token": "jwt-token-here",
  "user": {
    "id": "user-id",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "student"
  }
}
```

## User Management

### Get Current User

- **URL**: `/api/v1/users/me`
- **Method**: `GET`
- **Auth Required**: Yes
- **Description**: Get current user profile

**Success Response**:
- **Code**: `200 OK`
- **Content**: 
```json
{
  "success": true,
  "data": {
    "id": "user-id",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "student",
    "profile": {
      "avatar": "url-to-avatar",
      "bio": "Student bio..."
    }
  }
}
```

### Update User Profile

- **URL**: `/api/v1/users/me`
- **Method**: `PUT`
- **Auth Required**: Yes
- **Description**: Update current user profile

**Request Body**:
```json
{
  "name": "John Smith",
  "profile": {
    "avatar": "new-avatar-url",
    "bio": "Updated bio..."
  }
}
```

**Success Response**:
- **Code**: `200 OK`
- **Content**: 
```json
{
  "success": true,
  "data": {
    "id": "user-id",
    "name": "John Smith",
    "email": "john@example.com",
    "profile": {
      "avatar": "new-avatar-url",
      "bio": "Updated bio..."
    }
  }
}
```

## Classes

### Get All Classes

- **URL**: `/api/v1/classes`
- **Method**: `GET`
- **Auth Required**: Yes
- **Description**: Get all classes (filtered by user role)

**Success Response**:
- **Code**: `200 OK`
- **Content**: 
```json
{
  "success": true,
  "count": 2,
  "data": [
    {
      "id": "class-id-1",
      "name": "Mathematics 101",
      "description": "Introduction to algebra",
      "teacher": {
        "id": "teacher-id",
        "name": "Dr. Smith"
      },
      "schedule": {
        "days": ["Monday", "Wednesday"],
        "time": "10:00 AM - 11:30 AM"
      }
    },
    {
      "id": "class-id-2",
      "name": "Physics 101",
      "description": "Introduction to mechanics",
      "teacher": {
        "id": "teacher-id-2",
        "name": "Dr. Johnson"
      },
      "schedule": {
        "days": ["Tuesday", "Thursday"],
        "time": "1:00 PM - 2:30 PM"
      }
    }
  ]
}
```

### Create Class

- **URL**: `/api/v1/classes`
- **Method**: `POST`
- **Auth Required**: Yes
- **Permissions**: Teacher or Admin
- **Description**: Create a new class

**Request Body**:
```json
{
  "name": "Chemistry 101",
  "description": "Introduction to chemistry",
  "schedule": {
    "days": ["Monday", "Wednesday"],
    "time": "3:00 PM - 4:30 PM"
  }
}
```

**Success Response**:
- **Code**: `201 CREATED`
- **Content**: 
```json
{
  "success": true,
  "data": {
    "id": "new-class-id",
    "name": "Chemistry 101",
    "description": "Introduction to chemistry",
    "teacher": {
      "id": "teacher-id",
      "name": "Dr. Smith"
    },
    "schedule": {
      "days": ["Monday", "Wednesday"],
      "time": "3:00 PM - 4:30 PM"
    },
    "students": []
  }
}
```

## Assignments

### Get All Assignments

- **URL**: `/api/v1/classes/:classId/assignments`
- **Method**: `GET`
- **Auth Required**: Yes
- **Description**: Get all assignments for a class

**Success Response**:
- **Code**: `200 OK`
- **Content**: 
```json
{
  "success": true,
  "count": 2,
  "data": [
    {
      "id": "assignment-id-1",
      "title": "Week 1 Homework",
      "description": "Complete problems 1-10",
      "dueDate": "2025-09-15T23:59:59Z",
      "points": 100,
      "status": "active"
    },
    {
      "id": "assignment-id-2",
      "title": "Midterm Project",
      "description": "Research paper on selected topic",
      "dueDate": "2025-10-30T23:59:59Z",
      "points": 200,
      "status": "upcoming"
    }
  ]
}
```

### Create Assignment

- **URL**: `/api/v1/classes/:classId/assignments`
- **Method**: `POST`
- **Auth Required**: Yes
- **Permissions**: Teacher or Admin
- **Description**: Create a new assignment

**Request Body**:
```json
{
  "title": "Final Project",
  "description": "Build a working model demonstrating a chemistry concept",
  "dueDate": "2025-12-10T23:59:59Z",
  "points": 300
}
```

**Success Response**:
- **Code**: `201 CREATED`
- **Content**: 
```json
{
  "success": true,
  "data": {
    "id": "new-assignment-id",
    "title": "Final Project",
    "description": "Build a working model demonstrating a chemistry concept",
    "dueDate": "2025-12-10T23:59:59Z",
    "points": 300,
    "status": "upcoming"
  }
}
```

## Attendance

### Get Attendance Records

- **URL**: `/api/v1/classes/:classId/attendance`
- **Method**: `GET`
- **Auth Required**: Yes
- **Permissions**: Teacher or Admin
- **Description**: Get attendance records for a class

**Success Response**:
- **Code**: `200 OK`
- **Content**: 
```json
{
  "success": true,
  "data": {
    "class": {
      "id": "class-id",
      "name": "Chemistry 101"
    },
    "records": [
      {
        "date": "2025-09-05",
        "students": [
          {
            "id": "student-id-1",
            "name": "John Doe",
            "status": "present"
          },
          {
            "id": "student-id-2",
            "name": "Jane Smith",
            "status": "absent"
          }
        ]
      }
    ]
  }
}
```

### Mark Attendance

- **URL**: `/api/v1/classes/:classId/attendance`
- **Method**: `POST`
- **Auth Required**: Yes
- **Permissions**: Teacher or Admin
- **Description**: Mark attendance for a class

**Request Body**:
```json
{
  "date": "2025-09-07",
  "students": [
    {
      "id": "student-id-1",
      "status": "present"
    },
    {
      "id": "student-id-2",
      "status": "absent"
    }
  ]
}
```

**Success Response**:
- **Code**: `201 CREATED`
- **Content**: 
```json
{
  "success": true,
  "data": {
    "date": "2025-09-07",
    "class": {
      "id": "class-id",
      "name": "Chemistry 101"
    },
    "recordedBy": {
      "id": "teacher-id",
      "name": "Dr. Smith"
    },
    "students": [
      {
        "id": "student-id-1",
        "name": "John Doe",
        "status": "present"
      },
      {
        "id": "student-id-2",
        "name": "Jane Smith",
        "status": "absent"
      }
    ]
  }
}
```

## Resources

### Get Resources

- **URL**: `/api/v1/classes/:classId/resources`
- **Method**: `GET`
- **Auth Required**: Yes
- **Description**: Get resources for a class

**Success Response**:
- **Code**: `200 OK`
- **Content**: 
```json
{
  "success": true,
  "count": 2,
  "data": [
    {
      "id": "resource-id-1",
      "title": "Lecture Notes Week 1",
      "description": "Introduction to basic concepts",
      "fileUrl": "url-to-file",
      "fileType": "pdf",
      "uploadedBy": {
        "id": "teacher-id",
        "name": "Dr. Smith"
      },
      "uploadedAt": "2025-09-01T10:30:00Z"
    },
    {
      "id": "resource-id-2",
      "title": "Reference Textbook",
      "description": "Digital copy of the course textbook",
      "fileUrl": "url-to-file",
      "fileType": "pdf",
      "uploadedBy": {
        "id": "teacher-id",
        "name": "Dr. Smith"
      },
      "uploadedAt": "2025-09-02T14:15:00Z"
    }
  ]
}
```

### Upload Resource

- **URL**: `/api/v1/classes/:classId/resources`
- **Method**: `POST`
- **Auth Required**: Yes
- **Permissions**: Teacher or Admin
- **Description**: Upload a resource for a class
- **Content-Type**: `multipart/form-data`

**Request Body**:
```
- title: "Lab Manual"
- description: "Guide for all lab experiments"
- file: [binary file data]
```

**Success Response**:
- **Code**: `201 CREATED`
- **Content**: 
```json
{
  "success": true,
  "data": {
    "id": "new-resource-id",
    "title": "Lab Manual",
    "description": "Guide for all lab experiments",
    "fileUrl": "url-to-file",
    "fileType": "pdf",
    "uploadedBy": {
      "id": "teacher-id",
      "name": "Dr. Smith"
    },
    "uploadedAt": "2025-09-10T09:45:00Z"
  }
}
```

## Error Responses

### Validation Error

- **Code**: `400 BAD REQUEST`
- **Content**: 
```json
{
  "success": false,
  "error": "Validation Error",
  "details": [
    {
      "field": "email",
      "message": "Must be a valid email address"
    }
  ]
}
```

### Authentication Error

- **Code**: `401 UNAUTHORIZED`
- **Content**: 
```json
{
  "success": false,
  "error": "Authentication Error",
  "message": "Invalid credentials"
}
```

### Authorization Error

- **Code**: `403 FORBIDDEN`
- **Content**: 
```json
{
  "success": false,
  "error": "Authorization Error",
  "message": "Not authorized to access this resource"
}
```

### Resource Not Found

- **Code**: `404 NOT FOUND`
- **Content**: 
```json
{
  "success": false,
  "error": "Not Found",
  "message": "Resource not found"
}
```

### Server Error

- **Code**: `500 INTERNAL SERVER ERROR`
- **Content**: 
```json
{
  "success": false,
  "error": "Server Error",
  "message": "Something went wrong"
}
```

---

This documentation is a work in progress and will be updated as the API implementation progresses. Contributors are encouraged to update this document as they implement new endpoints.
