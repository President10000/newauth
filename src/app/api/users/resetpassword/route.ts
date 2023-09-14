import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { token, password, confirmpassword } = reqBody;
    console.log(token);

    const user = await User.findOne({
      forgotPasswordToken: token,
      forgotPasswordTokenExpire: { $gt: Date.now() },
    });
    if (!user) {
      return NextResponse.json({ error: "Invalid token" }, { status: 400 });
    }
    if (password !== confirmpassword) {
      return NextResponse.json(
        { error: "Password and confirm password should be same" },
        { status: 400 }
      );
    } else {
      const salt = await bcryptjs.genSalt(10);
      const hashedPassword = await bcryptjs.hash(confirmpassword, salt);
      user.password = hashedPassword;
      console.log(user);
    }
    console.log(user);
    user.isVerified = true;
    user.forgotPasswordToken = undefined;
    user.forgotPasswordTokenExpire = undefined;
    await user.save();

    return NextResponse.json({
      message: "Email verified successfully",
      success: true,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
