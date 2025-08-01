"use client";
import { useSession } from "next-auth/react";
import React from "react";

const Home = () => {
  const { data: session } = useSession();
  console.log("Session data:", session);
  return <div className="w-full min-h-screen">NoteWords</div>;
};

export default Home;
