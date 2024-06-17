import { connect } from "@/dbConfig/dbConfig"
import Video from "@/models/video"
import { NextRequest, NextResponse  } from "next/server"

connect();

export async function POST(request: NextRequest){
    const requestBody = await request.json();
    const {skill} = requestBody;
    
    try{
        const video = await Video.find({skill: skill});
        return NextResponse.json({video , message : "fetched successfully"} ,{ status : 200})
    }
    catch(error){
        console.log(error);
        return NextResponse.json({error : "internal server error"} , {status : 500} )
    }
}