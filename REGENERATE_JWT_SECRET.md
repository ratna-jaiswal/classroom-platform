# 🔐 IMPORTANT: Generate Your JWT Secret

Your `.env.local` file now contains placeholder values for security.

## To restore your local development environment:

1. **Generate a new JWT secret:**
   ```bash
   node -e "console.log('JWT_SECRET=' + require('crypto').randomBytes(32).toString('hex'))"
   ```

2. **Update your `.env.local` file** with the generated secret

3. **Restart your development server:**
   ```bash
   pnpm dev
   ```

## Example output:
```
JWT_SECRET=a1b2c3d4e5f6789012345678901234567890abcdef1234567890abcdef123456
```

Copy this value and replace the placeholder in your `.env.local` file.

**Remember**: Never commit your actual JWT secret to version control!