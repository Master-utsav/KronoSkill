import Link from "next/link";
import React from "react";
import { Spotlight } from "./ui/Spotlight";
import { Button } from "./ui/moving-border";

const HeroSectionBeforeLogin = () => {
  return (
    <div id="home" className="h-auto md:h-[40rem] w-full rounded-md flex flex-col items-center justify-center relative overflow-hidden mx-auto py-10 md:py-0 min-h-[85%] bg-black/[0.96] bg-dot-white/[0.1] ">
      <Spotlight
        className="-top-40 left-0 md:left-60 md:-top-20"
        fill="orchid"
      />
      <div className="p-4 relative z-10 w-full text-center ">
        <h1 className="mt-10 lg:mt-10 md:mt-20 text-4xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400">
        Unleash Your Potential with Elite Skills!
        </h1>
        <p className="mt-4 font-normal text-base md:text-lg text-neutral-300 max-w-lg mx-auto">
          {
            "Dive into our comprehensive courses and transform your learning journey today. Whether you're a beginner or looking to refine your skills, join us to unlock your true potential."
          }
        </p>
      </div>
      <div className="mt-4">
        <Link href={"/courses"}>
          <Button
            borderRadius="1.75rem"
            borderClassName="bg-[radial-gradient(var(--purple-500)_40%,transparent_60%)]"
            className="bg-white dark:bg-slate-900/60 text-lg h-20 w-40 text-black dark:text-white border-neutral-200 dark:border-slate-800"
          >
            Explore courses
          </Button>
        </Link>
      </div>
      <Link href={"/signup"} className="absolute lg:top-14 lg:right-0 z-50 md:top-[8rem] md:right-0  top-[4rem] right-0">
        <Button
          borderRadius="1rem"
          borderClassName="bg-[radial-gradient(var(--purple-500)_40%,transparent_60%)]"
          className="bg-white dark:bg-slate-900/60 md:text-lg text-sm h-8 w-20 md:h-12 md:w-32 text-black dark:text-white border-neutral-200 dark:border-slate-800"
        >
          sign up
        </Button>
      </Link>
      {/* <Link href={"/login"} className="absolute md:top-14 md:right-0 top-[7rem] right-0 z-50 ">
        <Button
          borderRadius="1rem"
          borderClassName="bg-[radial-gradient(var(--purple-500)_40%,transparent_60%)]"
          className="bg-white dark:bg-slate-900/60 md:text-lg text-sm h-8 w-20 md:h-12 md:w-32 text-black dark:text-white border-neutral-200 dark:border-slate-800"
        >
          login
        </Button>
      </Link> */}
    </div>
  );
};

export default HeroSectionBeforeLogin;
