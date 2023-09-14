"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

export default function SignupPage() {
  const router = useRouter();

  const [user, setUser] = React.useState({
    email: "",
    password: "",
    username: "",
  });
  const [buttonDisabled, setButtonDisabled] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const onSignup = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/signup", user);
      toast.success("Signup success");
      console.log("Signup response", response.data);
      router.push("/login");
    } catch (error: any) {
      toast.error("singup failed", error.message);
      console.log("Signup failed", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (
      user.email.length > 0 &&
      user.password.length > 0 &&
      user.username.length > 0
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <div
        className="flex flex-col items-center
    justify-center  py-2
     h-[600px]  w-[400px]  rounded-lg shadow-md
      bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90%"
      >
        {/* for signup */}
        <Toaster position="top-center" reverseOrder={false} />
        <h1 className="text-4xl mb-[40px] font-serif font-bold">
          {loading ? "processsing" : "Signup"}
        </h1>
        <hr />
        <label htmlFor="username" className=" my-2  text-black font-serif ">
          {" "}
          Username
        </label>
        <input
          className=" p-2  border border-gray-300
        rounded-lg focus:outline-none focus:ring-4  text-black font-serif"
          type="text"
          id="username"
          value={user.username}
          onChange={(e) => setUser({ ...user, username: e.target.value })}
          placeholder="username"
        />

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
          onClick={onSignup}
          className="p-2 mt-4 border border-gray-300 
        rounded-lg mb-4 focus:outline-none focus:border-gray-600
        bg-green-300 text-black hover:bg-green-600 font-serif "
        >
          {" "}
          {buttonDisabled ? "No Signup" : "Signup"}
        </button>
        <Link
          href="/login"
          className=" font-serif  hover:text-black
        
        "
        >
          {" "}
          Already have an account? Login here
        </Link>
      </div>
    </div>
  );
}
