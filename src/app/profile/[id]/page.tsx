"use client";
import Navbar from "@/components/Navbar";
import { Spotlight } from "@/components/ui/Spotlight";
import ProductivityComponent from "@/components/ui/master_light";
import { Button } from "@/components/ui/moving-border";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const ProfilePage = ({ params }:any) => {
  const [isdisabled , setIsdisabled] = useState<boolean>(true);
  const [userData, setUserData] = useState({
    userId: "",
    username: "",
    firstname: "",
    uuid : "",
  });

  useEffect(() => {
    const loggedUser = localStorage.getItem("logged User");
    if (loggedUser) {
      setUserData(JSON.parse(loggedUser));
    }
    setIsdisabled(false);
  }, []);

  const paramsId = params?.id;

  return (
    <>
      {paramsId === userData.uuid ? (
        <div className="w-[100vw] h-[100vh] ">
          <ProductivityComponent
            bg_color="#00ff0000"
            light_ray1="#ffff0033"
            light_ray2="#faf6148f"
            light_ray3="#ffff0033"
          />
          <div className="h-auto md:h-[40rem] w-full rounded-md flex flex-col items-center justify-center relative overflow-hidden mx-auto py-10 md:py-0">
            <Navbar />
            <div className="p-4 relative z-10 w-full text-center">
              <h1 className="mt-20 md:mt-0 text-4xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400">
                Hello Master,{" "}
                <span className=" bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-[#ecdd6a]">
                  {(userData?.firstname).toLowerCase()}
                </span>
              </h1>
              <p className="mt-8 font-normal text-base md:text-lg text-neutral-300 max-w-lg mx-auto">
                {
                  "Dive into our comprehensive music courses and transform your musical journey today. Whether you're a beginner or looking to refine your skills, join us to unlock your true potential."
                }
              </p>
            </div>
            <div className="mt-4">
              <Link href={"/courses"}>
                <Button
                  borderRadius="1.75rem"
                  borderClassName="bg-[radial-gradient(var(--yellow-500)_40%,transparent_80%)]"
                  className="bg-white dark:bg-slate-900/40 text-lg h-20 w-40 text-black dark:text-white border-neutral-200 dark:border-slate-800"
                >
                  Explore courses
                </Button>
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <div className="w-[100vw] h-[100vh] ">
          <ProductivityComponent
            bg_color="#00ff0000"
            light_ray1="#ffff0033"
            light_ray2="#faf6148f"
            light_ray3="#ffff0033"
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

export default ProfilePage;
