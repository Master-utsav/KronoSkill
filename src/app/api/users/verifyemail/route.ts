import { connect } from "@/dbConfig/dbConfig"
import User from "@/models/userModel"
import { NextRequest, NextResponse } from "next/server"

connect()

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { token } = reqBody
        
        const user = await User.findOne({ verifyToken: token, verifyTokenExpiry: { $gt: Date.now() } })
   
        if (!user) {
           return NextResponse.json({error : "Invalid token details"} , {status : 400})
        }
       
        user.isVerified = true
        user.verifyToken = undefined
        user.verifyTokenExpiry = undefined
        user.emailSendTime = undefined

        await user.save();

        return NextResponse.json({
            message: "email verified successfully",
            isVerify : true,
            success : true,
        } , {status : 200})


    } catch (error: any) {
        return NextResponse.json({error : error.message} , {status : 500})
    }
}