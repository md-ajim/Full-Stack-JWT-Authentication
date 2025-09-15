"use client";


import { useSession } from "next-auth/react";
import Navbar02Page from "@/components/layout/navbar/navbar";
import Footer04Page from "@/components/layout/footer-04/footer-04";
export default function Home() {
  const { data: session } = useSession();

  console.log(session, "session");

  return (
    <>
      <Navbar02Page />
      <div className=" max-w-screen-xl mx-auto px-4 md:px-0 h-screen">
        <h1 className=" text-red-800  text-2xl"> This is a home page </h1>
    
      </div>
      <Footer04Page />
    </>
  );
}
