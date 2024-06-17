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
    <div className="relative w-[80vw] h-[40rem] overflow-hidden flex items-center z-50 justify-center" style={{backgroundColor: "rgb(248,248,248)"}}>
      <WavyBackground className="z-10" >
      <div className="z-50 w-[80vw] h-[40rem] flex flex-col items-center justify-center" style={{backgroundImage: "linear-gradient(90deg, rgba(248,248,248,1) 0%, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 0%, rgba(255,255,255,0) 50%, rgba(0,0,0,1) 100%, rgba(0,0,0,1) 100%, rgba(0,0,0,1) 100%)"}}>
      <h2 className="text-2xl md:text-4xl lg:text-7xl text-white font-bold text-center mb-8">
          {"Meet Elite Master's"}
        </h2>
        <p className="text-base md:text-lg text-white text-center mb-4">
        Explore the Visionaries Leading Your Technological Journey
        </p>
        <div className="flex flex-row items-center justify-center mb-10 w-full mt-10 ">
          {instructors && 
           <AnimatedTooltip items={instructors}/>
          }
        </div>
      </div>
        </WavyBackground>
      </div>
  );
};

export default Instructor;
