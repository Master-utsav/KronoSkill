"use client";
import Navbar from "@/components/Navbar";
import Bookmark from "@/components/bookmark";
import Rating from "@/components/rating";
import RatingSubmit from "@/components/rating_submit";
import CursorBorderGlowCard from "@/components/ui/cursor-border-glow-card";
import ProductivityComponent from "@/components/ui/master_light";
import Tooltip from "@/components/ui/tooltip";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { GoBookmarkFill } from "react-icons/go";
import { helix } from "ldrs";
import { useData } from "@/context/dataContext";

helix.register();

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
  userHasRated: boolean;
  userRated: number;
  ratedUser: number;
  isBookMarked: boolean;
}

interface UserData  {
  userId : string,
  username : string,
  firstname : string,
  uuid : string,
}

const ProfilePage = ({ params }: ParamsProps) => {
  const paramsId = params?.id;
  const [playlistData, setPlaylistData] = useState<Playlist[]>([]);
  const [expandedDescriptions, setExpandedDescriptions] = useState<{
    [key: number]: boolean;
  }>({});
  const [isRatingSubmited, setIsRatingSubmited] = useState<{
    [key: number]: boolean;
  }>({});
  const [checked, setChecked] = useState<{ [key: number]: boolean }>({});
  const {userdata , data} = useData();
  const userData: UserData | undefined = userdata;
  const router = useRouter();
  const userId = userData?.userId;

  useEffect(() => {
    const playlists : Playlist[] | [] = data.playlist || [];
    if (!Array.isArray(playlists)) {
      toast.error("Playlists data is not an array");
    }
    const fetchData = async () => {
      const bookmarkedPlaylistUrls = await getBookmarkPlaylist(userId);
      if(bookmarkedPlaylistUrls === undefined){
        return [];
      }
      if (!Array.isArray(bookmarkedPlaylistUrls)) {
        toast.error("Bookmarked playlists data is not an array");
      }
      const filteredPlaylists = playlists.filter((playlist: any) =>
        bookmarkedPlaylistUrls.includes(playlist.playlistUrl)
      );

      const processedPlaylists: any = filteredPlaylists.map(
        (playlist: any, index: number) => {
          const userRating = playlist.rating.find(
            (rating: any) => rating.userId.toString() === userId
          );
          const ratedUser = playlist.rating.length ? playlist.rating.length : 0;
          const totalRatings = playlist.rating.reduce(
            (acc: any, rating: any) => acc + rating.rateNumber,
            0
          );
          setIsRatingSubmited({ [index]: false });
          const rawAverageRating = totalRatings / playlist.rating.length;
          const averageRating = Math.round(rawAverageRating * 2) / 2;

          const isBookMarked =
            Array.isArray(playlist.bookmarks) &&
            playlist.bookmarks.some(
              (bookmark: any) =>
                bookmark.userId.toString() === userId && bookmark.isMarked
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
            userHasRated: !!userRating,
            userRated: userRating ? userRating.rateNumber : null,
            ratedUser,
            isBookMarked: !!isBookMarked,
          };
        }
      );
      setPlaylistData(processedPlaylists);
    };

    fetchData();
  }, [data.playlist, userId]);

  console.log(playlistData);
  const handleBookmarks = async (
    userAction: "add" | "remove",
    playlistUrl: string,
    index: number
  ) => {
    if (userData && userData.userId === "") {
      toast.error("Please Login");
      router.push("/login");
      return;
    }
    try {
      const respone = await axios.post("/api/users/bookmark", {
        userId: userData?.userId,
        playlistUrl: playlistUrl,
        action: userAction,
      });
      toast.success(respone.data.message);
      handleCheckedState(index);
    } catch (error:any) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        toast.error(error.response.data.message);
      }
    }
  };
  const handleCheckedState = (index: number) => {
    setChecked((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };
  const handleClick = (index: number, playlistUrl: string) => {
    const currentCheckedState = checked[index];
    const action = currentCheckedState ? "remove" : "add";
    handleBookmarks(action, playlistUrl, index);
  };

  const handleRatingSubmit = async (
    rating: number,
    playlistUrl: string,
    index: number
  ) => {
    if (userData?.userId === "") {
      toast.error("Please Login");
      router.push("/login");
      return;
    }

    try {
      const response = await axios.post("/api/users/rating", {
        userId: userData?.userId,
        playlistUrl: playlistUrl,
        rateNumber: rating,
      });
      toast.success(response.data.message);
      setIsRatingSubmited({ [index]: true });
    } catch (error:any) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        toast.error(error.response.data.message);
      }
    }
  };
  const handleToggleDescription = (index: number) => {
    setExpandedDescriptions((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };
 
  return (
    <>
      {userData!== undefined && paramsId === userData?.uuid? (
        <div className="w-[100vw] h-[100vh] overflow-x-hidden">
          <ProductivityComponent
            bg_color="#00ff0000"
            light_ray1={light_ray1}
            light_ray2={light_ray2}
            light_ray3={light_ray3}
          />
          <div className={`text-3xl md:text-4xl  flex gap-2 text-center text-bold justify-center items-center md:pb-5 md:mt-40 md:mb-5 mt-20 mb-2`} style={{color : `${box_border}`}}>
              <GoBookmarkFill />
              <h1 className="">Bookmarks</h1>
            </div>
            {playlistData.length > 0 ? (
          <div className="min-h-screen w-full rounded-md flex flex-col   relative mx-auto py-2 md:py-2 md:space-y-1">
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
                    className="min-w-[100%] md:min-h-[32vh] bg-transparent rounded-none md:rounded-2xl md:px-2 flex md:flex-row flex-col md:justify-between justify-center items-center relative gap-2 py-4 md:py-0 "
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
      ) : (
        <div className="w-[100vw] h-[100vh] ">
          <ProductivityComponent
            bg_color="#00ff0000"
            light_ray1={light_ray1}
            light_ray2={light_ray2}
            light_ray3={light_ray3}
          />
          <div className="h-auto md:h-[40rem] w-full rounded-md flex flex-col items-center justify-center relative overflow-hidden mx-auto py-10 md:py-0">
            <Navbar />
            <div className="p-4 relative z-10 w-full text-center">
              <h1 className="mt-20 md:mt-0 text-4xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400">
                404 | User not found
              </h1>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

let light_ray1: string = "#14dbe193";
let light_ray2: string = "#0dcbf58a";
let light_ray3: string = "#14dbe193";
let cursor_color: string = "#14d4fb2e";
let cursor_shadow: string = "#14ecfb26";
let box_border: string = "#08c2f5";
let box_border_shadow: string = "#08c2f51a";
let bookmark_hover: string = "#08c2f54d";

 export const getBookmarkPlaylist = async (userId: string | undefined) => {
  if (!userId){
    toast.error("please login")
    return [];
  };
  try {
    const response = await axios.post("/api/users/get_bookmarks", { userId });
    return response.data.playlistUrls;
  } catch (error:any) {
    console.log(error);
    if (
      error.response &&
      error.response.data &&
      error.response.data.message
    ) {
      toast.error(error.response.data.message);
    }
  }
};
export default ProfilePage;
