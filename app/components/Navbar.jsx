"use client"; // This enables the component to be a Client Component

import Link from "next/link";
import { useRouter } from "next/navigation";
import useBlogStore from "../store/useBlogStore";

const Navbar = () => {
  const router = useRouter();
  const { loggedIn, logout } = useBlogStore();
  const handleLogout = async () => {
    logout();
  };
  console.log(loggedIn);
  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <Link className="btn btn-ghost text-xl" href="/">
          BlogApp
        </Link>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal">
          {loggedIn ? (
            <li>
              <button onClick={handleLogout}>LogOut</button>
            </li>
          ) : (
            <>
              <li>
                <Link href="/login">Login</Link>
              </li>
              <li>
                <Link href="/signup">Register</Link>
              </li>
            </>
          )}

          <li>
            <Link href="/createblog" className="ml-3">
              Create-blog
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
