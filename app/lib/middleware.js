import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function middleware(req) {
  const token = req.cookies.get("authToken"); // Assuming the JWT is stored in a cookie

  const pathname = req.nextUrl.pathname;

  // Paths that should not be accessible to authenticated users
  const authPages = ["/login", "/signup"];
  if (token) {
    try {
      // Verify the token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // If the token is valid and the user is trying to access auth pages, redirect to home
      if (authPages.includes(pathname)) {
        return NextResponse.redirect(new URL("/", req.url));
      }

      // Attach the decoded user info to the request if needed
      req.user = decoded;

      // Continue to the requested page
      return NextResponse.next();
    } catch (err) {
      // If token verification fails, remove the token and redirect to login
      const res = NextResponse.redirect(new URL("/login", req.url));
      res.cookies.delete("authToken"); // Clear the invalid token
      return res;
    }
  } else {
    // If no token is found and the user tries to access protected pages, redirect to login
    if (!authPages.includes(pathname)) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  // Continue to the requested page if the user is unauthenticated and tries to access auth pages
  return NextResponse.next();
}

// List of paths where the middleware should apply
export const config = {
  matcher: ["/signup", "/login"], // Adjust paths as needed
};
