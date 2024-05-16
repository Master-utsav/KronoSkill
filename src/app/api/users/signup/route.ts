import { connect } from "@/dbConfig/dbConfig"
import User from "@/models/userModel"
import { NextRequest, NextResponse } from "next/server"
import bcryptjs from "bcryptjs"
import { sendEmail } from "@/helpers/mailler"
import { error } from "console"

connect()

export async function POST(request :NextRequest) {
    try {
        const reqBody = await request.json()
        const { firstname, lastname, username, password, email, confirmpassword } = reqBody

        const user = await User.findOne({
               $and: [{ email }, { user_name: username }]})
        if (user) {
            return NextResponse.json({ error: "user already exists" }, { status: 400 });
        }

        const salt =  await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);
        
        const newUser = new User({
            first_name: firstname,
            last_name: lastname,
            user_name: username,
            email,
            password : hashedPassword,
        })

        const savedUser = await newUser.save();
       

        //send verification email
        await sendEmail({ email, emailType: "VERIFY", userId: savedUser._id })
        
        return NextResponse.json({
            message: "User registerd successfully",
            success: true,
            savedUser
        })

    } catch (error : any) {
        return NextResponse.json({error : error.message} , {status : 500})
    }
}