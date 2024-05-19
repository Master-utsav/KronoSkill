import { connect } from "@/dbConfig/dbConfig"
import User from "@/models/userModel"
import { NextRequest, NextResponse } from "next/server"
import { sendEmail } from "@/helpers/mailler"
import validator from "validator"

connect()

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const {email} = reqBody;
        if(!validator.isEmail(email)){
            return NextResponse.json({ error: "Invalid email" }, { status: 400 });
        }
      
        const user = await User.findOne({ email }).select("-password");
       
        if (!user) {
            return NextResponse.json({ error: "user not found" }, { status: 400 });
        }
        if (!user.isVerified) {
            return NextResponse.json({ error: "user is not verified" }, { status: 404 });
        }
        if(user.forgotPasswordSendTime !== undefined){
            const forgotPasswordSendTime = user.forgotPasswordSendTime.getTime();
            const currentTime = Date.now();
            const remainingTime =  forgotPasswordSendTime - currentTime;;
            const hours = Math.floor(remainingTime / (1000 * 60 * 60));
            const minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);
            if(remainingTime > 0){
               return NextResponse.json({error : `try after ${hours}hr ${minutes}min ${seconds}s`} , {status : 400})
            }
        }

        //send reset password
        await sendEmail({ email : user.email , emailType: "RESET", userId: user._id })
        
        return NextResponse.json({
            message: "mail send successfully",
            success: true,
        })

    } catch (error : any) {
        return NextResponse.json({error : error.message} , {status : 500})
    }
}