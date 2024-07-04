import axios from 'axios';
import Playlists from "@/models/playlist";
import { NextRequest, NextResponse } from 'next/server';
import { connect } from '@/dbConfig/dbConfig';

connect();

interface Playlist {
    title: string,
    description: string,
    thumbnail: string,
    playlistUrl: string,
    channelTitle: string,
    rating?: { userId: string, rateNumber: number }[],
    skill: string[],
}

const fetchPlaylistData = async (playlistUrl: string) => {
    const playlist = playlistId(playlistUrl);
    try {
        const response = await axios.get(`https://www.googleapis.com/youtube/v3/playlists`, {
            params: {
                part: 'snippet',
                id: playlist,
                key: process.env.NEXT_PRIVATE_YOUTUBE_V3_API_KEY,
            },
        });
        const playlistData = response.data.items[0];
        const thumbnailUrl = playlistData.snippet.thumbnails.medium.url;
        const title = playlistData.snippet.title;
        const description = playlistData.snippet.description;
        const channelBy = playlistData.snippet.channelTitle;
        return { title, description, thumbnail: thumbnailUrl, channelTitle: channelBy }

    } catch (error) {
        return NextResponse.json({ error: "error in fetching the youtube data" }, { status: 500 })
    }
};

function playlistId(playlistUrl: string): string | void {
    const regex = /^https:\/\/youtube\.com\/playlist\?list=([a-zA-Z0-9_-]+)/;
    const match = playlistUrl.match(regex);
    if (match) {
        return match[1];
    } else {
        console.log('Invalid playlist URL');
    }
}

export async function POST(request: NextRequest) {
    const reqBody = await request.json();
    const { playlistUrl, customDescription, skill } = reqBody;

    const data: any = await fetchPlaylistData(playlistUrl)
    try {
        const playlist = await Playlists.findOne({ playlistUrl }).exec();

        if (playlist) {
            return NextResponse.json({ message: "Playlist already exists" }, { status: 400 });
        }

        if(!(data.description || customDescription)){
            return NextResponse.json({ message: "Please provide description" }, { status: 400 });
        }
        const newPlaylist = new Playlists<Playlist>({
            title: data.title,
            description: data.description ? data.description : customDescription,
            thumbnail: data.thumbnail,
            playlistUrl: playlistUrl,
            channelTitle: data.channelTitle,
            rating: [], // Initialize rating as an empty array
            skill: skill,
        });
        await newPlaylist.save();
        return NextResponse.json({ newPlaylist, message: "Uploaded successfully" }, { status: 200 });
    } catch (error) {
        console.log("error occurred in fetching playlist data", error);
        return NextResponse.json({ message: "internal server error" }, { status: 500 });
    }
}

export async function GET() {
    try {
        const playlists = await Playlists.find();
        return NextResponse.json({ playlists, message: "fetched successfully" }, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "internal server error" }, { status: 500 });
    }
}

