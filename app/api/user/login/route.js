import connectMongoDB from "@/app/lib/mongodb";
import { NextResponse } from "next/server";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
export async function POST(req) {
  try {
    const { email, password } = await req.json();

    await connectMongoDB();

    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 400 }
      );
    }

    // Compare the password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 400 }
      );
    }

    // Generate a JWT token
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    cookies().set("authToken", token, {
      httpOnly: true,
      sameSite: "strict",
      maxAge: 60 * 60, // 1 hour
      path: "/", // Ensure the cookie is available for all routes
    });
    return NextResponse.json({
      success: "Login successful",
      data: {
        token,
        user: {
          firstname: user.firstname,
          lastname: user.lastname,
          email: user.email,
        },
      },
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
