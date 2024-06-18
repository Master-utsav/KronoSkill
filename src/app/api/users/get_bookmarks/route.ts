import { connect } from "@/dbConfig/dbConfig";
import { NextResponse, NextRequest } from "next/server";
import User from "@/models/userModel";
import mongoose from "mongoose";
import Playlists from "@/models/playlist";

connect();

interface UserBookmark{
    userId : string;
    isMarked?: true;
}

interface BookmarkData {
  playlistUrl: string;
  isMarked: boolean;
}

export async function POST(request: NextRequest) {
    const requestBody: UserBookmark = await request.json();
    const  {userId}  = requestBody;
  
    try {
        if (!userId) {
          return NextResponse.json({ message: 'Invalid input data' }, { status: 400 });
        }
    
        if (!mongoose.Types.ObjectId.isValid(userId)) {
          return NextResponse.json({ message: 'Invalid user ID' }, { status: 400 });
        }
    
        const user = await User.findById(userId);
        if (!user) {
          return NextResponse.json({ message: 'User not found' }, { status: 404 });
        }
        if (!user.bookmarks) {
            // If the bookmarks field doesn't exist, add it to the user's database
            user.bookmarks = [] as BookmarkData[];
            await user.save();
            return NextResponse.json({ message: "No bookmark found" }, { status: 404 });
        }
        
        // Filter bookmarks with isMarked=true and return playlist URLs
        const markedBookmarks = user.bookmarks.filter((bookmark:BookmarkData) => bookmark.isMarked);
        const playlistUrls = markedBookmarks.map((bookmark:BookmarkData) => bookmark.playlistUrl);
    
        if(playlistUrls.length < 1){
            return NextResponse.json({ message: "No bookmark found" }, { status: 404 });
        }
        return NextResponse.json({ playlistUrls }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: 'Error occurred' }, { status: 500 });
    }
}