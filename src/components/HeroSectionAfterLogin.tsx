"use client";
import React, { useEffect, useState } from 'react'
import ProductivityComponent from './ui/master_light'
import { Button } from './ui/moving-border'
import Link from 'next/link'


const HeroSectionAfterLogin = () => {
      
  const [userData , setUserData] = useState({
    userId : "",
    username : "",
    firstname : "",
  })

  useEffect(() => {
    const loggedUser = localStorage.getItem("logged User");
    if (loggedUser) {
        setUserData(JSON.parse(loggedUser));
    }
  }, []);
  
  return ( 
    <div className="h-auto md:h-[40rem] w-[89vw] rounded-md flex flex-col items-center justify-center z-10 overflow-hidden mx-auto py-10 md:py-0 relative dark:bg-black/[0.96]  dark:bg-dot-white/[0.1] ">
    <ProductivityComponent
      bg_color="#00000000"
      light_ray1="#0000ff3c"
      light_ray2="#0c80fc70"
      light_ray3="#0000ff3c"
    />
      <Link href={"/profile"} className="absolute top-14 right-40 z-50">
        <Button
          borderRadius="1rem"
          borderClassName="bg-[radial-gradient(var(--blue-500)_40%,transparent_60%)]"
          className="bg-white dark:bg-slate-900/60 text-lg h-12 w-32 text-black dark:text-white border-neutral-200 dark:border-slate-800"
        >
          Profile
        </Button>
      </Link>
      <Link href={"/logout"} className="absolute top-14 right-4 z-50">
        <Button
          borderRadius="1rem"
          borderClassName="bg-[radial-gradient(var(--blue-500)_40%,transparent_60%)]"
          className="bg-white dark:bg-slate-900/60 text-lg h-12 w-32 text-black dark:text-white border-neutral-200 dark:border-slate-800"
        >
          Logout
        </Button>
      </Link>
      <div className="p-4 absolute top-40 -left-16 w-full  text-center z-50 space-y-3 flex flex-col gap-4 ">
        <div>
        <h1 className="md:mt-0 text-center text-4xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 mb-1">
            Welcome, <span className=' bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-[#1366f6] animate-pulse'>{(userData?.firstname).toLowerCase()}</span>
            </h1>
        <h1 className="mt-20 md:mt-0 text-4xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 mb-2">
          Master the art of music
        </h1>
        <p className="mt-4 font-normal text-base md:text-lg text-neutral-300 max-w-lg mx-auto mb-10">
          {
            "Dive into our comprehensive music courses and transform your musical journey today. Whether you're a beginner or looking to refine your skills, join us to unlock your true potential."
          }
        </p>
        </div>
        
        <Link href={"/courses"} >
          <Button
            borderRadius="1.75rem"
            borderClassName="bg-[radial-gradient(var(--blue-500)_40%,transparent_60%)]"
            className="bg-white dark:bg-slate-900/60 text-lg h-20 w-40 text-black dark:text-white border-neutral-200 dark:border-slate-800"
          >
            Explore courses
          </Button>
        </Link>
      </div>
      </div>
    
  )
}

export default HeroSectionAfterLogin
