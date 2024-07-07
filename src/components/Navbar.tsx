"use client";
import React, { useEffect, useState } from "react";
import { HoveredLink, Menu, MenuItem} from "./ui/navbar-menu";
import { cn } from "@/utils/cn";
import Link from "next/link";
import { LuUserCheck } from "react-icons/lu";
import { CgProfile } from "react-icons/cg";
import { CiBookmark } from "react-icons/ci";
import { MdLogout } from "react-icons/md";
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import { useData } from "@/context/dataContext";

interface Course {
  _id: string;
  course: string[];
  skills: string[];
}

interface UserData {
  userId : string,
  username : string,
  firstname : string,
  uuid : string,
}
const Navbar = ({ className }: { className?: string }) => {
  const {data , loading , userdata} = useData(); 
  const categories: Course[] = data.featuredCourses?.slice().reverse() || [];
  const userData: UserData | undefined = userdata;
  const [active, setActive] = useState<any>(null); // Adjust type as per your actual usage
  
  return ( 
    <div>
      <div
        className={cn(
          "fixed md:top-10 top-3 inset-x-0 md:max-w-2xl max-w-lg mx-auto z-50 backdrop-blur-xl",
          className
        )}
      >
        <Menu setActive={setActive}>
          <Link href={"/"}>
            <MenuItem
              setActive={setActive}
              active={active}
              item="Home"
            ></MenuItem>
          </Link>
            <MenuItem
              setActive={setActive}
              active={active}
              item="Profile"
            >
               <div className="flex flex-row-reverse py-1 px-5 text-sm text-start items-start justify-center relative w-[100%] gap-5">
                <div className="flex flex-col text-lg text-start w-fit gap-1">
                      <HoveredLink href={`/profile/${userData?.uuid}`}>
                        <div className="flex justify-start items-center gap-2 hover:text-green-400 delay-100 duration-300 transition-all hover:text-xl ease-in-out">
                        <CgProfile/>
                        <p>Profile</p>
                        </div>
                      </HoveredLink>
                      <HoveredLink href={`/profile/${userData?.uuid}`}>
                      <div className="flex justify-start items-center gap-2 hover:text-violet-400 delay-100 duration-300 transition-all hover:text-xl ease-in-out">
                        <CiBookmark/>
                        <p>Bookmark</p>
                      </div>
                      </HoveredLink>
                      <HoveredLink href={`/profile/${userData?.uuid}/admin`}>
                      <div className="flex justify-start items-center gap-2 hover:text-blue-400 delay-100  duration-300 transition-all  hover:text-xl ease-in-out">
                        <MdOutlineAdminPanelSettings/>
                        <p>Admin</p>
                      </div>
                      </HoveredLink>
                      <HoveredLink href={"/sendverificationemail"}>
                      <div className="flex justify-start items-center gap-2 hover:text-red-400 delay-100 duration-300 transition-all hover:text-xl ease-in-out">
                        <LuUserCheck/>
                        <p>verfication</p>
                      </div>
                      </HoveredLink>
                      <HoveredLink href={"/logout"}>
                      <div className="flex justify-start items-center gap-2 hover:text-red-400 delay-100 duration-300 transition-all hover:text-xl ease-in-out">
                        <MdLogout/>
                        <p>Logout</p>
                      </div>
                      </HoveredLink>
                  </div>
                </div>
            </MenuItem>
          <MenuItem setActive={setActive} active={active} item="Courses">
            <div className="flex flex-wrap md:flex-row py-2 px-2 text-sm text-start items-start justify-evenly relative w-[100%] md:gap-x-5 gap-8 md:max-h-full max-h-[500px] ">
              {categories.map((course, index) => (
                <div
                  key={course._id || index}
                  className="flex flex-col text-start md:w-fit md:px-2 w-[20%]"
                >
                  <p className="font-bold mb-2">{course.course}</p>
                  <div className="flex flex-col space-y-2">
                    {course.skills.map((skill: string, skillIndex: number) => {
                      const skillLink = skill.replace(/\s+/g, '-');
                      return (
                        <HoveredLink
                          key={skillIndex}
                          href={`/courses/${skillLink}`}
                        >
                          {skill}
                        </HoveredLink>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </MenuItem>
          <Link href={"/contact"}>
            <MenuItem
              setActive={setActive}
              active={active}
              item="Contact Us"
            ></MenuItem>
          </Link>
        </Menu>
      </div>

      {/* <ThemeSwitch /> */}
    </div>
  );
};

export default Navbar;
