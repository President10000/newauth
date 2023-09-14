import { NextResponse, NextRequest } from "next/server";

export async function GET() {
  try {
    const response = await NextResponse.json({
      message: "Logged out succesfull",
      success: true,
    });
    response.cookies.set("token", "", { httpOnly: true, expires: new Date(0) });
    return response;
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
