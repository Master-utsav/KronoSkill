"use client";
import React, { useEffect, useState } from "react";
import ProductivityComponent from "@/components/ui/master_light";
import axios from "axios";
import { helix } from "ldrs";
import AnimatedTooltip from "@/components/ui/animated-tooltip";
import CursorBorderGlowCard from "@/components/ui/cursor-border-glow-card";
import Image from "next/image";
import Rating from "@/components/rating";
import RatingSubmit from "@/components/rating_submit";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Bookmark from "@/components/bookmark";
import Tooltip from "@/components/ui/tooltip";
import { useData } from "@/context/dataContext";

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
  userHasRated : boolean,
  userRated:number,
  ratedUser: number,
  isBookMarked: boolean; // Added this line
}

interface Instructor {
  id: number;
  channelLink: string;
  channelName: string;
  image: string;
  skill: string[];
}
interface InstructorPlaylist {
  id: number;
  channelLink: string;
  channelName: string;
  image: string;
}


const Course = ({ params }: ParamsProps) => {
  const [skillDescription, setSkillDescription] = useState<SkillInterface[]>([]);
  const [instructorData, setInstructorData] = useState<InstructorPlaylist[]>([]);
  const [playlistData, setPlaylistData] = useState<Playlist[]>([]);
  const [expandedDescriptions, setExpandedDescriptions] = useState<{ [key: number]: boolean }>({});
  const [isRatingSubmited , setIsRatingSubmited] = useState<{ [key: number] : boolean}>({});
  const [checked, setChecked] = useState<{ [key: number] : boolean}>({});;
  const router = useRouter();
   
  const paramsId = params?.id;
  const headTitle = paramsId?.split("-").join(" ");
  setColors(headTitle);

  const {data , userdata} = useData();
  const userId = userdata?.userId;

 
  useEffect(() => {
    const playlists:Playlist[] | [] = data.playlist || [];  
    const instructors: Instructor[] = data.instructor || [];

    const fetchData = async () => {
      const data = await getSkillDescription();
      setSkillDescription(data);

      if (!Array.isArray(playlists)) {
        throw new Error("Playlists data is not an array");
      }
      const filteredPlaylists = playlists.filter(playlist =>
        playlist.skill.includes(headTitle)
      );
      
      const processedPlaylists:any = filteredPlaylists.map((playlist:any, index:number) => {
        const userRating = playlist.rating.find((rating: any) => rating.userId.toString() === userId);
        const ratedUser = playlist.rating.length ?  playlist.rating.length : 0
        const totalRatings = playlist.rating.reduce(
          (acc:any, rating:any) => acc + rating.rateNumber,
          0
        );
        setIsRatingSubmited({[index]: false});
        const rawAverageRating = totalRatings / playlist.rating.length;
        const averageRating = Math.round(rawAverageRating * 2) / 2;

        const isBookMarked = Array.isArray(playlist.bookmarks) && playlist.bookmarks.some(
          (bookmark: any) => bookmark.userId.toString() === userId && bookmark.isMarked
        );

        setChecked((prevState) => ({
          ...prevState,
          [index]: !!isBookMarked,
        }));
        return {
          id: index,
          playlistUrl: playlist.playlistUrl,
          averageRating: averageRating.toFixed(1),
          thumbnail: playlist.thumbnail,
          title: playlist.title,
          description: playlist.description,
          userHasRated : !!userRating,
          userRated : userRating ? userRating.rateNumber : null,
          ratedUser,
          isBookMarked : !!isBookMarked,
        };
      });
      if (!Array.isArray(instructors)) {
        throw new Error("Instructors data is not an array");
      }
      console.log(instructors)
      const newData = instructors
        .filter((item) => item.skill?.includes(headTitle))
        .map((item, index) => ({
          id: index,
          channelLink: item.channelLink,
          channelName: item.channelName,
          image: item.image,
        }));
      console.log(newData);
      setInstructorData(newData);
      setPlaylistData(processedPlaylists);
    };

    fetchData();

  }, [data.playlist, data.instructor ,headTitle, userId]);
  

  const handleBookmarks = async(userAction: "add" | "remove", playlistUrl: string , index: number) => {
    if(userId === ""){
      toast.error("Please Login");
      router.push("/login"); 
      return;
    }
    try{
      const respone = await axios.post("/api/users/bookmark" , {
        userId: userId,
        playlistUrl: playlistUrl,
        action: userAction,
      });
      toast.success(respone.data.message);
      handleCheckedState(index);
    }
    catch(error: any){
      if (error.response && error.response.data && error.response.data.message) {
        toast.error(error.response.data.message);
      }
    }
  }
  const handleCheckedState = (index: number) => {
    setChecked((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };
  const handleClick = (index:number, playlistUrl:string) => {
    const currentCheckedState = checked[index];
    const action = currentCheckedState ? "remove" : "add";
    handleBookmarks(action, playlistUrl , index);
  };


  const handleRatingSubmit = async (rating: number, playlistUrl: string , index:number ) => {
    if(userId === ""){
      toast.error("Please Login");
      router.push("/login"); 
      return;
    }
    try {
      const response = await axios.post("/api/users/rating", {
        userId: userId, 
        playlistUrl: playlistUrl,
        rateNumber: rating,
      });
      toast.success(response.data.message);
      setIsRatingSubmited({[index]: true});
      
    } catch (error:any) {
      if (error.response && error.response.data && error.response.data.message) {
        toast.error(error.response.data.message);
      }
    }
  };

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
      <div className="min-h-screen bg-black/0 md:py-12 md:pt-36 pt-20 py-8">
        <h1
          className={`text-2xl md:text-5xl text-center font-sans font-bold mb-8 text-white`}
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
          <div className="flex flex-row items-center flex-wrap justify-center mb-10 w-full mt-10 animate-opac  px-2">
            {instructorData && <AnimatedTooltip items={instructorData} />}
          </div>
        )}
         {playlistData.length > 0 ? (
          <div className="min-h-screen w-full rounded-md flex flex-col  relative mx-auto py-2 md:py-2 md:space-y-1 ">
              <CursorBorderGlowCard
                className="max-w-[90%] w-full mx-auto flex flex-wrap content-center item-center justify-center rounded-none md:rounded-2xl  shadow-input bg-white/20 dark:bg-black/50  animate-slidedown md:py-2 py-5"
                bg_card_cursor_color="transparent"
                cursor_color={cursor_color}
                cursor_shadow={cursor_shadow}
                box_border={box_border}
                box_border_shadow={box_border_shadow}
              >
                {playlistData.map((playlist, index) => (
                  <div key={playlist.playlistUrl || index} className="flex flex-col min-w-[100%]">
                  <div
                    className="min-w-[100%] md:min-h-[32vh] bg-transparent rounded-none md:rounded-2xl md:px-2 flex md:flex-row flex-col md:justify-between justify-center items-center relative gap-2 py-4 md:py-0"
                  >
                    <div className="md:w-[70%] w-[80%] text-start md:pl-4 ">
                      <div className="flex justify-between items-start">
                        <h1 className="text-lg md:text-4xl text-start font-sans  font-bold mb-2 text-white">
                          {playlist.title}
                        </h1>

                        <Tooltip
                          text="bookmark"
                          bottom="bottom-9"
                          left="-left-9"
                          animate="animate-popup"
                        >
                          <button
                            className="size-8"
                            onClick={() =>
                              handleClick(index, playlist.playlistUrl)
                            }
                          >
                            <Bookmark
                              primaryColor={box_border}
                              secondaryColor={bookmark_hover}
                              circleSize={"45px"}
                              hoverColor={light_ray2}
                              size={"30px"}
                              isChecked={checked[index]}
                            />
                          </button>
                        </Tooltip>
                      </div>
                      <p className="md:text-base text-sm text-start animate-slidedown text-white/80 mb-2">
                        {expandedDescriptions[index]
                          ? playlist.description
                          : playlist.description.length > 300
                          ? playlist.description.slice(0, 300) + "...  "
                          : playlist.description}
                        {playlist.description.length > 300 && (
                          <button
                            className={`hover:text-[${box_border}] text-white/60`}
                            onClick={() => handleToggleDescription(index)}
                          >
                            {expandedDescriptions[index] ? "  Less" : "  More"}
                          </button>
                        )}
                      </p>
                      <div className="flex justify-between items-center">
                        <div className="flex flex-col gap-1 justify-center items-start">
                          <p className="">{playlist.ratedUser} users</p>
                          <Rating
                            rating={playlist.averageRating}
                            customColor={box_border}
                          />
                        </div>
                        {!playlist.userHasRated && !isRatingSubmited[index] ? (
                          <RatingSubmit
                            initialRating={0}
                            customColor={box_border}
                            onSubmit={(rating) =>
                              handleRatingSubmit(
                                rating,
                                playlist.playlistUrl,
                                index
                              )
                            }
                          />
                        ) : playlist.userRated !== null ? (
                          <div className="flex flex-col gap-1 justify-center items-start">
                            <p className="">You Rated : </p>
                            <Rating
                              rating={playlist.userRated}
                              customColor={box_border}
                            />
                          </div>
                        ) : (
                          <div className="flex flex-col gap-1 justify-center items-start">
                            <p className="">Rating Submitted</p>
                          </div>
                        )}
                      </div>
                    </div>
                    <div
                      className={`md:max-w-[28%] md:max-h-[30vh] max-h-[35vh] max-w-[80%] rounded-lg  border-2 border-[${light_ray2}] flex justify-center items-center overflow-hidden`}
                    >
                      <a
                        href={playlist.playlistUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
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
                    <div className="md:my-2 my-4 h-[1px] w-full" style={{backgroundImage: `linear-gradient(to right, transparent, ${box_border}, transparent)`}} />
                  </div>
                ))}
              </CursorBorderGlowCard>
                </div>
            ) : (
              <div className="bg-transparent justify-center items-center flex">
                <l-helix size="80" speed="1.3" color={light_ray2}></l-helix>
              </div>
            )}
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
let bookmark_hover: string = "";

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
    bookmark_hover = "#0edb9e4d"
  } else if (categories.ProgrammingLanguage.includes(id)) {
    light_ray1 = "#0000ff3c";
    light_ray2 = "#0c80fc70";
    light_ray3 = "#0000ff3c";
    cursor_color = "#1441f726";
    cursor_shadow = "#4f70f426";
    box_border = "#1441f7e9";
    box_border_shadow = "#1441f726";
    bookmark_hover = "#1441f74d"
  } else if (categories.SoftwareAndTools.includes(id)) {
    light_ray1 = "#14dbe193";
    light_ray2 = "#0dcbf58a";
    light_ray3 = "#14dbe193";
    cursor_color = "#14d4fb2e";
    cursor_shadow = "#14ecfb26";
    box_border = "#08c2f5";
    box_border_shadow = "#08c2f51a";
    bookmark_hover = "#08c2f54d"
  } else if (categories.VisualDesign.includes(id)) {
    light_ray1 = "#ff57eb5b";
    light_ray2 = "#c058f88f";
    light_ray3 = "#2134db4d";
    cursor_color = "#ae14fb2e";
    cursor_shadow = "#ae14fb26";
    box_border = "#ae14fb";
    box_border_shadow = "#ae14fb1a";
    bookmark_hover = "#ae14fb4d";
  } else if (categories.InteractiveDesign.includes(id)) {
    light_ray1 = "#ffff0033";
    light_ray2 = "#faf6148f";
    light_ray3 = "#ffff0033";
    cursor_color = "#f3d31f18";
    cursor_shadow = "#f7de5318";
    box_border = "#ffd900e7";
    box_border_shadow = "#f3d31f18";
    bookmark_hover = "#ffd9004d";
  } else if (categories.AudioDesign.includes(id)) {
    light_ray1 = "#10c57393";
    light_ray2 = "#0df5668a";
    light_ray3 = "#10c57393";
    cursor_color = "#0df56635";
    cursor_shadow = "#0df56635";
    box_border = "#0edb9e";
    box_border_shadow = "#0df56635";
    bookmark_hover = "#0edb9e4d";
  } else if (categories.ComputerScience.includes(id)) {
    light_ray1 = "#ff57eb5b";
    light_ray2 = "#c058f88f";
    light_ray3 = "#2134db4d";
    cursor_color = "#ae14fb2e";
    cursor_shadow = "#ae14fb26";
    box_border = "#ae14fb";
    box_border_shadow = "#ae14fb1a";
    bookmark_hover = "#ae14fb4d";
  } else {
    light_ray1 = "#f53e2d93";
    light_ray2 = "#f08d138a";
    light_ray3 = "#f53e2d93";
    cursor_color = "#ef444430";
    cursor_shadow = "#ef444430";
    box_border = "#ef4444";
    box_border_shadow = "#ef444430";
    bookmark_hover = "#ef44444d";
  }
}

export const getSkillDescription = async () => {
  try {
    const res = await axios.get("/api/manager/skill_description");
    return res.data.skills;
  } catch (error:any) {
    console.log(error);
    if (error.response && error.response.data && error.response.data.message) {
      toast.error(error.response.data.message);
    }
    return [];
  }
};

export default Course;
