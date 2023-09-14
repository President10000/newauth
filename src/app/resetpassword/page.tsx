"use client";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function Resetpassword() {
  const [password, setpassword] = useState("");
  const [confirmpassword, setconfirmpassword] = useState("");
  const [token, setToken] = useState("");

  const [loading, setLoading] = useState(false);

  const resetpassword = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/resetpassword", {
        token,
        password,
        confirmpassword,
      });
      console.log("reset password response", response.data);
      toast.success("reset password success");
      setLoading(false);
    } catch (error: any) {
      console.log("reset password failed", error.message);
      toast.error("reset password failed", error.message);
    }
  };

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");
  }, []);

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
          {loading ? "processsing" : "Enter new password"}
        </h1>

        <label htmlFor="Password" className=" my-2  text-black font-serif ">
          {" "}
          Password
        </label>
        <input
          className=" p-2  border border-gray-300
        rounded-lg focus:outline-none focus:ring-4    text-black font-serif"
          type="password"
          id="Password"
          value={password}
          onChange={(e) => setpassword(e.target.value)}
          placeholder="Password"
        />
        <label
          htmlFor="confirmpassword"
          className=" my-2  text-black font-serif "
        >
          {" "}
          Confirm Password{" "}
        </label>
        <input
          className=" p-2  border border-gray-300
        rounded-lg focus:outline-none focus:ring-4    text-black font-serif"
          type="confirmpassword"
          id="confirmpassword"
          value={confirmpassword}
          onChange={(e) => setconfirmpassword(e.target.value)}
          placeholder="Confirm password"
        />

        <button
          onClick={resetpassword}
          className="p-2 mt-4 border border-gray-300 
        rounded-lg mb-4 focus:outline-none focus:border-gray-600
        bg-green-300 text-black hover:bg-green-600 font-serif "
        >
          {"click here to reset password"}
        </button>
        <Link
          href="/login"
          className=" font-serif  hover:text-black
        
        "
        >
          {" "}
          Click here to login
        </Link>
      </div>
    </div>
  );
}
