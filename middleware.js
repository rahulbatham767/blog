import { NextResponse } from "next/server";

console.log("middleware");
export function middleware(req) {
  // Get the auth token from the session (or cookies)
  const authToken = req.cookies.get("authToken");

  // Define paths that should be restricted when logged in
  const restrictedPaths = ["/login", "/signup"];

  // Check if the request path is restricted and user is logged in
  if (restrictedPaths.includes(req.nextUrl.pathname) && authToken) {
    // Redirect to the home page or another appropriate page
    return NextResponse.redirect(new URL("/", req.url));
  }
  console.log(authToken);
  // Allow access to the create-blog and root paths if logged in
  const allowedPaths = ["/create-blog"];
  if (!authToken && req.nextUrl.pathname === "/create-blog") {
    // Redirect to the login page if trying to access /create-blog without authToken
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (allowedPaths.includes(req.nextUrl.pathname) && authToken) {
    console.log("allowedPaths: " + allowedPaths);
    return NextResponse.next(); // Continue with the request
  }

  // For other paths, you can add your logic or simply allow access
  return NextResponse.next(); // Continue with the request
}

// Apply middleware to specific routes
export const config = {
  matcher: ["/login", "/signup", "/create-blog", "/"],
};
