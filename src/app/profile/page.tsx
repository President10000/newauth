"use client";

import axios from "axios";
import Link from "next/link";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import react, { useState } from "react";

export default function ProfilePage() {
  const router = useRouter();
  const [data, setData] = useState("nothing");

  const logout = async () => {
    try {
      const response = await axios.get("/api/users/logout");
      toast.success(response.data.message);
      router.push("/login");
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    }
  };
  const getUserDetails = async () => {
    const res = await axios.get("/api/users/me");
    setData(res.data.data._id);
    console.log(res.data);
    toast.success(res.data.message);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Toaster position="top-center" reverseOrder={false} />
      <h1>Profile</h1>
      <hr className="bg-white h-[2px]" />
      <p>Profile page</p>

      <h2 className=" bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded">
        {data === "nothing" ? (
          "Nothing"
        ) : (
          <Link href={`/profile/${data}`}>{data}</Link>
        )}
      </h2>
      <button
        className=" mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={logout}
      >
        Logout
      </button>
      <button
        className=" mt-4 bg-green-600 hover:bg-green-800 text-white font-bold py-2 px-4 rounded"
        onClick={getUserDetails}
      >
        user details
      </button>
    </div>
  );
}
