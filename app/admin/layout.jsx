"use client"
import AuthContextProvider, { useAuth } from "@/lib/contexts/AuthContext";
import Sidebar from "./components/Sidebar";
import React from "react";
import { useAdmin } from "@/lib/firebase/admin/read";

export default function Layout({ children }) {
  return (
    <AuthContextProvider>
      <InnerLayout>{children}</InnerLayout>
    </AuthContextProvider>
  );
}

function InnerLayout({ children }) {
  const { user, isLoading: authIsLoading } = useAuth();

  // Avoid calling useAdmin if the user is not loaded yet
  const { data, error, isLoading } = useAdmin({ uid: user?.uid });

  if (authIsLoading) {
    return <h2>Loading authentication...</h2>;
  }

  if (!user) {
    return <h1>No user found. Please log in.</h1>;
  }
  if(user)
  {
    console.log("User",user);
  }
  if (isLoading) {
    return <h2>Loading admin data...</h2>;
  }

  if (error) {
    return <p>{error.message}</p>;
  }

  if (!data) {
    return (
      <div>
        <h1>You are not admin</h1>
      </div>
    );
  }

  return (
    <section className="flex">
      <Sidebar />
      {children}
    </section>
  );
}
