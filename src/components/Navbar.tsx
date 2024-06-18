"use client";
import React, { useEffect, useState } from "react";
import { HoveredLink, Menu, MenuItem, ProductItem } from "./ui/navbar-menu";
import { cn } from "@/utils/cn";
import Link from "next/link";
import ThemeSwitch from "./ThemeSwitch";
import axios from "axios";
import { CgProfile } from "react-icons/cg";
import { CiBookmark } from "react-icons/ci";
import { MdLogout } from "react-icons/md";
import { MdOutlineAdminPanelSettings } from "react-icons/md";

interface Course {
  _id: string;
  course: string[];
  skills: string[];
}

const Navbar = ({ className }: { className?: string }) => {
  const [categories, setCategories] = useState<Course[]>([]);
  const [active, setActive] = useState<any>(null); // Adjust type as per your actual usage
  const [userData , setUserData] = useState({
    userId : "",
    username : "",
    firstname : "",
    uuid : "",
  })
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get("/api/manager/course_skills_set");
        const data = res.data.courses;
        if (Array.isArray(data)) {
          setCategories(data);
        } else {
          console.log("Data fetched is not in expected format:", data);
        }
      } catch (error) {
        console.log("Error fetching courses data", error);
        // Handle error if needed
      }
    };

    const loggedUser = localStorage.getItem("logged User");
    if (loggedUser) {
        setUserData(JSON.parse(loggedUser));
    }

    fetchCategories();
  }, []);

  return (
    <div>
      <div
        className={cn(
          "fixed top-10 inset-x-0 max-w-2xl mx-auto z-50 ",
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
          <MenuItem setActive={setActive} active={active} item="Our Courses">
            <div className="flex flex-row-reverse py-1 px-5 text-sm text-start items-start justify-center relative w-[100%] gap-5">
              {categories.map((course, index) => (
                <div
                  key={course._id || index}
                  className="flex flex-col text-start w-fit "
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
            <MenuItem
              setActive={setActive}
              active={active}
              item="Profile"
            >
               <div className="flex flex-row-reverse py-1 px-5 text-sm text-start items-start justify-center relative w-[100%] gap-5">
                <div className="flex flex-col text-lg text-start w-fit gap-1">
                      <HoveredLink href={`/profile/${userData.uuid}`}>
                        <div className="flex justify-start items-center gap-2 hover:text-green-400 delay-100 duration-300 transition-all hover:text-xl ease-in-out">
                        <CgProfile/>
                        <p>Profile</p>
                        </div>
                      </HoveredLink>
                      <HoveredLink href={`/profile/${userData.uuid}`}>
                      <div className="flex justify-start items-center gap-2 hover:text-violet-400 delay-100 duration-300 transition-all hover:text-xl ease-in-out">
                        <CiBookmark/>
                        <p>Bookmark</p>
                      </div>
                      </HoveredLink>
                      <HoveredLink href={`/profile/${userData.uuid}/admin`}>
                      <div className="flex justify-start items-center gap-2 hover:text-blue-400 delay-100  duration-300 transition-all  hover:text-xl ease-in-out">
                        <MdOutlineAdminPanelSettings/>
                        <p>Admin</p>
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
