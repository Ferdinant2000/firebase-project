"use client";

import { useEffect } from "react";
import DefaultLayout from "@/layouts/default";
import Login from "@/pages/login";
import Home from "@/pages/home";
import { useAuth } from "@/context/AuthContext";

export default function IndexPage() {
  const { user } = useAuth() as unknown as {
    user: { uid: string; email?: string } | null;
  };
  console.log("user: ", user);

  return <DefaultLayout>{user ? <Home /> : <Login />}</DefaultLayout>;
}
