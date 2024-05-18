import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import validator from "validator";

connect();

export async function POST(request : NextRequest) { 
    try {
        const reqBody = await request.json();
        const {email , userId} = reqBody;
        
        // const userValid = await User.findOne({_id : userId});
        // if(!userValid){
        //     return NextResponse.json({error : "⚠️ Warning userId didn't match"} , {status : 404})
        // }
        if(!validator.isEmail(email)){
            return NextResponse.json({error : "Invalid email address"} , {status : 404})
        }
        const user = await User.findOne({$and : [{email : email} , {_id : userId}]});

        if(!user){
            return NextResponse.json({error : "user not found"} , {status : 400})
        }
        
        const response = NextResponse.json({
            message: "Logout Successfully",
            success : true,
        })
        response.cookies.set("token" , "", {
            httpOnly: true,
            maxAge: 0
        },)

        return response;


    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}