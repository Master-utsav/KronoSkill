"use client"
import Link from "next/link";
import React from "react";
import { Button } from "./ui/moving-border";

const PremiumCourses = () => {
  return (
    <div className="p-12 bg-gray-900 rounded-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center">
          <div className="text-center">
          <h1 className="md:mt-0 text-center upercase text-xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 mb-1">
            <span className=' bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-[#f4c725e4]'>Premium{" "}</span>
            Courses
            </h1>
            <p className="mt-2 text-lg leading-8 font-bold tracking-tight text-white sm:text-3xl">
            Empower Your Skills with Top-Tier Instructors
            </p>
          </div>
        </div>
        <div className="mt-10">
          <div className="max-w-fit mx-auto px-8 h-[30vh]  place-content-center">
          <span className=' bg-clip-text text-lg md:text-7xl font-extrabold text-transparent animate-pulse bg-gradient-to-b from-neutral-50 to-[#f4c725e4]'>UPCOMING...{" "}</span>
          </div>
        </div>
        <div className="mt-10 text-center">
          <Link href={"/"}>
            <Button
              borderRadius="1.75rem"
              borderClassName="bg-[radial-gradient(var(--purple-500)_40%,transparent_60%)]"
              className="bg-white dark:bg-slate-900/60 text-lg px-2 h-20 w-40 text-black dark:text-white border-neutral-200 dark:border-slate-800"
            >
              View all Courses
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PremiumCourses;
