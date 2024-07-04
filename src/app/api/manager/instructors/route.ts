import { connect } from "@/dbConfig/dbConfig";
import Instructor from "@/models/instructors";
import { NextRequest, NextResponse } from "next/server";
import axios from 'axios';

connect();


interface Instructor{
    channelName : string,
    image : string,
    skill : string,
    channelId : string,
    channelLink: string
}

const getChannelAvatar = async (channelId: string) => {
  try {
    const response = await axios.get(`https://www.googleapis.com/youtube/v3/channels`, {
      params: {
        part: 'snippet',
        id: channelId,
        key: process.env.NEXT_PRIVATE_YOUTUBE_V3_API_KEY,
      },
    });
   
    const channelAvatar = response.data.items[0].snippet.thumbnails.medium.url;
    const channelTitle = response.data.items[0].snippet.title;
    const customURL = response.data.items[0].snippet.customUrl;
    const channelLink = `https://www.youtube.com/${customURL}`
    return {channelAvatar: channelAvatar , channelTitle : channelTitle , channelLink: channelLink};
  } catch (error) {
    console.error(error);
    return {message : "error occur in fetching the image url"};
  }
};


export async function POST(request: NextRequest) {
    const requestBody = await request.json();
    const {skill, channelId} = requestBody;
    
    const regex = /^[a-zA-Z0-9_-]{11,}$/;

    if (!regex.test(channelId)) {
        return NextResponse.json({ message: "Invalid channel ID" }, { status: 400 });
    }

    const val:any= await getChannelAvatar(channelId);
    
    try {
       
        const inst = await Instructor.find({channelId : channelId });
        const instSize:number = inst.length;

        if(instSize>=1){
            return NextResponse.json({message : "Channel already exist"})
        }
       
        const newInstructor = new Instructor<Instructor>({
            channelName : val.channelTitle,
            image: val.channelAvatar,
            skill,
            channelId,
            channelLink: val.channelLink,
        });
        await newInstructor.save();
        return NextResponse.json({newInstructor , message : "Uploaded successfully"} , {status : 200});
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "error in adding new instructor" }, { status: 500 });
    }
}

export async function GET(){

    try {
        const instructors = await Instructor.find();
        return NextResponse.json({instructors , message : "Fetched successfully"} , {status : 200});
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "error in fetching insturctors" }, { status: 500 });
    }

}
