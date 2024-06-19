import { connect } from "@/dbConfig/dbConfig";
import { NextResponse, NextRequest } from "next/server";
import User from "@/models/userModel";
import Playlists from "@/models/playlist";
import mongoose from "mongoose";

connect();

interface Bookmark {
  userId: string;
  playlistUrl: string;
  action: "add" | "remove";
}

interface BookmarkData {
  playlistUrl: string;
  isMarked: boolean;
}

interface PlaylistBookmark{
    playlistUrl: string;
    isMarked: boolean;
    userId : string;
}
export async function POST(request: NextRequest) {
  const requestBody: Bookmark = await request.json();
  const { userId, playlistUrl, action } = requestBody;

  try {
    if (!userId || !playlistUrl || !action) {
      return NextResponse.json(
        { message: "Invalid input data" },
        { status: 400 }
      );
    }

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return NextResponse.json({ message: "Invalid user ID" }, { status: 400 });
    }

    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const playlist = await Playlists.findOne({ playlistUrl });
    if (!playlist) {
      return NextResponse.json({ message: 'Playlist not found' }, { status: 404 });
    }

    if (!user.bookmarks) {
      user.bookmarks = [] as BookmarkData[];
      await user.save();
    }
    if(!playlist.bookmarks){
        playlist.bookmarks = [] as PlaylistBookmark[];
        await playlist.save();
    }

    const bookmarkIndex = user.bookmarks.findIndex(
      (bookmark: BookmarkData) => bookmark.playlistUrl === playlistUrl
    );

    const playlistBookmarkIndex = playlist.bookmarks.findIndex(
      (bookmark: any) => bookmark.userId.toString() === userId
    );

    if (action === "add") {
      if (bookmarkIndex !== -1 && !user.bookmarks[bookmarkIndex].isMarked) {
        user.bookmarks[bookmarkIndex].isMarked = true;
      } else if (bookmarkIndex === -1) {
        user.bookmarks.push({ playlistUrl, isMarked: true });
      }

      if (playlistBookmarkIndex !== -1 && !playlist.bookmarks[playlistBookmarkIndex].isMarked) {
        playlist.bookmarks[playlistBookmarkIndex].isMarked = true;
      } else if (playlistBookmarkIndex === -1) {
        playlist.bookmarks.push({ playlistUrl, isMarked: true, userId });
      }
    } else if (action === "remove") {
      if (bookmarkIndex !== -1 && user.bookmarks[bookmarkIndex].isMarked) {
        user.bookmarks[bookmarkIndex].isMarked = false;
      }

      if (playlistBookmarkIndex !== -1 && playlist.bookmarks[playlistBookmarkIndex].isMarked) {
        playlist.bookmarks[playlistBookmarkIndex].isMarked = false;
      }
    } else {
      return NextResponse.json({ message: "Invalid action" }, { status: 400 });
    }

    await user.save();
    await playlist.save();

    if (action === "add") {
      return NextResponse.json({ message: "Bookmark added successfully" }, { status: 201 });
    } else {
      return NextResponse.json({ message: "Bookmark removed successfully" }, { status: 201 });
    }

  } catch (error) {
    console.error("Error processing bookmark:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
