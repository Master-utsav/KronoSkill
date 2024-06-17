'use client'
import React, { useEffect, useState } from "react";
import { StickyScroll } from "./ui/sticky-scroll-reveal";
import axios from "axios";

interface PlaylistContent {
  title: string;
  description: string;
  thumbnail: string;
  playlistUrl: string;
}

const PlaylistHome = () => {
  const [playlistContent, setPlaylistContent] = useState<PlaylistContent[]>([]);

  useEffect(() => {
  async function getPlaylistContent() {
      try {
        const response = await axios.get("/api/manager/playlist");
        const data = response.data;
  
        if (data && data.playlists && Array.isArray(data.playlists)) {
          const topPlaylists = data.playlists.slice(0, 8);
          setPlaylistContent(topPlaylists);
        }
      } catch (error) {
        console.log(error);
      }
    }
    getPlaylistContent();
  }, []);

  return (
    <div className="p-10">
     
      <StickyScroll content={playlistContent} />
    </div>
  );
};

export default PlaylistHome;
