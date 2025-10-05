import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/lib/db";
import User from "@/models/User";
import { registerSchema } from "@/lib/validations/auth";
import {
  generateToken,
  cookieConfig,
  authenticateToken,
  hasRequiredRole,
} from "@/lib/auth";
import { ZodError } from "zod";

export async function POST(request: NextRequest) {
  try {
    // Authenticate the requesting user (must be admin)
    const authUser = await authenticateToken(request);
    if (!authUser || !hasRequiredRole(authUser.role, ["admin"])) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized: Only admins can create accounts",
        },
        { status: 403 }
      );
    }

    // Parse and validate request body
    const body = await request.json();
    const validatedData = registerSchema.parse(body);

    //Connect to DB
    await connectToDatabase();

    // Check if user already exists
    const existingUser = await User.findByEmail(validatedData.email);
    if (existingUser) {
      return NextResponse.json(
        { success: false, message: "User with this email already exists" },
        { status: 400 }
      );
    }

    // Create new user
    const user = new User({
      name: validatedData.name,
      email: validatedData.email,
      password: validatedData.password,
      role: validatedData.role, // Should be "teacher" or "student"
    });
    await user.save();

    // Generate JWT token for new user (optional)
    const token = generateToken(user);

    //  Return response
    const response = NextResponse.json(
      {
        success: true,
        message: "User account created by admin successfully",
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          isEmailVerified: user.isEmailVerified,
          createdAt: user.createdAt,
        },
      },
      { status: 201 }
    );

    // Optionally set cookie for new user (if you want auto-login)
    response.cookies.set("auth-token", token, cookieConfig);

    return response;
  } catch (error) {
    console.error("Admin registration error:", error);

    // Handle validation errors
    if (error instanceof ZodError) {
      return NextResponse.json(
        {
          success: false,
          error: "Validation Error",
          details: error.errors.map((err) => ({
            field: err.path.join("."),
            message: err.message,
          })),
        },
        { status: 400 }
      );
    }

    // Handle MongoDB duplicate key error
    if ((error as any).code === 11000) {
      return NextResponse.json(
        { success: false, message: "User with this email already exists" },
        { status: 400 }
      );
    }

    // Handle other errors
    return NextResponse.json(
      {
        success: false,
        error: "Server Error",
        message: "Something went wrong",
      },
      { status: 500 }
    );
  }
}
