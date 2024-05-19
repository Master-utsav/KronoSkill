import { connect } from "@/dbConfig/dbConfig"
import { sendEmail } from "@/helpers/mailler";
import User from "@/models/userModel"
import { NextRequest, NextResponse } from "next/server"

connect()

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { email , userId} = reqBody
        
        const user = await User.findOne({$and : [{email} , {_id : userId}]})
        if (!user) {
           return NextResponse.json({error : "user doesn't exists"} , {status : 400})
        }
        
        if(user.isVerified){
            return NextResponse.json({error : "user already verified"} , {status : 400})
        }
        if(user?.emailSendTime !== undefined){
            const emailTime = user.emailSendTime.getTime();
            const currentTime = Date.now();
            const remainingTime = emailTime - currentTime;
            const hours = Math.floor(remainingTime / (1000 * 60 * 60));
            const minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);
            if(remainingTime > 0){
               return NextResponse.json({error : `try after ${hours}hr ${minutes}min ${seconds}s`} , {status : 400})
            }
        }
        
        await sendEmail({ email , emailType: "VERIFY", userId: userId })

        return NextResponse.json({
            message: "verification mail send successfully",
            success : true,
        } , {status : 200})

    } catch (error: any) {
        return NextResponse.json({error : error.message} , {status : 500})
    }
}