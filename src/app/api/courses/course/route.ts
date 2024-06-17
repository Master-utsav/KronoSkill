import { connect } from "@/dbConfig/dbConfig";
import Video from "@/models/video";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function POST(request: NextRequest) {
    try {
        const requestBody = await request.json() as { course: string };
        const { course } = requestBody;

        const videos = await Video.find({ course: course }).exec();
        
        const uniqueSkills = [...new Set(videos.reduce<string[]>((acc, current) => [...acc, ...current.skill], []))];
        return NextResponse.json({uniqueSkills , message : "fetched successfully"} , {status : 200});
    }
     catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
