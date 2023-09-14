"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

export default function LoginPage() {
  const router = useRouter();

  // states
  const [user, setUser] = React.useState({
    email: "",
    password: "",
  });
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);

  // function for validate
  const onLogin = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/login", user);
      console.log("Login response", response.data);
      toast.success("Login success");
      router.push("/profile");
    } catch (error: any) {
      console.log("Login failed", error.message);
      toast.error("Login failed", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  useEffect(() => {
    const handleTabClose = () => {
      document.cookie =
        "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    };

    window.addEventListener("beforeunload", handleTabClose);

    return () => {
      // Clean up the event listener when the component unmounts
      window.removeEventListener("beforeunload", handleTabClose);
    };
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
        {/* for signup */}
        <Toaster position="top-center" reverseOrder={false} />
        <h1 className="text-4xl mb-[40px] font-serif font-bold">
          {loading ? "processsing" : "Login"}
        </h1>

        <hr className="bg-white h-1" />

        {/* for email */}
        <label htmlFor="email" className=" my-2  text-black font-serif ">
          {" "}
          Email
        </label>
        <input
          className=" p-2  border border-gray-300
        rounded-lg focus:outline-none focus:ring-4    text-black font-serif"
          type="email"
          id="email"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          placeholder="email"
        />

        {/* for password */}
        <label htmlFor="Password" className=" my-2   text-black font-serif ">
          {" "}
          Password
        </label>
        <input
          className=" p-2 border border-gray-300
        rounded-lg focus:outline-none focus:ring-4   text-black font-serif"
          type="password"
          id="password"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          placeholder="password"
        />
        <button
          onClick={onLogin}
          className="p-2 mt-4 border border-gray-300 
        rounded-lg mb-4 focus:outline-none focus:border-gray-600
        bg-green-300 text-black hover:bg-green-600 font-serif "
        >
          {" "}
          {buttonDisabled ? "No login" : "Login here"}
        </button>
        <Link
          href="/signup"
          className=" font-serif  hover:text-black
        
        "
        >
          {" "}
          Want to Register ? Signup here
        </Link>
        <Link
          href="/forgotpassword"
          className=" font-serif  hover:text-black
        
        "
        >
          {" "}
          Forgot password
        </Link>
      </div>
    </div>
  );
}
