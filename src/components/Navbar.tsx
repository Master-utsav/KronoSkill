"use client";
import React, { useEffect, useState } from "react";
import { HoveredLink, Menu, MenuItem, ProductItem } from "./ui/navbar-menu";
import { cn } from "@/utils/cn";
import Link from "next/link";
import ThemeSwitch from "./ThemeSwitch";
import axios from "axios";

interface Course {
  _id: string;
  course: string[];
  skills: string[];
}

const Navbar = ({ className }: { className?: string }) => {
  const [categories, setCategories] = useState<Course[]>([]);
  const [active, setActive] = useState<any>(null); // Adjust type as per your actual usage

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
