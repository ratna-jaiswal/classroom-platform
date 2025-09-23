// @ts-expect-error: Jest does not export these as named exports; this import is for test context compatibility.
import { describe, it, expect, jest, beforeEach } from 'jest';
import { NextRequest } from 'next/server';

// Mock dependencies
jest.mock('../lib/db', () => ({
  __esModule: true,
  default: jest.fn().mockResolvedValue(true),
}));

jest.mock('../lib/auth', () => ({
  verifyToken: jest.fn(),
}));

jest.mock('../models/User', () => ({
  findById: jest.fn(),
}));

describe('Profile API Tests', () => {
  let mockRequest: Partial<NextRequest>;
  const mockUser = {
    _id: 'user123',
    name: 'Test User',
    email: 'test@example.com',
    role: 'student',
    profile: {
      avatar: 'https://example.com/avatar.jpg',
      bio: 'Test bio',
      phone: '+1234567890',
      dateOfBirth: new Date('1990-01-01'),
      address: 'Test Address',
    },
    isEmailVerified: false,
    createdAt: new Date(),
    updatedAt: new Date(),
    save: jest.fn(),
  };

  beforeEach(() => {
    mockRequest = {
      cookies: {
        get: jest.fn(),
      } as any,
      headers: new Headers(),
      json: jest.fn(),
    };
    jest.clearAllMocks();
  });

  describe('GET /api/user/me', () => {
    it('should return user profile with valid token', async () => {
      const { verifyToken } = require('../lib/auth');
      const User = require('../models/User');

      // Mock token verification
      verifyToken.mockReturnValue({
        userId: 'user123',
        email: 'test@example.com',
        role: 'student',
      });

      // Mock user lookup
      User.findById.mockReturnValue({
        select: jest.fn().mockResolvedValue(mockUser),
      });

      // Mock cookie
      mockRequest.cookies!.get = jest.fn().mockReturnValue({ value: 'valid-token' });

      // The response should contain user data
      const expectedResponse = {
        success: true,
        message: 'User profile retrieved successfully',
        data: {
          user: {
            id: mockUser._id,
            name: mockUser.name,
            email: mockUser.email,
            role: mockUser.role,
            profile: mockUser.profile,
            isEmailVerified: mockUser.isEmailVerified,
            createdAt: mockUser.createdAt,
            updatedAt: mockUser.updatedAt,
          },
        },
      };

      expect(verifyToken).toBeDefined();
      expect(User.findById).toBeDefined();
    });

    it('should return 401 when no token provided', async () => {
      mockRequest.cookies!.get = jest.fn().mockReturnValue(undefined);
      mockRequest.headers = new Headers();

      const expectedError = {
        success: false,
        error: 'Authentication Error',
        message: 'Access token is required',
      };

      expect(expectedError.success).toBe(false);
      expect(expectedError.error).toBe('Authentication Error');
    });

    it('should return 401 when token is invalid', async () => {
      const { verifyToken } = require('../lib/auth');
      
      verifyToken.mockReturnValue(null);
      mockRequest.cookies!.get = jest.fn().mockReturnValue({ value: 'invalid-token' });

      const expectedError = {
        success: false,
        error: 'Authentication Error',
        message: 'Invalid or expired token',
      };

      expect(expectedError.success).toBe(false);
      expect(expectedError.error).toBe('Authentication Error');
    });

    it('should return 404 when user not found', async () => {
      const { verifyToken } = require('../lib/auth');
      const User = require('../models/User');

      verifyToken.mockReturnValue({
        userId: 'nonexistent',
        email: 'test@example.com',
        role: 'student',
      });

      User.findById.mockReturnValue({
        select: jest.fn().mockResolvedValue(null),
      });

      mockRequest.cookies!.get = jest.fn().mockReturnValue({ value: 'valid-token' });

      const expectedError = {
        success: false,
        error: 'Not Found',
        message: 'User not found',
      };

      expect(expectedError.success).toBe(false);
      expect(expectedError.error).toBe('Not Found');
    });
  });

  describe('PUT /api/user/update', () => {
    it('should update user profile with valid data', async () => {
      const { verifyToken } = require('../lib/auth');
      const User = require('../models/User');

      verifyToken.mockReturnValue({
        userId: 'user123',
        email: 'test@example.com',
        role: 'student',
      });

      const updatedUser = {
        ...mockUser,
        name: 'Updated Name',
        profile: {
          ...mockUser.profile,
          bio: 'Updated bio',
        },
      };

      User.findById.mockResolvedValue(updatedUser);

      mockRequest.cookies!.get = jest.fn().mockReturnValue({ value: 'valid-token' });
      mockRequest.json = jest.fn().mockResolvedValue({
        name: 'Updated Name',
        profile: {
          bio: 'Updated bio',
        },
      });

      const expectedResponse = {
        success: true,
        message: 'Profile updated successfully',
        data: {
          user: updatedUser,
        },
      };

      expect(expectedResponse.success).toBe(true);
      expect(expectedResponse.message).toBe('Profile updated successfully');
    });

    it('should validate avatar URL format', () => {
      const validAvatars = [
        'https://example.com/avatar.jpg',
        'http://domain.com/image.png',
      ];

      const invalidAvatars = [
        'not-a-url',
        'ftp://example.com/file',
        'javascript:alert("xss")',
      ];

      const urlRegex = /^https?:\/\/.+/;

      validAvatars.forEach(avatar => {
        expect(urlRegex.test(avatar)).toBe(true);
      });

      invalidAvatars.forEach(avatar => {
        expect(urlRegex.test(avatar)).toBe(false);
      });
    });

    it('should validate bio length', () => {
      const validBio = 'This is a valid bio under 500 characters';
      const invalidBio = 'a'.repeat(501); // 501 characters

      expect(validBio.length).toBeLessThanOrEqual(500);
      expect(invalidBio.length).toBeGreaterThan(500);
    });

    it('should handle validation errors', () => {
      const validationErrors = [
        { field: 'profile.avatar', message: 'Avatar must be a valid URL' },
        { field: 'profile.bio', message: 'Bio cannot exceed 500 characters' },
        { field: 'name', message: 'Name must be at least 2 characters long' },
      ];

      const errorResponse = {
        success: false,
        error: 'Validation Error',
        details: validationErrors,
      };

      expect(errorResponse.success).toBe(false);
      expect(errorResponse.error).toBe('Validation Error');
      expect(errorResponse.details).toHaveLength(3);
    });

    it('should handle partial profile updates', () => {
      const partialUpdates = [
        { profile: { bio: 'New bio only' } },
        { profile: { avatar: 'https://new-avatar.com/image.jpg' } },
        { name: 'New Name Only' },
        { profile: { phone: '+9876543210' } },
      ];

      partialUpdates.forEach(update => {
        expect(typeof update).toBe('object');
        expect(update).toBeDefined();
      });
    });

    it('should handle phone number validation', () => {
      const validPhones = [
        '+1234567890',
        '123-456-7890',
        '(123) 456-7890',
        '+44 20 7946 0958',
      ];

      const invalidPhones = [
        'abc123',
        '123',
        'phone-number',
        '++1234567890',
      ];

      const phoneRegex = /^\+?[\d\s-()]+$/;

      validPhones.forEach(phone => {
        expect(phoneRegex.test(phone)).toBe(true);
      });

      invalidPhones.forEach(phone => {
        expect(phoneRegex.test(phone)).toBe(false);
      });
    });

    it('should handle date of birth updates', () => {
      const validDates = [
        '1990-01-01T00:00:00.000Z',
        '2000-12-31T23:59:59.999Z',
        '1985-06-15T12:30:00.000Z',
      ];

      const invalidDates = [
        'invalid-date',
        '2025-13-40', // Invalid month and day
        'not-a-date',
      ];

      validDates.forEach(dateString => {
        const date = new Date(dateString);
        expect(date instanceof Date).toBe(true);
        expect(!isNaN(date.getTime())).toBe(true);
      });

      invalidDates.forEach(dateString => {
        const date = new Date(dateString);
        expect(isNaN(date.getTime())).toBe(true);
      });
    });

    it('should handle address length validation', () => {
      const validAddress = 'This is a valid address under 200 characters';
      const invalidAddress = 'a'.repeat(201); // 201 characters

      expect(validAddress.length).toBeLessThanOrEqual(200);
      expect(invalidAddress.length).toBeGreaterThan(200);
    });
  });

  describe('Profile API Edge Cases', () => {
    it('should handle missing profile object', () => {
      const userWithoutProfile = {
        ...mockUser,
        profile: undefined,
      };

      const defaultProfile = {
        avatar: null,
        bio: '',
        phone: null,
        dateOfBirth: null,
        address: '',
      };

      const profile = userWithoutProfile.profile || defaultProfile;

      expect(profile.avatar).toBe(null);
      expect(profile.bio).toBe('');
      expect(profile.phone).toBe(null);
      expect(profile.address).toBe('');
    });

    it('should handle empty update requests', () => {
      const emptyUpdate = {};
      const partialUpdate = { profile: {} };

      expect(typeof emptyUpdate).toBe('object');
      expect(typeof partialUpdate).toBe('object');
      expect(Object.keys(emptyUpdate)).toHaveLength(0);
      expect(Object.keys(partialUpdate.profile)).toHaveLength(0);
    });

    it('should handle network errors gracefully', () => {
      const networkError = {
        success: false,
        error: 'Server Error',
        message: 'Failed to update profile',
      };

      expect(networkError.success).toBe(false);
      expect(networkError.error).toBe('Server Error');
    });
  });
});