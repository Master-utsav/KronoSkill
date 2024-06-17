import Playlists from "@/models/playlist";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from 'next/server';
import { connect } from '@/dbConfig/dbConfig';
import mongoose from "mongoose";

connect();

interface RequestBody {
    userId: string;
    playlistUrl: string;
    rateNumber: number;
}

export async function POST(request: NextRequest) {
    try {
        // Parse the request body
        const body: RequestBody = await request.json();
        const { userId, playlistUrl, rateNumber } = body;
        
        // Validate the input data
        if (!userId || !playlistUrl || typeof rateNumber !== 'number') {
            return NextResponse.json({ message: 'Invalid input data' }, { status: 400 });
        }

        // Check if userId is a valid ObjectId
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return NextResponse.json({ message: 'Invalid user ID' }, { status: 400 });
        }

        // Find the user by ID
        const user = await User.findById(userId);
        if (!user) {
            return NextResponse.json({ message: 'User not found' }, { status: 404 });
        }

        // Find the playlist by URL
        const playlist = await Playlists.findOne({ playlistUrl });
        if (!playlist) {
            return NextResponse.json({ message: 'Playlist not found' }, { status: 404 });
        }

        // Add the rating to the playlist
        playlist.rating.push({ userId, rateNumber });

        // Save the updated playlist
        await playlist.save();
        return NextResponse.json({ message: 'Rating added successfully', playlist }, { status: 200 });

    } catch (error) {
        console.error('Error adding rating to playlist:', error);
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}
