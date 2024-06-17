import { connect } from "@/dbConfig/dbConfig"
import Video from "@/models/video"
import { NextRequest, NextResponse } from "next/server"

connect();

interface Videos{
    title : string,
    description : string,
    videoChannelName: string,
    thumbnail : string,
    videoLink: string,
    course : [string],
    likeCount: number,
    skill : [string],
}

function getYouTubeThumbnail(url: string): string {
    const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(regex);
    
    if (match && match[1]) {
        const videoId = match[1];
        // Construct the thumbnail URL
        const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
        return thumbnailUrl;
    } else {
        const error = 'Invalid YouTube URL';
        return error;
    }
}

export async function POST(request: NextRequest){
    const reqBody = await request.json()
    const {title, description, videoChannelName, videoLink, course , likeCount , skill}: Videos = reqBody;
    
    const thumbnailUrl = getYouTubeThumbnail(videoLink);
    if(thumbnailUrl === 'Invalid YouTube URL'){
        return NextResponse.json({message: 'Invalid YouTube URL'}, {status : 400});
    }
    const video = await Video.findOne({videoLink : videoLink});
    
    if(video){
        return NextResponse.json({ error: "Video already exists" }, { status: 400 })
    }
    
    try {
        const newVedio = new Video({
            title,
            description,
            videoChannelName,
            thumbnail : thumbnailUrl,
            videoLink,
            skill,
            course,
            likeCount,
        });
        await newVedio.save();
    
        return NextResponse.json({newVedio , message : "Uploaded successfully" } , {status : 200})
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 })
    }

}
