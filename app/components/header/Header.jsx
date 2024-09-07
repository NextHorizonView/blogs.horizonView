import React from "react";
import { Contact, Home, List } from "lucide-react";
import LoginBtn from "./LoginBtn";
import AuthContextProvider from "@/lib/contexts/AuthContext";
import Link from "next/link";
export default function Header() {
  return (
    <nav className="flex justify-between px-7 py-3 border-b bg-black items-center ">
      <Link href="/">
      <img className="h-10" src="/image.png" alt="Logo"></img>
      </Link>
      <ul className="flex gap-6 items-center text-white text-xl">
        <Link href={"/"}>
        <li className="flex items-center gap-1">
          <Home />
          Home
        </li>
        </Link>
        <Link href={"/categories"}>
        <li className="flex items-center gap-1">
          <List />
          Categories
        </li>
        </Link>
        <Link href={"https://www.horizonview.in/contact"}>
        <li className="flex items-center gap-1">
          <Contact />
          Contact Us
        </li>
        </Link>
      </ul>
      <AuthContextProvider>
        <LoginBtn />
      </AuthContextProvider>
    </nav>
  );
}
