"use client";
import React, { useEffect, useState } from "react";
import ProductivityComponent from "@/components/ui/master_light";
import axios from "axios";
import { helix } from "ldrs";
import AnimatedTooltip from "@/components/ui/animated-tooltip";
import CursorBorderGlowCard from "@/components/ui/cursor-border-glow-card";
import Image from "next/image";
import Rating from "@/components/rating";
helix.register();

interface SkillInterface {
  skill: string;
  description: string;
}

interface ParamsProps {
  params: {
    id: string;
  };
}
interface Playlist {
  playlistUrl: string;
  averageRating: number;
  thumbnail: string;
  title: string;
  description: string;
  skill: string[];
  rating: { rateNumber: number }[];
}

const Course = ({ params }: ParamsProps) => {
  const [skillDescription, setSkillDescription] = useState<SkillInterface[]>([]);
  const [instructorData, setInstructorData] = useState<[]>([]);
  const [playlistData, setPlaylistData] = useState<Playlist[]>([]);
  const [expandedDescriptions, setExpandedDescriptions] = useState<{ [key: number]: boolean }>({});
  const paramsId = params?.id;
  const headTitle = paramsId?.split("-").join(" ");
  setColors(headTitle);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getSkillDescription();
      setSkillDescription(data);

      const instructors = await getInstructorsOfThatSkill();
      if (!Array.isArray(instructors)) {
        throw new Error("Instructors data is not an array");
      }
      const newData: any = instructors
        .filter((item: any) => item.skill.includes(headTitle))
        .map((item: any, index: number) => ({
          id: index,
          channelLink: item.channelLink,
          channelName: item.channelName,
          image: item.image,
        }));
      setInstructorData(newData);

      const playlists = await getPlayListData();
      if (!Array.isArray(playlists)) {
        throw new Error("Playlists data is not an array");
      }
      const filteredPlaylists = playlists.filter(playlist =>
        playlist.skill.includes(headTitle)
      );
     
      const processedPlaylists:any = filteredPlaylists.map((playlist, index) => {
        const totalRatings = playlist.rating.reduce(
          (acc:any, rating:any) => acc + rating.rateNumber,
          0
        );
        const rawAverageRating = totalRatings / playlist.rating.length;
        const averageRating = Math.round(rawAverageRating * 2) / 2;
        return {
          id: index,
          playlistUrl: playlist.playlistUrl,
          averageRating: averageRating.toFixed(1),
          thumbnail: playlist.thumbnail,
          title: playlist.title,
          description: playlist.description,
        };
      });
      setPlaylistData(processedPlaylists);
    };
    fetchData();
  }, [headTitle]);

  const handleToggleDescription = (index: number) => {
    setExpandedDescriptions(prevState => ({
      ...prevState,
      [index]: !prevState[index]
    }));
  };

  const headTitleSkillSet: SkillInterface[] =
    skillDescription?.filter((skill) => skill.skill === headTitle) ?? [];
  const description =
    headTitleSkillSet.length > 0 ? headTitleSkillSet[0].description : "";

  return (
    <div className="w-[100vw] h-[100vh] overflow-x-hidden">
      <ProductivityComponent
        bg_color="#00ff0000"
        light_ray1={light_ray1}
        light_ray2={light_ray2}
        light_ray3={light_ray3}
      />
      <div className="min-h-screen bg-black/0 py-12 pt-36">
        <h1
          className={`text-lg md:text-5xl text-center font-sans font-bold mb-8 text-white`}
        >
          {headTitle}{" "}
        </h1>
        <div className="flex justify-center items-center ">
          {description ? (
            <p className="mt-4 font-normal text-center text-base md:text-lg text-neutral-300  max-w-[80vw] mx-auto animate-slidedown">
              {description}
            </p>
          ) : (
            <l-helix size="60" speed="1.3" color={light_ray2}></l-helix>
          )}
        </div>
        {instructorData.length > 0 && (
          <div className="flex flex-row items-center justify-center mb-10 w-full mt-10 animate-opac">
            {instructorData && <AnimatedTooltip items={instructorData} />}
          </div>
        )}
          <CursorBorderGlowCard
            className="max-w-[90%] w-full mx-auto flex flex-wrap content-center  rounded-none md:rounded-2xl  shadow-input bg-white/20 dark:bg-black/40  animate-slidedown"
            bg_card_cursor_color="transparent"
            cursor_color={cursor_color}
            cursor_shadow={cursor_shadow}
            box_border={box_border}
            box_border_shadow={box_border_shadow}
          >
        {playlistData.map((playlist , index) => (
        <div key={playlist.playlistUrl || index} className="min-w-[100%] bg-transparent rounded-none md:rounded-2xl px-2 min-h-[32vh] flex md:flex-row flex-col justify-between items-center relative gap-2 ">
            <div className="max-w-[70%] text-start pl-4 ">
              <h1 className="text-xl md:text-4xl text-start font-sans font-bold mb-2 text-white">
              {playlist.title}
              </h1>
              <p className="md:text-base text-sm text-start animate-slidedown text-white/80 mb-2">
              {expandedDescriptions[index] ? playlist.description : playlist.description.length > 300 ? playlist.description.slice(0, 300) + "...  " : playlist.description}
              {playlist.description.length > 300 && (<button className="hover:text-blue-600 text-white/60" onClick={() => handleToggleDescription(index)}>
                {expandedDescriptions[index] ? "  Less" : "  More"}
              </button>)}
              
            </p>
              <Rating rating={playlist.averageRating} customColor={box_border} />
            </div>
            <div className={`max-w-[28%] max-h-[30vh] rounded-lg bg-red-50 border-2 border-[${light_ray2}] flex justify-center items-center overflow-hidden`}>
            <a href={playlist.playlistUrl} target="_blank" rel="noopener noreferrer">
            <Image
                src={playlist.thumbnail}
                alt=""
                width={480}
                height={360}
                className="object-cover"
              />
            </a>
            </div>
        </div>
      ))}
      </CursorBorderGlowCard>
      </div>
    </div>
  );
};

