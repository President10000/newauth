"use client";
import axios from "axios";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function VerifyEmailPage() {
  const [email, setEmail] = useState("");

  const [loading, setLoading] = useState(false);

  const verifyUserEmail = async () => {
    try {
      setLoading(true);
      await axios.post("/api/users/forgotpassword", { email });
      toast.success("Email verification sent");
    } catch (error: any) {
      toast.error("user does not found");
      console.log(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <div
        className="flex flex-col items-center
                   justify-center  py-2 h-[600px]  
                   w-[400px]  rounded-lg shadow-md
                    bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30%
                     to-emerald-500 to-90%"
      >
        <Toaster position="top-center" reverseOrder={false} />
        <h1 className="text-4xl mb-[40px] font-serif font-bold">
          {loading ? "processsing" : "Enter your email"}
        </h1>
        <label htmlFor="email" className=" my-2  text-black font-serif ">
          {" "}
          Email
        </label>
        <input
          className=" p-2  border border-gray-300
        rounded-lg focus:outline-none focus:ring-4    text-black font-serif"
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="email"
        />

        <button
          onClick={() => verifyUserEmail()}
          className="p-2 mt-4 border border-gray-300 
        rounded-lg mb-4 focus:outline-none focus:border-gray-600
        bg-green-300 text-black hover:bg-green-600 font-serif "
        >
          {"send verification email"}
        </button>

        <Link href="/login" className=" font-serif  hover:text-black ">
          want to login?
        </Link>
      </div>
    </div>
  );
}
