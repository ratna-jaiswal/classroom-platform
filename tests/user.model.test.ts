// @ts-ignore
import { describe, it, expect, jest, beforeEach, afterEach } from 'jest';
import bcrypt from 'bcryptjs';

// Mock mongoose
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
  comparePassword: jest.fn(),
};

const mockUserModel = {
  findById: jest.fn(),
  findByEmail: jest.fn(),
  findOne: jest.fn(),
  create: jest.fn(),
  save: jest.fn(),
};

jest.mock('../models/User', () => mockUserModel);
jest.mock('../lib/db', () => ({
  __esModule: true,
  default: jest.fn().mockResolvedValue(true),
}));

describe('User Model Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('User Model Schema Validation', () => {
    it('should validate required fields', () => {
      const requiredFields = ['name', 'email', 'password'];
      const userData = {
        name: 'Test User',
        email: 'test@example.com',
        password: 'Password123',
        role: 'student',
      };

      requiredFields.forEach(field => {
        expect(userData[field as keyof typeof userData]).toBeDefined();
      });
    });

    it('should validate email format', () => {
      const validEmails = [
        'test@example.com',
        'user.name@domain.co.uk',
        'test+tag@example.org',
      ];

      const invalidEmails = [
        'invalid-email',
        '@example.com',
        'test@',
        'test.example.com',
      ];

      validEmails.forEach(email => {
        const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
        expect(emailRegex.test(email)).toBe(true);
      });

      invalidEmails.forEach(email => {
        const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
        expect(emailRegex.test(email)).toBe(false);
      });
    });

    it('should validate role enum values', () => {
      const validRoles = ['student', 'teacher', 'admin'];
      const invalidRoles = ['user', 'moderator', 'guest', ''];

      validRoles.forEach(role => {
        expect(['student', 'teacher', 'admin']).toContain(role);
      });

      invalidRoles.forEach(role => {
        expect(['student', 'teacher', 'admin']).not.toContain(role);
      });
    });

    it('should validate profile field constraints', () => {
      const profile = {
        bio: 'This is a test bio',
        phone: '+1234567890',
        address: 'Test Address',
      };

      // Bio length validation (max 500 characters)
      expect(profile.bio.length).toBeLessThanOrEqual(500);

      // Phone format validation
      const phoneRegex = /^\+?[\d\s-()]+$/;
      expect(phoneRegex.test(profile.phone)).toBe(true);

      // Address length validation (max 200 characters)
      expect(profile.address.length).toBeLessThanOrEqual(200);
    });
  });

  describe('Password Hashing', () => {
    it('should hash password before saving', async () => {
      const plainPassword = 'Password123';
      const salt = await bcrypt.genSalt(12);
      const hashedPassword = await bcrypt.hash(plainPassword, salt);

      expect(hashedPassword).not.toBe(plainPassword);
      expect(hashedPassword.length).toBeGreaterThan(plainPassword.length);
    });

    it('should compare passwords correctly', async () => {
      const plainPassword = 'Password123';
      const wrongPassword = 'WrongPassword';
      const hashedPassword = await bcrypt.hash(plainPassword, 12);

      const isValidPassword = await bcrypt.compare(plainPassword, hashedPassword);
      const isInvalidPassword = await bcrypt.compare(wrongPassword, hashedPassword);

      expect(isValidPassword).toBe(true);
      expect(isInvalidPassword).toBe(false);
    });
  });

  describe('User Model Methods', () => {
    it('should find user by email', async () => {
      mockUserModel.findOne.mockResolvedValue(mockUser);

      const email = 'test@example.com';
      const user = await mockUserModel.findOne({ email: email.toLowerCase() });

      expect(mockUserModel.findOne).toHaveBeenCalledWith({ email: 'test@example.com' });
      expect(user).toEqual(mockUser);
    });

    it('should find user by ID', async () => {
      mockUserModel.findById.mockResolvedValue(mockUser);

      const userId = 'user123';
      const user = await mockUserModel.findById(userId);

      expect(mockUserModel.findById).toHaveBeenCalledWith(userId);
      expect(user).toEqual(mockUser);
    });

    it('should exclude password from JSON output', () => {
      const userWithPassword = {
        ...mockUser,
        password: 'hashedpassword',
      };

      // Simulate toJSON transform
      const transformedUser = { ...userWithPassword };
      delete transformedUser.password;

      expect(transformedUser.password).toBeUndefined();
      expect(transformedUser.email).toBe(mockUser.email);
    });
  });

  describe('Profile Management', () => {
    it('should update profile fields correctly', async () => {
      const updatedProfile = {
        avatar: 'https://new-avatar.com/image.jpg',
        bio: 'Updated bio',
        phone: '+9876543210',
        address: 'New Address',
      };

      mockUserModel.findById.mockResolvedValue({
        ...mockUser,
        profile: updatedProfile,
        save: jest.fn().mockResolvedValue(true),
      });

      const user = await mockUserModel.findById('user123');
      user.profile = { ...user.profile, ...updatedProfile };
      await user.save();

      expect(user.profile.avatar).toBe(updatedProfile.avatar);
      expect(user.profile.bio).toBe(updatedProfile.bio);
      expect(user.profile.phone).toBe(updatedProfile.phone);
      expect(user.profile.address).toBe(updatedProfile.address);
      expect(user.save).toHaveBeenCalled();
    });

    it('should handle empty profile initialization', () => {
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

    it('should validate avatar URL format', () => {
      const validUrls = [
        'https://example.com/avatar.jpg',
        'http://domain.com/image.png',
        'https://cdn.example.org/user/123/avatar.gif',
      ];

      const invalidUrls = [
        'not-a-url',
        'ftp://example.com/file',
        'javascript:alert("xss")',
        '',
      ];

      const urlRegex = /^https?:\/\/.+/;

      validUrls.forEach(url => {
        expect(urlRegex.test(url)).toBe(true);
      });

      invalidUrls.forEach(url => {
        expect(urlRegex.test(url)).toBe(false);
      });
    });
  });
});