let light_ray1: string = "";
let light_ray2: string = "";
let light_ray3: string = "";
let cursor_color: string = "";
let cursor_shadow: string = "";
let box_border: string = "";
let box_border_shadow: string = "";

const categories = {
  Development: [
    "Frontend Development",
    "Backend Development",
    "Full Stack Development",
    "MERN Stack",
    "NextJs",
    "React Native",
    "Flutter",
    "Android Development",
    "iOS Development",
    "DevOps",
    "Web3",
    "Machine Learning",
    "Artificial Intelligence",
  ],
  ProgrammingLanguage: [
    "Python",
    "JavaScript",
    "Java",
    "C",
    "CPP",
    "Rust",
    "Ruby",
    "Go",
    "Swift",
    "Kotlin",
    "TypeScript",
  ],
  SoftwareAndTools: [
    "Adobe Creative Suite",
    "3D Modeling Software",
    "Prototyping Tools",
    "Audio Software",
    "Video Editing Software",
  ],
  VisualDesign: [
    "Graphic Design",
    "Illustration",
    "Web Design",
    "Animation",
    "Video Production",
    "Photography",
  ],
  InteractiveDesign: [
    "User Experience (UX)",
    "User Interface (UI)",
    "Game Design",
    "Augmented Reality (AR)",
    "Virtual Reality (AR)",
  ],
  AudioDesign: ["Sound Design", "Music Production"],
  ComputerScience: [
    "Version Control (Git)",
    "Database Management",
    "SQL",
    "NoSQL",
    "Operating System",
    "Computer Networking",
    "Linux",
    "Cloud Computing",
    "OOPS",
    "DSA",
  ],
};

function setColors(id: string) {
  if (categories.Development.includes(id)) {
    light_ray1 = "#10c57393";
    light_ray2 = "#0df5668a";
    light_ray3 = "#10c57393";
    cursor_color = "#0df56635";
    cursor_shadow = "#0df56635";
    box_border = "#0edb9e";
    box_border_shadow = "#0df56635";
  } else if (categories.ProgrammingLanguage.includes(id)) {
    light_ray1 = "#0000ff3c";
    light_ray2 = "#0c80fc70";
    light_ray3 = "#0000ff3c";
    cursor_color = "#1441f726";
    cursor_shadow = "#4f70f426";
    box_border = "#1441f7e9";
    box_border_shadow = "#1441f726";
  } else if (categories.SoftwareAndTools.includes(id)) {
    light_ray1 = "#14dbe193";
    light_ray2 = "#0dcbf58a";
    light_ray3 = "#14dbe193";
    cursor_color = "#14d4fb2e";
    cursor_shadow = "#14ecfb26";
    box_border = "#08c2f5";
    box_border_shadow = "#08c2f51a";
  } else if (categories.VisualDesign.includes(id)) {
    light_ray1 = "#ff57eb5b";
    light_ray2 = "#c058f88f";
    light_ray3 = "#2134db4d";
    cursor_color = "#ae14fb2e";
    cursor_shadow = "#ae14fb26";
    box_border = "#ae14fb";
    box_border_shadow = "#ae14fb1a";
  } else if (categories.InteractiveDesign.includes(id)) {
    light_ray1 = "#ffff0033";
    light_ray2 = "#faf6148f";
    light_ray3 = "#ffff0033";
    cursor_color = "#f3d31f18";
    cursor_shadow = "#f7de5318";
    box_border = "#ffd900e7";
    box_border_shadow = "#f3d31f18";
  } else if (categories.AudioDesign.includes(id)) {
    light_ray1 = "#10c57393";
    light_ray2 = "#0df5668a";
    light_ray3 = "#10c57393";
    cursor_color = "#0df56635";
    cursor_shadow = "#0df56635";
    box_border = "#0edb9e";
    box_border_shadow = "#0df56635";
  } else if (categories.ComputerScience.includes(id)) {
    light_ray1 = "#ff57eb5b";
    light_ray2 = "#c058f88f";
    light_ray3 = "#2134db4d";
    cursor_color = "#ae14fb2e";
    cursor_shadow = "#ae14fb26";
    box_border = "#ae14fb";
    box_border_shadow = "#ae14fb1a";
  } else {
    light_ray1 = "#f53e2d93";
    light_ray2 = "#f08d138a";
    light_ray3 = "#f53e2d93";
    cursor_color = "#ef444430";
    cursor_shadow = "#ef444430";
    box_border = "#ef4444";
    box_border_shadow = "#ef444430";
  }
}

export const getSkillDescription = async () => {
  try {
    const res = await axios.get("/api/manager/skill_description");
    return res.data.skills;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const getInstructorsOfThatSkill = async () => {
  try {
    const response = await axios.get("/api/manager/instructors");
    return response.data.instructors;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const getPlayListData = async() => {
  try{
    const response = await axios.get("/api/manager/playlist");
    return response.data.playlists;
  }
  catch(error){
    console.log(error);
    return [];
  }
}

export default Course;
