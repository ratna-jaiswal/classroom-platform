# API Documentation

This document provides comprehensive documentation for the Classroom Platform API endpoints.

## Base URL

- **Development**: `http://localhost:3000/api`
- **Production**: `https://your-domain.com/api`

## Authentication

The API uses JWT (JSON Web Tokens) for authentication. Include the token in the Authorization header:

```
Authorization: Bearer <your-jwt-token>
```

## Response Format

All API responses follow a consistent format:

### Success Response
```json
{
  "success": true,
  "message": "Operation successful",
  "data": {
    // Response data here
  }
}
```

### Error Response
```json
{
  "success": false,
  "message": "Error message",
  "error": "Detailed error description",
  "errors": {
    "field": ["Validation error messages"]
  }
}
```

## Authentication Endpoints

### Register User

**POST** `/auth/register`

Creates a new user account.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john.doe@example.com",
  "password": "SecurePassword123",
  "role": "student"
}
```

**Validation Rules:**
- `name`: Required, minimum 2 characters
- `email`: Required, valid email format, unique
- `password`: Required, minimum 6 characters
- `role`: Required, one of: "student", "teacher", "admin"

**Response (201 Created):**
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "user": {
      "id": "60d5ecb74b24d17a8c5e1234",
      "name": "John Doe",
      "email": "john.doe@example.com",
      "role": "student",
      "isVerified": false,
      "createdAt": "2023-06-25T10:30:00.000Z",
      "updatedAt": "2023-06-25T10:30:00.000Z"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

**Error Responses:**
- `400 Bad Request`: Validation errors
- `409 Conflict`: Email already exists
- `500 Internal Server Error`: Server error

---

### Login User

**POST** `/auth/login`

Authenticates a user and returns a JWT token.

**Request Body:**
```json
{
  "email": "john.doe@example.com",
  "password": "SecurePassword123"
}
```

**Validation Rules:**
- `email`: Required, valid email format
- `password`: Required, minimum 6 characters

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "id": "60d5ecb74b24d17a8c5e1234",
      "name": "John Doe",
      "email": "john.doe@example.com",
      "role": "student",
      "isVerified": false,
      "createdAt": "2023-06-25T10:30:00.000Z",
      "updatedAt": "2023-06-25T10:30:00.000Z"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

**Error Responses:**
- `400 Bad Request`: Validation errors
- `401 Unauthorized`: Invalid credentials
- `500 Internal Server Error`: Server error

---

### Logout User

**POST** `/auth/logout`

Logs out the current user by clearing the authentication cookie.

**Headers Required:**
```
Authorization: Bearer <jwt-token>
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Logout successful"
}
```

**Error Responses:**
- `401 Unauthorized`: Invalid or missing token
- `500 Internal Server Error`: Server error

---

## User Profile Endpoints

### Get Current User Profile

**GET** `/users/me`

Retrieves the profile information of the currently authenticated user.

**Headers Required:**
```
Authorization: Bearer <jwt-token>
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Profile retrieved successfully",
  "data": {
    "id": "60d5ecb74b24d17a8c5e1234",
    "name": "John Doe",
    "email": "john.doe@example.com",
    "role": "student",
    "avatar": "https://example.com/avatar.jpg",
    "bio": "Computer Science student",
    "phone": "+1234567890",
    "dateOfBirth": "1995-05-15",
    "isVerified": true,
    "createdAt": "2023-06-25T10:30:00.000Z",
    "updatedAt": "2023-06-25T11:00:00.000Z"
  }
}
```

**Error Responses:**
- `401 Unauthorized`: Invalid or missing token
- `404 Not Found`: User not found
- `500 Internal Server Error`: Server error

---

### Update User Profile

**PUT** `/users/update`

Updates the profile information of the currently authenticated user.

**Headers Required:**
```
Authorization: Bearer <jwt-token>
```

**Request Body:**
```json
{
  "name": "John Smith",
  "avatar": "https://example.com/new-avatar.jpg",
  "bio": "Updated bio description",
  "phone": "+1987654321",
  "dateOfBirth": "1995-05-15"
}
```

**Validation Rules:**
- `name`: Optional, minimum 2 characters if provided
- `avatar`: Optional, valid URL format if provided
- `bio`: Optional, maximum 500 characters if provided
- `phone`: Optional, valid phone format if provided
- `dateOfBirth`: Optional, valid date format (YYYY-MM-DD) if provided

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Profile updated successfully",
  "data": {
    "id": "60d5ecb74b24d17a8c5e1234",
    "name": "John Smith",
    "email": "john.doe@example.com",
    "role": "student",
    "avatar": "https://example.com/new-avatar.jpg",
    "bio": "Updated bio description",
    "phone": "+1987654321",
    "dateOfBirth": "1995-05-15",
    "isVerified": true,
    "createdAt": "2023-06-25T10:30:00.000Z",
    "updatedAt": "2023-06-25T12:00:00.000Z"
  }
}
```

**Error Responses:**
- `400 Bad Request`: Validation errors
- `401 Unauthorized`: Invalid or missing token
- `404 Not Found`: User not found
- `500 Internal Server Error`: Server error

