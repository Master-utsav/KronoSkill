'use client'
import React, { useEffect, useState } from "react";
import { BackgroundGradient } from "./ui/background-gradient";
import courseData from "../data/music_courses.json";
import Link from "next/link";
import { Button } from "./ui/moving-border";
import axios from "axios";

interface Course {
  _id: string;
  course: string[];
  skills: string[];
  description: string[];
}

const FeaturedCourses = () => {
  const [featuredCourses, setFeaturedCourses] = useState<Course[]>([]);
  
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get("/api/manager/course_skills_set");
        const data = res.data.courses;
        if (Array.isArray(data)) {
          setFeaturedCourses(data);
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
    <div className="py-12 bg-gray-900 rounded-lg">
      <div>
        <div className="text-center">
          <h2 className="text-base text-teal-600 font-semibold tracking-wide uppercase">
            FEATURED COURSES
          </h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-white sm:text-4xl">
            Explore all courses
          </p>
        </div>
        <div className="mt-10 mx-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-center animate-opac">
            {featuredCourses.map((course: Course, index: number) => {
              const fullDescription = course.description.join(" ");
              const shortDescription = fullDescription.length > 220 ? fullDescription.slice(0, 220) + "..." : fullDescription;
              
              return (
                <div key={course._id || index} className="flex justify-center">
                  <BackgroundGradient className="flex flex-col rounded-[22px] bg-white dark:bg-zinc-900 overflow-hidden h-full max-w-sm">
                    <div className="p-4 sm:p-6 flex flex-col items-center text-center flex-grow">
                      <p className="text-lg sm:text-xl text-black mt-4 mb-2 dark:text-neutral-200">
                        {course.course}
                      </p>
                      <p className="text-sm text-neutral-600 dark:text-neutral-400 flex-grow">
                        {shortDescription}
                      </p>
                      <Link href={`/courses/${course.course}`} className="mt-2 hover:text-blue-500">Learn More</Link>
                    </div>
                  </BackgroundGradient>
                </div>
              );
            })}
          </div>
        </div>
        <div className="mt-20 text-center">
          <Link href={"/courses"}>
            <Button
              borderRadius="1.75rem"
              borderClassName="bg-[radial-gradient(var(--purple-500)_40%,transparent_60%)]"
              className="bg-white dark:bg-slate-900/60 text-lg h-20 w-40 text-black dark:text-white border-neutral-200 dark:border-slate-800"
            >
              View all Courses
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FeaturedCourses;
