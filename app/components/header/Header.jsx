import React from "react";
import { Home, List } from "lucide-react";
import LoginBtn from "./LoginBtn";
import AuthContextProvider from "@/lib/contexts/AuthContext";
import Link from "next/link";
export default function Header() {
  return (
    <nav className="flex justify-between px-7 py-3 border-b bg-black">
      <Link href="/">
      <img className="h-10" src="/image.png" alt="Logo"></img>
      </Link>
      <ul className="flex gap-6 items-center text-white">
        <li className="flex items-center gap-1">
          <Home />
          Home
        </li>
        <li className="flex items-center gap-1">
          <List />
          Blogs
        </li>
      </ul>
      <AuthContextProvider>
        <LoginBtn />
      </AuthContextProvider>
    </nav>
  );
}