---

## Authorization Middleware

The API implements role-based access control (RBAC) with the following roles:

### Role Hierarchy
1. **Student**: Basic access to student features
2. **Teacher**: Access to teaching features + student features
3. **Admin**: Full access to all features

### Protected Routes

#### Student Access Required
- All `/users/*` endpoints (own profile only)

#### Teacher Access Required
- Assignment management endpoints (future)
- Class management endpoints (future)
- Attendance management endpoints (future)

#### Admin Access Required
- User management endpoints (future)
- System configuration endpoints (future)

### Middleware Usage

Routes are protected using the `requireAuth` middleware with optional role requirements:

```typescript
// Require authentication only
app.use('/api/users', requireAuth);

// Require specific role
app.use('/api/admin', requireAuth, requireRole(['admin']));

// Require one of multiple roles
app.use('/api/teaching', requireAuth, requireRole(['teacher', 'admin']));
```

---

## Error Codes

| HTTP Status | Error Code | Description |
|-------------|------------|-------------|
| 400 | BAD_REQUEST | Invalid request data or validation errors |
| 401 | UNAUTHORIZED | Authentication required or invalid token |
| 403 | FORBIDDEN | Insufficient permissions for requested resource |
| 404 | NOT_FOUND | Requested resource not found |
| 409 | CONFLICT | Resource already exists (e.g., duplicate email) |
| 422 | UNPROCESSABLE_ENTITY | Validation errors with detailed field information |
| 500 | INTERNAL_SERVER_ERROR | Unexpected server error |

---

## Rate Limiting

The API implements rate limiting to prevent abuse:

- **General endpoints**: 100 requests per 15 minutes per IP
- **Authentication endpoints**: 5 requests per 15 minutes per IP
- **Password reset endpoints**: 3 requests per hour per IP

When rate limit is exceeded, the API returns:

```json
{
  "success": false,
  "message": "Too many requests",
  "error": "Rate limit exceeded. Please try again later."
}
```

---

## Request/Response Examples

### Using cURL

**Register a new user:**
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john.doe@example.com",
    "password": "SecurePassword123",
    "role": "student"
  }'
```

**Login:**
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john.doe@example.com",
    "password": "SecurePassword123"
  }'
```

**Get user profile:**
```bash
curl -X GET http://localhost:3000/api/users/me \
  -H "Authorization: Bearer <your-jwt-token>"
```

### Using JavaScript/Fetch

**Register a new user:**
```javascript
const response = await fetch('/api/auth/register', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    name: 'John Doe',
    email: 'john.doe@example.com',
    password: 'SecurePassword123',
    role: 'student'
  })
});

const data = await response.json();
console.log(data);
```

**Login and store token:**
```javascript
const response = await fetch('/api/auth/login', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    email: 'john.doe@example.com',
    password: 'SecurePassword123'
  })
});

const data = await response.json();
if (data.success) {
  localStorage.setItem('token', data.data.token);
}
```

**Make authenticated request:**
```javascript
const token = localStorage.getItem('token');
const response = await fetch('/api/users/me', {
  headers: {
    'Authorization': `Bearer ${token}`
  }
});

const data = await response.json();
console.log(data);
```

---

## Future Endpoints

The following endpoints are planned for future releases:

### Assignments
- `GET /assignments` - List assignments
- `POST /assignments` - Create assignment (teacher/admin)
- `GET /assignments/:id` - Get assignment details
- `PUT /assignments/:id` - Update assignment (teacher/admin)
- `DELETE /assignments/:id` - Delete assignment (teacher/admin)

### Classes
- `GET /classes` - List user's classes
- `POST /classes` - Create class (teacher/admin)
- `GET /classes/:id` - Get class details
- `PUT /classes/:id` - Update class (teacher/admin)
- `POST /classes/:id/join` - Join class (student)

### Attendance
- `GET /attendance` - Get attendance records
- `POST /attendance` - Mark attendance (teacher/admin)
- `GET /attendance/stats` - Get attendance statistics

### Live Classes
- `GET /live-classes` - List live class sessions
- `POST /live-classes` - Create live session (teacher/admin)
- `POST /live-classes/:id/join` - Join live session

---

## Changelog

### Version 1.0.0 (Current)
- Authentication endpoints (register, login, logout)
- User profile management (get profile, update profile)
- Role-based access control middleware
- JWT token authentication
- Input validation with Zod schemas

### Planned Features
- Assignment management system
- Class and student management
- Attendance tracking
- Live class sessions
- Notification system
- Fee management
- Resource sharing
- Doubt resolution system

---

## Support

For API support and questions:
- Create an issue on GitHub
- Contact the development team
- Check the troubleshooting guide in the main README

---

## Security Considerations

1. **Always use HTTPS in production**
2. **Store JWT tokens securely** (not in localStorage for sensitive applications)
3. **Implement proper CORS policies**
4. **Use environment variables for sensitive configuration**
5. **Regularly rotate JWT secrets**
6. **Implement proper logging and monitoring**
7. **Keep dependencies updated**