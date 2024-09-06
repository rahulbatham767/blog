import { cookies } from "next/headers";
import { NextResponse } from "next/server";
export async function POST() {
  try {
    // Clear the cookie by setting its expiration date in the past
    cookies().set("authToken", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      expires: new Date(0), // Expiration date in the past
      path: "/",
    });

    return new NextResponse(JSON.stringify({ success: "Logout successful" }), {
      status: 200,
    });
  } catch (error) {
    return new NextResponse(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}
