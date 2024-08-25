"use client"; // This enables the component to be a Client Component

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Navbar = () => {
  const [authToken, setAuthToken] = useState(true);
  const router = useRouter();

  const handleLogout = async () => {
    try {
      // Make a request to the logout API to clear the session
      const response = await fetch("/user/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        console.log("Logout successful");
        logout(); // Clear the token from the context and storage
        router.push("/login"); // Redirect to login page after logout
      } else {
        console.log("Failed to logout");
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <Link className="btn btn-ghost text-xl" href="/">
          BlogApp
        </Link>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal">
          <li>
            <Link href="/login">Login</Link>
          </li>
          <li>
            <Link href="/signup">Register</Link>
          </li>
          <li>
            <Link href="/create-blog" className="ml-3">
              Create-blog
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
