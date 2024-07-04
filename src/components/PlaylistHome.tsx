"use client";
import React from "react";
import { StickyScroll } from "./ui/sticky-scroll-reveal";
import { useData } from "@/context/dataContext";


interface PlaylistContent {
  title: string;
  description: string;
  thumbnail: string;
  playlistUrl: string;
}

const PlaylistHome = () => {
  const { data, loading, isLoggedIn } = useData();

  const playlistContent: PlaylistContent[] = data.playlistHome || [];
  const playlistHome = playlistContent.slice(0, 8);

  return (
    <div id="playlist" className="p-10 content-center">
      <h1 className="md:mt-5 mt-2 md:mb-2 text-center text-4xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 mb-1 md:pb-2 pb-1">
        Top Playlist
      </h1>
      <div className="lg:block hidden">
        {!loading ? (
          <StickyScroll content={playlistHome} />
        ) : (
          <div className="flex justify-center items-center">
            {isLoggedIn ? (
              <l-helix size="60" speed="1.3" color="#0c80fc70"></l-helix>
            ) : (
              <l-helix size="60" speed="1.3" color="orchid"></l-helix>
            )}
          </div>
        )}
      </div>
      <div className="lg:hidden block"></div>
    </div>
  );
};

export default PlaylistHome;
