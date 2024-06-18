'use client';
import React, { useEffect, useState } from "react";
import AnimatedTooltip  from "./ui/animated-tooltip";
import { WavyBackground } from "./ui/wavy-background";
import axios from "axios";
import toast from "react-hot-toast";

const Instructor = () => {
  const [instructors , setInstructors] = useState([]);
  
  const getInstructors = async () => {
    try {
      const response = await axios.get('/api/manager/instructors');
      const Arraydata = response.data.instructors;
      const newData = Arraydata.map((item:any, index: number) => ({
        id: index,
        channelLink: item.channelLink,
        channelName: item.channelName,
        image: item.image,
        skill: item.skill[0]
      }));
      setInstructors(newData);
    } catch (error: any) {
      console.log("Fetching request failed", error);
      if (error.response && error.response.data && error.response.data.error) {
        toast.error(error.response.data.error);
      }
    }
  }
  useEffect(() => {
    getInstructors();
  }, [])
  
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
          {instructors && 
           <AnimatedTooltip items={instructors}/>
          }
        </div>
        </WavyBackground>
      </div>
  );
};

export default Instructor;
