"use client";
import Link from "next/link";
import React from "react";
import { Button } from "./ui/moving-border";
import { HoverEffect } from "./ui/card-hover-effect";

const UpcomingWebinars = () => {
  const musicWebinar = [
    {
      title: "Spotify",
      description:
        "A digital music streaming service that gives you access to millions of songs, podcasts, and videos from artists all over the world.",
      link: "https://www.spotify.com",
    },
    {
      title: "SoundCloud",
      description:
        "An online audio distribution platform that enables its users to upload, promote, and share their originally-created sounds.",
      link: "https://soundcloud.com",
    },
    {
      title: "Bandcamp",
      description:
        "An online music platform that enables artists to share and sell their music directly to their fans, while allowing listeners to discover new music.",
      link: "https://bandcamp.com",
    },
    {
      title: "Beatport",
      description:
        "A digital music store for DJs and electronic music enthusiasts, offering a wide selection of tracks and mixes across various genres.",
      link: "https://www.beatport.com",
    },
    {
      title: "Tidal",
      description:
        "A subscription-based music, podcast, and video streaming service that offers high-fidelity sound quality and exclusive content.",
      link: "https://tidal.com",
    },
    {
      title: "Pandora",
      description:
        "An internet radio service that offers curated streaming music stations based on users' favorite songs, artists, and genres.",
      link: "https://www.pandora.com",
    },
  ];

  return (
    <div className="p-12 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center">
          <div className="text-center">
            <h2 className="text-base text-teal-600 font-semibold tracking-wide uppercase">
              FEATURED WEBINARS
            </h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-white sm:text-4xl">
              Enhance Your Musical Journey
            </p>
          </div>
        </div>
        <div className="mt-10">
          <div className="max-w-5xl mx-auto px-8">
            <HoverEffect items={musicWebinar} />
          </div>
        </div>
        <div className="mt-10 text-center">
          <Link href={"/"}>
            <Button
              borderRadius="1.75rem"
              className="bg-white dark:bg-slate-900/60 text-lg px-2 h-20 w-40 text-black dark:text-white border-neutral-200 dark:border-slate-800"
            >
              View all webinars
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UpcomingWebinars;
