'use client';
import React from "react";
import AnimatedTooltip  from "./ui/animated-tooltip";
import { WavyBackground } from "./ui/wavy-background";
import { useData } from "@/context/dataContext";
import {helix} from "ldrs"
import Skill from "@/models/skill";
helix.register();

interface Instructor {
  id: number;
  channelLink: string;
  channelName: string;
  image: string;
  skill: string[];
}

const Instructor = () => {
  const {data , loading , isLoggedIn} = useData();
  const instructors : Instructor[] = data.instructor || [];
  const newInstructorData = instructors.map((items) => {
    return { ...items, skill: items.skill[0] };
  })
  
  return (
    <div className="relative w-full px-2 h-auto overflow-hidden flex items-center  justify-center" style={{backgroundColor: "rgb(248,248,248)"}}>
      <WavyBackground className="z-10" >
      <h2 className="text-2xl md:text-4xl lg:text-7xl text-white font-bold text-center mb-8">
          {"Meet Elite Master's"}
        </h2>
        <p className="text-base md:text-lg text-white text-center mb-4">
        Explore the Visionaries Leading Your Technological Journey
        </p>
        <div className="flex flex-wrap items-center justify-center mb-10  mt-10 px-2">
          {!loading ? 
          (instructors && 
           <AnimatedTooltip items={newInstructorData}/>
          ) : (isLoggedIn ? (<l-helix size="60" speed="1.3" color="#0c80fc70"></l-helix>) : (<l-helix size="60" speed="1.3" color="orchid"></l-helix>)) } 
        </div>
        </WavyBackground>
      </div>
  );
};

export default Instructor;
