import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken"
import validator from "validator"

connect();

export async function POST(request: NextRequest) {
  function isValidUsername(username: string): boolean {
    const usernamePattern = /^[A-Za-z0-9_]+$/;
    return usernamePattern.test(username);
    }
  try {
    const reqBody = await request.json();
    const { identity, password } = reqBody;

    let inputEmail: string = "";
    let inputUsername: string = "";
    if (validator.isEmail(identity)) {
      inputEmail = identity;
    }
    else {
      inputUsername = identity;
    }

    const user = await User.findOne({
      $or: [{ email: identity }, { user_name: identity }],
    });
    
    if(!isValidUsername(inputUsername) && inputUsername?.trim() !== "") {
            return NextResponse.json({ error: "username accepts alphabets , _ , digits" }, { status: 400 });
    }
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    console.log("user exists");
    const validPassword = await bcryptjs.compare(password, user.password);
    if (!validPassword) {
      return NextResponse.json(
        { error: "check your password" },
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
          userId: user._id,
          username : user.user_name,
          firstname : user.first_name,
      })

      response.cookies.set("token", token, {
          httpOnly: true
      })

      return response;
      
  } catch (error : any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
