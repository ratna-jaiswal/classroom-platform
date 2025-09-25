import { registerSchema, loginSchema } from '@/lib/validations/auth';

// Basic unit tests for validation schemas

describe('Auth Validation Schemas', () => {
  it('should validate a correct registration payload', () => {
    const validData = {
      name: 'John Doe',
      email: 'john@example.com',
      password: 'Password123',
      role: 'student',
    };

    const result = registerSchema.safeParse(validData);
    expect(result.success).toBe(true);
  });

  it('should reject invalid email', () => {
    const invalidData = {
      name: 'John Doe',
      email: 'not-an-email',
      password: 'Password123',
      role: 'student',
    };

    const result = registerSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
  });
});

