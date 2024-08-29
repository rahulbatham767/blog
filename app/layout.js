import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";

import Toastify from "./components/Toastify";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Blog Application",
  description: "Blog Application for posting Blogs",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        <Toastify />
        {children}
      </body>
    </html>
  );
}
