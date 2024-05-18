import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs"
connect();

interface NewPassword{
    token: string,
    newpassword: string,
    confirmpassword : string,
}

export async function POST(request: NextRequest) {
  function containsWhitespace(input: string): boolean {
    const whitespacePattern = /\s/;
    return whitespacePattern.test(input);
  }
  try {
    const reqBody = await request.json();
    const { token, newpassword, confirmpassword }:NewPassword = reqBody;
 
    const user = await User.findOne({ 
      $and :[{forgotPasswordToken: token},
         {forgotPasswordTokenExpiry: { $gt: Date.now() }}]
    });

    if (!user) {
      return NextResponse.json(
        { error: "Invalid token details" },
        { status: 400 }
      );
    }
    if (containsWhitespace(newpassword)) {
      return NextResponse.json({ error: "space not allowed" }, { status: 400 });
    }
    if((newpassword?.trim()).length <= 6 ) {
      return NextResponse.json({ error: "weak password" }, { status: 400 });
    }
    if (newpassword !== confirmpassword) {
      return NextResponse.json(
        { error: "password doesn't match" },
        { status: 400 }
      );
    }
    const salt =  await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(newpassword, salt);

    await User.findByIdAndUpdate(user._id, {
      $set: {
        password: hashedPassword,
      },
    });
    
    user.forgotPasswordToken = undefined;
    user.forgotPasswordTokenExpiry = undefined;

    await user.save();

    return NextResponse.json(
      {
        message: "password reset successfully",
        success: true,
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
