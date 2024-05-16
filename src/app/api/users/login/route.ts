import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken"

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { identity, password } = reqBody;
    const user = await User.findOne({
      $or: [{ email: identity }, { user_name: identity }],
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    console.log("user exists");
    const validPassword = await bcryptjs.compare(password, user.password);
    if (!validPassword) {
      return NextResponse.json(
        { error: "check your credentials" },
        { status: 404 }
      );
      }
    
      const tokenData = {
          id: user._id,
      }

      const token = jwt.sign(tokenData, process.env.TOKEN_SECRET!, { expiresIn: '10d' })
      
      const response = NextResponse.json({
          message: "logged in Success",
          success : true,
      })

      response.cookies.set("token", token, {
          httpOnly: true
      })

      return response;
      
  } catch (error : any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
